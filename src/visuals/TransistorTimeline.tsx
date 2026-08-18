import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { transistorEvolution } from '../data/research'
import { cn } from '../lib/cn'

/**
 * Evolution track: Early Devices → MOSFETs → FinFETs → GAAFETs.
 *
 * The connecting line fills as the figure scrolls through the viewport, so the
 * progression is felt rather than merely listed. Each stage carries a small
 * device glyph whose geometry matches the real architecture — planar slab,
 * fins, wrapped nanosheets.
 */

function Glyph({ kind, active }: { kind: string; active: boolean }) {
  const stroke = active ? '#22d3ee' : 'rgba(148,163,184,0.65)'
  const fill = active ? 'rgba(34,211,238,0.14)' : 'rgba(148,163,184,0.07)'

  return (
    <svg viewBox="0 0 64 44" className="h-11 w-16" aria-hidden="true">
      {kind === 'early' && (
        <>
          {/* point-contact style: a slab with two probes */}
          <rect x="10" y="24" width="44" height="12" rx="2" fill={fill} stroke={stroke} />
          <path d="M22 24 L18 10 M42 24 L46 10" stroke={stroke} strokeWidth="1.4" fill="none" />
          <circle cx="18" cy="9" r="2" fill={stroke} />
          <circle cx="46" cy="9" r="2" fill={stroke} />
        </>
      )}
      {kind === 'mosfet' && (
        <>
          {/* planar: single channel, gate on top only */}
          <rect x="6" y="26" width="52" height="10" rx="2" fill={fill} stroke={stroke} />
          <rect x="22" y="14" width="20" height="12" rx="2" fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.7)" />
          <path d="M6 36 h52" stroke={stroke} strokeWidth="1" opacity="0.6" />
        </>
      )}
      {kind === 'finfet' && (
        <>
          {/* three vertical fins crossed by a gate */}
          {[16, 30, 44].map((x) => (
            <rect key={x} x={x} y="12" width="6" height="24" rx="2" fill={fill} stroke={stroke} />
          ))}
          <rect x="8" y="18" width="48" height="9" rx="3" fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.7)" />
        </>
      )}
      {kind === 'gaafet' && (
        <>
          {/* stacked nanosheets fully enclosed by the gate */}
          {[13, 22, 31].map((y) => (
            <rect key={y} x="10" y={y} width="44" height="6" rx="3" fill={fill} stroke={stroke} />
          ))}
          <rect x="22" y="6" width="20" height="32" rx="7" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="1.4" />
        </>
      )}
    </svg>
  )
}

export function TransistorTimeline() {
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start 85%', 'end 55%'],
  })
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={track}>
      <div className="relative">
        {/* Track line */}
        <div
          aria-hidden="true"
          className="absolute top-6 left-0 hidden h-px w-full bg-line sm:block"
        />
        <motion.div
          aria-hidden="true"
          style={{ width: reduced ? '100%' : fill }}
          className="absolute top-6 left-0 hidden h-px bg-linear-to-r from-accent to-highlight sm:block"
        />

        <ol className="grid gap-6 sm:grid-cols-4 sm:gap-3">
          {transistorEvolution.map((stage, i) => {
            const active = hovered === stage.id || (hovered === null && i === transistorEvolution.length - 1)
            return (
              <li
                key={stage.id}
                onMouseEnter={() => setHovered(stage.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative"
              >
                <div className="mb-3 flex items-center gap-3 sm:block">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'relative z-1 block size-3 shrink-0 rounded-full border-2 transition-colors duration-300 sm:mb-4 sm:ml-1',
                      active ? 'border-accent bg-accent/40' : 'border-muted/60 bg-bg',
                    )}
                    style={{ marginTop: '0.15rem' }}
                  />
                  <span className="font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase sm:hidden">
                    Stage {i + 1}
                  </span>
                </div>

                <div
                  className={cn(
                    'rounded-xl border p-3.5 transition-colors duration-300',
                    active ? 'border-accent/40 bg-accent/[0.04]' : 'border-line bg-white/[0.015]',
                  )}
                >
                  <Glyph kind={stage.id} active={active} />
                  <p
                    className={cn(
                      'mt-2.5 text-sm font-medium transition-colors',
                      active ? 'text-accent' : 'text-ink',
                    )}
                  >
                    {stage.label}
                  </p>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted">{stage.note}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
