import { motion } from 'motion/react'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { publications } from '../data/publications'
import { research } from '../data/research'
import { asset } from '../lib/asset'
import { easeOutSoft, stagger } from '../lib/motion'
import { MagneticButton } from '../components/ui/MagneticButton'
import { GaafetHero } from '../visuals/GaafetHero'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutSoft } },
}

/** Counts are derived from the CV data itself, never asserted independently. */
const facts = [
  { value: 'IUT', label: 'B.Sc. EEE, 2024' },
  { value: '3.84/4.0', label: 'CGPA · 17th of 117' },
  { value: String(publications.length), label: 'Peer-reviewed papers' },
  { value: String(research.length), label: 'Research works' },
]

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <div
        aria-hidden="true"
        className="lattice pointer-events-none absolute inset-0 opacity-[0.13] [mask-image:radial-gradient(75%_60%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-bg"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/70" />
            Semiconductor Research Portfolio
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-heading"
            className="mt-6 text-[clamp(2.3rem,6.1vw,3.9rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-ink"
          >
            Engineering the Future{' '}
            <span className="block">
              at the <span className="gradient-text">Nanoscale.</span>
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-7 flex flex-col gap-1.5">
            {profile.roles.map((role) => (
              <p key={role} className="text-base font-medium text-ink/90 sm:text-lg">
                {role}
              </p>
            ))}
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[0.72rem] tracking-wide text-muted"
          >
            {profile.focusAreas.map((area, i) => (
              <li key={area} className="flex items-center gap-2.5">
                {i > 0 ? (
                  <span aria-hidden="true" className="text-accent/60">
                    •
                  </span>
                ) : null}
                <span className="uppercase">{area}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href={asset(profile.cvFile)} download ariaLabel="Download CV as PDF">
              <Download aria-hidden="true" className="size-4" />
              Download CV
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail aria-hidden="true" className="size-4" />
              Get in touch
            </MagneticButton>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-4 sm:gap-x-4"
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block font-mono text-lg leading-none font-medium text-accent">
                    {fact.value}
                  </span>
                  <span className="mt-2 block text-[0.7rem] leading-snug text-muted">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeOutSoft, delay: 0.1 }}
          className="flex justify-center lg:justify-end"
        >
          <GaafetHero />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent md:flex"
        aria-label="Scroll to the About section"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase">Scroll</span>
        <ArrowDown aria-hidden="true" className="size-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
