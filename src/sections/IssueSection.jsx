import AnimatedSection from '../components/AnimatedSection.jsx'
import { issueSection } from '../content.js'

const ACCENT_COLORS = ['var(--coral)', 'var(--sky)', 'var(--amber)', 'var(--accent)', 'var(--purple)', 'var(--orange)']

export default function IssueSection() {
  return (
    <section id="issue" style={{ padding: '100px 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{
              display: 'inline-block', background: 'var(--surface)', border: '1px solid var(--border-bright)',
              borderRadius: 100, padding: '4px 14px', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 20,
            }}>
              {issueSection.badge}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 8 }}>
              {issueSection.headline}
            </h2>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, color: 'var(--text-muted)', marginBottom: 20 }}>
              {issueSection.headlineAccent}
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              {issueSection.subheadline}
            </p>
          </div>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {issueSection.cards.map((card, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: 28, height: '100%',
                display: 'flex', flexDirection: 'column',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ marginBottom: 'auto' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: ACCENT_COLORS[i % ACCENT_COLORS.length], marginBottom: 8 }}>
                    {card.subtitle}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: 14, lineHeight: 1.3 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
                    {card.body}
                  </p>
                </div>

                <div style={{
                  marginTop: 24, paddingTop: 20,
                  borderTop: '1px solid var(--border)',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: ACCENT_COLORS[i % ACCENT_COLORS.length] }}>
                    {card.stat}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                    {card.statLabel}
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
