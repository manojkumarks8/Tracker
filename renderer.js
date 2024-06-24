const { ipcRenderer } = require('electron');
const Chart = require('chart.js');

// Event listeners for login and register buttons
document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('registerButton').addEventListener('click', register);

// Function to handle login
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const isAuthenticated = await ipcRenderer.invoke('login', { email, password });
    if (isAuthenticated) {
      document.querySelector('.screen-1').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      loadDashboard();
    } else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

// Function to handle registration
async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const isRegistered = await ipcRenderer.invoke('register', { email, password });
    if (isRegistered) {
      alert('Registration successful. You can now log in.');
    } else {
      alert('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
}

// Function to load the dashboard with real-time and historical data
async function loadDashboard() {
  try {
    const realTimeData = await ipcRenderer.invoke('getRealTimeData');
    document.getElementById('temperature').innerText = realTimeData.temperature;
    document.getElementById('humidity').innerText = realTimeData.humidity;
    document.getElementById('rssi').innerText = realTimeData.rssi;

    const historicalData = await ipcRenderer.invoke('getHistoricalData');
    renderChart(historicalData);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
}

// Function to render the chart
function renderChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Temperature',
        data: data.temperature,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }, {
        label: 'Humidity',
        data: data.humidity,
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Environmental Data'
      }
    }
  });
}
