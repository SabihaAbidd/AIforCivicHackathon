import { useNavigate } from 'react-router-dom'
import { IconAsk, IconExplain, IconCards, IconQuiz, IconArrow } from '../Icons.jsx'

/* ─────────────────────────────────────────
   HERO ILLUSTRATIONS (inline SVG)
───────────────────────────────────────── */
function MegaphoneIllus() {
  return (
    <svg className="collage-illus" width="92" height="86" viewBox="0 0 92 86" fill="none" aria-hidden="true">
      {/* Body rectangle */}
      <rect x="4" y="30" width="22" height="22" rx="2" fill="white" stroke="rgba(245,240,232,0.35)" strokeWidth="1.5"/>
      {/* Horn / cone */}
      <path d="M26 22 L70 5 L70 57 L26 50 Z" fill="white" stroke="rgba(245,240,232,0.35)" strokeWidth="1.5"/>
      {/* Sound waves */}
      <path d="M75 19 Q83 31 75 43" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M82 13 Q91 31 82 49" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>
      {/* Bell end detail */}
      <rect x="68" y="3" width="4" height="54" rx="1" fill="white" stroke="rgba(245,240,232,0.35)" strokeWidth="1"/>
      {/* Handle / base */}
      <path d="M4 52 L26 52 L26 64 Q26 76 15 76 Q4 76 4 64 Z" fill="white" stroke="rgba(245,240,232,0.35)" strokeWidth="1.5"/>
      {/* Grip lines on handle */}
      <line x1="8" y1="60" x2="20" y2="60" stroke="rgba(245,240,232,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="66" x2="20" y2="66" stroke="rgba(245,240,232,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="28" height="33" viewBox="0 0 28 33" fill="none" aria-hidden="true">
      <path d="M14 2 L26 8.5 L26 19 Q26 29 14 32 Q2 29 2 19 L2 8.5 Z"
        fill="rgba(0,0,0,0.08)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M8 17 L12 21 L20 13"
        stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="28" height="30" viewBox="0 0 28 30" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="24" height="23" rx="3" fill="rgba(0,0,0,0.08)" stroke="var(--ink)" strokeWidth="2"/>
      <rect x="2" y="5" width="24" height="9" rx="3" fill="var(--ink)"/>
      <rect x="8" y="2" width="3" height="6" rx="1.5" fill="var(--ink)"/>
      <rect x="17" y="2" width="3" height="6" rx="1.5" fill="var(--ink)"/>
      <circle cx="8.5" cy="21" r="2" fill="var(--ink)"/>
      <circle cx="14" cy="21" r="2" fill="var(--ink)"/>
      <circle cx="19.5" cy="21" r="2" fill="var(--ink)"/>
    </svg>
  )
}

function HandIllus() {
  return (
    <svg className="collage-illus" width="72" height="90" viewBox="0 0 72 90" fill="none" aria-hidden="true">
      {/* Fingers */}
      <rect x="18" y="10" width="10" height="36" rx="5" fill="white" stroke="var(--ink)" strokeWidth="2"/>
      <rect x="29" y="4"  width="10" height="42" rx="5" fill="white" stroke="var(--ink)" strokeWidth="2"/>
      <rect x="40" y="7"  width="10" height="40" rx="5" fill="white" stroke="var(--ink)" strokeWidth="2"/>
      <rect x="51" y="14" width="9"  height="32" rx="4.5" fill="white" stroke="var(--ink)" strokeWidth="2"/>
      {/* Palm */}
      <rect x="18" y="40" width="42" height="40" rx="7" fill="white" stroke="var(--ink)" strokeWidth="2"/>
      {/* Thumb */}
      <path d="M18 58 Q5 58 5 70 Q5 82 18 82" fill="white" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
      {/* Palm texture dots */}
      <circle cx="35" cy="62" r="1.5" fill="var(--ink)" opacity="0.3"/>
      <circle cx="42" cy="62" r="1.5" fill="var(--ink)" opacity="0.3"/>
      <circle cx="35" cy="70" r="1.5" fill="var(--ink)" opacity="0.3"/>
      <circle cx="42" cy="70" r="1.5" fill="var(--ink)" opacity="0.3"/>
    </svg>
  )
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const TICKER_ITEMS = [
  { text: 'AI for Gen Z', color: 'pink' },
  { text: 'آواز اُٹھاؤ', color: 'orange' },
  { text: 'Know Your Rights', color: 'mint' },
  { text: 'Powered by AI', color: 'pink' },
  { text: 'اردو + English', color: 'orange' },
  { text: 'Daily Civic Drops', color: 'mint' },
  { text: 'Be Heard', color: 'pink' },
  { text: 'Quiz Yourself', color: 'orange' },
]

const FEATURE_CARDS = [
  {
    id: 'ask-awaaz',
    to: '/ask',
    title: 'Ask Awaaz',
    desc: 'Ask any civic question. Get real answers — no textbook boring.',
    icon: <IconAsk />,
    colorClass: 'card--pink',
  },
  {
    id: 'explain-genz',
    to: '/learn',
    title: "Explain Like I'm GenZ",
    desc: 'Heavy topics, made actually understandable. No jargon allowed.',
    icon: <IconExplain />,
    colorClass: 'card--coral',
  },
  {
    id: 'daily-cards',
    to: '/cards',
    title: 'Daily Civic Cards',
    desc: 'One bite-size civic fact. Every. Single. Day.',
    icon: <IconCards />,
    colorClass: 'card--orange',
  },
  {
    id: 'civic-quiz',
    to: '/quiz',
    title: 'Take a Civic Quiz',
    desc: 'Test your knowledge. Flex your rights. Level up.',
    icon: <IconQuiz />,
    colorClass: 'card--mint',
  },
]

const HIGHLIGHTS = [
  { num: '2',  label: 'Languages',  sub: 'Urdu & English — both, not one or the other', colorClass: 'hb--pink',     bg: '#ff2d7a' },
  { num: '4',  label: 'Features',   sub: 'Built for how Gen Z actually learns',          colorClass: '',             bg: null },
  { num: '∞',  label: 'Civic Q&As', sub: 'Powered by AI — ask anything',                colorClass: 'hb--lavender', bg: '#c4a8ff' },
]

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */
function Ticker() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {all.map((item, i) => (
          <span className="ticker-item" key={i}>
            <span className={`ticker-dot ${item.color}`} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ card, index }) {
  const navigate = useNavigate()
  return (
    <article
      className={`feature-card ${card.colorClass} anim-fade-up anim-delay-${index + 2}`}
      id={`card-${card.id}`}
      tabIndex={0}
      role="button"
      aria-label={`Go to ${card.title}`}
      onClick={() => navigate(card.to)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(card.to)}
    >
      <div className="card-icon-wrap" aria-hidden="true">{card.icon}</div>
      <h3 className="card-title">{card.title}</h3>
      <p className="card-desc">{card.desc}</p>
      <div className="card-arrow" aria-hidden="true"><IconArrow /></div>
    </article>
  )
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page-wrap">

      {/* ══════════════════════════════════════
          HERO — Two column with right collage
          ══════════════════════════════════════ */}
      <section className="hero-v2" aria-labelledby="hero-title">

        {/* ── LEFT: Text + CTAs ── */}
        <div className="hero-left">
          <p className="hero-eyebrow-v2">Civic Platform</p>

          {/* Title block */}
          <div className="hero-title-area">
            {/* Floating doodles */}
            <span className="doodle doodle-spark-tr" aria-hidden="true">✦</span>
            <span className="doodle doodle-spark-ml" aria-hidden="true">✦</span>

            <h1 id="hero-title">
              <span className="hero-awaaz">Awaaz</span>
              <div className="hero-row2">
                <span className="hero-e-badge">-e-</span>
                <span className="hero-genz-badge">GenZ</span>
              </div>
            </h1>

            {/* Squiggly decoration below */}
            <div className="doodle-squig" aria-hidden="true">
              <svg width="58" height="18" viewBox="0 0 58 18" fill="none">
                <path
                  d="M2 9 Q10 1 18 9 Q26 17 34 9 Q42 1 50 9 Q54 13 58 9"
                  stroke="#0d0d0d"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <p className="hero-tagline-v2">
            Civic awareness for the generation<br />ready to be heard.
          </p>
          <p className="hero-desc-v2">
            AI-powered civic awareness in Urdu and English.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <button
              id="hero-ask-btn"
              className="btn-primary-hero"
              type="button"
              onClick={() => navigate('/ask')}
            >
              ✦ Ask Awaaz
            </button>
            <button
              id="hero-explore-btn"
              className="btn-secondary-hero"
              type="button"
              onClick={() => navigate('/learn')}
            >
              Explore Topics →
            </button>
          </div>

          {/* Social proof */}
          <div className="hero-social-proof">
            <div className="avatar-stack" aria-label="Community members">
              <div className="avatar-item" style={{ background: '#ff2d7a' }}>AK</div>
              <div className="avatar-item" style={{ background: '#ff6b47' }}>BT</div>
              <div className="avatar-item" style={{ background: '#7dbb8a' }}>NF</div>
              <div className="avatar-count" aria-label="2000 plus users">2K+</div>
            </div>
            <p className="hero-social-text">
              Young voices are learning, asking &amp; leading change.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Card collage (desktop) ── */}
        <div className="hero-right" aria-hidden="true">

          {/* Pink — آواز card */}
          <div className="collage-card collage-pink">
            <div className="collage-pink-inner">
              <div>
                <p className="collage-urdu">آواز</p>
                <p className="collage-sub collage-sub-light">
                  YOUR VOICE.<br />YOUR COUNTRY.
                </p>
              </div>
              <MegaphoneIllus />
            </div>
          </div>

          {/* Middle row: Orange + Mint */}
          <div className="collage-mid-row">
            <div className="collage-card collage-orange">
              <ShieldIcon />
              <p className="collage-small-title">KNOW<br />YOUR<br />RIGHTS</p>
              <span className="collage-arrow">→</span>
            </div>

            <div className="collage-card collage-mint">
              <CalendarIcon />
              <p className="collage-small-title">DAILY<br />CIVIC<br />DROPS</p>
              <span className="collage-arrow">→</span>
            </div>
          </div>

          {/* Lavender — Be Heard */}
          <div className="collage-card collage-lavender">
            <div>
              <p className="collage-be-heard">BE HEARD</p>
              <p className="collage-sub collage-sub-dark">SHARE. SPEAK. IMPACT.</p>
              <span className="collage-arrow" style={{ marginTop: '8px' }}>→</span>
            </div>
            <HandIllus />
          </div>

        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── FEATURE CARDS ── */}
      <section className="cards-section" aria-labelledby="cards-heading">
        <div className="section-label">
          <span className="mono section-label-text" id="cards-heading">Features</span>
          <div className="section-label-line" aria-hidden="true" />
        </div>
        <div className="cards-grid" role="list">
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="highlights" aria-label="App highlights">
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={i}
            className={`highlight-block ${h.colorClass}`}
            style={h.bg ? { background: h.bg, border: '2px solid #0d0d0d' } : {}}
          >
            <div className="highlight-num">{h.num}</div>
            <div>
              <div className="highlight-text">{h.label}</div>
              <span className="highlight-sub">{h.sub}</span>
            </div>
            <div className="bg-label" aria-hidden="true">{h.num}</div>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="cta-inner">
          <div className="cta-inner-text">
            <p className="cta-sub">Coming Soon — Join the Waitlist</p>
            <h2 className="cta-headline" id="cta-heading">
              Your <span>voice</span> deserves to be heard.
            </h2>
          </div>
          <div className="cta-inner-action">
            <div className="cta-lang-badges">
              <span className="lang-badge">اردو</span>
              <span className="lang-badge">English</span>
            </div>
            <button
              id="cta-notify-btn"
              className="cta-btn"
              type="button"
              aria-label="Get notified when Awaaz-e-GenZ launches"
            >
              Notify Me 🔔
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
