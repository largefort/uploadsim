// JavaScript code

// Variables
let networkSpeed = 1;
let creditValue = 1;
let totalCredits = 0;

// Function to handle file upload
function uploadFile() {
  // Generate a random file size between 1 KB and 10 MB
  const fileSize = Math.floor(Math.random() * (10000 - 1 + 1) + 1);

  // Calculate upload time based on network speed
  const uploadTime = fileSize / networkSpeed;

  // Create a new file upload item
  const fileUploadItem = document.createElement('div');
  fileUploadItem.classList.add('file-upload-item');
  fileUploadItem.innerText = `Uploading ${fileSize} KB...`;

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
    fileUploadList.removeChild(fileUploadItem);
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

// Event listeners
document.getElementById('uploadBtn').addEventListener('click', uploadFile);
document.getElementById('upgradeNetworkSpeedBtn').addEventListener('click', upgradeNetworkSpeed);
document.getElementById('upgradeCreditValueBtn').addEventListener('click', upgradeCreditValue);

// Initial stats update
updateStats();

