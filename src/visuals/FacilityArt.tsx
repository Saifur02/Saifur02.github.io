import { motion, useReducedMotion } from 'motion/react'

/**
 * Line-art elevations for the two industrial attachments: a thermal power
 * station and a research reactor. Schematic silhouettes only — no plant data.
 */
export function FacilityArt({ kind }: { kind: 'power-plant' | 'reactor' }) {
  const reduced = useReducedMotion()

  if (kind === 'power-plant') {
    return (
      <svg
        viewBox="0 0 200 110"
        className="h-28 w-full text-muted sm:h-32"
        role="img"
        aria-label="Line drawing of a thermal power station: cooling tower, boiler house and transmission pylon."
      >
        {/* steam */}
        {!reduced &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={46 + i * 5}
              r={4 + i}
              fill="rgba(148,163,184,0.16)"
              initial={{ cy: 34, opacity: 0 }}
              animate={{ cy: [34, 10], opacity: [0, 0.7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: i * 1.4, ease: 'easeOut' }}
            />
          ))}

        {/* cooling tower */}
        <path
          d="M30 96 C34 70 34 56 36 38 L58 38 C60 56 60 70 64 96 Z"
          fill="rgba(148,163,184,0.05)"
          stroke="currentColor"
          strokeOpacity="0.55"
        />
        {/* boiler house */}
        <path d="M76 96 V58 H124 V96" fill="rgba(148,163,184,0.05)" stroke="currentColor" strokeOpacity="0.55" />
        <path d="M76 70 H124" stroke="currentColor" strokeOpacity="0.25" />
        {/* stack */}
        <path d="M110 58 V30 H118 V58" fill="none" stroke="currentColor" strokeOpacity="0.55" />
        {/* pylon */}
        <path
          d="M158 96 V34 M150 96 L166 96 M150 50 L166 50 M152 62 L164 62 M144 44 H172"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.6"
        />
        {/* transmission line */}
        <motion.path
          d="M118 40 C136 46 142 42 144 44"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.7"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
        />
        {/* ground */}
        <path d="M14 96 H190" stroke="currentColor" strokeOpacity="0.35" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 200 110"
      className="h-28 w-full text-muted sm:h-32"
      role="img"
      aria-label="Line drawing of a research reactor: containment dome, reactor core and control rods."
    >
      {/* containment */}
      <path
        d="M56 96 V52 A44 44 0 0 1 144 52 V96 Z"
        fill="rgba(148,163,184,0.05)"
        stroke="currentColor"
        strokeOpacity="0.55"
      />
      {/* vessel */}
      <rect x="84" y="52" width="32" height="38" rx="4" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeOpacity="0.6" />
      {/* control rods */}
      {[90, 100, 110].map((x, i) => (
        <motion.line
          key={x}
          x1={x}
          x2={x}
          y1={40}
          stroke="#a78bfa"
          strokeOpacity="0.75"
          strokeWidth="1.6"
          initial={{ y2: 58 }}
          animate={reduced ? { y2: 70 } : { y2: [58, 78, 58] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}
      {/* core glow */}
      <motion.circle
        cx="100"
        cy="82"
        r="7"
        fill="#22d3ee"
        animate={reduced ? { opacity: 0.35 } : { opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* coolant loop */}
      <path
        d="M116 70 H150 V90 H60 V70 H84"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeDasharray="3 4"
      />
      <path d="M14 96 H190" stroke="currentColor" strokeOpacity="0.35" />
    </svg>
  )
}
