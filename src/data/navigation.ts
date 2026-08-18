import type { NavItem } from '../types'

/** Spec §15 — every CV category is reachable from the navigation. */
export const navigation: NavItem[] = [
  { index: '01', id: 'home', label: 'Home' },
  { index: '02', id: 'about', label: 'About' },
  { index: '03', id: 'research', label: 'Research' },
  { index: '04', id: 'publications', label: 'Publications' },
  { index: '05', id: 'projects', label: 'Projects' },
  { index: '06', id: 'experience', label: 'Experience' },
  { index: '07', id: 'education', label: 'Education' },
  { index: '08', id: 'skills', label: 'Skills' },
  { index: '09', id: 'training', label: 'Training' },
  { index: '10', id: 'awards', label: 'Awards' },
  { index: '11', id: 'extracurricular', label: 'Extracurricular' },
  { index: '12', id: 'referees', label: 'Referees' },
  { index: '13', id: 'contact', label: 'Contact' },
]
