# ⚙ WebSocket Local Server Host Software
This is a Windows Software made to host a local WebSocket Server and receive messages/files from other devices.   

![image](https://github.com/user-attachments/assets/819051b7-797b-421c-b177-c1acd89a4c98)


### 📜 How to run
- Clone the repo
- Run `npm i` to install required dependencies
- Run `npm run start` to launch the app

### 💻 Technologies used
- Electron
- `ws` library for WebSocket intialization
- `qrcode` library for qrcode generation
- `os` library for dynamic IP Fetching
- `Tailwind` for the CSS

### ❓ How does it work
Once the app launches, a simple UI is displayed with a button to *Start WebSocket Server*. Once clicked, the app is starting a WebSocket Server on port `6969` and on the best-performing IPv4 IP. Then, the UI displays the URL on which the Server is running on, and a QRCode which contains that IP for easy scanning for other devices. Also, the UI contains a section to display messages received from other websocket instances

### 👌 Why was this made
This was made for educational purposes and to implement in a cancelled project. You can freely use it for any purpose. Comments are provided throughout the whole code in order to understand what's happening.

### 🧡 Made by Skell! You are free to download, use or edit this code!
###
