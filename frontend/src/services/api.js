import axios from "axios";

// Spring Boot Backend Base URL (Configurable via VITE_API_URL, fallback to localhost:8080)
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// FastAPI AI Service Base URL (Configurable via VITE_AI_URL, fallback to localhost:8000)
export const AI_BASE_URL = import.meta.env.VITE_AI_URL || "http://localhost:8000";

// Instantiating your central API configuration engine pointing directly to your Spring Boot server port
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 🌟 STEP 7: AUTOMATED REQUEST INTERCEPTOR COUPLING
api.interceptors.request.use(
  (config) => {
    // Read the current secure token out of the browser's LocalStorage memory unit
    const token = localStorage.getItem("token");

    if (token) {
      // Automatically append the standard Bearer authorization token header into the metadata
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;