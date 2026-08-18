import { motion } from 'motion/react'
import { BookOpen, ClipboardCheck, FlaskConical, GraduationCap } from 'lucide-react'
import { experience } from '../data/experience'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Reveal, RevealGroup } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { fadeUp } from '../lib/motion'

/** Icons are chosen per duty wording; order follows the CV. */
const DUTY_ICONS = [FlaskConical, BookOpen, ClipboardCheck, GraduationCap]

export function Experience() {
  return (
    <Section
      id="experience"
      labelledBy="experience-heading"
      className="border-y border-line bg-bg-2/50"
    >
      <SectionHeader
        index="06"
        headingId="experience-heading"
        title="Academic experience"
        lede="Teaching across nine undergraduate courses in electrical and electronic engineering."
      />

      <ol className="relative">
        {/* Timeline rail */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-linear-to-b from-accent/70 via-line to-transparent sm:left-[9px]"
        />

        {experience.map((role) => (
          <li key={role.organization} className="relative pl-9 sm:pl-12">
            {/* Node — pulses while the role is current */}
            <span aria-hidden="true" className="absolute top-1.5 left-0 flex size-4 items-center justify-center sm:size-5">
              <span className="relative block size-3 rounded-full border-2 border-accent bg-bg sm:size-3.5">
                {role.ongoing ? (
                  <motion.span
                    className="absolute -inset-1.5 rounded-full border border-accent/50"
                    animate={{ opacity: [0.7, 0, 0.7], scale: [0.8, 1.5, 0.8] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ) : null}
              </span>
            </span>

            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[0.7rem] text-accent">{role.period}</span>
                {role.ongoing ? (
                  <Tag tone="accent" mono>
                    Current
                  </Tag>
                ) : null}
              </div>

              <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {role.role}
              </h3>
              <p className="mt-1 text-sm text-muted">{role.organization}</p>

              <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
                <div>
                  <p className="eyebrow">Responsibilities</p>
                  <RevealGroup as="ul" className="mt-4 space-y-2.5">
                    {role.duties.map((duty, i) => {
                      const Icon = DUTY_ICONS[i % DUTY_ICONS.length]
                      return (
                        <motion.li
                          key={duty}
                          variants={fadeUp}
                          className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.02] px-3.5 py-2.5"
                        >
                          <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                          <span className="text-[0.83rem] leading-snug text-ink/90">{duty}</span>
                        </motion.li>
                      )
                    })}
                  </RevealGroup>
                </div>

                <div>
                  <p className="eyebrow">
                    Courses conducted{' '}
                    <span className="text-muted">({role.courses.length})</span>
                  </p>
                  <RevealGroup as="ul" step={0.04} className="mt-4 flex flex-wrap gap-2">
                    {role.courses.map((course) => (
                      <motion.li key={course} variants={fadeUp}>
                        <Tag>{course}</Tag>
                      </motion.li>
                    ))}
                  </RevealGroup>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
