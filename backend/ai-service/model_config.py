import os
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
current_dir = Path(__file__).resolve().parent
env_path = current_dir / ".env"
load_dotenv(dotenv_path=env_path)

api_key_token = os.getenv("GEMINI_API_KEY")
if api_key_token:
    genai.configure(api_key=api_key_token)
    model = genai.GenerativeModel(os.getenv("GEMINI_MODEL", "gemini-2.5-flash"))
else:
    print("⚠️ WARNING: GEMINI_API_KEY not set in environment.")
    model = None