const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture');
const reply = document.getElementById('reply');
const promptInput = document.getElementById('prompt');

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
});

captureBtn.onclick = async () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  context.drawImage(video, 0, 0);

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
  const formData = new FormData();
  formData.append("file", blob, "frame.jpg");
  formData.append("prompt", promptInput.value);

  const res = await fetch("http://127.0.0.1:8000/caption", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  reply.innerText = data.caption;
};