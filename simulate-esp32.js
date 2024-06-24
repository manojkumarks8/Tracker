const axios = require('axios');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendSensorData() {
  const data = {
    temperature: getRandomInt(20, 30),
    humidity: getRandomInt(30, 70),
    rssi: getRandomInt(-100, -50)
  };

  axios.post('http://localhost:3000/data', data)
    .then(response => {
      console.log('Data sent:', response.data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
}

// Send data every 5 seconds
setInterval(sendSensorData, 5000);
