import { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import axios from 'axios';
import ResumeUpload from './ResumeUpload';

function App() {
  // States to track view toggles and user authentication
  const [isLoginView, setIsLoginView] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [profileData, setProfileData] = useState(null);

  // Pull profile metrics from backend infrastructure if token is active
  useEffect(() => {
    if (!token) return;

    const loadProfile = async () => {
      try {
        // 🌟 CRITICAL FIX: Changed route from /api/users/profile to /api/user/profile to match your UserController mapping!
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfileData(response.data);
      } catch (err) {
        console.error("Failed to fetch protected profile data", err);
      }
    };

    loadProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUserName(null);
    setProfileData(null);
  };

  // Option 2: Premium Split-Screen User Dashboard Workspace
  if (token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[580px]">
          
          {/* Left Side: System Core Workspace Metrics */}
          <div className="w-full md:w-3/5 p-10 flex flex-col justify-between">
            <div>
              {/* Header Title Space */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Console Workspace</h1>
                  <p className="text-xs text-gray-400 mt-1">Live Environment Operational Node</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-500 text-xs font-bold px-4 py-2 rounded-xl border border-gray-200 transition duration-200"
                >
                  Sign Out
                </button>
              </div>
              
              {/* Personalization Banner */}
              <div className="bg-indigo-50/50 border border-indigo-100/70 p-5 rounded-2xl mb-8">
                <h2 className="text-xl font-bold text-indigo-950">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{userName || 'Developer'}</span>! 👋
                </h2>
                <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed">
                  Your workstation interface session is securely authenticated. Core framework modules are linked to your live database profile records.
                </p>
              </div>

              {/* Secure Profile Metric Display Board */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Secure Identity Attributes</h3>
                
                {profileData ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Node ID</span>
                      <span className="text-sm font-mono font-bold text-gray-700 mt-1 block">{profileData.id}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">System Access</span>
                      <span className="text-sm font-mono font-bold text-indigo-600 mt-1 block">{profileData.role}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 sm:col-span-1">
                      <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Server Status</span>
                      <span className="text-sm font-mono font-bold text-green-600 mt-1 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green-500 inline-block animate-pulse"></span> Online
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 sm:col-span-3">
                      <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Registered Communication Path</span>
                      <span className="text-sm font-mono text-gray-600 mt-0.5 block break-all">{profileData.email}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <div className="text-center space-y-2">
                      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-xs text-gray-400 font-medium">Querying infrastructure telemetry matrix...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 🌟 INTEGRATED COMPONENT: Resume Upload Pipeline Engine */}
              {profileData && (
                <div className="mt-6 animate-fadeIn">
                  <ResumeUpload 
                    userId={profileData.id} 
                    onUploadSuccess={() => console.log("Resume pipeline synchronized successfully.")} 
                  />
                </div>
              )}
            </div>

            <div className="text-[11px] text-gray-400 mt-8 border-t border-gray-50 pt-4">
              Session Security Token: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-600">Active JWT Pass</span>
            </div>
          </div>

          {/* Right Side: Quick Action Feature Overview Hub */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">Module Core</span>
            </div>

            <div className="relative z-10 space-y-4 my-auto py-6">
              <h3 className="text-2xl font-bold tracking-tight leading-tight">Ready to launch your simulation workspace?</h3>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                Your authenticated pipeline gives you unrestricted access to start preparing for mock engineering evaluation sandboxes.
              </p>
              
              <div className="pt-4">
                <button className="w-full bg-white hover:bg-indigo-50 text-indigo-950 font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-950/20 transition duration-200 uppercase tracking-wider">
                  Launch AI Simulator Workspace
                </button>
              </div>
            </div>

            <div className="relative z-10 text-[10px] text-indigo-200/60 font-mono tracking-wider">
              ENV: DEVELOPMENT // STACK: SPRING_REACT
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Render individual authentication cards with explicit modern toggles
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {isLoginView ? (
          <div>
            <Login onLoginSuccess={() => {
              setToken(localStorage.getItem('token'));
              setUserName(localStorage.getItem('userName'));
            }} />
            <p className="text-center text-xs text-gray-400 mt-5">
              Don't have an account yet?{' '}
              <button onClick={() => setIsLoginView(false)} className="text-indigo-600 font-bold hover:underline ml-1">
                Create an account
              </button>
            </p>
          </div>
        ) : (
          <div>
            <Signup />
            <p className="text-center text-xs text-gray-400 mt-5">
              Already have an enterprise credential?{' '}
              <button onClick={() => setIsLoginView(true)} className="text-indigo-600 font-bold hover:underline ml-1">
                Sign in to console
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;