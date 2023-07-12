// Constants
const NETWORK_SPEED_UPGRADE_COST = 100;
const CREDIT_VALUE_UPGRADE_COST = 50;

// Variables
let networkSpeed = 0;
let creditValue = 1;
let totalCredits = 0;
let fileCount = 0;

// DOM Elements
const networkSpeedElement = document.getElementById('networkSpeed');
const creditValueElement = document.getElementById('creditValue');
const totalCreditsElement = document.getElementById('totalCredits');
const fileUploadListElement = document.getElementById('fileUploadList');
const uploadFileButton = document.getElementById('uploadFileButton');
const upgradeNetworkSpeedButton = document.getElementById('upgradeNetworkSpeedButton');
const upgradeCreditValueButton = document.getElementById('upgradeCreditValueButton');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');

// Update network speed element
function updateNetworkSpeed() {
  networkSpeedElement.textContent = `${networkSpeed} KB/s`;
}

// Update credit value element
function updateCreditValue() {
  creditValueElement.textContent = creditValue;
}

// Update total credits element
function updateTotalCredits() {
  totalCreditsElement.textContent = totalCredits;
}

// Create a new file element
function createFileElement(fileName, fileSize) {
  const fileElement = document.createElement('li');
  fileElement.classList.add('file');

  const fileIconElement = document.createElement('div');
  fileIconElement.classList.add('file-icon');
  fileElement.appendChild(fileIconElement);

  const fileInfoElement = document.createElement('div');
  fileInfoElement.classList.add('file-info');
  fileElement.appendChild(fileInfoElement);

  const fileNameElement = document.createElement('div');
  fileNameElement.classList.add('file-name');
  fileNameElement.textContent = fileName;
  fileInfoElement.appendChild(fileNameElement);

  const fileStatusElement = document.createElement('div');
  fileStatusElement.classList.add('file-status');
  fileStatusElement.textContent = 'Uploading';
  fileInfoElement.appendChild(fileStatusElement);

  const fileProgressBarElement = document.createElement('div');
  fileProgressBarElement.classList.add('file-progress-bar');
  fileInfoElement.appendChild(fileProgressBarElement);

  fileUploadListElement.appendChild(fileElement);

  // Animate the progress bar
  setTimeout(() => {
    fileProgressBarElement.classList.add('fade-out');
  }, 5000);

  // Remove the file element after the animation
  setTimeout(() => {
    fileElement.remove();
  }, 6000);
}

// Upload a new file
function uploadFile() {
  const fileName = `file_${fileCount}`;
  const fileSize = Math.floor(Math.random() * 1000) + 1; // Random file size between 1 and 1000
  const fileCredits = fileSize * creditValue;

  totalCredits += fileCredits;
  updateTotalCredits();

  createFileElement(fileName, fileSize);

  fileCount++;
}

// Upgrade network speed
function upgradeNetworkSpeed() {
  const upgradeCost = NETWORK_SPEED_UPGRADE_COST * (networkSpeed + 1);
  if (totalCredits >= upgradeCost) {
    totalCredits -= upgradeCost;
    networkSpeed++;
    updateNetworkSpeed();
    updateTotalCredits();
  }
}

// Upgrade credit value
function upgradeCreditValue() {
  const upgradeCost = CREDIT_VALUE_UPGRADE_COST * creditValue;
  if (totalCredits >= upgradeCost) {
    totalCredits -= upgradeCost;
    creditValue++;
    updateCreditValue();
    updateTotalCredits();
  }
}

// Save game progress
function saveGame() {
  const gameData = {
    networkSpeed,
    creditValue,
    totalCredits,
    fileCount,
  };
  localStorage.setItem('uploadSimulatorGameData', JSON.stringify(gameData));
  alert('Game saved!');
}

// Load game progress
function loadGame() {
  const savedGameData = localStorage.getItem('uploadSimulatorGameData');
  if (savedGameData) {
    const gameData = JSON.parse(savedGameData);
    networkSpeed = gameData.networkSpeed;
    creditValue = gameData.creditValue;
    totalCredits = gameData.totalCredits;
    fileCount = gameData.fileCount;
    updateNetworkSpeed();
    updateCreditValue();
    updateTotalCredits();
    alert('Game loaded!');
  } else {
    alert('No saved game found!');
  }
}

// Event listeners
uploadFileButton.addEventListener('click', uploadFile);
upgradeNetworkSpeedButton.addEventListener('click', upgradeNetworkSpeed);
upgradeCreditValueButton.addEventListener('click', upgradeCreditValue);
saveButton.addEventListener('click', saveGame);
loadButton.addEventListener('click', loadGame);

// Initialize game
updateNetworkSpeed();
updateCreditValue();
updateTotalCredits();
