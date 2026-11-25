import React, { useState } from 'react';
import { ArrowRight, Calendar, Eye, Lock, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useLiveClock } from '../../hooks/useRealtimeWorkspace';
import { ActivityEntry, Coach, CoachingSession, DevelopmentGoal } from '../../types/elevate';
import { Avatar, Button, Card, EmptyState, ProgressBar, StatusLabel } from '../ui';
import {
  CINEMATIC_EASE,
  CinematicItem,
  CinematicStagger,
} from '../ui/MotionPrimitives';
import { cn } from '../../lib/utils';

interface EmployeeDashboardProps {
  userName: string;
  sessions: CoachingSession[];
  goals: DevelopmentGoal[];
  coaches: Coach[];
  activities: ActivityEntry[];
  preferredSkills: string[];
  onBookSession: (coachId?: string) => void;
  onOpenSession: (sessionId: string) => void;
  onViewCoaches: () => void;
  onViewCoachDetail: (coachId: string) => void;
  onViewGoals: () => void;
  onViewSessions: () => void;
  onUpdateGoalProgress: (goalId: string, nextProgress: number) => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  userName,
  sessions,
  goals,
  coaches,
  activities,
  preferredSkills,
  onBookSession,
  onOpenSession,
  onViewCoaches,
  onViewCoachDetail,
  onViewGoals,
  onViewSessions,
  onUpdateGoalProgress,
}) => {
  const liveClock = useLiveClock();
  const [clickedKpi, setClickedKpi] = useState<string | null>(null);

  const upcomingSessions = sessions.filter((s) => s.status === 'upcoming');
  const nextSession = upcomingSessions[0];
  const completedSessionsCount = sessions.filter((s) => s.status === 'completed').length;
  const activeGoals = goals.filter((g) => g.status === 'active');
  const sharedGoalsCount = goals.filter((g) => g.sharedWithManager).length;
  const avgProgress =
    activeGoals.length > 0
      ? Math.round(activeGoals.reduce((sum, g) => sum + g.progress, 0) / activeGoals.length)
      : 0;

  const recommendedCoaches = coaches
    .filter((c) => c.specialties.some((sp) => preferredSkills.includes(sp)))
    .slice(0, 3);
  const displayCoaches = recommendedCoaches.length > 0 ? recommendedCoaches : coaches.slice(0, 3);

  const kpis = [
    {
      id: 'goals',
      label: 'Active Goals',
      value: String(activeGoals.length),
      sub: `Avg progress ${avgProgress}%`,
      accent: false,
      onClick: onViewGoals,
    },
    {
      id: 'sessions',
      label: 'Sessions Completed',
      value: String(completedSessionsCount),
      sub: `${upcomingSessions.length} upcoming scheduled`,
      accent: false,
      onClick: onViewSessions,
    },
    {
      id: 'milestones',
      label: 'Milestones Completed',
      value: `${goals.flatMap((g) => g.milestones).filter((m) => m.completed).length} / ${
        goals.flatMap((g) => g.milestones).length
      }`,
      sub: 'On steady cadence',
      accent: true,
      onClick: onViewGoals,
    },
    {
      id: 'visibility',
      label: 'Manager Visibility',
      value: `${sharedGoalsCount} of ${goals.length}`,
      sub: 'Session notes always private',
      accent: false,
      onClick: onViewGoals,
    },
  ];

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <CinematicStagger className="space-y-8">
      {/* Greeting Header */}
      <CinematicItem className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#5B6472] tabular-nums">
            {todayFormatted} · {liveClock}
          </p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
            Welcome back, {userName.split(' ')[0]}
          </h1>
          <p className="mt-1 text-sm text-[#5B6472]">
            Focus areas: {preferredSkills.slice(0, 3).join(' · ')}
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => onBookSession()}>
          <Plus className="w-4 h-4" />
          <span>Book Coaching Session</span>
        </Button>
      </CinematicItem>

      {/* 4-Column Interactive Back-Office KPI Strip */}
      <CinematicItem>
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-[#E5E4DF] rounded-xl divide-y lg:divide-y-0 lg:divide-x divide-[#E5E4DF] overflow-hidden">
          {kpis.map((kpi) => (
            <motion.button
              key={kpi.id}
              type="button"
              whileHover={{ backgroundColor: '#FAF9F6' }}
              whileTap={{ scale: 0.982 }}
              transition={{ duration: 0.16, ease: CINEMATIC_EASE }}
              onClick={() => {
                setClickedKpi(kpi.id);
                setTimeout(() => kpi.onClick(), 120);
              }}
              className={cn(
                'p-5 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0D7A68]',
                clickedKpi === kpi.id && 'bg-[#EEF7F5]'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-[#5B6472]">{kpi.label}</p>
                <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </div>
              <p className="mt-1.5 font-display text-2xl font-semibold text-[#0F1E36] tabular-nums">
                {kpi.value}
              </p>
              <p
                className={cn(
                  'mt-1 text-xs tabular-nums',
                  kpi.accent ? 'text-[#0D7A68]' : 'text-[#5B6472]'
                )}
              >
                {kpi.sub}
              </p>
            </motion.button>
          ))}
        </div>
      </CinematicItem>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: Upcoming Session + Active Goals */}
        <div className="lg:col-span-7 space-y-6">
          <CinematicItem>
            <Card padding="md">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                  Upcoming coaching session
                </h2>
                <StatusLabel tone="private" label="Private workspace" />
              </div>

              {nextSession ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E4DF]">
                    <div className="flex items-center gap-3.5">
                      <Avatar src={nextSession.coachAvatar} name={nextSession.coachName} size="md" />
                      <div>
                        <p className="text-sm font-semibold text-[#0F1E36]">
                          {nextSession.coachName}
                        </p>
                        <p className="text-xs text-[#5B6472]">{nextSession.coachTitle}</p>
                        <p className="mt-1 text-xs font-medium text-[#0D7A68] tabular-nums">
                          {nextSession.dateLabel} · {nextSession.time} ({nextSession.durationMins} min
                          · {nextSession.format})
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => onOpenSession(nextSession.id)}
                    >
                      Open Session Prep
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5B6472]">
                    <span className="truncate">
                      Topic:{' '}
                      <strong className="font-medium text-[#0F1E36]">{nextSession.topic}</strong>
                    </span>
                    <span className="tabular-nums shrink-0">
                      Prep checklist:{' '}
                      {nextSession.prepChecklist.filter((p) => p.completed).length}/
                      {nextSession.prepChecklist.length} ready
                    </span>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon={<Calendar className="w-5 h-5" />}
                  title="No upcoming coaching session"
                  description="Schedule your next 1-on-1 to review current development milestones and rehearse upcoming leadership priorities."
                  actionLabel="Schedule Session"
                  onAction={() => onBookSession()}
                />
              )}
            </Card>
          </CinematicItem>

          <CinematicItem>
            <Card padding="md">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                    Active development goals
                  </h2>
                  <p className="text-xs text-[#5B6472] mt-0.5">
                    Update progress or manage whether each goal is shared with your manager.
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={onViewGoals}>
                  <span>Manage all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              {activeGoals.length === 0 ? (
                <EmptyState
                  title="No active goals yet"
                  description="Create a personal development goal to connect your coaching sessions to measurable workplace milestones."
                  actionLabel="Create Goal"
                  onAction={onViewGoals}
                />
              ) : (
                <div className="divide-y divide-[#E5E4DF]">
                  {activeGoals.map((goal) => (
                    <div key={goal.id} className="py-4 first:pt-0 last:pb-0 space-y-2.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-[#0F1E36] leading-snug">
                            {goal.title}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5B6472]">
                            <span>{goal.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">Target {goal.targetDate}</span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-[#0F1E36]">
                              {goal.sharedWithManager ? (
                                <>
                                  <Eye className="w-3 h-3 text-[#0D7A68]" />
                                  <span>Shared with manager</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-[#5B6472]" />
                                  <span>Private to you</span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-sm font-semibold text-[#0F1E36] tabular-nums shrink-0">
                          {goal.progress}%
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <ProgressBar value={goal.progress} className="flex-1" />
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() =>
                            onUpdateGoalProgress(goal.id, Math.min(100, goal.progress + 10))
                          }
                          className="text-xs font-medium text-[#0D7A68] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          +10% progress
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </CinematicItem>
        </div>

        {/* Right 5 Columns: Recommended Coaches + Recent Activity */}
        <div className="lg:col-span-5 space-y-6">
          <CinematicItem>
            <Card padding="md">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                  Recommended coaches
                </h2>
                <Button variant="ghost" size="sm" onClick={onViewCoaches}>
                  <span>Browse directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="divide-y divide-[#E5E4DF]">
                {displayCoaches.map((coach) => (
                  <motion.div
                    key={coach.id}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.16, ease: CINEMATIC_EASE }}
                    className="py-4 first:pt-0 last:pb-0 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar src={coach.avatarUrl} name={coach.name} size="md" />
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => onViewCoachDetail(coach.id)}
                          className="text-sm font-semibold text-[#0F1E36] hover:text-[#0D7A68] text-left cursor-pointer"
                        >
                          {coach.name}
                        </button>
                        <p className="text-xs text-[#5B6472] truncate">{coach.title}</p>
                        <p className="mt-1 text-xs text-[#5B6472] tabular-nums">
                          {coach.yearsExperience} yrs · {coach.rating.toFixed(1)} ({coach.reviewCount})
                          · {coach.nextAvailable}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-[#5B6472] truncate">
                        {coach.specialties.slice(0, 2).join(' · ')}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBookSession(coach.id)}
                      >
                        Book
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </CinematicItem>

          <CinematicItem>
            <Card padding="md">
              <h2 className="font-display text-lg font-semibold text-[#0F1E36] mb-4">
                Recent activity
              </h2>
              <div className="divide-y divide-[#E5E4DF]">
                {activities.slice(0, 5).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
                    className="py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-medium text-[#0F1E36]">{item.title}</p>
                      <span className="text-[11px] text-[#5B6472] whitespace-nowrap shrink-0 tabular-nums">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6472] mt-0.5">{item.context}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </CinematicItem>
        </div>
      </div>
    </CinematicStagger>
  );
};
