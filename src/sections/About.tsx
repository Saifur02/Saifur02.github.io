import { Linkedin, Mail, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { experience } from '../data/experience'
import { education } from '../data/education'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Reveal } from '../components/ui/Reveal'
import { ExternalLink } from '../components/ui/ExternalLink'
import { asset } from '../lib/asset'

const current = experience[0]
const degree = education[education.length - 1]

export function About() {
  return (
    <Section
      id="about"
      labelledBy="about-heading"
      backdrop={
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-bg via-bg-2/40 to-bg"
        />
      }
    >
      <SectionHeader
        index="02"
        headingId="about-heading"
        title="A researcher’s profile"
        lede="An engineer working on ultra-scaled devices, and where he intends to take that work."
      />

      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        {/* Editorial column. On narrow screens it follows the portrait rail, so a
            visitor sees the face and the contact details before the long read. */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            {/* Circuit-trace rule in place of a plain divider */}
            <svg
              aria-hidden="true"
              viewBox="0 0 240 12"
              className="mb-8 h-3 w-40 text-accent/70"
              fill="none"
              stroke="currentColor"
            >
              <path d="M0 6h58l8-5h34l8 5h44l8 5h34l8-5h38" strokeWidth="1.2" />
              <circle cx="66" cy="1" r="2" fill="currentColor" stroke="none" />
              <circle cx="186" cy="1" r="2" fill="currentColor" stroke="none" />
            </svg>

            <p className="font-display text-[1.32rem] leading-[1.62] text-ink/95 sm:text-[1.45rem] sm:leading-[1.6]">
              {profile.intro}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="border-l border-line pl-5">
                <p className="eyebrow">Presently</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {current.role}
                  <span className="block text-muted">{current.organization}</span>
                  <span className="mt-1 block font-mono text-[0.7rem] text-muted">
                    {current.period}
                  </span>
                </p>
              </div>
              <div className="border-l border-line pl-5">
                <p className="eyebrow">Qualified</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {degree.qualification}
                  <span className="block text-muted">{degree.institution}</span>
                  <span className="mt-1 block font-mono text-[0.7rem] text-muted">
                    {degree.year} · {degree.gradeLabel} {degree.grade}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Identity rail */}
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="panel relative overflow-hidden p-6 sm:p-7">
            <div
              aria-hidden="true"
              className="blueprint pointer-events-none absolute inset-0 opacity-40"
            />
            <div className="relative">
              {/* The portrait's own background is near-black, so a bottom fade lets
                  it sit inside the panel instead of on top of it. */}
              <figure className="relative -mx-6 -mt-6 mb-6 sm:-mx-7 sm:-mt-7">
                <img
                  src={asset(profile.portrait.file)}
                  alt={profile.portrait.alt}
                  width={profile.portrait.width}
                  height={profile.portrait.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-[53%_12%]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-surface/25 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
                />
              </figure>

              <p className="eyebrow">Identity</p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-ink">{profile.name}</p>
              <p className="mt-1 text-sm text-muted">{profile.roles.join(' · ')}</p>

              <dl className="mt-7 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <dt className="text-[0.7rem] tracking-wide text-muted uppercase">Email</dt>
                    <dd className="mt-0.5 break-all">
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-ink transition-colors hover:text-accent"
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div>
                    <dt className="text-[0.7rem] tracking-wide text-muted uppercase">Phone</dt>
                    <dd className="mt-0.5">
                      <a
                        href={profile.phoneHref}
                        className="font-mono text-ink transition-colors hover:text-accent"
                      >
                        {profile.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Linkedin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <dt className="text-[0.7rem] tracking-wide text-muted uppercase">LinkedIn</dt>
                    <dd className="mt-0.5 break-all">
                      <ExternalLink href={profile.linkedinHref}>
                        {profile.linkedinLabel}
                      </ExternalLink>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-7 border-t border-line pt-5">
                <p className="eyebrow">Focus</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {profile.focusAreas.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
