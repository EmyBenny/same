import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthScreenMode, UserRole } from '../../types/elevate';
import { Button, Card, Input, Select } from '../ui';

interface AuthScreensProps {
  initialMode?: AuthScreenMode;
  onAuthenticated: (opts: {
    name: string;
    email: string;
    role: UserRole;
    runOnboarding: boolean;
  }) => void;
  onBackToMarketing: () => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  initialMode = 'signin',
  onAuthenticated,
  onBackToMarketing,
}) => {
  const [mode, setMode] = useState<AuthScreenMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Sign-In state
  const [loginEmail, setLoginEmail] = useState('maya.patel@northstar-labs.example');
  const [loginPassword, setLoginPassword] = useState('SameDemo2026!');
  const [loginError, setLoginError] = useState('');

  // Create Account state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('employee');
  const [workspaceCode, setWorkspaceCode] = useState('NORTHSTAR-2026');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  // Forgot Password state
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.includes('@') || loginPassword.length < 6) {
      setLoginError('Enter a valid work email and password (minimum 6 characters).');
      return;
    }
    setLoginError('');
    const isManager = loginEmail.toLowerCase().includes('jordan') || loginEmail.toLowerCase().includes('manager');
    onAuthenticated({
      name: isManager ? 'Jordan Vance' : 'Maya Patel',
      email: loginEmail,
      role: isManager ? 'manager' : 'employee',
      runOnboarding: false,
    });
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (fullName.trim().length < 2) errs.fullName = 'Please enter your full name.';
    if (!signupEmail.includes('@')) errs.signupEmail = 'Enter a valid work email address.';
    if (workspaceCode.trim().length < 4) errs.workspaceCode = 'Enter your company invitation code.';
    if (signupPassword.length < 8) errs.signupPassword = 'Password must be at least 8 characters.';

    setSignupErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onAuthenticated({
      name: fullName.trim(),
      email: signupEmail.trim(),
      role: signupRole,
      runOnboarding: signupRole === 'employee',
    });
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.includes('@')) {
      setResetError('Please enter a valid work email address.');
      return;
    }
    setResetError('');
    setResetSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] flex flex-col justify-center py-12 px-6">
      <div className="max-w-[1040px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Editorial Context Panel */}
        <div className="lg:col-span-5 bg-[#0F1E36] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between">
          <div>
            <button
              type="button"
              onClick={onBackToMarketing}
              className="inline-flex items-center gap-2 text-xs font-medium text-white/75 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Same overview</span>
            </button>

            <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight leading-tight text-balance">
              Intentional career growth with clear privacy boundaries.
            </h1>
            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              Same pairs employees with vetted leadership coaches while keeping personal notes,
              reflections, and coaching conversations strictly confidential.
            </p>
          </div>

          <div className="mt-10 space-y-5 pt-8 border-t border-white/15">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2DD4BF] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">Employee-Controlled Sharing</p>
                <p className="text-xs text-white/70 mt-0.5">
                  Managers only see aggregate participation trends and goals you explicitly opt to share.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs font-medium text-white/90">Interactive Prototype Demo Access</p>
              <p className="text-xs text-white/65 mt-1">
                Jump directly into any role without registering:
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onAuthenticated({
                      name: 'Maya Patel',
                      email: 'maya.patel@northstar-labs.example',
                      role: 'employee',
                      runOnboarding: true,
                    })
                  }
                  className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#0D7A68] hover:bg-[#0A6153] text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Start as Employee with Onboarding (Maya Patel)
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onAuthenticated({
                      name: 'Maya Patel',
                      email: 'maya.patel@northstar-labs.example',
                      role: 'employee',
                      runOnboarding: false,
                    })
                  }
                  className="w-full text-left px-3.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Skip to Employee Dashboard (Maya Patel)
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onAuthenticated({
                      name: 'Jordan Vance',
                      email: 'jordan.vance@northstar-labs.example',
                      role: 'manager',
                      runOnboarding: false,
                    })
                  }
                  className="w-full text-left px-3.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Enter Manager Insights View (Jordan Vance)
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 flex items-center">
          <Card padding="lg" className="w-full">
            {mode === 'signin' && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
                  Sign in to Same
                </h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">
                  Use your company email or choose a quick prototype role on the left.
                </p>

                <form onSubmit={handleSignIn} className="mt-6 space-y-4" noValidate>
                  <Input
                    label="Work email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@company.com"
                    autoComplete="email"
                  />

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="signin-password" className="block text-sm font-medium text-[#0F1E36]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-xs font-medium text-[#0D7A68] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full h-10 pl-3.5 pr-10 rounded-lg bg-white text-sm text-[#111827] border border-[#D8D6CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A68]/25 focus-visible:border-[#0D7A68]"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#5B6472] hover:text-[#0F1E36] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <p role="alert" className="text-xs text-[#DC2626] font-medium">
                      {loginError}
                    </p>
                  )}

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 pt-5 border-t border-[#E5E4DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <span className="text-[#5B6472]">New to your company&apos;s Same workspace?</span>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="font-medium text-[#0D7A68] hover:underline cursor-pointer text-left"
                  >
                    Create an account
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
                  Create your Same account
                </h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">
                  Activate your sponsored coaching workspace using your organization code.
                </p>

                <form onSubmit={handleCreateAccount} className="mt-6 space-y-4" noValidate>
                  <Input
                    label="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Maya Patel"
                    error={signupErrors.fullName}
                  />

                  <Input
                    label="Work email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="maya.patel@company.com"
                    error={signupErrors.signupEmail}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Workspace role"
                      value={signupRole}
                      onChange={(e) => setSignupRole(e.target.value as UserRole)}
                      options={[
                        { value: 'employee', label: 'Employee (Coachee)' },
                        { value: 'manager', label: 'People Manager' },
                      ]}
                    />
                    <Input
                      label="Organization code"
                      value={workspaceCode}
                      onChange={(e) => setWorkspaceCode(e.target.value)}
                      error={signupErrors.workspaceCode}
                    />
                  </div>

                  <Input
                    label="Create password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    helperText="Protected locally in this interactive prototype."
                    error={signupErrors.signupPassword}
                  />

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Create Account &amp; Continue
                  </Button>
                </form>

                <div className="mt-6 pt-5 border-t border-[#E5E4DF] flex items-center justify-between text-sm">
                  <span className="text-[#5B6472]">Already activated?</span>
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="font-medium text-[#0D7A68] hover:underline cursor-pointer"
                  >
                    Sign in instead
                  </button>
                </div>
              </div>
            )}

            {mode === 'forgot' && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setResetSent(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5B6472] hover:text-[#0F1E36] cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to sign in</span>
                </button>

                <h2 className="mt-5 font-display text-2xl font-semibold text-[#0F1E36]">
                  Reset your password
                </h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">
                  Enter your work email and we will send a single-use recovery link.
                </p>

                {resetSent ? (
                  <div className="mt-6 p-5 rounded-xl bg-[#EEF7F5] border border-[#0D7A68]/25">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0D7A68] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#0F1E36]">
                          Recovery instructions sent
                        </p>
                        <p className="text-xs text-[#374151] mt-1 leading-relaxed">
                          If a Same account exists for <span className="font-medium">{resetEmail}</span>,
                          a password reset link will arrive within two minutes. (Prototype simulation)
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => {
                            setResetSent(false);
                            setMode('signin');
                          }}
                        >
                          Return to Sign In
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="mt-6 space-y-4" noValidate>
                    <Input
                      label="Work email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="name@company.com"
                      error={resetError}
                    />
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Send Recovery Link
                    </Button>
                  </form>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 text-xs text-[#5B6472]">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>
                Independent portfolio prototype. No personal credentials or real company data are transmitted.
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
