document.addEventListener("DOMContentLoaded", function() {
  var uploadButton = document.getElementById("upload-button");
  var uploadStatus = document.getElementById("upload-status");
  var speedCounter = document.getElementById("network-speed");
  var fileInput = document.getElementById("file-input");

  var totalUploaded = 0;
  var startTime;
  var elapsedTime;

  uploadButton.addEventListener("click", function() {
    if (navigator.connection && navigator.connection.downlink) {
      startTime = performance.now();
      speedCounter.textContent = "0 Mbps";
      fileInput.click(); // Trigger file input click event
    } else {
      uploadStatus.textContent = "Network speed cannot be determined.";
    }
  });

  fileInput.addEventListener("change", function() {
    var file = fileInput.files[0];
    var fileSize = file.size;
    var chunkSize = 10; // MB

    var numChunks = Math.ceil(fileSize / (chunkSize * 1024 * 1024));
    var currentChunk = 0;

    var uploadProgressInterval = setInterval(function() {
      if (currentChunk >= numChunks) {
        clearInterval(uploadProgressInterval);
        uploadStatus.textContent = "Upload complete!";
      } else {
        currentChunk++;
        totalUploaded += chunkSize;
        uploadStatus.textContent = "Uploading... " + currentChunk + "/" + numChunks + " chunks";
        calculateSpeed();
      }
    }, 1000); // Adjust the interval as desired
  });

  function calculateSpeed() {
    elapsedTime = (performance.now() - startTime) / 1000; // Convert to seconds
    var speed = (totalUploaded / elapsedTime).toFixed(2); // Calculate speed in Mbps
    speedCounter.textContent = speed + " Mbps";
  }
});
