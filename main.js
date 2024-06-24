const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const http = require('http');

const users = [];
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}


app.on('ready', () => {
  createWindow();


  simulateSensorData();
});

function simulateSensorData() 
{ 
  function sendSensorDataToRenderer() {
    const data = {
      temperature: getRandomFloat(18, 30).toFixed(2),
      humidity: getRandomFloat(40, 80).toFixed(2),  
      rssi: Math.floor(getRandomFloat(-100, -50)), 
      timestamp: Date.now()
    };
    mainWindow.webContents.send('sensorData', data);
}


  setInterval(sendSensorDataToRenderer, 5000);
}


function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}


ipcMain.handle('login', async (event, { email, password }) => {
  const user = users.find(u => u.email === email && u.password === password);
  return user ? true : false;
});

ipcMain.handle('register', async (event, { email, password }) => {
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return false;
  }
  users.push({ email, password });
  return true;
});

ipcMain.handle('getRealTimeData', async () => {
  return {
    temperature: '24°C',
    humidity: '60%',   
    rssi: '-70dBm'       
  };
});

ipcMain.handle('getHistoricalData', async () => {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    temperature: [22, 24, 23, 25, 26, 27],
    humidity: [55, 60, 57, 62, 65, 63]
  };
});
