import React, { useState } from 'react';
import { Check, Eye, Lock, Plus, Target } from 'lucide-react';
import { DevelopmentGoal } from '../../types/elevate';
import {
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  ProgressBar,
  SegmentedTabs,
  Select,
  StatusLabel,
} from '../ui';
import { cn } from '../../lib/utils';

interface DevelopmentGoalsProps {
  goals: DevelopmentGoal[];
  onAddGoal: (goal: DevelopmentGoal) => void;
  onToggleMilestone: (goalId: string, milestoneId: string) => void;
  onAddMilestone: (goalId: string, title: string) => void;
  onUpdateProgress: (goalId: string, progress: number) => void;
  onToggleShare: (goalId: string) => void;
}

export const DevelopmentGoals: React.FC<DevelopmentGoalsProps> = ({
  goals,
  onAddGoal,
  onToggleMilestone,
  onAddMilestone,
  onUpdateProgress,
  onToggleShare,
}) => {
  const [filter, setFilter] = useState<'active' | 'completed' | 'all'>('active');
  const [modalOpen, setModalOpen] = useState(false);

  // New goal modal state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Stakeholder Alignment');
  const [newTargetDate, setNewTargetDate] = useState('2027-02-28');
  const [firstMilestone, setFirstMilestone] = useState('');
  const [shareNewGoal, setShareNewGoal] = useState(false);
  const [formError, setFormError] = useState('');

  // Per-goal quick milestone input
  const [milestoneDrafts, setMilestoneDrafts] = useState<Record<string, string>>({});

  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');

  const visibleGoals =
    filter === 'active' ? activeGoals : filter === 'completed' ? completedGoals : goals;

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim().length < 4) {
      setFormError('Enter a clear goal statement (minimum 4 characters).');
      return;
    }
    setFormError('');
    const milestones = firstMilestone.trim()
      ? [{ id: `m-${Date.now()}`, title: firstMilestone.trim(), completed: false }]
      : [];

    onAddGoal({
      id: `goal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      targetDate: newTargetDate,
      progress: 0,
      status: 'active',
      sharedWithManager: shareNewGoal,
      milestones,
      updatedAt: 'Just now',
    });

    setNewTitle('');
    setFirstMilestone('');
    setShareNewGoal(false);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
            Personal development plan
          </h1>
          <p className="mt-1 text-sm text-[#5B6472]">
            Track goals and milestones privately, or opt in to share specific goals with your manager.
          </p>
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" />
          <span>Create Goal</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SegmentedTabs
          activeTab={filter}
          onChange={(id) => setFilter(id as 'active' | 'completed' | 'all')}
          tabs={[
            { id: 'active', label: 'Active', count: activeGoals.length },
            { id: 'completed', label: 'Completed', count: completedGoals.length },
            { id: 'all', label: 'All History', count: goals.length },
          ]}
        />
        <p className="text-xs text-[#5B6472] inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#0D7A68]" />
          <span>New goals default to private until you opt to share</span>
        </p>
      </div>

      {visibleGoals.length === 0 ? (
        <EmptyState
          icon={<Target className="w-5 h-5" />}
          title={`No ${filter === 'all' ? '' : filter} development goals`}
          description="Set a measurable skill or leadership goal to connect your coaching reflections to day-to-day progress."
          actionLabel="Create First Goal"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="space-y-5">
          {visibleGoals.map((goal) => (
            <Card key={goal.id} padding="md" className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusLabel
                      tone={goal.status === 'completed' ? 'success' : 'neutral'}
                      label={goal.status === 'completed' ? 'Completed' : 'In Progress'}
                    />
                    <span className="text-xs text-[#5B6472]">{goal.category}</span>
                    <span aria-hidden="true" className="text-xs text-[#5B6472]">
                      ·
                    </span>
                    <span className="text-xs text-[#5B6472] tabular-nums">
                      Target {goal.targetDate}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                    {goal.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleShare(goal.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer',
                      goal.sharedWithManager
                        ? 'bg-[#EEF7F5] border-[#0D7A68]/30 text-[#0A6153]'
                        : 'bg-[#FAF9F6] border-[#E5E4DF] text-[#5B6472] hover:text-[#0F1E36]'
                    )}
                  >
                    {goal.sharedWithManager ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Shared with manager</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Private to you</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Slider & Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#5B6472]">
                    Last updated {goal.updatedAt}
                  </span>
                  <span className="font-mono font-semibold text-[#0F1E36] tabular-nums">
                    {goal.progress}%
                  </span>
                </div>
                <ProgressBar value={goal.progress} />
                <div className="flex items-center justify-between gap-4 pt-1">
                  <label className="text-xs text-[#5B6472] flex items-center gap-2">
                    <span>Adjust progress:</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={goal.progress}
                      onChange={(e) => onUpdateProgress(goal.id, Number(e.target.value))}
                      className="accent-[#0D7A68] cursor-pointer"
                    />
                  </label>
                  {goal.progress < 100 && (
                    <button
                      type="button"
                      onClick={() => onUpdateProgress(goal.id, 100)}
                      className="text-xs font-medium text-[#0D7A68] hover:underline cursor-pointer"
                    >
                      Mark 100% Complete
                    </button>
                  )}
                </div>
              </div>

              {/* Milestones */}
              <div className="pt-4 border-t border-[#E5E4DF] space-y-3">
                <p className="text-xs font-semibold text-[#0F1E36]">
                  Milestones ({goal.milestones.filter((m) => m.completed).length}/
                  {goal.milestones.length})
                </p>

                {goal.milestones.length > 0 && (
                  <div className="space-y-2">
                    {goal.milestones.map((m) => (
                      <div key={m.id} className="flex items-start gap-2.5">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={m.completed}
                          onClick={() => onToggleMilestone(goal.id, m.id)}
                          className={cn(
                            'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer',
                            m.completed
                              ? 'bg-[#0D7A68] border-[#0D7A68] text-white'
                              : 'bg-white border-[#D8D6CF]'
                          )}
                        >
                          {m.completed && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <span
                          className={cn(
                            'text-sm',
                            m.completed ? 'line-through text-[#5B6472]' : 'text-[#111827]'
                          )}
                        >
                          {m.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <div className="flex-1">
                    <Input
                      placeholder="Add a milestone step..."
                      value={milestoneDrafts[goal.id] || ''}
                      onChange={(e) =>
                        setMilestoneDrafts({ ...milestoneDrafts, [goal.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = (milestoneDrafts[goal.id] || '').trim();
                          if (val) {
                            onAddMilestone(goal.id, val);
                            setMilestoneDrafts({ ...milestoneDrafts, [goal.id]: '' });
                          }
                        }
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const val = (milestoneDrafts[goal.id] || '').trim();
                      if (val) {
                        onAddMilestone(goal.id, val);
                        setMilestoneDrafts({ ...milestoneDrafts, [goal.id]: '' });
                      }
                    }}
                  >
                    Add Milestone
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Goal Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create development goal"
        description="Define an outcome you want to work toward with your coach."
      >
        <form onSubmit={handleCreateGoal} className="space-y-4">
          <Input
            label="Goal statement"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Facilitate cross-team architecture reviews with clear tradeoffs"
            error={formError}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Focus category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              options={[
                { value: 'Stakeholder Alignment', label: 'Stakeholder Alignment' },
                { value: 'Executive Presence', label: 'Executive Presence' },
                { value: 'People Leadership', label: 'People Leadership' },
                { value: 'Strategic Communication', label: 'Strategic Communication' },
                { value: 'Career Navigation', label: 'Career Navigation' },
              ]}
            />
            <Input
              label="Target date"
              type="date"
              value={newTargetDate}
              onChange={(e) => setNewTargetDate(e.target.value)}
            />
          </div>
          <Input
            label="First milestone (optional)"
            value={firstMilestone}
            onChange={(e) => setFirstMilestone(e.target.value)}
            placeholder="e.g. Draft 1-page decision template"
          />

          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E4DF] cursor-pointer">
            <input
              type="checkbox"
              checked={shareNewGoal}
              onChange={(e) => setShareNewGoal(e.target.checked)}
              className="mt-0.5 accent-[#0D7A68]"
            />
            <div>
              <p className="text-sm font-medium text-[#0F1E36]">
                Share goal title &amp; progress with my manager
              </p>
              <p className="text-xs text-[#5B6472] mt-0.5">
                Private coaching notes and session transcripts are never shared.
              </p>
            </div>
          </label>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Goal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
