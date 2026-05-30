import { useState, useEffect } from "react";
import api from "../services/api"; // Your auto-JWT attached Axios client for Spring Boot
import Sidebar from "../components/Sidebar";

export default function InterviewHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterviewHistory = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Fetch historical evaluations from Spring Boot pipeline
        const response = await api.get("/api/interviews/results");
        if (response.data) {
          setHistory(response.data);
        }
      } catch (err) {
        setError("Could not parse database logs. Displaying mock simulation arrays.");
        // Fallback production schema placeholder for look-and-feel tracking
        setHistory([
          { id: 1, company: "Amazon", role: "Backend Engineer", technicalScore: "8/10", communicationScore: "9/10", createdAt: "2026-05-28" },
          { id: 2, company: "Google", role: "Systems Infrastructure", technicalScore: "6/10", communicationScore: "7/10", createdAt: "2026-05-25" },
          { id: 3, company: "Microsoft", role: "Cloud Solutions Architect", technicalScore: "9/10", communicationScore: "8/10", createdAt: "2026-05-20" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewHistory();
  }, []);

  // Compute status metrics badges on the fly matching corporate guidelines
  const getStatusBadge = (techStr) => {
    const score = parseInt(String(techStr).replaceAll("[^0-9]", ""), 10) || 0;
    if (score >= 8) {
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Strong Pass</span>;
    } else if (score >= 6) {
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">Borderline</span>;
    } else {
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500/10 border border-red-500/20 text-red-400">Needs Review</span>;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#09090b] text-zinc-100 font-sans antialiased">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <header className="border-b border-zinc-800 pb-6 mb-8 text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">
            Session History
          </h1>
          <p className="text-zinc-400 text-sm mt-1 p-0">
            Review previous technical evaluations, metrics timelines, and system feedback blocks.
          </p>
        </header>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs text-left font-medium">
            💡 {error}
          </div>
        )}

        {/* Dynamic Table Layout System Container */}
        <div className="bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-zinc-400 text-sm">
              Parsing secure database records...
            </div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center border-dashed border-2 border-zinc-800 m-4 rounded-xl flex flex-col items-center justify-center">
              <div className="text-3xl mb-2">📁</div>
              <h3 className="text-base font-bold text-white">No sessions archived</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-[285px]">Your completed interview performance arrays will catalog right here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse m-0 p-0">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/30">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Target Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Evaluation Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">Tech Score</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">Comm Score</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-800/10 transition-colors">
                      <td className="px-6 py-4.5 font-bold text-white text-sm">{item.company || "General"}</td>
                      <td className="px-6 py-4.5 text-zinc-300 text-sm">{item.role || "Software Engineer"}</td>
                      <td className="px-6 py-4.5 text-zinc-400 text-sm font-mono">
                        {item.createdAt ? item.createdAt.split("T")[0] : "Recent"}
                      </td>
                      <td className="px-6 py-4.5 text-center font-mono text-sm font-bold text-purple-400">{item.technicalScore}</td>
                      <td className="px-6 py-4.5 text-center font-mono text-sm font-bold text-emerald-400">{item.communicationScore}</td>
                      <td className="px-6 py-4.5 text-right">{getStatusBadge(item.technicalScore)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}