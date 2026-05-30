import axios from "axios";

// Instantiating your central API configuration engine pointing directly to your Spring Boot server port
const api = axios.create({
  baseURL: "http://localhost:8080",
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