import { useState } from 'react'

const FILTERS = ['All', 'Rights', 'Government', 'Elections', 'Law', 'Budget']

const ARTICLES = [
  {
    id: 1,
    emoji: '🗳️',
    bg: '#ff2d7a',
    tag: 'Elections',
    title: 'How to Register as a Voter — Step by Step',
    excerpt: 'Turning 18 soon? Here\'s everything you need to know about getting on the voters list — NADRA, NICOP, and what to do if your address changed.',
    readTime: '3 min read',
    filter: 'Elections',
  },
  {
    id: 2,
    emoji: '⚖️',
    bg: '#ff6b47',
    tag: 'Rights',
    title: "Your Fundamental Rights — Explained Like You're 17",
    excerpt: "The Constitution gives you rights you've probably never heard of. Article 9 to 28 broken down — no law school required.",
    readTime: '5 min read',
    filter: 'Rights',
  },
  {
    id: 3,
    emoji: '🏛️',
    bg: '#ff9c2a',
    tag: 'Government',
    title: 'National Assembly vs Senate — What\'s the Difference?',
    excerpt: 'Two houses, one parliament. Why do we need both? Who has more power? And why does it matter for you? Let\'s break it down.',
    readTime: '4 min read',
    filter: 'Government',
  },
  {
    id: 4,
    emoji: '📋',
    bg: '#3df5b4',
    tag: 'Law',
    title: 'Right to Information — Your Secret Weapon',
    excerpt: 'RTI laws let you demand answers from the government. Like, actually. Here\'s how to file an RTI and what you can ask for.',
    readTime: '3 min read',
    filter: 'Law',
  },
  {
    id: 5,
    emoji: '💰',
    bg: '#c4a8ff',
    tag: 'Budget',
    title: "Pakistan's Federal Budget — Where Does Your Tax Money Go?",
    excerpt: 'The budget is just the government\'s spending plan. But whose priorities are in it? And how does it actually affect your life?',
    readTime: '6 min read',
    filter: 'Budget',
  },
]

export default function Learn() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.filter === activeFilter)

  return (
    <div className="learn-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">Explainers</p>
        <h1 className="page-title">
          Explain Like I'm <span className="page-title-accent">GenZ</span>
        </h1>
        <p className="page-sub">Heavy civic topics — made actually understandable.</p>
      </div>

      {/* Filter chips */}
      <div className="filter-chips" role="group" aria-label="Filter articles">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-chip${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
            aria-pressed={activeFilter === f}
            id={`filter-${f.toLowerCase()}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Article list */}
      <div className="article-list" role="list">
        {filtered.map((article, i) => (
          <article
            key={article.id}
            className="article-card anim-fade-up"
            style={{ animationDelay: `${i * 0.07}s` }}
            role="listitem"
            tabIndex={0}
            aria-label={article.title}
            id={`article-${article.id}`}
          >
            <div
              className="article-thumb"
              style={{ background: article.bg }}
              aria-hidden="true"
            >
              {article.emoji}
            </div>
            <div className="article-body">
              <span className="article-tag">{article.tag}</span>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-excerpt">{article.excerpt}</p>
              <span className="article-read-more">
                Read → &nbsp;
                <span style={{ opacity: 0.5, fontWeight: 400 }}>{article.readTime}</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      <div style={{ padding: '32px 0 16px', textAlign: 'center' }}>
        <span className="coming-soon-chip">✍️ More articles coming soon</span>
      </div>
    </div>
  )
}
