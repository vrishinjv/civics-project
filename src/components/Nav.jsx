import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, BookOpen } from 'lucide-react'
import { siteConfig, navLabels } from '../content.js'

export default function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: navLabels.section1,   href: '#issue'      },
    { label: navLabels.section2,   href: '#action'     },
    { label: navLabels.section3,   href: '#solutions'  },
    { label: navLabels.calculator, href: '#quiz'       },
    { label: navLabels.citations,  href: '#citations'  },
  ]

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navBg = scrolled
    ? theme === 'dark' ? 'rgba(10,15,13,0.93)' : 'rgba(248,255,254,0.93)'
    : 'transparent'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 24px',
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.35s ease',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <a href="#" onClick={e => go(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <motion.div whileHover={{ rotate: 10 }} style={{ color: 'var(--accent)' }}>
              <BookOpen size={24} strokeWidth={1.5} />
            </motion.div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
              {siteConfig.siteName}
            </span>
          </a>

          {/* Desktop links */}
          <nav className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={e => go(e, l.href)}
                style={{ padding: '7px 14px', borderRadius: 100, fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-2)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)' }}
              >{l.label}</a>
            ))}
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={toggleTheme}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: '7px 12px', color: 'var(--text)', cursor: 'pointer', display: 'flex', marginLeft: 8 }}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
          </nav>

          {/* Mobile */}
          <div className="mob-nav" style={{ display: 'flex', gap: 8 }}>
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: '7px', color: 'var(--text)', cursor: 'pointer', display: 'flex' }}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(o => !o)}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: '7px', color: 'var(--text)', cursor: 'pointer', display: 'flex' }}>
              {open ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99, padding: '12px 24px 24px',
              background: theme === 'dark' ? 'rgba(10,15,13,0.97)' : 'rgba(248,255,254,0.97)',
              backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
          >
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={e => go(e, l.href)}
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                style={{ display: 'block', padding: '13px 0', fontSize: '1rem', fontWeight: 500, color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .mob-nav { display: none !important; } }
        @media (max-width: 768px) { .desk-nav { display: none !important; } }
      `}</style>
    </>
  )
}
