import { useEffect, useRef, useState } from 'react'

const PREDEFINED_QA = [
  {
    id: 'fundamental-rights',
    question: 'What are my fundamental rights?',
    answer:
      'Your fundamental rights are the basic freedoms the Constitution protects, like equality, freedom of speech, religion, education, and fair treatment under law. Simple version: these rights help protect your dignity and voice. Roman Urdu: bunyadi huqooq woh huqooq hain jo aap ko izzat, azaadi aur insaaf dete hain.',
  },
  {
    id: 'national-assembly',
    question: 'How does the National Assembly work?',
    answer:
      'The National Assembly is where elected representatives make laws, debate national issues, and hold the government accountable. Members discuss bills, vote on them, and question ministers. Roman Urdu: yeh mulk ki bari qanoon saaz assembly hai jahan awami numayanday faislay karte hain.',
  },
  {
    id: 'rti-law',
    question: 'What is RTI law?',
    answer:
      'RTI means Right to Information. It helps citizens ask public bodies for official information, so government work becomes more transparent. Youth-friendly takeaway: if public institutions serve people, people should be able to ask questions. Roman Urdu: RTI aap ko maloomat maangne ka haq deta hai.',
  },
  {
    id: 'voting',
    question: 'Why should young people care about voting?',
    answer:
      'Voting shapes decisions about education, jobs, transport, safety, and digital freedoms. If young people stay out, others make choices for them. Roman Urdu: vote dena sirf siyasat nahin, apne mustaqbil par asar dalna hai.',
  },
  {
    id: 'girls-civic-life',
    question: 'How can girls participate in civic life safely?',
    answer:
      'Girls can participate by joining school councils, community groups, awareness campaigns, and verified online discussions while protecting privacy, setting boundaries, and staying connected with trusted people. Safe civic participation should always respect dignity and security. Roman Urdu: hifazat ke sath awaaz uthana bhi civic participation ka hissa hai.',
  },
  {
    id: 'misinformation',
    question: 'What is misinformation?',
    answer:
      'Misinformation is false or misleading information shared as if it were true, sometimes by mistake and sometimes carelessly. Before forwarding a post, check the source, date, and evidence. Roman Urdu: har viral cheez sach nahin hoti, is liye verify karna zaroori hai.',
  },
]

const GENERIC_RESPONSE =
  'That is an important civic question. Simple explanation: civic awareness means understanding how rights, public institutions, and information affect daily life. Why it matters: informed citizens can ask better questions and participate more confidently. Roman Urdu: civic cheezon ko samajhna aap ko apni awaaz behtar tareeqay se istemal karne mein madad deta hai. One small action: ask your question again with a little more detail, like whether you mean voting, rights, misinformation, or government process.'

function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

function normalizeQuestion(text) {
  return text.toLowerCase().replace(/[?.,!]/g, '').replace(/\s+/g, ' ').trim()
}

const QA_LOOKUP = Object.fromEntries(
  PREDEFINED_QA.map((item) => [normalizeQuestion(item.question), item.answer]),
)

function findResponse(text) {
  return QA_LOOKUP[normalizeQuestion(text)] || GENERIC_RESPONSE
}

async function requestChatReply(question) {
  const trimmed = question.trim()

  if (!trimmed) {
    return {
      reply: findResponse(''),
      source: 'mock',
      reason: 'empty_message',
    }
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: trimmed }),
    })

    if (!response.ok) {
      throw new Error(`Chat request failed with status ${response.status}`)
    }

    const data = await response.json()

    console.info('Ask Awaaz /api/chat response', {
      ok: response.ok,
      source: data?.source ?? 'unknown',
      reason: data?.reason ?? null,
    })

    if (typeof data?.reply === 'string' && data.reply.trim()) {
      return {
        reply: data.reply.trim(),
        source: data?.source ?? 'unknown',
        reason: data?.reason ?? null,
      }
    }
  } catch (error) {
    console.error('Ask Awaaz request failed:', {
      message: error instanceof Error ? error.message : String(error),
    })
  }

  return {
    reply: findResponse(trimmed),
    source: 'mock',
    reason: 'client_fallback',
  }
}

export default function AskAwaaz() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Salam! I'm Awaaz, your civic guide. Ask me about rights, voting, laws, government, or misinformation in simple language.",
      time: formatTime(),
      source: 'system',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const nextIdRef = useRef(2)
  const logRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function submitQuestion(question) {
    const trimmed = question.trim()
    if (!trimmed || isTyping) return

    const userMessage = {
      id: nextIdRef.current++,
      role: 'user',
      text: trimmed,
      time: formatTime(),
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsTyping(true)

    timeoutRef.current = setTimeout(async () => {
      const result = await requestChatReply(trimmed)
      const botMessage = {
        id: nextIdRef.current++,
        role: 'bot',
        text: result.reply,
        time: formatTime(),
        source: result.source,
      }
      setMessages((current) => [...current, botMessage])
      setIsTyping(false)
    }, 650)
  }

  function handleSubmit(event) {
    event.preventDefault()
    submitQuestion(input)
  }

  return (
    <div className="chat-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">AI Civic Guide</p>
        <h1 className="page-title">
          Ask <span className="page-title-accent">Awaaz</span>
        </h1>
        <p className="page-sub">Ask civic questions in English or Roman Urdu.</p>
        <div style={{ marginTop: '10px' }}>
          <span className="coming-soon-chip">Groq AI + Mock Fallback</span>
        </div>
      </div>

      <div className="chat-suggested">
        <div className="section-label">
          <span className="section-label-text mono">Try asking</span>
          <div className="section-label-line" />
        </div>
        <div className="chat-suggested-grid">
          {PREDEFINED_QA.map((item) => (
            <button
              key={item.id}
              className="chat-suggestion-btn"
              type="button"
              onClick={() => submitQuestion(item.question)}
              disabled={isTyping}
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>

      <div ref={logRef} className="chat-area" role="log" aria-label="Conversation">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble-row ${msg.role}`}>
            <div className={`chat-avatar ${msg.role}`} aria-hidden="true">
              {msg.role === 'bot' ? 'آ' : 'You'}
            </div>
            <div>
              <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
              <p className="chat-bubble-meta" style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.time}
                {msg.role === 'bot' && msg.source === 'groq' ? ' · Groq' : ''}
                {msg.role === 'bot' && msg.source === 'mock' ? ' · Fallback' : ''}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble-row bot">
            <div className="chat-avatar bot" aria-hidden="true">آ</div>
            <div>
              <div className="chat-bubble bot chat-bubble-typing" aria-label="Awaaz is typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form className="chat-input-bar" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          type="text"
          placeholder="Ask about rights, voting, RTI, or misinformation..."
          aria-label="Chat input"
          id="chat-input-field"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isTyping}
        />
        <button
          className="chat-send-btn"
          aria-label="Send message"
          id="chat-send-btn"
          type="submit"
          disabled={isTyping || !input.trim()}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="2" y="8" width="12" height="2" fill="currentColor" />
            <rect x="11" y="5" width="2" height="2" fill="currentColor" />
            <rect x="13" y="7" width="2" height="4" fill="currentColor" />
            <rect x="11" y="11" width="2" height="2" fill="currentColor" />
          </svg>
        </button>
      </form>

      <p className="chat-coming-soon">
        Live AI uses the Groq-backed `/api/chat` route, with safe mocked fallback if the key is missing or the request fails.
      </p>
    </div>
  )
}
