import { BookOpen } from 'lucide-react'
import { siteConfig, navLabels, footer } from '../content.js'

export default function Footer() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  const links = [
    { label: navLabels.section1,   href: '#issue'     },
    { label: navLabels.section2,   href: '#action'    },
    { label: navLabels.section3,   href: '#solutions' },
    { label: navLabels.calculator, href: '#quiz'      },
    { label: navLabels.citations,  href: '#citations' },
  ]

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '52px 24px 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, marginBottom: 44 }}>
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <BookOpen size={22} style={{ color: 'var(--accent)' }} strokeWidth={1.5} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
                {siteConfig.siteName}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Website made by <span style={{ color: 'var(--accent)' }}>Vrishin Venkatesh</span>
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 16 }}>SECTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-2)', textAlign: 'left', padding: 0, fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                >{l.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{footer.copyright}</p>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Edit all text in <span style={{ color: 'var(--accent)' }}>src/content.js</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
