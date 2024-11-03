from fastapi import FastAPI, File, UploadFile, HTTPException
from image_processor import process_image
import shutil
from pathlib import Path
import os

app = FastAPI()

UPLOAD_DIR = Path("uploads")
PROCESSED_DIR = Path("processed")
UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)

@app.post("/process-image/")
async def process_image_endpoint(visa_type: str, image: UploadFile = File(...)):
    try:
        file_location = UPLOAD_DIR / image.filename
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        processed_image_path = process_image(file_location, visa_type)
        return {"processed_image": processed_image_path.name}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {e}")
    finally:
        os.remove(file_location)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
