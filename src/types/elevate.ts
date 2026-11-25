export type UserRole = 'employee' | 'manager';

export type TopView =
  | 'marketing'
  | 'auth'
  | 'onboarding'
  | 'app'
  | 'design-system'
  | 'case-study';

export type AuthScreenMode = 'signin' | 'signup' | 'forgot';

export type AppScreen =
  | 'dashboard'
  | 'coaches'
  | 'coach-detail'
  | 'booking'
  | 'sessions'
  | 'session-experience'
  | 'goals'
  | 'manager-overview'
  | 'manager-outcomes'
  | 'manager-privacy';

export type SessionFormat = 'Video 1:1' | 'Audio Walk' | 'Async Strategy Review';

export interface CoachSlot {
  dateISO: string;
  dateLabel: string;
  dayShort: string;
  times: string[];
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  credentials: string;
  avatarUrl?: string;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  formats: SessionFormat[];
  languages: string[];
  timezone: string;
  nextAvailable: string;
  availableThisWeek: boolean;
  bio: string;
  methodology: string;
  clientFeedbackThemes: string[];
  availability: CoachSlot[];
}

export interface PrepItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
  linkedGoalId?: string;
}

export interface CoachingSession {
  id: string;
  coachId: string;
  coachName: string;
  coachTitle: string;
  coachAvatar?: string;
  dateISO: string;
  dateLabel: string;
  time: string;
  durationMins: number;
  format: SessionFormat;
  topic: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  prepChecklist: PrepItem[];
  privateNotes: string;
  reflection: {
    takeaway: string;
    confidenceShift: 'Uncertain' | 'Steady' | 'Clearer' | 'Ready to Act';
    voluntarySummary: string;
  };
  actionItems: ActionItem[];
  cancellationReason?: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface DevelopmentGoal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  progress: number;
  status: 'active' | 'completed';
  sharedWithManager: boolean;
  milestones: Milestone[];
  updatedAt: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  title: string;
  context: string;
}

export interface OnboardingState {
  completed: boolean;
  assessment: Record<string, number>;
  careerGoals: string[];
  skillsToImprove: string[];
  coachingInterests: string[];
  preferredFormat: SessionFormat;
}

export interface TeamTrendPoint {
  period: string;
  participationPct: number;
  sessionsCompleted: number;
  goalsCompletedPct: number;
}

export interface TeamThemeAggregate {
  theme: string;
  percentage: number;
  participantsCount: number;
}
