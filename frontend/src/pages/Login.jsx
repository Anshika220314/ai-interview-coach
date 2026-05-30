import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing natively
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      
      const response = await login(formData);

      // Save incoming JWT token payload securely to browser LocalStorage cache
      if (response && response.token) {
        localStorage.setItem("token", response.token);
      } else {
        // Fallback for primitive backend configurations returning plain string tokens
        localStorage.setItem("token", response);
      }

      navigate("/dashboard"); // Route straight onto the secure dashboard
    } catch (error) {
      setError("Authentication failed. Invalid email or password configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] px-4 select-none">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] bg-[#121214] border border-[#27272a] rounded-2xl p-8 shadow-2xl"
      >
        {/* Identity Token Brand Badge */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-12 w-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
            <span className="text-white text-xl font-black tracking-tighter">AI</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0 p-0">Login</h1>
          <p className="text-sm text-zinc-400 mt-1.5 p-0">Welcome back! Access your core dashboard.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 text-left pl-0.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="name@university.edu"
              onChange={handleChange}
              className="w-full bg-[#18181b] border border-[#27272a] text-white rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-left"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 text-left pl-0.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full bg-[#18181b] border border-[#27272a] text-white rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-left"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-600 text-black text-sm font-semibold py-3 px-4 rounded-xl shadow-md cursor-pointer mt-2 transition-all duration-200 active:scale-[0.98]"
          >
            {loading ? "Authenticating Session..." : "Login"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-400 hover:text-purple-300 font-medium underline">
              Create an account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}