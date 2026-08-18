import type { ExtracurricularActivity } from '../types'

export const extracurricular: ExtracurricularActivity[] = [
  {
    id: 'lawn-tennis',
    title: 'Lawn Tennis',
    year: '2024',
    points: [
      'Served as University Lawn Tennis captain',
      'Runner-up in IUT Lawn Tennis Tournament 2024 (Double’s category)',
      'Runner-up in IUT Lawn Tennis Tournament 2024 (Single’s category)',
    ],
    visual: 'tennis',
  },
  {
    id: 'bangladesh-scouts',
    title: 'Bangladesh Scouts',
    year: '2019',
    points: [
      'Got President’s Scout Award, a prestigious recognition given to scouts who have demonstrated outstanding leadership, service, and dedication to the principles of scouting.',
      'It is the highest award attainable within the Bangladesh Scouts organization and is awarded by the honorable President of Bangladesh.',
    ],
    visual: 'scouts',
  },
  {
    id: 'iut-mars-rover',
    title: 'IUT Mars Rover — Team Avijatrik',
    year: '2022',
    points: ['Senior Member — Electrical Team'],
    visual: 'mars-rover',
  },
  {
    id: 'pcb-design-contest',
    title: 'PCB Design contest',
    year: '2021',
    points: [
      'Runner-up in the contest of PCB design and fabrication organized by the IEEE Robotics and Automation Society IIUC Student Chapter in coordination with the IEEE IIUC Student Branch.',
    ],
    visual: 'pcb',
  },
]
