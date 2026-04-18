import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { MathUtils, MeshBasicMaterial } from 'three'
import type { Group, Mesh } from 'three'
import type { PlanetConfig, ServiceSectionKey } from '../../types/planet'

interface OrbitingPlanetProps {
  planet: PlanetConfig
  progress?: number
  reducedMotion?: boolean
  onHover?(section: ServiceSectionKey | null): void
  onClick?(section: PlanetConfig['section']): void
}

const PERSONALITY: Record<
  ServiceSectionKey,
  {
    coreColor: string
    auraColor: string
    labelColor: string
    size: number
    emissive: number
    moonOffset?: [number, number, number]
    ring?: { radius: number; tube: number; tilt: [number, number, number] }
  }
> = {
  strategy: {
    coreColor: '#5eead4',
    auraColor: '#67e8f9',
    labelColor: '#ccfbf1',
    size: 0.33,
    emissive: 0.36,
    ring: { radius: 0.46, tube: 0.015, tilt: [Math.PI / 2.4, 0.42, 0.22] }
  },
  ml: {
    coreColor: '#60a5fa',
    auraColor: '#93c5fd',
    labelColor: '#dbeafe',
    size: 0.34,
    emissive: 0.44,
    moonOffset: [0.74, 0.14, 0]
  },
  data: {
    coreColor: '#a78bfa',
    auraColor: '#c4b5fd',
    labelColor: '#f5f3ff',
    size: 0.31,
    emissive: 0.38,
    moonOffset: [0.68, -0.08, 0.22]
  },
  auto: {
    coreColor: '#86efac',
    auraColor: '#bbf7d0',
    labelColor: '#ecfdf5',
    size: 0.35,
    emissive: 0.46,
    ring: { radius: 0.52, tube: 0.018, tilt: [Math.PI / 2, 0.8, 0.05] }
  },
  // ── AI AGENTS: amber/gold glow with ring ──────────────────────────────────────
  agents: {
    coreColor: '#fbbf24',
    auraColor: '#fde68a',
    labelColor: '#fef3c7',
    size: 0.36,
    emissive: 0.48,
    ring: { radius: 0.54, tube: 0.016, tilt: [Math.PI / 2.2, 0.6, 0.3] }
  }
}

export function OrbitingPlanet({
  planet,
  progress = 0,
  reducedMotion = false,
  onHover,
  onClick
}: OrbitingPlanetProps) {
  const groupRef = useRef<Group | null>(null)
  const planetRef = useRef<Mesh | null>(null)
  const auraRef = useRef<Mesh | null>(null)
  const orbitAccentRef = useRef<Group | null>(null)
  const pressStartRef = useRef<{ x: number; y: number } | null>(null)
  const [hovered, setHovered] = useState(false)

  const style = useMemo(() => PERSONALITY[planet.section], [planet.section])

  useFrame((state, delta) => {
    if (!groupRef.current || !planetRef.current || !auraRef.current) return

    const time = state.clock.elapsedTime
    const portal = Math.min(Math.max((progress - 0.18) / 0.28, 0), 1)
    const collision = Math.min(Math.max((progress - 0.32) / 0.24, 0), 1)
    const constellation = Math.min(Math.max((progress - 0.76) / 0.22, 0), 1)
    const wobble = reducedMotion ? 0 : Math.sin(time * 1.5 + planet.angle) * (0.07 + portal * 0.08)

    const orbitRadius = planet.radius + Math.sin(time * 0.42 + planet.angle) * portal * 0.35
    const baseX = Math.cos(time * (planet.speed + portal * 0.03) + planet.angle) * orbitRadius
    const baseZ = Math.sin(time * (planet.speed + portal * 0.03) + planet.angle) * orbitRadius

    const collisionOffsets: Record<ServiceSectionKey, [number, number, number]> = {
      strategy: [-0.25, 0.18, -0.2],
      ml: [-0.95, 0.38, 0.62],
      data: [0.9, -0.28, -0.58],
      auto: [0.35, -0.14, 0.22],
      agents: [-0.6, 0.3, 0.45]           // ── AI AGENTS
    }

    const constellationTargets: Record<ServiceSectionKey, [number, number, number]> = {
      strategy: [-3.2, 1.8, -1.2],
      ml: [-1.1, 0.8, -0.7],
      data: [1.2, 1.35, -0.6],
      auto: [3.2, 0.15, -1],
      agents: [0.0, 2.2, -1.4]            // ── AI AGENTS
    }

    const collisionOffset = collisionOffsets[planet.section]
    const collisionX = baseX + collisionOffset[0] * collision
    const collisionY = wobble + collisionOffset[1] * collision
    const collisionZ = baseZ + collisionOffset[2] * collision
    const constellationTarget = constellationTargets[planet.section]

    groupRef.current.position.x = MathUtils.lerp(collisionX, constellationTarget[0], constellation)
    groupRef.current.position.y = MathUtils.lerp(collisionY, constellationTarget[1], constellation)
    groupRef.current.position.z = MathUtils.lerp(collisionZ, constellationTarget[2], constellation)

    planetRef.current.rotation.y += delta * 0.48

    const targetScale = hovered ? 1.36 : 1
    const currentScale = planetRef.current.scale.x
    const nextScale = MathUtils.lerp(currentScale, targetScale, 0.12)
    planetRef.current.scale.setScalar(nextScale)

    const auraTarget = hovered ? 1.52 : 1.2
    const auraScale = MathUtils.lerp(auraRef.current.scale.x, auraTarget, 0.1)
    auraRef.current.scale.setScalar(auraScale)
    if (!Array.isArray(auraRef.current.material)) {
      ;(auraRef.current.material as MeshBasicMaterial).opacity =
        (hovered ? 0.28 : 0.18) + portal * 0.08
    }

    if (orbitAccentRef.current) {
      orbitAccentRef.current.rotation.y += delta * (hovered ? 1.5 : 0.45)
      orbitAccentRef.current.rotation.x += delta * 0.12
      orbitAccentRef.current.scale.setScalar(1 + portal * 0.15 + constellation * 0.1)
    }
  })

  const handlePointerEnter = () => {
    setHovered(true)
    if (onHover) onHover(planet.section)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (onHover) onHover(null)
    document.body.style.cursor = 'default'
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={(event) => {
        pressStartRef.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerUp={(event) => {
        const start = pressStartRef.current
        pressStartRef.current = null
        const deltaX = start ? Math.abs(event.clientX - start.x) : 0
        const deltaY = start ? Math.abs(event.clientY - start.y) : 0
        if (deltaX < 10 && deltaY < 10 && onClick) {
          onClick(planet.section)
        }
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <mesh ref={planetRef}>
        <sphereGeometry args={[style.size, 64, 64]} />
        <meshStandardMaterial
          color={style.coreColor}
          metalness={0.22}
          roughness={0.3}
          emissive={style.coreColor}
          emissiveIntensity={hovered ? style.emissive * 1.5 : style.emissive}
        />
      </mesh>

      <mesh ref={auraRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[style.size * 1.2, 32, 32]} />
        <meshBasicMaterial color={style.auraColor} transparent opacity={hovered ? 0.28 : 0.18} />
      </mesh>

      <group ref={orbitAccentRef}>
        {style.ring && (
          <mesh rotation={style.ring.tilt}>
            <torusGeometry args={[style.ring.radius, style.ring.tube, 8, 90]} />
            <meshBasicMaterial color={style.auraColor} transparent opacity={hovered ? 0.7 : 0.4} />
          </mesh>
        )}

        {style.moonOffset && (
          <mesh position={style.moonOffset}>
            <sphereGeometry args={[0.07, 18, 18]} />
            <meshBasicMaterial color="#e2e8f0" transparent opacity={0.86} />
          </mesh>
        )}
      </group>

      <Text
        position={[0, style.size + 0.56, 0]}
        fontSize={0.16}
        color={hovered ? '#ffffff' : style.labelColor}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.004}
        outlineColor="#020617"
      >
        {planet.name}
      </Text>
    </group>
  )
}
