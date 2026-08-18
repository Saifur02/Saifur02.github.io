import { motion } from 'motion/react'
import { extracurricular } from '../data/extracurricular'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { RevealGroup } from '../components/ui/Reveal'
import { fadeUp } from '../lib/motion'
import { TennisCourt } from '../visuals/TennisCourt'
import { MarsRover } from '../visuals/MarsRover'
import { cn } from '../lib/cn'
import type { ExtracurricularActivity } from '../types'

/** Award ribbon for the President's Scout Award — an abstract mark, not an emblem. */
function ScoutRibbon() {
  return (
    <svg
      viewBox="0 0 120 108"
      className="mx-auto h-28"
      role="img"
      aria-label="Abstract award medal with ribbon."
    >
      <path d="M44 60 L34 104 L52 94 L60 104 L68 94 L86 104 L76 60 Z" fill="rgba(167,139,250,0.14)" stroke="rgba(167,139,250,0.5)" />
      <motion.circle
        cx="60"
        cy="44"
        r="26"
        fill="rgba(250,204,21,0.09)"
        stroke="rgba(250,204,21,0.55)"
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <circle cx="60" cy="44" r="31" fill="none" stroke="rgba(250,204,21,0.2)" strokeDasharray="2 4" />
      {/* eight-point star */}
      {Array.from({ length: 8 }, (_, i) => i * 45).map((angle) => (
        <line
          key={angle}
          x1="60"
          y1="44"
          x2="60"
          y2="26"
          stroke="rgba(250,204,21,0.75)"
          strokeWidth="1.6"
          transform={`rotate(${angle} 60 44)`}
        />
      ))}
      <circle cx="60" cy="44" r="6" fill="rgba(250,204,21,0.75)" />
    </svg>
  )
}

/** PCB trace art for the design-and-fabrication contest. */
function PcbTraces() {
  return (
    <svg
      viewBox="0 0 200 96"
      className="w-full"
      role="img"
      aria-label="Printed circuit board trace pattern with pads and vias."
    >
      <rect x="6" y="6" width="188" height="84" rx="6" fill="rgba(34,197,94,0.04)" stroke="rgba(148,163,184,0.3)" />
      {[
        'M20 24 H70 L82 36 H128 L140 24 H180',
        'M20 48 H56 L68 60 H120 L132 48 H180',
        'M20 72 H92 L104 60 H152 L164 72 H180',
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
      {[
        [20, 24],
        [180, 24],
        [20, 48],
        [180, 48],
        [20, 72],
        [180, 72],
        [104, 60],
        [82, 36],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="rgba(15,23,42,1)" stroke="#22d3ee" strokeOpacity="0.7" />
      ))}
    </svg>
  )
}

function ActivityVisual({ activity }: { activity: ExtracurricularActivity }) {
  switch (activity.visual) {
    case 'tennis':
      return <TennisCourt />
    case 'scouts':
      return <ScoutRibbon />
    case 'mars-rover':
      return <MarsRover />
    case 'pcb':
      return <PcbTraces />
  }
}

/** Each card gets its own tint — this section deliberately leaves the lab palette. */
const CARD_STYLES: Record<string, string> = {
  'lawn-tennis': 'border-accent/25 bg-accent/[0.035] md:col-span-3',
  'bangladesh-scouts': 'border-amber-400/25 bg-amber-400/[0.035] md:col-span-2',
  'iut-mars-rover': 'border-highlight/25 bg-highlight/[0.04] md:col-span-2',
  'pcb-design-contest': 'border-emerald-400/25 bg-emerald-400/[0.03] md:col-span-3',
}

export function Extracurricular() {
  return (
    <Section
      id="extracurricular"
      labelledBy="extracurricular-heading"
      backdrop={
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(167,139,250,0.07),transparent_70%),radial-gradient(50%_50%_at_10%_80%,rgba(250,204,21,0.05),transparent_70%)]"
        />
      }
    >
      <SectionHeader
        index="11"
        headingId="extracurricular-heading"
        title="Beyond the lab"
        lede="Sport, service, robotics and hardware contests — leadership earned outside the classroom."
      />

      <RevealGroup as="ul" className="grid items-start gap-5 md:grid-cols-5" step={0.1}>
        {extracurricular.map((activity) => (
          <motion.li
            key={activity.id}
            variants={fadeUp}
            className={cn(
              'flex flex-col overflow-hidden rounded-3xl border p-6',
              CARD_STYLES[activity.id] ?? 'border-line md:col-span-2',
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl leading-tight text-ink sm:text-[1.4rem]">
                {activity.title}
              </h3>
              <span className="font-mono text-[0.72rem] text-muted">{activity.year}</span>
            </div>

            {/* Figures are capped so a wide card does not blow the drawing up to
                poster size. */}
            <div className="my-6 w-full max-w-sm self-center">
              <ActivityVisual activity={activity} />
            </div>

            <ul className="mt-auto space-y-2.5">
              {activity.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] block size-1 shrink-0 rounded-full bg-current text-muted"
                  />
                  <span className="text-[0.86rem] leading-relaxed text-ink/85">{point}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </RevealGroup>
    </Section>
  )
}
