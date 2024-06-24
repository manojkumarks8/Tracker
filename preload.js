const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  // Methods that can be called by the renderer process
  invoke: (channel, data) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.invoke(channel, data)
        .then(resolve)
        .catch(reject);
    });
  },

  on: (channel, listener) => {
    ipcRenderer.on(channel, (event, ...args) => listener(...args));
  }
});

contextBridge.exposeInMainWorld('customAPI', {
  getRandomNumber: () => {
    return Math.random();
  },
});
