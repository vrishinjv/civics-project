import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import { hero } from '../content.js'

const Orb = ({ w, h, color, top, left, right, bottom, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{
      position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
      width: w, height: h, background: color, top, left, right, bottom,
    }}
  />
)

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scrollDown = () => document.querySelector('#issue')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 68 }}>
      <Orb w={600} h={600} color="radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)" top="-5%" left="-12%" />
      <Orb w={400} h={400} color="radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)"  top="15%" right="-8%" delay={2} />
      <Orb w={350} h={350} color="radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)" bottom="8%" left="38%" delay={4} />
      <div className="grid-bg" />

      <motion.div style={{ y, opacity }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--border-bright)', borderRadius: 100, padding: '7px 16px', marginBottom: 28 }}>
            <Sparkles size={13} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{hero.badge}</span>
          </motion.div>

          {/* Headlines */}
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 900, marginBottom: 24 }}>
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{hero.headline}</span>
            <br />
            <span style={{ color: 'var(--text-muted)' }}>{hero.headlineAccent}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.18rem)', color: 'var(--text-muted)', maxWidth: 540, lineHeight: 1.78, marginBottom: 40, fontWeight: 300 }}>
            {hero.subheadline}
          </motion.p>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 64 }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(74,222,128,0.28)' }} whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#issue')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'var(--accent)', color: '#052e16', border: 'none', borderRadius: 100, padding: '14px 28px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              {hero.ctaPrimary}
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#quiz')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border-bright)', borderRadius: 100, padding: '14px 28px', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              {hero.ctaSecondary}
            </motion.button>
          </motion.div>

          {/* Stat boxes */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {hero.stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 + i * 0.1 }}
                style={{ textAlign: 'center', padding: '16px 24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', color: 'var(--accent)', fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 5, letterSpacing: '0.04em', textTransform: 'uppercase', maxWidth: 120 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll arrow */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} onClick={scrollDown}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'none', border: '1px solid var(--border)', borderRadius: 100, padding: '10px 14px', cursor: 'pointer', color: 'var(--text-muted)', zIndex: 2 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={15} />
        </motion.div>
      </motion.button>
    </section>
  )
}
