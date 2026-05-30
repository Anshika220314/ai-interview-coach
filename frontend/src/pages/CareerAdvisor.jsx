import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function CareerAdvisor() {
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [expLevel, setExpLevel] = useState("Entry-Level");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateRoadmap = async (e) => {
    e.preventDefault();
    if (!targetRole.trim() || !currentSkills.trim()) {
      setError("Please specify your desired destination role and active toolbelt skills.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setRoadmap(null);

      const formData = new FormData();
      formData.append("target_role", targetRole);
      formData.append("current_skills", currentSkills);
      formData.append("experience_level", expLevel);

      const response = await axios.post("http://localhost:8000/career-advice", formData);
      setRoadmap(response.data);
    } catch (err) {
      setError("The Career Agent channel is unresponsive. Verify your FastAPI engine is up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#09090b] text-zinc-100 font-sans antialiased">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <header className="border-b border-zinc-800 pb-6 mb-8 text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">AI Career Advisor</h1>
          <p className="text-zinc-400 text-sm mt-1 p-0">Architect your technical professional progression vectors using customized target agent roadmap tracking.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Factor Inputs Card Container */}
          <form onSubmit={handleGenerateRoadmap} className="lg:col-span-2 bg-[#121214] border border-zinc-800 rounded-2xl p-6 h-fit shadow-xl space-y-4 text-left">
            <h2 className="text-lg font-bold text-white mb-2">Target Profile Matrix</h2>
            {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Target Professional Role</label>
                <input
                  type="text"
                  placeholder="e.g. Backend Engineer, DevOps Architect..."
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Current Skills & Stack</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Java, Spring Boot, React, SQL, Git..."
                  value={currentSkills}
                  onChange={(e) => setCurrentSkills(e.target.value)}
                  className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Experience Tier</label>
                <select
                  value={expLevel}
                  onChange={(e) => setExpLevel(e.target.value)}
                  className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="Entry-Level">Undergraduate / Entry-Level (0-1 yrs)</option>
                  <option value="Junior">Junior Associate Tier (1-3 yrs)</option>
                  <option value="Mid-Senior">Mid-Senior Engineer (3+ yrs)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                {loading ? "Mapping Career Path Vector..." : "Generate Advisory Blueprint"}
              </button>
            </div>
          </form>

          {/* Output Display Container Layout */}
          <div className="lg:col-span-3">
            {roadmap ? (
              <div className="space-y-6 text-left">
                {/* Master Advice Callout Banner */}
                <div className="bg-purple-950/20 border border-purple-900/30 rounded-2xl p-5 shadow-md">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">🎯 Strategist Core Counsel</h3>
                  <p className="text-zinc-200 text-sm m-0 leading-relaxed">{roadmap.career_advice}</p>
                </div>

                {/* Main Advisory Metrics Breakdown Card */}
                <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl">
                  {/* Roadmaps */}
                  <div>
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2.5">🗺️ Execution Milestones</h3>
                    <div className="space-y-2">
                      {roadmap.learning_roadmap?.map((step, i) => (
                        <div key={i} className="text-sm text-zinc-300 bg-zinc-900/40 border border-zinc-800/80 px-4 py-3 rounded-xl flex gap-3">
                          <span className="text-purple-400 font-mono font-bold">0{i+1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two-Column Missing Skills & Certs Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">🛑 Missing Skills Vulnerabilities</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {roadmap.missing_skills?.map((skill, i) => (
                          <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">🏅 Recommended Credentials</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {roadmap.certifications?.map((cert, i) => (
                          <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">{cert}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Suggestions */}
                  <div className="border-t border-zinc-800 pt-4">
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">🚀 Target Portfolio Applications</h3>
                    <ul className="space-y-2 list-none p-0 m-0">
                      {roadmap.project_suggestions?.map((proj, i) => (
                        <li key={i} className="text-sm text-zinc-300 bg-zinc-800/20 border border-zinc-800/60 px-4 py-2.5 rounded-xl">🛠️ {proj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-12 text-center border-dashed h-full flex flex-col items-center justify-center">
                <div className="text-3xl mb-3">🧭</div>
                <h3 className="text-lg font-bold text-white">Advisory Engine Offline</h3>
                <p className="text-sm text-zinc-400 max-w-[320px] mt-1 leading-relaxed">Input your target metrics criteria specifications to calculate structured skill matrices and optimization roadmaps.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}