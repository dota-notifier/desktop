import { desktopCapturer, ipcRenderer, remote } from 'electron'
import fs from 'fs-extra'
import { createWorker } from 'tesseract.js'

import { functions } from './lib'

let timer: NodeJS.Timeout

const start = async () => {
  const height = 720
  const width = 1280

  const sources = await desktopCapturer.getSources({
    types: ['window']
  })

  const dota = sources.find(({ name }) => name === 'Dota 2')

  if (dota) {
    const basePath = remote.app.getPath('userData')

    const worker = createWorker({
      cacheMethod: 'langdata',
      langPath: 'langdata'
    })

    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: dota.id,
          maxHeight: height,
          maxWidth: width,
          minHeight: height,
          minWidth: width
        }
      }
    })

    const video = document.createElement('video')

    video.style.height = String(height)
    video.style.width = String(width)
    video.srcObject = stream

    video.play()

    const process = async () => {
      const canvas = document.createElement('canvas')

      canvas.style.backgroundColor = 'magenta'
      canvas.width = width / 3
      canvas.height = height / 3

      canvas.getContext('2d')?.drawImage(video, -width / 3, -height / 3)

      const data = canvas.toDataURL().slice(22)

      const buffer = Buffer.from(data, 'base64')

      const file = `${basePath}/screenshots/${Date.now()}.png`

      await fs.outputFile(file, buffer)

      const {
        data: { text }
      } = await worker.recognize(file)

      await fs.remove(file)

      if (text.includes('YOUR GAME IS READY')) {
        await functions.notify('MATCH_FOUND')
      } else if (text.includes('READY CHECK')) {
        await functions.notify('READY_CHECK')
      }

      timer = setTimeout(() => process(), 2000)
    }

    video.onloadedmetadata = () => process()
  }
}

start()

const stop = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

ipcRenderer.on('worker', (event, command) => {
  if (command === 'stop') {
    stop()
  }
})
