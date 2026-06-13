const MESSAGES = [
  {
    id: 1,
    role: 'bot',
    text: 'Salam! 👋 I\'m Awaaz — your AI civic guide. Ask me anything about rights, laws, elections, or government in Pakistan.',
    time: '9:00 AM',
  },
  {
    id: 2,
    role: 'user',
    text: 'What is the right to vote in Pakistan?',
    time: '9:01 AM',
  },
  {
    id: 3,
    role: 'bot',
    text: 'Every Pakistani citizen aged 18+ has the right to vote — it\'s guaranteed under Article 17 of the Constitution. You need to register on the NADRA voter list. It\'s your fundamental right! 🗳️',
    time: '9:01 AM',
  },
  {
    id: 4,
    role: 'user',
    text: 'کیا میں اردو میں پوچھ سکتا ہوں؟',
    time: '9:02 AM',
  },
  {
    id: 5,
    role: 'bot',
    text: 'بالکل! آپ اردو یا انگریزی میں پوچھ سکتے ہیں — میں دونوں زبانوں میں جواب دیتا ہوں۔ 🇵🇰',
    time: '9:02 AM',
  },
]

const SUGGESTED = [
  'What are my fundamental rights?',
  'How does the National Assembly work?',
  'یہ حکومت کیسے کام کرتی ہے؟',
  'What is RTI law?',
]

export default function AskAwaaz() {
  return (
    <div className="chat-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">AI Civic Guide</p>
        <h1 className="page-title">
          Ask <span className="page-title-accent">Awaaz</span>
        </h1>
        <p className="page-sub">Ask anything civic — in Urdu or English.</p>
        <div style={{ marginTop: '10px' }}>
          <span className="coming-soon-chip">🚧 AI Coming Soon</span>
        </div>
      </div>

      {/* Suggested Questions */}
      <div style={{ marginBottom: '20px' }}>
        <div className="section-label">
          <span className="section-label-text mono">Try asking</span>
          <div className="section-label-line" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SUGGESTED.map((q, i) => (
            <button
              key={i}
              className="filter-chip"
              disabled
              style={{ cursor: 'not-allowed', opacity: 0.7 }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="chat-area" role="log" aria-label="Conversation">
        {MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble-row ${msg.role}`}
          >
            <div className={`chat-avatar ${msg.role}`} aria-hidden="true">
              {msg.role === 'bot' ? 'آ' : 'You'}
            </div>
            <div>
              <div className={`chat-bubble ${msg.role}`}>
                {msg.text}
              </div>
              <p className="chat-bubble-meta" style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="chat-input-bar">
        <input
          className="chat-input"
          type="text"
          placeholder="Ask about rights, laws, elections… (coming soon)"
          disabled
          aria-label="Chat input — coming soon"
          id="chat-input-field"
        />
        <button
          className="chat-send-btn"
          disabled
          aria-label="Send message"
          id="chat-send-btn"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="2" y="8" width="12" height="2" fill="currentColor"/>
            <rect x="11" y="5" width="2" height="2" fill="currentColor"/>
            <rect x="13" y="7" width="2" height="4" fill="currentColor"/>
            <rect x="11" y="11" width="2" height="2" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <p className="chat-coming-soon">
        🔒 AI responses are coming soon. This is a preview.
      </p>
    </div>
  )
}
