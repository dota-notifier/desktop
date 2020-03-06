import { BrowserWindow, remote } from 'electron'

class Worker {
  worker?: BrowserWindow

  start() {
    const { BrowserWindow } = remote

    this.worker = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    this.worker.loadFile('dist/worker.html')

    remote.app.on('quit', () => this.stop())
  }

  stop() {
    this.worker?.webContents.send('worker', 'stop')

    this.worker?.close()

    this.worker = undefined
  }
}

export const worker = new Worker()
