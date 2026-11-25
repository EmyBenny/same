import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HERO_IMAGE } from '../../data/mockData';
import { TopView } from '../../types/elevate';
import { Button, Card, Input, SegmentedTabs } from '../ui';
import { CINEMATIC_EASE } from '../ui/MotionPrimitives';

interface MarketingPageProps {
  onLaunchPrototype: () => void;
  onNavigateTop: (view: TopView) => void;
}

export const MarketingPage: React.FC<MarketingPageProps> = ({
  onLaunchPrototype,
  onNavigateTop,
}) => {
  const [featureTab, setFeatureTab] = useState<'matching' | 'goals' | 'privacy'>('matching');
  const [creativeTab, setCreativeTab] = useState<'ad' | 'deck' | 'announcement'>('ad');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoError, setDemoError] = useState('');
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleRequestDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail.includes('@')) {
      setDemoError('Enter a valid work email address.');
      return;
    }
    setDemoError('');
    setDemoSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F6]">
      {/* Portfolio Disclaimer Strip (Subtle, Honest, Zero Clutter) */}
      <div className="border-b border-[#E5E4DF] bg-[#F3F2EE]">
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5B6472]">
          <span>
            Independent speculative product design portfolio concept — not affiliated with,
            commissioned by, or endorsed by Sama.
          </span>
          <button
            type="button"
            onClick={() => onNavigateTop('case-study')}
            className="font-medium text-[#0F1E36] hover:text-[#0D7A68] whitespace-nowrap cursor-pointer text-left"
          >
            Read 16-part UX Case Study →
          </button>
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="max-w-[1280px] mx-auto px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium text-[#0D7A68]">
                B2B Employee Growth &amp; Professional Coaching
              </p>
              <h1
                className="mt-4 font-display font-bold tracking-tight text-[#0F1E36] leading-[1.08] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
              >
                Professional coaching built for employee clarity and manager trust.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#374151] leading-relaxed max-w-xl">
                Same helps distributed teams match with accredited coaches, translate session
                insights into measurable career goals, and give leaders aggregate visibility without
                exposing private conversations.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg" onClick={onLaunchPrototype}>
                  <span>Explore Interactive Prototype</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigateTop('design-system')}
                >
                  View Design System
                </Button>
              </div>
            </div>

            <p className="mt-8 text-xs text-[#5B6472]">
              Includes interactive Employee &amp; Manager workspaces, 5-step onboarding, coach
              directory, booking flow, and documented component library.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-[#E5E4DF] bg-[#EAE8E1]">
              <img
                src={HERO_IMAGE}
                alt="Two professionals engaged in a calm one-on-one coaching conversation in a sunlit modern office"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Principle Strip Below Hero */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-[#E5E4DF] rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-[#E5E4DF]">
          <div className="p-6">
            <p className="font-display text-xl font-semibold text-[#0F1E36]">5-Step Assessment</p>
            <p className="mt-1 text-xs text-[#5B6472] leading-relaxed">
              Structured self-reflection identifies skill gaps before choosing a coach.
            </p>
          </div>
          <div className="p-6">
            <p className="font-display text-xl font-semibold text-[#0F1E36]">100% Private Notes</p>
            <p className="mt-1 text-xs text-[#5B6472] leading-relaxed">
              Session topics, transcripts, and reflections remain strictly confidential.
            </p>
          </div>
          <div className="p-6">
            <p className="font-display text-xl font-semibold text-[#0F1E36]">Opt-In Goal Sharing</p>
            <p className="mt-1 text-xs text-[#5B6472] leading-relaxed">
              Employees choose goal-by-goal what progress milestones managers can view.
            </p>
          </div>
          <div className="p-6">
            <p className="font-display text-xl font-semibold text-[#0F1E36]">Aggregate Insights</p>
            <p className="mt-1 text-xs text-[#5B6472] leading-relaxed">
              Cohort-level participation and skill themes guide L&amp;D investments responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Benefits for Employees vs Organizations */}
      <section className="border-t border-[#E5E4DF] bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium text-[#0D7A68]">Dual-Sided Value</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
              Designed for individual psychological safety and organizational accountability
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card padding="lg" className="lg:col-span-7 bg-[#FAF9F6]">
              <p className="text-xs font-semibold text-[#0D7A68]">For Employees</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-[#0F1E36]">
                Clarity on where to grow and space to practice without performance anxiety
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-[#374151]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A68] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0F1E36]">Guided self-assessment:</strong> Pinpoint
                    specific capabilities—from executive framing to delegation—instead of staring at
                    a blank goal form.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A68] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0F1E36]">Curated coach discovery:</strong> Filter
                    accredited practitioners by domain background, language, timezone, and format.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7A68] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0F1E36]">Continuity between sessions:</strong>{' '}
                    Pre-session checklists, private notes, and action items convert straight into
                    milestones.
                  </span>
                </li>
              </ul>
            </Card>

            <Card padding="lg" className="lg:col-span-5 bg-[#0F1E36] text-white border-[#0F1E36]">
              <p className="text-xs font-semibold text-[#2DD4BF]">For Organizations &amp; Managers</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">
                Measure program adoption without turning coaching into surveillance
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                  <span>
                    Track quarterly enrollment, session cadence, and completion across cohorts of 5+
                    people.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                  <span>
                    Support direct reports on the specific development goals they choose to share
                    with you.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                  <span>
                    Spot emerging capability needs (e.g., stakeholder alignment) to plan team
                    training budgets.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-[#0D7A68]">How It Works</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
            Four structured stages from onboarding to sustained behavior change
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01. Self-Assessment',
              desc: 'Employees benchmark five core leadership competencies and select career priorities in under four minutes.',
            },
            {
              step: '02. Coach Match & Booking',
              desc: 'Filter vetted coaches by experience and availability, then schedule Video 1:1, Audio Walk, or Async reviews.',
            },
            {
              step: '03. Prep, Session & Goals',
              desc: 'Capture private reflections and promote session action items into trackable milestones.',
            },
            {
              step: '04. Privacy-Safe Insights',
              desc: 'Managers review anonymized team trends and only the goals employees explicitly opt to share.',
            },
          ].map((item) => (
            <Card key={item.step} padding="md" className="space-y-2.5">
              <h3 className="font-display text-base font-semibold text-[#0F1E36]">{item.step}</h3>
              <p className="text-sm text-[#5B6472] leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Coaching Features Interactive Showcase */}
      <section className="border-t border-[#E5E4DF] bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#0D7A68]">Platform Capabilities</p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
                Every workflow built around real coaching habits
              </h2>
            </div>
            <SegmentedTabs
              activeTab={featureTab}
              onChange={(v) => setFeatureTab(v as 'matching' | 'goals' | 'privacy')}
              tabs={[
                { id: 'matching', label: 'Coach Discovery' },
                { id: 'goals', label: 'Goal & Session Loop' },
                { id: 'privacy', label: 'Privacy Architecture' },
              ]}
            />
          </div>

          <Card padding="lg" className="bg-[#FAF9F6] overflow-hidden">
            <AnimatePresence mode="wait">
              {featureTab === 'matching' && (
                <motion.div
                  key="matching"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="font-display text-xl font-semibold text-[#0F1E36]">
                      Transparent credentials, real availability, zero guesswork
                    </h3>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Instead of opaque algorithm-only assignment, Same gives employees filtered
                      choice across ICF/EMCC accredited coaches with visible methodology notes and
                      immediate booking slots.
                    </p>
                  </div>
                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-[#E5E4DF]">
                      <p className="text-xs text-[#5B6472]">Filter dimensions</p>
                      <p className="mt-1 text-sm font-semibold text-[#0F1E36]">
                        Specialty · Experience · Rating · Weekly Availability
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-[#E5E4DF]">
                      <p className="text-xs text-[#5B6472]">Session formats</p>
                      <p className="mt-1 text-sm font-semibold text-[#0F1E36]">
                        Video 1:1 · Audio Walk · Async Review
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {featureTab === 'goals' && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="font-display text-xl font-semibold text-[#0F1E36]">
                      Connect conversation insights directly to workplace milestones
                    </h3>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Pre-session preparation checklists sharpen focus before the call. Afterward,
                      employees capture reflections and promote concrete action items straight into
                      their Development Plan.
                    </p>
                  </div>
                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-[#E5E4DF]">
                      <p className="text-xs text-[#5B6472]">Before session</p>
                      <p className="mt-1 text-sm font-semibold text-[#0F1E36]">
                        Interactive Prep Checklist &amp; Private Notes
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-[#E5E4DF]">
                      <p className="text-xs text-[#5B6472]">After session</p>
                      <p className="mt-1 text-sm font-semibold text-[#0F1E36]">
                        1-Click Action Item to Goal Promotion
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {featureTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: CINEMATIC_EASE }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="font-display text-xl font-semibold text-[#0F1E36]">
                      Hard architectural boundary between coaching and performance reviews
                    </h3>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Managers see aggregate cohort participation and only the goals an employee
                      explicitly toggles to shared. Personal notes, coach selections, and session
                      topics are inaccessible by design.
                    </p>
                  </div>
                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-[#E5E4DF]">
                      <p className="text-xs text-[#5B6472]">Default state</p>
                      <p className="mt-1 text-sm font-semibold text-[#0F1E36]">
                        Private to Employee Until Shared
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-[#E5E4DF]">
                      <p className="text-xs text-[#5B6472]">Minimum cohort rule</p>
                      <p className="mt-1 text-sm font-semibold text-[#0F1E36] tabular-nums">
                        n &ge; 5 for Theme Aggregates
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </section>

      {/* 5. Fictional Testimonials (Explicitly Labeled) */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-[#5B6472]">
            Illustrative Perspectives (Fictional Placeholder Testimonials)
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
            How teams experience privacy-first coaching
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                'Before Same, employees hesitated to use our coaching stipend because they worried managers could read their focus areas. Making goal sharing strictly opt-in changed adoption across our entire engineering org.',
              name: 'Hannah Lindstrom',
              role: 'VP of People Operations, Northstar Cloud (Fictional)',
            },
            {
              quote:
                'Having my session prep checklist and development milestones in one calm workspace helped me prepare for principal-level scope reviews without feeling overwhelmed.',
              name: 'Devon Brooks',
              role: 'Staff Product Designer, Meridian FinTech (Fictional)',
            },
            {
              quote:
                'I get the exact context I need to sponsor my reports—the high-level goals they choose to share—without ever overstepping into their confidential coaching conversations.',
              name: 'Priya Subramanian',
              role: 'Director of Engineering, Harbor Health (Fictional)',
            },
          ].map((t) => (
            <Card key={t.name} padding="md" className="flex flex-col justify-between space-y-6">
              <p className="text-sm text-[#374151] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-4 border-t border-[#E5E4DF]">
                <p className="text-sm font-semibold text-[#0F1E36]">{t.name}</p>
                <p className="text-xs text-[#5B6472] mt-0.5">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Marketing & Brand Creative Deliverables */}
      <section className="border-t border-[#E5E4DF] bg-white py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#0D7A68]">Brand &amp; Campaign Deliverables</p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
                Marketing, sales, and launch visual system
              </h2>
            </div>
            <SegmentedTabs
              activeTab={creativeTab}
              onChange={(v) => setCreativeTab(v as 'ad' | 'deck' | 'announcement')}
              tabs={[
                { id: 'ad', label: 'Digital Ad Visual' },
                { id: 'deck', label: 'Sales Deck Cover' },
                { id: 'announcement', label: 'Product Announcement' },
              ]}
            />
          </div>

          <AnimatePresence mode="wait">
            {/* Artboard 1: Digital Advertising Campaign Visual */}
            {creativeTab === 'ad' && (
              <motion.div
                key="creative-ad"
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
                className="rounded-2xl overflow-hidden border border-[#E5E4DF] bg-[#0F1E36] text-white p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-xs font-mono tracking-wide text-[#2DD4BF]">
                    SAME FOR ENTERPRISE PEOPLE TEAMS · B2B CAMPAIGN VISUAL (16:9)
                  </p>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-balance">
                    Professional growth should never feel like workplace surveillance.
                  </h3>
                  <p className="text-sm sm:text-base text-white/75 max-w-xl leading-relaxed">
                    Give every employee confidential 1-on-1 coaching while equipping managers with
                    privacy-safe team capability insights.
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D7A68] text-sm font-medium text-white">
                      See How Privacy-First Coaching Works →
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-white/70 border-b border-white/10 pb-3">
                    <span>Same Privacy Boundary</span>
                    <span className="text-[#2DD4BF] font-mono">ACTIVE</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">1-on-1 Coaching Notes</span>
                      <span className="text-xs font-mono text-white/60">PRIVATE TO EMPLOYEE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Goal Progress Milestones</span>
                      <span className="text-xs font-mono text-[#2DD4BF]">OPT-IN SHARING</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Team Participation Rate</span>
                      <span className="text-xs font-mono text-white">AGGREGATED (84%)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Artboard 2: Professional Sales Presentation Cover */}
            {creativeTab === 'deck' && (
              <motion.div
                key="creative-deck"
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
                className="rounded-2xl overflow-hidden border border-[#E5E4DF] bg-[#FAF9F6] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E5E4DF] pb-4">
                    <span className="font-display text-lg font-bold text-[#0F1E36]">Same</span>
                    <span className="text-xs font-mono text-[#5B6472]">
                      ENTERPRISE SALES PRESENTATION COVER · 2027
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F1E36] leading-tight text-balance">
                    Scaling Leadership Readiness Across Distributed Organizations
                  </h3>
                  <p className="text-base text-[#5B6472] max-w-xl leading-relaxed">
                    Executive briefing for People Leaders, HRBPs, and Engineering VPs on
                    measurable, psychologically safe employee coaching.
                  </p>
                  <div className="pt-4 grid grid-cols-3 gap-6 border-t border-[#E5E4DF] max-w-lg text-xs">
                    <div>
                      <p className="text-[#5B6472]">Prepared For</p>
                      <p className="font-semibold text-[#0F1E36] mt-0.5">
                        People &amp; L&amp;D Leadership
                      </p>
                    </div>
                    <div>
                      <p className="text-[#5B6472]">Architecture</p>
                      <p className="font-semibold text-[#0F1E36] mt-0.5">Privacy-By-Design</p>
                    </div>
                    <div>
                      <p className="text-[#5B6472]">Concept Author</p>
                      <p className="font-semibold text-[#0F1E36] mt-0.5">Portfolio Case Study</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 rounded-xl overflow-hidden border border-[#E5E4DF] aspect-square">
                  <img
                    src="/src/assets/images/coach_elena_rostova_1795616100603.jpg"
                    alt="Executive coach portrait on sales deck cover"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Artboard 3: Product Announcement Graphic */}
            {creativeTab === 'announcement' && (
              <motion.div
                key="creative-announcement"
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
                className="rounded-2xl overflow-hidden border border-[#E5E4DF] bg-[#EEF7F5] p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <p className="text-xs font-mono font-semibold text-[#0A6153]">
                    PRODUCT ANNOUNCEMENT GRAPHIC
                  </p>
                  <h3 className="font-display text-3xl font-bold tracking-tight text-[#0F1E36] leading-tight text-balance">
                    Introducing Opt-In Goal Sharing for Coaching Teams
                  </h3>
                  <p className="text-sm text-[#374151] leading-relaxed">
                    Employees now control goal-level visibility with a single toggle—inviting
                    manager sponsorship while keeping 1-on-1 reflections completely confidential.
                  </p>
                </div>
                <div className="lg:col-span-6 bg-white border border-[#D8D6CF] rounded-xl p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#0F1E36]">
                      Lead cross-functional Q1 strategy reviews
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#0D7A68] tabular-nums">
                      67%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#F3F2EE] rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#0D7A68] rounded-full" />
                  </div>
                  <div className="pt-3 border-t border-[#E5E4DF] flex items-center justify-between text-xs">
                    <span className="text-[#5B6472]">Private session notes remain locked</span>
                    <span className="font-medium text-[#0A6153]">Shared with Manager: On</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 7. Conversion / Lead Capture + CTA */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
        <Card padding="lg" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F1E36]">
              Walk through the live Same prototype
            </h2>
            <p className="text-sm text-[#5B6472] max-w-xl leading-relaxed">
              Test the complete employee onboarding, coach discovery, booking flow, goal privacy
              toggles, and manager insights workspace right in your browser.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="lg" onClick={onLaunchPrototype}>
                Launch Interactive Prototype
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-xl bg-[#FAF9F6] border border-[#E5E4DF]">
            <p className="text-sm font-semibold text-[#0F1E36]">
              Request an enterprise walkthrough (Prototype form)
            </p>
            {demoSubmitted ? (
              <div className="mt-4 flex items-start gap-2.5 text-sm text-[#0A6153]">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  Thank you. Your inquiry for <strong>{demoEmail}</strong> has been logged in this
                  local prototype.
                </span>
              </div>
            ) : (
              <form onSubmit={handleRequestDemo} className="mt-4 space-y-3" noValidate>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  error={demoError}
                />
                <Button type="submit" variant="accent" className="w-full">
                  Request Walkthrough
                </Button>
              </form>
            )}
          </div>
        </Card>
      </section>

      {/* Quiet Footer */}
      <footer className="border-t border-[#E5E4DF] bg-white py-10">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5B6472]">
          <div>
            <span className="font-display text-sm font-bold text-[#0F1E36]">Same</span>
            <span className="ml-3">
              Independent speculative product design portfolio concept. Not an official Sama product.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onLaunchPrototype}
              className="hover:text-[#0F1E36] cursor-pointer"
            >
              Prototype
            </button>
            <button
              type="button"
              onClick={() => onNavigateTop('design-system')}
              className="hover:text-[#0F1E36] cursor-pointer"
            >
              Design System
            </button>
            <button
              type="button"
              onClick={() => onNavigateTop('case-study')}
              className="hover:text-[#0F1E36] cursor-pointer"
            >
              Case Study
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
