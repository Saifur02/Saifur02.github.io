import { motion } from 'motion/react'
import { publications, authorAliases } from '../data/publications'
import { Section } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { RevealGroup } from '../components/ui/Reveal'
import { ExternalLink } from '../components/ui/ExternalLink'
import { fadeUp } from '../lib/motion'
import { cn } from '../lib/cn'
import type { Publication } from '../types'

const KIND_LABEL: Record<Publication['kind'], string> = {
  journal: 'Journal Article',
  conference: 'Conference Proceedings',
}

/** Metadata rows differ by publication kind; only fields present in the CV are rendered. */
function metadata(publication: Publication): { label: string; value: string; mono?: boolean }[] {
  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: publication.kind === 'journal' ? 'Journal' : 'Conference', value: publication.venue },
  ]
  if (publication.location) rows.push({ label: 'Location', value: publication.location })
  rows.push({ label: 'Year', value: publication.year, mono: true })
  if (publication.articleNumber)
    rows.push({ label: 'Article', value: publication.articleNumber, mono: true })
  if (publication.pages) rows.push({ label: 'Pages', value: publication.pages, mono: true })
  if (publication.issn) rows.push({ label: 'ISSN', value: publication.issn, mono: true })
  rows.push({ label: 'DOI', value: publication.doi, mono: true })
  return rows
}

export function Publications() {
  return (
    <Section
      id="publications"
      labelledBy="publications-heading"
      className="border-y border-line bg-bg-2/50"
    >
      <SectionHeader
        index="04"
        headingId="publications-heading"
        title="Publications"
        lede="Peer-reviewed work in a data journal and an international conference proceedings."
      />

      <RevealGroup as="ol" className="divide-y divide-line" step={0.12}>
        {publications.map((publication, i) => (
          <motion.li key={publication.id} variants={fadeUp} className="py-8 first:pt-0 last:pb-0">
            {/* min-w-0 on both columns: without it the long DOI sets a min-content
                width that pushes the grid past a 320px viewport. */}
            <article className="grid gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-accent">
                    P-{String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase',
                      publication.kind === 'journal'
                        ? 'border-accent/40 text-accent'
                        : 'border-highlight/40 text-highlight',
                    )}
                  >
                    {KIND_LABEL[publication.kind]}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl leading-snug text-ink sm:text-[1.6rem] sm:leading-[1.3]">
                  {publication.title}
                </h3>

                {/* Author list — the portfolio owner is emphasised, order preserved */}
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {publication.authors.map((author, index) => {
                    const isOwner = authorAliases.includes(author)
                    return (
                      <span key={author}>
                        <span className={isOwner ? 'font-semibold text-ink' : undefined}>
                          {author}
                        </span>
                        {index < publication.authors.length - 1 ? ', ' : ''}
                      </span>
                    )
                  })}
                </p>

                <div className="mt-6">
                  <ExternalLink
                    href={publication.doiUrl}
                    className="hairline rounded-full px-4 py-2 text-sm hover:border-accent/50"
                  >
                    View DOI
                  </ExternalLink>
                </div>
              </div>

              {/* Metadata block, set like a journal masthead */}
              <dl className="min-w-0 divide-y divide-line/70 rounded-xl border border-line bg-white/[0.015] px-4 py-1">
                {metadata(publication).map((row) => (
                  <div key={row.label} className="flex gap-4 py-2.5">
                    <dt className="w-20 shrink-0 font-mono text-[0.65rem] tracking-[0.1em] text-muted uppercase">
                      {row.label}
                    </dt>
                    <dd
                      className={cn(
                        'min-w-0 flex-1 text-[0.8rem] leading-snug break-words text-ink/90',
                        // Identifiers have no spaces to wrap at.
                        row.mono && 'font-mono text-[0.75rem] break-all',
                      )}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </motion.li>
        ))}
      </RevealGroup>
    </Section>
  )
}
