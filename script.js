// Variables
let currency = 0;
let networkSpeed = 1;
let creditValue = 1;
let networkSpeedUpgradeCost = 10;
let creditValueUpgradeCost = 10;

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

  // Automatically remove the file upload item after 3 seconds
  setTimeout(() => {
    fileUploadItem.classList.add('fade-out');
    setTimeout(() => {
      fileUploadList.removeChild(fileUploadItem);
    }, 1000);
  }, 3000);
}

// Update the currency value on the page
function updateCurrencyValue() {
  const currencyElement = document.getElementById('currency');
  currencyElement.textContent = currency;
}

// Update the network speed value on the page
function updateNetworkSpeedValue() {
  const networkSpeedElement = document.getElementById('networkSpeed');
  networkSpeedElement.textContent = networkSpeed;
}

// Update the credit value on the page
function updateCreditValue() {
  const creditValueElement = document.getElementById('creditValue');
  creditValueElement.textContent = creditValue;
}

// Upgrade the network speed
function upgradeNetworkSpeed() {
  if (currency >= networkSpeedUpgradeCost) {
    currency -= networkSpeedUpgradeCost;
    networkSpeed++;
    networkSpeedUpgradeCost *= 2;
    updateCurrencyValue();
    updateNetworkSpeedValue();
    updateUpgradeCosts();
  }
}

// Upgrade the credit value
function upgradeCreditValue() {
  if (currency >= creditValueUpgradeCost) {
    currency -= creditValueUpgradeCost;
    creditValue++;
    creditValueUpgradeCost *= 2;
    updateCurrencyValue();
    updateCreditValue();
    updateUpgradeCosts();
  }
}

// Update the upgrade costs on the page
function updateUpgradeCosts() {
  const networkSpeedUpgradeCostElement = document.getElementById('networkSpeedUpgradeCost');
  networkSpeedUpgradeCostElement.textContent = networkSpeedUpgradeCost;

  const creditValueUpgradeCostElement = document.getElementById('creditValueUpgradeCost');
  creditValueUpgradeCostElement.textContent = creditValueUpgradeCost;

  const upgradeNetworkSpeedBtn = document.getElementById('upgradeNetworkSpeedBtn');
  upgradeNetworkSpeedBtn.disabled = currency < networkSpeedUpgradeCost;

  const upgradeCreditValueBtn = document.getElementById('upgradeCreditValueBtn');
  upgradeCreditValueBtn.disabled = currency < creditValueUpgradeCost;
}

// Generate a random string for file names
function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

// Start the game
function startGame() {
  const upgradeNetworkSpeedBtn = document.getElementById('upgradeNetworkSpeedBtn');
  upgradeNetworkSpeedBtn.addEventListener('click', upgradeNetworkSpeed);

  const upgradeCreditValueBtn = document.getElementById('upgradeCreditValueBtn');
  upgradeCreditValueBtn.addEventListener('click', upgradeCreditValue);

  setInterval(() => {
    const fileUpload = generateFileUpload();
    addFileUploadItem(fileUpload.fileName, fileUpload.fileSize);
    currency += networkSpeed * creditValue;
    updateCurrencyValue();
  }, 2000);
}

// Initialize the game
startGame();
