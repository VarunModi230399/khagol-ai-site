import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  CAPABILITY_CARDS,
  OWNER_NAME,
  PROCESS_STEPS,
  PROJECT_HIGHLIGHTS,
  SERVICES_OVERVIEW,
  WHY_KHAGOL
} from '../../config/siteContent'

function SceneSection({
  id,
  kicker,
  title,
  panel,
  align = 'left',
  children
}: {
  id: string
  kicker: string
  title: string
  panel: 'pearl' | 'aurora' | 'lavender' | 'signal'
  align?: 'left' | 'right'
  children: ReactNode
}) {
  return (
    <section
      id={id}
      style={{
        ...sceneSectionStyle,
        justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
      }}
    >
      <div
        style={{
          ...scenePanelStyle,
          ...panelThemes[panel]
        }}
      >
        <p style={{ ...sceneKickerStyle, color: panelThemes[panel].accentColor }}>{kicker}</p>
        <h2 style={sceneTitleStyle}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

export function HomeContentSections() {
  return (
    <main
      style={{
        position: 'relative',
        zIndex: 8,
        overflow: 'hidden',
        paddingBottom: 44
      }}
    >
      <SceneSection
        id="about-section"
        kicker="About"
        title="A focused AI partner for real delivery"
        panel="pearl"
        align="right"
      >
        <p style={bodyStyle}>
          KHAGOL AI turns strategy, machine learning, data, and automation into a connected
          intelligence field. The platform is designed so every orbiting capability remains
          part of one coherent operating universe.
        </p>
        <div style={inlineGridStyle}>
          {WHY_KHAGOL.slice(0, 2).map((item) => (
            <article key={item} style={microCardStyle}>
              <p style={microCardBodyStyle}>{item}</p>
            </article>
          ))}
        </div>
      </SceneSection>

      <SceneSection
        id="services-section"
        kicker="Services"
        title="Four service areas, one execution model"
        panel="aurora"
        align="left"
      >
        <p style={bodyStyle}>
          The service worlds stay visible while the content shifts around them. Each service
          keeps its own identity, but all four converge on the same execution engine.
        </p>
        <div style={serviceOrbitGridStyle}>
          {SERVICES_OVERVIEW.map((service) => (
            <Link
              key={service.key}
              to={service.href}
              style={{
                ...serviceOrbitCardStyle,
                borderColor: `${service.accent}55`,
                boxShadow: `0 18px 36px rgba(15,23,42,0.14), inset 0 0 28px ${service.accent}20`
              }}
            >
              <p style={{ ...sceneKickerStyle, color: service.accent, marginBottom: 8 }}>
                {service.title}
              </p>
              <p style={serviceOrbitBodyStyle}>{service.summary}</p>
              <span style={orbitLinkStyle}>Open service →</span>
            </Link>
          ))}
        </div>
      </SceneSection>

      <SceneSection
        id="capabilities-section"
        kicker="Capabilities"
        title="How we plan, build, and improve systems"
        panel="lavender"
        align="right"
      >
        <p style={bodyStyle}>
          Behind the visual system is a practical delivery model: clear process, strong
          platform foundations, and execution patterns designed for real business
          environments.
        </p>
        <div style={splitColumnStyle}>
          <div style={stackStyle}>
            {PROCESS_STEPS.slice(0, 3).map((step, index) => (
              <article key={step.title} style={stackCardStyle}>
                <p style={stackIndexStyle}>0{index + 1}</p>
                <h3 style={stackTitleStyle}>{step.title}</h3>
                <p style={stackBodyStyle}>{step.description}</p>
              </article>
            ))}
          </div>
          <div style={stackStyle}>
            {CAPABILITY_CARDS.slice(0, 3).map((item) => (
              <article key={item.title} style={stackCardStyle}>
                <h3 style={stackTitleStyle}>{item.title}</h3>
                <p style={stackBodyStyle}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </SceneSection>

      <SceneSection
        id="projects-section"
        kicker="Projects"
        title="Examples, proof points, and future case studies"
        panel="signal"
        align="left"
      >
        <p style={bodyStyle}>
          This section is ready for selected work, flagship launches, and delivery stories.
          The presentation stays clear and structured while the background keeps the site
          visually alive.
        </p>
        <div style={inlineGridStyle}>
          {PROJECT_HIGHLIGHTS.map((item) => (
            <article key={item.title} style={microCardStyle}>
              <h3 style={microCardTitleStyle}>{item.title}</h3>
              <p style={microCardBodyStyle}>{item.description}</p>
            </article>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
          <Link to="/projects" style={ctaLinkStyle}>
            View Projects
          </Link>
          <Link to="/contact" style={ctaLinkStyle}>
            Contact KHAGOL AI
          </Link>
        </div>
      </SceneSection>

      <section id="contact-section" style={footerSceneStyle}>
        <div style={{ ...scenePanelStyle, ...panelThemes.signal, maxWidth: 720 }}>
          <p style={{ ...sceneKickerStyle, color: panelThemes.signal.accentColor }}>Contact</p>
          <h2 style={sceneTitleStyle}>Start a conversation</h2>
          <p style={bodyStyle}>
            Founder: {OWNER_NAME}. Use this section for strategy conversations, product
            exploration, or system design inquiries.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
            <a href="mailto:hello@khagol.ai" style={ctaLinkStyle}>
              hello@khagol.ai
            </a>
            <Link to="/contact" style={ctaLinkStyle}>
              Open Contact Page
            </Link>
          </div>
        </div>
      </section>

      <footer style={siteFooterStyle}>
        <div style={siteFooterInnerStyle}>
          <div style={siteFooterBrandStyle}>
            <p style={siteFooterTitleStyle}>KHAGOL AI</p>
            <p style={siteFooterBodyStyle}>
              Strategy, machine learning, data, and automation systems built with a
              premium product mindset.
            </p>
          </div>

          <div style={siteFooterLinksWrapStyle}>
            <a href="#hero-top" style={siteFooterLinkStyle}>
              Home
            </a>
            <a href="#about-section" style={siteFooterLinkStyle}>
              About
            </a>
            <a href="#services-section" style={siteFooterLinkStyle}>
              Services
            </a>
            <a href="#projects-section" style={siteFooterLinkStyle}>
              Projects
            </a>
            <Link to="/contact" style={siteFooterLinkStyle}>
              Contact
            </Link>
            <a href="mailto:hello@khagol.ai" style={siteFooterLinkStyle}>
              hello@khagol.ai
            </a>
          </div>
        </div>

        <div style={siteFooterBottomStyle}>
          <span style={siteFooterMetaStyle}>© {new Date().getFullYear()} KHAGOL AI</span>
          <div style={siteFooterMetaLinksStyle}>
            <a href="#" style={siteFooterMetaLinkStyle}>
              Privacy
            </a>
            <a href="#" style={siteFooterMetaLinkStyle}>
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

const sceneSectionStyle: CSSProperties = {
  width: 'min(1180px, 94vw)',
  minHeight: '96vh',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  padding: '64px 0'
}

const scenePanelStyle: CSSProperties = {
  width: 'min(560px, 92vw)',
  borderRadius: 30,
  padding: 'clamp(22px, 4vw, 34px)',
  border: '1px solid rgba(148, 163, 184, 0.28)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  boxShadow: '0 26px 70px rgba(2, 6, 23, 0.28), inset 0 0 36px rgba(125, 211, 252, 0.05)'
}

const panelThemes = {
  pearl: {
    background:
      'linear-gradient(160deg, rgba(9, 17, 34, 0.62), rgba(3, 7, 20, 0.72)), radial-gradient(circle at top left, rgba(96, 165, 250, 0.12), transparent 42%)',
    accentColor: '#7dd3fc'
  },
  aurora: {
    background:
      'linear-gradient(160deg, rgba(9, 17, 34, 0.62), rgba(3, 7, 20, 0.72)), radial-gradient(circle at top left, rgba(103, 232, 249, 0.15), transparent 38%), radial-gradient(circle at bottom right, rgba(196, 181, 253, 0.12), transparent 34%)',
    accentColor: '#60a5fa'
  },
  lavender: {
    background:
      'linear-gradient(160deg, rgba(9, 17, 34, 0.62), rgba(3, 7, 20, 0.72)), radial-gradient(circle at top left, rgba(196, 181, 253, 0.15), transparent 38%), radial-gradient(circle at bottom right, rgba(125, 211, 252, 0.1), transparent 34%)',
    accentColor: '#a78bfa'
  },
  signal: {
    background:
      'linear-gradient(160deg, rgba(9, 17, 34, 0.62), rgba(3, 7, 20, 0.72)), radial-gradient(circle at top left, rgba(251, 191, 36, 0.1), transparent 32%), radial-gradient(circle at bottom right, rgba(103, 232, 249, 0.12), transparent 34%)',
    accentColor: '#f59e0b'
  }
} as const

const sceneKickerStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase'
}

const sceneTitleStyle: CSSProperties = {
  margin: '10px 0 18px',
  color: '#f8fafc',
  fontSize: 'clamp(32px, 5vw, 54px)',
  lineHeight: 0.98,
  letterSpacing: '-0.04em',
  fontWeight: 500
}

const bodyStyle: CSSProperties = {
  margin: 0,
  color: '#dbe6ff',
  fontSize: 15,
  lineHeight: 1.8
}

const inlineGridStyle: CSSProperties = {
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  marginTop: 18
}

const microCardStyle: CSSProperties = {
  borderRadius: 22,
  border: '1px solid rgba(148, 163, 184, 0.24)',
  background: 'rgba(9, 17, 34, 0.46)',
  padding: '16px 16px 18px',
  boxShadow: 'inset 0 0 24px rgba(125, 211, 252, 0.05)'
}

const microCardTitleStyle: CSSProperties = {
  margin: 0,
  color: '#f8fafc',
  fontSize: 17,
  fontWeight: 500
}

const microCardBodyStyle: CSSProperties = {
  margin: 0,
  color: '#cbd5e1',
  fontSize: 14,
  lineHeight: 1.7
}

const serviceOrbitGridStyle: CSSProperties = {
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  marginTop: 18
}

const serviceOrbitCardStyle: CSSProperties = {
  display: 'block',
  textDecoration: 'none',
  borderRadius: 24,
  border: '1px solid rgba(148, 163, 184, 0.24)',
  background: 'rgba(9, 17, 34, 0.48)',
  padding: '18px 18px 20px',
  boxShadow: '0 18px 36px rgba(2, 6, 23, 0.24)'
}

const serviceOrbitBodyStyle: CSSProperties = {
  margin: 0,
  color: '#cbd5e1',
  fontSize: 14,
  lineHeight: 1.7
}

const orbitLinkStyle: CSSProperties = {
  display: 'inline-flex',
  marginTop: 14,
  color: '#f8fafc',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase'
}

const splitColumnStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  marginTop: 18
}

const stackStyle: CSSProperties = {
  display: 'grid',
  gap: 12
}

const stackCardStyle: CSSProperties = {
  borderRadius: 22,
  border: '1px solid rgba(148, 163, 184, 0.24)',
  background: 'rgba(9, 17, 34, 0.48)',
  padding: '16px 16px 18px'
}

const stackIndexStyle: CSSProperties = {
  margin: 0,
  color: '#7c3aed',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase'
}

const stackTitleStyle: CSSProperties = {
  margin: '8px 0 0',
  color: '#f8fafc',
  fontSize: 18,
  fontWeight: 500
}

const stackBodyStyle: CSSProperties = {
  margin: '8px 0 0',
  color: '#cbd5e1',
  fontSize: 14,
  lineHeight: 1.7
}

const ctaLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '10px 14px',
  borderRadius: 999,
  border: '1px solid rgba(148, 163, 184, 0.36)',
  textDecoration: 'none',
  color: '#e2e8f0',
  background: 'rgba(9, 17, 34, 0.42)',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase'
}

const footerSceneStyle: CSSProperties = {
  width: 'min(1180px, 94vw)',
  minHeight: '70vh',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '48px 0 88px'
}

const siteFooterStyle: CSSProperties = {
  width: 'min(1180px, 94vw)',
  margin: '0 auto',
  padding: '12px 0 56px',
  borderTop: '1px solid rgba(148, 163, 184, 0.18)',
  display: 'grid',
  gap: 22
}

const siteFooterInnerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 24,
  flexWrap: 'wrap'
}

const siteFooterBrandStyle: CSSProperties = {
  maxWidth: 360
}

const siteFooterTitleStyle: CSSProperties = {
  margin: 0,
  color: '#f8fafc',
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: '-0.02em'
}

const siteFooterBodyStyle: CSSProperties = {
  margin: '8px 0 0',
  color: '#94a3b8',
  fontSize: 14,
  lineHeight: 1.7
}

const siteFooterLinksWrapStyle: CSSProperties = {
  display: 'flex',
  gap: 14,
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  maxWidth: 520
}

const siteFooterLinkStyle: CSSProperties = {
  color: '#cbd5e1',
  textDecoration: 'none',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.1em'
}

const siteFooterBottomStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  flexWrap: 'wrap',
  alignItems: 'center'
}

const siteFooterMetaStyle: CSSProperties = {
  color: '#64748b',
  fontSize: 12
}

const siteFooterMetaLinksStyle: CSSProperties = {
  display: 'flex',
  gap: 14,
  flexWrap: 'wrap'
}

const siteFooterMetaLinkStyle: CSSProperties = {
  color: '#94a3b8',
  textDecoration: 'none',
  fontSize: 12
}
