# Gunakan base image Python
FROM python:3.10-slim

# Install dependencies sistem untuk OpenCV dan YOLO
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# membuat direktori kerja
WORKDIR /app

# Salin requirements
COPY requirements.txt .

# menginstall dependency Python
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh isi backend ke dalam container
COPY . .

# menjalankan server FastAPI dengan Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
