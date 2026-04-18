// ── AI AGENTS PAGE ────────────────────────────────────────────────────────────
// Dedicated page for /services/agents — showcases the AI Agents fleet with
// Family Admin Agent as the first live agent and upcoming agents teased below.

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { SolarSystemCanvas } from '../components/3D/SolarSystemCanvas'

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)

// ── Agent fleet config — add new agents here as they launch ──────────────────
const AGENTS = [
  {
    id: 'family-admin',
    status: 'live' as const,
    tag: 'Agent 001',
    name: 'Family Admin Agent',
    tagline: 'Your household, running itself.',
    description:
      'Hearth is a conversational AI agent that manages your family\'s schedule, tracks tasks, coordinates reminders, and handles the daily logistics that drain your time. It connects your calendar, to-do lists, and family members into one intelligent system.',
    capabilities: [
      'Household schedule coordination across all family members',
      'Smart reminders for appointments, pickups, and events',
      'Task delegation and follow-up tracking',
      'Grocery lists, meal planning, and routine automation',
      'Natural conversation — just talk, it handles the rest',
    ],
    accent: '#fbbf24',
    href: 'https://hearth.khagol.de',
    ctaLabel: 'Launch Hearth →',
  },
  {
    id: 'email-auto',
    status: 'coming' as const,
    tag: 'Agent 002',
    name: 'Email Automation Agent',
    tagline: 'Inbox zero, handled autonomously.',
    description:
      'An AI agent that reads, triages, drafts, and follows up on your emails — so you spend time on decisions, not inbox management.',
    capabilities: [
      'Intelligent inbox triage and priority sorting',
      'Auto-drafted replies in your tone and style',
      'Follow-up scheduling and nudge reminders',
      'Meeting request parsing and calendar sync',
    ],
    accent: '#67e8f9',
    href: null,
    ctaLabel: 'Join Waitlist',
  },
  {
    id: 'more',
    status: 'soon' as const,
    tag: 'Coming Next',
    name: 'More Agents',
    tagline: 'The fleet is expanding.',
    description:
      'KHAGOL AI is actively building agents for personal finance, business operations, customer support, and more. Each agent is purpose-built, tested in real environments, and designed for daily use.',
    capabilities: [
      'Personal finance & expense tracking agent',
      'Customer support automation agent',
      'Business operations & reporting agent',
      'Custom agents for enterprise workflows',
    ],
    accent: '#a78bfa',
    href: null,
    ctaLabel: 'Stay Tuned',
  },
]

export function AgentsPage() {
  const [sceneProgress, setSceneProgress] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const updateProgress = () => {
      const total = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      setSceneProgress(clamp(window.scrollY / total))
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div style={pageStyle}>
      {/* 3D background */}
      <div style={fixedStageStyle}>
        <SolarSystemCanvas progress={sceneProgress} variant="ambient" theme="agents" />
        <div style={ambientLayerStyle} />
      </div>

      <div style={contentWrapStyle}>

        {/* ── Nav pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link style={pillLinkStyle} to="/">← Back to Cosmos</Link>
          <a style={{ ...pillLinkStyle, borderColor: 'rgba(251,191,36,0.5)', color: '#fef3c7' }}
            href="https://hearth.khagol.de" target="_blank" rel="noopener noreferrer">
            Launch Hearth ↗
          </a>
        </div>

        {/* ── Hero */}
        <header style={heroBlockStyle}>
          <p style={heroKickerStyle}>Agent Fleet · KHAGOL AI</p>
          <h1 style={heroTitleStyle}>AI Agents</h1>
          <p style={heroIntroStyle}>
            Purpose-built autonomous agents for real-world tasks — deployed, tested, and designed for daily use.
          </p>
          <p style={heroBodyStyle}>
            Each KHAGOL agent handles a specific domain of your life or business with precision. No general-purpose chatbots. Every agent is scoped, reliable, and built to run in the background so you don't have to think about it.
          </p>
          <div style={statsRowStyle}>
            <div style={statItemStyle}>
              <span style={{ ...statNumberStyle, color: '#fbbf24' }}>1</span>
              <span style={statLabelStyle}>Live Agent</span>
            </div>
            <div style={statDividerStyle} />
            <div style={statItemStyle}>
              <span style={{ ...statNumberStyle, color: '#67e8f9' }}>2+</span>
              <span style={statLabelStyle}>In Development</span>
            </div>
            <div style={statDividerStyle} />
            <div style={statItemStyle}>
              <span style={{ ...statNumberStyle, color: '#a78bfa' }}>∞</span>
              <span style={statLabelStyle}>Planned Agents</span>
            </div>
          </div>
        </header>

        {/* ── Agent cards */}
        {AGENTS.map((agent) => (
          <article
            key={agent.id}
            style={{
              ...agentCardStyle,
              borderColor: agent.status === 'live'
                ? `${agent.accent}55`
                : 'rgba(148,163,184,0.18)',
              boxShadow: agent.status === 'live'
                ? `0 24px 64px rgba(15,23,42,0.4), inset 0 0 40px ${agent.accent}12`
                : '0 16px 40px rgba(15,23,42,0.3)',
            }}
          >
            {/* Card header */}
            <div style={agentCardHeaderStyle}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <p style={{ ...agentTagStyle, color: agent.accent }}>{agent.tag}</p>
                  {agent.status === 'live' && (
                    <span style={liveBadgeStyle}>
                      <span style={liveDotStyle} />
                      Live
                    </span>
                  )}
                  {agent.status === 'coming' && (
                    <span style={comingBadgeStyle}>Coming Soon</span>
                  )}
                  {agent.status === 'soon' && (
                    <span style={comingBadgeStyle}>Roadmap</span>
                  )}
                </div>
                <h2 style={{ ...agentNameStyle, color: agent.status === 'live' ? '#f8fafc' : '#94a3b8' }}>
                  {agent.name}
                </h2>
                <p style={{ ...agentTaglineStyle, color: agent.accent }}>{agent.tagline}</p>
              </div>
            </div>

            {/* Description */}
            <p style={agentDescStyle}>{agent.description}</p>

            {/* Capabilities grid */}
            <div style={capabilitiesGridStyle}>
              {agent.capabilities.map((cap) => (
                <div key={cap} style={capabilityItemStyle}>
                  <span style={{ ...capDotStyle, background: agent.accent }} />
                  <span style={capTextStyle}>{cap}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 24 }}>
              {agent.status === 'live' && agent.href ? (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <a
                    href={agent.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...ctaButtonStyle,
                      background: `linear-gradient(135deg, ${agent.accent}22, ${agent.accent}10)`,
                      borderColor: `${agent.accent}66`,
                      color: agent.accent,
                      boxShadow: `0 0 24px ${agent.accent}22`,
                    }}
                  >
                    {agent.ctaLabel}
                  </a>
                  <span style={ctaHintStyle}>Free to try · No credit card required</span>
                </div>
              ) : agent.status === 'coming' ? (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <a
                    href="mailto:hello@khagol.ai?subject=Email Agent Waitlist"
                    style={{
                      ...ctaButtonStyle,
                      borderColor: `${agent.accent}44`,
                      color: agent.accent,
                    }}
                  >
                    {agent.ctaLabel}
                  </a>
                  <span style={ctaHintStyle}>Be first to know when it launches</span>
                </div>
              ) : (
                <p style={ctaHintStyle}>More agents announced soon — follow our progress.</p>
              )}
            </div>
          </article>
        ))}

        {/* ── How agents work section */}
        <section style={howSectionStyle}>
          <h2 style={sectionTitleStyle}>How KHAGOL Agents Work</h2>
          <div style={howGridStyle}>
            {[
              { step: '01', title: 'Scoped by design', body: 'Each agent handles one domain deeply — not everything poorly. Scope keeps agents fast, reliable, and trustworthy.' },
              { step: '02', title: 'Runs in the background', body: 'Agents work autonomously once set up. You interact when needed; they handle the rest without constant prompting.' },
              { step: '03', title: 'Built for real use', body: 'Every agent is tested in real household and business environments before launch. No demo-only features.' },
              { step: '04', title: 'Expands over time', body: 'Agents learn your patterns and improve. The more you use them, the more precisely they operate.' },
            ].map((item) => (
              <article key={item.step} style={howCardStyle}>
                <p style={howStepStyle}>{item.step}</p>
                <h3 style={howTitleStyle}>{item.title}</h3>
                <p style={howBodyStyle}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA */}
        <section style={bottomCtaStyle}>
          <p style={heroKickerStyle}>Start Now</p>
          <h2 style={{ ...sectionTitleStyle, fontSize: 'clamp(22px, 4vw, 36px)', marginTop: 10 }}>
            Deploy your first agent today
          </h2>
          <p style={heroBodyStyle}>
            Hearth is live and free to try. Set it up in minutes and let it start managing your household logistics.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            <a
              href="https://hearth.khagol.de"
              target="_blank"
              rel="noopener noreferrer"
              style={bottomCtaButtonStyle}
            >
              Launch Family Admin Agent →
            </a>
            <Link to="/" style={pillLinkStyle}>Explore Other Services</Link>
          </div>
        </section>

      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  position: 'relative',
  padding: 'min(6vh, 56px) min(6vw, 66px)',
  background: 'radial-gradient(ellipse at top, #0d1a0a 0%, #020617 76%)',
  color: '#e2e8f0',
  fontFamily: 'Sora, Inter, -apple-system, sans-serif',
}

const fixedStageStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
}

const ambientLayerStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  background:
    'radial-gradient(circle at 14% 18%, rgba(251,191,36,0.08), transparent 28%), radial-gradient(circle at 86% 20%, rgba(253,230,138,0.06), transparent 24%)',
  filter: 'blur(6px)',
}

const contentWrapStyle: CSSProperties = {
  width: 'min(1080px, 100%)',
  margin: '0 auto',
  display: 'grid',
  gap: 24,
  position: 'relative',
  zIndex: 2,
}

const heroBlockStyle: CSSProperties = {
  borderRadius: 28,
  border: '1px solid rgba(251,191,36,0.22)',
  background:
    'linear-gradient(160deg, rgba(9,17,34,0.72), rgba(3,7,20,0.82)), radial-gradient(circle at top left, rgba(251,191,36,0.1), transparent 34%)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  boxShadow: '0 30px 90px rgba(2,6,23,0.5), inset 0 0 50px rgba(251,191,36,0.04)',
  padding: 'clamp(20px, 4vw, 38px)',
}

const heroKickerStyle: CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#fbbf24',
}

const heroTitleStyle: CSSProperties = {
  fontSize: 'clamp(36px, 7vw, 68px)',
  marginTop: 12,
  marginBottom: 10,
  color: '#fef9e7',
  letterSpacing: '-0.03em',
  fontWeight: 500,
}

const heroIntroStyle: CSSProperties = {
  margin: 0,
  color: '#fef3c7',
  fontSize: 18,
  lineHeight: 1.65,
}

const heroBodyStyle: CSSProperties = {
  margin: '12px 0 0',
  color: '#94a3b8',
  fontSize: 15,
  lineHeight: 1.8,
  maxWidth: 780,
}

const statsRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  marginTop: 28,
  flexWrap: 'wrap',
}

const statItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

const statNumberStyle: CSSProperties = {
  fontSize: 32,
  fontWeight: 600,
  letterSpacing: '-0.04em',
  lineHeight: 1,
}

const statLabelStyle: CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#64748b',
}

const statDividerStyle: CSSProperties = {
  width: 1,
  height: 36,
  background: 'rgba(148,163,184,0.2)',
}

const agentCardStyle: CSSProperties = {
  borderRadius: 24,
  border: '1px solid',
  background:
    'linear-gradient(150deg, rgba(10,18,36,0.72), rgba(4,9,24,0.86))',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  padding: 'clamp(20px, 3vw, 32px)',
}

const agentCardHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 16,
}

const agentTagStyle: CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
}

const liveBadgeStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  borderRadius: 999,
  border: '1px solid rgba(74,222,128,0.4)',
  background: 'rgba(74,222,128,0.1)',
  color: '#4ade80',
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '3px 10px',
}

const liveDotStyle: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: 999,
  background: '#4ade80',
  boxShadow: '0 0 6px #4ade80',
}

const comingBadgeStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  border: '1px solid rgba(148,163,184,0.3)',
  background: 'rgba(148,163,184,0.08)',
  color: '#94a3b8',
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '3px 10px',
}

const agentNameStyle: CSSProperties = {
  fontSize: 'clamp(24px, 4vw, 38px)',
  fontWeight: 500,
  letterSpacing: '-0.025em',
  margin: '8px 0 0',
}

const agentTaglineStyle: CSSProperties = {
  margin: '6px 0 0',
  fontSize: 14,
  letterSpacing: '0.06em',
  fontStyle: 'italic',
}

const agentDescStyle: CSSProperties = {
  margin: '0 0 20px',
  color: '#94a3b8',
  fontSize: 15,
  lineHeight: 1.8,
  maxWidth: 820,
}

const capabilitiesGridStyle: CSSProperties = {
  display: 'grid',
  gap: 10,
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
}

const capabilityItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  borderRadius: 12,
  border: '1px solid rgba(148,163,184,0.14)',
  background: 'rgba(15,23,42,0.4)',
  padding: '10px 14px',
}

const capDotStyle: CSSProperties = {
  width: 7,
  height: 7,
  borderRadius: 999,
  flexShrink: 0,
  marginTop: 5,
}

const capTextStyle: CSSProperties = {
  color: '#cbd5e1',
  fontSize: 13,
  lineHeight: 1.6,
}

const ctaButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  borderRadius: 999,
  border: '1px solid',
  fontSize: 13,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '11px 20px',
  fontWeight: 500,
  cursor: 'pointer',
}

const ctaHintStyle: CSSProperties = {
  color: '#475569',
  fontSize: 12,
  letterSpacing: '0.06em',
}

const howSectionStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
}

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  color: '#f8fafc',
  fontSize: 'clamp(20px, 3.5vw, 30px)',
  letterSpacing: '-0.02em',
  fontWeight: 500,
}

const howGridStyle: CSSProperties = {
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
}

const howCardStyle: CSSProperties = {
  borderRadius: 18,
  border: '1px solid rgba(148,163,184,0.18)',
  background: 'linear-gradient(150deg, rgba(10,18,36,0.6), rgba(4,9,24,0.76))',
  padding: '18px 18px 20px',
}

const howStepStyle: CSSProperties = {
  margin: 0,
  color: '#fbbf24',
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
}

const howTitleStyle: CSSProperties = {
  margin: '8px 0 6px',
  color: '#e2e8f0',
  fontSize: 16,
  fontWeight: 500,
}

const howBodyStyle: CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: 13,
  lineHeight: 1.7,
}

const bottomCtaStyle: CSSProperties = {
  borderRadius: 24,
  border: '1px solid rgba(251,191,36,0.2)',
  background:
    'linear-gradient(160deg, rgba(9,17,34,0.72), rgba(3,7,20,0.82)), radial-gradient(circle at bottom right, rgba(251,191,36,0.08), transparent 40%)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  padding: 'clamp(24px, 4vw, 40px)',
  marginBottom: 0,
}

const bottomCtaButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  borderRadius: 999,
  border: '1px solid rgba(251,191,36,0.55)',
  background: 'linear-gradient(135deg, rgba(251,191,36,0.18), rgba(251,191,36,0.08))',
  color: '#fbbf24',
  fontSize: 13,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '12px 22px',
  fontWeight: 500,
  boxShadow: '0 0 28px rgba(251,191,36,0.18)',
}

const pillLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  borderRadius: 999,
  border: '1px solid rgba(148,163,184,0.45)',
  color: '#dbeafe',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  padding: '9px 12px',
  background: 'rgba(15,23,42,0.6)',
}
