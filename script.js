// Constants
const FILE_UPLOAD_DELAY = 3000; // Delay in milliseconds for new file uploads
const FILE_SIZE_INCREASE = 10; // File size increase in KB

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const gameContainer = document.getElementById('gameContainer');
const fileUploadList = document.getElementById('fileUploadList');
const uploadFileButton = document.getElementById('uploadFileButton');
const upgradeNetworkSpeedButton = document.getElementById('upgradeNetworkSpeedButton');
const upgradeCreditValueButton = document.getElementById('upgradeCreditValueButton');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');

// Global Variables
let networkSpeed = 1; // Network speed in KB/s
let creditValue = 1; // Credit value for each file upload
let totalCredits = 0; // Total credits earned

// Function to generate a random file name with extension
function generateFileName() {
  const extensions = ['.txt', '.doc', '.jpg', '.png', '.mp3', '.mp4'];
  const randomExtension = extensions[Math.floor(Math.random() * extensions.length)];
  return 'file' + Date.now() + randomExtension;
}

// Function to create a new file element
function createFileElement(fileName) {
  const fileElement = document.createElement('li');
  fileElement.classList.add('file');

  const fileIcon = document.createElement('div');
  fileIcon.classList.add('file-icon');
  fileElement.appendChild(fileIcon);

  const fileInfo = document.createElement('div');
  fileInfo.classList.add('file-info');

  const fileNameElement = document.createElement('div');
  fileNameElement.classList.add('file-name');
  fileNameElement.textContent = fileName;
  fileInfo.appendChild(fileNameElement);

  const fileStatus = document.createElement('div');
  fileStatus.classList.add('file-status');
  fileStatus.textContent = 'Uploading';
  fileInfo.appendChild(fileStatus);

  const fileProgressBar = document.createElement('div');
  fileProgressBar.classList.add('file-progress-bar');
  fileInfo.appendChild(fileProgressBar);

  fileElement.appendChild(fileInfo);

  return fileElement;
}

// Function to update the file progress bar
function updateProgressBar(progressBarElement, progressPercentage) {
  progressBarElement.style.width = `${progressPercentage}%`;
}

// Function to upload a file
function uploadFile(fileElement) {
  const progressBarElement = fileElement.querySelector('.file-progress-bar');

  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += networkSpeed;

    if (progress >= 100) {
      clearInterval(progressInterval);
      fileElement.querySelector('.file-status').textContent = 'Upload Complete';
      fileElement.classList.add('fade-out');

      // Increase total credits
      const fileSize = FILE_SIZE_INCREASE * creditValue;
      totalCredits += fileSize;
      document.getElementById('totalCredits').textContent = totalCredits;

      setTimeout(() => {
        fileElement.remove();

        // Create a new file after a delay
        setTimeout(() => {
          const newFileName = generateFileName();
          const newFileElement = createFileElement(newFileName);
          fileUploadList.appendChild(newFileElement);
          uploadFile(newFileElement);
        }, FILE_UPLOAD_DELAY);
      }, 5000); // Wait 5 seconds before removing the file element
    }

    updateProgressBar(progressBarElement, progress);
  }, 1000); // Update progress every second
}

// Function to handle the click event of the Upload File button
function handleUploadFile() {
  const fileName = generateFileName();
  const fileElement = createFileElement(fileName);
  fileUploadList.appendChild(fileElement);
  uploadFile(fileElement);
}

// Function to handle the click event of the Upgrade Network Speed button
function handleUpgradeNetworkSpeed() {
  networkSpeed *= 10;
  document.getElementById('networkSpeed').textContent = `${networkSpeed} KB/s`;
}

// Function to handle the click event of the Upgrade Credit Value button
function handleUpgradeCreditValue() {
  creditValue *= 10;
  document.getElementById('creditValue').textContent = creditValue;
}

// Add event listeners
uploadFileButton.addEventListener('click', handleUploadFile);
upgradeNetworkSpeedButton.addEventListener('click', handleUpgradeNetworkSpeed);
upgradeCreditValueButton.addEventListener('click', handleUpgradeCreditValue);

// Hide loading screen after a delay
setTimeout(() => {
  loadingScreen.style.display = 'none';
  gameContainer.style.display = 'block';
}, 3000);
