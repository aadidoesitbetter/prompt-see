from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import io
import logging
import torch

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="PromptSee API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model globally to avoid reloading on every request
try:
    logger.info("Loading BLIP model...")
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
    logger.info("BLIP model loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    raise RuntimeError("Could not load AI model")

@app.post("/caption")
async def caption_image(file: UploadFile = File(...), prompt: str = Form("What do you see?")):
    try:
        logger.info(f"Received request with prompt: {prompt}")
        
        # Read and Validate Image
        image_bytes = await file.read()
        try:
            raw_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid image file")

        # Process Image
        inputs = processor(raw_image, prompt, return_tensors="pt")
        
        # Generate Caption
        with torch.no_grad():
             output = model.generate(**inputs, max_new_tokens=50)
             
        caption = processor.decode(output[0], skip_special_tokens=True)
        
        logger.info(f"Generated caption: {caption}")
        return {"caption": caption}

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))