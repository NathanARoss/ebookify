let streaming = false;

let video = null;
let canvas = null;
let startbutton = null;
let cameraPreview = null;
let stream = null;

function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('video-frame');
    startbutton = document.getElementById('capture-button');
    cameraPreview = document.getElementById('camera-preview');

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
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
    }, false);

    clearphoto();
}

// Fill the photo with an indication that none has been
// captured.

function clearphoto() {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function takepicture() {
    if (streaming) {
        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, video.width, video.height);
    } else {
        clearphoto();
    }
}

window.addEventListener('load', startup, false);