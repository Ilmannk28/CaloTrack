from ultralytics import YOLO
import cv2
from pathlib import Path
import requests

# Kalori tiap makanan
calories_dict = {
    'white rice': 200,
    'fried chicken': 250,
    'boiled egg': 70,
    'milk': 150,
    'sliced watermelon': 50
}

# Lokasi penyimpanan model sementara (Railway-friendly)
model_dir = Path("/tmp/calotrack_model")
model_path = model_dir / "best.pt"

# URL model dari Hugging Face
HUGGINGFACE_MODEL_URL = "https://huggingface.co/ilmannk28/calotrack-model/resolve/main/best.pt"

# Model global (dimuat sekali)
model = None

def download_model():
    """Unduh model jika belum tersedia secara lokal"""
    if not model_path.exists():
        print("Model tidak ditemukan. Mengunduh dari Hugging Face...")
        model_dir.mkdir(parents=True, exist_ok=True)
        response = requests.get(HUGGINGFACE_MODEL_URL)
        if response.status_code != 200:
            raise RuntimeError(f"Gagal mengunduh model. Status: {response.status_code}")
        with open(model_path, "wb") as f:
            f.write(response.content)
        print("Model berhasil diunduh.")

def load_model():
    """Muat model hanya sekali"""
    global model
    if model is None:
        download_model()
        model = YOLO(str(model_path))

def predict_calories(image_path: str):
    """Prediksi kalori dari gambar makanan"""
    load_model()
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Gagal membaca gambar dari path: {image_path}")

    results = model.predict(image_path, imgsz=640, conf=0.25)
    predictions = []
    total_calories = 0

    for result in results:
        boxes = result.boxes
        for box in boxes:
            cls_id = int(box.cls[0])
            class_name = model.names[cls_id]
            confidence = float(box.conf[0])
            calories = calories_dict.get(class_name, 0)

            bbox = box.xywh[0].tolist()
            x_center, y_center, width, height = bbox
            x = x_center - (width / 2)
            y = y_center - (height / 2)

            predictions.append({
                "food": class_name,
                "calories": calories,
                "confidence": round(confidence, 2),
                "bbox": [x, y, width, height]
            })
            total_calories += calories

    return {
        "predictions": predictions,
        "total_calories": total_calories
    }
