import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { OctagonX, RotateCcw, RotateCw } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * DC motor control panel mirroring the project's feature set: either direction,
 * a user-set speed, an emergency stop and limit switches. Interactive so the
 * behaviour is visible rather than described.
 */

const SPEEDS = [1, 2, 3, 4] as const

export function MotorControl() {
  const reduced = useReducedMotion()
  const [direction, setDirection] = useState<1 | -1>(1)
  const [speed, setSpeed] = useState<number>(2)
  const [stopped, setStopped] = useState(false)

  const running = !stopped && !reduced
  const revolution = 3.2 / speed // seconds per turn

  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
      {/* Rotor */}
      <div className="mx-auto">
        <svg viewBox="0 0 120 120" className="size-32" role="img" aria-label={stopped ? 'Motor stopped' : `Motor running ${direction === 1 ? 'clockwise' : 'counter-clockwise'} at speed ${speed} of 4`}>
          <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
          <circle cx="60" cy="60" r="34" fill="rgba(15,23,42,0.7)" stroke="rgba(148,163,184,0.3)" />

          {/* Limit switch markers */}
          {[-1, 1].map((side) => (
            <g key={side}>
              <line
                x1={60 + side * 46}
                y1="60"
                x2={60 + side * 54}
                y2="60"
                stroke={stopped ? '#a78bfa' : 'rgba(148,163,184,0.5)'}
                strokeWidth="2"
              />
            </g>
          ))}

          <motion.g
            style={{ transformOrigin: '60px 60px' }}
            animate={running ? { rotate: direction * 360 } : { rotate: 0 }}
            transition={
              running
                ? { duration: revolution, repeat: Infinity, ease: 'linear' }
                : { duration: 0.4 }
            }
          >
            {[0, 60, 120].map((angle) => (
              <rect
                key={angle}
                x="58"
                y="26"
                width="4"
                height="68"
                rx="2"
                fill={stopped ? 'rgba(148,163,184,0.4)' : '#22d3ee'}
                fillOpacity={stopped ? 0.4 : 0.75}
                transform={`rotate(${angle} 60 60)`}
              />
            ))}
            <circle cx="60" cy="60" r="7" fill="#0f172a" stroke={stopped ? 'rgba(148,163,184,0.5)' : '#22d3ee'} />
          </motion.g>

          <text x="60" y="112" textAnchor="middle" className="fill-muted font-mono" fontSize="8">
            {stopped ? 'E-STOP ENGAGED' : 'RUNNING'}
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <p className="eyebrow">Direction</p>
          <div className="mt-2 flex gap-2">
            {([1, -1] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setDirection(value)
                  setStopped(false)
                }}
                aria-pressed={direction === value && !stopped}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.72rem] transition-colors',
                  direction === value && !stopped
                    ? 'border-accent/60 bg-accent/10 text-accent'
                    : 'border-line text-muted hover:border-accent/40 hover:text-ink',
                )}
              >
                {value === 1 ? (
                  <RotateCw aria-hidden="true" className="size-3.5" />
                ) : (
                  <RotateCcw aria-hidden="true" className="size-3.5" />
                )}
                {value === 1 ? 'Clockwise' : 'Counter'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Speed set by user</p>
          <div className="mt-2 flex gap-1.5">
            {SPEEDS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setSpeed(value)
                  setStopped(false)
                }}
                aria-pressed={speed === value}
                aria-label={`Speed ${value} of 4`}
                className={cn(
                  'h-8 w-9 rounded-md border font-mono text-[0.72rem] transition-colors',
                  speed === value
                    ? 'border-accent/60 bg-accent/10 text-accent'
                    : 'border-line text-muted hover:border-accent/40 hover:text-ink',
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStopped((value) => !value)}
          aria-pressed={stopped}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.75rem] font-medium transition-colors',
            stopped
              ? 'border-highlight/60 bg-highlight/10 text-highlight'
              : 'border-line text-muted hover:border-highlight/50 hover:text-highlight',
          )}
        >
          <OctagonX aria-hidden="true" className="size-4" />
          {stopped ? 'Release emergency stop' : 'Emergency stop'}
        </button>
      </div>
    </div>
  )
}
