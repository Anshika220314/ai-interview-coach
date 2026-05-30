import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  // 🌟 Real-world dynamic state management: set this array to empty for a new user!
  const [recentInterviews] = useState([]);

  // Dynamically compute metrics from our interview tracking array
  const totalInterviews = recentInterviews.length;
  const completedMocks = recentInterviews.filter(s => s.status === "Completed");
  const hoursPracticed = totalInterviews > 0 ? `${(totalInterviews * 0.5).toFixed(1)}h` : "0h";
  
  const avgScore = completedMocks.length > 0 
    ? `${Math.round(completedMocks.reduce((acc, curr) => acc + curr.score, 0) / completedMocks.length)}%`
    : "—";

  const upcomingSessions = recentInterviews.filter(s => s.status === "Scheduled").length;

  return (
    <div className="min-h-screen w-full flex bg-[#09090b] text-zinc-100 font-sans antialiased">
      
      {/* 1. SIDEBAR COMPONENT ATTACHMENT */}
      <Sidebar />

      {/* 2. MAIN WORKSPACE VIEWPORT */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        
        {/* Header Ribbon Row */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6 mb-8 text-left">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">Dashboard System</h1>
            <p className="text-zinc-400 text-sm mt-1 p-0">Welcome back! Here is your current engineering interview metric analysis.</p>
          </div>
        </header>

        {/* METRIC STATS GRID CARD BLOCK */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-left">
          <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Total Mocks</span>
            <span className="text-3xl font-bold text-white tracking-tight">{totalInterviews}</span>
          </div>
          <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Average Score</span>
            <span className="text-3xl font-bold text-emerald-400 tracking-tight">{avgScore}</span>
          </div>
          <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Hours Practiced</span>
            <span className="text-3xl font-bold text-white tracking-tight">{hoursPracticed}</span>
          </div>
          <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Upcoming Live</span>
            <span className="text-3xl font-bold text-purple-400 tracking-tight">{upcomingSessions}</span>
          </div>
        </section>

        {/* CONDITIONAL RENDERING LOGIC ENTRY ROW */}
        {totalInterviews === 0 ? (
          /* Sleek Empty State Workspace Block for New Users */
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed">
            <div className="h-14 w-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center text-2xl mb-4 border border-zinc-700/50">
              🎯
            </div>
            <h3 className="text-xl font-bold text-white m-0 p-0">No mock history records yet</h3>
            <p className="text-zinc-400 text-sm max-w-[340px] mt-2 mb-6 p-0 leading-relaxed">
              Your dashboard console metrics look clear! Launch your initial voice evaluation window matrix to kick off your profile tracking.
            </p>
          </div>
        ) : (
          /* Table Layout renders only when history array count overrides zero */
          <section className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl text-left">
            <div className="px-6 py-5 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white m-0 p-0">Recent Interview Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-zinc-300">
                <thead className="bg-zinc-800/40 text-xs text-zinc-400 font-semibold uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-3.5">Target Job Role Mapping</th>
                    <th className="px-6 py-3.5">Evaluation Date</th>
                    <th className="px-6 py-3.5">AI Performance Score</th>
                    <th className="px-6 py-3.5">System Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {recentInterviews.map((session) => (
                    <tr key={session.id} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{session.role}</td>
                      <td className="px-6 py-4 text-zinc-400">{session.date}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400">
                          {session.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300">
                          {session.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}