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
}

// Simulate file uploads every 3 seconds
setInterval(() => {
  const { fileName, fileSize } = generateFileUpload();
  addFileUploadItem(fileName, fileSize);
}, 3000);
