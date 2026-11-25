import React, { useState } from 'react';
import { CheckCircle2, Eye, Lock, ShieldCheck, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MANAGER_TEAM_TRENDS,
  MANAGER_THEME_AGGREGATES,
  TEAM_SHARED_PEER_UPDATES,
} from '../../data/mockData';
import { useLiveClock } from '../../hooks/useRealtimeWorkspace';
import { AppScreen, DevelopmentGoal } from '../../types/elevate';
import { Button, Card, EmptyState, ProgressBar, SegmentedTabs, StatusLabel } from '../ui';
import {
  CINEMATIC_EASE,
  CinematicItem,
  CinematicStagger,
} from '../ui/MotionPrimitives';
import { cn } from '../../lib/utils';

interface ManagerDashboardProps {
  activeTab: Extract<AppScreen, 'manager-overview' | 'manager-outcomes' | 'manager-privacy'>;
  onSelectTab: (screen: AppScreen) => void;
  employeeName: string;
  employeeGoals: DevelopmentGoal[];
  onSwitchToEmployee: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  activeTab,
  onSelectTab,
  employeeName,
  employeeGoals,
  onSwitchToEmployee,
}) => {
  const liveClock = useLiveClock();
  const [selectedPeriod, setSelectedPeriod] = useState(MANAGER_TEAM_TRENDS[3].period);
  const [focusedKpi, setFocusedKpi] = useState<string>('participation');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [metricFilter, setMetricFilter] = useState<'all' | 'completed' | 'active'>('all');

  const employeeSharedGoals = employeeGoals
    .filter((g) => g.sharedWithManager)
    .map((g) => ({
      id: g.id,
      employeeName,
      role: 'Senior Product Manager',
      goalTitle: g.title,
      category: g.category,
      progress: g.progress,
      status: g.status === 'completed' ? 'Completed' : 'On Track',
      sharedOn: g.updatedAt,
      isLiveEmployee: true,
    }));

  const combinedSharedOutcomes = [
    ...employeeSharedGoals,
    ...TEAM_SHARED_PEER_UPDATES.map((p) => ({ ...p, isLiveEmployee: false })),
  ].filter((item) => {
    const matchesStatus =
      metricFilter === 'completed'
        ? item.status === 'Completed'
        : metricFilter === 'active'
        ? item.status !== 'Completed'
        : true;
    const matchesTheme =
      !selectedTheme ||
      item.category.toLowerCase().includes(selectedTheme.toLowerCase().split(' ')[0]);
    return matchesStatus && matchesTheme;
  });

  const activeTrend =
    MANAGER_TEAM_TRENDS.find((t) => t.period === selectedPeriod) || MANAGER_TEAM_TRENDS[3];

  const kpiCards = [
    {
      id: 'participation',
      label: 'Team Participation',
      value: `${activeTrend.participationPct}%`,
      note: '16 of 19 eligible enrolled',
      highlight: true,
      detail: 'Enrollment grew +22 percentage points since Q1 after switching to opt-in privacy.',
    },
    {
      id: 'sessions',
      label: `Sessions (${activeTrend.period})`,
      value: String(activeTrend.sessionsCompleted),
      note: '3.4 avg per active participant',
      highlight: false,
      detail: 'Consistent bi-weekly cadence across Product, Design, and Platform Engineering.',
    },
    {
      id: 'completion',
      label: 'Goal Completion Rate',
      value: `${activeTrend.goalsCompletedPct}%`,
      note: 'Across voluntarily shared goals',
      highlight: false,
      detail: 'Reflects milestones marked complete by employees who opted to share goals.',
    },
    {
      id: 'shared',
      label: 'Opt-In Goal Sharing',
      value: String(combinedSharedOutcomes.length),
      note: 'Live-synced with employee toggles',
      highlight: false,
      detail: 'Updates instantaneously when employees toggle goal sharing in their private space.',
    },
  ];

  const activeKpiDetail = kpiCards.find((k) => k.id === focusedKpi) || kpiCards[0];

  return (
    <CinematicStagger className="space-y-8">
      {/* Header */}
      <CinematicItem className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#0D7A68] tabular-nums">
            Product &amp; Engineering Organization (19 reports) · Live {liveClock}
          </p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
            Team development back office
          </h1>
          <p className="mt-1 text-sm text-[#5B6472]">
            Click any KPI, quarter bar, or capability theme below to inspect aggregate team trends.
          </p>
        </div>

        <SegmentedTabs
          activeTab={activeTab}
          onChange={(id) => onSelectTab(id as AppScreen)}
          tabs={[
            { id: 'manager-overview', label: 'Overview' },
            { id: 'manager-outcomes', label: 'Shared Goals', count: combinedSharedOutcomes.length },
            { id: 'manager-privacy', label: 'Privacy Charter' },
          ]}
        />
      </CinematicItem>

      {/* Privacy Notice Surface */}
      <CinematicItem>
        <div className="p-4 sm:p-5 rounded-xl bg-[#EEF7F5] border border-[#0D7A68]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0D7A68] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#0F1E36]">
                Privacy-by-design boundary active
              </p>
              <p className="text-xs text-[#374151] mt-0.5 leading-relaxed">
                Same separates private coaching from management visibility. You cannot view
                session transcripts, personal notes, coach matches, or unshared goals.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onSwitchToEmployee}>
            Test Employee Sharing Toggle
          </Button>
        </div>
      </CinematicItem>

      <AnimatePresence mode="wait">
        {activeTab === 'manager-overview' && (
          <motion.div
            key="manager-overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
            className="space-y-6"
          >
            {/* 4-Column Interactive Cinematic KPI Strip */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-[#E5E4DF] rounded-xl divide-y lg:divide-y-0 lg:divide-x divide-[#E5E4DF] overflow-hidden">
                {kpiCards.map((card) => {
                  const selected = focusedKpi === card.id;
                  return (
                    <motion.button
                      key={card.id}
                      type="button"
                      whileHover={{ backgroundColor: '#FAF9F6' }}
                      whileTap={{ scale: 0.978 }}
                      transition={{ duration: 0.15, ease: CINEMATIC_EASE }}
                      onClick={() => setFocusedKpi(card.id)}
                      className={cn(
                        'relative p-5 text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0D7A68]',
                        selected && 'bg-[#FAF9F6]'
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="manager-kpi-indicator"
                          transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
                          className="absolute inset-x-0 top-0 h-0.5 bg-[#0D7A68]"
                        />
                      )}
                      <p className="text-xs text-[#5B6472]">{card.label}</p>
                      <motion.p
                        key={card.value}
                        initial={{ opacity: 0.4, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
                        className="mt-1.5 font-display text-2xl font-semibold text-[#0F1E36] tabular-nums"
                      >
                        {card.value}
                      </motion.p>
                      <p
                        className={cn(
                          'mt-1 text-xs tabular-nums',
                          card.highlight ? 'text-[#0D7A68]' : 'text-[#5B6472]'
                        )}
                      >
                        {card.note}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Animated KPI Context Bar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeKpiDetail.id + selectedPeriod}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: CINEMATIC_EASE }}
                  className="px-4 py-2.5 rounded-lg bg-white border border-[#E5E4DF] text-xs text-[#374151] flex flex-wrap items-center justify-between gap-2"
                >
                  <span>
                    <strong className="text-[#0F1E36]">{activeKpiDetail.label}:</strong>{' '}
                    {activeKpiDetail.detail}
                  </span>
                  <span className="font-mono text-[#0D7A68] tabular-nums">{selectedPeriod}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Interactive Cinematic Coaching Engagement Bar Chart */}
              <Card padding="md" className="lg:col-span-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                      Quarterly coaching engagement trends
                    </h2>
                    <p className="text-xs text-[#5B6472] mt-0.5">
                      Click any quarter column to animate KPI figures and inspect cohort pace.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#5B6472]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#0F1E36]" />
                      Participation %
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#0D7A68]" />
                      Goal Completion %
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-end h-56 pt-4 pb-2 border-b border-[#E5E4DF]">
                  {MANAGER_TEAM_TRENDS.map((point, idx) => {
                    const isSelected = point.period === selectedPeriod;
                    return (
                      <motion.button
                        key={point.period}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedPeriod(point.period)}
                        className={cn(
                          'relative h-full flex flex-col justify-end items-center gap-2 rounded-lg p-2 transition-colors cursor-pointer',
                          isSelected ? 'bg-[#EEF7F5]/70' : 'hover:bg-[#FAF9F6]'
                        )}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="manager-quarter-ring"
                            transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
                            className="absolute inset-0 rounded-lg ring-1 ring-[#0D7A68]/50 pointer-events-none"
                          />
                        )}
                        <div className="relative z-10 flex items-end gap-2 h-40 w-full justify-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[11px] font-mono text-[#0F1E36] tabular-nums">
                              {point.participationPct}%
                            </span>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: Math.round(point.participationPct * 1.2) }}
                              transition={{
                                duration: 0.55,
                                delay: idx * 0.06,
                                ease: CINEMATIC_EASE,
                              }}
                              className="w-6 sm:w-8 rounded-t-md bg-[#0F1E36]"
                            />
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[11px] font-mono text-[#0D7A68] tabular-nums">
                              {point.goalsCompletedPct}%
                            </span>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: Math.round(point.goalsCompletedPct * 1.2) }}
                              transition={{
                                duration: 0.55,
                                delay: idx * 0.06 + 0.08,
                                ease: CINEMATIC_EASE,
                              }}
                              className="w-6 sm:w-8 rounded-t-md bg-[#0D7A68]"
                            />
                          </div>
                        </div>
                        <span className="relative z-10 text-xs font-medium text-[#0F1E36] tabular-nums">
                          {point.period}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Animated Quarter Drilldown Strip */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTrend.period}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: CINEMATIC_EASE }}
                    className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5B6472]"
                  >
                    <span>
                      Selected window:{' '}
                      <strong className="text-[#0F1E36]">{activeTrend.period}</strong>
                    </span>
                    <span className="tabular-nums">
                      {activeTrend.sessionsCompleted} total team coaching sessions completed
                    </span>
                  </motion.div>
                </AnimatePresence>
              </Card>

              {/* Clickable Anonymized Development Focus Themes */}
              <Card padding="md" className="lg:col-span-5 space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                      Anonymized capability themes
                    </h2>
                    <p className="text-xs text-[#5B6472] mt-0.5">
                      Click a theme to filter shared team goals below (cohort n &ge; 5).
                    </p>
                  </div>
                  {selectedTheme && (
                    <button
                      type="button"
                      onClick={() => setSelectedTheme(null)}
                      className="text-xs font-medium text-[#0D7A68] hover:underline cursor-pointer shrink-0"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  {MANAGER_THEME_AGGREGATES.map((item) => {
                    const isSelected = selectedTheme === item.theme;
                    return (
                      <motion.button
                        key={item.theme}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => setSelectedTheme(isSelected ? null : item.theme)}
                        className={cn(
                          'w-full text-left p-2.5 rounded-lg border transition-colors cursor-pointer space-y-1.5',
                          isSelected
                            ? 'bg-[#EEF7F5] border-[#0D7A68]'
                            : 'bg-white border-transparent hover:bg-[#FAF9F6]'
                        )}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#0F1E36]">{item.theme}</span>
                          <span className="font-mono text-[#5B6472] tabular-nums">
                            {item.percentage}% ({item.participantsCount} members)
                          </span>
                        </div>
                        <ProgressBar value={item.percentage} />
                      </motion.button>
                    );
                  })}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(activeTab === 'manager-overview' || activeTab === 'manager-outcomes') && (
        <CinematicItem>
          <Card padding="md" className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                  Voluntarily shared development goals
                </h2>
                <p className="text-xs text-[#5B6472] mt-0.5">
                  Employees explicitly choose which goals appear here
                  {selectedTheme ? ` · Filtered by ${selectedTheme}` : ''}.
                </p>
              </div>
              <SegmentedTabs
                activeTab={metricFilter}
                onChange={(v) => setMetricFilter(v as 'all' | 'completed' | 'active')}
                tabs={[
                  { id: 'all', label: 'All Shared' },
                  { id: 'active', label: 'In Progress' },
                  { id: 'completed', label: 'Completed' },
                ]}
              />
            </div>

            {combinedSharedOutcomes.length === 0 ? (
              <EmptyState
                icon={<Eye className="w-5 h-5" />}
                title="No shared goals match this filter"
                description="Team members control whether individual development goals are shared with management."
                actionLabel={selectedTheme ? 'Reset Theme Filter' : undefined}
                onAction={selectedTheme ? () => setSelectedTheme(null) : undefined}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E4DF] text-xs font-medium text-[#5B6472]">
                      <th className="py-3 pr-4">Team Member</th>
                      <th className="py-3 px-4">Shared Goal</th>
                      <th className="py-3 px-4">Capability Area</th>
                      <th className="py-3 px-4 text-right">Progress</th>
                      <th className="py-3 pl-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E4DF] text-sm">
                    {combinedSharedOutcomes.map((row) => (
                      <motion.tr
                        key={row.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.22, ease: CINEMATIC_EASE }}
                        className="hover:bg-[#FAF9F6] transition-colors"
                      >
                        <td className="py-3.5 pr-4 whitespace-nowrap">
                          <p className="font-medium text-[#0F1E36]">{row.employeeName}</p>
                          <p className="text-xs text-[#5B6472]">{row.role}</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-md">
                          <p className="text-[#111827] leading-snug">{row.goalTitle}</p>
                          {row.isLiveEmployee && (
                            <p className="text-[11px] text-[#0D7A68] mt-0.5">
                              Live-synced from Maya&apos;s Employee Workspace
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#5B6472] whitespace-nowrap">
                          {row.category}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-xs font-semibold text-[#0F1E36] tabular-nums whitespace-nowrap">
                          {row.progress}%
                        </td>
                        <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                          <StatusLabel
                            tone={row.status === 'Completed' ? 'success' : 'neutral'}
                            label={row.status}
                          />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </CinematicItem>
      )}

      {activeTab === 'manager-privacy' && (
        <motion.div
          key="manager-privacy"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card padding="md" className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#0A6153]">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                What managers can see
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-[#374151]">
              <li className="flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-[#0D7A68] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0F1E36]">Aggregate team participation:</strong> Overall
                  enrollment percentage and total sessions completed across groups of 5 or more.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-[#0D7A68] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0F1E36]">Cohort-level skill themes:</strong> High-level
                  capability trends to inform team L&amp;D workshops.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-[#0D7A68] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0F1E36]">Explicitly shared goals:</strong> Goal title and
                  percentage progress only when an employee opts in per goal.
                </span>
              </li>
            </ul>
          </Card>

          <Card padding="md" className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#DC2626]">
              <XCircle className="w-5 h-5" />
              <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                Strictly blocked from managers
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-[#374151]">
              <li className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#5B6472] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0F1E36]">Session topics &amp; transcripts:</strong>{' '}
                  Everything discussed in 1-on-1 coaching sessions remains confidential.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#5B6472] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0F1E36]">Personal notes &amp; reflections:</strong>{' '}
                  Pre-session checklists, private journals, and confidence self-ratings.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#5B6472] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0F1E36]">Coach selection &amp; individual cadence:</strong>{' '}
                  Which coach an employee chose or whether they cancelled/rescheduled a session.
                </span>
              </li>
            </ul>
          </Card>
        </motion.div>
      )}
    </CinematicStagger>
  );
};
