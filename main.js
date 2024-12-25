// Library Imports
const { app, BrowserWindow, ipcMain } = require("electron");
const WebSocket = require("ws");
const { startWebSocketServer, stopWebSocketServer, restartWebSocketServer } = require('./js/websocket.js')

// Variables


// Electron app setup
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/js/preload.js`,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  // Load index.html on app start
  win.loadFile("html/index.html");

  ipcMain.handle("start-socket", async (event) => {
    const result = startWebSocketServer(win);
    return result
  });

  // Handler to display QR Code
  ipcMain.handle("generate-qr", async (event, text) => {
    try {
      const qrCodeData = await QRCode.toDataURL(`ws://${ipAddresses}:${port}`);
      return qrCodeData;
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
  });
};

// On Electron App Start
app.whenReady().then(() => {
  createWindow();

  // Create a new window only if the app is not running yet
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// On Electron App Stop
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


