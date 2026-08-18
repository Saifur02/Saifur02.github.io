import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { projects } from '../data/projects'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Tag } from '../components/ui/Tag'
import { expand, expandTransition, fadeUp, revealViewport, stagger } from '../lib/motion'
import { ShiftRegister } from '../visuals/ShiftRegister'
import { MotorControl } from '../visuals/MotorControl'
import { SapDatapath } from '../visuals/SapDatapath'
import { SurvivalCurve } from '../visuals/SurvivalCurve'
import { PhishingEnsemble } from '../visuals/PhishingEnsemble'
import { cn } from '../lib/cn'
import type { Project } from '../types'

/** Asymmetric spans so the gallery reads as a bench of unlike instruments. */
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-12']

function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case 'shift-register':
      return <ShiftRegister />
    case 'motor-control':
      return <MotorControl />
    case 'sap-datapath':
      return <SapDatapath />
    case 'survival-curve':
      return <SurvivalCurve />
    case 'phishing-ensemble':
      // Metrics are shown on the card itself, so the figure stays purely structural.
      return <PhishingEnsemble />
  }
}

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id)

  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeader
        index="05"
        headingId="projects-heading"
        title="Engineering projects"
        lede="Circuit design, embedded control and applied machine learning. Each project carries a working figure of what it built."
      />

      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        // items-start keeps each card at its natural height instead of stretching
        // a short card to match an expanded neighbour.
        className="grid items-start gap-5 lg:grid-cols-12"
      >
        {projects.map((project, i) => {
          const isOpen = open === project.id
          const panelId = `project-panel-${project.id}`
          return (
            <motion.li
              key={project.id}
              variants={fadeUp}
              layout
              className={cn('panel flex flex-col overflow-hidden', SPANS[i] ?? 'lg:col-span-6')}
            >
              {/* Everything the CV states is always rendered. Only the interactive
                  figure lives behind the toggle. */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-accent/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[0.68rem] text-muted">{project.date}</span>
                </div>

                <h3 className="mt-4 text-base leading-snug font-medium text-ink sm:text-lg">
                  {project.title}
                </h3>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <li key={tool}>
                      <Tag tone="quiet" mono>
                        {tool}
                      </Tag>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

                {project.metrics ? (
                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dd className="font-mono text-lg text-accent">{metric.value}</dd>
                        <dt className="mt-0.5 font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">
                          {metric.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  // Only advertised while the panel is mounted.
                  aria-controls={isOpen ? panelId : undefined}
                  className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.72rem] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid size-4 place-items-center transition-transform duration-300',
                      isOpen && 'rotate-45',
                    )}
                  >
                    <Plus className="size-3.5" />
                  </span>
                  {isOpen ? 'Hide figure' : 'Show figure'}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    variants={expand}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    transition={expandTransition}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line p-5 sm:p-6">
                      <ProjectVisual project={project} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </motion.ul>
    </Section>
  )
}
