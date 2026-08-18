import { motion } from 'motion/react'
import { referees } from '../data/referees'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { RevealGroup } from '../components/ui/Reveal'
import { fadeUp } from '../lib/motion'

/**
 * Academic reference directory. Contact details are rendered as mailto/tel links
 * only — no photographs, no social profiles and no titles beyond the CV's own.
 */
export function Referees() {
  return (
    <Section
      id="referees"
      labelledBy="referees-heading"
      className="border-y border-line bg-bg-2/50"
    >
      <SectionHeader
        index="12"
        headingId="referees-heading"
        title="Academic referees"
        lede="Available for reference on request, as listed on the curriculum vitae."
      />

      <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3" step={0.1}>
        {referees.map((referee, i) => (
          <motion.li key={referee.id} variants={fadeUp} className="flex h-full flex-col bg-bg p-6">
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-accent">
              REF {String(i + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-4 text-base leading-snug font-semibold text-ink">{referee.name}</h3>
            <p className="mt-1.5 text-[0.82rem] leading-snug text-accent/90">{referee.title}</p>

            <ul className="mt-3 mb-6 space-y-1">
              {referee.affiliations.map((affiliation) => (
                <li key={affiliation} className="text-[0.8rem] leading-relaxed text-muted">
                  {affiliation}
                </li>
              ))}
            </ul>

            {/* mt-auto pins the contact block to the card foot so all three align. */}
            <dl className="mt-auto space-y-2.5 border-t border-line pt-4 text-[0.8rem]">
              <div>
                <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">
                  Email
                </dt>
                <dd className="mt-1 break-all">
                  <a
                    href={`mailto:${referee.email}`}
                    className="font-mono text-ink/90 transition-colors hover:text-accent"
                  >
                    {referee.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">
                  Mobile
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${referee.mobile}`}
                    className="font-mono text-ink/90 transition-colors hover:text-accent"
                  >
                    {referee.mobile}
                  </a>
                </dd>
              </div>
            </dl>
          </motion.li>
        ))}
      </RevealGroup>
    </Section>
  )
}
