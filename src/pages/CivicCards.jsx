import { useEffect, useMemo, useState } from 'react'

const SAVED_CARDS_KEY = 'awaaz-saved-civic-cards'

const CATEGORY_FILTERS = ['All', 'Voting', 'Rights', 'Government', 'Misinformation', 'Participation']

const CIVIC_CARDS = [
  {
    id: 'youth-majority',
    bg: '#ff9c2a',
    accent: '#ffd23f',
    num: '72%',
    title: 'Young people are the majority',
    fact: "About 72% of Pakistan's population is under 35.",
    whyItMatters: 'Youth issues are not a side topic. They shape the country’s biggest public decisions.',
    category: 'Participation',
    source: 'Pakistan Bureau of Statistics',
  },
  {
    id: 'voting-age',
    bg: '#ff2d7a',
    accent: '#ffc1dc',
    num: '18',
    title: 'Voting starts at 18',
    fact: 'The minimum voting age in Pakistan is 18.',
    whyItMatters: 'Your first vote can affect education, jobs, transport, and public services.',
    category: 'Voting',
    source: 'Election rules',
  },
  {
    id: 'national-assembly-seats',
    bg: '#c4a8ff',
    accent: '#efe4ff',
    num: '342',
    title: 'National Assembly seats',
    fact: 'The National Assembly has 342 seats in total.',
    whyItMatters: 'These seats decide who represents people at the federal level and helps make laws.',
    category: 'Government',
    source: 'Parliament of Pakistan',
  },
  {
    id: 'constitution-year',
    bg: '#3df5b4',
    accent: '#d7fff0',
    num: '1973',
    title: 'The Constitution matters',
    fact: "Pakistan's current Constitution was adopted in 1973.",
    whyItMatters: 'It sets the rules for rights, government powers, and how the state should function.',
    category: 'Rights',
    source: 'Constitution of Pakistan',
  },
  {
    id: 'article-25',
    bg: '#ff6b47',
    accent: '#ffd5ca',
    num: '25',
    title: 'Equality before law',
    fact: 'Article 25 says all citizens are equal before the law.',
    whyItMatters: 'Equal treatment is a basic standard for fairness, justice, and public trust.',
    category: 'Rights',
    source: 'Constitution of Pakistan',
  },
  {
    id: 'senate-members',
    bg: '#7dbb8a',
    accent: '#dff0e3',
    num: '96',
    title: 'Senate representation',
    fact: 'The Senate has 96 members and gives provinces equal representation.',
    whyItMatters: 'It helps smaller provinces keep a voice in federal lawmaking.',
    category: 'Government',
    source: 'Parliament of Pakistan',
  },
  {
    id: 'verify-before-share',
    bg: '#ffd23f',
    accent: '#fff2b0',
    num: '3',
    title: 'Pause before sharing',
    fact: 'Check 3 things before forwarding: source, date, and original context.',
    whyItMatters: 'A viral post can spread confusion long before facts catch up.',
    category: 'Misinformation',
    source: 'Digital literacy best practice',
  },
  {
    id: 'local-government',
    bg: '#9fd0ff',
    accent: '#e1f1ff',
    num: 'Local',
    title: 'Closest level to daily life',
    fact: 'Local government often affects roads, sanitation, streetlights, and community issues.',
    whyItMatters: 'Some of the most annoying daily problems are local governance issues, not national ones.',
    category: 'Government',
    source: 'Local governance basics',
  },
  {
    id: 'peaceful-participation',
    bg: '#ff8fab',
    accent: '#ffd7e2',
    num: '1',
    title: 'Small action still counts',
    fact: 'Civic participation is not only voting. Asking questions and joining community efforts also count.',
    whyItMatters: 'You do not need a big platform to take part in public life.',
    category: 'Participation',
    source: 'Civic participation basics',
  },
]

function readSavedCards() {
  if (typeof window === 'undefined') return []

  try {
    const stored = window.localStorage.getItem(SAVED_CARDS_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

function writeSavedCards(savedCards) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(savedCards))
  } catch {
    // Ignore local storage failures to keep the page usable.
  }
}

function buildShareText(card) {
  return `${card.title}\n\n${card.fact}\nWhy it matters: ${card.whyItMatters}\nCategory: ${card.category}\n\nShared from Awaaz-e-GenZ Civic Cards`
}

export default function CivicCards() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [savedCards, setSavedCards] = useState([])
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    setSavedCards(readSavedCards())
  }, [])

  useEffect(() => {
    if (!toastMessage) return undefined

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  const filteredCards = useMemo(() => {
    if (activeFilter === 'All') return CIVIC_CARDS
    return CIVIC_CARDS.filter((card) => card.category === activeFilter)
  }, [activeFilter])

  const featuredCard = filteredCards[0] ?? CIVIC_CARDS[0]
  const archiveCards = filteredCards.slice(1)
  const savedCount = savedCards.length

  function showToast(message) {
    setToastMessage(message)
  }

  function isSaved(cardId) {
    return savedCards.includes(cardId)
  }

  function handleSaveCard(cardId) {
    if (isSaved(cardId)) {
      showToast('Card already saved in your civic streak.')
      return
    }

    const nextSavedCards = [...savedCards, cardId]
    setSavedCards(nextSavedCards)
    writeSavedCards(nextSavedCards)
    showToast('Card saved for your civic streak.')
  }

  async function handleShareCard(card) {
    const shareText = buildShareText(card)

    try {
      if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: `${card.fact} Why it matters: ${card.whyItMatters}`,
        })
        showToast('Card ready to share.')
        return
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
    }

    try {
      await navigator.clipboard.writeText(shareText)
      showToast('Card copied — ready to share.')
    } catch {
      showToast('Sharing is not available right now.')
    }
  }

  function renderCardActions(card) {
    const saved = isSaved(card.id)

    return (
      <div className="civic-card-actions">
        <button
          type="button"
          className={`civic-card-btn civic-card-btn-save${saved ? ' is-saved' : ''}`}
          onClick={() => handleSaveCard(card.id)}
        >
          {saved ? 'Saved' : 'Save Card'}
        </button>
        <button
          type="button"
          className="civic-card-btn civic-card-btn-share"
          onClick={() => handleShareCard(card)}
        >
          Share Card
        </button>
      </div>
    )
  }

  return (
    <div className="cards-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">Daily Drop</p>
        <h1 className="page-title">
          Civic <span className="page-title-accent">Cards</span>
        </h1>
        <p className="page-sub">Bite-sized civic facts made to save, share, and actually remember.</p>
      </div>

      <div className="cards-toolbar">
        <div className="cards-saved-count">
          <span className="cards-saved-count-label">Saved cards</span>
          <span className="cards-saved-count-value">{savedCount}</span>
        </div>

        <div className="filter-chips" role="group" aria-label="Filter civic cards">
          {CATEGORY_FILTERS.map((filterName) => (
            <button
              key={filterName}
              type="button"
              className={`filter-chip${activeFilter === filterName ? ' active' : ''}`}
              onClick={() => setActiveFilter(filterName)}
              aria-pressed={activeFilter === filterName}
            >
              {filterName}
            </button>
          ))}
        </div>
      </div>

      <section aria-labelledby="todays-card">
        <div className="section-label">
          <span className="section-label-text mono" id="todays-card">Featured Card</span>
          <div className="section-label-line" />
        </div>

        <div
          className={`daily-card-featured civic-share-card${isSaved(featuredCard.id) ? ' is-saved' : ''}`}
          id="featured-civic-card"
          style={{ background: featuredCard.bg }}
        >
          <div className="daily-card-topline">
            <p className="daily-card-date">{featuredCard.source}</p>
            <span className="civic-card-category">{featuredCard.category}</span>
          </div>
          <div className="daily-card-stat">{featuredCard.num}</div>
          <p className="daily-card-fact">
            {featuredCard.fact} <strong>{featuredCard.title}.</strong>
          </p>
          <p className="civic-card-why">Why it matters: {featuredCard.whyItMatters}</p>
          {renderCardActions(featuredCard)}
        </div>
      </section>

      <section aria-labelledby="past-cards-heading" style={{ paddingBottom: '32px' }}>
        <div className="section-label">
          <span className="section-label-text mono" id="past-cards-heading">More Cards</span>
          <div className="section-label-line" />
        </div>

        <div className="past-cards-grid">
          {archiveCards.map((card, index) => (
            <div
              key={card.id}
              className={`past-card civic-share-card anim-fade-up${isSaved(card.id) ? ' is-saved' : ''}`}
              style={{
                background: card.bg,
                animationDelay: `${index * 0.06}s`,
              }}
              tabIndex={0}
              role="article"
              aria-label={`Civic card: ${card.fact}`}
              id={`past-card-${card.id}`}
            >
              <div className="past-card-meta">
                <span className="civic-card-category">{card.category}</span>
                <span className="past-card-date">{card.source}</span>
              </div>
              <div className="past-card-num">{card.num}</div>
              <p className="past-card-fact">{card.fact}</p>
              <p className="civic-card-why">{card.whyItMatters}</p>
              {renderCardActions(card)}
            </div>
          ))}
        </div>
      </section>

      <div style={{ paddingBottom: '16px', textAlign: 'center' }}>
        <span className="coming-soon-chip">Daily cards are now saveable and shareable</span>
      </div>

      {toastMessage && (
        <div className="cards-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
