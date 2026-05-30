import { useState } from "react";
import axios from "axios";

export default function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadResume = async () => {
    if (!file) {
      setError("Please select a file to parse first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setError("");
      setLoading(true);
      setResult(null);

      // Firing form binary parts up to your FastAPI backend server layer
      const response = await axios.post(
        "http://localhost:8000/analyze-resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      setResult(response.data);
    } catch (err) {
      setError("Analysis system failed. Ensure your FastAPI port 8000 server is online.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 p-6 md:p-10 font-sans antialiased">
      <header className="border-b border-zinc-800 pb-6 mb-8 text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">
          Resume Analysis Engine
        </h1>
        <p className="text-zinc-400 text-sm mt-1 p-0">
          Upload your resume PDF to scan match criteria scores using multi-agent parsing pipelines.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Control Card */}
        <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 h-fit shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4 text-left">Upload Document</h2>
          
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="border border-dashed border-zinc-700 hover:border-purple-500/50 rounded-xl p-6 transition-all bg-[#18181b] text-center cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-2xl mb-2">📄</div>
              <p className="text-sm font-semibold text-zinc-300 truncate">
                {file ? file.name : "Select Resume File"}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Supports PDF, DOCX up to 5MB</p>
            </div>

            <button
              onClick={uploadResume}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              {loading ? "Analyzing Document Parameters..." : "Analyze Resume"}
            </button>
          </div>
        </div>

        {/* Results Metadata Display Viewport */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl text-left">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <h2 className="text-xl font-bold text-white">Evaluation Assessment Matrix</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">ATS Match:</span>
                  <span className="text-2xl font-mono font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                    {result.ats_score}/100
                  </span>
                </div>
              </div>

              {/* Strengths Blocks */}
              <div>
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">⚡ Key Structural Strengths</h3>
                <ul className="space-y-2 list-none p-0 m-0">
                  {result.strengths?.map((s, i) => (
                    <li key={i} className="text-zinc-300 text-sm bg-zinc-800/30 border border-zinc-800/80 px-4 py-2.5 rounded-xl">
                      ✅ {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses Blocks */}
              <div>
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">⚠️ Areas for Improvement</h3>
                <ul className="space-y-2 list-none p-0 m-0">
                  {result.weaknesses?.map((w, i) => (
                    <li key={i} className="text-zinc-300 text-sm bg-zinc-800/30 border border-zinc-800/80 px-4 py-2.5 rounded-xl">
                      🔍 {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-12 text-center border-dashed h-full flex flex-col items-center justify-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-white">No active evaluation loaded</h3>
              <p className="text-sm text-zinc-400 max-w-[320px] mt-1 leading-relaxed">
                Upload your engineering resume document package to process live multi-agent RAG score calculations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}