import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { SectionKey, ServiceSectionKey } from './types/planet'
import { SolarSystemCanvas } from './components/3D/SolarSystemCanvas'
import { TopNav } from './components/ui/TopNav'
import { HomeContentSections } from './components/ui/HomeContentSections'
import { ServicePage } from './pages/ServicePage'
import { SecondaryPage } from './pages/SecondaryPage'
import { PLANETARY_DESTINATIONS } from './config/siteContent'

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)

function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home')
  const [hoveredSection, setHoveredSection] = useState<ServiceSectionKey | null>(null)
  const [selectedPlanet, setSelectedPlanet] = useState<keyof typeof PLANETARY_DESTINATIONS | null>(null)
  const [sceneProgress, setSceneProgress] = useState(0)
  const navigate = useNavigate()

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPlanet(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const scrollToId = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openService = (section: ServiceSectionKey) => {
    setActiveSection(section)
    navigate(`/services/${section}`)
  }

  const handleMainClick = () => {
    setSelectedPlanet('core')
  }

  const handlePlanetClick = (section: ServiceSectionKey) => {
    setSelectedPlanet(section)
  }

  const handlePlanetHover = (section: ServiceSectionKey | null) => {
    setHoveredSection(section)
  }

  const handleNavChange = (section: SectionKey) => {
    setActiveSection(section)

    if (section === 'home') {
      setSelectedPlanet(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    openService(section)
  }

  const sceneTheme = hoveredSection ?? 'home'
  const activePlanet = selectedPlanet ? PLANETARY_DESTINATIONS[selectedPlanet] : null

  return (
    <div style={pageStyle}>
      <div style={fixedStageStyle}>
        <SolarSystemCanvas
          progress={sceneProgress}
          variant="interactive"
          theme={sceneTheme}
          onMainClick={handleMainClick}
          onPlanetClick={handlePlanetClick}
          onPlanetHover={handlePlanetHover}
        />
        <div style={stageVignetteStyle} />
      </div>

      <TopNav activeSection={activeSection} onChange={handleNavChange} />

      <div style={contentWrapStyle}>
        <section id="hero-top" style={heroSectionStyle}>
          <div
            style={{
              ...heroPanelStyle,
              transform: `translate3d(0, ${sceneProgress * -20}px, 0)`,
              opacity: 1 - clamp((sceneProgress - 0.18) / 0.28)
            }}
          >
            <p style={heroEyebrowStyle}>Intelligent Systems Studio</p>
            <h1 style={heroTitleStyle}>KHAGOL AI</h1>
            <p style={heroBodyStyle}>
              A premium AI website built around strategy, machine learning, data, and
              automation. Click or tap any planet to open its service card, then continue
              through the rest of the site without losing the immersive background.
            </p>
            <div style={heroActionsStyle}>
              <Link to="/core" style={heroLinkButtonStyle}>
                Open KHAGOL Core
              </Link>
              <button onClick={() => scrollToId('about-section')} style={heroButtonStyle}>
                Explore the Universe
              </button>
              <button onClick={() => scrollToId('services-section')} style={heroGhostButtonStyle}>
                View Service Worlds
              </button>
            </div>
          </div>

          {activePlanet && (
            <div style={activePlanetPanelWrapStyle} onClick={() => setSelectedPlanet(null)}>
              <article
                style={{
                  ...activePlanetPanelStyle,
                  boxShadow: `0 28px 70px rgba(15,23,42,0.34), inset 0 0 44px ${activePlanet.accent}20`
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <div style={activePlanetHeaderStyle}>
                  <div>
                    <p style={{ ...signalEyebrowStyle, color: activePlanet.accent }}>
                      {activePlanet.tag}
                    </p>
                    <h2 style={activePlanetTitleStyle}>{activePlanet.title}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanet(null)}
                    style={activePlanetCloseStyle}
                    aria-label="Close service information"
                  >
                    ×
                  </button>
                </div>
                <p style={activePlanetBodyStyle}>{activePlanet.summary}</p>
                <div style={activePlanetActionsStyle}>
                  <Link to={activePlanet.route} style={activePlanetCtaStyle}>
                    Open page →
                  </Link>
                </div>
              </article>
            </div>
          )}

          <div style={chapterRailStyle}>
            {[
              'Overview',
              'About',
              'Services',
              'Capabilities',
              'Contact'
            ].map((label, index) => {
              const markerProgress = index / 4
              const active = sceneProgress >= markerProgress - 0.08
              return (
                <div key={label} style={chapterItemStyle}>
                  <span
                    style={{
                      ...chapterDotStyle,
                      opacity: active ? 1 : 0.35,
                      transform: active ? 'scale(1)' : 'scale(0.72)'
                    }}
                  />
                  <span style={{ ...chapterLabelStyle, opacity: active ? 0.94 : 0.42 }}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        <HomeContentSections />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/:section" element={<ServicePage />} />
      <Route path="/:page" element={<SecondaryPage />} />
    </Routes>
  )
}

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  position: 'relative',
  background:
    'radial-gradient(120% 90% at 50% 10%, #08111f 0%, #030712 55%, #000 100%)',
  color: '#e2e8f0'
}

const fixedStageStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 0
}

const stageVignetteStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'radial-gradient(circle at 18% 24%, rgba(56,189,248,0.08), transparent 32%), radial-gradient(circle at 84% 76%, rgba(167,139,250,0.07), transparent 28%), linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(2,6,23,0.4) 100%)',
  pointerEvents: 'none'
}

const contentWrapStyle: CSSProperties = {
  position: 'relative',
  zIndex: 2
}

const heroSectionStyle: CSSProperties = {
  minHeight: '100vh',
  padding: 'min(16vh, 132px) clamp(20px, 6vw, 84px) 84px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 28
}

const heroPanelStyle: CSSProperties = {
  maxWidth: 'min(640px, 88vw)',
  padding: 'clamp(18px, 2vw, 26px) 0'
}

const heroEyebrowStyle: CSSProperties = {
  margin: 0,
  color: '#c3f6ff',
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  fontSize: 'clamp(10px, 1.1vw, 12px)',
  textShadow: '0 0 20px rgba(56,189,248,0.35)'
}

const heroTitleStyle: CSSProperties = {
  margin: '12px 0 0',
  fontSize: 'clamp(42px, 8vw, 102px)',
  lineHeight: 0.92,
  letterSpacing: '-0.04em',
  fontWeight: 500,
  color: '#f8fcff',
  textTransform: 'uppercase',
  textShadow: '0 24px 55px rgba(8,47,73,0.7)'
}

const heroBodyStyle: CSSProperties = {
  margin: '16px 0 0',
  maxWidth: 500,
  color: '#bfdbfe',
  fontSize: 'clamp(12px, 1.8vw, 15px)',
  lineHeight: 1.8,
  opacity: 0.95
}

const heroActionsStyle: CSSProperties = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  marginTop: 22
}

const heroButtonStyle: CSSProperties = {
  borderRadius: 999,
  border: '1px solid rgba(147,197,253,0.45)',
  background: 'rgba(2,6,23,0.42)',
  color: '#dbeafe',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontSize: 11,
  padding: '10px 14px',
  cursor: 'pointer',
  backdropFilter: 'blur(8px)'
}

const heroGhostButtonStyle: CSSProperties = {
  ...heroButtonStyle,
  background: 'rgba(8,15,31,0.22)',
  border: '1px solid rgba(148,163,184,0.35)'
}

const heroLinkButtonStyle: CSSProperties = {
  ...heroButtonStyle,
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  borderColor: 'rgba(251,191,36,0.45)',
  color: '#fef3c7',
  boxShadow: '0 0 20px rgba(251,191,36,0.12)'
}

const activePlanetPanelWrapStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px'
}

const activePlanetPanelStyle: CSSProperties = {
  width: 'min(420px, 92vw)',
  borderRadius: 28,
  border: '1px solid rgba(255,255,255,0.34)',
  background:
    'linear-gradient(160deg, rgba(247,250,255,0.78), rgba(220,234,255,0.4)), radial-gradient(circle at top left, rgba(255,255,255,0.56), transparent 42%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  padding: '22px 22px 24px'
}

const activePlanetHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 12
}

const activePlanetTitleStyle: CSSProperties = {
  margin: '6px 0 0',
  color: '#0f172a',
  fontSize: 30,
  letterSpacing: '-0.03em',
  fontWeight: 500
}

const activePlanetBodyStyle: CSSProperties = {
  margin: '14px 0 0',
  color: '#334155',
  fontSize: 15,
  lineHeight: 1.75
}

const activePlanetActionsStyle: CSSProperties = {
  display: 'flex',
  gap: 12,
  marginTop: 18
}

const activePlanetCtaStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  borderRadius: 999,
  border: '1px solid rgba(15,23,42,0.14)',
  background: 'rgba(255,255,255,0.4)',
  color: '#0f172a',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '10px 14px'
}

const activePlanetCloseStyle: CSSProperties = {
  border: 'none',
  background: 'rgba(255,255,255,0.42)',
  color: '#0f172a',
  borderRadius: 999,
  width: 34,
  height: 34,
  cursor: 'pointer',
  fontSize: 20,
  lineHeight: 1
}

const signalEyebrowStyle: CSSProperties = {
  margin: 0,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: '#7dd3fc'
}

const chapterRailStyle: CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  marginTop: 10
}

const chapterItemStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8
}

const chapterDotStyle: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: 'radial-gradient(circle, #67e8f9 0%, rgba(103,232,249,0.1) 70%)',
  boxShadow: '0 0 14px rgba(103,232,249,0.4)',
  transition: 'opacity 0.2s ease, transform 0.2s ease'
}

const chapterLabelStyle: CSSProperties = {
  color: '#cbd5e1',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  transition: 'opacity 0.2s ease'
}
