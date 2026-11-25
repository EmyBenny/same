import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Clock, Lock } from 'lucide-react';
import { Coach, CoachingSession, SessionFormat } from '../../types/elevate';
import { Avatar, Button, Card, Input, Textarea } from '../ui';
import { cn } from '../../lib/utils';

interface SessionBookingProps {
  coaches: Coach[];
  initialCoachId?: string;
  initialDateISO?: string;
  initialTime?: string;
  onConfirmBooking: (session: CoachingSession) => void;
  onCancel: () => void;
  onViewSessions: () => void;
}

export const SessionBooking: React.FC<SessionBookingProps> = ({
  coaches,
  initialCoachId,
  initialDateISO,
  initialTime,
  onConfirmBooking,
  onCancel,
  onViewSessions,
}) => {
  const [selectedCoachId, setSelectedCoachId] = useState(initialCoachId || coaches[0]?.id || '');
  const selectedCoach = coaches.find((c) => c.id === selectedCoachId) || coaches[0];

  const [selectedDateISO, setSelectedDateISO] = useState(
    initialDateISO || selectedCoach?.availability[0]?.dateISO || ''
  );
  const selectedDaySlot =
    selectedCoach?.availability.find((d) => d.dateISO === selectedDateISO) ||
    selectedCoach?.availability[0];

  const [selectedTime, setSelectedTime] = useState(
    initialTime || selectedDaySlot?.times[0] || ''
  );
  const [selectedFormat, setSelectedFormat] = useState<SessionFormat>(
    selectedCoach?.formats[0] || 'Video 1:1'
  );
  const [topic, setTopic] = useState('');
  const [topicError, setTopicError] = useState('');
  const [confirmedSession, setConfirmedSession] = useState<CoachingSession | null>(null);

  useEffect(() => {
    if (!selectedCoach) return;
    const hasDate = selectedCoach.availability.some((a) => a.dateISO === selectedDateISO);
    if (!hasDate) {
      const firstSlot = selectedCoach.availability[0];
      setSelectedDateISO(firstSlot?.dateISO || '');
      setSelectedTime(firstSlot?.times[0] || '');
    }
    if (!selectedCoach.formats.includes(selectedFormat)) {
      setSelectedFormat(selectedCoach.formats[0] || 'Video 1:1');
    }
  }, [selectedCoachId]);

  const handleDateSelect = (dateISO: string) => {
    setSelectedDateISO(dateISO);
    const slot = selectedCoach.availability.find((a) => a.dateISO === dateISO);
    setSelectedTime(slot?.times[0] || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim().length < 5) {
      setTopicError('Enter a brief focus topic (at least 5 characters) to help your coach prepare.');
      return;
    }
    setTopicError('');
    const durationMins = selectedFormat === 'Audio Walk' ? 30 : 45;
    const newSession: CoachingSession = {
      id: `sess-${Date.now()}`,
      coachId: selectedCoach.id,
      coachName: selectedCoach.name,
      coachTitle: selectedCoach.title,
      coachAvatar: selectedCoach.avatarUrl,
      dateISO: selectedDaySlot.dateISO,
      dateLabel: `${selectedDaySlot.dateLabel}, 2026`,
      time: selectedTime,
      durationMins,
      format: selectedFormat,
      topic: topic.trim(),
      status: 'upcoming',
      prepChecklist: [
        { id: `p-${Date.now()}-1`, label: 'Clarify desired decision or insight for this session', completed: false },
        { id: `p-${Date.now()}-2`, label: 'Jot down one recent example to discuss', completed: false },
      ],
      privateNotes: '',
      reflection: {
        takeaway: '',
        confidenceShift: 'Steady',
        voluntarySummary: '',
      },
      actionItems: [],
    };
    onConfirmBooking(newSession);
    setConfirmedSession(newSession);
  };

  if (confirmedSession) {
    return (
      <div className="max-w-2xl mx-auto py-4">
        <Card padding="lg" className="text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#EEF7F5] text-[#0D7A68] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#0D7A68]">Booking Confirmed</p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-[#0F1E36]">
              Session scheduled with {confirmedSession.coachName}
            </h1>
            <p className="mt-2 text-sm text-[#5B6472]">
              A private calendar invite has been generated. Your manager is not notified of your
              session topic or coach selection.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E5E4DF] text-left space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[#5B6472]">Date &amp; Time</span>
              <span className="font-medium text-[#0F1E36] tabular-nums">
                {confirmedSession.dateLabel} · {confirmedSession.time}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#5B6472]">Format</span>
              <span className="font-medium text-[#0F1E36]">
                {confirmedSession.format} ({confirmedSession.durationMins} min)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#5B6472]">Topic</span>
              <span className="font-medium text-[#0F1E36] text-right">{confirmedSession.topic}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button variant="primary" onClick={onViewSessions}>
              View Upcoming Sessions
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-xs font-medium text-[#5B6472] hover:text-[#0F1E36] cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
          Book a coaching session
        </h1>
        <p className="mt-1 text-sm text-[#5B6472]">
          Choose a coach, date, time, and session format tailored to your schedule.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Select Coach */}
          <Card padding="md">
            <h2 className="font-display text-base font-semibold text-[#0F1E36] mb-4">
              1. Select coach
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coaches.map((coach) => {
                const active = coach.id === selectedCoach.id;
                return (
                  <button
                    key={coach.id}
                    type="button"
                    onClick={() => setSelectedCoachId(coach.id)}
                    className={cn(
                      'p-3.5 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer',
                      active
                        ? 'bg-[#EEF7F5] border-[#0D7A68]'
                        : 'bg-white border-[#E5E4DF] hover:border-[#B8B6AE]'
                    )}
                  >
                    <Avatar src={coach.avatarUrl} name={coach.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F1E36] truncate">{coach.name}</p>
                      <p className="text-xs text-[#5B6472] truncate">{coach.specialties[0]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* 2. Select Date & Time */}
          <Card padding="md" className="space-y-5">
            <div>
              <h2 className="font-display text-base font-semibold text-[#0F1E36] mb-3">
                2. Select date &amp; time ({selectedCoach.timezone})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selectedCoach.availability.map((slot) => {
                  const active = slot.dateISO === selectedDaySlot?.dateISO;
                  return (
                    <button
                      key={slot.dateISO}
                      type="button"
                      onClick={() => handleDateSelect(slot.dateISO)}
                      className={cn(
                        'p-3 rounded-lg border text-left transition-colors cursor-pointer',
                        active
                          ? 'bg-[#0F1E36] text-white border-[#0F1E36]'
                          : 'bg-white text-[#0F1E36] border-[#D8D6CF] hover:bg-[#FAF9F6]'
                      )}
                    >
                      <p className="text-xs font-medium tabular-nums">{slot.dayShort}</p>
                      <p
                        className={cn(
                          'text-[11px] mt-0.5 tabular-nums',
                          active ? 'text-white/75' : 'text-[#5B6472]'
                        )}
                      >
                        {slot.times.length} slots open
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-[#5B6472] mb-2.5">Available times</p>
              <div className="flex flex-wrap gap-2">
                {selectedDaySlot?.times.map((time) => {
                  const active = time === selectedTime;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer tabular-nums',
                        active
                          ? 'bg-[#0D7A68] text-white border-[#0D7A68]'
                          : 'bg-white text-[#0F1E36] border-[#D8D6CF] hover:border-[#0F1E36]'
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* 3. Format & Focus Topic */}
          <Card padding="md" className="space-y-5">
            <div>
              <h2 className="font-display text-base font-semibold text-[#0F1E36] mb-3">
                3. Session format &amp; focus topic
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedCoach.formats.map((format) => {
                  const active = format === selectedFormat;
                  return (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setSelectedFormat(format)}
                      className={cn(
                        'p-3 rounded-lg border text-left transition-colors cursor-pointer',
                        active
                          ? 'bg-[#EEF7F5] border-[#0D7A68] text-[#0F1E36]'
                          : 'bg-white border-[#E5E4DF] text-[#5B6472] hover:text-[#0F1E36]'
                      )}
                    >
                      <p className="text-sm font-medium text-[#0F1E36]">{format}</p>
                      <p className="text-xs text-[#5B6472] mt-0.5">
                        {format === 'Audio Walk' ? '30 minutes' : '45 minutes'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <Textarea
              label="What would you like to focus on?"
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Preparing for Q1 roadmap trade-off discussion with Finance and Engineering VPs"
              helperText="Shared only with your selected coach. Never visible to your manager."
              error={topicError}
            />
          </Card>
        </div>

        {/* Right Summary Rail */}
        <div className="lg:col-span-4">
          <Card padding="md" className="space-y-4 sticky top-24">
            <h2 className="font-display text-base font-semibold text-[#0F1E36]">
              Booking summary
            </h2>

            <div className="flex items-center gap-3 pb-4 border-b border-[#E5E4DF]">
              <Avatar src={selectedCoach.avatarUrl} name={selectedCoach.name} size="md" />
              <div>
                <p className="text-sm font-semibold text-[#0F1E36]">{selectedCoach.name}</p>
                <p className="text-xs text-[#5B6472]">{selectedCoach.title}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-[#374151]">
                <Calendar className="w-4 h-4 text-[#5B6472]" />
                <span className="tabular-nums">{selectedDaySlot?.dateLabel}, 2026</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#374151]">
                <Clock className="w-4 h-4 text-[#5B6472]" />
                <span className="tabular-nums">
                  {selectedTime} ({selectedFormat})
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#5B6472] pt-1">
                <Lock className="w-3.5 h-3.5 text-[#0D7A68] shrink-0" />
                <span>Private session topic &amp; notes</span>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Confirm Booking
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};
