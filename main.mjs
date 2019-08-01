const video = document.getElementById('video');
const canvas = document.getElementById('video-frame');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture-button');
const uploadButton = document.getElementById('photo-upload');
const debugOutput = document.getElementById('debug');

let streaming = false;

navigator.mediaDevices.getUserMedia({
    video: {
        width: 1920,
        height: 1080,
        frameRate: 24,
        facingMode: "environment"
    },
    audio: false
})
    .then(function (stream) {
        video.srcObject = stream;

        const camSettings = stream.getVideoTracks()[0].getSettings();
        const debugText = camSettings.width + "x" + camSettings.height + " @ " + camSettings.frameRate;
        debugOutput.innerText = debugText;
        video.play();
    })
    .catch(function (err) {
        console.log("An error occurred: " + err);
        alert("An error occurred: " + err);
    });

video.addEventListener('canplay', function (ev) {
    if (!streaming) {
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        streaming = true;
    }
}, false);

captureButton.addEventListener('click', function (ev) {
    ev.preventDefault();

    if (streaming) {
        canvas.width = video.width;
        canvas.height = video.height;
        context.drawImage(video, 0, 0, video.width, video.height);
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}, false);

uploadButton.onchange = function (ev) {
    const files = ev.target.files;

    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        };
        img.src = ev.target.result;
    };
    fileReader.readAsDataURL(files[0]);
}