import json, os, tempfile, ollama
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from system_prompt import SYSTEM_PROMPT
import rag

app = FastAPI(title="Dora")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_methods=["*"], allow_headers=["*"])

class ChatMessage(BaseModel):
    message: str
    history: list[dict] = []

def check_ollama():
    try: return any("mistral" in m.model.lower() for m in ollama.list().models)
    except: return False

@app.get("/health")
async def health(): return {"status": "healthy" if check_ollama() else "degraded", "ollama": check_ollama()}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    if not file.filename: raise HTTPException(400, "No filename")
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".pdf", ".txt", ".md"]: raise HTTPException(400, "Only PDF, TXT, MD supported")
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(await file.read())
        path = tmp.name
    try: return {"filename": file.filename, "chunks": rag.add_document(path, file.filename)}
    finally: os.unlink(path)

@app.get("/documents")
async def get_docs(): return {"documents": rag.get_documents()}

@app.delete("/documents")
async def clear_docs():
    rag.clear_documents()
    return {"status": "cleared"}

@app.post("/chat/stream")
async def chat(req: ChatMessage):
    if not check_ollama(): raise HTTPException(503, "Ollama not running")
    ctx, docs = rag.get_context(req.message), rag.get_documents()
    if ctx and docs:
        system = f"{SYSTEM_PROMPT}\n\nDocuments: {', '.join(docs)}\n\n{ctx}\n\nUse ALL documents above. Cite sources."
    else:
        system = f"{SYSTEM_PROMPT}\n\nNo documents uploaded."
    messages = [{"role": "system", "content": system}] + req.history[-6:] + [{"role": "user", "content": req.message}]

    async def stream():
        try:
            for chunk in ollama.chat(model="mistral", messages=messages, stream=True, options={"temperature": 0.1, "num_predict": 1024}):
                yield f"data: {json.dumps({'content': chunk['message']['content']})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e: yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(stream(), media_type="text/event-stream", headers={"Cache-Control": "no-cache"})

if __name__ == "__main__":
    import uvicorn
    print("\n  Dora API - http://localhost:8000\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)
