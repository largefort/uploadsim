// Global variables
let networkSpeed = 0;
let creditValue = 1;
let totalCredits = 0;

// DOM elements
const uploadButton = document.getElementById('uploadButton');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const upgradeButton = document.getElementById('upgradeButton');
const creditsUpgradeButton = document.getElementById('creditsUpgradeButton');
const networkSpeedStat = document.getElementById('networkSpeedStat');
const creditValueStat = document.getElementById('creditValueStat');
const totalCreditsStat = document.getElementById('totalCreditsStat');
const fileList = document.getElementById('fileList');

// Function to generate a random file name
function generateRandomFileName() {
  const fileNames = ['document', 'image', 'video', 'audio', 'data', 'code'];
  const fileExtensions = ['.txt', '.jpg', '.mp4', '.mp3', '.csv', '.js'];
  const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
  const randomExtension = fileExtensions[Math.floor(Math.random() * fileExtensions.length)];
  return randomName + randomExtension;
}

// Function to generate an AI file
function generateAIFile() {
  const fileName = generateRandomFileName();
  const fileSize = Math.floor(Math.random() * 100) + 1; // Random file size between 1 and 100 KB
  return { name: fileName, size: fileSize };
}

// Function to update the network speed and credit value stats
function updateStats() {
  networkSpeedStat.textContent = `${networkSpeed} kb/s`;
  creditValueStat.textContent = creditValue;
  totalCreditsStat.textContent = totalCredits;
}

// Function to simulate file uploading
function uploadFile() {
  const file = generateAIFile();

  const fileItem = document.createElement('li');
  fileItem.classList.add('file');

  const fileIcon = document.createElement('span');
  fileIcon.classList.add('file-icon');
  fileIcon.innerHTML = '<i class="fa fa-file"></i>';

  const fileInfo = document.createElement('div');
  fileInfo.classList.add('file-info');

  const fileName = document.createElement('span');
  fileName.classList.add('file-name');
  fileName.textContent = file.name;

  const fileExtension = document.createElement('span');
  fileExtension.classList.add('file-extension');
  fileExtension.textContent = `Size: ${file.size} KB`;

  fileInfo.appendChild(fileName);
  fileInfo.appendChild(fileExtension);

  fileItem.appendChild(fileIcon);
  fileItem.appendChild(fileInfo);

  fileList.appendChild(fileItem);

  // Scroll to the bottom of the file list
  fileList.scrollTop = fileList.scrollHeight;

  // Update total credits based on file size and credit value
  const creditsEarned = file.size * creditValue;
  totalCredits += creditsEarned;

  updateStats();
}

// Event listener for upload button click
uploadButton.addEventListener('click', () => {
  uploadFile();
});

// Event listener for save button click
saveButton.addEventListener('click', () => {
  alert('Saving game...');
});

// Event listener for load button click
loadButton.addEventListener('click', () => {
  alert('Loading game...');
});

// Event listener for network speed upgrade button click
upgradeButton.addEventListener('click', () => {
  networkSpeed += 1;
  updateStats();
});

// Event listener for credit value upgrade button click
creditsUpgradeButton.addEventListener('click', () => {
  creditValue += 1;
  updateStats();
});

// Initialize game
function initializeGame() {
  updateStats();
  uploadFile();
}

// Delay the display of the game content for 3 seconds
setTimeout(() => {
  document.getElementById('loadingScreen').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  initializeGame();
}, 3000);
