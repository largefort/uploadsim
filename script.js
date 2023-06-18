// Network Speed and Credit Value Variables
let networkSpeed = 1;
let creditValue = 1;
let networkSpeedPerSecond = 0;
let creditsPerSecond = 0;

// Button Elements
const uploadFileBtn = document.getElementById('uploadFileBtn');
const networkSpeedUpgradeBtn = document.getElementById('networkSpeedUpgradeBtn');
const creditValueUpgradeBtn = document.getElementById('creditValueUpgradeBtn');

// Stat Elements
const networkSpeedStat = document.getElementById('networkSpeed');
const creditValueStat = document.getElementById('creditValue');
const totalCreditsStat = document.getElementById('totalCredits');
const networkSpeedPerSecondStat = document.getElementById('networkSpeedPerSecond');
const creditsPerSecondStat = document.getElementById('creditsPerSecond');

// Upload File Button Click Event
uploadFileBtn.addEventListener('click', () => {
  const fileSize = getRandomFileSize();
  const uploadTime = fileSize / networkSpeed;

  const file = createFileElement(fileSize);
  const progressBar = createProgressBar();

  file.appendChild(progressBar);
  document.getElementById('fileUploadList').appendChild(file);

  animateProgressBar(progressBar, uploadTime, () => {
    const creditsEarned = fileSize * creditValue;
    incrementTotalCredits(creditsEarned);
  });
});

// Network Speed Upgrade Button Click Event
networkSpeedUpgradeBtn.addEventListener('click', () => {
  const upgradeCost = calculateUpgradeCost(networkSpeed);
  if (totalCredits >= upgradeCost) {
    networkSpeed++;
    decrementTotalCredits(upgradeCost);
    updateNetworkSpeedStat();
  }
});

// Credit Value Upgrade Button Click Event
creditValueUpgradeBtn.addEventListener('click', () => {
  const upgradeCost = calculateUpgradeCost(creditValue);
  if (totalCredits >= upgradeCost) {
    creditValue++;
    decrementTotalCredits(upgradeCost);
    updateCreditValueStat();
  }
});

// Function to update Network Speed Stat
function updateNetworkSpeedStat() {
  networkSpeedStat.textContent = networkSpeed;
}

// Function to update Credit Value Stat
function updateCreditValueStat() {
  creditValueStat.textContent = creditValue;
}

// Function to update Network Speed per Second Stat
function updateNetworkSpeedPerSecondStat() {
  networkSpeedPerSecondStat.textContent = networkSpeedPerSecond;
}

// Function to update Credits per Second Stat
function updateCreditsPerSecondStat() {
  creditsPerSecondStat.textContent = creditsPerSecond;
}

// Function to increment Total Credits
function incrementTotalCredits(amount) {
  totalCredits += amount;
  totalCreditsStat.textContent = totalCredits;
}

// Function to decrement Total Credits
function decrementTotalCredits(amount) {
  totalCredits -= amount;
  totalCreditsStat.textContent = totalCredits;
}

// Function to calculate Upgrade Cost
function calculateUpgradeCost(currentValue) {
  return currentValue * 10;
}

// Function to create a file element
function createFileElement(fileSize) {
  const file = document.createElement('li');
  file.classList.add('file-upload-item');
  file.innerHTML = `<i class="fa fa-file"></i> File (${fileSize} KB)`;
  return file;
}

// Function to create a progress bar
function createProgressBar() {
  const progressBarContainer = document.createElement('div');
  progressBarContainer.classList.add('progress-bar-container');

  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar');
  progressBar.style.width = '0';

  progressBarContainer.appendChild(progressBar);
  return progressBarContainer;
}

// Function to animate the progress bar
function animateProgressBar(progressBar, duration, callback) {
  let progress = 0;
  const increment = 100 / (duration * 1000 / 10); // Update progress every 10 milliseconds

  const intervalId = setInterval(() => {
    progress += increment;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(intervalId);
      progressBar.parentNode.classList.add('fade-out');
      progressBar.parentNode.parentNode.removeChild(progressBar.parentNode);

      if (typeof callback === 'function') {
        callback();
      }
    }
  }, 10);
}

// Function to generate random file size
function getRandomFileSize() {
  return Math.floor(Math.random() * (100 - 1 + 1) + 1);
}

// Function to update Network Speed per Second and Credits per Second
function updateStatsPerSecond() {
  networkSpeedPerSecond = networkSpeed * 10; // Assuming 10 seconds per upload
  creditsPerSecond = creditValue * networkSpeedPerSecond;
  updateNetworkSpeedPerSecondStat();
  updateCreditsPerSecondStat();
}

// Update stats every second
setInterval(updateStatsPerSecond, 1000);

// Initial stat updates
updateNetworkSpeedStat();
updateCreditValueStat();
