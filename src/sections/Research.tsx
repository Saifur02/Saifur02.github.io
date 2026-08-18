import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, X } from 'lucide-react'
import { research } from '../data/research'
import { researchInterests } from '../data/researchInterests'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Reveal } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { ResearchNetwork } from '../visuals/ResearchNetwork'
import { GaafetCompare } from '../visuals/GaafetCompare'
import { TransistorTimeline } from '../visuals/TransistorTimeline'
import { LoadCurve } from '../visuals/LoadCurve'
import { expand, expandTransition } from '../lib/motion'
import { cn } from '../lib/cn'

function EntryVisual({ kind }: { kind: (typeof research)[number]['visual'] }) {
  if (kind === 'gaafet-compare') return <GaafetCompare />
  if (kind === 'transistor-timeline') return <TransistorTimeline />
  return <LoadCurve />
}

export function Research() {
  const [activeInterest, setActiveInterest] = useState<string | null>(null)
  // Every figure starts open, so nothing the CV names sits behind a click.
  const [openEntries, setOpenEntries] = useState<string[]>(research.map((entry) => entry.id))

  const toggleEntry = (id: string) =>
    setOpenEntries((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const visible = useMemo(
    () =>
      activeInterest
        ? research.filter((entry) => entry.interests.includes(activeInterest))
        : research,
    [activeInterest],
  )

  const activeLabel = researchInterests.find((interest) => interest.id === activeInterest)?.label

  return (
    <Section
      id="research"
      labelledBy="research-heading"
      backdrop={
        <div
          aria-hidden="true"
          className="lattice pointer-events-none absolute inset-0 opacity-[0.1] [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]"
        />
      }
    >
      <SectionHeader
        index="03"
        headingId="research-heading"
        title="Research programme"
        lede="Five interconnected interests, three research works. Select a field to see which works touch it."
      />

      {/* Interest network + legend */}
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <Reveal>
          <ResearchNetwork
            interests={researchInterests}
            activeId={activeInterest}
            onSelect={(id) => setActiveInterest((prev) => (prev === id ? null : id))}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Research interests</p>
          <ul className="mt-4 divide-y divide-line">
            {researchInterests.map((interest) => {
              const isActive = activeInterest === interest.id
              return (
                <li key={interest.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveInterest((prev) => (prev === interest.id ? null : interest.id))
                    }
                    aria-pressed={isActive}
                    className="group flex w-full items-start gap-4 py-3.5 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-1.5 block size-1.5 shrink-0 rounded-full transition-colors',
                        isActive ? 'bg-accent' : 'bg-muted/50 group-hover:bg-accent/70',
                      )}
                    />
                    <span className="min-w-0">
                      <span
                        className={cn(
                          'block text-sm font-medium transition-colors',
                          isActive ? 'text-accent' : 'text-ink group-hover:text-accent',
                        )}
                      >
                        {interest.label}
                      </span>
                      <span className="mt-1 block text-[0.78rem] leading-relaxed text-muted">
                        {interest.blurb}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>

      {/* Research entries */}
      <div className="mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
          <h3 className="text-lg font-semibold tracking-tight text-ink">Research experience</h3>
          <p aria-live="polite" className="flex items-center gap-3 font-mono text-[0.7rem] text-muted">
            <span>
              {visible.length} of {research.length} shown
            </span>
            {activeInterest ? (
              <button
                type="button"
                onClick={() => setActiveInterest(null)}
                className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-2.5 py-1 text-accent transition-colors hover:bg-accent/10"
              >
                <X aria-hidden="true" className="size-3" />
                {activeLabel}
              </button>
            ) : null}
          </p>
        </div>

        <ul className="mt-6 space-y-5">
          <AnimatePresence initial={false}>
            {visible.map((entry, i) => {
              const isOpen = openEntries.includes(entry.id)
              const panelId = `research-panel-${entry.id}`
              return (
                <motion.li
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="panel overflow-hidden"
                >
                  {/* The CV's own text is always on the page; the technical figure
                      is what the toggle reveals. */}
                  <div className="flex items-start gap-4 p-5 sm:gap-6 sm:p-6">
                    <span className="font-mono text-xs text-accent/80 sm:text-sm">
                      R-{String(research.indexOf(entry) + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0 flex-1">
                      <Tag tone={entry.statusKind === 'thesis' ? 'violet' : 'accent'} mono>
                        {entry.status}
                      </Tag>

                      <h4 className="mt-2.5 text-base leading-snug font-medium text-ink sm:text-lg">
                        {entry.title}
                      </h4>

                      <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-muted">
                        {entry.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                        <div>
                          <p className="eyebrow">Key concepts</p>
                          <ul className="mt-2.5 flex flex-wrap gap-2">
                            {entry.concepts.map((concept) => (
                              <li key={concept}>
                                <Tag mono>{concept}</Tag>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="eyebrow">Related interests</p>
                          <ul className="mt-2.5 flex flex-wrap gap-2">
                            {entry.interests.map((id) => {
                              const interest = researchInterests.find((x) => x.id === id)
                              if (!interest) return null
                              return (
                                <li key={id}>
                                  <Tag tone="quiet">{interest.label}</Tag>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleEntry(entry.id)}
                        aria-expanded={isOpen}
                        // The panel is unmounted when closed, so the reference is
                        // only advertised while it actually exists.
                        aria-controls={isOpen ? panelId : undefined}
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.72rem] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            'size-3.5 transition-transform duration-300',
                            isOpen && 'rotate-180',
                          )}
                        />
                        {isOpen ? 'Hide figure' : 'Show figure'}
                      </button>
                    </div>
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
                        <div className="border-t border-line px-5 pt-6 pb-6 sm:px-6">
                          <EntryVisual kind={entry.visual} />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      </div>
    </Section>
  )
}
