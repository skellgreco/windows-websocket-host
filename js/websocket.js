const WebSocket = require("ws");
const os = require("os");
const { ipcMain } = require("electron");
const QRCode = require("qrcode");
const { networkInterfaces } = require('os');

//const networkInterfaces = os.networkInterfaces(); // Network Interface to fetch available IPs

const port = 6969; // WebSocket Port

// Function to get IPv4 address of the Wi-Fi adapter
const getWiFiIPv4Address = () => {
    const interfaces = networkInterfaces();
    for (const interfaceName in interfaces) {
      if (interfaceName.toLowerCase().includes('wi-fi')) { // Prioritize Wi-Fi
        for (const iface of interfaces[interfaceName]) {
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address; // Return IPv4 address of the Wi-Fi adapter
          }
        }
      }
    }
  
    // Fallback: If no Wi-Fi interface is found, check all interfaces
    for (const interfaceName in interfaces) {
      for (const iface of interfaces[interfaceName]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  
    return null; // Return null if no IPv4 address is found
  };
  
  const ipAddresses = getWiFiIPv4Address();
  
  if (ipAddresses) {
    console.log('IPv4 address of this machine:', ipAddresses);
  } else {
    console.log('No active network interfaces found.');
  }

let wss = null;

// Start WebSocket Server
const startWebSocketServer = (win) => {
  if (wss) {
    console.log("WebSocket Server is already running.");
    return `WebSocket server is already running on ws://${ipAddresses}:${port}`;
  }

  const QRCode = require("qrcode");

  // Generate QR code and send it to the renderer process
  QRCode.toDataURL(`ws://${ipAddresses}:${port}`)
    .then((qrCodeData) => {
      // Send the resolved QR code data to the renderer process
      win.webContents.send("ws-qrcode", qrCodeData);
    })
    .catch((error) => {
      console.error("Error generating or sending QR code:", error);
    });

  wss = new WebSocket.Server({ port });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
      ws.send(`Echo: ${message}`);
      win.webContents.send("ws-msg", message.toString());
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`WebSocket Server started on ws://${ipAddresses}:${port}`);
  return `WebSocket server running on ws://${ipAddresses}:${port}`;
};

// Stop WebSocket Server
const stopWebSocketServer = () => {
  if (!wss) {
    console.log("WebSocket Server is not running.");
    return;
  }

  wss.clients.forEach((client) => client.terminate());
  wss.close(() => {
    console.log("WebSocket Server stopped.");
  });
  wss = null;
};

// Restart WebSocket Server
const restartWebSocketServer = (port = 8080) => {
  console.log("Restarting WebSocket Server...");
  stopWebSocketServer();
  setTimeout(() => startWebSocketServer(port), 1000);
};

// Export functions for external use
module.exports = {
  startWebSocketServer,
  stopWebSocketServer,
  restartWebSocketServer,
};
