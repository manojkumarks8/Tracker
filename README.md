# Environmental Dashboard 


ESP32 MCUs data has been simulated to generate the Historical Graph using Electron App

Install Dependencies


npm install 

npm install express

Axios: HTTP client for making requests to external APIs (for example, to simulate ESP32 data).
npm install axios

Body Parser: Middleware to parse incoming request bodies.
npm install body-parser

SQLite3: SQLite database driver for Node.js.
npm install sqlite3

Chart.js: Library for creating charts (used for visualizing activity data).
npm install chart.js

npm install express axios body-parser sqlite3


This is how the Directory looks

Tracker/
│
├── server.js         # Backend server logic
├── simulateESP32.js  # Simulated data from ESP32
├── main.js           # Electron main process file
├── index.html        # HTML file for the frontend
├── style.css         # CSS file for styling
├── script.js         # JavaScript file for frontend logic
├── package.json      # Node.js package configuration file
├── preload.js        # Node.js package configuration file
└── node_modules/     # Node.js modules (installed via npm)
