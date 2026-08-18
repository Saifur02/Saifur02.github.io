import { motion } from 'motion/react'
import { Award } from 'lucide-react'
import { education } from '../data/education'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { fadeUp, revealViewport, stagger } from '../lib/motion'
import type { Education as EducationEntry } from '../types'

/** Circular grade dial. The arc encodes grade ÷ maximum — both stated on the CV. */
function GradeDial({ entry }: { entry: EducationEntry }) {
  const ratio = entry.gradeValue / entry.gradeMax
  const radius = 30
  const circumference = 2 * Math.PI * radius
  // Gradient ids must be unique per instance — three dials share this component.
  const gradientId = `dial-${entry.year}`

  return (
    <div className="relative size-20 shrink-0">
      <svg viewBox="0 0 72 72" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="4" />
        <motion.circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - ratio) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <span className="block font-mono text-[0.62rem] tracking-wide text-muted">
            {entry.gradeLabel}
          </span>
          <span className="block font-mono text-[0.8rem] leading-tight text-ink">
            {entry.grade.split('/')[0]}
          </span>
        </div>
      </div>
      <span className="sr-only">
        {entry.gradeLabel} {entry.grade}
      </span>
    </div>
  )
}

export function Education() {
  return (
    <Section id="education" labelledBy="education-heading">
      <SectionHeader
        index="07"
        headingId="education-heading"
        title="Academic journey"
        lede="School to university, with the grades recorded at each stage."
      />

      <div className="relative">
        {/* Progress rail — horizontal on desktop, vertical on mobile */}
        <span
          aria-hidden="true"
          className="absolute top-10 left-0 hidden h-px w-full bg-linear-to-r from-line via-accent/40 to-accent/70 lg:block"
        />
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[3px] w-px bg-linear-to-b from-line via-accent/40 to-accent/70 lg:hidden"
        />

        <motion.ol
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid gap-10 pl-8 lg:grid-cols-3 lg:gap-8 lg:pl-0"
        >
          {education.map((entry) => (
            <motion.li key={entry.institution} variants={fadeUp} className="relative">
              {/* Stop marker */}
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-8 block size-[7px] rounded-full bg-accent lg:top-[34px] lg:left-0"
              />

              <div className="lg:pt-20">
                <span className="font-mono text-sm text-accent">{entry.year}</span>

                <div className="mt-4 flex items-start gap-4">
                  <GradeDial entry={entry} />
                  <div className="min-w-0">
                    <h3 className="text-base leading-snug font-semibold text-ink">
                      {entry.institution}
                      {entry.location ? (
                        <span className="block text-[0.78rem] font-normal text-muted">
                          {entry.location}
                        </span>
                      ) : null}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-[0.86rem] leading-relaxed text-muted">
                  {entry.qualification}
                  {entry.stream ? <span className="block">{entry.stream}</span> : null}
                </p>

                <p className="mt-3 font-mono text-[0.75rem] text-ink/90">
                  {entry.gradeLabel} {entry.grade}
                </p>

                {entry.rank ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-highlight/40 bg-highlight/[0.07] px-3 py-1.5 text-[0.72rem] text-highlight">
                    <Award aria-hidden="true" className="size-3.5" />
                    Rank {entry.rank}
                  </p>
                ) : null}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  )
}
