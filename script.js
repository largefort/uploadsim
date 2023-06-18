// Define global variables
let currency = 0;
let networkSpeed = 1;
let creditValue = 1;

// Function to generate a random file name
function generateFileName() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let fileName = '';
  for (let i = 0; i < 10; i++) {
    fileName += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return fileName;
}

// Function to generate a random file size
function generateFileSize() {
  return Math.floor(Math.random() * 1000) + 1; // Generate a random number between 1 and 1000
}

// Function to generate a random file upload
function generateFileUpload() {
  const fileName = generateFileName();
  const fileSize = generateFileSize();
  return { fileName, fileSize };
}

// Function to add a file upload item to the list
function addFileUploadItem(fileName, fileSize) {
  const fileUploadList = document.getElementById('fileUploadList');
  const fileUploadItem = document.createElement('div');
  fileUploadItem.className = 'fileUploadItem';
  fileUploadItem.innerText = `${fileName} (${fileSize} KB) uploaded`;
  fileUploadList.appendChild(fileUploadItem);

  // Update currency and credit value
  const creditsEarned = fileSize * creditValue;
  currency += creditsEarned;
  document.getElementById('currency').innerText = currency;

  // Apply fading effect to the file item
  setTimeout(() => {
    fileUploadItem.style.opacity = '0';
    setTimeout(() => {
      fileUploadItem.remove();
    }, 1000); // Fade out duration: 1 second
  }, 3000); // Display duration: 3 seconds
}

// Function to increase credit value
function increaseCreditValue() {
  creditValue++;
  document.getElementById('creditValue').innerText = creditValue;
}

// Function to increase network speed
function increaseNetworkSpeed() {
  networkSpeed++;
  document.getElementById('networkSpeed').innerText = networkSpeed;
}

// Function to upgrade network speed
function upgradeNetworkSpeed() {
  if (currency >= 10) {
    currency -= 10;
    document.getElementById('currency').innerText = currency;
    increaseNetworkSpeed();
  }
}

// Function to upgrade credit value
function upgradeCreditValue() {
  if (currency >= 10) {
    currency -= 10;
    document.getElementById('currency').innerText = currency;
    increaseCreditValue();
  }
}

// Simulate file uploads based on network speed
function simulateFileUploads() {
  const { fileName, fileSize } = generateFileUpload();
  addFileUploadItem(fileName, fileSize);
  setTimeout(simulateFileUploads, 1000 / networkSpeed);
}

// Increase credit value every 10 seconds
setInterval(() => {
  increaseCreditValue();
}, 10000);

// Increase network speed every 30 seconds
setInterval(() => {
  increaseNetworkSpeed();
}, 30000);

// Event listeners for upgrade buttons
document.getElementById('upgradeNetworkSpeedBtn').addEventListener('click', upgradeNetworkSpeed);
document.getElementById('upgradeCreditValueBtn').addEventListener('click', upgradeCreditValue);

// Start simulating file uploads
simulateFileUploads();
