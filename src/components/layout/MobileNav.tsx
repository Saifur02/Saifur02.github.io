import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { profile } from '../../data/profile'
import { asset } from '../../lib/asset'
import { easeOutSoft } from '../../lib/motion'
import type { SectionId } from '../../types'
import { cn } from '../../lib/cn'

interface MobileNavProps {
  open: boolean
  active: SectionId
  onClose: () => void
}

/**
 * Full-screen section index for narrow viewports. Deliberately a designed
 * panel — numbered rows at a comfortable tap size — rather than a shrunken
 * copy of the desktop rail.
 */
export function MobileNav({ open, active, onClose }: MobileNavProps) {
  const panel = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  // Lock page scroll and keep focus inside the panel while it is open.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panel.current) return

      const focusable = panel.current.querySelectorAll<HTMLElement>('a[href], button')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Section navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOutSoft }}
          className="fixed inset-0 z-70 flex flex-col bg-bg/97 backdrop-blur-xl xl:hidden"
        >
          <div className="lattice pointer-events-none absolute inset-0 opacity-[0.16]" />

          <div className="shell relative flex h-16 shrink-0 items-center justify-between">
            <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Index</span>
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="hairline flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <nav className="shell relative flex-1 overflow-y-auto pt-2 pb-8">
            <ul className="flex flex-col">
              {navigation.map((item, i) => {
                const isActive = item.id === active
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i + 0.05, duration: 0.3, ease: easeOutSoft }}
                    className="border-b border-line/60"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={onClose}
                      aria-current={isActive ? 'true' : undefined}
                      className="flex items-baseline gap-4 py-3.5"
                    >
                      <span
                        className={cn(
                          'font-mono text-[0.7rem]',
                          isActive ? 'text-accent' : 'text-muted',
                        )}
                      >
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          'text-xl font-medium tracking-tight',
                          isActive ? 'gradient-text' : 'text-ink',
                        )}
                      >
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <a
              href={asset(profile.cvFile)}
              download=""
              onClick={onClose}
              className="mt-7 flex items-center justify-center rounded-full bg-linear-135 from-accent to-accent-2 px-6 py-3.5 text-sm font-medium text-bg"
            >
              Download CV
            </a>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
