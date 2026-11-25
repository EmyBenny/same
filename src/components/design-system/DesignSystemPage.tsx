import React, { useState } from 'react';
import { Inbox, Monitor, Smartphone, Tablet } from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  ErrorBanner,
  Input,
  LoadingSkeleton,
  Modal,
  ProgressBar,
  SegmentedTabs,
  Select,
  StatusLabel,
  Tooltip,
} from '../ui';
import { cn } from '../../lib/utils';

export const DesignSystemPage: React.FC = () => {
  const [sampleTab, setSampleTab] = useState('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('Executive Presence');
  const [inputErr, setInputErr] = useState('');
  const [selectVal, setSelectVal] = useState('video');
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const colors = [
    { name: 'Deep Navy 900', hex: '#0F1E36', role: 'Primary brand ink & structural CTA' },
    { name: 'Teal Accent 600', hex: '#0D7A68', role: 'Primary interactive accent & focus' },
    { name: 'Teal Surface 50', hex: '#EEF7F5', role: 'Selected state & privacy callout surface' },
    { name: 'Warm Canvas', hex: '#FAF9F6', role: '60% dominant neutral page background' },
    { name: 'Card Surface', hex: '#FFFFFF', role: 'Elevated content containers' },
    { name: 'Hairline Border', hex: '#E5E4DF', role: '1px structural card & table dividers' },
    { name: 'Muted Text', hex: '#5B6472', role: 'Secondary metadata & axis labels' },
    { name: 'Danger Crimson', hex: '#DC2626', role: 'Destructive actions & validation errors' },
  ];

  const spacingTokens = [
    { token: 'space-1', px: '4px', usage: 'Tight icon-to-label gap' },
    { token: 'space-2', px: '8px', usage: 'Segmented tab internal padding' },
    { token: 'space-4', px: '16px', usage: 'Compact card padding & form field rhythm' },
    { token: 'space-6', px: '24px', usage: 'Standard card padding & grid gutter' },
    { token: 'space-8', px: '32px', usage: 'Section vertical cadence' },
    { token: 'space-12', px: '48px', usage: 'Major marketing layout separation' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium text-[#0D7A68]">Same Design Language</p>
        <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F1E36]">
          Same Design System
        </h1>
        <p className="mt-3 text-base text-[#5B6472] leading-relaxed">
          A calm, high-legibility B2B SaaS component and token system built for long-form reflection,
          scheduling clarity, and zero-pill visual restraint.
        </p>
      </div>

      {/* 1. Color Palette */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
          01. Colour Palette (60-30-10 Discipline)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colors.map((c) => (
            <Card key={c.name} padding="sm" className="space-y-3">
              <div
                className="h-16 w-full rounded-lg border border-[#E5E4DF]"
                style={{ backgroundColor: c.hex }}
              />
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#0F1E36]">{c.name}</p>
                  <code className="text-xs font-mono text-[#5B6472]">{c.hex}</code>
                </div>
                <p className="text-xs text-[#5B6472] mt-1">{c.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
          02. Typography Scale (Plus Jakarta Sans · DM Sans · JetBrains Mono)
        </h2>
        <Card padding="md" className="divide-y divide-[#E5E4DF]">
          <div className="py-4 first:pt-0 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F1E36]">
              Display Hero Headline
            </p>
            <code className="text-xs font-mono text-[#5B6472] shrink-0">
              Plus Jakarta Sans · 36–48px / 700
            </code>
          </div>
          <div className="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <p className="font-display text-2xl font-semibold text-[#0F1E36]">
              Page &amp; Section Heading
            </p>
            <code className="text-xs font-mono text-[#5B6472] shrink-0">
              Plus Jakarta Sans · 24px / 600
            </code>
          </div>
          <div className="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <p className="text-base text-[#111827] max-w-xl">
              Body prose optimized for reflective reading and coaching notes with comfortable 1.6
              line height and neutral contrast.
            </p>
            <code className="text-xs font-mono text-[#5B6472] shrink-0">
              DM Sans · 15–16px / 400
            </code>
          </div>
          <div className="py-4 last:pb-0 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <p className="font-mono text-sm text-[#0F1E36] tabular-nums">
              84.0% · Thu, Nov 26 · 10:00 CET
            </p>
            <code className="text-xs font-mono text-[#5B6472] shrink-0">
              JetBrains Mono · tabular-nums
            </code>
          </div>
        </Card>
      </section>

      {/* 3. Spacing, Radius & Elevation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="md" className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
            03. Spacing Scale (4px Base Grid)
          </h2>
          <div className="space-y-3">
            {spacingTokens.map((s) => (
              <div key={s.token} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <code className="font-mono text-[#0F1E36] w-20">{s.token}</code>
                  <div
                    className="h-3 rounded-xs bg-[#0D7A68]"
                    style={{ width: s.px }}
                  />
                  <span className="font-mono text-[#5B6472] tabular-nums">{s.px}</span>
                </div>
                <span className="text-[#5B6472] text-right">{s.usage}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md" className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
            04. Border Radius &amp; Single-Elevation Depth
          </h2>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg border border-[#E5E4DF] bg-[#FAF9F6] text-center">
              <p className="text-xs font-mono font-medium text-[#0F1E36]">rounded-lg</p>
              <p className="text-[11px] text-[#5B6472] mt-1">8px · Controls &amp; Inputs</p>
            </div>
            <div className="p-4 rounded-xl border border-[#E5E4DF] bg-white text-center">
              <p className="text-xs font-mono font-medium text-[#0F1E36]">rounded-xl</p>
              <p className="text-[11px] text-[#5B6472] mt-1">12px · Surface Cards</p>
            </div>
            <div className="p-4 rounded-2xl border border-[#E5E4DF] bg-white shadow-lg text-center">
              <p className="text-xs font-mono font-medium text-[#0F1E36]">shadow-lg</p>
              <p className="text-[11px] text-[#5B6472] mt-1">Modals &amp; Popovers Only</p>
            </div>
          </div>
          <p className="text-xs text-[#5B6472] leading-relaxed">
            Cards rely on 1px hairline borders (<code className="font-mono">#E5E4DF</code>) rather
            than stacked drop shadows, keeping dense schedules and notes calm.
          </p>
        </Card>
      </section>

      {/* 4. Interactive Components */}
      <section className="space-y-6">
        <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
          05. Core Interactive Components
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Buttons & Status */}
          <Card padding="md" className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-[#5B6472] mb-3">Buttons</p>
              <div className="flex flex-wrap gap-2.5">
                <Button variant="primary">Primary</Button>
                <Button variant="accent">Accent Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="primary" loading>
                  Saving
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E4DF]">
              <p className="text-xs font-semibold text-[#5B6472] mb-3">
                Semantic Status Indicators (Icon + Text, Zero Pill Clutter)
              </p>
              <div className="flex flex-wrap gap-5">
                <StatusLabel tone="success" label="Confirmed" />
                <StatusLabel tone="warning" label="Reschedule Pending" />
                <StatusLabel tone="danger" label="Cancelled" />
                <StatusLabel tone="private" label="Private to Employee" />
                <StatusLabel tone="neutral" label="Archived" />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E4DF] flex flex-wrap items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
                Open Sample Modal
              </Button>
              <Tooltip content="Coaching notes are encrypted and never visible to managers.">
                <button
                  type="button"
                  className="text-xs font-medium text-[#0D7A68] underline decoration-dotted cursor-help"
                >
                  Hover or focus for Tooltip
                </button>
              </Tooltip>
            </div>
          </Card>

          {/* Inputs, Select & Tabs */}
          <Card padding="md" className="space-y-4">
            <p className="text-xs font-semibold text-[#5B6472]">Form Controls &amp; Tabs</p>
            <Input
              label="Development Focus Input"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                setInputErr(e.target.value.trim().length < 3 ? 'Enter at least 3 characters.' : '');
              }}
              error={inputErr}
              helperText="Clear the input to preview inline validation."
            />
            <Select
              label="Session Format Select"
              value={selectVal}
              onChange={(e) => setSelectVal(e.target.value)}
              options={[
                { value: 'video', label: 'Video 1:1 (45 min)' },
                { value: 'audio', label: 'Audio Walk (30 min)' },
                { value: 'async', label: 'Async Strategy Review' },
              ]}
            />
            <div className="pt-2">
              <p className="text-xs font-medium text-[#0F1E36] mb-2">Segmented Navigation Tabs</p>
              <SegmentedTabs
                activeTab={sampleTab}
                onChange={setSampleTab}
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'sessions', label: 'Sessions', count: 3 },
                  { id: 'goals', label: 'Goals', count: 2 },
                ]}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* 5. Data Tables & System States (Empty, Loading, Error) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
            06. Tables, Empty, Loading &amp; Error States
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLoadingDemo((prev) => !prev)}
          >
            {loadingDemo ? 'Show Populated Table' : 'Preview Loading Skeleton'}
          </Button>
        </div>

        <Card padding="md">
          {loadingDemo ? (
            <LoadingSkeleton rows={4} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E4DF] text-xs font-medium text-[#5B6472]">
                    <th className="py-2.5 pr-4">Coach</th>
                    <th className="py-2.5 px-4">Specialty</th>
                    <th className="py-2.5 px-4 text-right">Sessions</th>
                    <th className="py-2.5 pl-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E4DF] text-sm">
                  <tr>
                    <td className="py-3 pr-4 font-medium text-[#0F1E36]">Dr. Elena Rostova</td>
                    <td className="py-3 px-4 text-[#5B6472]">Executive Presence</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">12</td>
                    <td className="py-3 pl-4 text-right">
                      <StatusLabel tone="success" label="Active" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-[#0F1E36]">Marcus Chen</td>
                    <td className="py-3 px-4 text-[#5B6472]">People Leadership</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">8</td>
                    <td className="py-3 pl-4 text-right">
                      <StatusLabel tone="warning" label="Next Week" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmptyState
            icon={<Inbox className="w-5 h-5" />}
            title="Empty state specimen"
            description="Used when a search returns zero coaches or an employee has not created their first development goal."
            actionLabel="Primary Action"
            onAction={() => {}}
          />
          <div className="space-y-4">
            <ErrorBanner
              title="Error state specimen"
              message="Unable to sync calendar availability. Check your connection and retry."
              onRetry={() => {}}
            />
            <Card padding="md" className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#0F1E36]">Goal progress indicator</span>
                <span className="font-mono tabular-nums text-[#5B6472]">68%</span>
              </div>
              <ProgressBar value={68} />
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Responsive Component Variants */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-[#0F1E36]">
            07. Responsive Component Variants
          </h2>
          <div className="inline-flex items-center gap-1 p-1 bg-[#F3F2EE] border border-[#E5E4DF] rounded-lg">
            {[
              { id: 'desktop', label: 'Desktop', Icon: Monitor },
              { id: 'tablet', label: 'Tablet', Icon: Tablet },
              { id: 'mobile', label: 'Mobile', Icon: Smartphone },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setViewportMode(id as 'desktop' | 'tablet' | 'mobile')}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer',
                  viewportMode === id
                    ? 'bg-white text-[#0F1E36] shadow-xs'
                    : 'text-[#5B6472] hover:text-[#0F1E36]'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#F3F2EE] border border-[#E5E4DF] flex justify-center">
          <div
            className={cn(
              'bg-white border border-[#E5E4DF] rounded-xl p-5 transition-all duration-200 w-full',
              viewportMode === 'desktop'
                ? 'max-w-full'
                : viewportMode === 'tablet'
                ? 'max-w-xl'
                : 'max-w-[340px]'
            )}
          >
            <div
              className={cn(
                'flex gap-4 justify-between',
                viewportMode === 'mobile' ? 'flex-col' : 'flex-row items-center'
              )}
            >
              <div className="flex items-center gap-3.5">
                <Avatar
                  src="/src/assets/images/coach_elena_rostova_1795616100603.jpg"
                  name="Dr. Elena Rostova"
                  size="md"
                />
                <div>
                  <p className="text-sm font-semibold text-[#0F1E36]">Dr. Elena Rostova</p>
                  <p className="text-xs text-[#5B6472]">Executive Leadership · 14 yrs</p>
                  <p className="text-xs text-[#0D7A68] mt-0.5 tabular-nums">
                    Next slot: Thu, Nov 26 · 10:00
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className={viewportMode === 'mobile' ? 'w-full' : ''}
              >
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Sample Same Dialog"
        description="Accessible modal with Escape key dismissal, hairline border header, and crisp action hierarchy."
      >
        <p className="text-sm text-[#374151] leading-relaxed">
          Modals are reserved for focused confirmations such as rescheduling a session, creating a
          development goal, or confirming a cancellation.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};
