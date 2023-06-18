// Game variables
let totalCredits = 0;
let networkSpeed = 1;
let creditValue = 1;
let isUploading = false;

// Generate a random file name
function generateFileName() {
  const extensions = ['txt', 'jpg', 'png', 'pdf', 'doc'];
  const randomExtension = extensions[Math.floor(Math.random() * extensions.length)];
  const randomName = Math.random().toString(36).substring(2, 7);
  return `${randomName}.${randomExtension}`;
}

// Update the game stats
function updateStats() {
  document.getElementById('networkSpeed').textContent = `${networkSpeed} KB/s`;
  document.getElementById('creditValue').textContent = `$${creditValue}`;
  document.getElementById('totalCredits').textContent = totalCredits;
}

// Function to handle file upload
function uploadFile() {
  if (isUploading) return;

  isUploading = true;

  // Generate a random file size between 1 KB and 10 MB
  let fileSize = Math.floor(Math.random() * (10000 - 1 + 1) + 1);

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
    fileSize += Math.floor(Math.random() * (100 - 10 + 1) + 10); // Increase file size
    fileUploadItem.innerText = `Uploaded ${fileName} (${fileSize} KB)`;
    fileUploadItem.classList.add('fade-out');
    setTimeout(() => {
      fileUploadList.removeChild(fileUploadItem);
      isUploading = false;

      // Automatically upload a new file after 3 seconds
      setTimeout(uploadFile, 3000);
    }, 5000); // 5 seconds for fade-out animation
  }, uploadTime * 1000);
}

// Auto file uploading system
function autoUploadFiles() {
  setInterval(() => {
    if (!isUploading) {
      uploadFile();
    }
  }, 3000);
}

// Upgrade network speed
function upgradeNetworkSpeed() {
  const upgradeCost = networkSpeed * 10;
  if (totalCredits >= upgradeCost) {
    totalCredits -= upgradeCost;
    networkSpeed++;
    updateStats();
  }
}

// Upgrade credit value
function upgradeCreditValue() {
  const upgradeCost = creditValue * 10;
  if (totalCredits >= upgradeCost) {
    totalCredits -= upgradeCost;
    creditValue++;
    updateStats();
  }
}

// Save game progress
function saveGame() {
  const saveData = {
    totalCredits,
    networkSpeed,
    creditValue
  };
  localStorage.setItem('idleUploadSave', JSON.stringify(saveData));
  alert('Game saved!');
}

// Load game progress
function loadGame() {
  const saveData = JSON.parse(localStorage.getItem('idleUploadSave'));
  if (saveData) {
    totalCredits = saveData.totalCredits || 0;
    networkSpeed = saveData.networkSpeed || 1;
    creditValue = saveData.creditValue || 1;
    updateStats();
    alert('Game loaded!');
  } else {
    alert('No saved game found!');
  }
}

// Event listeners
document.getElementById('uploadBtn').addEventListener('click', uploadFile);
document.getElementById('upgradeNetworkSpeedBtn').addEventListener('click', upgradeNetworkSpeed);
document.getElementById('upgradeCreditValueBtn').addEventListener('click', upgradeCreditValue);
document.getElementById('saveBtn').addEventListener('click', saveGame);
document.getElementById('loadBtn').addEventListener('click', loadGame);

// Start the auto file uploading system
autoUploadFiles();
