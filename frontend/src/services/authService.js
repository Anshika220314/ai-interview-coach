import api from "./api";

// 🌟 IMPORTANT NOTE: Yesterday we discovered your Spring Boot controller mappings 
// are configured under "/api/auth/signup" and "/api/auth/login". 
// We are explicitly adding "/api" to the endpoints below to ensure 
// they perfectly match your controller paths!

export const signup = async (userData) => {
  const response = await api.post(
    "/api/auth/signup",
    userData
  );
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post(
    "/api/auth/login",
    credentials
  );
  return response.data;
};