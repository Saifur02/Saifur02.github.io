import { navigation } from '../../data/navigation'
import type { SectionId } from '../../types'
import { cn } from '../../lib/cn'

interface SectionRailProps {
  active: SectionId
}

/**
 * Vertical index rail — the site's primary desktop navigation.
 *
 * Thirteen sections do not fit across a horizontal bar without shrinking to
 * unreadable text, so on wide screens they become a numbered rail on the right
 * edge that reveals its label on hover or focus. Reads like the index tabs of a
 * lab notebook.
 */
export function SectionRail({ active }: SectionRailProps) {
  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-1.5">
        {navigation.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center justify-end gap-2 rounded-full py-1 pr-1 pl-2"
              >
                <span
                  className={cn(
                    'font-mono text-[0.68rem] tracking-tight transition-all duration-300',
                    isActive
                      ? 'text-accent opacity-100'
                      : 'text-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                  )}
                >
                  {item.index} {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'block h-px transition-all duration-300',
                    isActive
                      ? 'w-7 bg-linear-to-r from-accent to-accent-2'
                      : 'w-3.5 bg-muted/50 group-hover:w-5 group-hover:bg-accent/70',
                  )}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
