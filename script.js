let queue = [];
let isUploading = false;

function addFile(fileName) {
    queue.push(fileName);
    updateQueue();
    if (!isUploading) {
        startUpload();
    }
}

function updateQueue() {
    let uploadQueue = document.getElementById('uploadQueue');
    uploadQueue.innerHTML = '';
    queue.forEach(fileName => {
        let uploadItem = document.createElement('div');
        uploadItem.classList.add('uploadItem');
        uploadItem.innerHTML = `
            <div>${fileName}</div>
            <div class="progressBarContainer">
                <div id="${fileName}" class="progressBar"></div>
            </div>
        `;
        uploadQueue.appendChild(uploadItem);
    });
}

function startUpload() {
    if (queue.length === 0) {
        isUploading = false;
        return;
    }
    isUploading = true;
    let fileName = queue[0];
    let progressBar = document.getElementById(fileName);
    let width = 1;
    let id = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            queue.shift();
            updateQueue();
            startUpload();
        } else {
            width++; 
            progressBar.style.width = width + '%'; 
        }
    }
}

function botUpload() {
    setInterval(() => {
        let fileName = 'BotFile_' + new Date().getTime();
        addFile(fileName);
    }, 5000);
}

// Start the bot
botUpload();
