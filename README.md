# AI Interview Coach Engine 🎙️🤖

[![System Status](https://img.shields.io/badge/System-Online-emerald?style=for-the-badge&logo=statuspage)](https://github.com/Anshika220314/ai-interview-coach)
[![Framework](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/)
[![AI Engine](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![LLM Platform](https://img.shields.io/badge/Gemini_AI-Flash_2.5-blue?style=for-the-badge&logo=google)](https://ai.google.dev/)

A premium, production-ready full-stack SaaS platform built to transform technical interview preparation. It automates high-fidelity mock session simulations, processes text solution arrays through a custom semantic evaluation matrix, and computes real-time telemetry graphs, all backed by an intelligent multi-agent distributed microservice architecture.

---

## 🏗️ Core Architecture & Data Vector Flow

The engine splits heavy computational business tracking and large token tokenization models across isolated, responsive runtime containers to maintain structural scale:

```text
    [ React Frontend Portal ] (Port 5173)
               │
               ▼  (RESTful Axios HTTP Envelopes with Auto-JWT)
    [ Spring Boot Core Backend ] (Port 8080) ──── (JDBC / JPA) ────► [ PostgreSQL DB ]
               │
               ▼  (Internal Microservice Cross-Communication Node)
    [ FastAPI Processing Engine ] (Port 8000) ───► [ FAISS Vector Index ] ───► [ Gemini LLM ]

    🎨 Client Interface Platform: React 19, Vite compilation engine, Tailwind CSS utility layers, Recharts graphics, React Router DOM.

🛡️ Central Core Server: Spring Boot 3.x, Spring Data JPA abstraction, Hibernate ORM mappings, JWT security filters, embedded Apache Tomcat instance.

🐍 Heavy Text Processing AI Node: FastAPI, Python 3.11, PyMuPDF data stream extraction pipelines, asynchronous Uvicorn cluster layers.

🧠 Vector Optimization Strategy: Google Gemini 2.5 Flash LLM, local memory-cached FAISS matrix clusters for Retrieval-Augmented Generation (RAG).

🔥 Enterprise Feature Set Matrix
1. Telemetry SaaS Dashboard 📊
A polished dark-obsidian console interface layout optimized for cross-screen devices (1440px, 1024px, 768px). Aggregates data inputs from PostgreSQL tracking tables to stream real-time performance trajectories and target focus density statistics.

2. Conversational RAG Chat Engine 🔍
Ingests resume PDF assets, splits raw text into functional chunk fragments, creates multi-dimensional token maps, and slots them directly into FAISS memory. Allows candidates to cross-examine target corporation requirements in real time.

3. Complete Simulation State Machine 🎙️
Chains the ultimate responsive portfolio loop end-to-end sequentially:

Plaintext
Configure Params  ➔  Generate Prompts  ➔  Capture Answers  ➔  Compute Scores  ➔  PostgreSQL Sync
4. Strategic Career Advisor Strategist 🧭
Exposes the delta between the user's current technical toolbelt and their target corporate destination position. Returns structural multi-phase execution milestones, credential requirements, and distinct application concepts.

💻 Visual Telemetry Interface Deck
📊 Dashboard Metrics Center
Premium modern dark user dashboard displaying Welcome Cards, Quick Launchers, and live evaluation charts.

🎯 Performance Evaluation Matrix
Granular diagnostic telemetry logs scoring technical capabilities alongside communication execution bars.

🧭 Career Adaptive Roadmap Hub
AI Agent tracking tool displaying architectural progression paths, required credentials, and core stacks.

🚀 Execution & Quick Start Instructions
1. Initialize Python AI Node
Bash
cd backend/ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
2. Launch Spring Boot Server Core
Ensure your local PostgreSQL server instance is running.

Adjust credential matching keys within src/main/resources/application.properties.

Boot BackendApplication.java using your main development IDE compiler.

3. Spin Up React Frontend Framework
Bash
cd frontend
npm install
npm run dev
Open your browser canvas interface directly onto: http://localhost:5173

🔒 Error Handling & Resilient Fail-Safes
The platform incorporates absolute resilience filters. Every endpoint lifecycle is guarded by clear try/catch handlers. If an engine experiences a downstream disconnection or parsing anomaly, the UI intercepts the fault safely—replacing empty white crash panels with user-friendly system messages like Unable to connect to AI service, ensuring high-end product reliability.


***

### 🛠️ Commit and Send it Up!
Pop open your terminal one last time and push this final polished version:
```bash
git add .
git commit -m "docs: fix readme formatting code-blocks"
git push origin main
Your repo profile is officially absolute perfection! 🚀✨