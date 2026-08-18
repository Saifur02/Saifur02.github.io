import { motion, useReducedMotion } from 'motion/react'

/**
 * Court plan with a rally traced across it. Warmer and softer than the lab
 * figures elsewhere — this section is meant to feel human.
 */
export function TennisCourt() {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="0 0 200 108"
      className="w-full"
      role="img"
      aria-label="Plan view of a tennis court with a rally traced between the baselines."
    >
      {/* court surface */}
      <rect x="16" y="10" width="168" height="88" rx="2" fill="rgba(34,211,238,0.05)" stroke="rgba(148,163,184,0.4)" />
      {/* doubles alleys */}
      <line x1="16" y1="22" x2="184" y2="22" stroke="rgba(148,163,184,0.3)" />
      <line x1="16" y1="86" x2="184" y2="86" stroke="rgba(148,163,184,0.3)" />
      {/* service boxes */}
      <line x1="52" y1="22" x2="52" y2="86" stroke="rgba(148,163,184,0.3)" />
      <line x1="148" y1="22" x2="148" y2="86" stroke="rgba(148,163,184,0.3)" />
      <line x1="52" y1="54" x2="148" y2="54" stroke="rgba(148,163,184,0.3)" />
      {/* net */}
      <line x1="100" y1="6" x2="100" y2="102" stroke="#a78bfa" strokeOpacity="0.7" strokeWidth="1.6" />
      <line x1="100" y1="6" x2="100" y2="102" stroke="#a78bfa" strokeOpacity="0.25" strokeWidth="5" />

      {/* serve trajectory: baseline → over the net → service box */}
      <motion.path
        d="M32 78 Q88 30 148 40"
        fill="none"
        stroke="rgba(34,211,238,0.4)"
        strokeDasharray="3 5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      {/* bounce marks */}
      {[
        [32, 78],
        [148, 40],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="2" fill="rgba(34,211,238,0.5)" />
      ))}

      {/* ball travelling the trajectory */}
      {reduced ? (
        <circle cx="92" cy="44" r="3.4" fill="#facc15" />
      ) : (
        <motion.circle
          r="3.4"
          fill="#facc15"
          initial={{ cx: 32, cy: 78, opacity: 0 }}
          animate={{
            cx: [32, 90, 148],
            cy: [78, 42, 40],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.6,
            times: [0, 0.45, 1],
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: 'easeOut',
          }}
        />
      )}
    </svg>
  )
}
