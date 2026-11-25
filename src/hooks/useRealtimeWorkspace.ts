import { useCallback, useEffect, useRef, useState } from 'react';
import {
  INITIAL_ACTIVITY,
  INITIAL_GOALS,
  INITIAL_ONBOARDING,
  INITIAL_SESSIONS,
} from '../data/mockData';
import {
  ActivityEntry,
  AppScreen,
  CoachingSession,
  DevelopmentGoal,
  OnboardingState,
  UserRole,
} from '../types/elevate';

export interface PersistedWorkspaceState {
  isSignedIn: boolean;
  userName: string;
  role: UserRole;
  appScreen: AppScreen;
  sessions: CoachingSession[];
  goals: DevelopmentGoal[];
  activities: ActivityEntry[];
  onboarding: OnboardingState;
  updatedAt: number;
}

const STORAGE_KEY = 'same_realtime_workspace_v1';
const CHANNEL_NAME = 'same_realtime_sync_channel';

const DEFAULT_STATE: PersistedWorkspaceState = {
  isSignedIn: false,
  userName: 'Maya Patel',
  role: 'employee',
  appScreen: 'dashboard',
  sessions: INITIAL_SESSIONS,
  goals: INITIAL_GOALS,
  activities: INITIAL_ACTIVITY,
  onboarding: INITIAL_ONBOARDING,
  updatedAt: Date.now(),
};

function loadInitialState(): PersistedWorkspaceState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedWorkspaceState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : DEFAULT_STATE.sessions,
      goals: Array.isArray(parsed.goals) ? parsed.goals : DEFAULT_STATE.goals,
      activities: Array.isArray(parsed.activities) ? parsed.activities : DEFAULT_STATE.activities,
      onboarding: parsed.onboarding ?? DEFAULT_STATE.onboarding,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useRealtimeWorkspace() {
  const [state, setState] = useState<PersistedWorkspaceState>(loadInitialState);
  const [lastSyncedLabel, setLastSyncedLabel] = useState('Live sync active');
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('BroadcastChannel' in window) {
      channelRef.current = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current.onmessage = (event: MessageEvent<PersistedWorkspaceState>) => {
        if (event.data && typeof event.data.updatedAt === 'number') {
          setState(event.data);
          setLastSyncedLabel('Synced across tabs just now');
        }
      };
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const next = JSON.parse(e.newValue) as PersistedWorkspaceState;
          setState(next);
          setLastSyncedLabel('Synced across tabs just now');
        } catch {
          // ignore malformed storage event
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      channelRef.current?.close();
    };
  }, []);

  const commit = useCallback(
    (updater: (prev: PersistedWorkspaceState) => PersistedWorkspaceState) => {
      setState((prev) => {
        const next: PersistedWorkspaceState = {
          ...updater(prev),
          updatedAt: Date.now(),
        };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          channelRef.current?.postMessage(next);
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const ss = String(now.getSeconds()).padStart(2, '0');
          setLastSyncedLabel(`Saved & synced ${hh}:${mm}:${ss}`);
        } catch {
          // ignore storage quota errors
        }
        return next;
      });
    },
    []
  );

  const resetDemoData = useCallback(() => {
    const fresh: PersistedWorkspaceState = {
      ...DEFAULT_STATE,
      isSignedIn: state.isSignedIn,
      userName: state.userName,
      role: state.role,
      appScreen: state.role === 'manager' ? 'manager-overview' : 'dashboard',
      updatedAt: Date.now(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      channelRef.current?.postMessage(fresh);
    } catch {
      // ignore
    }
    setState(fresh);
    setLastSyncedLabel('Demo workspace restored');
  }, [state.isSignedIn, state.userName, state.role]);

  return {
    state,
    commit,
    lastSyncedLabel,
    resetDemoData,
  };
}

export function useLiveClock(): string {
  const formatNow = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const [clock, setClock] = useState<string>(formatNow);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatNow());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return clock;
}
