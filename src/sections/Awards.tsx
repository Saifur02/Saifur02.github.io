import { motion } from 'motion/react'
import { scholarships } from '../data/achievements'
import { extracurricular } from '../data/extracurricular'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { RevealGroup, Reveal } from '../components/ui/Reveal'
import { fadeUp } from '../lib/motion'

/** Honours recorded elsewhere in the CV, cross-referenced so nothing hides. */
const CROSS_REFERENCES = extracurricular
  .filter((activity) => activity.id === 'bangladesh-scouts' || activity.id === 'pcb-design-contest')
  .map((activity) => ({
    id: activity.id,
    title: activity.title,
    year: activity.year,
  }))

export function Awards() {
  return (
    <Section
      id="awards"
      labelledBy="awards-heading"
      className="border-y border-line bg-bg-2/50"
    >
      <SectionHeader
        index="10"
        headingId="awards-heading"
        title="Honours archive"
        lede="National merit scholarships awarded at every public examination stage."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="eyebrow">Scholarships</p>

          <RevealGroup as="ol" className="mt-5 space-y-3" step={0.1}>
            {scholarships.map((award) => (
              <motion.li key={award.id} variants={fadeUp}>
                <article className="group relative flex items-start gap-5 rounded-xl border border-line bg-white/[0.015] p-5 transition-colors duration-300 hover:border-accent/40">
                  {/* Seal */}
                  <span aria-hidden="true" className="relative mt-0.5 shrink-0">
                    <svg viewBox="0 0 44 44" className="size-11">
                      <circle
                        cx="22"
                        cy="22"
                        r="17"
                        fill="rgba(34,211,238,0.07)"
                        stroke="rgba(34,211,238,0.45)"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r="21"
                        fill="none"
                        stroke="rgba(34,211,238,0.18)"
                        strokeDasharray="2 3"
                      />
                      <text
                        x="22"
                        y="26"
                        textAnchor="middle"
                        className="fill-accent font-mono"
                        fontSize="10"
                      >
                        {award.exam}
                      </text>
                    </svg>
                  </span>

                  <div className="min-w-0">
                    <p className="font-mono text-[0.68rem] tracking-[0.12em] text-accent">
                      {award.year}
                    </p>
                    {/* Full CV sentence, never abbreviated */}
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/90">{award.text}</p>
                  </div>
                </article>
              </motion.li>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1}>
          <div className="panel p-6">
            <p className="eyebrow">Also recorded</p>
            <p className="mt-3 text-[0.83rem] leading-relaxed text-muted">
              Two further honours sit with the activities that earned them, in the
              Extracurricular section.
            </p>
            <ul className="mt-5 space-y-3">
              {CROSS_REFERENCES.map((reference) => (
                <li key={reference.id}>
                  <a
                    href="#extracurricular"
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-3 text-[0.85rem] text-ink transition-colors hover:text-accent"
                  >
                    <span>{reference.title}</span>
                    <span className="font-mono text-[0.7rem] text-muted">{reference.year}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
