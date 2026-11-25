import {
  ActivityEntry,
  Coach,
  CoachingSession,
  DevelopmentGoal,
  OnboardingState,
  TeamThemeAggregate,
  TeamTrendPoint,
} from '../types/elevate';

export const HERO_IMAGE = '/src/assets/images/hero_coaching_workspace_1795616100266.jpg';
export const EMPLOYEE_AVATAR = '/src/assets/images/employee_maya_patel_1795616102195.jpg';

export const INITIAL_COACHES: Coach[] = [
  {
    id: 'coach-elena',
    name: 'Dr. Elena Rostova',
    title: 'Executive Leadership & Stakeholder Coach',
    credentials: 'ICF-MCC · PhD Organizational Psychology',
    avatarUrl: '/src/assets/images/coach_elena_rostova_1795616100603.jpg',
    yearsExperience: 14,
    rating: 4.9,
    reviewCount: 64,
    specialties: ['Executive Presence', 'Stakeholder Alignment', 'Board Communication', 'Conflict Resolution'],
    formats: ['Video 1:1', 'Audio Walk', 'Async Strategy Review'],
    languages: ['English', 'German'],
    timezone: 'CET (UTC+1)',
    nextAvailable: 'Thu, Nov 26 · 10:00',
    availableThisWeek: true,
    bio: 'Elena has coached over 220 product directors, VPs, and newly promoted team leads across European and North American technology companies. Before transitioning to full-time executive coaching, she led organizational effectiveness initiatives at a 1,400-person fintech scale-up.',
    methodology:
      'Structured cognitive-behavioral framing paired with real meeting rehearsal. Every session concludes with one observable behavior experiment to test during the following week.',
    clientFeedbackThemes: [
      'Clarifies complex executive stakeholder politics without jargon',
      'Balances candid challenge with psychological safety',
      'Practical frameworks for high-stakes roadmap reviews',
    ],
    availability: [
      { dateISO: '2026-11-26', dateLabel: 'Thu, Nov 26', dayShort: 'Thu 26', times: ['10:00', '13:30', '16:00'] },
      { dateISO: '2026-11-27', dateLabel: 'Fri, Nov 27', dayShort: 'Fri 27', times: ['09:30', '11:30', '15:00'] },
      { dateISO: '2026-11-30', dateLabel: 'Mon, Nov 30', dayShort: 'Mon 30', times: ['10:00', '14:00'] },
      { dateISO: '2026-12-01', dateLabel: 'Tue, Dec 1', dayShort: 'Tue 1', times: ['09:00', '11:00', '16:30'] },
    ],
  },
  {
    id: 'coach-marcus',
    name: 'Marcus Chen',
    title: 'Engineering & Technical Leadership Coach',
    credentials: 'ICF-PCC · Former VP of Engineering',
    avatarUrl: '/src/assets/images/coach_marcus_chen_1795616100884.jpg',
    yearsExperience: 11,
    rating: 4.9,
    reviewCount: 51,
    specialties: ['People Leadership', 'IC to Manager Transition', 'Systems Thinking', 'Delegation'],
    formats: ['Video 1:1', 'Async Strategy Review'],
    languages: ['English', 'Mandarin'],
    timezone: 'PST (UTC-8)',
    nextAvailable: 'Fri, Nov 27 · 11:00',
    availableThisWeek: true,
    bio: 'Marcus spent twelve years building distributed platform teams before becoming a dedicated leadership coach for Staff Engineers, Engineering Managers, and Technical Product Leads navigating scope expansion.',
    methodology:
      'Systems-oriented coaching focused on decision hygiene, delegation boundaries, and shifting from personal execution to multiplying team leverage.',
    clientFeedbackThemes: [
      'Deeply understands technical tradeoffs and engineering culture',
      'Helps new managers stop over-functioning in their former IC role',
      'Clear 30-60-90 day capability roadmaps',
    ],
    availability: [
      { dateISO: '2026-11-27', dateLabel: 'Fri, Nov 27', dayShort: 'Fri 27', times: ['11:00', '14:30'] },
      { dateISO: '2026-11-30', dateLabel: 'Mon, Nov 30', dayShort: 'Mon 30', times: ['09:00', '13:00', '15:30'] },
      { dateISO: '2026-12-02', dateLabel: 'Wed, Dec 2', dayShort: 'Wed 2', times: ['10:30', '14:00'] },
    ],
  },
  {
    id: 'coach-amara',
    name: 'Amara Osei',
    title: 'Product Strategy & Career Growth Coach',
    credentials: 'ICF-PCC · Certified Career Strategist',
    avatarUrl: '/src/assets/images/coach_amara_osei_1795616101165.jpg',
    yearsExperience: 9,
    rating: 4.8,
    reviewCount: 43,
    specialties: ['Career Navigation', 'Strategic Communication', 'Cross-Functional Influence', 'Executive Presence'],
    formats: ['Video 1:1', 'Audio Walk'],
    languages: ['English', 'French'],
    timezone: 'GMT (UTC+0)',
    nextAvailable: 'Thu, Nov 26 · 14:00',
    availableThisWeek: true,
    bio: 'Amara partners with mid-to-senior individual contributors and product leaders preparing for principal or director-level promotion cycles. Her background spans B2B SaaS product management and talent development.',
    methodology:
      'Narrative alignment and evidence-based career mapping. Sessions focus on articulating strategic impact, building cross-functional sponsorship, and sustainable pacing.',
    clientFeedbackThemes: [
      'Sharpens how clients frame impact in promotion packets and reviews',
      'Calm, structured reflection prompts that cut through ambiguity',
      'Actionable exercises for difficult cross-team conversations',
    ],
    availability: [
      { dateISO: '2026-11-26', dateLabel: 'Thu, Nov 26', dayShort: 'Thu 26', times: ['14:00', '15:30', '17:00'] },
      { dateISO: '2026-12-01', dateLabel: 'Tue, Dec 1', dayShort: 'Tue 1', times: ['10:00', '12:30', '16:00'] },
      { dateISO: '2026-12-03', dateLabel: 'Thu, Dec 3', dayShort: 'Thu 3', times: ['09:30', '13:30'] },
    ],
  },
  {
    id: 'coach-david',
    name: 'David Lindqvist',
    title: 'Organizational Resilience & Change Coach',
    credentials: 'EMCC Senior Practitioner · MSc Work Psychology',
    avatarUrl: '/src/assets/images/coach_david_lindqvist_1795616107011.jpg',
    yearsExperience: 16,
    rating: 4.9,
    reviewCount: 79,
    specialties: ['Change Leadership', 'Burnout Prevention', 'People Leadership', 'Conflict Resolution'],
    formats: ['Video 1:1', 'Audio Walk', 'Async Strategy Review'],
    languages: ['English', 'Swedish'],
    timezone: 'CET (UTC+1)',
    nextAvailable: 'Mon, Nov 30 · 09:30',
    availableThisWeek: false,
    bio: 'David brings sixteen years of Nordic organizational psychology practice to leaders guiding teams through reorganizations, rapid scaling, or post-merger integration.',
    methodology:
      'Evidence-based Acceptance and Commitment Coaching (ACC) integrated with operational cadence design to sustain clarity under pressure.',
    clientFeedbackThemes: [
      'Steadies leaders during high-uncertainty organizational transitions',
      'Helps teams establish realistic boundaries without losing momentum',
      'Measured, reflective questioning style',
    ],
    availability: [
      { dateISO: '2026-11-30', dateLabel: 'Mon, Nov 30', dayShort: 'Mon 30', times: ['09:30', '11:30', '15:00'] },
      { dateISO: '2026-12-02', dateLabel: 'Wed, Dec 2', dayShort: 'Wed 2', times: ['10:00', '13:30'] },
      { dateISO: '2026-12-04', dateLabel: 'Fri, Dec 4', dayShort: 'Fri 4', times: ['09:00', '11:00'] },
    ],
  },
  {
    id: 'coach-priya',
    name: 'Priya Nair',
    title: 'Cross-Functional Communication & Facilitation Coach',
    credentials: 'ICF-PCC · Former Principal UX Researcher',
    yearsExperience: 8,
    rating: 4.7,
    reviewCount: 32,
    specialties: ['Strategic Communication', 'Cross-Functional Influence', 'Design & Product Leadership'],
    formats: ['Video 1:1', 'Async Strategy Review'],
    languages: ['English'],
    timezone: 'EST (UTC-5)',
    nextAvailable: 'Fri, Nov 27 · 10:00',
    availableThisWeek: true,
    bio: 'Priya coaches design, research, and product leads on translating qualitative insight into executive decisions and navigating product-engineering tension constructively.',
    methodology:
      'Practice-oriented narrative coaching using upcoming decks, memos, and live stakeholder scenarios as working material.',
    clientFeedbackThemes: [
      'Immediately practical feedback on real presentations and memos',
      'Strong empathy for design and research leaders in matrixed orgs',
    ],
    availability: [
      { dateISO: '2026-11-27', dateLabel: 'Fri, Nov 27', dayShort: 'Fri 27', times: ['10:00', '13:00'] },
      { dateISO: '2026-12-01', dateLabel: 'Tue, Dec 1', dayShort: 'Tue 1', times: ['11:00', '14:30'] },
    ],
  },
  {
    id: 'coach-tomas',
    name: 'Tomas Herrera',
    title: 'First-Time Manager & Feedback Coach',
    credentials: 'ICF-ACC · People Operations Advisor',
    yearsExperience: 7,
    rating: 4.6,
    reviewCount: 28,
    specialties: ['IC to Manager Transition', 'Feedback & Coaching Skills', 'Delegation', 'Career Navigation'],
    formats: ['Video 1:1', 'Audio Walk'],
    languages: ['English', 'Spanish'],
    timezone: 'CST (UTC-6)',
    nextAvailable: 'Wed, Dec 2 · 11:00',
    availableThisWeek: false,
    bio: 'Tomas specializes in the first 12 months of people management, helping new managers build confidence in 1-on-1 cadences, performance feedback, and career conversations.',
    methodology:
      'Role-play rehearsal and structured reflection checklists tailored to real direct-report conversations.',
    clientFeedbackThemes: [
      'Turns intimidating performance conversations into clear frameworks',
      'Practical weekly habits for sustainable 1-on-1s',
    ],
    availability: [
      { dateISO: '2026-12-02', dateLabel: 'Wed, Dec 2', dayShort: 'Wed 2', times: ['11:00', '15:00'] },
      { dateISO: '2026-12-04', dateLabel: 'Fri, Dec 4', dayShort: 'Fri 4', times: ['10:30', '14:00'] },
    ],
  },
];

export const INITIAL_SESSIONS: CoachingSession[] = [
  {
    id: 'sess-101',
    coachId: 'coach-elena',
    coachName: 'Dr. Elena Rostova',
    coachTitle: 'Executive Leadership & Stakeholder Coach',
    coachAvatar: '/src/assets/images/coach_elena_rostova_1795616100603.jpg',
    dateISO: '2026-11-26',
    dateLabel: 'Thu, Nov 26, 2026',
    time: '10:00',
    durationMins: 45,
    format: 'Video 1:1',
    topic: 'Q1 Roadmap Alignment with Finance & Engineering VPs',
    status: 'upcoming',
    prepChecklist: [
      { id: 'p-1', label: 'Summarize the 2 key executive objections from last review', completed: true },
      { id: 'p-2', label: 'Identify desired decision outcome for Tuesday leadership sync', completed: true },
      { id: 'p-3', label: 'Note personal energy boundaries for cross-team escalations', completed: false },
    ],
    privateNotes:
      'I noticed I rush into defensive data details whenever Finance questions timeline buffers. Want to practice opening with shared risk framing first.',
    reflection: {
      takeaway: '',
      confidenceShift: 'Steady',
      voluntarySummary: '',
    },
    actionItems: [
      { id: 'a-1', text: 'Draft 3-bullet executive framing memo before Friday', completed: false, linkedGoalId: 'goal-1' },
    ],
  },
  {
    id: 'sess-100',
    coachId: 'coach-amara',
    coachName: 'Amara Osei',
    coachTitle: 'Product Strategy & Career Growth Coach',
    coachAvatar: '/src/assets/images/coach_amara_osei_1795616101165.jpg',
    dateISO: '2026-11-12',
    dateLabel: 'Thu, Nov 12, 2026',
    time: '14:00',
    durationMins: 45,
    format: 'Video 1:1',
    topic: 'Structuring Principal PM Scope Narrative',
    status: 'completed',
    prepChecklist: [
      { id: 'p-10', label: 'Bring two recent product strategy docs for review', completed: true },
      { id: 'p-11', label: 'List three cross-org wins from Q3', completed: true },
    ],
    privateNotes:
      'Reframed my role from "shipping features on time" to "de-risking multi-quarter platform bets." Felt much clearer distinguishing senior vs principal behaviors.',
    reflection: {
      takeaway: 'Lead strategy memos with the organizational tradeoff, not the feature checklist.',
      confidenceShift: 'Clearer',
      voluntarySummary: 'Focused on executive product storytelling and cross-team alignment habits.',
    },
    actionItems: [
      { id: 'a-10', text: 'Send pre-read 24h before architecture alignment meeting', completed: true, linkedGoalId: 'goal-1' },
      { id: 'a-11', text: 'Schedule 15-min context check-in with Data Platform lead', completed: false },
    ],
  },
  {
    id: 'sess-099',
    coachId: 'coach-elena',
    coachName: 'Dr. Elena Rostova',
    coachTitle: 'Executive Leadership & Stakeholder Coach',
    coachAvatar: '/src/assets/images/coach_elena_rostova_1795616100603.jpg',
    dateISO: '2026-10-29',
    dateLabel: 'Thu, Oct 29, 2026',
    time: '10:00',
    durationMins: 45,
    format: 'Audio Walk',
    topic: 'Delegating Discovery Ownership Without Losing Quality',
    status: 'completed',
    prepChecklist: [
      { id: 'p-20', label: 'Audit weekly meetings where I am still the bottleneck', completed: true },
    ],
    privateNotes:
      'Identified two recurring triage meetings I can hand over to senior associates with clear escalation criteria.',
    reflection: {
      takeaway: 'Define "good enough to ship" guardrails upfront instead of reviewing every draft.',
      confidenceShift: 'Ready to Act',
      voluntarySummary: '',
    },
    actionItems: [
      { id: 'a-20', text: 'Write lightweight discovery handoff brief for associate PM', completed: true, linkedGoalId: 'goal-2' },
    ],
  },
];

export const INITIAL_GOALS: DevelopmentGoal[] = [
  {
    id: 'goal-1',
    title: 'Lead cross-functional Q1 strategy reviews with concise executive framing',
    category: 'Stakeholder Alignment',
    targetDate: '2027-01-31',
    progress: 67,
    status: 'active',
    sharedWithManager: true,
    updatedAt: 'Nov 20, 2026',
    milestones: [
      { id: 'm-1', title: 'Adopt 1-page decision memo template for leadership syncs', completed: true },
      { id: 'm-2', title: 'Run pre-alignment check-ins with Finance & Engineering leads', completed: true },
      { id: 'm-3', title: 'Facilitate Q1 kickoff review with zero unresolved escalations', completed: false },
    ],
  },
  {
    id: 'goal-2',
    title: 'Delegate weekly product discovery triage to build team autonomy',
    category: 'People Leadership',
    targetDate: '2026-12-20',
    progress: 50,
    status: 'active',
    sharedWithManager: false,
    updatedAt: 'Nov 14, 2026',
    milestones: [
      { id: 'm-4', title: 'Document escalation thresholds for customer research', completed: true },
      { id: 'm-5', title: 'Co-lead two synthesis sessions then step back to observer', completed: false },
    ],
  },
  {
    id: 'goal-3',
    title: 'Establish sustainable focus blocks during high-volume planning cycles',
    category: 'Personal Sustainability',
    targetDate: '2026-11-15',
    progress: 100,
    status: 'completed',
    sharedWithManager: false,
    updatedAt: 'Nov 10, 2026',
    milestones: [
      { id: 'm-6', title: 'Audit calendar fragmentation across two sprints', completed: true },
      { id: 'm-7', title: 'Protect two 90-minute deep strategy blocks weekly', completed: true },
    ],
  },
];

export const INITIAL_ACTIVITY: ActivityEntry[] = [
  {
    id: 'act-1',
    timestamp: '2 hours ago',
    title: 'Completed prep checklist item',
    context: 'Q1 Roadmap Alignment session with Dr. Elena Rostova',
  },
  {
    id: 'act-2',
    timestamp: 'Nov 20, 2026',
    title: 'Shared goal progress with Jordan Vance',
    context: 'Lead cross-functional Q1 strategy reviews (67%)',
  },
  {
    id: 'act-3',
    timestamp: 'Nov 12, 2026',
    title: 'Logged post-session reflection',
    context: 'Structuring Principal PM Scope Narrative with Amara Osei',
  },
  {
    id: 'act-4',
    timestamp: 'Nov 10, 2026',
    title: 'Completed development goal',
    context: 'Establish sustainable focus blocks during planning cycles',
  },
];

export const INITIAL_ONBOARDING: OnboardingState = {
  completed: false,
  assessment: {
    'Strategic Communication': 3,
    'Stakeholder Alignment': 3,
    'People Leadership': 4,
    'Executive Presence': 2,
    'Career Navigation': 3,
  },
  careerGoals: [
    'Prepare for Principal / Director scope expansion',
    'Strengthen executive stakeholder alignment',
  ],
  skillsToImprove: ['Executive Presence', 'Stakeholder Alignment', 'Delegation'],
  coachingInterests: ['Leadership Transition', 'Strategic Communication'],
  preferredFormat: 'Video 1:1',
};

export const MANAGER_TEAM_TRENDS: TeamTrendPoint[] = [
  { period: 'Q1 2026', participationPct: 62, sessionsCompleted: 38, goalsCompletedPct: 54 },
  { period: 'Q2 2026', participationPct: 71, sessionsCompleted: 46, goalsCompletedPct: 61 },
  { period: 'Q3 2026', participationPct: 79, sessionsCompleted: 55, goalsCompletedPct: 66 },
  { period: 'Q4 2026', participationPct: 84, sessionsCompleted: 64, goalsCompletedPct: 71 },
];

export const MANAGER_THEME_AGGREGATES: TeamThemeAggregate[] = [
  { theme: 'Stakeholder Alignment', percentage: 34, participantsCount: 11 },
  { theme: 'Strategic Communication', percentage: 26, participantsCount: 8 },
  { theme: 'People Leadership & Delegation', percentage: 22, participantsCount: 7 },
  { theme: 'Career Navigation & Scope', percentage: 18, participantsCount: 6 },
];

export const TEAM_SHARED_PEER_UPDATES = [
  {
    id: 'peer-1',
    employeeName: 'Liam Kowalski',
    role: 'Staff Frontend Engineer',
    goalTitle: 'Mentor two senior engineers through architecture RFC reviews',
    category: 'People Leadership',
    progress: 75,
    status: 'On Track',
    sharedOn: 'Nov 18, 2026',
  },
  {
    id: 'peer-2',
    employeeName: 'Sofia Alvarez',
    role: 'Product Design Lead',
    goalTitle: 'Run quarterly accessibility audits across core enterprise workflows',
    category: 'Strategic Communication',
    progress: 100,
    status: 'Completed',
    sharedOn: 'Nov 15, 2026',
  },
  {
    id: 'peer-3',
    employeeName: 'Noah Lindholm',
    role: 'Senior Data Engineer',
    goalTitle: 'Present quarterly reliability tradeoffs clearly to non-technical leads',
    category: 'Executive Presence',
    progress: 50,
    status: 'On Track',
    sharedOn: 'Nov 11, 2026',
  },
];

export const ASSESSMENT_COMPETENCIES = [
  {
    key: 'Strategic Communication',
    description: 'Structuring complex ideas clearly for peers and leadership.',
  },
  {
    key: 'Stakeholder Alignment',
    description: 'Building shared ownership across product, engineering, and finance.',
  },
  {
    key: 'People Leadership',
    description: 'Delegating effectively, giving candid feedback, and developing others.',
  },
  {
    key: 'Executive Presence',
    description: 'Maintaining composure, clarity, and decisiveness in high-stakes rooms.',
  },
  {
    key: 'Career Navigation',
    description: 'Mapping long-term scope growth and intentional skill investments.',
  },
];

export const CAREER_GOAL_OPTIONS = [
  'Prepare for Principal / Director scope expansion',
  'Transition smoothly from IC to People Manager',
  'Strengthen executive stakeholder alignment',
  'Lead cross-functional initiatives with clarity',
  'Prevent burnout while scaling responsibilities',
  'Build confidence in high-stakes facilitation',
];

export const SKILL_OPTIONS = [
  'Executive Presence',
  'Stakeholder Alignment',
  'Strategic Communication',
  'People Leadership',
  'Delegation',
  'Conflict Resolution',
  'Career Navigation',
  'Systems Thinking',
  'Change Leadership',
];

export const COACHING_INTEREST_OPTIONS = [
  'Leadership Transition',
  'Strategic Communication',
  'Cross-Functional Influence',
  'Work Sustainability',
  'Promotion Readiness',
  'Feedback & Difficult Conversations',
];
