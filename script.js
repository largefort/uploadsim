// JavaScript code

window.addEventListener('DOMContentLoaded', function() {
  var uploadBtn = document.getElementById('upload-btn');
  var message = document.getElementById('message');
  var progressBar = document.getElementById('progress');
  var creditsDisplay = document.getElementById('credits');
  var networkSpeedDisplay = document.getElementById('network-speed');
  var bitcoinDriverUpgradeBtn = document.getElementById('bitcoin-driver-upgrade');
  var routerSpeedUpgradeBtn = document.getElementById('router-speed-upgrade');
  var saveBtn = document.getElementById('save-btn');
  var loadBtn = document.getElementById('load-btn');
  var uploadAmount = 0;
  var fileCount = 0;
  var uploadSpeed = 1; // Mbps
  var networkSpeed = 1; // Mbps
  var credits = 0;
  var bitcoinDriverUpgradeCost = 50;
  var routerSpeedUpgradeCost = 100;
  var bitcoinDriverLevel = 1;
  var bitcoinDriverUpgradeInterval;

  function updateProgress() {
    uploadAmount += uploadSpeed;
    if (uploadAmount >= 100) {
      clearInterval(progressInterval);
      uploadBtn.disabled = false;
      message.textContent = 'Upload completed!';
      credits += 10; // Credits earned per upload completion
      creditsDisplay.textContent = credits;
    }
    progressBar.style.width = uploadAmount + '%';
    progressBar.textContent = uploadAmount + '%';
  }

  function uploadFiles() {
    uploadBtn.disabled = true;
    message.textContent = 'Uploading...';
    progressBar.style.width = '0';
    progressBar.textContent = '0%';
    uploadAmount = 0;

    if (fileCount > 0) {
      // Generate AI-generated file names
      var fileNames = generateFileNames(fileCount);

      // Update message with file names
      message.textContent = 'Uploading: ' + fileNames.join(', ');

      // Calculate upload time based on network speed
      var uploadTime = 100 / (uploadSpeed * networkSpeed);

      // Simulate upload progress
      var progressInterval = setInterval(function() {
        updateProgress();
      }, uploadTime * 1000);
    } else {
      message.textContent = 'No files selected.';
      uploadBtn.disabled = false;
    }
  }

  function generateFileNames(count) {
    var fileNames = [];
    for (var i = 0; i < count; i++) {
      var fileName = generateRandomFileName();
      fileNames.push(fileName);
    }
    return fileNames;
  }

  function generateRandomFileName() {
    var adjectives = ['Awesome', 'Fantastic', 'Incredible', 'Amazing', 'Super'];
    var nouns = ['File', 'Document', 'Report', 'Data'];
    var extensions = ['.txt', '.pdf', '.doc', '.xlsx'];

    var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    var randomExtension = extensions[Math.floor(Math.random() * extensions.length)];

    return randomAdjective + ' ' + randomNoun + randomExtension;
  }

  function upgradeBitcoinDriver() {
    if (credits >= bitcoinDriverUpgradeCost) {
      credits -= bitcoinDriverUpgradeCost;
      bitcoinDriverUpgradeCost *= 2;
      bitcoinDriverLevel++;
      creditsDisplay.textContent = credits;
      bitcoinDriverUpgradeBtn.textContent = 'Upgrade Bitcoin Driver (' + bitcoinDriverUpgradeCost + ' Credits)';
      clearInterval(bitcoinDriverUpgradeInterval);
      automateCredits(); // Start the upgraded bitcoin driver
    }
  }

  function upgradeRouterSpeed() {
    if (credits >= routerSpeedUpgradeCost) {
      credits -= routerSpeedUpgradeCost;
      routerSpeedUpgradeCost *= 2;
      networkSpeed++;
      creditsDisplay.textContent = credits;
      routerSpeedUpgradeBtn.textContent = 'Upgrade Router Speed (' + routerSpeedUpgradeCost + ' Credits)';
      networkSpeedDisplay.textContent = 'Network Speed: ' + networkSpeed + ' Mbps';
    }
  }

  function saveGameData() {
    var gameData = {
      credits: credits,
      uploadSpeed: uploadSpeed,
      networkSpeed: networkSpeed,
      bitcoinDriverUpgradeCost: bitcoinDriverUpgradeCost,
      routerSpeedUpgradeCost: routerSpeedUpgradeCost,
      bitcoinDriverLevel: bitcoinDriverLevel
    };
    localStorage.setItem('uploadGameData', JSON.stringify(gameData));
    alert('Game saved successfully!');
  }

  function loadGameData() {
    var savedData = localStorage.getItem('uploadGameData');
    if (savedData) {
      var gameData = JSON.parse(savedData);
      credits = gameData.credits;
      uploadSpeed = gameData.uploadSpeed;
      networkSpeed = gameData.networkSpeed;
      bitcoinDriverUpgradeCost = gameData.bitcoinDriverUpgradeCost;
      routerSpeedUpgradeCost = gameData.routerSpeedUpgradeCost;
      bitcoinDriverLevel = gameData.bitcoinDriverLevel;

      // Update display with loaded data
      creditsDisplay.textContent = credits;
      bitcoinDriverUpgradeBtn.textContent = 'Upgrade Bitcoin Driver (' + bitcoinDriverUpgradeCost + ' Credits)';
      routerSpeedUpgradeBtn.textContent = 'Upgrade Router Speed (' + routerSpeedUpgradeCost + ' Credits)';
      networkSpeedDisplay.textContent = 'Network Speed: ' + networkSpeed + ' Mbps';
    }
  }

  function automateCredits() {
    bitcoinDriverUpgradeInterval = setInterval(function() {
      credits += bitcoinDriverLevel;
      creditsDisplay.textContent = credits;
    }, 1000);
  }

  uploadBtn.addEventListener('click', uploadFiles);
  bitcoinDriverUpgradeBtn.addEventListener('click', upgradeBitcoinDriver);
  routerSpeedUpgradeBtn.addEventListener('click', upgradeRouterSpeed);
  saveBtn.addEventListener('click', saveGameData);
  loadBtn.addEventListener('click', loadGameData);

  // Initialize
  automateCredits();
});
