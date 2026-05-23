import { Leaf } from 'lucide-react'
import { footer, siteConfig, navLabels } from '../content.js'

export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const links = [
    { label: navLabels.section1,   href: '#issue'     },
    { label: navLabels.section2,   href: '#action'    },
    { label: navLabels.section3,   href: '#solutions' },
    { label: navLabels.calculator, href: '#quiz'      },
    { label: navLabels.citations,  href: '#citations' },
  ]

  return (
    <footer style={{
      background: 'var(--bg-2)', borderTop: '1px solid var(--border)',
      padding: '48px 0 32px',
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Leaf size={20} style={{ color: 'var(--accent)' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700 }}>
                {siteConfig.siteName}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {footer.description}
            </p>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {links.map(l => (
              <a key={l.href} href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href) }}
                style={{
                  fontSize: '0.85rem', color: 'var(--text-2)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
