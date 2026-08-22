// Mock data only — for hackathon demonstration purposes.
// Not official government content.

export const schemes = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN',
    fullName: 'Pradhan Mantri Kisan Samman Nidhi',
    category: 'Agriculture',
    description:
      'Income support for landholding farmer families to help meet agricultural and household needs.',
    eligibility: [
      'Landholding farmer family',
      'Cultivable land in own name',
      'Excludes certain institutional landholders',
    ],
    benefits: '₹6,000 per year, paid in three equal installments directly to bank account.',
    documents: ['Land records', 'Aadhaar card', 'Bank account details'],
    state: 'All India',
    occupation: 'Farmer',
    ruralUrban: 'Rural',
    incomeLimit: 'No strict income cap; landholding based',
    ageGroup: 'Any adult',
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat',
    fullName: 'Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    category: 'Healthcare',
    description:
      'Health insurance cover for secondary and tertiary care hospitalisation for economically vulnerable families.',
    eligibility: [
      'Families identified per SECC deprivation criteria',
      'No existing health cover under similar schemes',
    ],
    benefits: 'Health cover up to ₹5,00,000 per family per year for listed hospital treatments.',
    documents: ['Aadhaar card', 'Ration card', 'Income certificate'],
    state: 'All India',
    occupation: 'Any',
    ruralUrban: 'Rural & Urban',
    incomeLimit: 'Economically vulnerable households',
    ageGroup: 'All ages',
  },
  {
    id: 'pmay',
    name: 'PMAY',
    fullName: 'Pradhan Mantri Awas Yojana',
    category: 'Housing',
    description:
      'Support toward pucca housing for eligible urban and rural families, including interest subsidy on home loans.',
    eligibility: [
      'Family does not already own a pucca house',
      'Falls within defined income group (EWS/LIG/MIG)',
    ],
    benefits: 'Interest subsidy on home loans and financial assistance for house construction.',
    documents: ['Aadhaar card', 'Income proof', 'Property documents (if any)'],
    state: 'All India',
    occupation: 'Any',
    ruralUrban: 'Rural & Urban',
    incomeLimit: 'EWS / LIG / MIG bands',
    ageGroup: 'Any adult',
  },
  {
    id: 'nsp-scholarship',
    name: 'National Scholarship Portal — Pre-Matric Scholarship',
    fullName: 'National Scholarship Portal Schemes',
    category: 'Education',
    description:
      'Scholarship support for school and college students from eligible communities and income groups to reduce dropout rates.',
    eligibility: [
      'Enrolled in a recognised school or institution',
      'Family income within scheme-specific limit',
      'Meets category-specific criteria',
    ],
    benefits: 'Annual scholarship amount covering tuition and maintenance allowance (varies by scheme).',
    documents: ['Aadhaar card', 'Income certificate', 'Bonafide certificate', 'Bank account details'],
    state: 'All India',
    occupation: 'Student',
    ruralUrban: 'Rural & Urban',
    incomeLimit: 'Varies by scheme, typically under ₹2,50,000/year',
    ageGroup: 'Students',
  },
  {
    id: 'pmkvy',
    name: 'PMKVY',
    fullName: 'Pradhan Mantri Kaushal Vikas Yojana',
    category: 'Skill Development',
    description:
      'Free short-duration skill training and certification to improve employability of youth across sectors.',
    eligibility: ['Indian citizen', 'Unemployed or school/college dropout', 'Meets age criteria for chosen course'],
    benefits: 'Free training, certification, and placement assistance in select trades.',
    documents: ['Aadhaar card', 'Educational certificates', 'Bank account details'],
    state: 'All India',
    occupation: 'Worker',
    ruralUrban: 'Rural & Urban',
    incomeLimit: 'No income limit',
    ageGroup: '15–45 years',
  },
  {
    id: 'nsap',
    name: 'NSAP — Old Age Pension',
    fullName: 'National Social Assistance Programme',
    category: 'Social Security',
    description:
      'Monthly pension support for elderly citizens from below-poverty-line households.',
    eligibility: ['Age 60 years or above', 'Belongs to a BPL household'],
    benefits: 'Monthly pension amount, varying by state contribution.',
    documents: ['Aadhaar card', 'Age proof', 'BPL certificate'],
    state: 'All India',
    occupation: 'Any',
    ruralUrban: 'Rural & Urban',
    incomeLimit: 'BPL households',
    ageGroup: '60+ years',
  },
  {
    id: 'mudra-yojana',
    name: 'PM MUDRA Yojana',
    fullName: 'Pradhan Mantri Mudra Yojana',
    category: 'Business & Enterprise',
    description:
      'Collateral-free loans for small and micro enterprises to support setup or expansion of business.',
    eligibility: ['Non-corporate small/micro business owner', 'Business activity generating income'],
    benefits: 'Loans up to ₹10,00,000 under Shishu, Kishor and Tarun categories.',
    documents: ['Business proof', 'Aadhaar card', 'Bank statements'],
    state: 'All India',
    occupation: 'Small Business Owner',
    ruralUrban: 'Rural & Urban',
    incomeLimit: 'No fixed cap',
    ageGroup: '18+ years',
  },
  {
    id: 'ujjwala',
    name: 'PM Ujjwala Yojana',
    fullName: 'Pradhan Mantri Ujjwala Yojana',
    category: 'Welfare',
    description:
      'Provides free LPG connections to women from below-poverty-line households to promote clean cooking fuel access.',
    eligibility: ['Woman applicant from BPL household', 'No existing LPG connection in household'],
    benefits: 'Free LPG gas connection with financial support for first refill and stove.',
    documents: ['Aadhaar card', 'BPL ration card', 'Bank account details'],
    state: 'All India',
    occupation: 'Any',
    ruralUrban: 'Rural & Urban',
    incomeLimit: 'BPL households',
    ageGroup: '18+ years',
  },
]

export const categories = [
  'All Categories',
  'Agriculture',
  'Healthcare',
  'Housing',
  'Education',
  'Skill Development',
  'Social Security',
  'Business & Enterprise',
  'Welfare',
]

export const occupations = ['Any', 'Farmer', 'Student', 'Worker', 'Small Business Owner']
export const states = [
  'All India',
  'Maharashtra',
  'Uttar Pradesh',
  'Bihar',
  'Rajasthan',
  'Tamil Nadu',
  'Karnataka',
  'Gujarat',
  'West Bengal',
]
export const ruralUrbanOptions = ['Any', 'Rural', 'Urban', 'Rural & Urban']
export const ageGroups = ['Any', '0–18', '18–45', '45–60', '60+']
