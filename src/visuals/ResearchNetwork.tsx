import { motion, useReducedMotion } from 'motion/react'
import type { ResearchInterest } from '../types'
import { cn } from '../lib/cn'

interface ResearchNetworkProps {
  interests: ResearchInterest[]
  activeId: string | null
  onSelect: (id: string) => void
}

/**
 * Radial map of the five research interests. Edges run hub → node and node →
 * neighbour, so the five fields read as one connected programme rather than a
 * list. Nodes are real buttons: selecting one filters the research entries
 * below.
 *
 * Positions are computed once from the node count, so adding a sixth interest
 * needs no layout maths.
 */
export function ResearchNetwork({ interests, activeId, onSelect }: ResearchNetworkProps) {
  const reduced = useReducedMotion()
  const count = interests.length

  // Radius as a percentage of the box. Kept at 33 so the widest node still sits
  // inside the container at a 320px viewport — no horizontal overflow.
  const RADIUS = 33

  const points = interests.map((interest, i) => {
    // Start at the top and walk clockwise.
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    return {
      interest,
      // Percentages of the container box.
      left: 50 + Math.cos(angle) * RADIUS,
      top: 50 + Math.sin(angle) * RADIUS,
    }
  })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <defs>
          <radialGradient id="net-hub">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="14" fill="url(#net-hub)" />

        {/* Ring edges between neighbouring fields */}
        {points.map((point, i) => {
          const next = points[(i + 1) % count]
          return (
            <line
              key={`ring-${point.interest.id}`}
              x1={point.left}
              y1={point.top}
              x2={next.left}
              y2={next.top}
              stroke="rgba(148,163,184,0.16)"
              strokeWidth="0.22"
            />
          )
        })}

        {/* Spokes from the hub, highlighted when their node is selected */}
        {points.map((point) => {
          const isActive = activeId === point.interest.id
          return (
            <motion.line
              key={`spoke-${point.interest.id}`}
              x1={50}
              y1={50}
              x2={point.left}
              y2={point.top}
              stroke={isActive ? '#22d3ee' : 'rgba(148,163,184,0.28)'}
              strokeWidth={isActive ? 0.5 : 0.26}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0.75 }}
              transition={{ duration: 0.3 }}
            />
          )
        })}

        {/* Signal pulses travelling outward along each spoke */}
        {!reduced &&
          points.map((point, i) => (
            <motion.circle
              key={`pulse-${point.interest.id}`}
              r={0.8}
              fill="#22d3ee"
              initial={{ cx: 50, cy: 50, opacity: 0 }}
              animate={{
                cx: [50, point.left],
                cy: [50, point.top],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeOut',
                repeatDelay: 1.2,
              }}
            />
          ))}
      </svg>

      {/* Hub label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-mono text-[0.62rem] tracking-[0.2em] text-muted uppercase">Interests</p>
        <p className="mt-1 font-mono text-xl text-accent">{count}</p>
      </div>

      {/* Interest nodes */}
      {points.map(({ interest, left, top }) => {
        const isActive = activeId === interest.id
        return (
          <button
            key={interest.id}
            type="button"
            onClick={() => onSelect(interest.id)}
            aria-pressed={isActive}
            style={{ left: `${left}%`, top: `${top}%` }}
            className={cn(
              'group absolute w-[5.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border px-2 py-1.5 text-center transition-all duration-300 sm:w-[9.5rem] sm:px-2.5 sm:py-2',
              isActive
                ? 'border-accent/60 bg-accent/[0.1] shadow-[0_0_24px_-8px_rgba(34,211,238,0.55)]'
                : 'border-line bg-surface/80 hover:border-accent/40 hover:bg-surface',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'mx-auto mb-1.5 block size-1.5 rounded-full transition-colors',
                isActive ? 'bg-accent' : 'bg-muted/60 group-hover:bg-accent/70',
              )}
            />
            <span
              className={cn(
                'block text-[0.62rem] leading-tight font-medium transition-colors sm:text-[0.78rem]',
                isActive ? 'text-accent' : 'text-ink',
              )}
            >
              {interest.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
