import type { Referee } from '../types'

/**
 * Transcribed from the CV's REFEREE table. No social links, no photographs and
 * no titles beyond what the CV states (spec §14).
 */
export const referees: Referee[] = [
  {
    id: 'ashraful-hoque',
    name: 'Dr. Md. Ashraful Hoque',
    title: 'Vice Chancellor',
    affiliations: [
      'Ahsanullah University of Science & Technology (AUST)',
      'Former Professor of EEE, Islamic University of Technology (IUT)',
    ],
    email: 'mahoque@iut-dhaka.edu',
    mobile: '01735444474',
  },
  {
    id: 'ruhul-amin',
    name: 'Md. Ruhul Amin, PhD',
    title: 'Professor and Chairman, EEE',
    affiliations: [
      'Southeast University',
      'Former Professor of EEE, Islamic University of Technology (IUT)',
    ],
    email: 'ruhul@seu.edu.bd',
    mobile: '01713228533',
  },
  {
    id: 'nadim-ahmed',
    name: 'Mr. Nadim Ahmed',
    title: 'Assistant Professor, Dept. of EEE',
    affiliations: ['Islamic University of Technology (IUT)'],
    email: 'nadimahmed@iut-dhaka.edu',
    mobile: '01748806097',
  },
]
