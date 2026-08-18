import { useState } from 'react'
import { motion } from 'motion/react'
import { skills } from '../data/skills'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Reveal } from '../components/ui/Reveal'
import { fadeUp, revealViewport, stagger } from '../lib/motion'
import { WaferSkillMap } from '../visuals/WaferSkillMap'
import { cn } from '../lib/cn'

/** Matches the die colours in WaferSkillMap, region for region. */
const REGION_DOT = ['bg-accent', 'bg-accent-2', 'bg-highlight', 'bg-emerald-400']

export function Skills() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <Section
      id="skills"
      labelledBy="skills-heading"
      className="border-y border-line bg-bg-2/50"
      backdrop={
        <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0 opacity-30" />
      }
    >
      <SectionHeader
        index="08"
        headingId="skills-heading"
        title="Technical ecosystem"
        lede="Every language, library and tool from the CV, grouped exactly as the CV groups them. Each die on the wafer is one tool."
      />

      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal>
          <WaferSkillMap categories={skills} activeCategory={active} onHoverCategory={setActive} />
        </Reveal>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="space-y-6"
        >
          {skills.map((category, i) => {
            const isActive = active === category.name
            return (
              <motion.section
                key={category.name}
                variants={fadeUp}
                onMouseEnter={() => setActive(category.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(category.name)}
                onBlur={() => setActive(null)}
                aria-labelledby={`skill-region-${i}`}
                className={cn(
                  'rounded-xl border px-5 py-4 transition-colors duration-300',
                  isActive ? 'border-accent/40 bg-accent/[0.04]' : 'border-line bg-white/[0.015]',
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={cn('block size-2 rounded-sm', REGION_DOT[i] ?? 'bg-accent')}
                  />
                  <h3
                    id={`skill-region-${i}`}
                    className="text-sm font-semibold tracking-tight text-ink"
                  >
                    {category.name}
                  </h3>
                  <span className="font-mono text-[0.65rem] text-muted">
                    {String(category.items.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[0.78rem] text-ink/85 before:mr-2 before:text-accent/60 before:content-['/']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )
          })}
        </motion.div>
      </div>
    </Section>
  )
}
