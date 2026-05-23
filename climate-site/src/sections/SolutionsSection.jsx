import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { solutionsSection } from '../content.js'

const colors = ['#fbbf24', '#fb923c', '#38bdf8', '#4ade80', '#c084fc', '#fb7185']

function SolutionCard({ sol, i }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const color = colors[i % colors.length]

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
    >
      {/* Tag */}
      <div style={{ position: 'absolute', top: 18, right: 18, background: `${color}20`, border: `1px solid ${color}40`, color, borderRadius: 100, padding: '3px 10px', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
        {sol.tag}
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.2, marginBottom: 4, paddingRight: 80 }}>{sol.title}</h3>
      <p style={{ fontSize: '0.74rem', color, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginBottom: 14 }}>{sol.subtitle}</p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.72, marginBottom: 18 }}>{sol.description}</p>

      {/* Feature list */}
      <div style={{ flex: 1 }}>
        {sol.features.map((f, fi) => (
          <div key={fi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 6 }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Impact pill */}
      <div style={{ marginTop: 22, background: `${color}10`, border: `1px solid ${color}28`, borderRadius: 10, padding: '14px 18px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color }}>{sol.impact}</div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>{sol.impactNote}</div>
      </div>
    </motion.div>
  )
}

export default function SolutionsSection() {
  return (
    <section id="solutions" style={{ padding: 'clamp(80px, 10vw, 130px) 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <AnimatedSection style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.22)', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <Zap size={11} style={{ color: '#fbbf24' }} />
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#fbbf24', letterSpacing: '0.08em' }}>{solutionsSection.badge}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
            {solutionsSection.headline}<br />
            <span style={{ color: '#fbbf24', fontStyle: 'italic' }}>{solutionsSection.headlineAccent}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
            {solutionsSection.subheadline}
          </p>
        </AnimatedSection>

        {/* Banner */}
        <AnimatedSection delay={0.1} style={{ marginBottom: 40, background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,146,60,0.07))', border: '1px solid rgba(251,191,36,0.24)', borderRadius: 'var(--radius)', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.2rem' }}>{solutionsSection.banner.emoji}</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{solutionsSection.banner.title}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{solutionsSection.banner.body}</div>
          </div>
          {solutionsSection.banner.ctaUrl && solutionsSection.banner.ctaUrl !== 'https://example.com' && (
            <a href={solutionsSection.banner.ctaUrl} target="_blank" rel="noopener noreferrer"
              style={{ flexShrink: 0, background: '#fbbf24', color: '#052e16', borderRadius: 100, padding: '11px 22px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
              {solutionsSection.banner.ctaLabel}
            </a>
          )}
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18 }}>
          {solutionsSection.solutions.map((sol, i) => <SolutionCard key={i} sol={sol} i={i} />)}
        </div>
      </div>
    </section>
  )
}
