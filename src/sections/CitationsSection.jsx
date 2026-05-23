import { ExternalLink } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { citations } from '../content.js'

export default function CitationsSection() {
  return (
    <section id="citations" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block', background: 'var(--surface)', border: '1px solid var(--border-bright)',
              borderRadius: 100, padding: '4px 14px', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 20,
            }}>
              {citations.badge}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 8 }}>
              {citations.headline}
            </h2>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, color: 'var(--text-muted)', marginBottom: 20 }}>
              {citations.headlineAccent}
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              {citations.subheadline}
            </p>
          </div>
        </AnimatedSection>

        {citations.projectNote && (
          <AnimatedSection delay={0.1}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '14px 20px',
              marginBottom: 32, fontSize: '0.85rem', color: 'var(--text-muted)',
              fontStyle: 'italic',
            }}>
              {citations.projectNote}
            </div>
          </AnimatedSection>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {citations.sources.map((src, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '22px 24px',
                display: 'flex', alignItems: 'flex-start', gap: 20,
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{
                  flexShrink: 0, width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent)',
                }}>
                  {src.number}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>
                        {src.title}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>
                        {src.author} — <span style={{ color: 'var(--text-muted)' }}>{src.source}, {src.year}</span>
                      </p>
                      {src.note && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>
                          {src.note}
                        </p>
                      )}
                    </div>
                    {src.url && (
                      <a href={src.url} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
                          fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500,
                          textDecoration: 'none', padding: '6px 12px',
                          border: '1px solid var(--border-bright)', borderRadius: 100,
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        Visit Source <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
