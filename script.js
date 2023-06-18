// Generate a random file name
function generateFileName() {
  const extensions = ['txt', 'jpg', 'png', 'pdf', 'doc'];
  const randomExtension = extensions[Math.floor(Math.random() * extensions.length)];
  const randomName = Math.random().toString(36).substring(2, 7);
  return `${randomName}.${randomExtension}`;
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

      // Add a new file upload after a delay
      setTimeout(uploadFile, 3000); // 3 seconds delay for the new file upload
    }, 5000); // 5 seconds for fade-out animation
  }, uploadTime * 1000);
}
