import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

/**
 * Si vs MoS₂ gate-all-around channel comparison.
 *
 * Strictly qualitative: the CV reports a direction of improvement, not values,
 * so this figure shows direction only — an arrow pointing from the Si column to
 * the MoS₂ column for each attribute the CV names. No axes, no numbers, no
 * invented simulation output.
 */

const ATTRIBUTES = [
  { label: 'Electrostatic control', verdict: 'superior' },
  { label: 'Drive current', verdict: 'higher' },
  { label: 'Ion/Ioff ratio', verdict: 'better' },
]

function Device({ tone, label, sublabel }: { tone: 'si' | 'mos2'; label: string; sublabel: string }) {
  const accent = tone === 'mos2' ? '#22d3ee' : '#94a3b8'
  const isMos2 = tone === 'mos2'

  return (
    <div
      className={
        isMos2
          ? 'rounded-xl border border-accent/40 bg-accent/[0.05] p-4'
          : 'rounded-xl border border-line bg-white/[0.02] p-4'
      }
    >
      <svg viewBox="0 0 160 104" className="w-full" role="img" aria-label={`${label} channel schematic`}>
        {/* source / drain */}
        <rect x="6" y="24" width="18" height="56" rx="3" fill="rgba(148,163,184,0.16)" stroke="rgba(148,163,184,0.4)" />
        <rect x="136" y="24" width="18" height="56" rx="3" fill="rgba(148,163,184,0.16)" stroke="rgba(148,163,184,0.4)" />
        {/* stacked channels */}
        {[34, 48, 62].map((y) => (
          <rect
            key={y}
            x="24"
            y={y}
            width="112"
            height="9"
            rx="4.5"
            fill={accent}
            fillOpacity={isMos2 ? 0.22 : 0.12}
            stroke={accent}
            strokeOpacity={0.75}
            strokeWidth="1"
          />
        ))}
        {/* wrap-around gate */}
        <rect
          x="62"
          y="16"
          width="36"
          height="72"
          rx="9"
          fill="rgba(167,139,250,0.06)"
          stroke="rgba(167,139,250,0.65)"
          strokeWidth="1.2"
        />
        <text x="80" y="12" textAnchor="middle" className="fill-muted font-mono" fontSize="7.5">
          GATE
        </text>
        <text x="80" y="100" textAnchor="middle" fill={accent} className="font-mono" fontSize="8">
          {sublabel}
        </text>
      </svg>

      <p
        className={
          isMos2
            ? 'mt-2 text-center text-sm font-medium text-accent'
            : 'mt-2 text-center text-sm font-medium text-ink'
        }
      >
        {label}
      </p>
    </div>
  )
}

export function GaafetCompare() {
  const reduced = useReducedMotion()

  return (
    <div>
      <div className="grid items-start gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Device tone="si" label="Si channel" sublabel="SILICON" />

        <div className="flex flex-col justify-center gap-3 sm:pt-10">
          {ATTRIBUTES.map((attribute, i) => (
            <motion.div
              key={attribute.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <motion.span
                aria-hidden="true"
                animate={reduced ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                className="text-accent"
              >
                <ArrowRight className="size-4" />
              </motion.span>
              <span className="text-[0.72rem] leading-tight text-muted">
                {attribute.label}
                <span className="ml-1 text-accent">{attribute.verdict}</span>
              </span>
            </motion.div>
          ))}
        </div>

        <Device tone="mos2" label="MoS₂ channel" sublabel="MoS₂" />
      </div>

      <p className="mt-4 font-mono text-[0.65rem] leading-relaxed text-muted">
        Schematic comparison. Direction of improvement as reported in the study; no numerical
        results are shown.
      </p>
    </div>
  )
}
