import type { Education } from '../types'

/** Chronological order — the Education section renders it as a journey. */
export const education: Education[] = [
  {
    institution: 'Al Amin Academy School',
    location: 'Chandpur',
    qualification: 'SSC (O-level equivalent)',
    stream: 'Science',
    year: '2017',
    gradeLabel: 'GPA',
    grade: '5.0/5.0',
    gradeValue: 5.0,
    gradeMax: 5.0,
  },
  {
    institution: 'Notre Dame College',
    location: 'Dhaka',
    qualification: 'HSC (A-level equivalent)',
    stream: 'Science',
    year: '2019',
    gradeLabel: 'GPA',
    grade: '5.0/5.0',
    gradeValue: 5.0,
    gradeMax: 5.0,
  },
  {
    institution: 'Islamic University of Technology',
    qualification: 'B.Sc. Electrical and Electronic Engineering',
    year: '2024',
    gradeLabel: 'CGPA',
    grade: '3.84/4.0',
    gradeValue: 3.84,
    gradeMax: 4.0,
    rank: '17th out of 117',
  },
]
