import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll tracking to anchor layout views on incoming text flows
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault(); // Stop raw browser state resets
    if (!query.trim()) return;

    const userMessage = query;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setQuery("");
    setLoading(true);

    try {
      // Direct integration handshake parsing parameters to FastAPI
      const response = await axios.get("http://localhost:8000/chat", {
        params: { query: userMessage }
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: response.data.response }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Network pipeline communication timeout. Please confirm FastAPI is live on port 8000." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 p-6 md:p-10 flex flex-col font-sans antialiased">
      <header className="border-b border-zinc-800 pb-4 mb-6 text-left shrink-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">AI Coach Assistant</h1>
        <p className="text-zinc-400 text-sm mt-1 p-0">Interactive technical and system design mock chat runtime matrix.</p>
      </header>

      {/* Main Streaming Chat Window Canvas */}
      <div className="flex-1 bg-[#121214] border border-zinc-800 rounded-2xl p-6 overflow-y-auto space-y-4 mb-4 max-h-[60vh]">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12">
            <div className="text-3xl mb-2">🤖</div>
            <h4 className="text-white font-bold text-sm">Session initialized cleanly</h4>
            <p className="text-xs text-zinc-400 max-w-[260px] mt-1">Ask the assistant anything regarding Java infrastructure optimization or system design.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[75%] p-4 rounded-2xl text-left border ${
              msg.role === "user"
                ? "bg-zinc-800/40 border-zinc-700/60 ml-auto text-zinc-200"
                : "bg-purple-600/10 border-purple-500/20 mr-auto text-purple-200"
            }`}
          >
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-60 mb-1">
              {msg.role === "user" ? "👤 Candidate" : "⚙️ AI Evaluator"}
            </span>
            <p className="text-sm m-0 p-0 leading-relaxed whitespace-pre-line">{msg.text}</p>
          </div>
        ))}

        {loading && (
          <div className="bg-purple-600/5 border border-purple-500/10 mr-auto text-purple-400/80 p-4 rounded-2xl max-w-[75%] text-left">
            <span className="text-xs italic font-medium animate-pulse">AI is compiling technical evaluation response matrix...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls form field footer strip */}
      <form onSubmit={sendMessage} className="flex gap-3 bg-[#121214] border border-zinc-800 p-3 rounded-2xl shrink-0 shadow-2xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query chat assistant agent..."
          className="bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-left"
        />
        <button className="bg-white hover:bg-zinc-200 text-black text-sm font-bold px-6 rounded-xl transition-all cursor-pointer shadow-md active:scale-[0.98]">
          Send
        </button>
      </form>
    </div>
  );
}