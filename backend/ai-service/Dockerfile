FROM python:3.11-slim

WORKDIR /app

# Install system dependencies needed for PyMuPDF, FAISS and C/C++ extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    swig \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install dependencies using CPU-only PyTorch to keep image lightweight and fast on Render
RUN pip install --no-cache-dir --extra-index-url https://download.pytorch.org/whl/cpu -r requirements.txt

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
