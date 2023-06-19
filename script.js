// Global variables
let networkSpeed = 1;
let creditValue = 1;
let totalCredits = 0;
let networkSpeedPerSecond = 0;
let creditsPerSecond = 0;
let fileCount = 0;

// Handle file upload
function handleUploadFile() {
  const uploadFileBtn = document.getElementById('uploadFileBtn');
  uploadFileBtn.addEventListener('click', function() {
    const fileElement = createFileElement();
    const fileUploadList = document.getElementById('fileUploadList');
    fileUploadList.appendChild(fileElement);
    animateProgressBar(fileElement);

    // Automatically upload new file in 3 seconds
    setTimeout(function() {
      handleUploadFile();
    }, 3000);
  });
}

// Create a new file element
function createFileElement() {
  const fileElement = document.createElement('li');
  fileElement.className = 'file';

  const fileIcon = document.createElement('div');
  fileIcon.className = 'file-icon';

  const fileInfo = document.createElement('div');
  fileInfo.className = 'file-info';

  const fileName = document.createElement('div');
  fileName.className = 'file-name';
  fileName.textContent = `File ${++fileCount}`;

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
  const uploadDuration = Math.random() * 3000 + 2000; // Random duration between 2 to 5 seconds
  fileProgressBar.style.transitionDuration = `${uploadDuration}ms`;
  fileProgressBar.style.width = '100%';

  // When upload is complete
  setTimeout(function() {
    fileElement.classList.add('fade-out');

    // Remove file element after fade out animation is complete
    setTimeout(function() {
      fileElement.remove();
      totalCredits += creditValue;
      updateStats();
    }, 1000);
  }, uploadDuration);
}

// Upgrade network speed
function upgradeNetworkSpeed() {
  networkSpeed += 1;
  updateStats();
  displayNetworkSpeed();
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
updateStats(); // Initialize stats
displayNetworkSpeed(); // Initialize network speed display
