import { useNavigate } from 'react-router-dom'
import { IconAsk, IconExplain, IconCards, IconQuiz, IconArrow } from '../Icons.jsx'

/* ─────────────────────────────────────────
   HERO ILLUSTRATIONS (inline SVG)
───────────────────────────────────────── */
function MegaphoneIllus() {
  return (
    <svg className="collage-illus collage-megaphone" width="168" height="126" viewBox="0 0 168 126" fill="none" aria-hidden="true">
      <defs>
        <pattern id="megaHalftone" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="0.9" fill="#0d0d0d" opacity="0.45" />
        </pattern>
        <filter id="megaRough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
        </filter>
      </defs>
      <g className="sticker-cutout" filter="url(#megaRough)">
        <path className="sticker-outline" d="M31 49L65 43L132 16C145 11 154 18 154 31L153 77C153 90 143 97 131 91L66 66L50 68L54 98C56 111 48 119 35 119H25C16 119 10 113 10 104L8 76C2 73 0 67 2 61C4 54 11 50 20 50L31 49Z" />
        <path d="M35 51L66 46L132 20C141 17 149 22 149 32L148 77C148 86 141 91 132 87L66 62L36 64Z" fill="#f7f4ee" stroke="#0d0d0d" strokeWidth="4" strokeLinejoin="round" />
        <path d="M67 46L132 20C141 17 149 22 149 32L148 77C148 86 141 91 132 87L67 62Z" fill="url(#megaHalftone)" opacity="0.75" />
        <path d="M83 40L130 21C140 18 148 23 149 33L148 76C148 83 143 88 136 88C130 64 109 47 83 40Z" fill="#0d0d0d" opacity="0.92" />
        <path d="M35 51L66 46V62L36 64Z" fill="#0d0d0d" stroke="#0d0d0d" strokeWidth="4" strokeLinejoin="round" />
        <path d="M16 54H37V77H17C10 77 6 72 6 66C6 59 10 54 16 54Z" fill="#f7f4ee" stroke="#0d0d0d" strokeWidth="4" />
        <path d="M21 78H49L53 101C55 110 49 115 40 115H30C23 115 19 111 18 104Z" fill="#0d0d0d" stroke="#0d0d0d" strokeWidth="4" strokeLinejoin="round" />
        <path d="M25 82H42L45 102" stroke="#f7f4ee" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        <path d="M135 29C141 38 141 69 134 81" stroke="#f7f4ee" strokeWidth="3" strokeLinecap="round" opacity="0.82" />
      </g>
      <path d="M38 26L31 14" stroke="#f7f4ee" strokeWidth="5" strokeLinecap="round" />
      <path d="M56 22L56 8" stroke="#f7f4ee" strokeWidth="5" strokeLinecap="round" />
      <path d="M151 23L162 13" stroke="#f7f4ee" strokeWidth="5" strokeLinecap="round" />
      <path d="M155 47L166 44" stroke="#f7f4ee" strokeWidth="5" strokeLinecap="round" />
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
    <svg className="collage-illus collage-hand" width="90" height="100" viewBox="0 0 90 100" fill="none" aria-hidden="true" style={{ transform: 'rotate(10deg)', transformOrigin: 'bottom right' }}>
      <g stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" fill="white">
        {/* Palm & Fingers */}
        <path d="M25 80 C 10 70, 5 50, 15 40 C 25 30, 30 40, 30 45 L 30 20 C 30 10, 45 10, 45 20 L 45 40 L 45 15 C 45 5, 60 5, 60 15 L 60 40 L 60 25 C 60 15, 75 15, 75 25 L 75 65 C 75 80, 65 80, 65 80 L 25 80 Z" />
        {/* Cuff */}
        <path d="M20 80 L 70 80 C 75 80, 80 85, 80 100 L 10 100 C 10 85, 15 80, 20 80 Z" />
        {/* Cuff lines */}
        <line x1="30" y1="80" x2="30" y2="100" />
        <line x1="45" y1="80" x2="45" y2="100" />
        <line x1="60" y1="80" x2="60" y2="100" />
        {/* Inner finger lines */}
        <line x1="30" y1="45" x2="30" y2="60" />
        <line x1="45" y1="40" x2="45" y2="60" />
        <line x1="60" y1="40" x2="60" y2="60" />
      </g>
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
            <span className="doodle doodle-star-left" aria-hidden="true">*</span>
            <span className="doodle doodle-pop-left" aria-hidden="true" />
            <span className="doodle doodle-pop-right" aria-hidden="true" />
            <span className="doodle doodle-swoop" aria-hidden="true" />

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
          <span className="collage-doodle collage-lines-top" />
          <span className="collage-doodle collage-lines-right" />
          <span className="collage-doodle collage-loop" />
          <span className="collage-doodle collage-spark" />

          {/* Pink — آواز card */}
          <div className="collage-card collage-pink">
            <span className="card-halftone card-halftone-pink" />
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
              <span className="card-halftone card-halftone-orange" />
              <ShieldIcon />
              <p className="collage-small-title">KNOW<br />YOUR<br />RIGHTS</p>
              <p className="collage-support">Learn the laws. Know your power.</p>
              <span className="collage-arrow">→</span>
            </div>

            <div className="collage-card collage-mint">
              <span className="card-halftone card-halftone-mint" />
              <CalendarIcon />
              <p className="collage-small-title">DAILY<br />CIVIC<br />DROPS</p>
              <p className="collage-support">Short. Simple. Super useful.</p>
              <span className="collage-arrow">→</span>
            </div>
          </div>

          {/* Lavender — Be Heard */}
          <div className="collage-card collage-lavender">
            <span className="card-halftone card-halftone-lavender" />
            <div>
              <p className="collage-be-heard">BE HEARD</p>
              <p className="collage-sub collage-sub-dark">Share. Speak up. Create change.</p>
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
