// Variables
let currency = 0;
let networkSpeed = 1;
let creditValue = 1;
let networkSpeedUpgradeCost = 10;
let creditValueUpgradeCost = 10;

// Autosave
function saveGame() {
  const saveData = {
    currency,
    networkSpeed,
    creditValue,
    networkSpeedUpgradeCost,
    creditValueUpgradeCost
  };
  localStorage.setItem('idleUploadSave', JSON.stringify(saveData));
}

function loadGame() {
  const saveData = localStorage.getItem('idleUploadSave');
  if (saveData) {
    const data = JSON.parse(saveData);
    currency = data.currency;
    networkSpeed = data.networkSpeed;
    creditValue = data.creditValue;
    networkSpeedUpgradeCost = data.networkSpeedUpgradeCost;
    creditValueUpgradeCost = data.creditValueUpgradeCost;
    updateCurrencyValue();
    updateNetworkSpeedValue();
    updateCreditValue();
    updateUpgradeCosts();
  }
}

// Generate a random file upload
function generateFileUpload() {
  const fileName = generateRandomString();
  const fileSize = Math.floor(Math.random() * 100) + 1; // Random file size between 1 and 100
  return { fileName, fileSize };
}

// Add a file upload item to the list
function addFileUploadItem(fileName, fileSize) {
  const fileUploadList = document.getElementById('fileUploadList');
  const fileUploadItem = document.createElement('div');
  fileUploadItem.className = 'fileUploadItem';
  fileUploadItem.innerHTML = `<p><strong>${fileName}</strong></p><p>${fileSize} MB</p>`;
  fileUploadList.appendChild(fileUploadItem);
  setTimeout(() => {
    fileUploadItem.classList.add('fade-out');
    setTimeout(() => {
      fileUploadItem.remove();
    }, 1000);
  }, 3000);
}

// Update currency value
function updateCurrencyValue() {
  const currencyElement = document.getElementById('currency');
  currencyElement.textContent = currency.toFixed(2);
}

// Update network speed value
function updateNetworkSpeedValue() {
  const networkSpeedElement = document.getElementById('networkSpeed');
  networkSpeedElement.textContent = networkSpeed;
}

// Update credit value
function updateCreditValue() {
  const creditValueElement = document.getElementById('creditValue');
  creditValueElement.textContent = creditValue;
}

// Update upgrade costs
function updateUpgradeCosts() {
  const upgradeNetworkSpeedBtn = document.getElementById('upgradeNetworkSpeedBtn');
  const upgradeCreditValueBtn = document.getElementById('upgradeCreditValueBtn');
  upgradeNetworkSpeedBtn.textContent = `Upgrade Network Speed (${networkSpeedUpgradeCost})`;
  upgradeCreditValueBtn.textContent = `Upgrade Credit Value (${creditValueUpgradeCost})`;
}

// Upgrade network speed
function upgradeNetworkSpeed() {
  if (currency >= networkSpeedUpgradeCost) {
    currency -= networkSpeedUpgradeCost;
    networkSpeed++;
    networkSpeedUpgradeCost *= 2;
    updateCurrencyValue();
    updateNetworkSpeedValue();
    updateUpgradeCosts();
    saveGame();
  }
}

// Upgrade credit value
function upgradeCreditValue() {
  if (currency >= creditValueUpgradeCost) {
    currency -= creditValueUpgradeCost;
    creditValue++;
    creditValueUpgradeCost *= 2;
    updateCurrencyValue();
    updateCreditValue();
    updateUpgradeCosts();
    saveGame();
  }
}

// Generate a random string
function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Autosave every 10 seconds
setInterval(saveGame, 10000);

// Load the game
loadGame();

// Start the game
function startGame() {
  const upgradeNetworkSpeedBtn = document.getElementById('upgradeNetworkSpeedBtn');
  upgradeNetworkSpeedBtn.addEventListener('click', upgradeNetworkSpeed);

  const upgradeCreditValueBtn = document.getElementById('upgradeCreditValueBtn');
  upgradeCreditValueBtn.addEventListener('click', upgradeCreditValue);

  simulateLoading(); // Start the loading process

  setInterval(() => {
    const fileUpload = generateFileUpload();
    addFileUploadItem(fileUpload.fileName, fileUpload.fileSize);
    currency += networkSpeed * creditValue;
    updateCurrencyValue();
  }, 2000);
}

// Toggle fullscreen
function toggleFullscreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  const exitFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    exitFullScreen.call(doc);
  }
}

// Initialize the game
startGame();
