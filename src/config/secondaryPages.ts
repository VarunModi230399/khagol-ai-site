export const SECONDARY_PAGES = {
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
