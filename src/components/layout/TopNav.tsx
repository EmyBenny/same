import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AuthScreenMode, TopView } from '../../types/elevate';
import { Button } from '../ui';
import { CINEMATIC_EASE } from '../ui/MotionPrimitives';
import { cn } from '../../lib/utils';

interface TopNavProps {
  currentView: TopView;
  onNavigate: (view: TopView) => void;
  onOpenAuth: (mode: AuthScreenMode) => void;
  isSignedIn: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  isSignedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: TopView; label: string }> = [
    { id: 'marketing', label: 'Overview' },
    { id: 'app', label: 'Prototype' },
    { id: 'design-system', label: 'Design System' },
    { id: 'case-study', label: 'Case Study' },
  ];

  const handleSelect = (id: TopView) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleAuthClick = (mode: AuthScreenMode) => {
    onOpenAuth(mode);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#DDF0E6]/95 backdrop-blur-xs border-b border-[#BCE0CE]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => handleSelect('marketing')}
          className="font-display text-xl font-bold tracking-tight text-[#0F1E36] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D7A68]"
        >
          Same
        </motion.button>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const active =
              currentView === item.id ||
              (item.id === 'app' && (currentView === 'auth' || currentView === 'onboarding'));
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={cn(
                  'relative text-sm font-medium whitespace-nowrap shrink-0 py-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0D7A68]',
                  active ? 'text-[#0F1E36]' : 'text-[#28443C] hover:text-[#0F1E36]'
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="topnav-active-underline"
                    transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#0D7A68] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Sign In & Sign Up Actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {isSignedIn ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAuthClick('signin')}
                className="bg-white/80 border-[#B7D8C7]"
              >
                Switch Account
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleSelect('app')}>
                Open Workspace
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAuthClick('signin')}
                className="text-[#0F1E36] hover:bg-[#CBE5D7]"
              >
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleAuthClick('signup')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-[#0F1E36] hover:bg-[#CBE5D7] cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: CINEMATIC_EASE }}
            className="md:hidden border-t border-[#BCE0CE] bg-[#EDF7F2] px-6 py-4 space-y-2"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={cn(
                  'block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer',
                  currentView === item.id
                    ? 'bg-white text-[#0A6153]'
                    : 'text-[#0F1E36] hover:bg-white/60'
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="w-full bg-white"
                onClick={() => handleAuthClick('signin')}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => handleAuthClick('signup')}
              >
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
