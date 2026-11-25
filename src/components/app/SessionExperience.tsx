import React, { useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, Lock, Plus, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { CoachingSession } from '../../types/elevate';
import { Avatar, Button, Card, Input, Select, StatusLabel, Textarea } from '../ui';
import { CINEMATIC_EASE, CinematicItem, CinematicStagger } from '../ui/MotionPrimitives';
import { cn } from '../../lib/utils';

interface SessionExperienceProps {
  session: CoachingSession;
  onBack: () => void;
  onUpdateSession: (updated: CoachingSession) => void;
  onCreateGoalFromAction: (title: string) => void;
}

export const SessionExperience: React.FC<SessionExperienceProps> = ({
  session,
  onBack,
  onUpdateSession,
  onCreateGoalFromAction,
}) => {
  const [newActionText, setNewActionText] = useState('');
  const [savedBanner, setSavedBanner] = useState('');
  const [notesSyncedLabel, setNotesSyncedLabel] = useState('Private & synced locally');
  const [convertedActionIds, setConvertedActionIds] = useState<string[]>([]);

  const togglePrep = (prepId: string) => {
    const nextChecklist = session.prepChecklist.map((item) =>
      item.id === prepId ? { ...item, completed: !item.completed } : item
    );
    onUpdateSession({ ...session, prepChecklist: nextChecklist });
  };

  const handleNotesChange = (val: string) => {
    onUpdateSession({ ...session, privateNotes: val });
    const now = new Date();
    setNotesSyncedLabel(
      `Auto-saved ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
        2,
        '0'
      )}:${String(now.getSeconds()).padStart(2, '0')}`
    );
  };

  const handleReflectionSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSession({
      ...session,
      status: 'completed',
    });
    setSavedBanner('Session reflection saved privately.');
    setTimeout(() => setSavedBanner(''), 3000);
  };

  const toggleActionItem = (actionId: string) => {
    const next = session.actionItems.map((item) =>
      item.id === actionId ? { ...item, completed: !item.completed } : item
    );
    onUpdateSession({ ...session, actionItems: next });
  };

  const addActionItem = () => {
    const trimmed = newActionText.trim();
    if (!trimmed) return;
    onUpdateSession({
      ...session,
      actionItems: [
        ...session.actionItems,
        { id: `act-${Date.now()}`, text: trimmed, completed: false },
      ],
    });
    setNewActionText('');
  };

  const handlePromoteToGoal = (actionId: string, text: string) => {
    onCreateGoalFromAction(text);
    setConvertedActionIds((prev) => [...prev, actionId]);
  };

  return (
    <CinematicStagger className="space-y-6">
      <CinematicItem>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#5B6472] hover:text-[#0F1E36] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sessions</span>
        </button>
      </CinematicItem>

      {/* Session Header */}
      <CinematicItem>
        <Card padding="lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar src={session.coachAvatar} name={session.coachName} size="lg" />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusLabel tone="private" label="Private workspace" />
                  <span className="text-xs text-[#5B6472] tabular-nums">
                    {session.dateLabel} · {session.time} · {session.durationMins} min
                  </span>
                </div>
                <h1 className="mt-1.5 font-display text-xl sm:text-2xl font-semibold text-[#0F1E36]">
                  {session.topic}
                </h1>
                <p className="text-sm text-[#5B6472] mt-0.5">
                  With {session.coachName} ({session.format})
                </p>
              </div>
            </div>
            {session.status === 'upcoming' && (
              <Button
                variant="accent"
                onClick={() => onUpdateSession({ ...session, status: 'completed' })}
              >
                Mark Session Completed
              </Button>
            )}
          </div>
        </Card>
      </CinematicItem>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          <CinematicItem>
            <Card padding="md">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                  Session preparation checklist
                </h2>
                <span className="text-xs text-[#5B6472] tabular-nums">
                  {session.prepChecklist.filter((i) => i.completed).length}/
                  {session.prepChecklist.length} ready
                </span>
              </div>
              <div className="divide-y divide-[#E5E4DF]">
                {session.prepChecklist.map((item) => (
                  <label
                    key={item.id}
                    className="py-3 flex items-start gap-3 cursor-pointer select-none"
                  >
                    <motion.button
                      type="button"
                      role="checkbox"
                      aria-checked={item.completed}
                      whileTap={{ scale: 0.88 }}
                      transition={{ duration: 0.14, ease: CINEMATIC_EASE }}
                      onClick={() => togglePrep(item.id)}
                      className={cn(
                        'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer',
                        item.completed
                          ? 'bg-[#0D7A68] border-[#0D7A68] text-white'
                          : 'bg-white border-[#D8D6CF]'
                      )}
                    >
                      {item.completed && <Check className="w-3.5 h-3.5" />}
                    </motion.button>
                    <span
                      className={cn(
                        'text-sm leading-snug transition-colors',
                        item.completed ? 'line-through text-[#5B6472]' : 'text-[#111827]'
                      )}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </Card>
          </CinematicItem>

          <CinematicItem>
            <Card padding="md" className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                  Personal coaching notes
                </h2>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#0D7A68] tabular-nums">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>{notesSyncedLabel}</span>
                </span>
              </div>
              <Textarea
                rows={5}
                value={session.privateNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Capture candid thoughts, tensions, or questions before and during your conversation..."
                helperText="Your manager and organization never have access to personal session notes."
              />
            </Card>
          </CinematicItem>

          <CinematicItem>
            <Card padding="md">
              <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                Post-session reflection
              </h2>
              <p className="text-xs text-[#5B6472] mt-1">
                Synthesize your key insight immediately after your conversation while it is fresh.
              </p>

              <form onSubmit={handleReflectionSave} className="mt-4 space-y-4">
                <Textarea
                  label="Key takeaway"
                  rows={3}
                  value={session.reflection.takeaway}
                  onChange={(e) =>
                    onUpdateSession({
                      ...session,
                      reflection: { ...session.reflection, takeaway: e.target.value },
                    })
                  }
                  placeholder="What shifted in how you view this challenge?"
                />

                <Select
                  label="Confidence shift after session"
                  value={session.reflection.confidenceShift}
                  onChange={(e) =>
                    onUpdateSession({
                      ...session,
                      reflection: {
                        ...session.reflection,
                        confidenceShift: e.target
                          .value as CoachingSession['reflection']['confidenceShift'],
                      },
                    })
                  }
                  options={[
                    { value: 'Uncertain', label: 'Still exploring options' },
                    { value: 'Steady', label: 'Steady clarity' },
                    { value: 'Clearer', label: 'Significantly clearer' },
                    { value: 'Ready to Act', label: 'Ready to test in practice' },
                  ]}
                />

                {savedBanner && (
                  <div className="flex items-center gap-2 text-xs font-medium text-[#0A6153]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{savedBanner}</span>
                  </div>
                )}

                <Button type="submit" variant="primary" size="md">
                  Save Reflection
                </Button>
              </form>
            </Card>
          </CinematicItem>
        </div>

        {/* Right 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <CinematicItem>
            <Card padding="md" className="space-y-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                  Action items &amp; follow-up goals
                </h2>
                <p className="text-xs text-[#5B6472] mt-1">
                  Turn coaching commitments into trackable development goals.
                </p>
              </div>

              <div className="divide-y divide-[#E5E4DF]">
                {session.actionItems.map((item) => {
                  const converted =
                    convertedActionIds.includes(item.id) || Boolean(item.linkedGoalId);
                  return (
                    <div key={item.id} className="py-3 space-y-2">
                      <div className="flex items-start gap-3">
                        <motion.button
                          type="button"
                          role="checkbox"
                          aria-checked={item.completed}
                          whileTap={{ scale: 0.88 }}
                          onClick={() => toggleActionItem(item.id)}
                          className={cn(
                            'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer',
                            item.completed
                              ? 'bg-[#0D7A68] border-[#0D7A68] text-white'
                              : 'bg-white border-[#D8D6CF]'
                          )}
                        >
                          {item.completed && <Check className="w-3.5 h-3.5" />}
                        </motion.button>
                        <span
                          className={cn(
                            'text-sm leading-snug',
                            item.completed ? 'line-through text-[#5B6472]' : 'text-[#111827]'
                          )}
                        >
                          {item.text}
                        </span>
                      </div>

                      <div className="pl-8">
                        {converted ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#0D7A68] font-medium">
                            <Target className="w-3.5 h-3.5" />
                            <span>Linked to Development Goals</span>
                          </span>
                        ) : (
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePromoteToGoal(item.id, item.text)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F1E36] hover:text-[#0D7A68] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Promote to Development Goal</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Add an action item..."
                    value={newActionText}
                    onChange={(e) => setNewActionText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addActionItem();
                      }
                    }}
                  />
                </div>
                <Button variant="outline" onClick={addActionItem}>
                  Add
                </Button>
              </div>
            </Card>
          </CinematicItem>
        </div>
      </div>
    </CinematicStagger>
  );
};
