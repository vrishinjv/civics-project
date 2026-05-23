import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, ChevronDown } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { actionSection } from '../content.js'

const colors = ['#fbbf24', '#4ade80', '#fb7185', '#38bdf8', '#c084fc', '#fb923c']

function Category({ cat, index }) {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState({})
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const color = colors[index % colors.length]
  const doneCount = Object.values(checked).filter(Boolean).length

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -22 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ border: `1px solid ${open ? color + '40' : 'var(--border)'}`, borderRadius: 'var(--radius)', overflow: 'hidden', transition: 'border-color 0.3s' }}
    >
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '18px 22px', background: open ? `${color}08` : 'var(--surface)', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.3s' }}>
        {/* Color dot */}
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>{cat.title}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
            {doneCount > 0 ? `${doneCount} of ${cat.actions.length} committed` : `${cat.actions.length} actions`}
          </div>
        </div>
        {doneCount > 0 && (
          <span style={{ background: color, color: '#052e16', borderRadius: 100, padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700 }}>
            {doneCount}/{cat.actions.length}
          </span>
        )}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.26 }} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 22px 20px' }}>
              {cat.actions.map((a, ai) => (
                <motion.div key={ai}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ai * 0.04 }}
                  onClick={() => setChecked(c => ({ ...c, [ai]: !c[ai] }))}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: ai < cat.actions.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                  {/* Checkbox */}
                  <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}
                    style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 2, border: `2px solid ${checked[ai] ? color : 'var(--border-bright)'}`, background: checked[ai] ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s' }}>
                    {checked[ai] && <Check size={11} style={{ color: '#052e16' }} strokeWidth={3} />}
                  </motion.div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: checked[ai] ? 'var(--text-muted)' : 'var(--text)', textDecoration: checked[ai] ? 'line-through' : 'none', transition: 'all 0.18s', lineHeight: 1.45 }}>
                      {a.text}
                    </div>
                    <div style={{ fontSize: '0.72rem', color, marginTop: 3, fontFamily: 'var(--font-mono)' }}>{a.impact}</div>
                  </div>
                  {a.easy && (
                    <span style={{ fontSize: '0.67rem', background: `${color}20`, color, borderRadius: 100, padding: '2px 8px', flexShrink: 0, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                      Easy win
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ActionSection() {
  const totalActions = actionSection.categories.reduce((s, c) => s + c.actions.length, 0)

  return (
    <section id="action" style={{ padding: 'clamp(80px, 10vw, 130px) 0', background: 'var(--bg)' }}>
      <div className="container">
        <AnimatedSection style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.22)', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.08em' }}>{actionSection.badge}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
            {totalActions} {actionSection.headline}<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{actionSection.headlineAccent}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
            {actionSection.subheadline}
          </p>
        </AnimatedSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {actionSection.categories.map((cat, i) => <Category key={i} cat={cat} index={i} />)}
        </div>

        <AnimatedSection delay={0.15} style={{ marginTop: 36, background: 'linear-gradient(135deg, var(--surface), var(--bg-3))', border: '1px solid var(--border-bright)', borderRadius: 'var(--radius)', padding: '26px 30px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.9rem' }}>{actionSection.callout.line1}</p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', color: 'var(--coral)', fontWeight: 700 }}>{actionSection.callout.stat}</div>
          <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.9rem' }}>{actionSection.callout.line2}</p>
        </AnimatedSection>
      </div>
    </section>
  )
}
