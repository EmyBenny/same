import React from 'react';
import { ArrowRight, ExternalLink, Lock, ShieldCheck } from 'lucide-react';
import { AppScreen, TopView, UserRole } from '../../types/elevate';
import { Button, Card } from '../ui';

interface CaseStudyPageProps {
  onOpenPrototypeScreen: (role: UserRole, screen: AppScreen) => void;
  onNavigateTop: (view: TopView) => void;
}

const SECTIONS = [
  { id: 'overview', label: '01. Project Overview' },
  { id: 'problem', label: '02. Problem Statement' },
  { id: 'users', label: '03. Target Users' },
  { id: 'personas', label: '04. User Personas' },
  { id: 'assumptions', label: '05. Assumptions & Research' },
  { id: 'journey', label: '06. User Journey' },
  { id: 'ia', label: '07. Information Architecture' },
  { id: 'wireframes', label: '08. Wireframe Descriptions' },
  { id: 'decisions', label: '09. Design Decisions' },
  { id: 'high-fi', label: '10. High-Fidelity UI' },
  { id: 'design-system', label: '11. Design System' },
  { id: 'responsive', label: '12. Responsive Design' },
  { id: 'walkthrough', label: '13. Prototype Walkthrough' },
  { id: 'testing', label: '14. Usability Testing Plan' },
  { id: 'metrics', label: '15. Success Metrics' },
  { id: 'future', label: '16. Future Improvements' },
  { id: 'deliverable', label: '17. Technical Summary' },
];

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({
  onOpenPrototypeScreen,
  onNavigateTop,
}) => {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sticky Anchor Index */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24">
          <Card padding="sm">
            <p className="px-3 py-2 text-xs font-semibold text-[#0F1E36]">
              Case Study Contents
            </p>
            <nav aria-label="Case study sections" className="space-y-0.5 max-h-[75vh] overflow-y-auto">
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block px-3 py-1.5 rounded-md text-xs text-[#5B6472] hover:text-[#0F1E36] hover:bg-[#FAF9F6] transition-colors"
                >
                  {sec.label}
                </a>
              ))}
            </nav>
          </Card>
        </aside>

        {/* Main Case Study Narrative */}
        <div className="lg:col-span-9 space-y-10 max-w-3xl">
          {/* Hero Header */}
          <div className="space-y-4 pb-8 border-b border-[#E5E4DF]">
            <p className="text-xs font-medium text-[#0D7A68]">
              Product Design Portfolio Case Study
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F1E36] text-balance">
              Same: Designing Privacy-Preserving B2B Coaching &amp; Employee Growth
            </h1>
            <p className="text-base text-[#374151] leading-relaxed">
              An independent speculative product design concept exploring how organizations can
              deliver structured professional coaching while preserving psychological safety between
              employees, coaches, and managers.
            </p>
            <div className="p-4 rounded-xl bg-[#F3F2EE] border border-[#E5E4DF] text-xs text-[#374151] leading-relaxed">
              <strong>Disclosure:</strong> This is an independent portfolio concept created to
              demonstrate end-to-end B2B SaaS product thinking. It is not an official Sama product,
              was not commissioned or approved by Sama, and contains zero real user interviews or
              proprietary company metrics. All assumptions and validation plans are explicitly
              labeled below.
            </div>
          </div>

          {/* 1. Project Overview */}
          <section id="overview" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              01. Project Overview
            </h2>
            <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
              Same is a speculative B2B SaaS coaching platform designed across four surfaces:
              employee onboarding &amp; self-assessment, coach discovery &amp; booking, private
              session &amp; goal management, and a privacy-preserving manager insights console.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <Card padding="sm">
                <p className="text-xs text-[#5B6472]">Role</p>
                <p className="text-sm font-semibold text-[#0F1E36] mt-0.5">
                  Product Design &amp; Systems
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs text-[#5B6472]">Scope</p>
                <p className="text-sm font-semibold text-[#0F1E36] mt-0.5">
                  End-to-End SaaS + Brand
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs text-[#5B6472]">Core Constraint</p>
                <p className="text-sm font-semibold text-[#0F1E36] mt-0.5">
                  Strict Manager Privacy
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs text-[#5B6472]">Deliverable</p>
                <p className="text-sm font-semibold text-[#0F1E36] mt-0.5">
                  Interactive Prototype
                </p>
              </Card>
            </div>
          </section>

          {/* 2. Problem Statement */}
          <section id="problem" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              02. Problem Statement
            </h2>
            <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
              Companies invest in professional coaching to accelerate leadership readiness and
              retain talent, yet two structural tensions limit adoption:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#374151] leading-relaxed">
              <li>
                <strong>Employee friction &amp; ambiguity:</strong> Employees often struggle to
                translate vague career aspirations into clear development needs, evaluate coaches
                credibly, and connect coaching conversations to concrete workplace habits.
              </li>
              <li>
                <strong>The visibility vs. trust paradox:</strong> Managers and HR sponsors need to
                understand whether coaching investments are working, yet any perception that
                managers can inspect private coaching notes destroys employee candor.
              </li>
            </ul>
          </section>

          {/* 3. Target Users */}
          <section id="users" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              03. Target Users
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card padding="md" className="space-y-2">
                <h3 className="font-display text-base font-semibold text-[#0F1E36]">
                  1. Sponsored Employees
                </h3>
                <p className="text-xs text-[#5B6472] leading-relaxed">
                  Mid-to-senior ICs, new managers, and emerging directors seeking confidential
                  skill growth and structured accountability.
                </p>
              </Card>
              <Card padding="md" className="space-y-2">
                <h3 className="font-display text-base font-semibold text-[#0F1E36]">
                  2. People Managers
                </h3>
                <p className="text-xs text-[#5B6472] leading-relaxed">
                  Team leads and VPs who want to sponsor their team&apos;s growth and see cohort
                  trends without crossing confidentiality boundaries.
                </p>
              </Card>
              <Card padding="md" className="space-y-2">
                <h3 className="font-display text-base font-semibold text-[#0F1E36]">
                  3. Accredited Coaches
                </h3>
                <p className="text-xs text-[#5B6472] leading-relaxed">
                  Independent ICF/EMCC practitioners who rely on clear client context, prep signals,
                  and frictionless scheduling.
                </p>
              </Card>
            </div>
          </section>

          {/* 4. User Personas */}
          <section id="personas" className="space-y-4 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              04. Proto-Personas (Hypothesized)
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Maya Patel — Senior Product Manager (32)',
                  goals: 'Transition toward Principal PM scope; align Finance and Engineering stakeholders without burnout.',
                  pain: 'Unsure which coach fits B2B product politics; avoids writing candid notes if leadership might see them.',
                },
                {
                  name: 'Jordan Vance — VP of Product (41)',
                  goals: 'Ensure coaching budget drives real team capability; sponsor direct reports on stretch goals.',
                  pain: 'Has zero visibility into team-wide skill themes unless employees remember to bring them up in 1-on-1s.',
                },
                {
                  name: 'Dr. Elena Rostova — Executive Coach (44)',
                  goals: 'Spend session time on behavioral experiments rather than catching up on basic context.',
                  pain: 'Clients arrive unprepared or lose momentum between bi-weekly video calls.',
                },
              ].map((p) => (
                <Card key={p.name} padding="md" className="space-y-2">
                  <h3 className="font-display text-base font-semibold text-[#0F1E36]">{p.name}</h3>
                  <p className="text-xs text-[#374151]">
                    <strong>Goals:</strong> {p.goals}
                  </p>
                  <p className="text-xs text-[#5B6472]">
                    <strong>Frustrations:</strong> {p.pain}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. Assumptions & Research Questions */}
          <section id="assumptions" className="space-y-4 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              05. Assumptions &amp; Proposed Research Questions
            </h2>
            <Card padding="md" className="space-y-4 bg-[#FAF9F6]">
              <div>
                <p className="text-xs font-semibold text-[#0D7A68]">
                  Labeled Design Assumptions (Unvalidated — To Be Tested)
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-[#374151]">
                  <li>
                    <strong>A1:</strong> Employees are significantly more likely to share development
                    goals with managers when sharing is explicit per goal and defaults to private.
                  </li>
                  <li>
                    <strong>A2:</strong> A 5-dimension self-assessment reduces choice paralysis in
                    the coach directory compared to an unfiltered search bar.
                  </li>
                  <li>
                    <strong>A3:</strong> Converting session action items directly into trackable
                    milestones increases follow-through between sessions.
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-[#E5E4DF]">
                <p className="text-xs font-semibold text-[#0F1E36]">
                  Proposed Discovery Research Questions
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-[#374151]">
                  <li>
                    What signals make employees trust a coach&apos;s profile before booking an intro
                    session?
                  </li>
                  <li>
                    At what minimum team size (e.g., n &ge; 5 vs n &ge; 8) do employees feel safe
                    with anonymized theme aggregation?
                  </li>
                  <li>
                    What information do managers genuinely act on during quarterly career check-ins?
                  </li>
                </ul>
              </div>
            </Card>
          </section>

          {/* 6. User Journey */}
          <section id="journey" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              06. End-to-End User Journey
            </h2>
            <Card padding="md">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
                {[
                  { stage: '1. Activate', desc: 'Invite via SSO / code -> Privacy promise' },
                  { stage: '2. Assess', desc: '5-skill confidence rating -> Goal selection' },
                  { stage: '3. Match', desc: 'Filter coaches -> Inspect bio & open slots' },
                  { stage: '4. Practice', desc: 'Prep checklist -> Private notes -> Action items' },
                  { stage: '5. Align', desc: 'Opt-in goal sharing -> Manager sponsorship' },
                ].map((j) => (
                  <div key={j.stage} className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E5E4DF]">
                    <p className="font-semibold text-[#0F1E36]">{j.stage}</p>
                    <p className="mt-1 text-[#5B6472] leading-relaxed">{j.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 7. Information Architecture */}
          <section id="ia" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              07. Information Architecture
            </h2>
            <p className="text-sm text-[#374151] leading-relaxed">
              The architecture enforces strict role separation at the navigation root: Employee
              Workspace (private by default) and Manager Insights (aggregate &amp; opt-in only).
            </p>
            <Card padding="md" className="font-mono text-xs text-[#0F1E36] space-y-2 bg-[#FAF9F6]">
              <p>Same Platform</p>
              <p className="pl-4">├── Public Marketing &amp; Brand Assets</p>
              <p className="pl-4">├── Auth (Sign In / Create Account / Forgot Password)</p>
              <p className="pl-4">├── Employee Onboarding (5-Step Assessment &amp; Matching)</p>
              <p className="pl-4">├── Employee Workspace (Private Zone)</p>
              <p className="pl-8">├── Dashboard (Summary, Next Session, Active Goals, Matches)</p>
              <p className="pl-8">├── Find a Coach (Directory + Profile Detail)</p>
              <p className="pl-8">├── Sessions (Upcoming/Past + Reschedule/Cancel + Prep &amp; Reflection)</p>
              <p className="pl-8">└── Development Goals (Milestones + Per-Goal Share Toggle)</p>
              <p className="pl-4">└── Manager Insights (Aggregate + Opt-In Zone)</p>
              <p className="pl-8">├── Team Overview (KPIs, Quarterly Trends, Anonymized Themes)</p>
              <p className="pl-8">├── Shared Outcomes (Live Opt-In Employee Goals Only)</p>
              <p className="pl-8">└── Privacy Charter (Explicit Access Boundaries)</p>
            </Card>
          </section>

          {/* 8. Wireframe Descriptions */}
          <section id="wireframes" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              08. Wireframe Rationales
            </h2>
            <ul className="space-y-3 text-sm text-[#374151] leading-relaxed">
              <li>
                <strong>Dashboard 7/5 Asymmetric Split:</strong> Prioritizes the immediate next action
                (upcoming session prep + active goal progress) on the left 7 columns while keeping
                coach discovery and activity secondary on the right 5 columns.
              </li>
              <li>
                <strong>Coach Directory Filter Bar:</strong> Consolidates search, specialty,
                experience, availability, and rating into a single horizontal control strip above a
                clean 2-column card grid.
              </li>
              <li>
                <strong>Booking Rail Summary:</strong> Uses a persistent summary rail on desktop so
                date, time, format, and privacy guarantee remain anchored while editing the topic.
              </li>
            </ul>
          </section>

          {/* 9. Design Decisions & Rationale */}
          <section id="decisions" className="space-y-4 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              09. Key Design Decisions &amp; Rationale
            </h2>
            <div className="space-y-4">
              <Card padding="md" className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F1E36]">
                  <Lock className="w-4 h-4 text-[#0D7A68]" />
                  <span>Per-Goal Opt-In Sharing Instead of Binary Workspace Visibility</span>
                </div>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Rather than forcing employees to make their entire coaching profile either visible
                  or invisible, Same attaches a granular toggle to each individual Development Goal.
                  Employees can keep sensitive personal sustainability goals private while sharing
                  cross-functional goals so their manager can assign stretch projects.
                </p>
              </Card>
              <Card padding="md" className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F1E36]">
                  <ShieldCheck className="w-4 h-4 text-[#0D7A68]" />
                  <span>Calm Editorial Visual System Over Gamified Engagement Mechanics</span>
                </div>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Career coaching requires cognitive focus and emotional candor. We deliberately
                  rejected streak counters, confetti, and pill-badge clutter in favor of warm
                  off-white surfaces, restrained emerald-teal accents, and crisp typographic
                  hierarchy.
                </p>
              </Card>
            </div>
          </section>

          {/* 10. High-Fidelity UI Deep Links */}
          <section id="high-fi" className="space-y-4 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              10. High-Fidelity UI Explorer
            </h2>
            <p className="text-sm text-[#5B6472]">
              Jump directly to any implemented high-fidelity screen in the live prototype:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(
                [
                  { label: 'Employee Dashboard', role: 'employee', screen: 'dashboard' },
                  { label: 'Coach Directory', role: 'employee', screen: 'coaches' },
                  { label: 'Session Booking Flow', role: 'employee', screen: 'booking' },
                  { label: 'Session Prep & Notes', role: 'employee', screen: 'session-experience' },
                  { label: 'Development Goals', role: 'employee', screen: 'goals' },
                  { label: 'Manager Insights', role: 'manager', screen: 'manager-overview' },
                ] as Array<{ label: string; role: UserRole; screen: AppScreen }>
              ).map((item) => (
                <button
                  key={item.screen}
                  type="button"
                  onClick={() => onOpenPrototypeScreen(item.role, item.screen)}
                  className="p-4 rounded-xl bg-white border border-[#E5E4DF] hover:border-[#0D7A68] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-[#0F1E36]">{item.label}</span>
                  <ExternalLink className="w-4 h-4 text-[#0D7A68] shrink-0" />
                </button>
              ))}
            </div>
          </section>

          {/* 11. Design System */}
          <section id="design-system" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              11. Design System
            </h2>
            <p className="text-sm text-[#374151] leading-relaxed">
              Built on a 60-30-10 color palette (Warm Canvas `#FAF9F6`, Crisp Surface `#FFFFFF`,
              Deep Navy `#0F1E36`, and Teal Accent `#0D7A68`), paired with Plus Jakarta Sans, DM Sans,
              and JetBrains Mono tabular figures.
            </p>
            <Button variant="outline" size="sm" onClick={() => onNavigateTop('design-system')}>
              Open Live Design System Documentation
            </Button>
          </section>

          {/* 12. Responsive Design */}
          <section id="responsive" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              12. Responsive Design Strategy
            </h2>
            <p className="text-sm text-[#374151] leading-relaxed">
              Desktop (`1280px+`) uses a persistent 256px workspace sidebar and 12-column grids.
              Tablet and mobile breakpoints collapse the sidebar into an accessible slide-over
              drawer, stack booking summary rails below form steps, and preserve 40px+ touch targets.
            </p>
          </section>

          {/* 13. Prototype Walkthrough */}
          <section id="walkthrough" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              13. Interactive Prototype Walkthrough
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-[#374151] leading-relaxed">
              <li>
                Open <strong>Launch Prototype</strong> and select &ldquo;Start as Employee with
                Onboarding&rdquo; to complete the 5-step assessment.
              </li>
              <li>
                Book a session from a recommended coach or filter the Coach Directory.
              </li>
              <li>
                Open <strong>Session Prep &amp; Notes</strong>, write private notes, and promote an
                action item into a Development Goal.
              </li>
              <li>
                Toggle <strong>Shared with manager</strong> on any goal, then switch to{' '}
                <strong>Manager</strong> in the sidebar to verify live privacy-safe synchronization.
              </li>
            </ol>
          </section>

          {/* 14. Usability Testing Plan */}
          <section id="testing" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              14. Proposed Usability Testing Plan (Not Yet Executed)
            </h2>
            <Card padding="md" className="space-y-3 bg-[#FAF9F6]">
              <p className="text-xs font-semibold text-[#0F1E36]">
                Proposed Moderated Protocol (8–10 Employees, 5 Managers)
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#374151]">
                <li>
                  <strong>Task 1 (Comprehension):</strong> Complete onboarding and explain in your
                  own words what your manager can and cannot see.
                </li>
                <li>
                  <strong>Task 2 (Discovery):</strong> Find a coach with 10+ years of experience
                  available this week for Executive Presence and book a 45-minute video slot.
                </li>
                <li>
                  <strong>Task 3 (Boundary Control):</strong> Create a sensitive burnout-prevention
                  goal and ensure it remains hidden from management, while sharing a Q1 strategy goal.
                </li>
                <li>
                  <strong>Success Criteria to Validate:</strong> Zero confusion around privacy
                  defaults; &ge; 90% unassisted task completion on booking and goal sharing.
                </li>
              </ul>
            </Card>
          </section>

          {/* 15. Success Metrics */}
          <section id="metrics" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              15. Proposed Product Success Metrics
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#374151]">
              <li>Onboarding-to-first-session booking conversion within 7 days.</li>
              <li>Session preparation checklist completion rate prior to 1-on-1s.</li>
              <li>Repeat coaching cadence (percentage of employees completing 3+ sessions/quarter).</li>
              <li>Perceived psychological safety score in quarterly anonymous employee surveys.</li>
            </ul>
          </section>

          {/* 16. Future Improvements */}
          <section id="future" className="space-y-3 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              16. Future Improvements
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#374151]">
              <li>Two-way Google Calendar &amp; Outlook availability sync with timezone detection.</li>
              <li>Dedicated Coach Portal for viewing shared client prep summaries pre-session.</li>
              <li>HR Admin configuration for cohort minimum thresholds (configurable n &ge; 5 to 10).</li>
            </ul>
          </section>

          {/* 17. Technical & Deliverable Summary */}
          <section id="deliverable" className="space-y-4 pt-6 border-t border-[#E5E4DF] scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-[#0F1E36]">
              17. Project Architecture &amp; Deliverable Summary
            </h2>
            <Card padding="md" className="space-y-4 text-xs text-[#374151]">
              <div>
                <p className="font-semibold text-[#0F1E36]">Project Structure</p>
                <pre className="mt-2 p-3 rounded-lg bg-[#FAF9F6] border border-[#E5E4DF] font-mono overflow-x-auto">
{`src/
├── types/elevate.ts           # Domain models (Coach, Session, Goal, Onboarding)
├── data/mockData.ts           # Local seed data & aggregate metrics
├── lib/utils.ts               # Classname & formatting helpers
├── components/ui/index.tsx    # Reusable Design System primitives
├── components/layout/         # TopNav (3-zone) & WorkspaceShell (sidebar)
├── components/auth/           # Sign In, Create Account, Forgot Password
├── components/onboarding/     # 5-step Assessment & Coach Matching
├── components/app/            # Employee Dashboard, Coach Directory & Profile,
│                              # Session Booking, Sessions, Session Experience,
│                              # Development Goals, Manager Insights
├── components/design-system/  # Live Design System documentation
├── components/marketing/      # B2B Landing Page & 3 Creative Artboards
└── components/case-study/     # 16-section UX Case Study`}
                </pre>
              </div>
              <div>
                <p className="font-semibold text-[#0F1E36]">Setup &amp; Local Run Instructions</p>
                <p className="mt-1 font-mono bg-[#FAF9F6] p-2.5 rounded-lg border border-[#E5E4DF]">
                  npm install &amp;&amp; npm run dev
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="primary" size="sm" onClick={() => onOpenPrototypeScreen('employee', 'dashboard')}>
                  <span>Open Employee Prototype</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onOpenPrototypeScreen('manager', 'manager-overview')}>
                  Open Manager Insights
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
