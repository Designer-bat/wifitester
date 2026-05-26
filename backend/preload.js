const { contextBridge, ipcRenderer } = require('electron');

// Expose protected APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // Whitelist channels
    let validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender` 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  invoke: async (channel, ...args) => {
    let validChannels = ['ping-test', 'get-server-list', 'start-optimization'];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, ...args);
    }
  }
});
