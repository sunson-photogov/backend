# image_processor.py
from PIL import Image
import cv2
from pathlib import Path

def process_image(file_path: Path, visa_type: str) -> Path:
    output_path = Path("processed") / f"{visa_type}_{file_path.name}"

    if visa_type == "DV Lottery":
        dimensions = (600, 600)
    elif visa_type == "Canada Visa":
        dimensions = (420, 540)
    elif visa_type == "Schengen Visa":
        dimensions = (350, 450)
    else:
        raise ValueError("Unsupported visa type")

    # Open image with OpenCV or Pillow and resize/crop
    img = cv2.imread(str(file_path))
    img_resized = cv2.resize(img, dimensions)
    cv2.imwrite(str(output_path), img_resized)

    return output_path
