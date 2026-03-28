import { useFrame } from '@react-three/fiber'
import { Ring, useTexture } from '@react-three/drei'
import { useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import { PLANETS } from '../../config/planets'
import { OrbitingPlanet } from './OrbitingPlanet'
import type { ServiceSectionKey } from '../../types/planet'

interface KhagolPlanetProps {
  progress?: number
  onMainClick?(): void
  onPlanetClick?(section: ServiceSectionKey): void
  onPlanetHover?(section: ServiceSectionKey | null): void
  reducedMotion?: boolean
}

export function KhagolPlanet({
  progress = 0,
  onMainClick,
  onPlanetClick,
  onPlanetHover,
  reducedMotion = false
}: KhagolPlanetProps) {
  const meshRef = useRef<Mesh | null>(null)
  const shellRef = useRef<Mesh | null>(null)
  const ringClusterRef = useRef<Group | null>(null)
  const haloRef = useRef<Mesh | null>(null)
  const pressStartRef = useRef<{ x: number; y: number } | null>(null)
  const logoMap = useTexture('/logo.png')
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.22

    if (shellRef.current) {
      const portal = Math.min(Math.max((progress - 0.22) / 0.28, 0), 1)
      const pulse = 1.16 + Math.sin(state.clock.elapsedTime * 0.9) * 0.03 + portal * 0.18
      shellRef.current.scale.setScalar(pulse)
    }

    if (ringClusterRef.current) {
      const portal = Math.min(Math.max((progress - 0.18) / 0.34, 0), 1)
      ringClusterRef.current.rotation.z += delta * (reducedMotion ? 0.02 : 0.05 + portal * 0.08)
      ringClusterRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.08 + portal * 0.18
      ringClusterRef.current.scale.setScalar(1 + portal * 0.18)
    }

    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05 + progress * 0.15
      meshRef.current.scale.setScalar(1 + progress * 0.08 + (isHovered ? 0.06 : 0))
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(1.5 + (isHovered ? 0.12 : 0))
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerDown={(event) => {
          pressStartRef.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerUp={(event) => {
          const start = pressStartRef.current
          pressStartRef.current = null
          const deltaX = start ? Math.abs(event.clientX - start.x) : 0
          const deltaY = start ? Math.abs(event.clientY - start.y) : 0
          if (deltaX < 10 && deltaY < 10 && onMainClick) {
            onMainClick()
          }
        }}
        onPointerEnter={() => {
          setIsHovered(true)
          if (onPlanetHover) onPlanetHover(null)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          setIsHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[1.26, 128, 128]} />
        <meshStandardMaterial
          color="#142449"
          metalness={0.24}
          roughness={0.28}
          emissive="#60a5fa"
          emissiveIntensity={isHovered ? 0.82 : 0.5}
          map={logoMap}
        />
      </mesh>

      <mesh ref={shellRef} scale={[1.16, 1.16, 1.16]}>
        <sphereGeometry args={[1.28, 64, 64]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.2} />
      </mesh>

      <mesh ref={haloRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1.2, 42, 42]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={isHovered ? 0.11 : 0.06} />
      </mesh>

      <group ref={ringClusterRef}>
        <Ring args={[2.2, 2.28, 120]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#67e8f9"
            emissiveIntensity={0.7}
            transparent
            opacity={0.64}
          />
        </Ring>

        <Ring args={[2.46, 2.5, 120]} rotation={[Math.PI / 2.05, 0.22, 0]}>
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.34} />
        </Ring>
      </group>

      {PLANETS.map((planet) => (
        <group key={planet.id} rotation={[planet.tiltX, planet.tiltY, 0]}>
          <Ring
            args={[planet.radius, planet.radius + 0.016, 120]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial color={planet.color} transparent opacity={0.38} />
          </Ring>
          <OrbitingPlanet
            planet={planet}
            progress={progress}
            reducedMotion={reducedMotion}
            onHover={(section) => onPlanetHover && onPlanetHover(section)}
            onClick={(section) => onPlanetClick && onPlanetClick(section)}
          />
        </group>
      ))}
    </group>
  )
}
