import { motion } from 'motion/react'
import { Clock, MapPin } from 'lucide-react'
import { training } from '../data/training'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { RevealGroup } from '../components/ui/Reveal'
import { fadeUp } from '../lib/motion'
import { FacilityArt } from '../visuals/FacilityArt'

export function Training() {
  return (
    <Section id="training" labelledBy="training-heading">
      <SectionHeader
        index="09"
        headingId="training-heading"
        title="Industrial exposure"
        lede="Plant-floor attachments completed as an industrial trainee."
      />

      <RevealGroup className="grid gap-5 md:grid-cols-2" step={0.12}>
        {training.map((entry, i) => (
          <motion.article
            key={entry.id}
            variants={fadeUp}
            className="panel relative overflow-hidden p-6"
          >
            {/* Dossier header strip */}
            <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
              <div>
                <p className="font-mono text-[0.65rem] tracking-[0.14em] text-accent uppercase">
                  Attachment {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-base leading-snug font-semibold text-ink">
                  {entry.organization}
                </h3>
                <p className="mt-1 text-[0.8rem] text-muted">{entry.role}</p>
              </div>
              <span className="font-mono text-sm text-muted">{entry.year}</span>
            </div>

            <div className="py-5">
              <FacilityFrame>{entry.visual}</FacilityFrame>
            </div>

            <p className="text-[0.86rem] leading-relaxed text-muted">{entry.description}</p>

            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line pt-4 text-[0.75rem]">
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="size-3.5 text-accent" />
                <dt className="sr-only">Duration</dt>
                <dd className="font-mono text-ink/90">{entry.duration}</dd>
              </div>
              {entry.location ? (
                <div className="flex items-start gap-2">
                  <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-accent" />
                  <dt className="sr-only">Location</dt>
                  <dd className="text-muted">{entry.location}</dd>
                </div>
              ) : null}
            </dl>
          </motion.article>
        ))}
      </RevealGroup>
    </Section>
  )
}

/** Keeps the facility drawing on its own recessed plate. */
function FacilityFrame({ children }: { children: 'power-plant' | 'reactor' }) {
  return (
    <div className="rounded-lg border border-line bg-bg/60 px-3 py-2">
      <FacilityArt kind={children} />
    </div>
  )
}
