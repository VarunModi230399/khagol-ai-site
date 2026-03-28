// src/components/ui/HeroSection.tsx
interface HeroSectionProps {
  onLaunchConsole?(): void
  onViewCapabilities?(): void
}

export function HeroSection({
  onLaunchConsole,
  onViewCapabilities
}: HeroSectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2, // above 3D canvas
        width: '100%',
        marginTop: 90, // leaves room for top nav
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none' // enable clicks only on inner content
      }}
    >
      <div
        style={{
          width: 'min(1100px, 90vw)',
          padding: '32px 40px 40px',
          borderRadius: '32px',
          background:
            'linear-gradient(135deg, rgba(11,15,35,0.92), rgba(4,6,16,0.96))',
          border: '1px solid rgba(0,188,212,0.35)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          pointerEvents: 'auto'
        }}
      >
        {/* Tagline pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px',
            borderRadius: '999px',
            background: 'rgba(0,188,212,0.08)',
            border: '1px solid rgba(0,188,212,0.4)',
            fontSize: 12,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#89e4ff'
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, #00e5ff 0%, rgba(0,229,255,0) 70%)'
            }}
          />
          Intelligent Systems Orbiting Your Business
        </div>

        {/* Main title */}
        <h1
          style={{
            margin: 0,
            fontSize: '44px',
            lineHeight: 1.1,
            color: '#ffffff',
            letterSpacing: '-0.03em'
          }}
        >
          KHAGOL AI
        </h1>

        {/* Subheading */}
        <p
          style={{
            margin: 0,
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#cfd8ff',
            maxWidth: 640
          }}
        >
          A boutique AI consultancy turning strategy, data, machine learning and
          automation into a single orbital system that actually ships to
          production.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: 14,
            marginTop: 10,
            flexWrap: 'wrap'
          }}
        >
          {/* Primary CTA */}
          <button
            onClick={onLaunchConsole}
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              border: 'none',
              background:
                'linear-gradient(135deg, #00bcd4 0%, #00e5ff 100%)',
              color: '#020617',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(0,188,212,0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            Launch Console
            <span style={{ fontSize: 16 }}>↗</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onViewCapabilities}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: '1px solid rgba(148,163,184,0.7)',
              background: 'rgba(15,23,42,0.7)',
              color: '#e2e8f0',
              fontSize: 14,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            View Capabilities
            <span style={{ fontSize: 16 }}>↓</span>
          </button>
        </div>
      </div>
    </section>
  )
}
