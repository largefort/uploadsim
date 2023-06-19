// Constants
const MAX_FILE_SIZE = 500; // Maximum file size in KB
const NETWORK_SPEED_UPGRADE_COST = 10; // Cost of network speed upgrade in credits
const CREDIT_VALUE_UPGRADE_COST = 10; // Cost of credit value upgrade in credits

// Variables
let networkSpeed = 1; // Network speed in KB/s
let creditValue = 1; // Credit value in credits/KB
let totalCredits = 0; // Total credits earned

// File icons
const fileIcons = [
  "file_icon1.png",
  "file_icon2.png",
  "file_icon3.png",
  // Add more file icons here
];

// Function to generate a random file name
function generateFileName() {
  const fileNameLength = Math.floor(Math.random() * 8) + 5;
  let fileName = "";
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < fileNameLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    fileName += characters.charAt(randomIndex);
  }

  return fileName;
}

// Function to generate a random file extension
function generateFileExtension() {
  const extensions = ["txt", "doc", "pdf", "jpg", "png", "mp3", "mp4"];
  const randomIndex = Math.floor(Math.random() * extensions.length);
  return extensions[randomIndex];
}

// Function to convert file size to a human-readable format
function formatFileSize(fileSize) {
  if (fileSize < 1024) {
    return fileSize + " B";
  } else if (fileSize < 1024 * 1024) {
    return (fileSize / 1024).toFixed(2) + " KB";
  } else if (fileSize < 1024 * 1024 * 1024) {
    return (fileSize / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}

// Function to handle file upload
function uploadFile() {
  // Generate file name and extension
  const fileName = generateFileName();
  const fileExtension = generateFileExtension();
  
  // Generate random file size
  const fileSize = Math.floor(Math.random() * (MAX_FILE_SIZE * 1024)) + 1;

  // Calculate upload time based on network speed
  const uploadTime = fileSize / (networkSpeed * 1024);

  // Calculate credits earned based on file size and credit value
  const creditsEarned = fileSize * creditValue;

  // Create file object
  const file = {
    name: fileName,
    extension: fileExtension,
    size: fileSize,
    time: uploadTime,
    credits: creditsEarned
  };

  // Add file to the list
  addFileToList(file);

  // Deduct credits from total
  totalCredits -= creditsEarned;

  // Update total credits display
  updateTotalCreditsDisplay();
}

// Function to add a file to the file upload list
function addFileToList(file) {
  const fileUploadList = document.getElementById("fileUploadList");

  const fileItem = document.createElement("li");
  fileItem.className = "file";

  const fileIcon = document.createElement("div");
  fileIcon.className = "file-icon";
  const randomIconIndex = Math.floor(Math.random() * fileIcons.length);
  fileIcon.style.backgroundImage = `url(${fileIcons[randomIconIndex]})`;
  fileItem.appendChild(fileIcon);

  const fileInfo = document.createElement("div");
  fileInfo.className = "file-info";
  fileInfo.innerHTML = `
    <div class="file-name">${file.name}.${file.extension}</div>
    <div class="file-status">Uploading...</div>
    <div class="file-progress-bar"></div>
  `;
  fileItem.appendChild(fileInfo);

  fileUploadList.appendChild(fileItem);

  // Animate file entry
  fileItem.classList.add("fade-in");

  // Animate progress bar
  animateProgressBar(fileItem.querySelector(".file-progress-bar"), file.time, () => {
    // Update file status
    fileInfo.querySelector(".file-status").textContent = "Upload Complete";

    // Add credits to total
    totalCredits += file.credits;

    // Update total credits display
    updateTotalCreditsDisplay();

    // Automatically upload a new file after 3 seconds
    setTimeout(uploadFile, 3000);
  });
}

// Function to animate the progress bar
function animateProgressBar(progressBar, time, callback) {
  let progress = 0;
  const increment = 100 / (time * 10);

  const interval = setInterval(() => {
    progress += increment;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      if (callback) {
        callback();
      }
    }
  }, 100);
}

// Function to update the total credits display
function updateTotalCreditsDisplay() {
  const totalCreditsElement = document.getElementById("totalCredits");
  totalCreditsElement.textContent = totalCredits + " credits";
}

// Function to upgrade network speed
function upgradeNetworkSpeed() {
  if (totalCredits >= NETWORK_SPEED_UPGRADE_COST) {
    networkSpeed *= 2;
    totalCredits -= NETWORK_SPEED_UPGRADE_COST;
    updateNetworkSpeedDisplay();
    updateTotalCreditsDisplay();
  }
}

// Function to upgrade credit value
function upgradeCreditValue() {
  if (totalCredits >= CREDIT_VALUE_UPGRADE_COST) {
    creditValue += 1;
    totalCredits -= CREDIT_VALUE_UPGRADE_COST;
    updateCreditValueDisplay();
    updateTotalCreditsDisplay();
  }
}

// Function to update the network speed display
function updateNetworkSpeedDisplay() {
  const networkSpeedElement = document.getElementById("networkSpeed");
  networkSpeedElement.textContent = networkSpeed + " KB/s";
}

// Function to update the credit value display
function updateCreditValueDisplay() {
  const creditValueElement = document.getElementById("creditValue");
  creditValueElement.textContent = creditValue + " credits/KB";
}

// Function to handle the save button click
function handleSaveButtonClick() {
  // Save the game data (network speed, credit value, total credits) to local storage or backend
  // Implement your save logic here
  alert("Game saved!");
}

// Function to handle the load button click
function handleLoadButtonClick() {
  // Load the game data (network speed, credit value, total credits) from local storage or backend
  // Implement your load logic here
  alert("Game loaded!");
}

// Add event listeners
document.getElementById("uploadFileButton").addEventListener("click", uploadFile);
document.getElementById("upgradeNetworkSpeedButton").addEventListener("click", upgradeNetworkSpeed);
document.getElementById("upgradeCreditValueButton").addEventListener("click", upgradeCreditValue);
document.getElementById("saveButton").addEventListener("click", handleSaveButtonClick);
document.getElementById("loadButton").addEventListener("click", handleLoadButtonClick);

// Initial setup
updateNetworkSpeedDisplay();
updateCreditValueDisplay();
updateTotalCreditsDisplay();
