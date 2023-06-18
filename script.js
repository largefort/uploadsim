// Variables
let networkSpeed = 1;
let creditValue = 1;
let totalCredits = 0;
let isUploading = false;

// Function to generate a random file name
function generateFileName() {
  const fileNames = [
    'document',
    'photo',
    'video',
    'music',
    'report',
    'presentation',
    'spreadsheet',
    'archive',
    'code',
    'image',
  ];

  const extensions = ['.txt', '.doc', '.pdf', '.jpg', '.mp3', '.mp4', '.xlsx', '.zip', '.html', '.png'];

  const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
  const randomExtension = extensions[Math.floor(Math.random() * extensions.length)];

  return randomName + randomExtension;
}

// Function to handle file upload
function uploadFile() {
  if (isUploading) return;

  isUploading = true;

  // Generate a random file size between 1 KB and 10 MB
  const fileSize = Math.floor(Math.random() * (10000 - 1 + 1) + 1);

  // Calculate upload time based on network speed
  const uploadTime = fileSize / networkSpeed;

  // Generate a random file name
  const fileName = generateFileName();

  // Create a new file upload item
  const fileUploadItem = document.createElement('div');
  fileUploadItem.classList.add('file-upload-item');
  fileUploadItem.innerText = `Uploading ${fileName} (${fileSize} KB)...`;
  fileUploadItem.style.animationDuration = `${uploadTime}s`;

  // Append the new file upload item to the file upload list
  const fileUploadList = document.getElementById('fileUploadList');
  fileUploadList.appendChild(fileUploadItem);

  // Update the total credits
  const creditsEarned = fileSize * creditValue;
  totalCredits += creditsEarned;

  // Update the stats
  updateStats();

  // Remove the file upload item after the upload time
  setTimeout(() => {
    fileUploadItem.classList.add('fade-out');
    setTimeout(() => {
      fileUploadList.removeChild(fileUploadItem);
      isUploading = false;
    }, 5000); // 5 seconds for fade-out animation
  }, uploadTime * 1000);
}

// Function to upgrade the network speed
function upgradeNetworkSpeed() {
  networkSpeed *= 2;
  updateStats();
}

// Function to upgrade the credit value
function upgradeCreditValue() {
  creditValue += 1;
  updateStats();
}

// Function to update the stats
function updateStats() {
  document.getElementById('networkSpeed').textContent = `${networkSpeed} KB/s`;
  document.getElementById('creditValue').textContent = `$${creditValue}`;
  document.getElementById('totalCredits').textContent = totalCredits;
}

// Function to save the game state
function saveGame() {
  const gameData = {
    networkSpeed,
    creditValue,
    totalCredits,
  };

  localStorage.setItem('idleUploadSave', JSON.stringify(gameData));
  alert('Game saved!');
}

// Function to load the saved game state
function loadGame() {
  const savedData = localStorage.getItem('idleUploadSave');
  if (savedData) {
    const gameData = JSON.parse(savedData);
    networkSpeed = gameData.networkSpeed;
    creditValue = gameData.creditValue;
    totalCredits = gameData.totalCredits;
    updateStats();
    alert('Game loaded!');
  } else {
    alert('No saved game found!');
  }
}

// Function to automatically upload files
function autoUploadFiles() {
  setInterval(uploadFile, 5000); // Upload a file every 5 seconds
}

// Event listeners
document.getElementById('uploadBtn').addEventListener('click', uploadFile);
document.getElementById('upgradeNetworkSpeedBtn').addEventListener('click', upgradeNetworkSpeed);
document.getElementById('upgradeCreditValueBtn').addEventListener('click', upgradeCreditValue);
document.getElementById('saveBtn').addEventListener('click', saveGame);
document.getElementById('loadBtn').addEventListener('click', loadGame);
window.addEventListener('load', autoUploadFiles);

// Initial stats update
updateStats();
