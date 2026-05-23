import { Check } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import { solutionsSection } from '../content.js'

const TAG_COLORS = {
  'Most Effective':   'var(--accent)',
  'Widely Available': 'var(--sky)',
  'Community-Based':  'var(--amber)',
  'Future-Focused':   'var(--purple)',
}

export default function SolutionsSection() {
  return (
    <section id="solutions" style={{ padding: '100px 0', background: 'var(--bg-3)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              display: 'inline-block', background: 'var(--surface)', border: '1px solid var(--border-bright)',
              borderRadius: 100, padding: '4px 14px', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 20,
            }}>
              {solutionsSection.badge}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 8 }}>
              {solutionsSection.headline}
            </h2>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, color: 'var(--text-muted)', marginBottom: 20 }}>
              {solutionsSection.headlineAccent}
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              {solutionsSection.subheadline}
            </p>
          </div>
        </AnimatedSection>

        {/* Banner */}
        {solutionsSection.banner.title && (
          <AnimatedSection delay={0.1}>
            <div style={{
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)',
              border: '1px solid var(--border-bright)', borderRadius: 'var(--radius)',
              padding: '28px 32px', marginBottom: 40,
              display: 'flex', alignItems: 'flex-start', gap: 20,
            }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>{solutionsSection.banner.emoji}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 8 }}>
                  {solutionsSection.banner.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {solutionsSection.banner.body}
                </p>
                {solutionsSection.banner.ctaLabel && solutionsSection.banner.ctaUrl && (
                  <a href={solutionsSection.banner.ctaUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', marginTop: 14, fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                    {solutionsSection.banner.ctaLabel} →
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Solutions grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {solutionsSection.solutions.map((sol, i) => {
            const tagColor = TAG_COLORS[sol.tag] || 'var(--accent)'
            return (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: 28, height: '100%',
                  display: 'flex', flexDirection: 'column',
                  transition: 'border-color 0.2s, transform 0.2s',
                  position: 'relative',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {sol.tag && (
                    <span style={{
                      position: 'absolute', top: 16, right: 16,
                      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                      color: tagColor, background: 'var(--bg)',
                      border: `1px solid ${tagColor}`, borderRadius: 100, padding: '3px 10px',
                    }}>
                      {sol.tag}
                    </span>
                  )}

                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 8 }}>
                    {sol.subtitle}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: 14, lineHeight: 1.3, paddingRight: 80 }}>
                    {sol.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 20 }}>
                    {sol.description}
                  </p>

                  {sol.features && sol.features.length > 0 && (
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                      {sol.features.map((f, fi) => (
                        <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: 'var(--text-2)' }}>
                          <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 3 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 700, color: tagColor }}>
                      {sol.impact}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                      {sol.impactNote}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
