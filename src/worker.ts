import { desktopCapturer, ipcRenderer, remote } from 'electron'
import fs from 'fs-extra'
import { createWorker } from 'tesseract.js'

let timer: NodeJS.Timeout

const start = async () => {
  console.log('start')

  const height = 720
  const width = 1280

  const sources = await desktopCapturer.getSources({
    types: ['window']
  })

  const dota = sources.find(({ name }) => name === 'Dota 2')

  if (dota) {
    const basePath = remote.app.getPath('userData')

    const worker = createWorker()

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
      canvas.height = height * 0.5

      canvas.getContext('2d')?.drawImage(video, -(width / 3), 0)

      document.body.append(canvas)

      const data = canvas.toDataURL().slice(22)

      const buffer = Buffer.from(data, 'base64')

      const file = `${basePath}/screenshots/${Date.now()}.png`

      await fs.outputFile(file, buffer)

      const start = Date.now()

      const {
        data: { text }
      } = await worker.recognize(file)

      const copy = document.createElement('div')

      copy.innerText = `${Date.now() - start}: ${text}`

      document.body.append(copy)

      await fs.remove(file)

      timer = setTimeout(() => process(), 2000)
    }

    video.onloadedmetadata = () => process()
  }
}

start()

const stop = () => {
  console.log('stop')

  if (timer) {
    clearTimeout(timer)
  }
}

ipcRenderer.on('worker', (event, command) => {
  if (command === 'stop') {
    stop()
  }
})
