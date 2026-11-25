/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { CoachDirectory } from './components/app/CoachDirectory';
import { CoachProfile } from './components/app/CoachProfile';
import { DevelopmentGoals } from './components/app/DevelopmentGoals';
import { EmployeeDashboard } from './components/app/EmployeeDashboard';
import { ManagerDashboard } from './components/app/ManagerDashboard';
import { SessionBooking } from './components/app/SessionBooking';
import { SessionExperience } from './components/app/SessionExperience';
import { SessionsPage } from './components/app/SessionsPage';
import { AuthScreens } from './components/auth/AuthScreens';
import { CaseStudyPage } from './components/case-study/CaseStudyPage';
import { DesignSystemPage } from './components/design-system/DesignSystemPage';
import { TopNav } from './components/layout/TopNav';
import { WorkspaceShell } from './components/layout/WorkspaceShell';
import { MarketingPage } from './components/marketing/MarketingPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { CinematicPage } from './components/ui/MotionPrimitives';
import { INITIAL_COACHES } from './data/mockData';
import { useRealtimeWorkspace } from './hooks/useRealtimeWorkspace';
import {
  AppScreen,
  AuthScreenMode,
  CoachingSession,
  DevelopmentGoal,
  OnboardingState,
  TopView,
  UserRole,
} from './types/elevate';

export default function App() {
  const { state, commit, lastSyncedLabel, resetDemoData } = useRealtimeWorkspace();
  const { isSignedIn, userName, role, appScreen, sessions, goals, activities, onboarding } = state;

  const [topView, setTopView] = useState<TopView>('marketing');
  const [authMode, setAuthMode] = useState<AuthScreenMode>('signin');
  const [coaches] = useState(INITIAL_COACHES);

  // Selected sub-screen targets
  const [selectedCoachId, setSelectedCoachId] = useState<string>(INITIAL_COACHES[0].id);
  const [bookingPrefill, setBookingPrefill] = useState<{
    coachId?: string;
    dateISO?: string;
    time?: string;
  }>({});
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    sessions[0]?.id || 'sess-101'
  );

  const setAppScreen = (screen: AppScreen) => {
    commit((prev) => ({ ...prev, appScreen: screen }));
  };

  const handleNavigateTop = (view: TopView) => {
    if (view === 'app' && !isSignedIn) {
      setAuthMode('signin');
      setTopView('auth');
    } else {
      setTopView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: AuthScreenMode) => {
    setAuthMode(mode);
    setTopView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthenticated = ({
    name,
    role: chosenRole,
    runOnboarding,
  }: {
    name: string;
    email: string;
    role: UserRole;
    runOnboarding: boolean;
  }) => {
    commit((prev) => ({
      ...prev,
      userName: name,
      role: chosenRole,
      isSignedIn: true,
      appScreen: chosenRole === 'manager' ? 'manager-overview' : 'dashboard',
    }));

    if (chosenRole === 'manager') {
      setTopView('app');
    } else if (runOnboarding) {
      setTopView('onboarding');
    } else {
      setTopView('app');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOnboarding = (finalState: OnboardingState, coachIdToBook?: string) => {
    commit((prev) => {
      const existingTitles = new Set(prev.goals.map((g) => g.title.toLowerCase()));
      const newGoals: DevelopmentGoal[] = finalState.careerGoals
        .filter((title) => !existingTitles.has(title.toLowerCase()))
        .slice(0, 2)
        .map((title, idx) => ({
          id: `goal-onb-${Date.now()}-${idx}`,
          title,
          category: finalState.skillsToImprove[0] || 'Career Navigation',
          targetDate: '2027-03-31',
          progress: 10,
          status: 'active',
          sharedWithManager: false,
          updatedAt: 'Just now',
          milestones: [
            {
              id: `m-onb-${Date.now()}-${idx}`,
              title: 'Discuss initial roadmap in first coaching session',
              completed: false,
            },
          ],
        }));

      const nextActivities =
        newGoals.length > 0
          ? [
              {
                id: `act-${Date.now()}`,
                timestamp: 'Just now',
                title: 'Completed onboarding assessment',
                context: `Added ${newGoals.length} private goals`,
              },
              ...prev.activities,
            ]
          : prev.activities;

      return {
        ...prev,
        onboarding: finalState,
        goals: [...newGoals, ...prev.goals],
        activities: nextActivities,
        appScreen: coachIdToBook ? 'booking' : 'dashboard',
      };
    });

    if (coachIdToBook) {
      setBookingPrefill({ coachId: coachIdToBook });
    }
    setTopView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchRole = (nextRole: UserRole) => {
    commit((prev) => ({
      ...prev,
      role: nextRole,
      appScreen: nextRole === 'manager' ? 'manager-overview' : 'dashboard',
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPrototypeScreen = (targetRole: UserRole, screen: AppScreen) => {
    commit((prev) => ({
      ...prev,
      isSignedIn: true,
      role: targetRole,
      appScreen: screen,
    }));
    setTopView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartBooking = (coachId?: string, dateISO?: string, time?: string) => {
    setBookingPrefill({ coachId, dateISO, time });
    setAppScreen('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (newSession: CoachingSession) => {
    commit((prev) => ({
      ...prev,
      sessions: [newSession, ...prev.sessions],
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Booked coaching session',
          context: `${newSession.coachName} · ${newSession.dateLabel} at ${newSession.time}`,
        },
        ...prev.activities,
      ],
    }));
    setSelectedSessionId(newSession.id);
  };

  const handleRescheduleSession = (
    sessionId: string,
    dateISO: string,
    dateLabel: string,
    time: string
  ) => {
    commit((prev) => ({
      ...prev,
      sessions: prev.sessions.map((s) =>
        s.id === sessionId ? { ...s, dateISO, dateLabel, time } : s
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Rescheduled coaching session',
          context: `${dateLabel} at ${time}`,
        },
        ...prev.activities,
      ],
    }));
  };

  const handleCancelSession = (sessionId: string, reason: string) => {
    commit((prev) => ({
      ...prev,
      sessions: prev.sessions.map((s) =>
        s.id === sessionId ? { ...s, status: 'cancelled', cancellationReason: reason } : s
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Cancelled coaching session',
          context: reason,
        },
        ...prev.activities,
      ],
    }));
  };

  const handleUpdateSession = (updated: CoachingSession) => {
    commit((prev) => ({
      ...prev,
      sessions: prev.sessions.map((s) => (s.id === updated.id ? updated : s)),
    }));
  };

  const handleAddGoal = (goal: DevelopmentGoal) => {
    commit((prev) => ({
      ...prev,
      goals: [goal, ...prev.goals],
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Created development goal',
          context: goal.title,
        },
        ...prev.activities,
      ],
    }));
  };

  const handleUpdateGoalProgress = (goalId: string, progress: number) => {
    commit((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              progress,
              status: progress >= 100 ? 'completed' : 'active',
              updatedAt: 'Just now',
            }
          : g
      ),
    }));
  };

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    commit((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => {
        if (g.id !== goalId) return g;
        const nextMilestones = g.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = nextMilestones.filter((m) => m.completed).length;
        const nextProgress =
          nextMilestones.length > 0
            ? Math.round((completedCount / nextMilestones.length) * 100)
            : g.progress;
        return {
          ...g,
          milestones: nextMilestones,
          progress: nextProgress,
          status: nextProgress >= 100 ? 'completed' : 'active',
          updatedAt: 'Just now',
        };
      }),
    }));
  };

  const handleAddMilestone = (goalId: string, title: string) => {
    commit((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => {
        if (g.id !== goalId) return g;
        const nextMilestones = [
          ...g.milestones,
          { id: `m-${Date.now()}`, title, completed: false },
        ];
        const completedCount = nextMilestones.filter((m) => m.completed).length;
        const nextProgress = Math.round((completedCount / nextMilestones.length) * 100);
        return {
          ...g,
          milestones: nextMilestones,
          progress: nextProgress,
          status: nextProgress >= 100 ? 'completed' : 'active',
          updatedAt: 'Just now',
        };
      }),
    }));
  };

  const handleToggleShareGoal = (goalId: string) => {
    commit((prev) => {
      let toggledTitle = '';
      let nextSharedVal = false;
      const nextGoals = prev.goals.map((g) => {
        if (g.id !== goalId) return g;
        toggledTitle = g.title;
        nextSharedVal = !g.sharedWithManager;
        return { ...g, sharedWithManager: nextSharedVal, updatedAt: 'Just now' };
      });
      return {
        ...prev,
        goals: nextGoals,
        activities: toggledTitle
          ? [
              {
                id: `act-${Date.now()}`,
                timestamp: 'Just now',
                title: nextSharedVal ? 'Shared goal with manager' : 'Set goal back to private',
                context: toggledTitle,
              },
              ...prev.activities,
            ]
          : prev.activities,
      };
    });
  };

  const handleCreateGoalFromAction = (title: string) => {
    const newGoal: DevelopmentGoal = {
      id: `goal-act-${Date.now()}`,
      title,
      category: 'Coaching Follow-up',
      targetDate: '2027-01-15',
      progress: 0,
      status: 'active',
      sharedWithManager: false,
      updatedAt: 'Just now',
      milestones: [{ id: `m-act-${Date.now()}`, title, completed: false }],
    };
    commit((prev) => ({
      ...prev,
      goals: [newGoal, ...prev.goals],
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Promoted session action item to goal',
          context: title,
        },
        ...prev.activities,
      ],
    }));
  };

  const selectedCoach = coaches.find((c) => c.id === selectedCoachId) || coaches[0];
  const activeSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  return (
    <MotionConfig reducedMotion="user">
      {topView === 'app' ? (
        <WorkspaceShell
          role={role}
          userName={userName}
          activeScreen={appScreen}
          lastSyncedLabel={lastSyncedLabel}
          onSelectScreen={(s) => {
            setAppScreen(s);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSwitchRole={handleSwitchRole}
          onNavigateTop={handleNavigateTop}
          onStartBooking={() => handleStartBooking()}
          onRestartOnboarding={() => setTopView('onboarding')}
          onResetDemo={resetDemoData}
          onSignOut={() => {
            commit((prev) => ({ ...prev, isSignedIn: false }));
            setAuthMode('signin');
            setTopView('auth');
          }}
        >
          <AnimatePresence mode="wait">
            <CinematicPage key={`${role}-${appScreen}`}>
              {role === 'employee' ? (
                <>
                  {appScreen === 'dashboard' && (
                    <EmployeeDashboard
                      userName={userName}
                      sessions={sessions}
                      goals={goals}
                      coaches={coaches}
                      activities={activities}
                      preferredSkills={onboarding.skillsToImprove}
                      onBookSession={(coachId) => handleStartBooking(coachId)}
                      onOpenSession={(sessionId) => {
                        setSelectedSessionId(sessionId);
                        setAppScreen('session-experience');
                      }}
                      onViewCoaches={() => setAppScreen('coaches')}
                      onViewCoachDetail={(coachId) => {
                        setSelectedCoachId(coachId);
                        setAppScreen('coach-detail');
                      }}
                      onViewGoals={() => setAppScreen('goals')}
                      onViewSessions={() => setAppScreen('sessions')}
                      onUpdateGoalProgress={handleUpdateGoalProgress}
                    />
                  )}

                  {appScreen === 'coaches' && (
                    <CoachDirectory
                      coaches={coaches}
                      onViewProfile={(coachId) => {
                        setSelectedCoachId(coachId);
                        setAppScreen('coach-detail');
                      }}
                      onBookCoach={(coachId) => handleStartBooking(coachId)}
                    />
                  )}

                  {appScreen === 'coach-detail' && selectedCoach && (
                    <CoachProfile
                      coach={selectedCoach}
                      onBack={() => setAppScreen('coaches')}
                      onBook={(coachId, dateISO, time) =>
                        handleStartBooking(coachId, dateISO, time)
                      }
                    />
                  )}

                  {appScreen === 'booking' && (
                    <SessionBooking
                      coaches={coaches}
                      initialCoachId={bookingPrefill.coachId}
                      initialDateISO={bookingPrefill.dateISO}
                      initialTime={bookingPrefill.time}
                      onConfirmBooking={handleConfirmBooking}
                      onCancel={() => setAppScreen('dashboard')}
                      onViewSessions={() => setAppScreen('sessions')}
                    />
                  )}

                  {appScreen === 'sessions' && (
                    <SessionsPage
                      sessions={sessions}
                      coaches={coaches}
                      onOpenSession={(sessionId) => {
                        setSelectedSessionId(sessionId);
                        setAppScreen('session-experience');
                      }}
                      onBookNew={() => handleStartBooking()}
                      onReschedule={handleRescheduleSession}
                      onCancelSession={handleCancelSession}
                    />
                  )}

                  {appScreen === 'session-experience' && activeSession && (
                    <SessionExperience
                      session={activeSession}
                      onBack={() => setAppScreen('sessions')}
                      onUpdateSession={handleUpdateSession}
                      onCreateGoalFromAction={handleCreateGoalFromAction}
                    />
                  )}

                  {appScreen === 'goals' && (
                    <DevelopmentGoals
                      goals={goals}
                      onAddGoal={handleAddGoal}
                      onToggleMilestone={handleToggleMilestone}
                      onAddMilestone={handleAddMilestone}
                      onUpdateProgress={handleUpdateGoalProgress}
                      onToggleShare={handleToggleShareGoal}
                    />
                  )}
                </>
              ) : (
                <ManagerDashboard
                  activeTab={
                    appScreen === 'manager-outcomes' || appScreen === 'manager-privacy'
                      ? appScreen
                      : 'manager-overview'
                  }
                  onSelectTab={(s) => setAppScreen(s)}
                  employeeName={userName}
                  employeeGoals={goals}
                  onSwitchToEmployee={() => {
                    commit((prev) => ({
                      ...prev,
                      role: 'employee',
                      appScreen: 'goals',
                    }));
                  }}
                />
              )}
            </CinematicPage>
          </AnimatePresence>
        </WorkspaceShell>
      ) : (
        <div className="min-h-screen bg-[#FAF9F6] text-[#111827]">
          <TopNav
            currentView={topView}
            onNavigate={handleNavigateTop}
            onOpenAuth={handleOpenAuth}
            isSignedIn={isSignedIn}
          />

          <AnimatePresence mode="wait">
            <CinematicPage key={topView}>
              {topView === 'marketing' && (
                <MarketingPage
                  onLaunchPrototype={() => handleNavigateTop(isSignedIn ? 'app' : 'auth')}
                  onNavigateTop={handleNavigateTop}
                />
              )}

              {topView === 'auth' && (
                <AuthScreens
                  initialMode={authMode}
                  onAuthenticated={handleAuthenticated}
                  onBackToMarketing={() => handleNavigateTop('marketing')}
                />
              )}

              {topView === 'onboarding' && (
                <OnboardingFlow
                  userName={userName}
                  initialState={onboarding}
                  coaches={coaches}
                  onComplete={handleCompleteOnboarding}
                  onExit={() => {
                    setAppScreen('dashboard');
                    setTopView('app');
                  }}
                />
              )}

              {topView === 'design-system' && <DesignSystemPage />}

              {topView === 'case-study' && (
                <CaseStudyPage
                  onOpenPrototypeScreen={handleOpenPrototypeScreen}
                  onNavigateTop={handleNavigateTop}
                />
              )}
            </CinematicPage>
          </AnimatePresence>
        </div>
      )}
    </MotionConfig>
  );
}
