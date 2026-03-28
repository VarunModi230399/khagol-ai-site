import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { OWNER_NAME } from '../config/siteContent'
import { SECONDARY_PAGES } from '../config/secondaryPages'
import { SolarSystemCanvas } from '../components/3D/SolarSystemCanvas'

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)

export function SecondaryPage() {
  const params = useParams<{ page: string }>()
  const pageKey = params.page === 'projects' || params.page === 'contact' ? params.page : null
  const content = pageKey ? SECONDARY_PAGES[pageKey] : null
  const [sceneProgress, setSceneProgress] = useState(0)

  useEffect(() => {
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

  if (!content) {
    return (
      <div style={pageStyle}>
        <div style={contentWrapStyle}>
          <article style={heroBlockStyle}>
            <h1 style={heroTitleStyle}>Page not found</h1>
            <Link style={pillLinkStyle} to="/">
              Return Home
            </Link>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <div style={fixedStageStyle}>
        <SolarSystemCanvas
          progress={sceneProgress}
          variant="ambient"
          theme={pageKey ?? 'home'}
        />
      </div>
      <div style={contentWrapStyle}>
        <header style={heroBlockStyle}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link style={pillLinkStyle} to="/">
              Back to Home
            </Link>
          </div>

          <p style={heroKickerStyle}>{content.kicker}</p>
          <h1 style={heroTitleStyle}>{content.title}</h1>
          <p style={heroIntroStyle}>{content.intro}</p>
          <p style={heroBodyStyle}>{content.description}</p>
        </header>

        {content.sections.map((section) => (
          <section key={section.title} style={sectionStyle}>
            <h2 style={sectionTitleStyle}>{section.title}</h2>
            <div style={gridStyle}>
              {section.items.map((item) => (
                <article key={item} style={cardStyle}>
                  <p style={cardBodyStyle}>{item}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section style={sectionStyle}>
          <article style={{ ...cardStyle, padding: '20px 20px 24px' }}>
            <p style={heroKickerStyle}>Next Step</p>
            <h2 style={sectionTitleStyle}>{content.ctaTitle}</h2>
            <p style={heroBodyStyle}>{content.ctaBody}</p>
            <p style={{ ...heroBodyStyle, marginTop: 8 }}>Founder: {OWNER_NAME}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <a style={pillLinkStyle} href="mailto:hello@khagol.ai">
                hello@khagol.ai
              </a>
              <Link style={pillLinkStyle} to="/services/strategy">
                Explore Services
              </Link>
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  position: 'relative',
  padding: 'min(6vh, 56px) min(6vw, 66px)',
  color: '#e2e8f0',
  overflow: 'hidden'
}

const contentWrapStyle: CSSProperties = {
  width: 'min(1080px, 100%)',
  margin: '0 auto',
  display: 'grid',
  gap: 24,
  position: 'relative',
  zIndex: 2
}

const fixedStageStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 0
}

const heroBlockStyle: CSSProperties = {
  borderRadius: 28,
  border: '1px solid rgba(148,163,184,0.24)',
  background: 'linear-gradient(160deg, rgba(8,15,31,0.72), rgba(2,6,23,0.82))',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: '0 30px 90px rgba(2,6,23,0.65)',
  padding: 'clamp(20px, 4vw, 38px)'
}

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: 14
}

const heroKickerStyle: CSSProperties = {
  margin: '16px 0 0',
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#93c5fd'
}

const heroTitleStyle: CSSProperties = {
  fontSize: 'clamp(32px, 6vw, 58px)',
  marginTop: 12,
  marginBottom: 10,
  color: '#d8f6ff',
  letterSpacing: '-0.03em',
  fontWeight: 500
}

const heroIntroStyle: CSSProperties = {
  margin: 0,
  color: '#ecfeff',
  fontSize: 18,
  lineHeight: 1.6
}

const heroBodyStyle: CSSProperties = {
  margin: '12px 0 0',
  color: '#cbd5e1',
  fontSize: 15,
  lineHeight: 1.8,
  maxWidth: 860
}

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  color: '#f8fafc',
  fontSize: 'clamp(20px, 3.5vw, 30px)',
  letterSpacing: '-0.02em',
  fontWeight: 500
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
}

const cardStyle: CSSProperties = {
  borderRadius: 18,
  border: '1px solid rgba(148,163,184,0.24)',
  background: 'rgba(15,23,42,0.56)',
  padding: '16px 16px 18px'
}

const cardBodyStyle: CSSProperties = {
  margin: 0,
  color: '#cbd5e1',
  fontSize: 14,
  lineHeight: 1.7
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
  background: 'rgba(15,23,42,0.6)'
}
