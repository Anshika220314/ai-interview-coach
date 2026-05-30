import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import Chat from "./pages/Chat";
import InterviewGenerator from "./pages/InterviewGenerator";
import AnswerEvaluation from "./pages/AnswerEvaluation"; 
import ProtectedRoute from "./routes/ProtectedRoute";
import InterviewHistory from "./pages/InterviewHistory"; 
import CareerAdvisor from "./pages/CareerAdvisor"; // 🌟 IMPORTED MODULE 4: CAREER ADVISOR

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Entry Gateway Route Map Options */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🛡️ Secure Dashboard Framework */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Secure Resume Analysis Multi-Agent Panel */}
        <Route
          path="/resume-analysis"
          element={
            <ProtectedRoute>
              <ResumeAnalysis />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Secure AI Coach Chat Canvas Interface */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Secure AI Prompt Interview Generation System */}
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewGenerator />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Secure AI Response Metric Evaluation Engine Route (Module 1) */}
        <Route
          path="/evaluate"
          element={
            <ProtectedRoute>
              <AnswerEvaluation />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Secure Historical Interview Ledger Tracker View (Module 3) */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <InterviewHistory />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ Secure AI Career Advisor Strategy Interface Route (Module 4) */}
        <Route
          path="/career"
          element={
            <ProtectedRoute>
              <CareerAdvisor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;