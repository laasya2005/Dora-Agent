import { useState, useRef, useEffect } from 'react'

// CSS Variables as JS constants
const colors = {
  primary: '#1A1A1A',
  primaryHover: '#000000',
  accent: '#8B7355',
  bg1: '#FFFFFF',
  bg2: '#FAF8F5',
  bg3: '#F5F0E8',
  bg4: '#EBE5DB',
  text1: '#1A1A1A',
  text2: '#4A4A4A',
  text3: '#8A8A8A',
  border: 'rgba(0, 0, 0, 0.1)',
  borderHover: 'rgba(0, 0, 0, 0.2)',
  ring: 'rgba(139, 115, 85, 0.3)',
  green: '#22C55E',
  red: '#DC2626',
}

const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '32px',
  8: '40px',
  9: '48px',
}

const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
}

// Inline styles
const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    background: colors.bg1,
  },
  sidebar: {
    width: '300px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    background: colors.bg2,
    borderRight: `1px solid ${colors.border}`,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[6],
    borderBottom: `1px solid ${colors.border}`,
  },
  brandIcon: {
    width: '44px',
    height: '44px',
    borderRadius: radius.md,
    background: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIconSvg: {
    width: '22px',
    height: '22px',
    color: 'white',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  brandName: {
    fontSize: '16px',
    fontWeight: 700,
    color: colors.text1,
  },
  brandTag: {
    fontSize: '12px',
    color: colors.accent,
    fontWeight: 500,
  },
  sidebarSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing[5],
    overflow: 'hidden',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
  },
  sectionHeaderText: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: colors.text3,
  },
  clearBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    padding: 0,
    background: 'transparent',
    border: `1px solid ${colors.border}`,
    borderRadius: radius.sm,
    color: colors.text3,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  clearBtnSvg: {
    width: '14px',
    height: '14px',
  },
  fileList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing[8]} ${spacing[4]}`,
    textAlign: 'center',
  },
  emptyIcon: {
    width: '48px',
    height: '48px',
    borderRadius: radius.md,
    background: colors.bg3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  emptyIconSvg: {
    width: '24px',
    height: '24px',
    color: colors.text3,
  },
  emptyStateP: {
    fontSize: '13px',
    color: colors.text2,
    marginBottom: spacing[1],
  },
  emptyStateSpan: {
    fontSize: '12px',
    color: colors.text3,
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: `${spacing[3]} ${spacing[4]}`,
    background: colors.bg3,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.sm,
    fontSize: '13px',
    color: colors.text2,
    transition: 'all 0.15s',
  },
  fileItemSvg: {
    width: '16px',
    height: '16px',
    flexShrink: 0,
    color: colors.accent,
  },
  fileItemSpan: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
    padding: spacing[4],
    margin: spacing[5],
    background: colors.primary,
    border: 'none',
    borderRadius: radius.md,
    color: 'white',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  uploadBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  uploadBtnSvg: {
    width: '18px',
    height: '18px',
  },
  sidebarFooter: {
    padding: `${spacing[4]} ${spacing[5]}`,
    borderTop: `1px solid ${colors.border}`,
  },
  sidebarFooterSpan: {
    fontSize: '11px',
    color: colors.text3,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    background: colors.bg1,
  },
  header: {
    padding: `${spacing[6]} ${spacing[8]}`,
    borderBottom: `1px solid ${colors.border}`,
    background: colors.bg2,
  },
  headerContent: {
    maxWidth: '800px',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
  },
  headerH1: {
    fontSize: '20px',
    fontWeight: 700,
    margin: 0,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[1]} ${spacing[3]}`,
    background: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: 500,
    color: colors.green,
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: colors.green,
  },
  headerSubtitle: {
    fontSize: '14px',
    color: colors.text2,
    marginTop: spacing[2],
    margin: 0,
  },
  chat: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing[8],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
  },
  welcome: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
  },
  welcomeCard: {
    maxWidth: '480px',
    textAlign: 'center',
    padding: spacing[8],
    background: colors.bg2,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
  },
  welcomeIcon: {
    width: '72px',
    height: '72px',
    borderRadius: radius.lg,
    background: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `0 auto ${spacing[6]}`,
  },
  welcomeIconSvg: {
    width: '36px',
    height: '36px',
    color: 'white',
  },
  welcomeH2: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: spacing[3],
    margin: `0 0 ${spacing[3]}`,
  },
  welcomeP: {
    fontSize: '15px',
    color: colors.text2,
    lineHeight: 1.6,
    margin: 0,
  },
  message: {
    display: 'flex',
    gap: spacing[4],
    maxWidth: '85%',
    animation: 'messageIn 0.25s ease-out',
  },
  messageUser: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  messageAssistant: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarUser: {
    background: colors.bg3,
    border: `1px solid ${colors.border}`,
  },
  avatarAssistant: {
    background: colors.primary,
  },
  avatarSvg: {
    width: '16px',
    height: '16px',
    color: colors.text2,
  },
  avatarSvgAssistant: {
    width: '16px',
    height: '16px',
    color: 'white',
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  messageRole: {
    fontSize: '12px',
    fontWeight: 600,
    color: colors.text3,
  },
  bubble: {
    padding: `${spacing[4]} ${spacing[5]}`,
    borderRadius: radius.md,
    fontSize: '14px',
    lineHeight: 1.7,
  },
  bubbleUser: {
    background: colors.primary,
    color: 'white',
    borderBottomRightRadius: spacing[1],
  },
  bubbleAssistant: {
    background: colors.bg2,
    border: `1px solid ${colors.border}`,
    borderBottomLeftRadius: spacing[1],
  },
  typingBubble: {
    padding: `${spacing[4]} ${spacing[5]}`,
    background: colors.bg2,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    borderBottomLeftRadius: spacing[1],
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: colors.accent,
    animation: 'bounce 1.4s ease-in-out infinite',
  },
  inputArea: {
    padding: `${spacing[6]} ${spacing[8]}`,
    borderTop: `1px solid ${colors.border}`,
    background: colors.bg2,
  },
  inputWrapper: {
    display: 'flex',
    gap: spacing[3],
    alignItems: 'flex-end',
    width: '100%',
  },
  textarea: {
    flex: 1,
    padding: `${spacing[4]} ${spacing[5]}`,
    background: colors.bg1,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    color: colors.text1,
    fontFamily: 'inherit',
    fontSize: '14px',
    lineHeight: 1.5,
    resize: 'none',
    outline: 'none',
    minHeight: '52px',
    maxHeight: '160px',
    transition: 'all 0.15s',
  },
  textareaDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  sendBtn: {
    width: '52px',
    height: '52px',
    borderRadius: radius.md,
    background: colors.primary,
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.2s',
  },
  sendBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  sendBtnSvg: {
    width: '20px',
    height: '20px',
  },
  inputHint: {
    display: 'block',
    marginTop: spacing[2],
    fontSize: '11px',
    color: colors.text3,
  },
  toast: {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: `${spacing[4]} ${spacing[5]}`,
    background: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: radius.md,
    color: colors.red,
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    animation: 'toastIn 0.25s ease-out',
    zIndex: 100,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  toastSvg: {
    width: '18px',
    height: '18px',
    flexShrink: 0,
  },
}

// Keyframes as a style tag
const keyframesStyle = `
  @keyframes messageIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-4px); }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(12px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`

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
    .map(p => `<p style="margin: 0;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
    .replace(/`(.*?)`/g, `<code style="font-family: 'SF Mono', Monaco, monospace; font-size: 13px; background: ${colors.bg3}; padding: 2px 6px; border-radius: 4px;">$1</code>`)
}

function formatTextUser(text) {
  return text
    .split('\n\n')
    .map(p => `<p style="margin: 0;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
    .replace(/`(.*?)`/g, '<code style="font-family: \'SF Mono\', Monaco, monospace; font-size: 13px; background: rgba(255, 255, 255, 0.2); padding: 2px 6px; border-radius: 4px;">$1</code>')
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
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.brandIcon}>
          <span style={styles.brandIconSvg}>{Icon.headset}</span>
        </div>
        <div style={styles.brandText}>
          <span style={styles.brandName}>Dora</span>
          <span style={styles.brandTag}>Customer Agent</span>
        </div>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionHeaderText}>Knowledge Base</span>
          {docs.length > 0 && (
            <button style={styles.clearBtn} onClick={onClear}>
              <span style={styles.clearBtnSvg}>{Icon.trash}</span>
            </button>
          )}
        </div>

        <div style={styles.fileList}>
          {docs.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <span style={styles.emptyIconSvg}>{Icon.docs}</span>
              </div>
              <p style={styles.emptyStateP}>No documents</p>
              <span style={styles.emptyStateSpan}>Upload to train agent</span>
            </div>
          ) : (
            docs.map((doc, i) => (
              <div key={i} style={styles.fileItem}>
                <span style={styles.fileItemSvg}>{Icon.file}</span>
                <span style={styles.fileItemSpan}>{doc}</span>
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
        style={{
          ...styles.uploadBtn,
          ...(loading ? styles.uploadBtnDisabled : {})
        }}
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        <span style={styles.uploadBtnSvg}>{Icon.upload}</span>
        {loading ? 'Processing...' : 'Upload Document'}
      </button>

      <div style={styles.sidebarFooter}>
        <span style={styles.sidebarFooterSpan}>PDF, TXT, MD</span>
      </div>
    </aside>
  )
}

function Message({ role, content }) {
  const isUser = role === 'user'

  return (
    <div style={{
      ...styles.message,
      ...(isUser ? styles.messageUser : styles.messageAssistant)
    }}>
      <div style={{
        ...styles.avatar,
        ...(isUser ? styles.avatarUser : styles.avatarAssistant)
      }}>
        <span style={isUser ? styles.avatarSvg : styles.avatarSvgAssistant}>
          {isUser ? Icon.user : Icon.headset}
        </span>
      </div>
      <div style={styles.messageContent}>
        <span style={styles.messageRole}>{isUser ? 'You' : 'Dora'}</span>
        <div
          style={{
            ...styles.bubble,
            ...(isUser ? styles.bubbleUser : styles.bubbleAssistant)
          }}
          dangerouslySetInnerHTML={{ __html: isUser ? formatTextUser(content) : formatText(content) }}
        />
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ ...styles.message, ...styles.messageAssistant }}>
      <div style={{ ...styles.avatar, ...styles.avatarAssistant }}>
        <span style={styles.avatarSvgAssistant}>{Icon.headset}</span>
      </div>
      <div style={styles.messageContent}>
        <span style={styles.messageRole}>Dora</span>
        <div style={styles.typingBubble}>
          <span style={styles.typingDot} />
          <span style={{ ...styles.typingDot, animationDelay: '0.2s' }} />
          <span style={{ ...styles.typingDot, animationDelay: '0.4s' }} />
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
    <div style={styles.toast}>
      <span style={styles.toastSvg}>{Icon.alert}</span>
      {message}
    </div>
  )
}

function Welcome({ hasDocs }) {
  return (
    <div style={styles.welcome}>
      <div style={styles.welcomeCard}>
        <div style={styles.welcomeIcon}>
          <span style={styles.welcomeIconSvg}>
            {hasDocs ? Icon.chat : Icon.upload}
          </span>
        </div>
        <h2 style={styles.welcomeH2}>{hasDocs ? 'Ready to Help' : 'Upload Documents'}</h2>
        <p style={styles.welcomeP}>
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
    <div style={styles.app}>
      <style>{keyframesStyle}</style>
      <Sidebar
        docs={docs}
        onUpload={handleUpload}
        onClear={handleClear}
        loading={uploading}
      />

      <main style={styles.main}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerTitle}>
              <h1 style={styles.headerH1}>Support Chat</h1>
              <div style={styles.statusBadge}>
                <span style={styles.statusDot} />
                Online
              </div>
            </div>
            <p style={styles.headerSubtitle}>Ask about your documents</p>
          </div>
        </header>

        <div style={styles.chat} ref={chatRef}>
          {messages.length === 0 ? (
            <Welcome hasDocs={docs.length > 0} />
          ) : (
            messages.map((msg, i) => <Message key={i} {...msg} />)
          )}
          {loading && messages[messages.length - 1]?.role !== 'assistant' && (
            <TypingIndicator />
          )}
        </div>

        <div style={styles.inputArea}>
          <div style={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={docs.length ? 'Ask a question...' : 'Upload a document first'}
              rows={1}
              disabled={!docs.length}
              style={{
                ...styles.textarea,
                ...(!docs.length ? styles.textareaDisabled : {})
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim() || !docs.length}
              style={{
                ...styles.sendBtn,
                ...(loading || !input.trim() || !docs.length ? styles.sendBtnDisabled : {})
              }}
            >
              <span style={styles.sendBtnSvg}>{Icon.send}</span>
            </button>
          </div>
          <span style={styles.inputHint}>Enter to send</span>
        </div>
      </main>

      {error && <Toast message={error} onClose={() => setError(null)} />}
    </div>
  )
}
