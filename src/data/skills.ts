import type { SkillCategory } from '../types'

/**
 * CV categories and ordering preserved exactly. MATLAB appears under both
 * "Languages" (as "Matlab") and "Software" (as "MATLAB") in the CV; both are
 * kept — spec §10 forbids de-duplicating them.
 *
 * No proficiency values exist here by design: the CV states none.
 */
export const skills: SkillCategory[] = [
  {
    name: 'Languages',
    items: ['Matlab', 'C', 'Verilog', 'HTML', 'LaTeX', 'Assembly'],
  },
  {
    name: 'Data Analysis',
    items: ['Python', 'Numpy', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    name: 'Design and Simulation',
    items: ['Silvaco Tcad', 'Atlas', 'Ltspice'],
  },
  {
    name: 'Software',
    items: [
      'MATLAB',
      'Proteus',
      'Pspice',
      'OrCAD Capture CIS',
      'Tinkercad',
      'Autodesk Eagle',
      'PSIM',
      'MICROWIND',
      'Quartus',
    ],
  },
]
