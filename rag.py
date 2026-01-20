import os, json, re
from collections import Counter
from pypdf import PdfReader

CHUNK_SIZE, CHUNK_OVERLAP, STORE_FILE = 800, 100, "./document_store.json"
STOP_WORDS = {'the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','must','shall','can','need','to','of','in','for','on','with','at','by','from','as','into','through','during','before','after','above','below','between','under','again','then','once','here','there','when','where','why','how','all','each','few','more','most','other','some','such','no','not','only','own','same','so','than','too','very','just','and','but','if','or','because','until','while','this','that','these','those','what','which','who','whom','it','its'}
documents = []

def chunk_text(text):
    text = re.sub(r'\s+', ' ', text).strip()
    chunks, start = [], 0
    while start < len(text):
        end = start + CHUNK_SIZE
        if end < len(text):
            idx = text.rfind(' ', start, end)
            if idx > start: end = idx
        chunk = text[start:end].strip()
        if chunk: chunks.append(chunk)
        start = end - CHUNK_OVERLAP if end < len(text) else end
    return chunks

def extract_text(path, ext):
    if ext == ".pdf":
        return "\n".join(p.extract_text() or "" for p in PdfReader(path).pages)
    with open(path, "r", encoding="utf-8") as f: return f.read()

def tokenize(text):
    return [w for w in re.findall(r'\b[a-z0-9]+\b', text.lower()) if w not in STOP_WORDS and len(w) > 2]

def score(q_tokens, d_tokens):
    if not q_tokens or not d_tokens: return 0.0
    c = Counter(d_tokens)
    s = sum(c[t] * (1 + len(t)/10) for t in q_tokens if t in c)
    for qt in q_tokens:
        for dt, n in c.items():
            if qt != dt and (qt in dt or dt in qt): s += n * 0.5
    return s / (len(d_tokens) ** 0.5)

def load_store():
    global documents
    if os.path.exists(STORE_FILE):
        with open(STORE_FILE) as f: documents = json.load(f).get("documents", [])

def save_store():
    with open(STORE_FILE, "w") as f: json.dump({"documents": documents}, f)

def add_document(path, filename):
    global documents
    load_store()
    text = extract_text(path, os.path.splitext(filename)[1].lower())
    if not text.strip(): return 0
    chunks = chunk_text(text)
    for i, chunk in enumerate(chunks):
        documents.append({"content": chunk, "source": filename, "chunk": i, "tokens": tokenize(chunk)})
    save_store()
    return len(chunks)

def search(query, n_per_doc=3):
    load_store()
    if not documents: return []
    sources, q_tokens, results = list({d["source"] for d in documents}), tokenize(query), []
    for src in sources:
        src_docs = [d for d in documents if d["source"] == src]
        if q_tokens:
            scored = sorted([(score(q_tokens, d.get("tokens", [])), d) for d in src_docs], reverse=True, key=lambda x: x[0])
            top = [d for _, d in scored[:n_per_doc]]
        else:
            top = src_docs[:n_per_doc]
        results.extend({"content": d["content"], "source": d["source"]} for d in top)
    return results

def get_context(query):
    load_store()
    if not documents: return ""
    sources, docs = list({d["source"] for d in documents}), search(query)
    if not docs: return ""
    ctx = f"=== DOCUMENTS: {', '.join(sources)} ===\n\n"
    cur = None
    for d in docs:
        if d["source"] != cur:
            cur = d["source"]
            ctx += f"\n--- {cur} ---\n"
        ctx += d["content"] + "\n\n"
    return ctx + "=== END ===\n"

def get_documents():
    load_store()
    return list({d.get("source", "unknown") for d in documents})

def clear_documents():
    global documents
    documents = []
    if os.path.exists(STORE_FILE): os.remove(STORE_FILE)
