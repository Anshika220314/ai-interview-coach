import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // 🌟 MODULE 7: Protected API Data Ingestion Handshake with Try/Catch
        const overviewRes = await api.get("/analytics/overview");
        setMetrics(overviewRes.data);

        const historyRes = await api.get("/api/interviews/results");
        setHistory(historyRes.data || []);
      } catch (err) {
        console.error("Dashboard engine network connection timeout context:", err);
        // 🌟 MODULE 7: Display explicit error message layout banner
        setError("Unable to connect to AI service. Displaying fallback sandbox environment metrics.");
        
        // Premium production structural mock data layout backup
        setMetrics({
          totalInterviews: 8,
          avgTechnicalScore: "8.4/10",
          avgCommunicationScore: "7.9/10",
          mostPracticedCompany: "Amazon",
          scoreTrends: [
            { date: "Node 1", tech: 7.0, comm: 6.5 },
            { date: "Node 2", tech: 7.8, comm: 7.2 },
            { date: "Node 3", tech: 8.5, comm: 8.0 },
            { date: "Node 4", tech: 8.4, comm: 7.9 }
          ],
          distribution: [
            { name: "Amazon", value: 4 },
            { name: "Google", value: 2 },
            { name: "Microsoft", value: 2 }
          ]
        });
        setHistory([
          { id: 101, company: "Amazon", role: "Backend Engineer", technicalScore: "8/10", communicationScore: "9/10", createdAt: "2026-05-31" },
          { id: 102, company: "Google", role: "Infrastructure Lead", technicalScore: "7/10", communicationScore: "8/10", createdAt: "2026-05-29" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const COLORS = ["#8b5cf6", "#10b981", "#3b82f6", "#f59e0b"];

  return (
    // 🌟 MODULE 8: Responsive flex layout framework preventing sidebar squeezing
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#09090b] text-zinc-100 font-sans antialiased overflow-x-hidden">
      <Sidebar />

      {/* Main Framework Content Scoping Viewport */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto overflow-y-auto p-4 sm:p-6 md:p-10 transition-all">
        
        {/* 🌟 MODULE 9: Welcome Section Profile Badge */}
        <header className="border-b border-zinc-800 pb-5 mb-8 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white m-0 p-0">
              Welcome Back, Anshika
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 p-0">
              Your platform multi-agent metrics telemetry parameters are compiling optimally.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-xl text-[11px] font-mono text-purple-400 font-bold">
            Cluster Online • Port 8080
          </div>
        </header>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-purple-400 text-xs text-left font-medium">
            💡 {error}
          </div>
        )}

        {loading ? (
          <div className="py-24"><LoadingSpinner message="Assembling SaaS Telemetry Matrix..." /></div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 🌟 MODULE 9: Quick Actions Integration Cards Grid Grid Layout */}
            <section className="text-left">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3.5 pl-0.5">Quick Infrastructure Launchers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/resume-analysis" className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl hover:border-purple-500/50 transition-all text-left group no-underline">
                  <div className="text-xl mb-2">📄</div>
                  <h3 className="text-sm font-bold text-white m-0 group-hover:text-purple-400 transition-colors">Upload Resume</h3>
                  <p className="text-xs text-zinc-400 mt-1 m-0">Ingest PDF streams into FAISS vector layers.</p>
                </Link>
                <Link to="/interview" className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl hover:border-purple-500/50 transition-all text-left group no-underline">
                  <div className="text-xl mb-2">🎙️</div>
                  <h3 className="text-sm font-bold text-white m-0 group-hover:text-purple-400 transition-colors">Start Mock Interview</h3>
                  <p className="text-xs text-zinc-400 mt-1 m-0">Initialize automated technical session steps.</p>
                </Link>
                <Link to="/chat" className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl hover:border-purple-500/50 transition-all text-left group no-underline">
                  <div className="text-xl mb-2">💬</div>
                  <h3 className="text-sm font-bold text-white m-0 group-hover:text-purple-400 transition-colors">AI Chat Agent</h3>
                  <p className="text-xs text-zinc-400 mt-1 m-0">Consult your company-aware trainer node.</p>
                </Link>
                <Link to="/career" className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl hover:border-purple-500/50 transition-all text-left group no-underline">
                  <div className="text-xl mb-2">🧭</div>
                  <h3 className="text-sm font-bold text-white m-0 group-hover:text-purple-400 transition-colors">Career Roadmap</h3>
                  <p className="text-xs text-zinc-400 mt-1 m-0">Extract adaptive architectural career совет advice.</p>
                </Link>
              </div>
            </section>

            {/* Core Statistics KPI Block Array */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Total Sync Rounds</span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-white">{metrics.totalInterviews}</span>
              </div>
              <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Avg Tech Score</span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-purple-400">{metrics.avgTechnicalScore}</span>
              </div>
              <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Avg Comm Score</span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">{metrics.avgCommunicationScore}</span>
              </div>
              <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Primary Company Target</span>
                <span className="text-lg sm:text-xl font-black text-purple-300 truncate block mt-1">{metrics.mostPracticedCompany}</span>
              </div>
            </section>

            {/* 🌟 MODULE 9: Analytics Overview Recharts Graph Layout System Container */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
              <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5 shadow-xl lg:col-span-2">
                <h3 className="text-sm font-bold text-white mb-4">Performance Metrics Timeline Trend</h3>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metrics.scoreTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
                      <YAxis stroke="#71717a" domain={[0, 10]} fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", color: "#f4f4f5" }} />
                      <Line type="monotone" dataKey="tech" stroke="#8b5cf6" strokeWidth={3} name="Technical" activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="comm" stroke="#10b981" strokeWidth={3} name="Communication" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Company Distribution Pie Chart Representation Wrapper */}
              <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5 shadow-xl relative">
                <h3 className="text-sm font-bold text-white mb-4">Target Company Concentration Distribution</h3>
                <div className="w-full h-64 flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={metrics.distribution} cx="50%" cy="47%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                        {metrics.distribution?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", color: "#f4f4f5" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-0 flex flex-wrap justify-center gap-x-4 gap-y-1 w-full text-[10px] text-zinc-400 font-mono">
                    {metrics.distribution?.map((entry, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span>{entry.name}: {entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 🌟 MODULE 9: Recent Interviews Tabular Ledger Data Grid View */}
            <section className="text-left">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3.5 pl-0.5">Recent Session Ingest Logs</h2>
              <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto w-full">
                  <table className="w-full border-collapse text-left m-0">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/30">
                        <th className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">Tech Score</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-zinc-400 tracking-wider text-center">Comm Score</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {history.slice(0, 3).map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-800/10 transition-colors">
                          <td className="px-6 py-4 font-bold text-white text-sm">{item.company || "General"}</td>
                          <td className="px-6 py-4 text-zinc-300 text-sm">{item.role || "Software Engineer"}</td>
                          <td className="px-6 py-4 text-center font-mono font-bold text-sm text-purple-400">{item.technicalScore}</td>
                          <td className="px-6 py-4 text-center font-mono font-bold text-sm text-emerald-400">{item.communicationScore}</td>
                          <td className="px-6 py-4 text-right text-zinc-500 text-xs font-mono">{item.createdAt ? item.createdAt.split("T")[0] : "Recent"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
