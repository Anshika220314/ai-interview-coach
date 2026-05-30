import { useState } from "react";
import axios from "axios";

export default function InterviewGenerator() {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateInterview = async () => {
    if (!role.trim() || !company.trim()) {
      setError("Please input both target job role mappings and enterprise identities.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setQuestions("");

      // Dispatching operational parameters directly down to your FastAPI port 8000 server instance
      const response = await axios.post(
        "http://localhost:8000/generate-interview",
        null,
        {
          params: {
            role,
            company,
            difficulty
          }
        }
      );

      setQuestions(response.data.interview_questions);
    } catch (err) {
      setError("Generation pipeline timed out. Verify your FastAPI multi-agent platform is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 p-6 md:p-10 font-sans antialiased">
      <header className="border-b border-zinc-800 pb-6 mb-8 text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">AI Question Architect</h1>
        <p className="text-zinc-400 text-sm mt-1 p-0">Generate role-tailored technical problem sets mapping directly to enterprise benchmarks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Parametric Setup Input Controls */}
        <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 h-fit shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white mb-2 text-left">Configure Architecture</h2>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-left">
              {error}
            </div>
          )}

          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Target Job Role</label>
              <input
                placeholder="e.g., Backend Java Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Target Enterprise Identity</label>
              <input
                placeholder="e.g., Google, Amazon, Corporate"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Evaluation Difficulty Tier</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all cursor-pointer appearance-none"
              >
                <option value="Easy">Tier 1 — Foundational (Easy)</option>
                <option value="Medium">Tier 2 — Intermediate Core (Medium)</option>
                <option value="Hard">Tier 3 — High Architecture (Hard)</option>
              </select>
            </div>

            <button
              onClick={generateInterview}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer mt-2"
            >
              {loading ? "Compiling Specialized Prompts..." : "Generate Interview Matrix"}
            </button>
          </div>
        </div>

        {/* Output Terminal Console Canvas Block */}
        <div className="lg:col-span-2">
          {questions ? (
            <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 shadow-xl text-left">
              <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider border-b border-zinc-800 pb-3 mb-4">
                📋 Formulated Evaluation Criteria Structure
              </h3>
              <pre className="text-zinc-200 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed bg-[#18181b] p-5 rounded-xl border border-zinc-800/60 max-h-[65vh] overflow-y-auto">
                {questions}
              </pre>
            </div>
          ) : (
            <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-12 text-center border-dashed h-full flex flex-col items-center justify-center">
              <div className="text-3xl mb-3">🎙️</div>
              <h3 className="text-lg font-bold text-white">System matrix offline</h3>
              <p className="text-sm text-zinc-400 max-w-[320px] mt-1 leading-relaxed">
                Configure your target parameters on the left sidebar options deck to load live prompt strings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}