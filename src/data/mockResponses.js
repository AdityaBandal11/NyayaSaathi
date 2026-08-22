// Mock AI response system.
// These are simulated, illustrative responses for a hackathon prototype —
// not real legal advice and not connected to any live AI or legal service.

export const mockResponses = {
  tenant: {
    keywords: ['landlord', 'deposit', 'rent', 'tenant', 'eviction', 'rental'],
    reply:
      'I understand your situation. Based on what you shared, this may involve a rental deposit dispute.',
    actionPlan: [
      'Collect your rental agreement.',
      'Keep proof of your deposit payment.',
      'Send a written request to the landlord.',
      'Keep records of all communication.',
      'Explore the appropriate complaint mechanism if the issue remains unresolved.',
    ],
    documents: ['Rental agreement', 'Deposit receipt', 'Payment records', 'Communication records'],
    sources: [{ org: 'Government of India', dept: 'Department of Consumer Affairs', label: 'Official Information' }],
  },
  rti: {
    keywords: ['rti', 'right to information', 'information act', 'file an rti'],
    reply:
      'I can help you put together a Right to Information request. This is a formal way to ask a government department for information they hold.',
    actionPlan: [
      'Identify the exact information you need.',
      'Identify the relevant public department.',
      'Draft a clear, specific RTI application.',
      'Submit the application with the applicable fee.',
      'Track the response within the statutory timeline.',
    ],
    documents: ['Identity proof', 'Application fee receipt', 'Draft RTI application'],
    sources: [{ org: 'Government of India', dept: 'Department of Personnel & Training', label: 'Official Information' }],
  },
  schemes: {
    keywords: ['scheme', 'eligible', 'benefit', 'subsidy', 'yojana', 'government scheme'],
    reply:
      'I can help you explore government schemes that may match your situation. A few details about your occupation, income and state will help narrow this down.',
    actionPlan: [
      'Share your occupation and rough income range.',
      'Share your state of residence.',
      'Review matching schemes and their eligibility.',
      'Check the required documents for your best-fit scheme.',
      'Note the application process for that scheme.',
    ],
    documents: ['Aadhaar card', 'Income certificate', 'Address proof'],
    sources: [{ org: 'Government of India', dept: 'Ministry of Rural Development', label: 'Official Information' }],
  },
  salary: {
    keywords: ['salary', 'employer', 'wages', 'not paid', 'unpaid', 'employment'],
    reply:
      'I understand your concern. Based on what you described, this may involve an unpaid wages issue with your employer.',
    actionPlan: [
      'Collect your employment contract or appointment letter.',
      'Gather salary slips and attendance records.',
      'Send a written reminder to your employer.',
      'Keep a record of all correspondence.',
      'Consider approaching the appropriate labour authority if unresolved.',
    ],
    documents: ['Appointment letter', 'Salary slips', 'Attendance records', 'Bank statements'],
    sources: [{ org: 'Government of India', dept: 'Ministry of Labour & Employment', label: 'Official Information' }],
  },
  consumer: {
    keywords: ['consumer', 'defective', 'refund', 'complaint', 'product', 'service issue'],
    reply:
      'I understand your concern. This sounds like it may involve a consumer rights issue.',
    actionPlan: [
      'Collect your purchase receipt or invoice.',
      'Gather any warranty or service documents.',
      'Send a written complaint to the seller or service provider.',
      'Keep records of all communication and evidence (photos, messages).',
      'Explore filing a formal consumer complaint if unresolved.',
    ],
    documents: ['Purchase receipt', 'Warranty card', 'Communication records', 'Photos of the issue (if applicable)'],
    sources: [{ org: 'Government of India', dept: 'Department of Consumer Affairs', label: 'Official Information' }],
  },
}

export const fallbackResponse = {
  reply:
    'I understand your concern. I can help you explore the relevant government information and possible next steps.',
  actionPlan: [
    'Share a few more details about your situation.',
    'I will help identify the relevant topic area.',
    'We will look at possible next steps together.',
  ],
  documents: ['Identity proof', 'Any related documents you already have'],
  sources: [{ org: 'Government of India', dept: 'General Civic Information', label: 'Official Information' }],
}

export function getMockResponse(userText) {
  const text = userText.toLowerCase()
  for (const key of Object.keys(mockResponses)) {
    const item = mockResponses[key]
    if (item.keywords.some((kw) => text.includes(kw))) {
      return item
    }
  }
  return fallbackResponse
}

export const chatSuggestions = [
  'What are my rights as a tenant?',
  'How can I file an RTI?',
  'Which government schemes am I eligible for?',
  'My employer has not paid my salary.',
  'How do I complain about a consumer issue?',
]
