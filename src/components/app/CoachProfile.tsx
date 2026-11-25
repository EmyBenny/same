import React from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Globe, Star, Video } from 'lucide-react';
import { Coach } from '../../types/elevate';
import { Avatar, Button, Card } from '../ui';

interface CoachProfileProps {
  coach: Coach;
  onBack: () => void;
  onBook: (coachId: string, dateISO?: string, time?: string) => void;
}

export const CoachProfile: React.FC<CoachProfileProps> = ({ coach, onBack, onBook }) => {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-[#5B6472] hover:text-[#0F1E36] cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Coach Directory</span>
      </button>

      {/* Profile Header Card */}
      <Card padding="lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar src={coach.avatarUrl} name={coach.name} size="xl" />
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F1E36]">
                {coach.name}
              </h1>
              <p className="text-base text-[#374151] mt-0.5">{coach.title}</p>
              <p className="text-xs text-[#5B6472] mt-1">{coach.credentials}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5B6472] tabular-nums">
                <span className="inline-flex items-center gap-1 font-medium text-[#0F1E36]">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                  {coach.rating.toFixed(1)} ({coach.reviewCount} completed engagements)
                </span>
                <span aria-hidden="true">·</span>
                <span>{coach.yearsExperience} years coaching experience</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  {coach.languages.join(', ')} ({coach.timezone})
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Button variant="primary" size="lg" onClick={() => onBook(coach.id)}>
              Book Session with {coach.name.split(' ')[0]}
            </Button>
          </div>
        </div>
      </Card>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          <Card padding="md">
            <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
              Professional biography
            </h2>
            <p className="mt-3 text-sm text-[#374151] leading-relaxed">{coach.bio}</p>

            <h3 className="mt-6 font-display text-base font-semibold text-[#0F1E36]">
              Coaching methodology
            </h3>
            <p className="mt-2 text-sm text-[#374151] leading-relaxed">{coach.methodology}</p>
          </Card>

          <Card padding="md">
            <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
              Client feedback themes
            </h2>
            <p className="mt-1 text-xs text-[#5B6472]">
              Anonymized patterns aggregated from post-engagement surveys (fictional prototype data).
            </p>
            <ul className="mt-4 space-y-3">
              {coach.clientFeedbackThemes.map((theme) => (
                <li key={theme} className="flex items-start gap-2.5 text-sm text-[#374151]">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A68] shrink-0 mt-0.5" />
                  <span>{theme}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card padding="md">
            <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
              Specialties &amp; session formats
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium text-[#5B6472]">Coaching specialties</p>
                <p className="mt-1.5 text-sm font-medium text-[#0F1E36] leading-relaxed">
                  {coach.specialties.join(' · ')}
                </p>
              </div>
              <div className="pt-3 border-t border-[#E5E4DF]">
                <p className="text-xs font-medium text-[#5B6472]">Supported formats</p>
                <div className="mt-2 space-y-2">
                  {coach.formats.map((format) => (
                    <div key={format} className="flex items-center gap-2 text-sm text-[#374151]">
                      <Video className="w-4 h-4 text-[#0D7A68]" />
                      <span>{format}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-semibold text-[#0F1E36]">
                Upcoming availability
              </h2>
              <Calendar className="w-4 h-4 text-[#5B6472]" />
            </div>
            <p className="text-xs text-[#5B6472] mb-4">
              Select any open slot below to jump straight into booking.
            </p>

            <div className="space-y-4">
              {coach.availability.map((slot) => (
                <div key={slot.dateISO} className="space-y-2">
                  <p className="text-xs font-semibold text-[#0F1E36] tabular-nums">
                    {slot.dateLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {slot.times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => onBook(coach.id, slot.dateISO, t)}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[#D8D6CF] bg-white text-[#0F1E36] hover:border-[#0D7A68] hover:bg-[#EEF7F5] transition-colors cursor-pointer tabular-nums"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
