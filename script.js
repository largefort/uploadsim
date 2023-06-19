// Constants
const FILE_UPLOAD_SPEED = 1000; // File upload speed in milliseconds
const FADE_OUT_DURATION = 5000; // Fade out duration for file elements in milliseconds

// Global variables
let networkSpeed = 1;
let creditValue = 1;
let totalCredits = 0;
let networkSpeedPerSecond = 0;
let creditsPerSecond = 0;

// File icons
const fileIcons = {
  image: 'image-icon.png',
  video: 'video-icon.png',
  audio: 'audio-icon.png',
  document: 'document-icon.png',
};

// File extensions
const fileExtensions = {
  image: ['.jpg', '.png', '.gif'],
  video: ['.mp4', '.avi', '.mov'],
  audio: ['.mp3', '.wav', '.ogg'],
  document: ['.txt', '.pdf', '.doc'],
};

// File upload list
const fileUploadList = document.getElementById('fileUploadList');

// Buttons
const uploadFileBtn = document.getElementById('uploadFileBtn');
const networkSpeedUpgradeBtn = document.getElementById('networkSpeedUpgradeBtn');
const creditValueUpgradeBtn = document.getElementById('creditValueUpgradeBtn');

// Event listeners
uploadFileBtn.addEventListener('click', handleUploadFile);
networkSpeedUpgradeBtn.addEventListener('click', upgradeNetworkSpeed);
creditValueUpgradeBtn.addEventListener('click', upgradeCreditValue);

// Handle file upload
function handleUploadFile() {
  const file = generateRandomFile();
  const fileElement = createFileElement(file);

  fileUploadList.appendChild(fileElement);
  animateProgressBar(fileElement);

  const uploadDuration = file.size / networkSpeed;
  const creditsEarned = file.size * creditValue;
  totalCredits += creditsEarned;

  setTimeout(() => {
    fileElement.classList.add('fade-out');
    setTimeout(() => {
      fileUploadList.removeChild(fileElement);
      updateStats();
      handleUploadFile(); // Automatically upload a new file
    }, FADE_OUT_DURATION);
  }, uploadDuration);
}

// Generate a random file
function generateRandomFile() {
  const fileTypes = Object.keys(fileIcons);
  const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
  const randomExtension =
    fileExtensions[randomType][Math.floor(Math.random() * fileExtensions[randomType].length)];
  const randomSize = Math.floor(Math.random() * 100) + 1; // Random file size between 1 and 100 KB

  return {
    name: generateRandomFileName(randomType, randomExtension),
    type: randomType,
    extension: randomExtension,
    size: randomSize,
  };
}

// Generate a random file name
function generateRandomFileName(type, extension) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let fileName = '';

  for (let i = 0; i < 5; i++) {
    fileName += characters[Math.floor(Math.random() * characters.length)];
  }

  return `${fileName}${extension}`;
}

// Create a file element
function createFileElement(file) {
  const fileElement = document.createElement('li');
  fileElement.className = 'file';

  const fileIcon = document.createElement('div');
  fileIcon.className = 'file-icon';
  fileIcon.style.backgroundImage = `url(${fileIcons[file.type]})`;

  const fileInfo = document.createElement('div');
  fileInfo.className = 'file-info';

  const fileName = document.createElement('div');
  fileName.className = 'file-name';
  fileName.textContent = file.name;

  const fileStatus = document.createElement('div');
  fileStatus.className = 'file-status';
  fileStatus.textContent = 'Uploading...';

  const fileProgressBar = document.createElement('div');
  fileProgressBar.className = 'file-progress-bar';

  fileInfo.appendChild(fileName);
  fileInfo.appendChild(fileStatus);
  fileInfo.appendChild(fileProgressBar);

  fileElement.appendChild(fileIcon);
  fileElement.appendChild(fileInfo);

  return fileElement;
}

// Animate progress bar
function animateProgressBar(fileElement) {
  const fileProgressBar = fileElement.querySelector('.file-progress-bar');
  const uploadDuration = fileElement.querySelector('.file-info').textContent.size / networkSpeed;
  fileProgressBar.style.transitionDuration = `${uploadDuration}ms`;
  fileProgressBar.style.width = '100%';
}

// Upgrade network speed
function upgradeNetworkSpeed() {
  networkSpeed += 1;
  updateStats();
}

// Upgrade credit value
function upgradeCreditValue() {
  creditValue += 1;
  updateStats();
}

// Update stats
function updateStats() {
  const networkSpeedElement = document.getElementById('networkSpeed');
  networkSpeedElement.textContent = networkSpeed;

  const creditValueElement = document.getElementById('creditValue');
  creditValueElement.textContent = creditValue;

  const totalCreditsElement = document.getElementById('totalCredits');
  totalCreditsElement.textContent = totalCredits;

  networkSpeedPerSecond = networkSpeed * creditsPerSecond;
  const networkSpeedPerSecondElement = document.getElementById('networkSpeedPerSecond');
  networkSpeedPerSecondElement.textContent = networkSpeedPerSecond;

  const creditsPerSecondElement = document.getElementById('creditsPerSecond');
  creditsPerSecondElement.textContent = creditsPerSecond;
}

// Start the game
handleUploadFile(); // Automatically start uploading files
