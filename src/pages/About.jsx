import ImpactSection from '../components/ImpactSection.jsx'

const STACK = [
  '🤖 AI-Powered',
  '🇵🇰 Pakistan-Focused',
  '🌐 Urdu + English',
  '📱 Mobile-First',
  '✊ Gen Z First',
  '🆓 Free to Use',
  '⚡ Real-Time',
]

export default function About() {
  return (
    <div className="about-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">Our Story</p>
        <h1 className="page-title">
          About <span className="page-title-accent">Awaaz</span>
        </h1>
        <p className="page-sub">
          Built by young Pakistanis, for young Pakistanis.
        </p>
      </div>

      {/* Mission + Quote */}
      <div className="about-grid" style={{ marginBottom: '28px' }}>
        <div className="about-mission-block">
          <h2 className="about-mission-title">Our Mission</h2>
          <p className="about-mission-text">
            Civic knowledge in Pakistan is locked behind textbooks nobody reads,
            jargon nobody understands, and conversations nobody has.
          </p>
          <br />
          <p className="about-mission-text">
            Awaaz-e-GenZ breaks that open. We use AI to make civic awareness
            accessible, bilingual, and actually interesting for the generation
            that will shape Pakistan's next chapter.
          </p>
          <br />
          <p className="about-mission-text">
            آواز اُٹھاؤ۔ حق مانگو۔ — Raise your voice. Claim your rights.
          </p>
        </div>

        <div className="about-quote-block">
          <p className="about-quote">
            "72% of Pakistan is under 35. That's not a statistic — that's a superpower waiting to be activated."
          </p>
          <p className="about-quote-attr">— The Awaaz Team</p>
        </div>
      </div>

      {/* Impact — why it matters */}
      <ImpactSection />

      {/* Stack pills */}
      <div className="section-label">
        <span className="section-label-text mono">Built with</span>
        <div className="section-label-line" />
      </div>
      <div className="about-stack-row">
        {STACK.map((s, i) => (
          <span key={i} className="about-stack-pill">{s}</span>
        ))}
      </div>

      <div style={{ paddingBottom: '24px' }} />
    </div>
  )
}
