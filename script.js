// Constants
const fileExtensions = ['.txt', '.doc', '.pdf', '.jpg', '.png', '.mp3', '.mp4'];
const fileIcons = ['file-alt', 'file-word', 'file-pdf', 'file-image', 'file-image', 'file-audio', 'file-video'];
const networkSpeedUpgrades = [10, 50, 100, 500, 1000]; // Speed in KB/s
const creditValueUpgrades = [10, 50, 100, 500, 1000]; // Value in credits

// Variables
let networkSpeed = 10; // Initial network speed in KB/s
let creditValue = 1; // Initial credit value
let totalCredits = 0; // Total earned credits

// Elements
const fileList = document.getElementById('fileList');
const networkSpeedStat = document.getElementById('networkSpeedStat');
const creditValueStat = document.getElementById('creditValueStat');
const totalCreditsStat = document.getElementById('totalCreditsStat');
const uploadButton = document.getElementById('uploadButton');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const upgradeButton = document.getElementById('upgradeButton');
const creditsUpgradeButton = document.getElementById('creditsUpgradeButton');

// Update stats
function updateStats() {
  networkSpeedStat.textContent = `${networkSpeed} KB/s`;
  creditValueStat.textContent = creditValue;
  totalCreditsStat.textContent = totalCredits;
}

// Generate a random file name
function generateFileName() {
  const fileNameLength = Math.floor(Math.random() * 8) + 4;
  let fileName = '';

  for (let i = 0; i < fileNameLength; i++) {
    fileName += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }

  return fileName;
}

// Generate a random file extension
function generateFileExtension() {
  return fileExtensions[Math.floor(Math.random() * fileExtensions.length)];
}

// Generate a random file
function generateFile() {
  const fileName = generateFileName();
  const fileExtension = generateFileExtension();
  const fileIcon = fileIcons[fileExtensions.indexOf(fileExtension)];

  return {
    name: fileName,
    extension: fileExtension,
    icon: fileIcon,
  };
}

// Upload a file
function uploadFile() {
  const file = generateFile();

  const fileElement = document.createElement('li');
  fileElement.classList.add('file');
  fileElement.innerHTML = `
    <div class="file-info">
      <i class="fas fa-${file.icon} file-icon"></i>
      <span class="file-name">${file.name}</span>
      <span class="file-extension">${file.extension}</span>
    </div>
    <div class="progress-bar"></div>
  `;

  fileList.appendChild(fileElement);

  const progressBar = fileElement.querySelector('.progress-bar');
  const progressAnimation = setInterval(() => {
    progressBar.style.width = `${Math.random() * 100}%`;
  }, 200);

  setTimeout(() => {
    clearInterval(progressAnimation);
    fileElement.remove();
    totalCredits += creditValue;
    updateStats();
    uploadFile();
  }, 5000);
}

// Event listeners
uploadButton.addEventListener('click', () => {
  uploadFile();
});

updateStats();
uploadFile();
