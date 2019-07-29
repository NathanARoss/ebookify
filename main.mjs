const video = document.getElementById('video');
const canvas = document.getElementById('video-frame');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture-button');
const uploadButton = document.getElementById('photo-upload');
const cameraPreview = document.getElementById('camera-preview');

let streaming = false;
let stream = null;

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
    .then(function (_stream) {
        stream = _stream;
        video.srcObject = _stream;
        video.play();
    })
    .catch(function (err) {
        console.log("An error occurred: " + err);
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