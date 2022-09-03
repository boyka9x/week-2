// Fake device data for test
const initialDevice = [
  { name: 'TV', address: '00:18:44:11:3A:B7', IP: '127.0.0.2', createdAt: '2021-05-31', power: 50 },
  {
    name: 'Washer',
    address: '00:18:44:11:3A:B7',
    IP: '127.0.0.3',
    createdAt: '2021-03-01',
    power: 60,
  },
  {
    name: 'Selling Fan',
    address: '00:18:44:11:3A:B7',
    IP: '127.0.0.4',
    createdAt: '2021-05-31',
    power: 80,
  },
  {
    name: 'Microwave Oven',
    address: '00:18:44:11:3A:B7',
    IP: '127.0.0.2',
    createdAt: '2021-05-31',
    power: 100,
  },
];

// Initialize data on first page load: Save to localStorage
// Skip if data already exists
document.addEventListener('DOMContentLoaded', (e) => {
  var devices = getDevice();

  if (!devices) {
    setDevice(initialDevice);
    devices = getDevice();
  }

  //   Load data to tbody device
  var tbodyDevice = document.querySelector('#tbody-device');
  var tbodyString = devices
    .map((device) => {
      return `<tr> 
            <td align="left">${device.name}</td>
            <td align="right">${device.address}</td>
            <td align="right">${device.IP}</td>
            <td align="right">${device.createdAt}</td>
            <td align="right">${device.power}</td>
         </tr>`;
    })
    .join('');
  tbodyDevice.innerHTML = tbodyString;

  //   Load data to tfoot device
  var totalPowerDevice = document.querySelector('#tfoot-device tr td:last-child');
  var totalPower = devices.reduce((total, device) => {
    return total + device.power;
  }, 0);
  totalPowerDevice.innerHTML = totalPower;

  // Load data to chart
  var xValues = [];
  var yValues = [];
  var barColors = [];
  devices.forEach((device) => {
    xValues.push(device.name);
    yValues.push(device.power);
    barColors.push(getRandomColor());
  });
  createDoughnutChart('deviceChart', 'Power', xValues, yValues, barColors);

  // Handle form device
  var formDevice = document.querySelector('#form-device');
  formDevice.addEventListener('submit', (e) => {
    e.preventDefault();

    var name = document.querySelector('#name').value;
    var ip = document.querySelector('#ip').value;
    var power = document.querySelector('#power').value;
    var formMessage = document.querySelector('.form-message');

    // Validate
    if (!name || !ip || !power) {
      formMessage.innerHTML = 'Input value not empty.';
      return;
    }
    if (!validateIPaddress(ip)) {
      formMessage.innerHTML = 'Incorrect ip format.';
      return;
    }
    if (power < 0) {
      formMessage.innerHTML = 'Power must be greater than zero.';
      return;
    }

    // Good
    formMessage.innerHTML = '';
    const newDate = new Date().toISOString();
    const newDevice = {
      name,
      address: '00:18:44:11:3A:B7',
      IP: ip,
      createdAt: newDate.split('T')[0],
      power: Number(power),
    };

    // Frontend
    const newRow = `<tr> 
                    <td align="left">${newDevice.name}</td> 
                    <td align="right">${newDevice.address}</td>
                    <td align="right">${newDevice.IP}</td>
                    <td align="right">${newDevice.createdAt}</td>
                    <td align="right">${newDevice.power}</td>
                </tr>`;
    tbodyDevice.innerHTML += newRow;
    totalPowerDevice.innerHTML = totalPower + newDevice.power;
    xValues.push(newDevice.name);
    yValues.push(newDevice.power);
    barColors.push(getRandomColor());
    createDoughnutChart('deviceChart', 'Power', xValues, yValues, barColors);

    // Save to local storage
    devices.push(newDevice);
    setDevice(devices);
  });
});

// Other
const setDevice = (device) => {
  return localStorage.setItem('device', JSON.stringify(device));
};

const getDevice = () => {
  return JSON.parse(localStorage.getItem('device'));
};

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createDoughnutChart = (selector, title, xValues, yValues, barColors) => {
  new Chart(selector, {
    type: 'doughnut',
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: title,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

// Check ip address
const validateIPaddress = (ipAddress) => {
  if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ipAddress)) {
    return true;
  }
  return false;
};

// Insert one element to device chart list
const insertOneElementChart = (chart) => {};
