import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { quizSection } from '../content.js'

export default function QuizSection() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const totalQuestions = quizSection.questions.length
  const answeredCount = Object.keys(answers).length

  const score = submitted
    ? quizSection.questions.reduce((sum, q) => {
        const chosen = answers[q.id]
        if (!chosen) return sum
        const opt = q.options.find(o => o.value === chosen)
        return sum + (opt?.points || 0)
      }, 0)
    : 0

  const maxScore = quizSection.questions.reduce((sum, q) => {
    return sum + Math.max(...q.options.map(o => o.points))
  }, 0)

  const resultLevel = submitted
    ? quizSection.results.levels.slice().reverse().find(l => score >= l.minScore) || quizSection.results.levels[0]
    : null

  const reset = () => { setAnswers({}); setSubmitted(false) }

  return (
    <section id="quiz" style={{ padding: '100px 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block', background: 'var(--surface)', border: '1px solid var(--border-bright)',
              borderRadius: 100, padding: '4px 14px', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 20,
            }}>
              {quizSection.badge}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 8 }}>
              {quizSection.headline}
            </h2>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, color: 'var(--text-muted)', marginBottom: 20 }}>
              {quizSection.headlineAccent}
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              {quizSection.subheadline}
            </p>
          </div>
        </AnimatedSection>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {!submitted ? (
            <>
              {quizSection.questions.map((q, qi) => (
                <AnimatedSection key={q.id} delay={qi * 0.06}>
                  <div style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', padding: 28, marginBottom: 20,
                  }}>
                    <p style={{ fontWeight: 600, marginBottom: 18, lineHeight: 1.5, fontSize: '0.95rem' }}>
                      {q.label}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt.value
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setAnswers(p => ({ ...p, [q.id]: opt.value }))}
                            style={{
                              display: 'block', width: '100%', textAlign: 'left',
                              padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                              background: selected ? 'rgba(74,222,128,0.08)' : 'var(--bg)',
                              border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                              color: selected ? 'var(--accent)' : 'var(--text)',
                              fontFamily: 'var(--font-body)', fontSize: '0.9rem', cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={0.3}>
                <div style={{ textAlign: 'center', marginTop: 12 }}>
                  <button
                    onClick={() => answeredCount === totalQuestions && setSubmitted(true)}
                    disabled={answeredCount < totalQuestions}
                    style={{
                      background: answeredCount === totalQuestions ? 'var(--accent)' : 'var(--surface)',
                      color: answeredCount === totalQuestions ? 'var(--bg)' : 'var(--text-muted)',
                      border: 'none', borderRadius: 100, padding: '14px 36px',
                      fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                      cursor: answeredCount === totalQuestions ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s',
                    }}
                  >
                    {answeredCount < totalQuestions
                      ? `Answer all questions (${answeredCount}/${totalQuestions})`
                      : 'See Results →'}
                  </button>
                </div>
              </AnimatedSection>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border-bright)',
                borderRadius: 'var(--radius)', padding: '48px 40px', textAlign: 'center',
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 8 }}>
                  {quizSection.results.title}
                </h3>
                <p style={{ color: 'var(--text-2)', marginBottom: 32 }}>
                  {quizSection.results.subtitle}
                </p>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
                  {score}/{maxScore}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>
                  {resultLevel?.label}
                </div>
                <p style={{ color: 'var(--text-2)', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {resultLevel?.message}
                </p>

                {/* Per-question feedback */}
                <div style={{ textAlign: 'left', marginBottom: 36 }}>
                  {quizSection.questions.map((q) => {
                    const chosen = answers[q.id]
                    const opt = q.options.find(o => o.value === chosen)
                    const correct = q.options.find(o => o.points === Math.max(...q.options.map(x => x.points)))
                    const isCorrect = opt?.points === correct?.points
                    return (
                      <div key={q.id} style={{
                        padding: '14px 16px', marginBottom: 10, borderRadius: 'var(--radius-sm)',
                        background: isCorrect ? 'rgba(74,222,128,0.06)' : 'rgba(251,113,133,0.06)',
                        border: `1px solid ${isCorrect ? 'var(--border-bright)' : 'rgba(251,113,133,0.3)'}`,
                      }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: isCorrect ? 'var(--accent)' : 'var(--coral)', marginBottom: 4 }}>
                          {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </p>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>
                          {q.label}
                        </p>
                        {!isCorrect && (
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                            Correct answer: {correct?.label}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={reset} style={{
                    background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)',
                    borderRadius: 100, padding: '12px 26px', fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                  }}>
                    {quizSection.results.ctaReset}
                  </button>
                  <button onClick={() => document.querySelector('#action')?.scrollIntoView({ behavior: 'smooth' })} style={{
                    background: 'var(--accent)', color: 'var(--bg)', border: 'none',
                    borderRadius: 100, padding: '12px 26px', fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                  }}>
                    {quizSection.results.ctaAction}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
