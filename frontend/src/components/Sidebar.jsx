import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Automated style tagging macro function to glow items when their paths go active
  const linkStyle = (path) => {
    const base = "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all decoration-none no-underline ";
    return location.pathname === path
      ? `${base} bg-zinc-800/80 text-purple-400 border border-zinc-700/50 shadow-md`
      : `${base} text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 border border-transparent`;
  };

  return (
    <div className="w-64 h-screen border-r border-zinc-800 bg-[#121214] p-6 flex flex-col justify-between shrink-0 select-none">
      <div className="space-y-8">
        {/* Brand identity badge */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white text-sm font-black tracking-tighter">AI</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">AI Coach Console</span>
        </div>

        {/* Navigation Core Routing Link Components Array */}
        <nav className="space-y-1 flex flex-col">
          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            📊 Dashboard Console
          </Link>
          <Link to="/resume-analysis" className={linkStyle("/resume-analysis")}>
            📄 Resume Analysis
          </Link>
          <Link to="/chat" className={linkStyle("/chat")}>
            💬 AI Agent Chat
          </Link>
          <Link to="/interview" className={linkStyle("/interview")}>
            🎙️ Interview Generator
          </Link>
          <Link to="/evaluate" className={linkStyle("/evaluate")}>
            🎯 Answer Evaluator
          </Link>
          <Link to="/history" className={linkStyle("/history")}>
            🕒 Interview History
          </Link>
          {/* 🌟 ADDED MODULE 4: CAREER ADVISOR LINK ROUTE */}
          <Link to="/career" className={linkStyle("/career")}>
            🧭 Career Advisor
          </Link>
        </nav>
      </div>

      {/* Logout triggers */}
      <div className="border-t border-zinc-800 pt-4">
        <button
          onClick={logout}
          className="w-full bg-red-600/10 hover:bg-red-600 border border-red-600/20 hover:border-transparent text-red-400 hover:text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-150 cursor-pointer active:scale-[0.98]"
        >
          Logout Session
        </button>
      </div>
    </div>
  );
}