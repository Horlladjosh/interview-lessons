export const STAGE_LABELS: Record<string, string> = {
  phone_screen: 'Intro call',
  technical_round: 'Technical interview',
  final_onsite: 'Final round',
  offer_stage: 'Offer stage',
  other: 'Other',
}

export const STAGE_OPTIONS = [
  { value: '', label: 'All stages' },
  { value: 'phone_screen', label: 'Intro call' },
  { value: 'technical_round', label: 'Technical interview' },
  { value: 'final_onsite', label: 'Final round' },
  { value: 'offer_stage', label: 'Offer stage' },
  { value: 'other', label: 'Other' },
]