import { BrowserWindow, remote } from 'electron'

class Worker {
  worker?: BrowserWindow

  start() {
    const { BrowserWindow } = remote

    this.worker = new BrowserWindow({
      // show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    this.worker.loadFile('dist/worker.html')

    setTimeout(() => {
      this.worker?.webContents.send('worker', 'test')
    }, 3000)
  }

  stop() {
    this.worker?.webContents.send('worker', 'stop')

    this.worker?.close()
  }
}

export const worker = new Worker()
