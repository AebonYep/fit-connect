// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')


function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
	width: 800,
	height: 600,
	webPreferences: {
	    preload: path.join(__dirname, 'preload.js')
	}
    })

    // and load the index.html of the app.
    mainWindow.loadFile('views/index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

