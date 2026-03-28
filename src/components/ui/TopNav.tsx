import { Link } from 'react-router-dom'
import type { SectionKey } from '../../types/planet'

interface TopNavProps {
  activeSection: SectionKey
  onChange(section: SectionKey): void
}

export function TopNav({ activeSection, onChange }: TopNavProps) {
  const links: { key: SectionKey; label: string; to: string }[] = [
    { key: 'home', label: 'Home', to: '/' },
    { key: 'strategy', label: 'Strategy', to: '/services/strategy' },
    { key: 'ml', label: 'ML', to: '/services/ml' },
    { key: 'data', label: 'Data', to: '/services/data' },
    { key: 'auto', label: 'Auto', to: '/services/auto' }
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 120,
        pointerEvents: 'none',
        width: 'min(940px, 94vw)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Link
        to="/"
        onClick={() => onChange('home')}
        style={{
          pointerEvents: 'auto',
          border: '1px solid rgba(125,211,252,0.35)',
          background: 'rgba(2,6,23,0.5)',
          color: '#e0f2fe',
          textDecoration: 'none',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontSize: 11,
          borderRadius: 999,
          padding: '9px 13px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        KHAGOL AI
      </Link>

      <nav
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          gap: 8,
          borderRadius: 999,
          padding: '7px',
          border: '1px solid rgba(148,163,184,0.3)',
          background: 'rgba(2,6,23,0.45)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        {links.map((link) => {
          const isActive = activeSection === link.key
          return (
            <Link
              to={link.to}
              key={link.key}
              onClick={() => onChange(link.key)}
              style={{
                borderRadius: 999,
                border: 'none',
                background: isActive ? 'rgba(103,232,249,0.18)' : 'transparent',
                color: isActive ? '#f8fafc' : '#cbd5e1',
                textDecoration: 'none',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '7px 10px',
                cursor: 'pointer',
                boxShadow: isActive ? '0 0 16px rgba(103,232,249,0.22)' : 'none'
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
