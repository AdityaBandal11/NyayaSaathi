// Mock data — for hackathon demonstration purposes only.

export const initialApplications = [
  {
    id: 'app-1',
    title: 'RTI Application',
    subtitle: 'Request for information — Municipal Corporation',
    status: 'Draft',
    updated: '2 days ago',
    type: 'RTI',
  },
  {
    id: 'app-2',
    title: 'PM-KISAN Scheme Application',
    subtitle: 'Income support for farmer families',
    status: 'Submitted',
    updated: '5 days ago',
    type: 'Scheme',
  },
  {
    id: 'app-3',
    title: 'Consumer Complaint',
    subtitle: 'Defective product — refund request',
    status: 'Processing',
    updated: '1 week ago',
    type: 'Complaint',
  },
  {
    id: 'app-4',
    title: 'Ayushman Bharat Application',
    subtitle: 'Health cover enrolment',
    status: 'Completed',
    updated: '3 weeks ago',
    type: 'Scheme',
  },
]

export const initialSavedSchemeIds = ['pm-kisan', 'ayushman-bharat']

export const initialSavedResponses = [
  {
    id: 'saved-1',
    title: 'Rental deposit dispute — action plan',
    snippet: 'Collect your rental agreement, keep proof of deposit payment...',
  },
  {
    id: 'saved-2',
    title: 'How to file an RTI application',
    snippet: 'Identify the exact information you need, identify the relevant department...',
  },
]

export const recentActivity = [
  { id: 1, text: 'Checked PM-KISAN eligibility', time: '2 hours ago' },
  { id: 2, text: 'Generated RTI draft', time: 'Yesterday' },
  { id: 3, text: 'Uploaded rental agreement', time: '2 days ago' },
]
