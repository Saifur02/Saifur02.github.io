/**
 * Shared shapes for every module in `src/data`.
 *
 * These types are deliberately narrow. There is no `proficiency`, `level`,
 * `citations`, `hIndex`, or `repoUrl` field anywhere, because the CV supplies
 * no such data — making invented metrics unrepresentable rather than merely
 * discouraged.
 */

export type SectionId =
  | 'home'
  | 'about'
  | 'research'
  | 'publications'
  | 'projects'
  | 'experience'
  | 'education'
  | 'skills'
  | 'training'
  | 'awards'
  | 'extracurricular'
  | 'referees'
  | 'contact'

export interface NavItem {
  /** Two-digit index shown in the navigation and section headers. */
  index: string
  id: SectionId
  label: string
}

export interface Profile {
  name: string
  /** Hero headline — spec §16. */
  headline: string
  roles: string[]
  focusAreas: string[]
  /** Full CV introduction, verbatim. */
  intro: string
  phone: string
  phoneHref: string
  email: string
  linkedinLabel: string
  linkedinHref: string
  /** File name inside `public/`; resolved through `lib/asset.ts`. */
  cvFile: string
  /** Portrait in `public/`, with its intrinsic size so the layout never shifts. */
  portrait: { file: string; width: number; height: number; alt: string }
  /**
   * Head-and-shoulders crop of the portrait, pre-cut at 4x its 48px display size.
   * A separate file rather than a CSS zoom: scaling the full portrait down to
   * avatar size in one step renders it soft.
   */
  avatar: { file: string; width: number; height: number }
}

export interface Experience {
  organization: string
  role: string
  period: string
  ongoing: boolean
  duties: string[]
  courses: string[]
}

export interface Education {
  institution: string
  location?: string
  qualification: string
  stream?: string
  year: string
  gradeLabel: string
  grade: string
  /** Numerator/denominator of the grade, for the dial visual only. */
  gradeValue: number
  gradeMax: number
  rank?: string
}

export interface ResearchInterest {
  id: string
  label: string
  blurb: string
}

export interface ResearchEntry {
  id: string
  title: string
  /** 'Ongoing' or 'THESIS' — exactly as the CV labels it. */
  status: string
  statusKind: 'ongoing' | 'thesis'
  description: string
  /** Concepts named in the CV description; drives the technical visual. */
  concepts: string[]
  /** Which research interests this entry touches (ids from researchInterests). */
  interests: string[]
  visual: 'gaafet-compare' | 'transistor-timeline' | 'load-curve'
}

export interface Publication {
  id: string
  kind: 'journal' | 'conference'
  title: string
  authors: string[]
  /** Journal or conference name. */
  venue: string
  location?: string
  year: string
  /** Article number (journal) — CV: 111315. */
  articleNumber?: string
  issn?: string
  pages?: string
  doi: string
  doiUrl: string
}

export interface Project {
  id: string
  title: string
  tools: string[]
  date: string
  description: string
  /** Only metrics literally present in the CV. */
  metrics?: { value: string; label: string }[]
  visual: 'shift-register' | 'motor-control' | 'sap-datapath' | 'survival-curve' | 'phishing-ensemble'
}

export interface SkillCategory {
  /** Category name exactly as the CV groups it. */
  name: string
  /** CV order preserved; duplicates across categories are intentional. */
  items: string[]
}

export interface Training {
  id: string
  organization: string
  role: string
  year: string
  duration: string
  location?: string
  description: string
  visual: 'power-plant' | 'reactor'
}

export interface Achievement {
  id: string
  /** Full CV sentence, never abbreviated. */
  text: string
  year: string
  exam: string
}

export interface ExtracurricularActivity {
  id: string
  title: string
  year: string
  points: string[]
  visual: 'tennis' | 'scouts' | 'mars-rover' | 'pcb'
}

export interface Referee {
  id: string
  name: string
  title: string
  /** Current and former affiliations, in CV order. */
  affiliations: string[]
  email: string
  mobile: string
}
