document.addEventListener("DOMContentLoaded", function() {
  var uploadButton = document.getElementById("upload-button");
  var uploadStatus = document.getElementById("upload-status");
  var speedCounter = document.getElementById("network-speed");
  
  var totalUploaded = 0;
  var startTime;
  var elapsedTime;
  
  uploadButton.addEventListener("click", function() {
    if (navigator.connection && navigator.connection.downlink) {
      startTime = performance.now();
      speedCounter.textContent = "0 Mbps";
      
      var progressInterval = setInterval(function() {
        if (totalUploaded >= 100) {
          clearInterval(progressInterval);
          uploadStatus.textContent = "Upload complete!";
        } else {
          totalUploaded += 10;
          uploadStatus.textContent = "Uploading... " + totalUploaded + "%";
          calculateSpeed();
        }
      }, 1000); // Adjust the interval as desired
    } else {
      uploadStatus.textContent = "Network speed cannot be determined.";
    }
  });
  
  function calculateSpeed() {
    elapsedTime = (performance.now() - startTime) / 1000; // Convert to seconds
    var speed = (totalUploaded / elapsedTime).toFixed(2); // Calculate speed in Mbps
    speedCounter.textContent = speed + " Mbps";
  }
});
