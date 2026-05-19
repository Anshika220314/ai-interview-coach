import { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [successUser, setSuccessUser] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessUser('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            const { token, name } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('userName', name);
            setSuccessUser(name);
            
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (err) {
            setError(err.response?.data || 'Invalid email or password.');
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[550px]">
            {/* Left Side: Form Input Fields */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mt-2">Please enter your credentials to access your dashboard.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Email Address</label>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition duration-200 outline-none text-sm" 
                            placeholder="anshika@example.com" 
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Password</label>
                            <a href="#" className="text-xs font-medium text-indigo-600 hover:underline">Forgot password?</a>
                        </div>
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition duration-200 outline-none text-sm" 
                            placeholder="••••••••" 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 font-semibold text-white shadow-lg shadow-indigo-100 hover:shadow-xl hover:from-indigo-700 hover:to-violet-700 transition duration-200 mt-2 text-sm"
                    >
                        Sign In
                    </button>

                    {successUser && <div className="p-3 bg-green-50 text-green-700 rounded-xl text-center text-xs font-medium border border-green-100">Welcome back, {successUser}!</div>}
                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-center text-xs font-medium border border-red-100">{error}</div>}
                </form>
            </div>

            {/* Right Side: Visual Branding Card */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-12 text-white flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)]" />
                <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">AI Platform</span>
                </div>
                <div className="relative z-10 space-y-3">
                    <h3 className="text-2xl font-bold leading-tight">Elevate Your Technical Performance.</h3>
                    <p className="text-sm text-indigo-100/90 leading-relaxed">Access real-time behavioral diagnostics and tailored simulation sandboxes built on production architectures.</p>
                </div>
                <div className="relative z-10 text-xs text-indigo-200/70">
                    &copy; AI Interview Coach Project
                </div>
            </div>
        </div>
    );
};

export default Login;