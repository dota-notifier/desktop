const { BrowserWindow, app, screen } = require('electron')

const createWindow = () => {
  const height = 600
  const width = 400

  const { bounds } = screen.getPrimaryDisplay()

  const window = new BrowserWindow({
    frame: false,
    height,
    icon: 'dota.ico',
    movable: false,
    resizable: false,
    show: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    },
    width,
    x: bounds.width - width - 50,
    y: bounds.height - height - 50
  })

  window.loadFile('dist/index.html')

  window.on('ready-to-show', () => window.show())
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
