// src/types/planet.ts
export type SectionKey = 'home' | 'strategy' | 'ml' | 'data' | 'auto'
export type ServiceSectionKey = Exclude<SectionKey, 'home'>

export interface PlanetConfig {
  id: string
  name: string
  color: string
  radius: number
  angle: number
  speed: number
  tiltX: number
  tiltY: number
  content: string
  section: ServiceSectionKey
}

/** What can be selected by clicking in the solar system */
export type SelectedTarget =
  | { type: 'main' } // main KHAGOL planet
  | { type: 'planet'; section: ServiceSectionKey } // orbiting planet
  | null
