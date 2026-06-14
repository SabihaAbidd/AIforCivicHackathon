import { useEffect, useState } from 'react'
import { LEARN_FILTERS, LEARN_TOPICS } from '../data/learnTopics.js'

function getFallbackExplanation(topic, language) {
  if (!topic) return null

  const key = language === 'roman-urdu' ? 'romanUrdu' : 'english'
  return topic.fallback?.[key] ?? topic.fallback?.english ?? null
}

function getSourceLabel(source) {
  return source === 'ai' ? 'Response source: AI' : 'Response source: fallback'
}

async function fetchTopicExplanation(topicId, language) {
  try {
    const response = await fetch('/api/explain-topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId, language }),
    })

    if (!response.ok) {
      throw new Error(`Explain topic request failed with status ${response.status}`)
    }

    const data = await response.json()

    console.info('Learn /api/explain-topic response', {
      ok: response.ok,
      topicId,
      language,
      source: data?.source ?? 'unknown',
      reason: data?.reason ?? null,
      hasExplanation: Boolean(data?.explanation),
    })

    if (data?.explanation) {
      return {
        explanation: data.explanation,
        source: data?.source === 'ai' ? 'ai' : 'fallback',
      }
    }
  } catch (error) {
    console.error('Explain topic request failed:', {
      topicId,
      language,
      message: error instanceof Error ? error.message : String(error),
    })
  }

  return null
}

export default function Learn() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [loadingExplanation, setLoadingExplanation] = useState(false)
  const [explanation, setExplanation] = useState(null)
  const [responseSource, setResponseSource] = useState(null)
  const [explanationLanguage, setExplanationLanguage] = useState('english')

  const filtered =
    activeFilter === 'All'
      ? LEARN_TOPICS
      : LEARN_TOPICS.filter((topic) => topic.filter === activeFilter)

  useEffect(() => {
    if (!selectedTopic) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeTopicModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedTopic])

  function openTopicModal(topic) {
    setSelectedTopic(topic)
    setExplanation(null)
    setResponseSource(null)
    setExplanationLanguage('english')
    setLoadingExplanation(false)
  }

  function closeTopicModal() {
    setSelectedTopic(null)
    setExplanation(null)
    setResponseSource(null)
    setExplanationLanguage('english')
    setLoadingExplanation(false)
  }

  async function handleExplainTopic(language) {
    if (!selectedTopic) return

    setLoadingExplanation(true)
    setExplanationLanguage(language)

    const result = await fetchTopicExplanation(selectedTopic.id, language)

    if (result?.explanation) {
      setExplanation(result.explanation)
      setResponseSource(result.source)
    } else {
      setExplanation(getFallbackExplanation(selectedTopic, language))
      setResponseSource('fallback')
    }

    setLoadingExplanation(false)
  }

  return (
    <div className="learn-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">Explainers</p>
        <h1 className="page-title">
          Explain Like I&apos;m <span className="page-title-accent">GenZ</span>
        </h1>
        <p className="page-sub">Heavy civic topics made actually understandable.</p>
      </div>

      <div className="filter-chips" role="group" aria-label="Filter articles">
        {LEARN_FILTERS.map((filterName) => (
          <button
            key={filterName}
            className={`filter-chip${activeFilter === filterName ? ' active' : ''}`}
            onClick={() => setActiveFilter(filterName)}
            aria-pressed={activeFilter === filterName}
            id={`filter-${filterName.toLowerCase()}`}
          >
            {filterName}
          </button>
        ))}
      </div>

      <div className="article-list" role="list">
        {filtered.map((article, index) => (
          <article
            key={article.id}
            className="article-card anim-fade-up"
            style={{ animationDelay: `${index * 0.07}s` }}
            role="listitem"
            tabIndex={0}
            aria-label={article.title}
            id={`article-${article.id}`}
            onClick={() => openTopicModal(article)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openTopicModal(article)
              }
            }}
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
                Read more → &nbsp;
                <span style={{ opacity: 0.5, fontWeight: 400 }}>{article.readTime}</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      <div style={{ padding: '32px 0 16px', textAlign: 'center' }}>
        <span className="coming-soon-chip">More topics coming soon</span>
      </div>

      {selectedTopic && (
        <div className="learn-modal-overlay" onClick={closeTopicModal} role="presentation">
          <div
            className="learn-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="learn-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="learn-modal-close"
              onClick={closeTopicModal}
              aria-label="Close topic details"
            >
              ×
            </button>

            <div className="learn-modal-header">
              <div className="learn-modal-badge-row">
                <span className="article-tag">{selectedTopic.category}</span>
                <span className="learn-modal-readtime">{selectedTopic.readTime}</span>
              </div>
              <h2 className="learn-modal-title" id="learn-modal-title">
                {selectedTopic.title}
              </h2>
              <p className="learn-modal-summary">{selectedTopic.summary}</p>
            </div>

            <div className="learn-modal-actions">
              <button
                type="button"
                className="learn-explain-btn learn-explain-btn-primary"
                onClick={() => handleExplainTopic('english')}
                disabled={loadingExplanation}
              >
                Explain Like I&apos;m GenZ
              </button>
              <button
                type="button"
                className="learn-explain-btn learn-explain-btn-secondary"
                onClick={() => handleExplainTopic('roman-urdu')}
                disabled={loadingExplanation}
              >
                Explain in Roman Urdu
              </button>
            </div>

            <div className="learn-explanation-panel">
              {loadingExplanation && (
                <div className="learn-explanation-state">
                  <p className="learn-explanation-loading">Awaaz is simplifying this…</p>
                </div>
              )}

              {!loadingExplanation && !explanation && (
                <div className="learn-explanation-state">
                  <p className="learn-explanation-placeholder">
                    Pick one of the explanation buttons above to open a simpler version of this topic.
                  </p>
                </div>
              )}

              {!loadingExplanation && explanation && (
                <>
                  <p className="learn-response-source">{getSourceLabel(responseSource)}</p>

                  <div className="learn-explanation-grid">
                    <div className="learn-explanation-block">
                      <p className="learn-explanation-label">Simple explanation</p>
                      <p className="learn-explanation-text">{explanation.simpleExplanation}</p>
                    </div>
                    <div className="learn-explanation-block">
                      <p className="learn-explanation-label">Why it matters</p>
                      <p className="learn-explanation-text">{explanation.whyItMatters}</p>
                    </div>
                    <div className="learn-explanation-block">
                      <p className="learn-explanation-label">Real-life example</p>
                      <p className="learn-explanation-text">{explanation.realLifeExample}</p>
                    </div>
                    <div className="learn-explanation-block">
                      <p className="learn-explanation-label">One small action</p>
                      <p className="learn-explanation-text">{explanation.oneSmallAction}</p>
                    </div>
                  </div>

                  <p className="learn-response-language">
                    {explanationLanguage === 'roman-urdu'
                      ? 'Language: Pakistani Roman Urdu'
                      : 'Language: English'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
