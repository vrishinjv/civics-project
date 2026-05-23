import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { actionSection } from '../content.js'

export default function ActionSection() {
  const [checked, setChecked] = useState({})
  const [open, setOpen] = useState({ 0: true })

  const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }))
  const toggleCategory = (i) => setOpen(p => ({ ...p, [i]: !p[i] }))

  return (
    <section id="action" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{
              display: 'inline-block', background: 'var(--surface)', border: '1px solid var(--border-bright)',
              borderRadius: 100, padding: '4px 14px', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 20,
            }}>
              {actionSection.badge}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 8 }}>
              {actionSection.headline}
            </h2>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, color: 'var(--text-muted)', marginBottom: 20 }}>
              {actionSection.headlineAccent}
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              {actionSection.subheadline}
            </p>
          </div>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}
          className="action-grid"
        >
          {/* Categories */}
          <AnimatedSection delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {actionSection.categories.map((cat, ci) => (
                <div key={ci} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', overflow: 'hidden',
                }}>
                  <button
                    onClick={() => toggleCategory(ci)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--text)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem',
                    }}
                  >
                    {cat.title}
                    <motion.div animate={{ rotate: open[ci] ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {open[ci] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {cat.actions.map((action, ai) => {
                            const key = `${ci}-${ai}`
                            const isChecked = !!checked[key]
                            return (
                              <div
                                key={ai}
                                onClick={() => toggle(key)}
                                style={{
                                  display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
                                  padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                                  background: isChecked ? 'rgba(74,222,128,0.06)' : 'var(--bg)',
                                  border: `1px solid ${isChecked ? 'var(--border-bright)' : 'var(--border)'}`,
                                  transition: 'all 0.2s',
                                }}
                              >
                                <div style={{
                                  width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 2,
                                  background: isChecked ? 'var(--accent)' : 'var(--surface-2)',
                                  border: `1px solid ${isChecked ? 'var(--accent)' : 'var(--border-bright)'}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  transition: 'all 0.2s',
                                }}>
                                  {isChecked && <Check size={12} style={{ color: 'var(--bg)' }} />}
                                </div>
                                <div>
                                  <span style={{ fontSize: '0.9rem', color: isChecked ? 'var(--text-muted)' : 'var(--text)', textDecoration: isChecked ? 'line-through' : 'none', transition: 'all 0.2s' }}>
                                    {action.text}
                                  </span>
                                  {action.easy && (
                                    <span style={{ display: 'inline-block', marginLeft: 8, fontSize: '0.65rem', fontWeight: 700, background: 'var(--accent-dark)', color: 'var(--accent)', borderRadius: 100, padding: '2px 8px' }}>
                                      Easy win
                                    </span>
                                  )}
                                  {action.impact && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: 2 }}>{action.impact}</div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Callout box */}
          <AnimatedSection delay={0.2}>
            <div style={{
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)',
              border: '1px solid var(--border-bright)',
              borderRadius: 'var(--radius)', padding: '40px 32px', textAlign: 'center',
              position: 'sticky', top: 88,
            }}>
              {actionSection.callout.line1 && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', marginBottom: 16 }}>
                  {actionSection.callout.line1}
                </p>
              )}
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 700, color: 'var(--accent)', lineHeight: 1.2, marginBottom: 16,
              }}>
                {actionSection.callout.stat}
              </div>
              {actionSection.callout.line2 && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>
                  {actionSection.callout.line2}
                </p>
              )}

              {/* Progress */}
              {(() => {
                const total = actionSection.categories.reduce((a, c) => a + c.actions.length, 0)
                const done = Object.values(checked).filter(Boolean).length
                const pct = total ? Math.round((done / total) * 100) : 0
                return (
                  <div style={{ marginTop: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>{done} of {total} actions committed</span>
                      <span>{pct}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
                      <motion.div
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.4 }}
                        style={{ height: '100%', background: 'var(--accent)', borderRadius: 3 }}
                      />
                    </div>
                  </div>
                )
              })()}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .action-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
