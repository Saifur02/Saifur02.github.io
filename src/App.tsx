import { useCallback, useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { MobileNav } from './components/layout/MobileNav'
import { SectionRail } from './components/layout/SectionRail'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { CursorGlow } from './components/layout/CursorGlow'
import { Footer } from './components/layout/Footer'
import { useActiveSection } from './hooks/useActiveSection'
import { navigation } from './data/navigation'

import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Research } from './sections/Research'
import { Publications } from './sections/Publications'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Education } from './sections/Education'
import { Skills } from './sections/Skills'
import { Training } from './sections/Training'
import { Awards } from './sections/Awards'
import { Extracurricular } from './sections/Extracurricular'
import { Referees } from './sections/Referees'
import { Contact } from './sections/Contact'

const sectionIds = navigation.map((item) => item.id)

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-80"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <CursorGlow />
      <Navbar active={active} onOpenMenu={() => setMenuOpen(true)} />
      <SectionRail active={active} />
      <MobileNav open={menuOpen} active={active} onClose={closeMenu} />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Research />
        <Publications />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Training />
        <Awards />
        <Extracurricular />
        <Referees />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
