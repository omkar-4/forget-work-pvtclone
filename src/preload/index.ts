import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language
    // navigator is an API returning info about user-agent
  })
} catch (error) {
  console.error(error)
}

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    closeWindow: () => ipcRenderer.send('window-close'),
    minimizeWindow: () => ipcRenderer.send('window-minimize'),
    maximizeWindow: () => ipcRenderer.send('window-maximize')
  })
} catch (error) {
  console.error(error)
}
// ------------------

let floatingWindow = null;

contextBridge.exposeInMainWorld('electron', {
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  showFloatingTimer: (duration, taskId) => {
    ipcRenderer.invoke('show-floating-timer', duration, taskId).then((windowId) => {
      floatingWindow = windowId;
    });
  },
  hideFloatingTimer: () => {
    if (floatingWindow) {
      ipcRenderer.invoke('hide-floating-timer', floatingWindow);
      floatingWindow = null;
    }
  },
  showNotification: (title, body) => {
    ipcRenderer.invoke('show-notification', title, body);
  }
});

// Listen for updates from the main process
ipcRenderer.on('timer-update', (event, remainingTime) => {
  // You can emit this event to the renderer process if needed
  window.dispatchEvent(new CustomEvent('timer-update', { detail: remainingTime }));
});

ipcRenderer.on('timer-complete', (event, taskId) => {
  window.dispatchEvent(new CustomEvent('timer-complete', { detail: taskId }));
});


contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  },
});