import os
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
current_dir = Path(__file__).resolve().parent
env_path = current_dir / ".env"
load_dotenv(dotenv_path=env_path)

api_key_token = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key_token)

# Single shared model instance for your entire agent fleet
model = genai.GenerativeModel("gemini-2.5-flash")