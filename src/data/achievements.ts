import type { Achievement } from '../types'

/**
 * Scholarships, full CV sentences intact. Spec §12 forbids collapsing these
 * into a single "Government Scholarships" line.
 */
export const scholarships: Achievement[] = [
  {
    id: 'hsc-2019',
    text: 'Received Bangladesh Govt. Scholarship for excellence in HSC 2019',
    year: '2019',
    exam: 'HSC',
  },
  {
    id: 'ssc-2017',
    text: 'Received Bangladesh Govt. Scholarship for excellence in SSC 2017',
    year: '2017',
    exam: 'SSC',
  },
  {
    id: 'jsc-2014',
    text: 'Received Bangladesh Govt. Scholarship for excellence in JSC 2014',
    year: '2014',
    exam: 'JSC',
  },
]
