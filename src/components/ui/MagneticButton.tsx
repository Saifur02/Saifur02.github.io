import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '../../lib/cn'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  download?: boolean
  external?: boolean
  ariaLabel?: string
}

/**
 * Button/link that leans a few pixels toward the pointer. The pull is capped at
 * 6px so it reads as responsiveness rather than as a gimmick, and is disabled
 * outright under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  download = false,
  external = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 320, damping: 26 })
  const y = useSpring(rawY, { stiffness: 320, damping: 26 })

  const handleMove = (event: React.PointerEvent) => {
    if (reduced || !ref.current || event.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    rawX.set(Math.max(-6, Math.min(6, dx * 0.25)))
    rawY.set(Math.max(-6, Math.min(6, dy * 0.35)))
  }

  const reset = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 select-none'

  const styles =
    variant === 'primary'
      ? 'text-bg bg-linear-135 from-accent to-accent-2 hover:brightness-110'
      : 'text-ink hairline bg-white/[0.02] hover:border-accent/50 hover:text-accent'

  const shared = {
    ref: ref as never,
    className: cn(base, styles, className),
    style: { x, y },
    onPointerMove: handleMove,
    onPointerLeave: reset,
    onBlur: reset,
    'aria-label': ariaLabel,
  }

  if (href) {
    return (
      <motion.a
        {...shared}
        href={href}
        {...(download ? { download: '' } : {})}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button {...shared} type="button" onClick={onClick}>
      {children}
    </motion.button>
  )
}
