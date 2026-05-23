import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { issueSection } from '../content.js'

// Color palette cycles through for each card automatically
const palette = [
  { color: '#fb7185', border: 'rgba(251,113,133,0.22)', grd: 'rgba(251,113,133,0.1)' },
  { color: '#38bdf8', border: 'rgba(56,189,248,0.22)',  grd: 'rgba(56,189,248,0.1)'  },
  { color: '#fbbf24', border: 'rgba(251,191,36,0.22)',  grd: 'rgba(251,191,36,0.1)'  },
  { color: '#4ade80', border: 'rgba(74,222,128,0.22)',  grd: 'rgba(74,222,128,0.1)'  },
  { color: '#c084fc', border: 'rgba(192,132,252,0.22)', grd: 'rgba(192,132,252,0.1)' },
  { color: '#fb923c', border: 'rgba(251,146,60,0.22)',  grd: 'rgba(251,146,60,0.1)'  },
]

function Card({ card, i }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })
  const p = palette[i % palette.length]

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      style={{
        background: `linear-gradient(135deg, ${p.grd}, transparent), var(--surface)`,
        border: `1px solid ${p.border}`,
        borderRadius: 'var(--radius)',
        padding: 28,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner glow */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${p.color}18, transparent 70%)` }} />

      {/* Card number */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: p.color, letterSpacing: '0.08em', marginBottom: 14 }}>
        [{String(i + 1).padStart(2, '0')}]
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>
        {card.title}
      </h3>
      <p style={{ fontSize: '0.75rem', color: p.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginBottom: 14 }}>
        {card.subtitle}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.72, marginBottom: 22 }}>
        {card.body}
      </p>

      <div style={{ borderTop: `1px solid ${p.border}`, paddingTop: 16, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: p.color }}>{card.stat}</span>
        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{card.statLabel}</span>
      </div>
    </motion.div>
  )
}

export default function IssueSection() {
  return (
    <section id="issue" style={{ padding: 'clamp(80px, 10vw, 130px) 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <AnimatedSection style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.22)', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#fb7185', letterSpacing: '0.08em' }}>{issueSection.badge}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
            {issueSection.headline}<br />
            <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>{issueSection.headlineAccent}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
            {issueSection.subheadline}
          </p>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {issueSection.cards.map((card, i) => <Card key={i} card={card} i={i} />)}
        </div>
      </div>
    </section>
  )
}
