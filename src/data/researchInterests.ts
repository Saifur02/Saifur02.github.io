import type { ResearchInterest } from '../types'

/**
 * The five interests listed in the CV, in CV order. The blurbs restate the
 * field itself — they add no claims about the author's work.
 */
export const researchInterests: ResearchInterest[] = [
  {
    id: 'semiconductor-devices',
    label: 'Semiconductor devices',
    blurb: 'Device physics and electrostatics of transistors at advanced technology nodes.',
  },
  {
    id: '2d-materials',
    label: '2D materials',
    blurb: 'Atomically thin channel materials such as MoS₂ as alternatives to bulk silicon.',
  },
  {
    id: 'vlsi-design',
    label: 'VLSI design',
    blurb: 'Circuit and layout design for very-large-scale integrated systems.',
  },
  {
    id: 'nanoelectronics',
    label: 'Nanoelectronics',
    blurb: 'Electronic behaviour and scaling limits at nanometre dimensions.',
  },
  {
    id: 'machine-learning',
    label: 'Machine learning',
    blurb: 'Applied learning methods for prediction, forecasting and data analysis.',
  },
]
