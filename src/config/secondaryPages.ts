export const SECONDARY_PAGES = {
  core: {
    title: 'KHAGOL Core',
    kicker: 'Central Intelligence System',
    intro: 'The strategic and technical center of the KHAGOL AI universe.',
    description:
      'This page represents the core KHAGOL AI system: the place where strategy, machine learning, data, and automation are unified into one execution model. It serves as the central product narrative for the main planet in the hero experience.',
    sections: [
      {
        title: 'What The Core Represents',
        items: [
          'A unified operating model for AI strategy, data foundations, ML systems, and automation.',
          'A central decision layer designed to keep technical systems aligned with real business objectives.',
          'A premium systems-thinking approach where every orbiting service connects back to one coherent platform vision.'
        ]
      },
      {
        title: 'Core Capabilities',
        items: [
          'Strategic planning and architecture alignment',
          'Integrated intelligence workflows across teams and tools',
          'Execution governance for real production delivery'
        ]
      }
    ],
    ctaTitle: 'Enter The KHAGOL Core',
    ctaBody:
      'Use this page as the dedicated destination for the central planet and the main platform story behind the KHAGOL AI universe.'
  },
  projects: {
    title: 'Projects',
    kicker: 'Archive Nebula',
    intro: 'Selected KHAGOL AI systems and delivery patterns.',
    description:
      'This placeholder page is ready for case studies, delivery snapshots, and flagship systems that demonstrate how KHAGOL AI turns intelligence strategy into shipped outcomes.',
    sections: [
      {
        title: 'Featured Case Studies',
        items: [
          'Placeholder enterprise transformation story with AI strategy, data foundations, and operational automation.',
          'Placeholder machine learning delivery story focused on model reliability, observability, and production rollout.',
          'Placeholder workflow orchestration story showing cross-platform automation and agentic coordination.'
        ]
      },
      {
        title: 'What We Showcase',
        items: [
          'Business context and measurable objectives',
          'Architecture and system design choices',
          'Delivery process, outcomes, and operating lessons'
        ]
      }
    ],
    ctaTitle: 'Discuss a Similar Build',
    ctaBody:
      'Use this page as the future home for KHAGOL AI case studies, flagship launches, and productized proof points.'
  },
  contact: {
    title: 'Contact',
    kicker: 'Transmission Field',
    intro: 'Start a conversation from inside the KHAGOL universe.',
    description:
      'This placeholder page is designed for consultation inquiries, project discovery, and strategic conversations around AI systems, machine learning, data platforms, and automation.',
    sections: [
      {
        title: 'Typical Inquiry Topics',
        items: [
          'AI strategy and roadmap definition',
          'Production ML system design and rollout',
          'Data platform modernization and observability',
          'Automation architecture and intelligent workflow design'
        ]
      },
      {
        title: 'How We Engage',
        items: [
          'Focused discovery conversations',
          'Architecture and opportunity assessments',
          'Delivery partnerships for strategy through implementation'
        ]
      }
    ],
    ctaTitle: 'Open the Channel',
    ctaBody:
      'Use the placeholder contact details below for consultation booking, partnership inquiries, or product exploration.'
  }
} as const

export type SecondaryPageKey = keyof typeof SECONDARY_PAGES
