const uploadArea = document.querySelector('.upload-area');
const pointsSpan = document.getElementById('points');
const diskUsageSpan = document.getElementById('diskUsage');
const storageCapacitySpan = document.getElementById('storageCapacity');
const prestigePointsSpan = document.getElementById('prestigePoints');
const storageUpgradeCostSpan = document.getElementById('storageUpgradeCost');
let points = 0;
let uploadSpeed = 1000; // Milliseconds between each upload
let maxStorageCapacity = 8; // Maximum storage capacity
let diskUsage = 0; // Number of files uploaded
let prestigePoints = 0; // Prestige points earned
let storageUpgradeCost = 10; // Cost in points for the storage upgrade
let autoUploadEnabled = false; // Flag to indicate if auto-upload is enabled
let uploadInterval; // Reference to the interval for the upload bot

// Sound effects
const uploadSound = new Audio('upload_sound.mp3');
const bonusSound = new Audio('bonus_sound.mp3');

const fileIcons = [
  'file-alt', 'file-archive', 'file-audio', 'file-code', 'file-excel',
  'file-image', 'file-pdf', 'file-powerpoint', 'file-video', 'file-word'
];

const fileSizeUnits = ['B', 'KB', 'MB', 'GB', 'TB'];
const uploadSpeedUpgradeCost = 100; // Cost in points for the upload speed upgrade

document.getElementById('uploadButton').addEventListener('click', uploadFile);
document.getElementById('autoUploadToggle').addEventListener('change', toggleAutoUpload);

storageCapacitySpan.textContent = maxStorageCapacity;
pointsSpan.textContent = points;
prestigePointsSpan.textContent = prestigePoints;
storageUpgradeCostSpan.textContent = storageUpgradeCost;

// Load saved data if available
loadSavedData();

// Start the auto-save feature
startAutoSave();

function uploadFile() {
  if (diskUsage >= maxStorageCapacity) {
    alert('Storage is full. Upgrade your storage capacity.');
    return;
  }

  const randomFileIcon = getRandomFileIcon();
  const fileSize = Math.floor(Math.random() * (10 * 1024 * 1024)) + 1024; // Random file size between 1 KB and 10 MB
  const fileElement = createFileElement(randomFileIcon, fileSize);
  uploadArea.appendChild(fileElement);
  points += 10;
  pointsSpan.textContent = points;
  diskUsage++;
  diskUsageSpan.textContent = diskUsage;

  // Play upload sound
  uploadSound.play();

  // Show bonus animation if a rare file is uploaded (you can customize this condition based on your game mechanics)
  if (points % 50 === 0) {
    showBonusAnimation();
  }

  // Check if the player reaches the maximum points before prestige
  if (points >= 1000) {
    showPrestigeConfirmation();
  }
}

function toggleAutoUpload() {
  autoUploadEnabled = !autoUploadEnabled;

  if (autoUploadEnabled) {
    uploadInterval = setInterval(uploadFile, uploadSpeed);
  } else {
    clearInterval(uploadInterval);
  }
}

function getRandomFileIcon() {
  const randomIndex = Math.floor(Math.random() * fileIcons.length);
  return fileIcons[randomIndex];
}

function createFileElement(iconClass, fileSize) {
  const fileElement = document.createElement('div');
  fileElement.classList.add('upload-item');
  fileElement.innerHTML = `<i class="fas fa-${iconClass}"></i> ${formatFileSize(fileSize)}`;
  return fileElement;
}

function formatFileSize(sizeInBytes) {
  let index = 0;
  while (sizeInBytes >= 1024 && index < fileSizeUnits.length - 1) {
    sizeInBytes /= 1024;
    index++;
  }
  return sizeInBytes.toFixed(2) + ' ' + fileSizeUnits[index];
}

function showBonusAnimation() {
  // Play bonus sound
  bonusSound.play();

  // Add bonus animation to the container
  const bonusAnimation = document.createElement('div');
  bonusAnimation.classList.add('bonus-animation');
  bonusAnimation.textContent = '+50'; // You can customize the text or use an image instead
  document.querySelector('.container').appendChild(bonusAnimation);

  // Show notification for the bonus earned
  showNotification('Bonus: +50 points');

  // Remove the animation after a short delay
  setTimeout(() => {
    bonusAnimation.remove();
  }, 2000); // Adjust the duration as needed
}

function buyUploadSpeedUpgrade() {
  if (points >= uploadSpeedUpgradeCost) {
    points -= uploadSpeedUpgradeCost;
    uploadSpeed *= 0.8; // Increase upload speed by 20% (adjust the value as needed)
    pointsSpan.textContent = points;
    showNotification('Upload Speed Upgrade Purchased! Uploads will be faster now.');
  } else {
    showNotification('Not enough points to buy the upgrade.');
  }
}

function buyStorageUpgrade() {
  if (points >= storageUpgradeCost) {
    points -= storageUpgradeCost;
    maxStorageCapacity += 5; // Increase maximum storage capacity by 5 (you can adjust the value as needed)
    storageUpgradeCost += 100; // Increase the cost for the next storage upgrade (you can adjust the value as needed)
    pointsSpan.textContent = points;
    storageCapacitySpan.textContent = maxStorageCapacity;
    storageUpgradeCostSpan.textContent = storageUpgradeCost;
    showNotification(`Storage Capacity Upgraded! Your new capacity is ${maxStorageCapacity}.`);
  } else {
    showNotification('Not enough points to buy the upgrade.');
  }
}

function showNotification(message) {
  const notificationContainer = document.querySelector('.notification-container');
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  // Remove the notification after a short delay
  setTimeout(() => {
    notification.remove();
  }, 3000); // Adjust the duration as needed
}

const autoSaveInterval = 60000; // Auto-save interval in milliseconds (e.g., 1 minute)
let autoSaveTimer; // Reference to the auto-save timer

function loadSavedData() {
  const savedPoints = localStorage.getItem('points');
  const savedDiskUsage = localStorage.getItem('diskUsage');
  const savedPrestigePoints = localStorage.getItem('prestigePoints');

  if (savedPoints !== null && savedDiskUsage !== null && savedPrestigePoints !== null) {
    points = parseInt(savedPoints);
    diskUsage = parseInt(savedDiskUsage);
    prestigePoints = parseInt(savedPrestigePoints);

    pointsSpan.textContent = points;
    diskUsageSpan.textContent = diskUsage;
    prestigePointsSpan.textContent = prestigePoints;
  }
}

function startAutoSave() {
  autoSaveTimer = setInterval(saveGameData, autoSaveInterval);
}

function saveGameData() {
  localStorage.setItem('points', points);
  localStorage.setItem('diskUsage', diskUsage);
  localStorage.setItem('prestigePoints', prestigePoints);
}
