import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { quizSection } from '../content.js'

export default function QuizSection() {
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const qs = quizSection.questions
  const current = qs[step]
  const progress = ((step + (done ? 1 : 0)) / qs.length) * 100

  const totalScore = Object.entries(answers).reduce((sum, [id, val]) => {
    const q = qs.find(q => q.id === id)
    const opt = q?.options.find(o => o.value === val)
    return sum + (opt?.points || 0)
  }, 0)

  const maxScore = qs.reduce((s, q) => s + Math.max(...q.options.map(o => o.points)), 0)

  const resultLevel = quizSection.results.levels
    .slice()
    .reverse()
    .find(l => totalScore >= l.minScore) || quizSection.results.levels[0]

  const scorePct = Math.round((totalScore / maxScore) * 100)
  const scoreColor = scorePct >= 75 ? 'var(--accent)' : scorePct >= 45 ? '#fbbf24' : '#fb7185'

  const pick = (val) => {
    setAnswers(a => ({ ...a, [current.id]: val }))
    if (step < qs.length - 1) setTimeout(() => setStep(s => s + 1), 220)
    else setTimeout(() => setDone(true), 220)
  }

  const reset = () => { setAnswers({}); setStep(0); setDone(false) }

  return (
    <section id="quiz" style={{ padding: 'clamp(80px, 10vw, 130px) 0', background: 'var(--bg)' }}>
      <div className="container">
        <AnimatedSection style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.22)', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <HelpCircle size={11} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.08em' }}>{quizSection.badge}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
            {quizSection.headline}<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{quizSection.headlineAccent}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
            {quizSection.subheadline}
          </p>
        </AnimatedSection>

        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          {/* Progress */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {done ? 'Complete!' : `Question ${step + 1} of ${qs.length}`}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 4, background: 'var(--surface)', borderRadius: 100, overflow: 'hidden' }}>
              <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', background: 'var(--accent)', borderRadius: 100 }} />
            </div>
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            {qs.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 100, background: i < step || done ? 'var(--accent)' : i === step ? 'rgba(74,222,128,0.38)' : 'var(--surface)', transition: 'background 0.3s' }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '32px 28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.35, marginBottom: 24 }}>
                    {current.label}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {current.options.map(opt => (
                      <motion.button key={opt.value} whileHover={{ scale: 1.015, x: 4 }} whileTap={{ scale: 0.98 }}
                        onClick={() => pick(opt.value)}
                        style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '16px 20px', background: answers[current.id] === opt.value ? 'rgba(74,222,128,0.1)' : 'var(--bg)',
                          border: `1px solid ${answers[current.id] === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                          borderRadius: 10, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text)', textAlign: 'left', transition: 'all 0.18s',
                        }}>
                        <span style={{ fontWeight: 500 }}>{opt.label}</span>
                      </motion.button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)} style={{ marginTop: 18, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.83rem', fontFamily: 'var(--font-body)' }}>
                      ← Back
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border-bright)', borderRadius: 'var(--radius)', padding: '32px 28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 4 }}>{quizSection.results.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 28 }}>{quizSection.results.subtitle}</p>

                  {/* Score circle */}
                  <div style={{ textAlign: 'center', padding: '28px 20px', background: 'var(--bg)', borderRadius: 'var(--radius)', marginBottom: 24, border: '1px solid var(--border)' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(3rem, 10vw, 4.5rem)', fontWeight: 700, color: scoreColor, lineHeight: 1 }}>
                      {totalScore}/{maxScore}
                    </motion.div>
                    <div style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.88rem' }}>points scored</div>
                    <div style={{ marginTop: 18, display: 'inline-block', background: `${scoreColor}18`, border: `1px solid ${scoreColor}35`, borderRadius: 100, padding: '6px 18px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: scoreColor, fontWeight: 700 }}>{resultLevel.label}</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 24, padding: '16px 20px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                    {resultLevel.message}
                  </p>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => document.querySelector('#action')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ flex: 1, background: 'var(--accent)', color: '#052e16', border: 'none', borderRadius: 100, padding: '13px 20px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.88rem' }}>
                      {quizSection.results.ctaAction}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={reset}
                      style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 100, padding: '13px 20px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.88rem' }}>
                      {quizSection.results.ctaReset}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
