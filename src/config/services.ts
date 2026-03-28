import type { ServiceSectionKey } from '../types/planet'

export interface ServicePageContent {
  title: string
  kicker: string
  intro: string
  description: string
  offerings: string[]
  useCases: string[]
  process: string[]
  benefits: string[]
  ctaTitle: string
  ctaBody: string
}

export const SERVICE_PAGE_CONTENT: Record<ServiceSectionKey, ServicePageContent> = {
  strategy: {
    title: 'AI Strategy',
    kicker: 'Strategy Service',
    intro: 'Build an AI roadmap grounded in real operational outcomes.',
    description:
      'KHAGOL AI helps leadership teams define where AI creates durable business value, how initiatives should be prioritized, and what execution model is required to ship with confidence.',
    offerings: [
      'Executive alignment workshops and opportunity framing',
      'Use-case prioritization with value/effort modeling',
      'AI operating model and governance design',
      'Roadmaps linking strategy to implementation milestones'
    ],
    useCases: [
      'Portfolio-level AI investment planning',
      'Business unit modernization programs',
      'Cross-functional transformation initiatives'
    ],
    process: [
      'Current-state assessment and stakeholder interviews',
      'Opportunity architecture and prioritization matrix',
      'Roadmap definition with execution guardrails'
    ],
    benefits: [
      'Faster decision confidence for AI investments',
      'Lower risk from clear sequencing and governance',
      'Direct line of sight from strategy to measurable value'
    ],
    ctaTitle: 'Plan Your AI Direction',
    ctaBody: 'Book a strategy consultation to map your next 12 months of AI execution.'
  },
  ml: {
    title: 'ML Systems',
    kicker: 'Machine Learning Service',
    intro: 'Production-grade machine learning engineered for reliability.',
    description:
      'We design and deliver ML systems that move beyond pilots. From model development to deployment and monitoring, every layer is built for real-world stability and iteration.',
    offerings: [
      'Custom model development and evaluation frameworks',
      'MLOps pipelines with reproducible training/deployment',
      'Model quality monitoring and performance diagnostics',
      'Integration with business applications and workflows'
    ],
    useCases: [
      'Forecasting and demand intelligence',
      'NLP-powered enterprise knowledge workflows',
      'Computer vision for quality and process control'
    ],
    process: [
      'Data and objective alignment for model design',
      'Iterative model development with validation checkpoints',
      'Deployment, monitoring, and continuous optimization'
    ],
    benefits: [
      'Reduced model drift through observability',
      'Improved delivery velocity with reusable pipelines',
      'Higher trust through measurable quality standards'
    ],
    ctaTitle: 'Launch Production ML',
    ctaBody: 'Discuss your ML roadmap and identify the shortest path to dependable production systems.'
  },
  data: {
    title: 'Data Platforms',
    kicker: 'Data Service',
    intro: 'Create the data backbone required for intelligent operations.',
    description:
      'KHAGOL AI designs modern data platforms that unify collection, transformation, and access so analytics and AI programs can scale with confidence.',
    offerings: [
      'Data architecture and platform modernization',
      'Pipeline design for batch and real-time workloads',
      'Observability, quality controls, and lineage practices',
      'Decision-ready reporting and analytics layers'
    ],
    useCases: [
      'Executive-grade operational intelligence',
      'Customer behavior and lifecycle analytics',
      'Cross-platform data unification initiatives'
    ],
    process: [
      'Data landscape audit and architecture mapping',
      'Platform blueprint and pipeline implementation',
      'Governance rollout with reliability metrics'
    ],
    benefits: [
      'Higher data trust across teams',
      'Faster analytics delivery cycles',
      'Strong foundation for AI and automation systems'
    ],
    ctaTitle: 'Modernize Your Data Core',
    ctaBody: 'Start with a platform assessment and get a practical blueprint for data-driven growth.'
  },
  auto: {
    title: 'Automation Systems',
    kicker: 'Automation Service',
    intro: 'Turn strategy into execution through intelligent workflows.',
    description:
      'We build automation systems that integrate AI outputs directly into business operations, reducing manual bottlenecks and increasing execution speed.',
    offerings: [
      'Workflow automation architecture and implementation',
      'Cross-system integrations (CRM, ERP, internal tools)',
      'Agentic process design and orchestration logic',
      'Operational dashboards and control layers'
    ],
    useCases: [
      'Sales and revenue operations automation',
      'Internal service workflows and approvals',
      'Customer support acceleration with AI agents'
    ],
    process: [
      'Process mapping and bottleneck identification',
      'Automation blueprint and incremental rollout',
      'Performance monitoring and iterative tuning'
    ],
    benefits: [
      'Lower operational drag across teams',
      'More consistent execution quality',
      'Faster throughput with measurable ROI'
    ],
    ctaTitle: 'Automate High-Value Workflows',
    ctaBody: 'Explore where orchestration and AI can unlock immediate operational leverage.'
  }
}
