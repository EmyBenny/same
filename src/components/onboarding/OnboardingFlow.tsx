import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Lock, ShieldCheck } from 'lucide-react';
import {
  ASSESSMENT_COMPETENCIES,
  CAREER_GOAL_OPTIONS,
  COACHING_INTEREST_OPTIONS,
  SKILL_OPTIONS,
} from '../../data/mockData';
import { Coach, OnboardingState, SessionFormat } from '../../types/elevate';
import { Avatar, Button, Card, Input, ProgressBar } from '../ui';
import { cn } from '../../lib/utils';

interface OnboardingFlowProps {
  userName: string;
  initialState: OnboardingState;
  coaches: Coach[];
  onComplete: (finalState: OnboardingState, selectedCoachId?: string) => void;
  onExit: () => void;
}

const TOTAL_STEPS = 5;

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  userName,
  initialState,
  coaches,
  onComplete,
  onExit,
}) => {
  const [step, setStep] = useState(1);
  const [assessment, setAssessment] = useState<Record<string, number>>(initialState.assessment);
  const [careerGoals, setCareerGoals] = useState<string[]>(initialState.careerGoals);
  const [customGoal, setCustomGoal] = useState('');
  const [skillsToImprove, setSkillsToImprove] = useState<string[]>(initialState.skillsToImprove);
  const [coachingInterests, setCoachingInterests] = useState<string[]>(
    initialState.coachingInterests
  );
  const [preferredFormat, setPreferredFormat] = useState<SessionFormat>(
    initialState.preferredFormat
  );
  const [errorMsg, setErrorMsg] = useState('');

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string, max = 5) => {
    setErrorMsg('');
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else if (list.length < max) {
      setList([...list, item]);
    }
  };

  const handleAddCustomGoal = () => {
    const trimmed = customGoal.trim();
    if (!trimmed) return;
    if (!careerGoals.includes(trimmed)) {
      setCareerGoals([...careerGoals, trimmed]);
    }
    setCustomGoal('');
  };

  const handleNext = () => {
    setErrorMsg('');
    if (step === 3 && careerGoals.length === 0) {
      setErrorMsg('Select at least one career goal to tailor your coaching plan.');
      return;
    }
    if (step === 4 && (skillsToImprove.length === 0 || coachingInterests.length === 0)) {
      setErrorMsg('Select at least one skill and one coaching interest to match coaches.');
      return;
    }
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const matchedCoaches = coaches
    .filter(
      (c) =>
        c.specialties.some((s) => skillsToImprove.includes(s)) ||
        c.formats.includes(preferredFormat)
    )
    .slice(0, 3);

  const finalPayload: OnboardingState = {
    completed: true,
    assessment,
    careerGoals,
    skillsToImprove,
    coachingInterests,
    preferredFormat,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] py-10 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-medium text-[#5B6472] tabular-nums">
              Step {step} of {TOTAL_STEPS}
            </p>
            <h1 className="font-display text-xl font-semibold text-[#0F1E36] mt-0.5">
              Personalize your coaching workspace
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={onExit}>
            Skip to Dashboard
          </Button>
        </div>
        <ProgressBar value={(step / TOTAL_STEPS) * 100} className="mb-8" />

        <Card padding="lg">
          {/* Step 1: Welcome & Privacy Promise */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
                  Welcome to Same, {userName.split(' ')[0]}
                </h2>
                <p className="mt-2 text-sm text-[#5B6472] leading-relaxed max-w-2xl">
                  Over the next four short steps, you will reflect on your current priorities so we
                  can recommend coaches and structure your personal development plan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E5E4DF]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0F1E36]">
                    <Lock className="w-4 h-4 text-[#0D7A68]" />
                    <span>100% Private Coaching Space</span>
                  </div>
                  <p className="mt-2 text-xs text-[#5B6472] leading-relaxed">
                    Your self-assessment ratings, session notes, and 1-on-1 conversations are never
                    accessible to your manager or HR.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E5E4DF]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0F1E36]">
                    <ShieldCheck className="w-4 h-4 text-[#0D7A68]" />
                    <span>Opt-In Progress Sharing</span>
                  </div>
                  <p className="mt-2 text-xs text-[#5B6472] leading-relaxed">
                    You decide goal-by-goal whether to share high-level progress milestones with your
                    manager for support and alignment.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="primary" size="lg" onClick={handleNext}>
                  <span>Begin Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Development Assessment */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
                  Professional development self-assessment
                </h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">
                  Rate your current confidence in each area (1 = building foundation, 5 = high confidence).
                </p>
              </div>

              <div className="divide-y divide-[#E5E4DF]">
                {ASSESSMENT_COMPETENCIES.map((comp) => {
                  const val = assessment[comp.key] ?? 3;
                  return (
                    <div
                      key={comp.key}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="max-w-md">
                        <p className="text-sm font-semibold text-[#0F1E36]">{comp.key}</p>
                        <p className="text-xs text-[#5B6472] mt-0.5">{comp.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0" role="group" aria-label={comp.key}>
                        {[1, 2, 3, 4, 5].map((score) => (
                          <button
                            key={score}
                            type="button"
                            onClick={() => setAssessment({ ...assessment, [comp.key]: score })}
                            className={cn(
                              'w-9 h-9 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer tabular-nums',
                              val === score
                                ? 'bg-[#0F1E36] text-white border-[#0F1E36]'
                                : 'bg-white text-[#5B6472] border-[#D8D6CF] hover:border-[#0F1E36]'
                            )}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Select Career Goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
                  Select your primary career goals
                </h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">
                  Choose up to 3 focus outcomes for the next two quarters, or add your own.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAREER_GOAL_OPTIONS.map((goal) => {
                  const selected = careerGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleItem(careerGoals, setCareerGoals, goal, 4)}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-colors flex items-start justify-between gap-3 cursor-pointer',
                        selected
                          ? 'bg-[#EEF7F5] border-[#0D7A68] text-[#0F1E36]'
                          : 'bg-white border-[#E5E4DF] text-[#374151] hover:border-[#B8B6AE]'
                      )}
                    >
                      <span className="text-sm font-medium leading-snug">{goal}</span>
                      <span
                        className={cn(
                          'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5',
                          selected
                            ? 'bg-[#0D7A68] border-[#0D7A68] text-white'
                            : 'border-[#D8D6CF] bg-white'
                        )}
                      >
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="flex-1">
                  <Input
                    placeholder="Add a custom career goal..."
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomGoal();
                      }
                    }}
                  />
                </div>
                <Button variant="outline" onClick={handleAddCustomGoal}>
                  Add Goal
                </Button>
              </div>

              {errorMsg && <p className="text-xs text-[#DC2626] font-medium">{errorMsg}</p>}

              <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Skills & Coaching Interests */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
                  Skills to develop &amp; coaching format
                </h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">
                  We use these preferences to surface the best-fit coaches in the directory.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0F1E36] mb-3">
                  Skills to improve (select up to 4)
                </p>
                <div className="flex flex-wrap gap-2">
                  {SKILL_OPTIONS.map((skill) => {
                    const active = skillsToImprove.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleItem(skillsToImprove, setSkillsToImprove, skill, 4)}
                        className={cn(
                          'px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer',
                          active
                            ? 'bg-[#0F1E36] text-white border-[#0F1E36]'
                            : 'bg-white text-[#374151] border-[#D8D6CF] hover:bg-[#FAF9F6]'
                        )}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0F1E36] mb-3">
                  Coaching focus themes
                </p>
                <div className="flex flex-wrap gap-2">
                  {COACHING_INTEREST_OPTIONS.map((interest) => {
                    const active = coachingInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() =>
                          toggleItem(coachingInterests, setCoachingInterests, interest, 4)
                        }
                        className={cn(
                          'px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer',
                          active
                            ? 'bg-[#0D7A68] text-white border-[#0D7A68]'
                            : 'bg-white text-[#374151] border-[#D8D6CF] hover:bg-[#FAF9F6]'
                        )}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0F1E36] mb-3">
                  Preferred session format
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Video 1:1', 'Audio Walk', 'Async Strategy Review'] as SessionFormat[]).map(
                    (format) => (
                      <button
                        key={format}
                        type="button"
                        onClick={() => setPreferredFormat(format)}
                        className={cn(
                          'p-3.5 rounded-xl border text-left text-sm font-medium transition-colors cursor-pointer',
                          preferredFormat === format
                            ? 'bg-[#EEF7F5] border-[#0D7A68] text-[#0F1E36]'
                            : 'bg-white border-[#E5E4DF] text-[#5B6472] hover:text-[#0F1E36]'
                        )}
                      >
                        {format}
                      </button>
                    )
                  )}
                </div>
              </div>

              {errorMsg && <p className="text-xs text-[#DC2626] font-medium">{errorMsg}</p>}

              <div className="pt-4 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(3)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  <span>Review Matches</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Personalized Completion */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium text-[#0D7A68]">Plan Ready</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[#0F1E36]">
                  Your growth plan and matched coaches
                </h2>
                <p className="mt-1.5 text-sm text-[#5B6472]">
                  We added your selected career goals as private drafts in your Development Plan and
                  matched {matchedCoaches.length} coaches to your focus areas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E4DF] space-y-2">
                <p className="text-xs font-semibold text-[#0F1E36]">Selected priorities</p>
                <p className="text-sm text-[#374151]">
                  {careerGoals.join(' · ')}
                </p>
                <p className="text-xs text-[#5B6472]">
                  Skills: {skillsToImprove.join(', ')} · Format: {preferredFormat}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0F1E36] mb-3">
                  Recommended coaches for you
                </p>
                <div className="space-y-3">
                  {matchedCoaches.map((coach) => (
                    <div
                      key={coach.id}
                      className="p-4 rounded-xl border border-[#E5E4DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <Avatar src={coach.avatarUrl} name={coach.name} size="md" />
                        <div>
                          <p className="text-sm font-semibold text-[#0F1E36]">{coach.name}</p>
                          <p className="text-xs text-[#5B6472]">
                            {coach.title} · {coach.yearsExperience} yrs exp
                          </p>
                          <p className="text-xs text-[#0D7A68] mt-0.5">
                            Next available: {coach.nextAvailable}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onComplete(finalPayload, coach.id)}
                      >
                        Book with {coach.name.split(' ')[0]}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E4DF] flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button variant="ghost" onClick={() => setStep(4)}>
                  <ArrowLeft className="w-4 h-4" />
                  <span>Adjust preferences</span>
                </Button>
                <Button variant="primary" size="lg" onClick={() => onComplete(finalPayload)}>
                  <span>Enter Employee Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
