import { BrowserWindow, remote } from 'electron'

class Worker {
  window?: BrowserWindow

  start() {
    const { BrowserWindow } = remote

    this.window = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    this.window.loadFile('dist/worker.html')
  }

  stop() {
    this.window?.close()
  }
}

export const worker = new Worker()
