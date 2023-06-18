// Define file extensions and their corresponding icons
const fileExtensions = {
  doc: 'word',
  pdf: 'pdf',
  png: 'image',
  txt: 'text',
};

// Get the file upload list element
const fileUploadList = document.getElementById('fileUploadList');

// Get the network speed element
const networkSpeedElement = document.getElementById('networkSpeed');

// Get the credit value element
const creditValueElement = document.getElementById('creditValue');

// Initialize network speed and credit value
let networkSpeed = 1;
let creditValue = 1;
let totalCredits = 0;

// Function to generate a random file name with extension
function generateFileName() {
  const extensions = Object.keys(fileExtensions);
  const randomExtension = extensions[Math.floor(Math.random() * extensions.length)];
  const randomName = Math.random().toString(36).substring(7);
  return `${randomName}.${randomExtension}`;
}

// Function to create a file upload item
function createFileUploadItem(fileName) {
  const fileUploadItem = document.createElement('li');
  fileUploadItem.classList.add('file-upload-item');

  const fileIcon = document.createElement('span');
  fileIcon.classList.add('file-icon');
  const extension = fileName.split('.').pop();
  const iconName = fileExtensions[extension] || 'unknown';
  fileIcon.innerHTML = `<i class="fa fa-file-${iconName}-o"></i>`;

  const fileNameSpan = document.createElement('span');
  fileNameSpan.textContent = fileName;

  fileUploadItem.appendChild(fileIcon);
  fileUploadItem.appendChild(fileNameSpan);
  fileUploadList.appendChild(fileUploadItem);
}

// Function to update network speed and credit value stats
function updateStats() {
  networkSpeedElement.textContent = networkSpeed.toFixed(2);
  creditValueElement.textContent = creditValue.toFixed(2);
}

// Function to handle file upload
function uploadFile() {
  const fileName = generateFileName();
  createFileUploadItem(fileName);

  // Get the progress bar element
  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar');

  const progressContainer = document.createElement('div');
  progressContainer.classList.add('progress-bar-container');
  progressContainer.appendChild(progressBar);

  const fileUploadItem = document.querySelector('.file-upload-item:last-child');
  fileUploadItem.appendChild(progressContainer);

  // Calculate upload time based on network speed
  const uploadTime = Math.floor(Math.random() * 5) + 1 / networkSpeed;

  // Set the initial width of the progress bar to 0
  progressBar.style.width = '0';

  // Update the width of the progress bar during the upload process
  const progressInterval = setInterval(() => {
    const currentWidth = parseFloat(progressBar.style.width);
    const targetWidth = (currentWidth + 10) + '%'; // Adjust the increment as needed
    progressBar.style.width = targetWidth;
  }, 500); // Adjust the interval as needed

  // Remove the progress bar and stop the update interval after the upload time
  setTimeout(() => {
    clearInterval(progressInterval);
    progressBar.style.width = '100%';
    setTimeout(() => {
      fileUploadItem.classList.add('fade-out');
      setTimeout(() => {
        fileUploadList.removeChild(fileUploadItem);
        totalCredits += creditValue;
        updateStats();
        uploadFile(); // Trigger auto-upload
      }, 5000); // 5 seconds for fade-out animation
    }, 500); // 0.5 seconds for progress bar animation
  }, uploadTime * 1000);
}

// Add event listener for the Upload File button
const uploadFileBtn = document.getElementById('uploadFileBtn');
uploadFileBtn.addEventListener('click', uploadFile);

// Initial auto-upload trigger
uploadFile();

// Update stats initially
updateStats();
