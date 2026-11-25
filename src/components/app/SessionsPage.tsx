import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Coach, CoachingSession } from '../../types/elevate';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  Modal,
  SegmentedTabs,
  Select,
  StatusLabel,
  Textarea,
} from '../ui';

interface SessionsPageProps {
  sessions: CoachingSession[];
  coaches: Coach[];
  onOpenSession: (sessionId: string) => void;
  onBookNew: () => void;
  onReschedule: (sessionId: string, dateISO: string, dateLabel: string, time: string) => void;
  onCancelSession: (sessionId: string, reason: string) => void;
}

export const SessionsPage: React.FC<SessionsPageProps> = ({
  sessions,
  coaches,
  onOpenSession,
  onBookNew,
  onReschedule,
  onCancelSession,
}) => {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [rescheduleTarget, setRescheduleTarget] = useState<CoachingSession | null>(null);
  const [newDateISO, setNewDateISO] = useState('');
  const [newTime, setNewTime] = useState('');

  const [cancelTarget, setCancelTarget] = useState<CoachingSession | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  const upcoming = sessions.filter((s) => s.status === 'upcoming');
  const completed = sessions.filter((s) => s.status === 'completed');
  const cancelled = sessions.filter((s) => s.status === 'cancelled');

  const visibleList =
    tab === 'upcoming' ? upcoming : tab === 'completed' ? completed : cancelled;

  const openReschedule = (session: CoachingSession) => {
    const coach = coaches.find((c) => c.id === session.coachId);
    const firstSlot = coach?.availability[0];
    setRescheduleTarget(session);
    setNewDateISO(firstSlot?.dateISO || session.dateISO);
    setNewTime(firstSlot?.times[0] || session.time);
  };

  const targetCoach = rescheduleTarget
    ? coaches.find((c) => c.id === rescheduleTarget.coachId)
    : undefined;
  const targetDaySlot = targetCoach?.availability.find((a) => a.dateISO === newDateISO);

  const handleConfirmReschedule = () => {
    if (!rescheduleTarget || !targetDaySlot) return;
    onReschedule(
      rescheduleTarget.id,
      targetDaySlot.dateISO,
      `${targetDaySlot.dateLabel}, 2026`,
      newTime
    );
    setRescheduleTarget(null);
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    onCancelSession(cancelTarget.id, cancelReason.trim() || 'Schedule conflict');
    setCancelTarget(null);
    setCancelReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
            Coaching sessions
          </h1>
          <p className="mt-1 text-sm text-[#5B6472]">
            Manage upcoming sessions, prepare talking points, and review past reflections.
          </p>
        </div>
        <Button variant="primary" onClick={onBookNew}>
          <Plus className="w-4 h-4" />
          <span>Book New Session</span>
        </Button>
      </div>

      <SegmentedTabs
        activeTab={tab}
        onChange={(id) => setTab(id as 'upcoming' | 'completed' | 'cancelled')}
        tabs={[
          { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
          { id: 'completed', label: 'Completed', count: completed.length },
          { id: 'cancelled', label: 'Cancelled', count: cancelled.length },
        ]}
      />

      {visibleList.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-5 h-5" />}
          title={`No ${tab} sessions`}
          description={
            tab === 'upcoming'
              ? 'Book a session with your coach to continue building momentum on your goals.'
              : `You have no ${tab} coaching sessions in your history.`
          }
          actionLabel={tab === 'upcoming' ? 'Book Session' : undefined}
          onAction={tab === 'upcoming' ? onBookNew : undefined}
        />
      ) : (
        <div className="space-y-4">
          {visibleList.map((session) => (
            <Card key={session.id} padding="md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Avatar src={session.coachAvatar} name={session.coachName} size="md" />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-base font-semibold text-[#0F1E36]">
                        {session.topic}
                      </h2>
                      <StatusLabel
                        tone={
                          session.status === 'upcoming'
                            ? 'success'
                            : session.status === 'completed'
                            ? 'neutral'
                            : 'danger'
                        }
                        label={
                          session.status === 'upcoming'
                            ? 'Confirmed'
                            : session.status === 'completed'
                            ? 'Completed'
                            : 'Cancelled'
                        }
                      />
                    </div>
                    <p className="text-sm text-[#374151] mt-0.5">
                      With {session.coachName} · {session.coachTitle}
                    </p>
                    <p className="text-xs text-[#5B6472] mt-1 tabular-nums">
                      {session.dateLabel} · {session.time} · {session.durationMins} min ·{' '}
                      {session.format}
                    </p>
                    {session.cancellationReason && (
                      <p className="text-xs text-[#DC2626] mt-1">
                        Reason: {session.cancellationReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {session.status !== 'cancelled' && (
                    <Button
                      variant={session.status === 'upcoming' ? 'accent' : 'outline'}
                      size="sm"
                      onClick={() => onOpenSession(session.id)}
                    >
                      {session.status === 'upcoming' ? 'Prep & Notes' : 'View Reflection'}
                    </Button>
                  )}
                  {session.status === 'upcoming' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReschedule(session)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCancelTarget(session)}
                        className="text-[#DC2626] hover:bg-[#FEF2F2]"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reschedule Modal */}
      <Modal
        open={Boolean(rescheduleTarget)}
        onClose={() => setRescheduleTarget(null)}
        title="Reschedule session"
        description={
          rescheduleTarget
            ? `Choose a new date and time with ${rescheduleTarget.coachName}.`
            : undefined
        }
      >
        {rescheduleTarget && targetCoach && (
          <div className="space-y-4">
            <Select
              label="Available date"
              value={newDateISO}
              onChange={(e) => {
                const nextDate = e.target.value;
                setNewDateISO(nextDate);
                const slot = targetCoach.availability.find((a) => a.dateISO === nextDate);
                if (slot?.times[0]) setNewTime(slot.times[0]);
              }}
              options={targetCoach.availability.map((a) => ({
                value: a.dateISO,
                label: `${a.dateLabel}, 2026`,
              }))}
            />
            <Select
              label="Available time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              options={(targetDaySlot?.times || [rescheduleTarget.time]).map((t) => ({
                value: t,
                label: t,
              }))}
            />
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setRescheduleTarget(null)}>
                Keep Current Time
              </Button>
              <Button variant="primary" onClick={handleConfirmReschedule}>
                Save New Time
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel Modal */}
      <Modal
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel coaching session"
        description="Your coach will be notified. You can rebook at any time from the directory."
      >
        <div className="space-y-4">
          <Textarea
            label="Optional note for your coach"
            rows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="e.g. Urgent product review conflict; will rebook for next Tuesday."
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setCancelTarget(null)}>
              Keep Session
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
