const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    signup: (data) => ipcRenderer.invoke('account:signup', data)
})
