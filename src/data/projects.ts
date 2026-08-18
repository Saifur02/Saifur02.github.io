import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'siso-shift-registers',
    title: 'Performance Analysis of 4-bit SISO Shift Registers',
    tools: ['Quartus', 'PSpice', 'Microwind'],
    date: 'October 2023',
    description:
      'Investigated 4-bit SISO shift registers using circuit analysis, layout design, and timing diagrams, implementing SISO using transmission gate, pass transistor and NAND gates, and comparisons were made.',
    visual: 'shift-register',
  },
  {
    id: 'dc-motor-speed-control',
    title: 'Microcontroller-Based DC Motor Speed Control with User Interface',
    tools: ['AVRDUDESS', 'Mide'],
    date: 'December 2023',
    description:
      'Able to rotate in any direction, maintaining a certain speed that can be controlled by the user. Implemented an emergency stop and limit switch system.',
    visual: 'motor-control',
  },
  {
    id: 'sap-1',
    title: '8 Bit SAP 1',
    tools: ['Proteus'],
    date: '2022',
    description: 'Developed a 8 Bit SAP-1 on Proteus.',
    visual: 'sap-datapath',
  },
  {
    id: 'breast-cancer-survival',
    title: 'Survival Analysis of Breast Cancer Patients',
    tools: ['Machine Learning', 'Jupyter', 'Google Colab'],
    date: 'January 2023',
    description:
      'Utilizing Kaplan-Meier, Cox regression, and Random Survival Forest models, we estimated breast cancer survival probabilities by exploiting observable relationships within the dataset’s attributes.',
    visual: 'survival-curve',
  },
  {
    id: 'phishing-prediction',
    title: 'Prediction of Phishing Web Page',
    tools: ['Machine Learning', 'Jupyter', 'Google Colab'],
    date: 'August 2023',
    description:
      'Achieved 97.95% accuracy and 96.69% precision using ensemble classifier consisting of SVM, Logistic Regression, and Random Forest Classifier algorithm.',
    // The only two numbers the CV reports for this project.
    metrics: [
      { value: '97.95%', label: 'Accuracy' },
      { value: '96.69%', label: 'Precision' },
    ],
    visual: 'phishing-ensemble',
  },
]
