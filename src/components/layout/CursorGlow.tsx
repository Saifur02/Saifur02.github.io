import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/**
 * Soft light that trails the pointer, as if a probe station lamp were following
 * the cursor. Mouse-only, and never mounted for reduced-motion or touch users.
 */
export function CursorGlow() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const rawX = useMotionValue(-500)
  const rawY = useMotionValue(-500)
  const x = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (reduced) return
    // Only devices with a real hovering pointer get the glow.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    setEnabled(true)
    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX)
      rawY.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, rawX, rawY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
    >
      <div className="size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.07)_0%,rgba(99,102,241,0.05)_38%,transparent_68%)]" />
    </motion.div>
  )
}
