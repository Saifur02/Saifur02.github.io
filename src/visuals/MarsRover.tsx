import { motion, useReducedMotion } from 'motion/react'

/**
 * Rover elevation on regolith, for the IUT Mars Rover team entry. The wheels
 * turn and the mast antenna pulses; nothing about the vehicle's capabilities is
 * asserted beyond the CV's line about team membership.
 */
export function MarsRover() {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="0 0 200 108"
      className="w-full"
      role="img"
      aria-label="Line drawing of a six-wheeled rover on rocky terrain with a communications mast."
    >
      {/* horizon and terrain */}
      <path
        d="M0 88 C28 82 44 92 70 86 C96 80 118 90 146 84 C170 79 186 88 200 84 L200 108 L0 108 Z"
        fill="rgba(167,139,250,0.06)"
        stroke="rgba(148,163,184,0.3)"
      />
      {[
        [24, 96],
        [122, 98],
        [172, 94],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.5" fill="rgba(148,163,184,0.35)" />
      ))}

      {/* chassis */}
      <g>
        <rect x="66" y="46" width="68" height="20" rx="4" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeOpacity="0.6" />
        {/* solar / equipment deck */}
        <rect x="72" y="38" width="56" height="8" rx="2" fill="rgba(99,102,241,0.16)" stroke="rgba(99,102,241,0.6)" />
        {/* mast */}
        <path d="M120 38 V22" stroke="rgba(148,163,184,0.6)" strokeWidth="1.4" />
        <circle cx="120" cy="20" r="3" fill="none" stroke="#a78bfa" strokeWidth="1.4" />
        {!reduced &&
          [0, 1].map((i) => (
            <motion.circle
              key={i}
              cx="120"
              cy="20"
              r="3"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: [1, 3], opacity: [0.7, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }}
              style={{ transformOrigin: '120px 20px' }}
            />
          ))}

        {/* rocker-bogie arms */}
        <path d="M74 66 L84 76 M100 66 L100 76 M126 66 L116 76" stroke="rgba(148,163,184,0.55)" strokeWidth="1.4" fill="none" />

        {/* wheels */}
        {[84, 100, 116].map((cx) => (
          <motion.g
            key={cx}
            style={{ transformOrigin: `${cx}px 78px` }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx={cx} cy="78" r="7" fill="rgba(15,23,42,0.9)" stroke="#22d3ee" strokeOpacity="0.6" />
            <path d={`M${cx - 7} 78 H${cx + 7} M${cx} 71 V85`} stroke="rgba(148,163,184,0.5)" strokeWidth="1" />
          </motion.g>
        ))}
      </g>
    </svg>
  )
}
