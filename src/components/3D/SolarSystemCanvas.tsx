import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import {
  AdditiveBlending,
  BackSide,
  Color,
  MathUtils,
  MeshBasicMaterial,
  Vector3
} from 'three'
import type { Group, Mesh } from 'three'
import { KhagolPlanet } from './KhagolPlanet'
import type { ServiceSectionKey } from '../../types/planet'

interface SolarSystemCanvasProps {
  progress?: number
  variant?: 'interactive' | 'ambient'
  theme?: 'home' | ServiceSectionKey | 'projects' | 'contact'
  onMainClick?(): void
  onPlanetClick?(section: ServiceSectionKey): void
  onPlanetHover?(section: ServiceSectionKey | null): void
}

const SCENE_THEMES = {
  home: { core: '#67e8f9', fill: '#60a5fa', accent: '#a78bfa' },
  strategy: { core: '#8dd8ff', fill: '#67e8f9', accent: '#fbbf24' },
  ml: { core: '#60a5fa', fill: '#93c5fd', accent: '#c084fc' },
  data: { core: '#c4b5fd', fill: '#a78bfa', accent: '#67e8f9' },
  auto: { core: '#86efac', fill: '#67e8f9', accent: '#f59e0b' },
  projects: { core: '#f472b6', fill: '#c084fc', accent: '#67e8f9' },
  contact: { core: '#67e8f9', fill: '#fbbf24', accent: '#c084fc' }
} as const

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)

const range = (value: number, start: number, end: number) =>
  clamp((value - start) / Math.max(end - start, 0.0001))

const setOpacity = (mesh: Mesh | null, opacity: number) => {
  if (!mesh) return
  const material = mesh.material
  if (Array.isArray(material)) return
  ;(material as MeshBasicMaterial).opacity = opacity
}

function CameraRig({
  progress,
  reducedMotion,
  variant
}: {
  progress: number
  reducedMotion: boolean
  variant: 'interactive' | 'ambient'
}) {
  const { camera, pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const sectionSweep = range(progress, 0.12, 0.9)
    const mouseScale = variant === 'interactive' ? 0.22 : 0.12
    const mouseX = reducedMotion ? 0 : pointer.x * mouseScale
    const mouseY = reducedMotion ? 0 : pointer.y * (mouseScale * 0.7)

    const driftX = reducedMotion ? 0 : Math.sin(t * 0.16 + progress * 1.5) * 0.14
    const driftY = reducedMotion ? 0 : Math.cos(t * 0.12 + progress * 2.2) * 0.1

    const target = new Vector3(
      mouseX + driftX + sectionSweep * 0.35,
      mouseY + driftY + Math.sin(progress * Math.PI * 1.4) * 0.18,
      (variant === 'interactive' ? 10.2 : 11.4) - sectionSweep * 0.5
    )

    camera.position.lerp(target, 0.05)
    camera.rotation.z = MathUtils.lerp(
      camera.rotation.z,
      reducedMotion ? 0 : Math.sin(t * 0.14) * 0.012 + sectionSweep * 0.02,
      0.05
    )
    camera.lookAt(0, Math.sin(progress * Math.PI) * 0.15, 0)
  })

  return null
}

function NebulaLayer({
  scale,
  color,
  opacity,
  speed,
  x,
  y,
  z,
  progress,
  reducedMotion
}: {
  scale: number
  color: string
  opacity: number
  speed: number
  x: number
  y: number
  z: number
  progress: number
  reducedMotion: boolean
}) {
  const meshRef = useRef<Mesh | null>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const bloom = range(progress, 0.5, 0.82)
    setOpacity(meshRef.current, opacity + bloom * 0.08)

    if (reducedMotion) return

    const wobble = Math.sin(state.clock.elapsedTime * 0.25 + z) * 0.07
    meshRef.current.position.x = x + Math.sin(state.clock.elapsedTime * speed) * (0.2 + bloom * 0.18)
    meshRef.current.position.y = y + wobble
    meshRef.current.scale.setScalar(1 + bloom * 0.08)
  })

  return (
    <mesh ref={meshRef} position={new Vector3(x, y, z)}>
      <sphereGeometry args={[scale, 48, 48]} />
      <meshBasicMaterial
        color={new Color(color)}
        side={BackSide}
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function NebulaShells({
  progress,
  reducedMotion
}: {
  progress: number
  reducedMotion: boolean
}) {
  const layers = [
    { scale: 18, color: '#12324d', opacity: 0.1, speed: 0.02, x: -2.8, y: 1.4, z: -7 },
    { scale: 15, color: '#34134e', opacity: 0.09, speed: -0.015, x: 2.2, y: -1.6, z: -6 },
    { scale: 12, color: '#0a4a5e', opacity: 0.08, speed: 0.018, x: 0, y: 2.2, z: -8 },
    { scale: 22, color: '#111827', opacity: 0.15, speed: 0.008, x: 0, y: 0, z: -11 }
  ]

  return (
    <group>
      {layers.map((layer) => (
        <NebulaLayer
          key={`${layer.color}-${layer.scale}`}
          {...layer}
          progress={progress}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  )
}

function DustField({
  progress,
  reducedMotion
}: {
  progress: number
  reducedMotion: boolean
}) {
  const groupRef = useRef<Group | null>(null)
  const points = useRef<Float32Array | null>(null)

  if (!points.current) {
    const entries: number[] = []
    for (let i = 0; i < 520; i += 1) {
      const radius = 6 + Math.random() * 18
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 9
      entries.push(Math.cos(theta) * radius, y, Math.sin(theta) * radius - 6)
    }
    points.current = new Float32Array(entries)
  }

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y += delta * (0.01 + progress * 0.015)
    groupRef.current.rotation.x = progress * 0.08
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.current, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05 + progress * 0.02}
          color={progress > 0.68 ? '#d8b4fe' : '#c6e6ff'}
          transparent
          opacity={0.4 + progress * 0.18}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

function EnergyBands({
  progress,
  reducedMotion
}: {
  progress: number
  reducedMotion: boolean
}) {
  const innerRef = useRef<Mesh | null>(null)
  const outerRef = useRef<Mesh | null>(null)
  const portalRef = useRef<Mesh | null>(null)

  useFrame((_, delta) => {
    const portal = range(progress, 0.24, 0.52)

    if (innerRef.current) {
      innerRef.current.rotation.y += delta * (reducedMotion ? 0.04 : 0.16 + progress * 0.16)
      innerRef.current.scale.setScalar(1 + portal * 0.35)
      setOpacity(innerRef.current, 0.35 + portal * 0.2)
    }

    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * (reducedMotion ? 0.03 : 0.1 + progress * 0.12)
      outerRef.current.scale.setScalar(1 + range(progress, 0.58, 0.84) * 0.42)
      setOpacity(outerRef.current, 0.18 + range(progress, 0.58, 0.84) * 0.24)
    }

    if (portalRef.current) {
      const scale = 1 + portal * 1.2
      portalRef.current.scale.setScalar(scale)
      portalRef.current.rotation.z += delta * 0.12
      setOpacity(portalRef.current, portal * 0.4)
    }
  })

  return (
    <group>
      <mesh ref={innerRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.9, 0.012, 8, 220]} />
        <meshBasicMaterial color="#6ee7ff" transparent opacity={0.35} />
      </mesh>
      <mesh ref={outerRef} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[6.2, 0.02, 8, 220]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.18} />
      </mesh>
      <mesh ref={portalRef} rotation={[Math.PI / 1.95, 0.1, 0]}>
        <torusGeometry args={[3.2, 0.08, 12, 180]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0} />
      </mesh>
    </group>
  )
}

function CollisionEvent({
  progress,
  reducedMotion
}: {
  progress: number
  reducedMotion: boolean
}) {
  const leftRef = useRef<Group | null>(null)
  const rightRef = useRef<Group | null>(null)
  const shockwaveRef = useRef<Mesh | null>(null)
  const haloRef = useRef<Mesh | null>(null)
  const collision = range(progress, 0.32, 0.56)
  const release = range(progress, 0.56, 0.72)

  useFrame((state, delta) => {
    const eased = Math.sin(collision * Math.PI * 0.5)
    const leftX = MathUtils.lerp(-5.4, -1.05, eased)
    const rightX = MathUtils.lerp(5.2, 1.2, eased)
    const vertical = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.8) * 0.18

    if (leftRef.current) {
      leftRef.current.position.set(leftX, 1.2 + vertical, -1.2)
      leftRef.current.rotation.y += delta * 0.35
    }

    if (rightRef.current) {
      rightRef.current.position.set(rightX, -0.95 - vertical * 0.6, 0.8)
      rightRef.current.rotation.y -= delta * 0.32
    }

    if (shockwaveRef.current) {
      const scale = 0.6 + collision * 3.4 + release * 2.6
      shockwaveRef.current.scale.set(scale, scale, scale)
      setOpacity(shockwaveRef.current, collision * 0.3 * (1 - release))
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(1 + collision * 0.7)
      setOpacity(haloRef.current, collision * 0.22)
    }
  })

  return (
    <group>
      <group ref={leftRef} visible={collision > 0.01 || release > 0.01}>
        <mesh>
          <sphereGeometry args={[0.42, 40, 40]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#67e8f9" emissiveIntensity={0.5} />
        </mesh>
        <mesh scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[0.34, 24, 24]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.14} />
        </mesh>
      </group>

      <group ref={rightRef} visible={collision > 0.01 || release > 0.01}>
        <mesh>
          <icosahedronGeometry args={[0.38, 1]} />
          <meshStandardMaterial color="#c4b5fd" emissive="#a78bfa" emissiveIntensity={0.45} />
        </mesh>
        <mesh scale={[1.6, 1.6, 1.6]}>
          <icosahedronGeometry args={[0.28, 1]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.15} />
        </mesh>
      </group>

      <mesh ref={shockwaveRef} rotation={[Math.PI / 2, 0, 0]} visible={collision > 0.01}>
        <torusGeometry args={[0.8, 0.035, 8, 120]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0} />
      </mesh>

      <mesh ref={haloRef} visible={collision > 0.01}>
        <sphereGeometry args={[1.1, 36, 36]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0} />
      </mesh>

      <Sparkles
        count={reducedMotion ? 10 : 28}
        size={2.6}
        scale={[2.5, 1.4, 2.5]}
        position={[0, 0.1, 0]}
        speed={0.32}
        color="#f8fafc"
      />
    </group>
  )
}

function VortexField({
  progress,
  reducedMotion
}: {
  progress: number
  reducedMotion: boolean
}) {
  const groupRef = useRef<Group | null>(null)
  const collapse = range(progress, 0.58, 0.86)
  const release = range(progress, 0.86, 1)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z += delta * (reducedMotion ? 0.03 : 0.08 + collapse * 0.45)
    groupRef.current.position.z = -2.6 + collapse * 1.8 - release * 1.1
    groupRef.current.scale.setScalar(0.8 + collapse * 1.25 - release * 0.2)
  })

  return (
    <group ref={groupRef} visible={collapse > 0.01 || release > 0.01}>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.4, 0.18, 12, 220]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={collapse * 0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.4, 0.4]}>
        <torusGeometry args={[1.3, 0.08, 10, 180]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={collapse * 0.32} />
      </mesh>
      <Sparkles
        count={reducedMotion ? 16 : 44}
        size={2.3}
        scale={[4, 2.4, 4]}
        position={[0, 0, 0]}
        speed={0.38}
        color="#c4b5fd"
      />
    </group>
  )
}

function ConstellationGlyphs({ progress }: { progress: number }) {
  const reveal = range(progress, 0.78, 1)
  const points: [number, number, number][] = [
    [-3.4, 1.8, -1.5],
    [-2.1, 0.9, -1.2],
    [-0.8, 1.4, -0.8],
    [0.9, 0.4, -0.5],
    [2.2, 1.3, -0.8],
    [3.3, 0.6, -1.1]
  ]

  return (
    <group visible={reveal > 0.01}>
      <Line
        points={points}
        color="#e0f2fe"
        transparent
        opacity={reveal * 0.34}
        lineWidth={1.4}
      />
      {points.map((point) => (
        <mesh key={point.join('-')} position={point} scale={[reveal, reveal, reveal]}>
          <sphereGeometry args={[0.06, 18, 18]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={reveal * 0.8} />
        </mesh>
      ))}
    </group>
  )
}

function ForegroundDrift({ progress }: { progress: number }) {
  const leftRef = useRef<Group | null>(null)
  const rightRef = useRef<Group | null>(null)

  useFrame((state) => {
    if (leftRef.current) {
      leftRef.current.position.x = -6.8 + Math.sin(state.clock.elapsedTime * 0.14) * 0.5
      leftRef.current.position.y = -1.2 + progress * 0.9
    }

    if (rightRef.current) {
      rightRef.current.position.x = 6.9 + Math.cos(state.clock.elapsedTime * 0.12) * 0.55
      rightRef.current.position.y = 1.4 - progress * 0.7
    }
  })

  return (
    <group>
      <group ref={leftRef}>
        <mesh rotation={[0.4, 0.8, 0.3]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#1e293b" transparent opacity={0.24} />
        </mesh>
      </group>
      <group ref={rightRef}>
        <mesh rotation={[0.6, 0.3, 0.2]}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  )
}

export function SolarSystemCanvas({
  progress = 0,
  variant = 'interactive',
  theme = 'home',
  onMainClick,
  onPlanetClick,
  onPlanetHover
}: SolarSystemCanvasProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const colors = SCENE_THEMES[theme]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mediaQuery.matches)
    apply()
    mediaQuery.addEventListener('change', apply)
    return () => mediaQuery.removeEventListener('change', apply)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.1, variant === 'interactive' ? 10.2 : 11.4], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#00050d']} />
        <fog
          attach="fog"
          args={[
            '#030712',
            variant === 'interactive' ? 9.2 : 10.5,
            (variant === 'interactive' ? 30 : 34) - progress * 2.5
          ]}
        />

        <ambientLight intensity={0.24 + progress * 0.08} />
        <pointLight
          position={[0, 0, 0]}
          color={colors.core}
          intensity={1.45 + range(progress, 0.18, 0.42) * 0.5}
          distance={20}
        />
        <pointLight position={[-7, 4, 5]} color={colors.fill} intensity={0.8} distance={30} />
        <pointLight
          position={[6, -5, -2]}
          color={colors.accent}
          intensity={0.55 + range(progress, 0.56, 0.9) * 0.42}
          distance={32}
        />

        <CameraRig progress={progress} reducedMotion={reducedMotion} variant={variant} />

        <NebulaShells progress={progress} reducedMotion={reducedMotion} />
        <EnergyBands progress={progress} reducedMotion={reducedMotion} />
        <ForegroundDrift progress={progress} />

        <Stars
          radius={90}
          depth={60}
          count={reducedMotion ? 9000 : 14000}
          factor={3.2 + progress * 1.4}
          fade
          speed={0.18 + progress * 0.12}
        />
        <Stars
          radius={160}
          depth={100}
          count={reducedMotion ? 3000 : 5200}
          factor={5.5 + range(progress, 0.58, 0.9) * 3.2}
          fade
          speed={0.06 + range(progress, 0.58, 0.9) * 0.16}
        />

        <Sparkles
          count={reducedMotion ? 45 : 90}
          size={1.8}
          scale={[16, 8, 16]}
          position={[0, 0, -1.5]}
          speed={0.12 + progress * 0.12}
          color="#8dd8ff"
        />
        <Sparkles
          count={reducedMotion ? 20 : 40}
          size={2.2}
          scale={[11, 4, 11]}
          position={[0, -0.2, 1.2]}
          speed={0.18 + range(progress, 0.32, 0.56) * 0.26}
          color="#d8b4fe"
        />

        <DustField progress={progress} reducedMotion={reducedMotion} />

        <KhagolPlanet
          progress={progress}
          onMainClick={onMainClick}
          onPlanetClick={onPlanetClick}
          onPlanetHover={onPlanetHover}
          reducedMotion={reducedMotion}
        />

        <CollisionEvent progress={progress * (variant === 'interactive' ? 1 : 0.55)} reducedMotion={reducedMotion} />
        <VortexField progress={progress * (variant === 'interactive' ? 1 : 0.6)} reducedMotion={reducedMotion} />
        <ConstellationGlyphs progress={progress} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={reducedMotion ? 0.03 : 0.08 + (1 - progress) * 0.06}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.75}
          rotateSpeed={0.28}
        />
      </Canvas>
    </div>
  )
}
