import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'
import { navigation } from '../../data/navigation'

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-ink">{profile.name}</p>
          <p className="mt-1 text-xs text-muted">
            {profile.roles.join(' · ')}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
          {navigation.slice(1, 7).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#home"
          className="hairline inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ArrowUp aria-hidden="true" className="size-3.5" />
          Back to top
        </a>
      </div>
    </footer>
  )
}
