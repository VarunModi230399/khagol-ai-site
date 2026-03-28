import type { SectionKey } from '../../types/planet'
import { SECTIONS } from '../../config/planets'

interface ContentPanelProps {
  activeSection: SectionKey
}

export function ContentPanel({ activeSection }: ContentPanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        width: '380px',
        height: '70%',
        background: 'rgba(10, 10, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(0, 188, 212, 0.3)',
        padding: '40px',
        color: 'white',
        overflowY: 'auto',
        zIndex: 50,
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        fontFamily: 'SF Pro Display, -apple-system, sans-serif'
      }}
    >
      <h2
        style={{
          color: '#00bcd4',
          marginBottom: '20px',
          fontSize: '24px'
        }}
      >
        {activeSection === 'home' ? 'KHAGOL AI' : activeSection.toUpperCase()}
      </h2>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: '16px',
          lineHeight: '1.6',
          opacity: 0.9
        }}
      >
        {SECTIONS[activeSection]}
      </pre>
    </div>
  )
}
