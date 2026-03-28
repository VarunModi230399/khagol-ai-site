import type { ServiceSectionKey } from '../types/planet'

export type PlanetDestinationKey = ServiceSectionKey | 'core'

// Editable placeholder for founder/owner display name.
export const OWNER_NAME = '[Your Name]'

export const SERVICES_OVERVIEW: {
  key: ServiceSectionKey
  title: string
  summary: string
  accent: string
  href: string
}[] = [
  {
    key: 'strategy',
    title: 'Strategy',
    summary:
      'Define measurable AI priorities, operating models, and execution roadmaps tailored to your business reality.',
    accent: '#67e8f9',
    href: '/services/strategy'
  },
  {
    key: 'ml',
    title: 'ML Systems',
    summary:
      'Design and deploy robust machine learning products with clear ownership, quality gates, and production reliability.',
    accent: '#93c5fd',
    href: '/services/ml'
  },
  {
    key: 'data',
    title: 'Data Platforms',
    summary:
      'Build clean, observable data foundations that power analytics, model performance, and confident decision-making.',
    accent: '#c4b5fd',
    href: '/services/data'
  },
  {
    key: 'auto',
    title: 'Automation',
    summary:
      'Connect intelligence to execution through agentic workflows, internal tooling, and process automation systems.',
    accent: '#a7f3d0',
    href: '/services/auto'
  }
]

export const PLANETARY_DESTINATIONS: Record<
  PlanetDestinationKey,
  {
    title: string
    summary: string
    route: string
    accent: string
    tag: string
  }
> = {
  core: {
    title: 'KHAGOL Core',
    summary:
      'The central intelligence system linking strategy, machine learning, data, and automation into one operating model.',
    route: '/core',
    accent: '#fbbf24',
    tag: 'Core System'
  },
  strategy: {
    title: 'Strategy',
    summary:
      'Roadmaps, operating models, and decision frameworks that turn AI ambition into an executable direction.',
    route: '/services/strategy',
    accent: '#67e8f9',
    tag: 'Command Layer'
  },
  ml: {
    title: 'ML Systems',
    summary:
      'Production-grade machine learning design, deployment, monitoring, and delivery systems.',
    route: '/services/ml',
    accent: '#93c5fd',
    tag: 'Model Engine'
  },
  data: {
    title: 'Data Platforms',
    summary:
      'Modern data foundations that make analytics, AI, and operational decisions more reliable.',
    route: '/services/data',
    accent: '#c4b5fd',
    tag: 'Signal Grid'
  },
  auto: {
    title: 'Automation',
    summary:
      'Intelligent workflow orchestration that connects insights to action across tools and teams.',
    route: '/services/auto',
    accent: '#a7f3d0',
    tag: 'Motion System'
  }
}

export const PROJECT_HIGHLIGHTS = [
  {
    title: 'Operational AI Control Rooms',
    description:
      'Placeholder showcase for enterprise environments where live data, ML, and automation converge into one decision layer.'
  },
  {
    title: 'Agentic Workflow Networks',
    description:
      'Placeholder showcase for cross-system orchestration that reduces manual throughput and improves execution consistency.'
  },
  {
    title: 'Intelligence Platform Foundations',
    description:
      'Placeholder showcase for data platforms, monitoring, and AI readiness systems designed for long-term growth.'
  }
]

export const PROCESS_STEPS = [
  {
    title: 'Discovery',
    description:
      'We map strategic intent, data landscape, technical constraints, and business outcomes before writing a single model line.'
  },
  {
    title: 'Strategy',
    description:
      'We define architecture choices, prioritization logic, and governance so every initiative has an execution path.'
  },
  {
    title: 'Build',
    description:
      'We ship production-oriented systems with modular engineering, measurable milestones, and tight stakeholder loops.'
  },
  {
    title: 'Optimize',
    description:
      'We iterate using monitoring, model diagnostics, and operating metrics to improve reliability and business impact over time.'
  }
]

export const CAPABILITY_CARDS = [
  {
    title: 'AI Opportunity Mapping',
    description:
      'Prioritized opportunity portfolios with feasibility, value estimates, and implementation sequencing.'
  },
  {
    title: 'Production ML Pipelines',
    description:
      'Training, evaluation, and deployment pipelines with observability and robust CI/CD integration.'
  },
  {
    title: 'Decision Intelligence',
    description:
      'Real-time data products and analytics layers that turn fragmented signals into clear operational actions.'
  },
  {
    title: 'Workflow Orchestration',
    description:
      'Automation systems spanning APIs, CRMs, ERPs, and custom tools to reduce friction across teams.'
  }
]

export const WHY_KHAGOL = [
  'Consultancy-grade strategic rigor with engineering-level execution depth.',
  'Systems built for business reliability, not demo-only output.',
  'Lean teams, direct collaboration, and clear ownership from day one.',
  'Premium communication cadence with transparent milestones and outcomes.'
]

export const TESTIMONIALS = [
  {
    quote:
      'KHAGOL AI translated high-level AI ambition into a concrete roadmap and delivered production-ready systems faster than expected.',
    person: 'VP Product, Enterprise SaaS'
  },
  {
    quote:
      'Their team brought clarity to our data chaos and built a machine learning workflow our operations group could actually trust.',
    person: 'Director of Analytics, Fintech'
  },
  {
    quote:
      'From strategy workshops to automation rollout, execution quality stayed consistently exceptional.',
    person: 'COO, Digital Services Group'
  }
]

export const FAQ_ITEMS = [
  {
    question: 'How do engagements typically start?',
    answer:
      'Most engagements start with a focused discovery sprint to align goals, baseline systems, and define a practical execution path.'
  },
  {
    question: 'Do you work with existing internal teams?',
    answer:
      'Yes. KHAGOL AI can lead delivery directly or operate as an embedded strategic and technical partner alongside internal teams.'
  },
  {
    question: 'Can you support both strategy and implementation?',
    answer:
      'Yes. Our model combines roadmap definition, architecture design, and production implementation within one delivery stream.'
  },
  {
    question: 'What company sizes do you work with?',
    answer:
      'We support ambitious startups through mature enterprises where AI, data, and automation can create measurable leverage.'
  }
]
