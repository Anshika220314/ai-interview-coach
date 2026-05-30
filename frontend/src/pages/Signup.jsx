import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please complete all form registration blocks.");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      // 🌟 FIXED DUAL-KEY PAYLOAD: Maps perfectly to your Spring Boot DTO properties!
      const payload = {
        name: formData.name,
        username: formData.name, // Fallback parameter if Java field uses username
        email: formData.email,
        password: formData.password
      };

      await signup(payload);

      setSuccess("Account provisioned successfully! Routing to sign-in card...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Account might already exist or form keys are invalid.");
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
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-12 w-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
            <span className="text-white text-xl font-black tracking-tighter">AI</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0 p-0">Signup</h1>
          <p className="text-sm text-zinc-400 mt-1.5 p-0">Get started with your profile platform tracking.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-left font-medium">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 text-left pl-0.5">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Anshika"
              onChange={handleChange}
              className="w-full bg-[#18181b] border border-[#27272a] text-white rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-left"
            />
          </div>

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
            {loading ? "Provisioning Profile..." : "Signup"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Already have an account?{" "}
            <a href="/" className="text-purple-400 hover:text-purple-300 font-medium underline">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}