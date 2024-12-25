const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  send: (channel, ...args) => ipcRenderer.send(channel, ...args),
  on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
  once: (channel, callback) => ipcRenderer.once(channel, (event, ...args) => callback(...args)),
  removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
});
