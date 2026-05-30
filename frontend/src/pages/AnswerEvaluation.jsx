import { useState } from "react";
import axios from "axios";
import api from "../services/api"; // Your auto-JWT attached Axios client for Spring Boot
import Sidebar from "../components/Sidebar";

export default function AnswerEvaluation() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const handleEvaluation = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setError("Please input both the interview question and your response block.");
      return;
    }

    try {
      setError("");
      setSaveStatus("");
      setLoading(true);
      setEvaluation(null);

      // 🌟 FIX: Bundle data parameters into a real FormData object to avoid FastAPI 422 validations
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);

      // 1. Handshake with FastAPI on Port 8000 for AI Scores
      const aiResponse = await axios.post("http://localhost:8000/evaluate-answer", formData);

      const feedbackData = aiResponse.data;
      setEvaluation(feedbackData);

      // 2. Automatically sync and persist data inside PostgreSQL via Spring Boot on Port 8080
      try {
        setSaveStatus("Syncing metrics with PostgreSQL analytics server...");
        
        // Formats data to map perfectly to your primitive int schemas and tracking tables
        const dbPayload = {
          company: "General", // Explicit structural fallback value for distribution aggregation charts
          role: "Software Engineer",
          technicalScore: parseInt(String(feedbackData.technical_score).replaceAll("[^0-9]", ""), 10) || 0,
          communicationScore: parseInt(String(feedbackData.communication_score).replaceAll("[^0-9]", ""), 10) || 0,
          strengths: JSON.stringify(feedbackData.strengths || []),
          weaknesses: JSON.stringify(feedbackData.weaknesses || []),
          question: question,
          candidateAnswer: answer
        };

        // 🌟 FIX: Updated route mapping target string path to fit your controller configuration
        await api.post("/analytics/save", dbPayload);
        setSaveStatus("Metrics backed up securely inside PostgreSQL!");
      } catch (dbErr) {
        setSaveStatus("AI evaluated successfully, but database analytics logging failed.");
      }

    } catch (err) {
      setError("Evaluation channel timed out. Verify your FastAPI engine is up on Port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#09090b] text-zinc-100 font-sans antialiased">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <header className="border-b border-zinc-800 pb-6 mb-8 text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">
            Performance Evaluator
          </h1>
          <p className="text-zinc-400 text-sm mt-1 p-0">
            Submit your answer text arrays for micro-metric sentiment analysis and core tech scoring.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Submission Panel Form Input Layer */}
          <form onSubmit={handleEvaluation} className="lg:col-span-2 bg-[#121214] border border-zinc-800 rounded-2xl p-6 h-fit shadow-xl space-y-4 text-left">
            <h2 className="text-lg font-bold text-white mb-2">Workspace Matrix</h2>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                {error}
              </div>
            )}

            {saveStatus && (
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                {saveStatus}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Interview Question</label>
                <textarea
                  rows={3}
                  placeholder="Paste the technical prompt or core system challenge context here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none text-left"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Your Response</label>
                <textarea
                  rows={6}
                  placeholder="Type your complete solution structure or conceptual code outline block..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none text-left"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                {loading ? "Analyzing Communication Matrix..." : "Evaluate Response"}
              </button>
            </div>
          </form>

          {/* AI Metrics Feedback Viewport Grid */}
          <div className="lg:col-span-3">
            {evaluation ? (
              <div className="space-y-6 text-left">
                {/* Score Summary Deck Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl flex flex-col">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Technical Score</span>
                    <span className="text-3xl font-mono font-black text-purple-400">
                      {evaluation.technical_score || evaluation.technical_score || "0/10"}
                    </span>
                  </div>
                  <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl flex flex-col">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Communication Score</span>
                    <span className="text-3xl font-mono font-black text-emerald-400">
                      {evaluation.communication_score || evaluation.communication_score || "0/10"}
                    </span>
                  </div>
                </div>

                {/* Granular Criteria Listings Wrapper */}
                <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl">
                  {/* Strengths */}
                  <div>
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">⚡ Execution Strengths</h3>
                    <ul className="space-y-1.5 list-none p-0 m-0">
                      {evaluation.strengths?.map((s, i) => (
                        <li key={i} className="text-sm text-zinc-300 bg-zinc-800/20 border border-zinc-800/60 px-4 py-2 rounded-xl">✅ {s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">⚠️ Noted Vulnerabilities</h3>
                    <ul className="space-y-1.5 list-none p-0 m-0">
                      {evaluation.weaknesses?.map((w, i) => (
                        <li key={i} className="text-sm text-zinc-300 bg-zinc-800/20 border border-zinc-800/60 px-4 py-2 rounded-xl">🔍 {w}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Core Concepts */}
                  <div>
                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">❌ Omitted Core Concepts</h3>
                    <ul className="space-y-1.5 list-none p-0 m-0">
                      {evaluation.missing_concepts?.map((c, i) => (
                        <li key={i} className="text-sm text-zinc-300 bg-zinc-800/20 border border-zinc-800/60 px-4 py-2 rounded-xl">📌 {c}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvement Suggestions */}
                  <div className="border-t border-zinc-800 pt-4">
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">💡 Architectural Optimizations</h3>
                    <ul className="space-y-1.5 list-none p-0 m-0">
                      {evaluation.improvement_suggestions?.map((s, i) => (
                        <li key={i} className="text-sm text-zinc-200 bg-purple-950/20 border border-purple-900/30 px-4 py-2 rounded-xl">🚀 {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-12 text-center border-dashed h-full flex flex-col items-center justify-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-white">Evaluation terminal idle</h3>
                <p className="text-sm text-zinc-400 max-w-[320px] mt-1 leading-relaxed">
                  Submit your practice answers on the left configuration card block to initialize full algorithmic score telemetry tracking.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}