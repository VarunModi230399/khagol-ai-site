import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ServiceSectionKey } from '../../types/planet'
import {
  CAPABILITY_CARDS,
  FAQ_ITEMS,
  OWNER_NAME,
  PROCESS_STEPS,
  PROJECT_HIGHLIGHTS,
  SERVICES_OVERVIEW,
  TESTIMONIALS,
  WHY_KHAGOL
} from '../../config/siteContent'

interface HomeContentSectionsProps {
  onOpenService(section: ServiceSectionKey): void
}

function SectionShell({
  id,
  eyebrow,
  title,
  accent,
  children
}: {
  id?: string
  eyebrow: string
  title: string
  accent: string
  children: ReactNode
}) {
  return (
    <section id={id} style={sectionShellStyle}>
      <div
        style={{
          ...sectionPanelStyle,
          borderColor: `${accent}26`,
          boxShadow: `0 28px 80px rgba(2,6,23,0.42), inset 0 0 60px ${accent}12`
        }}
      >
        <p style={{ ...eyebrowStyle, color: accent }}>{eyebrow}</p>
        <h2 style={titleStyle}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

export function HomeContentSections({ onOpenService }: HomeContentSectionsProps) {
  return (
    <main
      style={{
        position: 'relative',
        zIndex: 8,
        background:
          'linear-gradient(180deg, rgba(2,6,23,0.02) 0%, rgba(2,6,23,0.96) 10%, #020617 100%)',
        borderTop: '1px solid rgba(148,163,184,0.15)',
        overflow: 'hidden'
      }}
    >
      <SectionShell
        id="about-section"
        eyebrow="Studio"
        title="About KHAGOL AI"
        accent="#8dd8ff"
      >
        <p style={bodyStyle}>
          KHAGOL AI is a premium AI studio focused on turning strategic ambition into
          production systems. We combine executive-level clarity with technical depth to
          design solutions that perform in real operating environments.
        </p>
        <p style={{ ...bodyStyle, marginTop: 12 }}>
          Founder: {OWNER_NAME}
        </p>
      </SectionShell>

      <SectionShell
        id="services-section"
        eyebrow="Service Worlds"
        title="Services Overview"
        accent="#67e8f9"
      >
        <div style={gridStyle}>
          {SERVICES_OVERVIEW.map((service) => (
            <article
              key={service.key}
              style={{
                ...cardStyle,
                border: `1px solid ${service.accent}55`,
                boxShadow: `inset 0 0 40px ${service.accent}18`
              }}
            >
              <h3 style={cardTitleStyle}>{service.title}</h3>
              <p style={cardBodyStyle}>{service.summary}</p>
              <Link
                style={cardButtonStyle}
                to={service.href}
                onClick={() => onOpenService(service.key)}
              >
                Open {service.title} →
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="process-section"
        eyebrow="Method"
        title="How We Work"
        accent="#f59e0b"
      >
        <div style={gridStyle}>
          {PROCESS_STEPS.map((step, index) => (
            <article key={step.title} style={cardStyle}>
              <p style={stepNumberStyle}>0{index + 1}</p>
              <h3 style={cardTitleStyle}>{step.title}</h3>
              <p style={cardBodyStyle}>{step.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="capabilities-section"
        eyebrow="Capability"
        title="Featured Solutions"
        accent="#c084fc"
      >
        <div style={gridStyle}>
          {CAPABILITY_CARDS.map((capability) => (
            <article key={capability.title} style={cardStyle}>
              <h3 style={cardTitleStyle}>{capability.title}</h3>
              <p style={cardBodyStyle}>{capability.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="why-section" eyebrow="Value" title="Why Choose Us" accent="#7dd3fc">
        <div style={gridStyle}>
          {WHY_KHAGOL.map((item) => (
            <article key={item} style={cardStyle}>
              <p style={cardBodyStyle}>{item}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="founder-section"
        eyebrow="Leadership"
        title="Founder"
        accent="#fbbf24"
      >
        <article style={{ ...cardStyle, maxWidth: 720 }}>
          <h3 style={cardTitleStyle}>{OWNER_NAME}</h3>
          <p style={cardBodyStyle}>
            Founder and principal consultant guiding strategy, delivery quality, and
            execution outcomes across KHAGOL AI engagements.
          </p>
        </article>
      </SectionShell>

      <SectionShell
        id="projects-section"
        eyebrow="Projects"
        title="Archive Nebula"
        accent="#f472b6"
      >
        <div style={gridStyle}>
          {PROJECT_HIGHLIGHTS.map((item) => (
            <article key={item.title} style={cardStyle}>
              <h3 style={cardTitleStyle}>{item.title}</h3>
              <p style={cardBodyStyle}>{item.description}</p>
              <Link style={cardButtonStyle} to="/projects">
                Open Projects →
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="testimonials-section"
        eyebrow="Social Proof"
        title="What Clients Say"
        accent="#93c5fd"
      >
        <div style={gridStyle}>
          {TESTIMONIALS.map((item) => (
            <article key={item.person} style={cardStyle}>
              <p style={cardBodyStyle}>“{item.quote}”</p>
              <p style={quoteAuthorStyle}>{item.person}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="faq-section"
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        accent="#a7f3d0"
      >
        <div style={{ display: 'grid', gap: 12 }}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} style={faqItemStyle}>
              <summary style={faqQuestionStyle}>{item.question}</summary>
              <p style={faqAnswerStyle}>{item.answer}</p>
            </details>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="contact-section"
        eyebrow="Contact"
        title="Let’s Build Your Next Intelligence System"
        accent="#67e8f9"
      >
        <p style={bodyStyle}>
          Consultation CTA placeholder: share your scope, priorities, and timeline to start
          a focused strategy conversation.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
          <Link to="/contact" style={ctaLinkStyle}>
            Contact Page
          </Link>
          <a href="mailto:hello@khagol.ai" style={ctaLinkStyle}>
            hello@khagol.ai
          </a>
          <a href="#" style={ctaLinkStyle}>
            LinkedIn Placeholder
          </a>
        </div>
      </SectionShell>

      <footer style={footerStyle}>
        <div style={footerLinksStyle}>
          <a href="#hero-top" style={footerLinkStyle}>
            Home
          </a>
          <a href="#services-section" style={footerLinkStyle}>
            Services
          </a>
          <a href="#projects-section" style={footerLinkStyle}>
            Projects
          </a>
          <a href="#about-section" style={footerLinkStyle}>
            About
          </a>
          <Link to="/contact" style={footerLinkStyle}>
            Contact
          </Link>
          <a href="#" style={footerLinkStyle}>
            Privacy
          </a>
          <a href="#" style={footerLinkStyle}>
            Terms
          </a>
          <a href="#" style={footerLinkStyle}>
            LinkedIn
          </a>
          <a href="mailto:hello@khagol.ai" style={footerLinkStyle}>
            hello@khagol.ai
          </a>
        </div>
        <p style={footerCopyStyle}>© {new Date().getFullYear()} KHAGOL AI. All rights reserved.</p>
      </footer>
    </main>
  )
}

const sectionShellStyle: CSSProperties = {
  width: 'min(1120px, 92vw)',
  margin: '0 auto',
  padding: '88px 0 10px'
}

const sectionPanelStyle: CSSProperties = {
  position: 'relative',
  borderRadius: 34,
  border: '1px solid rgba(148,163,184,0.14)',
  background:
    'linear-gradient(160deg, rgba(7,13,27,0.68), rgba(2,6,23,0.88)), radial-gradient(circle at top left, rgba(103,232,249,0.08), transparent 36%)',
  boxShadow: '0 28px 80px rgba(2,6,23,0.42), inset 0 0 60px rgba(103,232,249,0.06)',
  padding: 'clamp(22px, 4vw, 34px)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)'
}

const eyebrowStyle: CSSProperties = {
  margin: 0,
  color: '#93c5fd',
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  fontSize: 12
}

const titleStyle: CSSProperties = {
  margin: '10px 0 22px',
  color: '#f8fafc',
  fontSize: 'clamp(30px, 5vw, 48px)',
  fontWeight: 500,
  letterSpacing: '-0.03em'
}

const bodyStyle: CSSProperties = {
  margin: 0,
  maxWidth: 780,
  fontSize: 16,
  lineHeight: 1.8,
  color: '#dbe6ff'
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
}

const cardStyle: CSSProperties = {
  borderRadius: 22,
  border: '1px solid rgba(148,163,184,0.24)',
  background:
    'linear-gradient(150deg, rgba(8,15,31,0.72), rgba(2,6,23,0.92)), radial-gradient(circle at top left, rgba(125,211,252,0.08), transparent 42%)',
  boxShadow: '0 18px 40px rgba(2,6,23,0.45), inset 0 0 36px rgba(125,211,252,0.05)',
  padding: '18px 18px 20px',
  transform: 'translateY(0)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
}

const cardTitleStyle: CSSProperties = {
  margin: 0,
  color: '#f1f5f9',
  fontSize: 18,
  fontWeight: 500
}

const cardBodyStyle: CSSProperties = {
  margin: '10px 0 0',
  color: '#cbd5e1',
  lineHeight: 1.7,
  fontSize: 14
}

const cardButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  marginTop: 16,
  border: '1px solid rgba(148,163,184,0.45)',
  borderRadius: 999,
  background: 'rgba(15,23,42,0.7)',
  color: '#e2e8f0',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  padding: '9px 12px'
}

const stepNumberStyle: CSSProperties = {
  margin: 0,
  color: '#7dd3fc',
  fontSize: 12,
  letterSpacing: '0.12em'
}

const quoteAuthorStyle: CSSProperties = {
  margin: '12px 0 0',
  color: '#93c5fd',
  fontSize: 12,
  letterSpacing: '0.1em',
  textTransform: 'uppercase'
}

const faqItemStyle: CSSProperties = {
  borderRadius: 16,
  border: '1px solid rgba(148,163,184,0.24)',
  background:
    'linear-gradient(150deg, rgba(8,15,31,0.72), rgba(2,6,23,0.9)), radial-gradient(circle at top left, rgba(196,181,253,0.08), transparent 42%)',
  padding: '12px 14px'
}

const faqQuestionStyle: CSSProperties = {
  cursor: 'pointer',
  color: '#f8fafc',
  listStyle: 'none',
  fontSize: 15,
  fontWeight: 500
}

const faqAnswerStyle: CSSProperties = {
  margin: '10px 0 0',
  color: '#cbd5e1',
  fontSize: 14,
  lineHeight: 1.7
}

const ctaLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '10px 14px',
  borderRadius: 999,
  border: '1px solid rgba(148,163,184,0.45)',
  textDecoration: 'none',
  color: '#dbeafe',
  fontSize: 13,
  letterSpacing: '0.08em',
  textTransform: 'uppercase'
}

const footerStyle: CSSProperties = {
  width: 'min(1120px, 92vw)',
  margin: '0 auto',
  padding: '52px 0 64px',
  borderTop: '1px solid rgba(148,163,184,0.2)',
  display: 'grid',
  gap: 16
}

const footerLinksStyle: CSSProperties = {
  display: 'flex',
  gap: 14,
  flexWrap: 'wrap'
}

const footerLinkStyle: CSSProperties = {
  color: '#94a3b8',
  textDecoration: 'none',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.1em'
}

const footerCopyStyle: CSSProperties = {
  margin: 0,
  color: '#64748b',
  fontSize: 12
}
