# PromptSee

A smart AI vision assistant that looks through your camera and replies with intelligent captions to your prompts. Built with **FastAPI**, **Hugging Face Transformers**, and **Vanilla JS**.

## ✨ Features

- **Real-time Analysis**: Captures images from your webcam and processes them instantly.
- **Natural Language Interaction**: Ask questions about what the camera sees.
- **Modern UI**: Clean, responsive dark-mode interface with glassmorphism effects.
- **Privacy First**: Processing happens locally (if running local LLMs) or via your configured backend.

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js (optional, only if you want to use a JS package manager, currently not needed)

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/yourusername/promptsee.git
   cd promptsee
   ```

2. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### 🏃‍♂️ Running the App

1. **Start the Backend Server**:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000`.

2. **Open the Frontend**:
   Simply open `index.html` in your web browser.

   *Note: Ensure your browser allows camera access for the file/site.*

## 🛠️ Built With

- [FastAPI](https://fastapi.tiangolo.com/) - High-performance web framework.
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/index) - State-of-the-art Machine Learning.
- [BLIP](https://huggingface.co/Salesforce/blip-image-captioning-base) - Bootstrapping Language-Image Pre-training for image captioning.
- **HTML5/CSS3/JavaScript** - Frontend interface.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.