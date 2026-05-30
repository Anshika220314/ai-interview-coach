import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // 🛡️ SECURITY SHIELD: If a browser lacks an authentication signature, 
  // immediately bounce them back to the login gateway!
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, safely mount the secure dashboard page children view elements
  return children;
}