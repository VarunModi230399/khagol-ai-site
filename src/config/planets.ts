// src/config/planets.ts
import type { PlanetConfig, SectionKey } from '../types/planet'

export const PLANETS: PlanetConfig[] = [
  {
    id: 'strategy',
    name: 'Strategy',
    color: '#1e3a8a',
    radius: 3.2,
    angle: 0,
    speed: 0.15,
    tiltX: 0.52,
    tiltY: 0,
    content: 'AI Strategy Consulting',
    section: 'strategy'
  },
  {
    id: 'ml',
    name: 'ML',
    color: '#0d47a1',
    radius: 3.5,
    angle: Math.PI / 2,
    speed: 0.12,
    tiltX: -0.35,
    tiltY: 0,
    content: 'Machine Learning Solutions',
    section: 'ml'
  },
  {
    id: 'data',
    name: 'Data',
    color: '#1565c0',
    radius: 3.8,
    angle: Math.PI,
    speed: 0.18,
    tiltX: 0.78,
    tiltY: 0.3,
    content: 'Data Science & Analytics',
    section: 'data'
  },
  {
    id: 'auto',
    name: 'Auto',
    color: '#1e88e5',
    radius: 4.0,
    angle: Math.PI * 1.5,
    speed: 0.14,
    tiltX: -0.78,
    tiltY: -0.2,
    content: 'Automation & RPA',
    section: 'auto'
  },
  // ── AI AGENTS: 5th planet — amber/gold, outermost orbit ──────────────────────
  {
    id: 'agents',
    name: 'Agents',
    color: '#f59e0b',
    radius: 4.4,
    angle: Math.PI * 0.75,
    speed: 0.11,
    tiltX: 0.45,
    tiltY: 0.4,
    content: 'AI Agents & Autonomous Systems',
    section: 'agents'
  }
]

export const SECTIONS: Record<SectionKey, string> = {
  home: 'KHAGOL AI - Transformative AI Consultancy\n\nNavigate our solar system to explore our core services.',
  // ── AI AGENTS ─────────────────────────────────────────────────────────────────
  agents:
    'AI AGENTS\n\nDeployed autonomous agents for real-world tasks\nFamily Admin Agent\nEmail Automation Agent\nMore agents launching soon',
  strategy:
    'AI STRATEGY\n\nComprehensive AI roadmap development\nBusiness transformation consulting\nTechnology assessment & selection\nROI maximization strategies',
  ml: 'MACHINE LEARNING\n\nCustom ML model development\nPredictive analytics solutions\nComputer vision & NLP\nMLOps & model deployment',
  data:
    'DATA SCIENCE\n\nAdvanced analytics platforms\nBig data processing pipelines\nReal-time data visualization\nAI-driven insights generation',
  auto:
    'AUTOMATION\n\nRPA & intelligent process automation\nWorkflow optimization\nCognitive automation solutions\nEnd-to-end process transformation'
}
