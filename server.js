const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // SQLite3 module
const app = express();
const db = new sqlite3.Database('./db.sqlite3');

app.use(bodyParser.json());


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL,
    humidity REAL,
    pressure REAL,
    rssi INTEGER,
    battery REAL,
    timestamp INTEGER
  )`);
});


app.post('/data', (req, res) => {
  const { temperature, humidity, pressure, rssi, battery } = req.body;

  db.run(`INSERT INTO sensor_data (temperature, humidity, pressure, rssi, battery, timestamp) VALUES (?, ?, ?, ?, ?, ?)`,
    [temperature, humidity, pressure, rssi, battery, Date.now()],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'Error saving sensor data' });
      }
      res.status(200).json({ success: true });
    });
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
