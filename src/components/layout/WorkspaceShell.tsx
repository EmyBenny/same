import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Compass,
  FileText,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  RotateCcw,
  ShieldCheck,
  Target,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EMPLOYEE_AVATAR } from '../../data/mockData';
import { AppScreen, TopView, UserRole } from '../../types/elevate';
import { Avatar, Button } from '../ui';
import { CINEMATIC_EASE } from '../ui/MotionPrimitives';
import { cn } from '../../lib/utils';

interface WorkspaceShellProps {
  role: UserRole;
  userName: string;
  activeScreen: AppScreen;
  lastSyncedLabel: string;
  onSelectScreen: (screen: AppScreen) => void;
  onSwitchRole: (role: UserRole) => void;
  onNavigateTop: (view: TopView) => void;
  onStartBooking: () => void;
  onRestartOnboarding: () => void;
  onResetDemo: () => void;
  onSignOut: () => void;
  children: React.ReactNode;
}

const BREADCRUMB_MAP: Record<AppScreen, string> = {
  dashboard: 'Back Office / Employee Dashboard',
  coaches: 'Back Office / Coach Directory',
  'coach-detail': 'Back Office / Coach Directory / Profile',
  booking: 'Back Office / Book a Session',
  sessions: 'Back Office / Sessions',
  'session-experience': 'Back Office / Sessions / Prep & Notes',
  goals: 'Back Office / Development Goals',
  'manager-overview': 'Manager Back Office / Team Overview',
  'manager-outcomes': 'Manager Back Office / Shared Outcomes',
  'manager-privacy': 'Manager Back Office / Privacy Charter',
};

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({
  role,
  userName,
  activeScreen,
  lastSyncedLabel,
  onSelectScreen,
  onSwitchRole,
  onNavigateTop,
  onStartBooking,
  onRestartOnboarding,
  onResetDemo,
  onSignOut,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const employeeLinks: Array<{
    id: AppScreen;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { id: 'coaches', label: 'Find a Coach', Icon: Compass },
    { id: 'sessions', label: 'Sessions', Icon: Calendar },
    { id: 'goals', label: 'Development Goals', Icon: Target },
  ];

  const managerLinks: Array<{
    id: AppScreen;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'manager-overview', label: 'Team Overview', Icon: Users },
    { id: 'manager-outcomes', label: 'Shared Outcomes', Icon: Target },
    { id: 'manager-privacy', label: 'Privacy Charter', Icon: ShieldCheck },
  ];

  const links = role === 'employee' ? employeeLinks : managerLinks;

  const handleNav = (id: AppScreen) => {
    onSelectScreen(id);
    setSidebarOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E5E4DF]">
      {/* Brand Header matching Light Green */}
      <div className="px-5 h-16 flex items-center justify-between bg-[#DDF0E6] border-b border-[#BCE0CE] shrink-0">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigateTop('marketing')}
          className="font-display text-lg font-bold tracking-tight text-[#0F1E36] cursor-pointer"
        >
          Same
        </motion.button>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          className="lg:hidden p-1.5 rounded-lg text-[#0F1E36] hover:bg-[#CBE5D7]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Role Switcher with Cinematic Sliding Pill */}
      <div className="p-4 border-b border-[#E5E4DF]">
        <p className="text-[11px] font-medium text-[#5B6472] mb-2">Back-Office Perspective</p>
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#F3F2EE] rounded-lg border border-[#E5E4DF]">
          {(['employee', 'manager'] as UserRole[]).map((r) => {
            const active = role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => {
                  onSwitchRole(r);
                  setSidebarOpen(false);
                }}
                className={cn(
                  'relative py-1.5 px-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap',
                  active ? 'text-[#0F1E36]' : 'text-[#5B6472] hover:text-[#0F1E36]'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="workspace-role-pill"
                    transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
                    className="absolute inset-0 bg-white rounded-md shadow-xs border border-[#E5E4DF]/70"
                  />
                )}
                <span className="relative z-10 capitalize">{r}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#5B6472]">
          <Lock className="w-3 h-3 text-[#0D7A68] shrink-0" />
          <span>
            {role === 'employee'
              ? 'Private coaching space'
              : 'Aggregate & shared data only'}
          </span>
        </div>
      </div>

      {/* Primary Workspace Nav */}
      <nav aria-label="Workspace navigation" className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(({ id, label, Icon }) => {
          const isActive =
            activeScreen === id ||
            (id === 'coaches' && activeScreen === 'coach-detail') ||
            (id === 'sessions' && activeScreen === 'session-experience');
          return (
            <motion.button
              key={id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNav(id)}
              className={cn(
                'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
                isActive ? 'text-[#0A6153]' : 'text-[#374151] hover:bg-[#F3F2EE] hover:text-[#0F1E36]'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="workspace-nav-active"
                  transition={{ duration: 0.26, ease: CINEMATIC_EASE }}
                  className="absolute inset-0 bg-[#EEF7F5] rounded-lg border border-[#0D7A68]/15"
                />
              )}
              <Icon
                className={cn(
                  'relative z-10 w-4 h-4 shrink-0',
                  isActive ? 'text-[#0D7A68]' : 'text-[#5B6472]'
                )}
              />
              <span className="relative z-10">{label}</span>
            </motion.button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-[#E5E4DF] space-y-1">
          <p className="px-3 pb-1 text-[11px] font-medium text-[#5B6472]">
            Portfolio &amp; Controls
          </p>
          {role === 'employee' && (
            <button
              type="button"
              onClick={onRestartOnboarding}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#5B6472] hover:bg-[#F3F2EE] hover:text-[#0F1E36] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Run Onboarding Flow</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigateTop('marketing')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#5B6472] hover:bg-[#F3F2EE] hover:text-[#0F1E36] cursor-pointer"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Marketing Landing</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTop('design-system')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#5B6472] hover:bg-[#F3F2EE] hover:text-[#0F1E36] cursor-pointer"
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Design System</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTop('case-study')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#5B6472] hover:bg-[#F3F2EE] hover:text-[#0F1E36] cursor-pointer"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Case Study</span>
          </button>
          <button
            type="button"
            onClick={onResetDemo}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#5B6472] hover:bg-[#F3F2EE] hover:text-[#0F1E36] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>Reset Seed Data</span>
          </button>
        </div>
      </nav>

      {/* Account Footer */}
      <div className="p-4 border-t border-[#E5E4DF] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar
            src={role === 'employee' ? EMPLOYEE_AVATAR : undefined}
            name={role === 'employee' ? userName : 'Jordan Vance'}
            size="sm"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#0F1E36] truncate">
              {role === 'employee' ? userName : 'Jordan Vance'}
            </p>
            <p className="text-[11px] text-[#5B6472] truncate">
              {role === 'employee' ? 'Senior Product Manager' : 'VP of Product'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          title="Sign out to Auth screens"
          aria-label="Sign out"
          className="p-2 rounded-lg text-[#5B6472] hover:text-[#0F1E36] hover:bg-[#F3F2EE] cursor-pointer shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#091324]/40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
              className="relative w-72 max-w-[85vw] h-full z-10"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Column with Light Green Top Header */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 h-16 bg-[#DDF0E6]/95 backdrop-blur-xs border-b border-[#BCE0CE] px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              aria-label="Open workspace navigation"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-[#0F1E36] hover:bg-[#CBE5D7] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-[#0F1E36] truncate">
                {BREADCRUMB_MAP[activeScreen]}
              </p>
              <p className="hidden sm:block text-[11px] text-[#28443C] tabular-nums truncate">
                {lastSyncedLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {role === 'employee' ? (
              <Button variant="primary" size="sm" onClick={onStartBooking}>
                Book a Session
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNav('manager-privacy')}
                className="bg-white/85 border-[#B7D8C7]"
              >
                Privacy Charter
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8">{children}</main>
      </div>
    </div>
  );
};
