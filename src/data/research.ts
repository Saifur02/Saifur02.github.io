import type { ResearchEntry } from '../types'

export const research: ResearchEntry[] = [
  {
    id: 'tcad-si-mos2-gaafet',
    title: 'Comparative TCAD Study of Si and MoS2 Gate-All-Around FETs',
    status: 'Ongoing',
    statusKind: 'ongoing',
    description:
      'A TCAD study comparing Si and MoS2 Gate-All-Around FETs (GAAFETs) found that MoS2 channels offer superior electrostatic control, demonstrating higher drive current and better Ion/Ioff ratios across various design parameters.',
    concepts: ['GAAFET', 'Si', 'MoS2', 'Electrostatic control', 'Ion/Ioff', 'Drive current'],
    interests: ['semiconductor-devices', '2d-materials', 'nanoelectronics'],
    visual: 'gaafet-compare',
  },
  {
    id: 'transistor-evolution',
    title: 'Evolution of transistor technologies in industry',
    status: 'Ongoing',
    statusKind: 'ongoing',
    description:
      'We will examine the evolution of transistor technologies from early devices to advanced MOSFETs, FinFETs, and GAAFETs. It will highlight industrial milestones, scaling limits, and challenges such as short-channel effects, power leakage, and the integration of high-k dielectrics, while discussing future directions in semiconductor innovation.',
    concepts: [
      'Industrial milestones',
      'Scaling limits',
      'Short-channel effects',
      'Power leakage',
      'High-k dielectrics',
    ],
    interests: ['semiconductor-devices', 'vlsi-design', 'nanoelectronics'],
    visual: 'transistor-timeline',
  },
  {
    id: 'residential-load-forecasting',
    title:
      'Residential Load Forecasting and Dynamic Demand Side Management Using Recurrent Neural Networks',
    status: 'THESIS',
    statusKind: 'thesis',
    description:
      'Introduced load forecasting techniques, customer load disaggregation, and load shifting algorithms in a residential area to reduce costs for customers and service providers.',
    concepts: [
      'Load forecasting',
      'Customer load disaggregation',
      'Load shifting algorithms',
      'Recurrent Neural Networks',
    ],
    interests: ['machine-learning'],
    visual: 'load-curve',
  },
]

/** Stages named in the "Evolution of transistor technologies" description (spec §7). */
export const transistorEvolution = [
  {
    id: 'early',
    label: 'Early Devices',
    note: 'The starting point of the study — devices that preceded the planar MOSFET era.',
  },
  {
    id: 'mosfet',
    label: 'MOSFETs',
    note: 'Planar scaling, where short-channel effects and power leakage become limiting.',
  },
  {
    id: 'finfet',
    label: 'FinFETs',
    note: 'Three-dimensional fin channels with improved gate control over the channel.',
  },
  {
    id: 'gaafet',
    label: 'GAAFETs',
    note: 'Gate wrapped fully around the channel — the frontier this research targets.',
  },
] as const
