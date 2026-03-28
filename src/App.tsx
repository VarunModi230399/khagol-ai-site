import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { SectionKey, ServiceSectionKey } from './types/planet'
import { SolarSystemCanvas } from './components/3D/SolarSystemCanvas'
import { TopNav } from './components/ui/TopNav'
import { HomeContentSections } from './components/ui/HomeContentSections'
import { ServicePage } from './pages/ServicePage'
import { SecondaryPage } from './pages/SecondaryPage'
import { SERVICES_OVERVIEW } from './config/siteContent'

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)

function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home')
  const [hoveredSection, setHoveredSection] = useState<ServiceSectionKey | null>(null)
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
    setActiveSection('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePlanetClick = (section: ServiceSectionKey) => {
    openService(section)
  }

  const handlePlanetHover = (section: ServiceSectionKey | null) => {
    setHoveredSection(section)
  }

  const handleNavChange = (section: SectionKey) => {
    setActiveSection(section)

    if (section === 'home') {
      handleMainClick()
      return
    }

    openService(section)
  }

  const hoveredService = SERVICES_OVERVIEW.find((item) => item.key === hoveredSection)
  const sceneTheme = hoveredSection ?? 'home'

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
            <p style={heroEyebrowStyle}>Persistent Intelligence Universe</p>
            <h1 style={heroTitleStyle}>KHAGOL AI</h1>
            <p style={heroBodyStyle}>
              A living cosmic stage for strategy, machine learning, data, and automation.
              The universe stays present while each chapter reveals itself inside it.
            </p>
            <div style={heroActionsStyle}>
              <button onClick={() => scrollToId('about-section')} style={heroButtonStyle}>
                Explore the Universe
              </button>
              <button onClick={() => scrollToId('services-section')} style={heroGhostButtonStyle}>
                View Service Worlds
              </button>
            </div>
          </div>

          <div style={floatingSignalStyle}>
            <p style={signalEyebrowStyle}>Live Orbit Signal</p>
            <p style={signalBodyStyle}>
              {hoveredService
                ? `${hoveredService.title}: ${hoveredService.summary}`
                : 'The KHAGOL stage remains active as you scroll. Hover a planet to preview it, then move through the sections without leaving the universe.'}
            </p>
            <div style={serviceLinkRowStyle}>
              {SERVICES_OVERVIEW.map((service) => (
                <Link
                  key={service.key}
                  to={service.href}
                  onClick={() => setActiveSection(service.key)}
                  style={{
                    ...serviceLinkStyle,
                    borderColor:
                      hoveredSection === service.key ? service.accent : 'rgba(148,163,184,0.32)',
                    boxShadow:
                      hoveredSection === service.key
                        ? `0 0 18px ${service.accent}40`
                        : 'none'
                  }}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div style={chapterRailStyle}>
            {[
              'Core Field',
              'Studio Layer',
              'Service Worlds',
              'Capability Archive',
              'Transmission'
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

        <HomeContentSections onOpenService={openService} />
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

const floatingSignalStyle: CSSProperties = {
  alignSelf: 'flex-end',
  width: 'min(360px, 88vw)',
  borderRadius: 22,
  border: '1px solid rgba(148,163,184,0.28)',
  background: 'rgba(2,6,23,0.5)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  padding: '14px 14px 16px',
  boxShadow: '0 18px 45px rgba(2,6,23,0.5)'
}

const signalEyebrowStyle: CSSProperties = {
  margin: 0,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: '#7dd3fc'
}

const signalBodyStyle: CSSProperties = {
  margin: '8px 0 0',
  fontSize: 13,
  lineHeight: 1.65,
  color: '#cbd5e1'
}

const chapterRailStyle: CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  marginTop: 10
}

const serviceLinkRowStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  marginTop: 14
}

const serviceLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  borderRadius: 999,
  border: '1px solid rgba(148,163,184,0.32)',
  background: 'rgba(15,23,42,0.78)',
  color: '#e2e8f0',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  padding: '8px 10px'
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
