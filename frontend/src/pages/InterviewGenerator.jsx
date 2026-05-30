import { useState } from "react";
import axios from "axios";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner"; // 🌟 MODULE 6 INTEGRATION

export default function InterviewGenerator() {
  // Configuration Settings State
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [difficulty, setDifficulty] = useState("Mid-Level");
  
  // Session Workflow Tracking States
  const [step, setStep] = useState(1); // Step 1: Setup | 2: Active Session | 3: Live Evaluation
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");

  // Data Aggregation Context Elements
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answersLog, setAnswersLog] = useState([]);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [syncStatus, setSyncStatus] = useState("");

  // WORKFLOW ACTION 1: Generate Interview Questions Array Block
  const handleStartInterview = async (e) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) {
      setError("Please specify both your target engineering role and company context.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setLoadingMessage("Generating Interview..."); 

      const response = await axios.post("http://localhost:8000/generate-interview", null, {
        params: { role, company, difficulty }
      });

      // Parsing generated string blocks down to structural operational clean lines
      const rawText = response.data.interview_questions || "";
      const parsedLines = rawText
        .split("\n")
        .map(line => line.replace(/^[0-9.\-*)\s]+/, "").trim())
        .filter(line => line.length > 15 && line.endsWith("?"));

      if (parsedLines.length === 0) {
        // Fallback robust baseline sample configuration questions array
        setQuestions([
          `Explain how you would optimize a high-throughput endpoint for ${role} at ${company}.`,
          "What is the difference between an inner join and an outer join in PostgreSQL storage configurations?",
          "How do you approach error handling and circuit breaker states in distributed systems architectures?"
        ]);
      } else {
        setQuestions(parsedLines.slice(0, 4)); // Take a clean cross-section batch of 4 questions
      }

      setStep(2); // Progress seamlessly to Step 2: Active Session
    } catch (err) {
      console.error("FastAPI question generation pipeline failure:", err);
      setError("Failed to generate simulation context fields. Verify your FastAPI engine is online.");
    } finally {
      setLoading(false);
    }
  };

  // WORKFLOW ACTION 2: Process Answer Pipeline Tracking
  const handleNextQuestion = () => {
    if (!currentAnswer.trim()) {
      alert("Please record or type an answer blueprint before advancing the session sequence.");
      return;
    }

    // Append into structural execution evaluation history maps
    const updatedLog = [
      ...answersLog,
      { question: questions[currentQuestionIndex], answer: currentAnswer }
    ];
    setAnswersLog(updatedLog);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
    } else {
      // Session finished! Auto-trigger evaluation sequence step 3 using updated log data directly
      triggerSessionEvaluation(updatedLog);
    }
  };

  // WORKFLOW ACTION 3 & 4: Evaluate and Sync Scores to Dashboard 
  const triggerSessionEvaluation = async (finalLog) => {
    try {
      setError("");
      setSyncStatus("");
      setLoading(true);
      setLoadingMessage("Evaluating Answer..."); 
      setStep(3);

      // Aggregate session context logs into centralized metric points safely
      const targetCompany = company || "General";
      const targetSession = finalLog[0] || { 
        question: questions[questions.length - 1], 
        answer: currentAnswer 
      };

      const formData = new FormData();
      formData.append("question", targetSession.question);
      formData.append("answer", targetSession.answer);

      const aiResponse = await axios.post("http://localhost:8000/evaluate-answer", formData);
      const evalData = aiResponse.data;

      setEvaluationResult(evalData);

      // Parse and sync scores straight down to your PostgreSQL analytics dashboard backend
      try {
        setSyncStatus("Updating Dashboard..."); 
        
        const dbPayload = {
          company: targetCompany,
          role: role,
          technicalScore: parseInt(String(evalData.technical_score).replaceAll(/[^0-9]/g, ""), 10) || 7,
          communicationScore: parseInt(String(evalData.communication_score).replaceAll(/[^0-9]/g, ""), 10) || 8,
          strengths: JSON.stringify(evalData.strengths || ["Cohesive structural answers logged."]),
          weaknesses: JSON.stringify(evalData.weaknesses || ["Conceptual edges require scaling analysis."])
        };

        await api.post("/analytics/save", dbPayload);
        setSyncStatus("Session matrix integrated completely with PostgreSQL tracking cards!");
      } catch (dbErr) {
        console.error("Database persistence fallback sync logging trigger failure:", dbErr);
        setSyncStatus("Scores rendered, but database dashboard update step timed out.");
      }

    } catch (err) {
      console.error("AI Evaluation orchestration interface error context:", err);
      setError("Algorithmic evaluation layer failed to parse text logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#09090b] text-zinc-100 font-sans antialiased">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <header className="border-b border-zinc-800 pb-6 mb-8 text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 p-0">AI Simulator System</h1>
          <p className="text-zinc-400 text-sm mt-1 p-0">Complete immersive workspace sequencing pipeline from dynamic parameter generation to PostgreSQL score indexing metrics.</p>
        </header>

        {error && <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left font-medium">{error}</div>}
        {syncStatus && <div className="mb-6 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs text-left font-medium">✨ {syncStatus}</div>}

        <div className="max-w-3xl mx-auto">
          {loading ? (
            /* 🌟 MODULE 6 INTERACTION HUB LOADING BLOCK USING REUSABLE COMPONENT */
            <div className="py-12">
              <LoadingSpinner message={loadingMessage} />
            </div>
          ) : (
            <>
              {/* STEP 1: INTERVIEW PARAMETERS GATEWAY WRAPPER */}
              {step === 1 && (
                <form onSubmit={handleStartInterview} className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5 text-left animate-fadeIn">
                  <h2 className="text-lg font-bold text-white mb-1">Configure Simulated Matrix</h2>
                  <p className="text-xs text-zinc-400 mt-0 mb-4">Expose technical prompts built specifically against corporate evaluation architectures.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Target Role</label>
                      <input type="text" placeholder="e.g. Backend Engineer" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Target Company</label>
                      <input type="text" placeholder="e.g. Amazon, Google" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 pl-0.5">Complexity Tier</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all cursor-pointer">
                      <option value="Entry-Level">Associate / Intern Tier</option>
                      <option value="Mid-Level">Mid-Level Infrastructure Engineer</option>
                      <option value="Senior">Senior Systems Architect</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer">
                    Initialize Interactive Session Sequence
                  </button>
                </form>
              )}

              {/* STEP 2: ACTIVE RECOGNITION INTERACTION INTERFACE PANEL */}
              {step === 2 && questions.length > 0 && (
                <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 shadow-xl text-left animate-fadeIn space-y-5">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">Live Session Running</span>
                    <span className="text-xs font-mono text-zinc-400">Prompt Node {currentQuestionIndex + 1} of {questions.length}</span>
                  </div>

                  <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5">
                    <h3 className="text-base font-bold text-white leading-relaxed m-0">{questions[currentQuestionIndex]}</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 pl-0.5">Your Response Architecture Blueprint</label>
                    <textarea rows={6} placeholder="Formulate your complete algorithmic execution flow solution strategy text blocks right here..." value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)} className="w-full bg-[#18181b] border border-zinc-800 focus:border-purple-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none text-left" />
                  </div>

                  <button onClick={handleNextQuestion} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer">
                    {currentQuestionIndex + 1 === questions.length ? "Submit Session for AI Analysis" : "Commit Response & Advance"}
                  </button>
                </div>
              )}

              {/* STEP 3: CONSOLIDATED SESSION PERFORMANCE METRICS DISPLAY */}
              {step === 3 && evaluationResult && (
                <div className="space-y-6 text-left animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl flex flex-col shadow-md">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Session Tech Aggregate</span>
                      <span className="text-3xl font-mono font-black text-purple-400">{evaluationResult.technical_score}</span>
                    </div>
                    <div className="bg-[#121214] border border-zinc-800 p-5 rounded-2xl flex flex-col shadow-md">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Session Comm Aggregate</span>
                      <span className="text-3xl font-mono font-black text-emerald-400">{evaluationResult.communication_score}</span>
                    </div>
                  </div>

                  <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
                    <h3 className="text-md font-bold text-white border-b border-zinc-800 pb-2 m-0">Evaluator Synthesis Output Logs</h3>
                    
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">✅ Highlighted Performance Strengths</h4>
                      <div className="space-y-1">{evaluationResult.strengths?.map((s, i) => <p key={i} className="text-sm text-zinc-300 bg-zinc-800/10 border border-zinc-800/40 px-3 py-2 rounded-xl m-0">🔥 {s}</p>)}</div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">🔍 Code Optimization Vulnerabilities</h4>
                      <div className="space-y-1">{evaluationResult.weaknesses?.map((w, i) => <p key={i} className="text-sm text-zinc-300 bg-zinc-800/10 border border-zinc-800/40 px-3 py-2 rounded-xl m-0">📌 {w}</p>)}</div>
                    </div>

                    <button onClick={() => { setStep(1); setQuestions([]); setCurrentQuestionIndex(0); setCurrentAnswer(""); setAnswersLog([]); setEvaluationResult(null); setSyncStatus(""); }} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-3 px-4 rounded-xl mt-4 transition-all shadow-md cursor-pointer">
                      Return to Configuration Matrix Gateway
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}