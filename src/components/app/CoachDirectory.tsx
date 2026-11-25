import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Coach } from '../../types/elevate';
import { Avatar, Button, Card, EmptyState, Select } from '../ui';
import {
  CINEMATIC_EASE,
  CinematicInteractiveCard,
  CinematicItem,
  CinematicStagger,
} from '../ui/MotionPrimitives';

interface CoachDirectoryProps {
  coaches: Coach[];
  onViewProfile: (coachId: string) => void;
  onBookCoach: (coachId: string) => void;
}

export const CoachDirectory: React.FC<CoachDirectoryProps> = ({
  coaches,
  onViewProfile,
  onBookCoach,
}) => {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [minExperience, setMinExperience] = useState('0');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [minRating, setMinRating] = useState('0');

  const allSpecialties = useMemo(() => {
    const set = new Set<string>();
    coaches.forEach((c) => c.specialties.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [coaches]);

  const filtered = useMemo(() => {
    return coaches.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.bio.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q));
      const matchesSpecialty = specialty === 'all' || c.specialties.includes(specialty);
      const matchesExp = c.yearsExperience >= Number(minExperience);
      const matchesAvail =
        availabilityFilter === 'all' || (availabilityFilter === 'week' && c.availableThisWeek);
      const matchesRating = c.rating >= Number(minRating);
      return matchesQuery && matchesSpecialty && matchesExp && matchesAvail && matchesRating;
    });
  }, [coaches, query, specialty, minExperience, availabilityFilter, minRating]);

  const resetFilters = () => {
    setQuery('');
    setSpecialty('all');
    setMinExperience('0');
    setAvailabilityFilter('all');
    setMinRating('0');
  };

  return (
    <CinematicStagger className="space-y-6">
      <CinematicItem>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
          Find a professional coach
        </h1>
        <p className="mt-1 text-sm text-[#5B6472]">
          Every coach in Same is ICF or EMCC accredited and bound by strict confidentiality.
        </p>
      </CinematicItem>

      {/* Search & Filter Bar */}
      <CinematicItem>
        <Card padding="md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-4 space-y-1.5">
              <label htmlFor="coach-search" className="block text-sm font-medium text-[#0F1E36]">
                Search by name, topic, or role
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#5B6472] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="coach-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Executive Presence, Elena..."
                  className="w-full h-10 pl-9 pr-3.5 rounded-lg bg-white text-sm text-[#111827] border border-[#D8D6CF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7A68]/25 focus-visible:border-[#0D7A68]"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <Select
                label="Specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                options={[
                  { value: 'all', label: 'All specialties' },
                  ...allSpecialties.map((s) => ({ value: s, label: s })),
                ]}
              />
            </div>

            <div className="md:col-span-2">
              <Select
                label="Experience"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
                options={[
                  { value: '0', label: 'Any experience' },
                  { value: '8', label: '8+ years' },
                  { value: '12', label: '12+ years' },
                ]}
              />
            </div>

            <div className="md:col-span-2">
              <Select
                label="Availability"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All dates' },
                  { value: 'week', label: 'Available this week' },
                ]}
              />
            </div>

            <div className="md:col-span-1">
              <Select
                label="Rating"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                options={[
                  { value: '0', label: 'All' },
                  { value: '4.8', label: '4.8+' },
                  { value: '4.9', label: '4.9+' },
                ]}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E4DF] flex items-center justify-between text-xs text-[#5B6472]">
            <span className="tabular-nums">
              Showing {filtered.length} of {coaches.length} coaches
            </span>
            {(query ||
              specialty !== 'all' ||
              minExperience !== '0' ||
              availabilityFilter !== 'all' ||
              minRating !== '0') && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-medium text-[#0D7A68] hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>
        </Card>
      </CinematicItem>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<SlidersHorizontal className="w-5 h-5" />}
          title="No coaches match these filters"
          description="Try broadening your availability window or clearing one of the specialty filters."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((coach, idx) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04, ease: CINEMATIC_EASE }}
            >
              <CinematicInteractiveCard className="p-6 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar src={coach.avatarUrl} name={coach.name} size="lg" />
                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => onViewProfile(coach.id)}
                        className="font-display text-lg font-semibold text-[#0F1E36] hover:text-[#0D7A68] text-left cursor-pointer"
                      >
                        {coach.name}
                      </button>
                      <p className="text-sm text-[#374151]">{coach.title}</p>
                      <p className="mt-1 text-xs text-[#5B6472]">{coach.credentials}</p>
                    </div>
                  </div>

                  {/* Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5B6472] tabular-nums">
                    <span className="inline-flex items-center gap-1 font-medium text-[#0F1E36]">
                      <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                      {coach.rating.toFixed(1)} ({coach.reviewCount} reviews)
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{coach.yearsExperience} years exp</span>
                    <span aria-hidden="true">·</span>
                    <span>{coach.languages.join(', ')}</span>
                  </div>

                  <p className="text-sm text-[#374151] leading-relaxed line-clamp-2">{coach.bio}</p>

                  <div className="text-xs text-[#5B6472]">
                    <span className="font-medium text-[#0F1E36]">Focus: </span>
                    {coach.specialties.join(' · ')}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E4DF] flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="text-[#5B6472]">Next slot: </span>
                    <span className="font-medium text-[#0D7A68] tabular-nums">
                      {coach.nextAvailable}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => onViewProfile(coach.id)}>
                      Profile
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onBookCoach(coach.id)}>
                      Book Session
                    </Button>
                  </div>
                </div>
              </CinematicInteractiveCard>
            </motion.div>
          ))}
        </div>
      )}
    </CinematicStagger>
  );
};
