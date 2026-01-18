const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture');
const reply = document.getElementById('reply');
const promptInput = document.getElementById('prompt');
const resultCard = document.getElementById('result-card');

// Initialize camera
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Camera access denied:", err);
    alert("Please allow camera access to use PromptSee.");
  }
}

initCamera();

captureBtn.onclick = async () => {
  // UI Loading State
  captureBtn.disabled = true;
  captureBtn.innerText = "Analyzing...";
  resultCard.classList.remove('visible');
  reply.innerText = "Thinking...";

  try {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");
    formData.append("prompt", promptInput.value || "What do you see?");

    // Assuming backend is running on default FastAPI port
    const res = await fetch("http://127.0.0.1:8000/caption", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    // Display Result
    reply.innerText = data.caption;
    resultCard.classList.add('visible');

  } catch (error) {
    console.error("Error:", error);
    reply.innerText = "Error: Could not connect to AI server. Make sure backend is running.";
    resultCard.classList.add('visible');
  } finally {
    // Reset UI
    captureBtn.disabled = false;
    captureBtn.innerText = "Analyze";
  }
};