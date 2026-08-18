import { useEffect, useState } from 'react'
import { Download, Menu } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { profile } from '../../data/profile'
import { asset } from '../../lib/asset'
import type { SectionId } from '../../types'
import { cn } from '../../lib/cn'

interface NavbarProps {
  active: SectionId
  onOpenMenu: () => void
}

/** Sections promoted into the top bar on medium/large screens. */
const primary: SectionId[] = ['about', 'research', 'publications', 'projects', 'contact']

export function Navbar({ active, onOpenMenu }: NavbarProps) {
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeLabel = navigation.find((item) => item.id === active)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        lifted ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-3" aria-label="Back to top">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-md border border-accent/30 bg-accent/[0.08] font-mono text-[0.7rem] font-medium text-accent"
          >
            SR
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-ink sm:block">
            Md. Saifur Rahman
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigation
            .filter((item) => primary.includes(item.id))
            .map((item) => {
              const isActive = item.id === active
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-[0.8rem] transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3 -bottom-px h-px transition-opacity duration-300',
                      isActive
                        ? 'bg-linear-to-r from-accent to-accent-2 opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </a>
              )
            })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={asset(profile.cvFile)}
            download=""
            className="hairline hidden items-center gap-2 rounded-full px-4 py-2 text-[0.8rem] text-ink transition-colors hover:border-accent/50 hover:text-accent sm:inline-flex"
          >
            <Download aria-hidden="true" className="size-3.5" />
            CV
          </a>

          <button
            type="button"
            onClick={onOpenMenu}
            className="hairline flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8rem] text-ink transition-colors hover:border-accent/50 hover:text-accent xl:hidden"
            aria-label="Open section navigation"
          >
            <Menu aria-hidden="true" className="size-4" />
            <span className="font-mono text-[0.7rem] text-muted">{activeLabel?.index}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
