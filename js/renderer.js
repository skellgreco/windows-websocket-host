
document.getElementById('websocket-start-btn').addEventListener('click', async () => {
  const websocket_status = document.getElementById('websocket-status')
  websocket_status.innerText = 'Starting Websocket...'

  let response = await window.electronAPI.invoke('start-socket');
  websocket_status.innerText = response

});

window.electronAPI.on('ws-msg', (message) => {
  document.getElementById('ws-div-msg').innerText = message;
});

window.electronAPI.on('ws-qrcode', (qrCodeData) => {
  document.getElementById('ws-div-qr').src = qrCodeData;
});