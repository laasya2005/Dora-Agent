# Dora - Customer Support Agent

A document-based AI customer support agent that answers questions using only uploaded documents.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React UI      │────▶│  FastAPI Server │────▶│  Ollama/Mistral │
│   (Vite)        │     │  (Python)       │     │  (Local LLM)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       ▼
        │               ┌─────────────────┐
        │               │   RAG Module    │
        │               │  (JSON Store)   │
        │               └─────────────────┘
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React + Vite |
| Styling | CSS Modules |
| Backend | FastAPI (Python) |
| LLM | Mistral via Ollama |
| RAG | Custom keyword search |
| Storage | JSON file |

## Project Structure

```
CustomerSupport/
├── server.py           # API endpoints (/upload, /chat, /documents)
├── rag.py              # Document chunking, search, context retrieval
├── system_prompt.py    # AI personality and instructions
├── requirements.txt    # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx         # React UI components
    │   ├── App.module.css  # Component styles
    │   ├── index.css       # Global styles and variables
    │   └── main.jsx        # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## How RAG Works

1. **Upload** - Extract text from PDF/TXT/MD → Split into 800-char chunks → Store with tokenized keywords
2. **Query** - Tokenize question → Search all documents → Return top 3 matches per document
3. **Answer** - Send context + question to LLM → Stream response back to UI

## Prerequisites

- Python 3.10+
- Node.js 18+
- Ollama with Mistral model

## Installation

1. Install Ollama and pull Mistral:
```bash
# Install Ollama from https://ollama.ai
ollama pull mistral
```

2. Install Python dependencies:
```bash
cd CustomerSupport
pip3 install -r requirements.txt
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the App

1. Start Ollama (if not running):
```bash
ollama serve
```

2. Start the backend server:
```bash
cd CustomerSupport
python3 server.py
```

3. Start the frontend (new terminal):
```bash
cd CustomerSupport/frontend
npm run dev
```

4. Open http://localhost:3000

## Usage

1. Upload one or more documents (PDF, TXT, or MD)
2. Ask questions about the uploaded content
3. Dora will answer using only information from the documents

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Check server and Ollama status |
| POST | /upload | Upload a document |
| GET | /documents | List uploaded documents |
| DELETE | /documents | Clear all documents |
| POST | /chat/stream | Send message and stream response |

## Features

- Document upload (PDF, TXT, MD)
- Multi-document search
- Real-time streaming responses
- Source citation in answers
- Clean, responsive UI
