import { Check, Copy, Download, Linkedin, Mail, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { ExternalLink } from '../components/ui/ExternalLink'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { asset } from '../lib/asset'

export function Contact() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      backdrop={
        <>
          <div
            aria-hidden="true"
            className="lattice pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(60%_70%_at_50%_100%,black,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(34,211,238,0.09),transparent_70%)]"
          />
        </>
      }
    >
      <SectionHeader
        index="13"
        headingId="contact-heading"
        title="Open to research collaboration"
        lede="Graduate positions, research collaborations and teaching enquiries are all welcome."
        align="center"
      />

      <Reveal>
        <div className="mx-auto max-w-3xl">
          {/* Terminal-style contact panel */}
          <div className="panel overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent/60" />
              <span aria-hidden="true" className="size-2 rounded-full bg-accent-2/60" />
              <span aria-hidden="true" className="size-2 rounded-full bg-highlight/60" />
              <span className="ml-2 font-mono text-[0.65rem] tracking-wide text-muted">
                contact — {profile.name.toLowerCase().replace(/[^a-z]+/g, '-')}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono text-[0.8rem] text-muted">
                <span className="text-accent">$</span> reach out
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-3.5 w-[2px] translate-y-[2px] bg-accent [animation:caret_1.1s_step-end_infinite]"
                />
              </p>

              <ul className="mt-6 space-y-px overflow-hidden rounded-lg border border-line">
                <li className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] px-4 py-3.5">
                  <span className="flex min-w-0 items-center gap-3">
                    <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="min-w-0 truncate font-mono text-[0.82rem] text-ink transition-colors hover:text-accent"
                    >
                      {profile.email}
                    </a>
                  </span>
                  <button
                    type="button"
                    onClick={() => void copy(profile.email)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.7rem] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {copied ? (
                      <>
                        <Check aria-hidden="true" className="size-3.5 text-accent" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" className="size-3.5" />
                        Copy
                      </>
                    )}
                    <span className="sr-only"> email address</span>
                  </button>
                  <span aria-live="polite" className="sr-only">
                    {copied ? 'Email address copied to clipboard' : ''}
                  </span>
                </li>

                <li className="flex items-center gap-3 bg-white/[0.02] px-4 py-3.5">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  <a
                    href={profile.phoneHref}
                    className="font-mono text-[0.82rem] text-ink transition-colors hover:text-accent"
                  >
                    {profile.phone}
                  </a>
                </li>

                <li className="flex items-center gap-3 bg-white/[0.02] px-4 py-3.5">
                  <Linkedin aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  <ExternalLink href={profile.linkedinHref} className="font-mono text-[0.82rem]">
                    {profile.linkedinLabel}
                  </ExternalLink>
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <MagneticButton href={`mailto:${profile.email}`} ariaLabel="Send an email">
                  <Mail aria-hidden="true" className="size-4" />
                  Send an email
                </MagneticButton>
                <MagneticButton
                  href={asset(profile.cvFile)}
                  download
                  variant="ghost"
                  ariaLabel="Download CV as PDF"
                >
                  <Download aria-hidden="true" className="size-4" />
                  Download CV
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
