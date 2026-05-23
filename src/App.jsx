import { useState, useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import IssueSection from './sections/IssueSection.jsx'
import ActionSection from './sections/ActionSection.jsx'
import SolutionsSection from './sections/SolutionsSection.jsx'
import QuizSection from './sections/QuizSection.jsx'
import CitationsSection from './sections/CitationsSection.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <IssueSection />
        <ActionSection />
        <SolutionsSection />
        <QuizSection />
        <CitationsSection />
      </main>
      <Footer />
    </div>
  )
}
