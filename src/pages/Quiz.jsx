import { useState } from 'react'

const QUIZ = {
  title: 'Pakistan Civics Basics',
  totalQuestions: 5,
  question: {
    number: 1,
    text: 'Under which article of the Constitution of Pakistan is the right to education guaranteed?',
    options: [
      { letter: 'A', text: 'Article 17 — Freedom of Association' },
      { letter: 'B', text: 'Article 25-A — Right to Education' },
      { letter: 'C', text: 'Article 19 — Freedom of Speech' },
      { letter: 'D', text: 'Article 9 — Security of Person' },
    ],
  },
}

export default function Quiz() {
  const [selected, setSelected] = useState(null)
  const [started, setStarted] = useState(false)

  const progress = started ? (1 / QUIZ.totalQuestions) * 100 : 0

  return (
    <div className="quiz-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">Test Yourself</p>
        <h1 className="page-title">
          Civic <span className="page-title-accent">Quiz</span>
        </h1>
        <p className="page-sub">5 questions. How well do you know your rights?</p>
      </div>

      {/* Progress */}
      <div className="quiz-progress-bar-wrap">
        <div className="quiz-progress-label">
          <span>Progress</span>
          <span>{started ? `1 / ${QUIZ.totalQuestions}` : `0 / ${QUIZ.totalQuestions}`}</span>
        </div>
        <div className="quiz-progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="quiz-question-card" id="quiz-question-card">
        <p className="quiz-q-number">Question {QUIZ.question.number} of {QUIZ.totalQuestions}</p>
        <p className="quiz-question">{QUIZ.question.text}</p>

        <div className="quiz-options" role="group" aria-label="Answer options">
          {QUIZ.question.options.map((opt) => (
            <button
              key={opt.letter}
              id={`quiz-option-${opt.letter.toLowerCase()}`}
              className="quiz-option"
              disabled={!started}
              aria-pressed={selected === opt.letter}
              onClick={() => setSelected(opt.letter)}
              style={
                selected === opt.letter
                  ? { background: 'var(--mint)', fontWeight: 700, boxShadow: 'var(--shadow)' }
                  : {}
              }
            >
              <span className="quiz-option-letter">{opt.letter}</span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Start / Next CTA */}
      {!started ? (
        <button
          id="quiz-start-btn"
          className="quiz-start-btn"
          onClick={() => setStarted(true)}
        >
          Start Quiz ▶
        </button>
      ) : (
        <button
          id="quiz-next-btn"
          className="quiz-start-btn"
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.4 }}
        >
          Next Question →
        </button>
      )}

      {!started && (
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--ink-muted)',
            marginTop: '14px',
            letterSpacing: '0.04em',
          }}
        >
          Press Start to unlock questions · More quizzes coming soon
        </p>
      )}

      <div style={{ paddingBottom: '24px' }} />
    </div>
  )
}
