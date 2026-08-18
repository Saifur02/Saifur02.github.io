import type { Publication } from '../types'

/** Author name to emphasise in author lists. Both CV spellings are matched. */
export const authorAliases = ['Md. Saifur Rahman', 'M. S. Rahman']

export const publications: Publication[] = [
  {
    id: 'digitize-hcd',
    kind: 'journal',
    title: 'Digitize-HCD: A Dataset for Digitization of Handwritten Circuit Diagrams',
    authors: [
      'Nadim Ahmed',
      'Mirza Fuad Adnan',
      'Ahmad Shafiullah',
      'Hayder Jahan Parash',
      'Md. Saifur Rahman',
      'Irfan Chowdhury Akib',
      'Golam Sarowar',
    ],
    venue: 'Data in Brief',
    year: '2025',
    articleNumber: '111315',
    issn: '2352-3409',
    doi: '10.1016/j.dib.2025.111315',
    doiUrl: 'https://doi.org/10.1016/j.dib.2025.111315',
  },
  {
    id: 'seer-breast-cancer',
    kind: 'conference',
    title: 'Survival Analysis of Breast Cancer Patients: A Population-Based Study from SEER',
    authors: ['M. S. Rahman', 'A. I. Keats', 'M. A. Kabir', 'A. Newaz', 'M. M. Islam'],
    venue: '2023 International Conference on Electrical, Computer and Energy Technologies (ICECET)',
    location: 'Cape Town, South Africa',
    year: '2023',
    pages: '1–6',
    doi: '10.1109/ICECET58911.2023.10389236',
    doiUrl: 'https://doi.org/10.1109/ICECET58911.2023.10389236',
  },
]
