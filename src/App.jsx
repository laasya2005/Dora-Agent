import { useState, useRef, useEffect } from 'react'
import styles from './App.module.css'

const Icon = {
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )
}

function formatText(text) {
  return text
    .split('\n\n')
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
}

function Sidebar({ docs, onUpload, onClear, loading }) {
  const fileInputRef = useRef()

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onUpload(e.target.files[0])
      e.target.value = ''
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>{Icon.headset}</div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>Dora</span>
          <span className={styles.brandTag}>Customer Agent</span>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.sectionHeader}>
          <span>Knowledge Base</span>
          {docs.length > 0 && (
            <button className={styles.clearBtn} onClick={onClear}>
              {Icon.trash}
            </button>
          )}
        </div>

        <div className={styles.fileList}>
          {docs.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>{Icon.docs}</div>
              <p>No documents</p>
              <span>Upload to train agent</span>
            </div>
          ) : (
            docs.map((doc, i) => (
              <div key={i} className={styles.fileItem}>
                {Icon.file}
                <span>{doc}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.md"
        onChange={handleFileChange}
        hidden
      />

      <button
        className={styles.uploadBtn}
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        {Icon.upload}
        {loading ? 'Processing...' : 'Upload Document'}
      </button>

      <div className={styles.sidebarFooter}>
        <span>PDF, TXT, MD</span>
      </div>
    </aside>
  )
}

function Message({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`${styles.message} ${isUser ? styles.messageUser : styles.messageAssistant}`}>
      <div className={styles.avatar}>
        {isUser ? Icon.user : Icon.headset}
      </div>
      <div className={styles.messageContent}>
        <span className={styles.messageRole}>{isUser ? 'You' : 'Dora'}</span>
        <div
          className={styles.bubble}
          dangerouslySetInnerHTML={{ __html: formatText(content) }}
        />
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className={`${styles.message} ${styles.messageAssistant}`}>
      <div className={styles.avatar}>{Icon.headset}</div>
      <div className={styles.messageContent}>
        <span className={styles.messageRole}>Dora</span>
        <div className={styles.typingBubble}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={styles.toast}>
      {Icon.alert}
      {message}
    </div>
  )
}

function Welcome({ hasDocs }) {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeIcon}>
          {hasDocs ? Icon.chat : Icon.upload}
        </div>
        <h2>{hasDocs ? 'Ready to Help' : 'Upload Documents'}</h2>
        <p>
          {hasDocs
            ? 'Ask questions about your documents'
            : 'Upload PDF, TXT, or MD files'}
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([])
  const [docs, setDocs] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const chatRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    fetch('/health')
      .then(res => res.json())
      .then(data => {
        if (!data.ollama) setError('Start Ollama first')
      })
      .catch(() => setError('Server not running'))

    fetch('/documents')
      .then(res => res.json())
      .then(data => setDocs(data.documents || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages, loading])

  const handleUpload = async (file) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      await fetch('/upload', { method: 'POST', body: formData })
      const res = await fetch('/documents')
      const data = await res.json()
      setDocs(data.documents || [])
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleClear = async () => {
    await fetch('/documents', { method: 'DELETE' }).catch(() => {})
    setDocs([])
    setMessages([])
  }

  const handleSend = async () => {
    const msg = input.trim()
    if (!msg || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    try {
      const res = await fetch('/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages })
      })

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const lines = decoder.decode(value).split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                fullResponse += parsed.content
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: fullResponse
                  }
                  return updated
                })
              }
            } catch {}
          }
        }
      }
    } catch {
      setError('Connection failed')
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.app}>
      <Sidebar
        docs={docs}
        onUpload={handleUpload}
        onClear={handleClear}
        loading={uploading}
      />

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitle}>
              <h1>Support Chat</h1>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                Online
              </div>
            </div>
            <p className={styles.headerSubtitle}>Ask about your documents</p>
          </div>
        </header>

        <div className={styles.chat} ref={chatRef}>
          {messages.length === 0 ? (
            <Welcome hasDocs={docs.length > 0} />
          ) : (
            messages.map((msg, i) => <Message key={i} {...msg} />)
          )}
          {loading && messages[messages.length - 1]?.role !== 'assistant' && (
            <TypingIndicator />
          )}
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={docs.length ? 'Ask a question...' : 'Upload a document first'}
              rows={1}
              disabled={!docs.length}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim() || !docs.length}
            >
              {Icon.send}
            </button>
          </div>
          <span className={styles.inputHint}>Enter to send</span>
        </div>
      </main>

      {error && <Toast message={error} onClose={() => setError(null)} />}
    </div>
  )
}
