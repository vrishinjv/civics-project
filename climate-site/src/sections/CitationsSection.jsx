import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, BookOpen } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { citations } from '../content.js'

function SourceRow({ src, i }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: '20px 24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', gap: 18, alignItems: 'flex-start' }}
    >
      {/* Number badge */}
      <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700 }}>{src.number}</span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Citation text in a standard format */}
        <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text)', marginBottom: 6 }}>
          <span style={{ fontWeight: 600 }}>{src.author}</span>
          {src.author && '. '}
          <span style={{ fontStyle: 'italic' }}>{src.title}</span>
          {src.title && '. '}
          <span style={{ color: 'var(--text-2)' }}>{src.source}</span>
          {src.year && <span style={{ color: 'var(--text-muted)' }}>, {src.year}.</span>}
        </p>

        {/* Fact note */}
        {src.note && (
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: src.url ? 8 : 0 }}>
            {src.note}
          </p>
        )}

        {/* Link */}
        {src.url && src.url !== 'https://example.com' && (
          <a href={src.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            <ExternalLink size={12} />
            {src.url.replace(/^https?:\/\//, '').slice(0, 50)}{src.url.length > 55 ? '…' : ''}
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function CitationsSection() {
  return (
    <section id="citations" style={{ padding: 'clamp(80px, 10vw, 130px) 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <AnimatedSection style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.22)', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <BookOpen size={11} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.08em' }}>{citations.badge}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
            {citations.headline}<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{citations.headlineAccent}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
            {citations.subheadline}
          </p>
        </AnimatedSection>

        {/* Project note banner */}
        <AnimatedSection delay={0.1} style={{ marginBottom: 32, padding: '16px 22px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.22)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.2rem' }}>📋</span>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{citations.projectNote}</p>
        </AnimatedSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {citations.sources.map((src, i) => <SourceRow key={i} src={src} i={i} />)}
        </div>

        {/* Empty state if no sources filled in yet */}
        {citations.sources.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p>Add your sources in <code style={{ color: 'var(--accent)' }}>src/content.js</code> under the <code style={{ color: 'var(--accent)' }}>citations.sources</code> array.</p>
          </div>
        )}
      </div>
    </section>
  )
}
