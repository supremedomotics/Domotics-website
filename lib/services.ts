export const SITE_URL = "https://www.supremedomotics.in"

export type ServiceCapability = {
  title: string
  description: string
}

export type Service = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  headline: string
  summary: string
  cardDescription: string
  image: string
  imageAlt: string
  metaTitle: string
  metaDescription: string
  capabilities: ServiceCapability[]
  technologyIntro: string
  technologies: string[]
  architectureCopy: string
  workCopy: string
  related: string[]
  projectReference?: boolean
}

export const SERVICES: Service[] = [
  {
    slug: "smart-lighting-control",
    title: "Smart Lighting & Lighting Control",
    shortTitle: "Smart Lighting",
    eyebrow: "Light, considered",
    headline: "Lighting that responds to architecture and life.",
    summary:
      "Lighting shapes how a room feels throughout the day. We plan its control alongside the architecture, luminaires and rhythms of the people who live there, bringing practical operation and expressive scenes together.",
    cardDescription:
      "Architectural lighting control, considered scenes and carefully coordinated dimming for the way a home is lived in.",
    image: "/images/project-lighting.png",
    imageAlt: "A contemporary residence and garden illuminated at dusk",
    metaTitle: "Smart Lighting & Lighting Control in Mumbai | Supreme Domotics",
    metaDescription:
      "Explore architectural lighting control by Supreme Domotics in Mumbai, including KNX, DALI and Casambi integration, considered scenes and residential lighting design.",
    capabilities: [
      {
        title: "Architectural lighting control",
        description:
          "A considered control plan for the luminaires, circuits and spaces that make up a residence, coordinated with the wider electrical design.",
      },
      {
        title: "Scenes for everyday living",
        description:
          "Set welcoming, reading, entertaining and evening moods with intuitive scenes that bring several lighting zones together in a single action.",
      },
      {
        title: "Flexible light quality",
        description:
          "Dimming and tunable-white control can be included where the selected luminaires and control equipment support it. Human Centric Lighting applications are considered where they suit the brief.",
      },
      {
        title: "Clear, considered interfaces",
        description:
          "Keypads and other interfaces are planned around the way a room is used, with lighting controls able to sit alongside other home systems where appropriate.",
      },
    ],
    technologyIntro:
      "The right control approach depends on the lighting design, selected equipment and project requirements. We work with wired and wireless options and define how each will operate within the wider home.",
    technologies: ["KNX lighting control", "DALI integration", "Casambi wireless control", "Scene-based control"],
    architectureCopy:
      "Lighting control works best when it is part of the design conversation early. We coordinate with interior designers, lighting designers, luminaire suppliers and electrical teams so that switching, dimming, keypads and scenes make sense in the finished spaces.",
    workCopy:
      "We begin by understanding the lighting intent and daily routines, then map the zones, control points and scenes. After equipment coordination and installation, we programme, test and commission the system with the project team and homeowner.",
    related: ["home-automation", "system-integration", "outdoor-automation"],
    projectReference: true,
  },
  {
    slug: "home-automation",
    title: "Whole-Home Automation",
    shortTitle: "Home Automation",
    eyebrow: "A home in concert",
    headline: "One home. Intelligently connected.",
    summary:
      "A well-automated home feels simple to use. We bring supported systems into a coherent control experience shaped around the property, the people who live there and the way each space is used.",
    cardDescription:
      "A considered control experience for lighting, shading, climate, entertainment and other supported home systems.",
    image: "/images/project-living.png",
    imageAlt: "An elegant residence interior designed for relaxed everyday living",
    metaTitle: "Whole-Home Automation in Mumbai | Supreme Domotics",
    metaDescription:
      "Supreme Domotics designs whole-home automation for luxury residences in Mumbai, bringing supported lighting, shading, climate, AV and security systems together.",
    capabilities: [
      {
        title: "Centralised control",
        description:
          "Bring selected lighting, motorised curtains and blinds, climate, entertainment, security, gates and outdoor systems into a clear, unified interface.",
      },
      {
        title: "Scenes, schedules and events",
        description:
          "Create scenes that coordinate supported systems and schedules or event-based actions that suit the household’s routines and the home’s operating needs.",
      },
      {
        title: "Interfaces that feel natural",
        description:
          "Keypads, touch interfaces and mobile control are arranged to make everyday actions easy to find, with feedback that helps people understand the system’s state.",
      },
      {
        title: "Reliable operation",
        description:
          "Clear system architecture, suitable equipment selection, two-way feedback where supported, and thoughtful commissioning help make the experience dependable.",
      },
    ],
    technologyIntro:
      "Automation is not a promise that every device or protocol can work with every other one. We establish compatibility against the selected equipment, available interfaces and the actual requirements of the project.",
    technologies: ["Lighting and scenes", "Curtains and blinds", "Climate and AV", "Security and access"],
    architectureCopy:
      "Automation planning starts alongside electrical, interior and services coordination. We map user journeys, control locations and system dependencies early, so technology supports the architecture instead of competing with it.",
    workCopy:
      "From the first brief, we define what should be connected and how it should behave. The agreed design becomes a coordinated installation and programming plan, followed by system testing, homeowner handover and ongoing support.",
    related: ["smart-lighting-control", "system-integration", "networking-infrastructure"],
  },
  {
    slug: "home-theatre-av",
    title: "Home Theatre & Audio Visual",
    shortTitle: "Home Theatre & AV",
    eyebrow: "Entertainment, composed",
    headline: "Entertainment, designed around the experience.",
    summary:
      "A memorable listening or viewing room is more than a collection of equipment. We bring room, sound, image and control into one considered experience, from a dedicated cinema to entertainment integrated into everyday living.",
    cardDescription:
      "Immersive cinema, considered audio and intuitive AV control, planned around the room and the experience.",
    image: "/images/home-theatre.webp",
    imageAlt: "A dedicated residential cinema with carefully placed seating and projection",
    metaTitle: "Home Theatre & Audio Visual in Mumbai | Supreme Domotics",
    metaDescription:
      "Design-led home theatre and AV integration in Mumbai, including Dolby Atmos, projection, multi-room audio and entertainment control by Supreme Domotics.",
    capabilities: [
      {
        title: "Dedicated home theatre",
        description:
          "A cinema experience shaped around room proportions, seating, speaker layout, display or projection, equipment and the intended listening experience.",
      },
      {
        title: "Immersive audio",
        description:
          "Dolby Atmos system design, speaker and subwoofer selection, placement and acoustic coordination are considered together, not as separate decisions.",
      },
      {
        title: "Audio throughout the home",
        description:
          "Multi-room audio, architectural and invisible speakers, living-room entertainment and outdoor audio can be planned as part of the wider AV brief.",
      },
      {
        title: "Control that disappears into the experience",
        description:
          "AV equipment and sources can be integrated with the home’s control interface where supported, so the system is straightforward to use day to day.",
      },
    ],
    technologyIntro:
      "Display and projection choices, source equipment, loudspeakers and control are selected for the room and brief. Integration is confirmed against equipment capabilities and the system architecture.",
    technologies: ["Dolby Atmos", "Projection and displays", "Multi-room audio", "Architectural speakers"],
    architectureCopy:
      "Room acoustics, speaker positions, screen sightlines, seating, ventilation and equipment access all influence the result. We coordinate with architects and interior teams early, including acoustic treatment where it is part of the design.",
    workCopy:
      "We first understand how the room should feel and be used. The design then brings together acoustics, layout, equipment and control before installation, calibration, commissioning and a practical handover.",
    related: ["home-automation", "networking-infrastructure", "system-integration"],
  },
  {
    slug: "security-access-control",
    title: "Security & Access Control",
    shortTitle: "Security Systems",
    eyebrow: "Confidence, thoughtfully planned",
    headline: "Intelligent protection. Thoughtfully integrated.",
    summary:
      "Security is most useful when it is planned around the property and its occupants. We coordinate surveillance, detection and access technologies into a clear, practical system without overstating what any single measure can guarantee.",
    cardDescription:
      "Surveillance, detection and access solutions designed around the property and its everyday use.",
    image: "/images/security-camera.webp",
    imageAlt: "A discreet security camera installed in a contemporary residence",
    metaTitle: "Residential Security & Access Control in Mumbai | Supreme Domotics",
    metaDescription:
      "Plan CCTV, intrusion detection, smart entry, gate automation and integrated security for luxury homes in Mumbai with Supreme Domotics.",
    capabilities: [
      {
        title: "Surveillance and detection",
        description:
          "CCTV, video surveillance, intrusion detection and wired or wireless sensors are planned for the property’s layout, operating requirements and privacy considerations.",
      },
      {
        title: "Entry and access",
        description:
          "Smart entry, access control, video door phones and gate automation can support a considered arrival experience for residents and visitors.",
      },
      {
        title: "Perimeter planning",
        description:
          "Perimeter protection and electric fencing integration may be considered where appropriate to the site, local requirements and the broader security plan.",
      },
      {
        title: "Useful notifications",
        description:
          "Security alerts and selected integrations can help owners understand events and coordinate supported systems, while keeping the system’s state clear.",
      },
    ],
    technologyIntro:
      "The final design depends on the site, equipment capabilities, connectivity and the level of integration required. No system can guarantee that an intrusion will be prevented.",
    technologies: ["CCTV and video surveillance", "Intrusion detection", "Video door phones", "Access and gate control"],
    architectureCopy:
      "We coordinate camera views, sensor positions, access points and equipment locations with the architecture, landscape, electrical and network plans. Privacy, service access and day-to-day usability remain part of the discussion.",
    workCopy:
      "We review the property and its requirements, develop a coordinated security and access plan, then oversee installation and integration. Commissioning checks operation and notifications, followed by a clear handover to the people who will use it.",
    related: ["networking-infrastructure", "home-automation", "outdoor-automation"],
  },
  {
    slug: "networking-infrastructure",
    title: "Networking & Digital Infrastructure",
    shortTitle: "Networking & WiFi",
    eyebrow: "The foundation beneath it all",
    headline: "The invisible foundation of a connected home.",
    summary:
      "The network is the quiet infrastructure behind connected living. Careful planning helps provide the coverage, capacity and separation that automation, audio visual and security systems depend on.",
    cardDescription:
      "Structured connectivity, thoughtful Wi-Fi coverage and network infrastructure planned for connected homes.",
    image: "/images/architecture-plans.webp",
    imageAlt: "Architectural plans used to coordinate a residence’s digital infrastructure",
    metaTitle: "Home Networking & Wi-Fi in Mumbai | Supreme Domotics",
    metaDescription:
      "Supreme Domotics plans structured networks, Wi-Fi coverage, switching, routing and connected infrastructure for luxury homes in Mumbai.",
    capabilities: [
      {
        title: "Structured connectivity",
        description:
          "Wired and wireless connectivity is planned around the residence, its equipment and the systems that need dependable access across each space.",
      },
      {
        title: "Wi-Fi coverage planning",
        description:
          "Coverage is considered across large residences and estates, with attention to building materials, outdoor areas, access point placement and expected use.",
      },
      {
        title: "A considered equipment environment",
        description:
          "Network racks, switching and routing are organised for serviceability and capacity, with enterprise-grade equipment where the project calls for it.",
      },
      {
        title: "Segmentation and ongoing care",
        description:
          "Network segmentation can help organise different classes of devices. Monitoring and troubleshooting support a clearer view of network health over time.",
      },
    ],
    technologyIntro:
      "Network architecture is sized to the property and the systems it needs to support. Segmentation, equipment and monitoring choices are based on the project’s security, performance and maintenance requirements.",
    technologies: ["Structured cabling", "Professional Wi-Fi", "Switching and routing", "Network segmentation"],
    architectureCopy:
      "A dependable network begins with early coordination: cable pathways, rack locations, power, ventilation and access for future service. We work with the project team to place infrastructure where it can perform and remain maintainable.",
    workCopy:
      "We assess the property, usage and connected systems, then produce a coverage and infrastructure plan. Installation is followed by configuration, coverage checks, integration testing and guidance for ongoing monitoring and troubleshooting.",
    related: ["home-automation", "home-theatre-av", "security-access-control"],
  },
  {
    slug: "system-integration",
    title: "System Integration & Control",
    shortTitle: "Integration & Control",
    eyebrow: "Engineering a coherent whole",
    headline: "Different technologies. One coherent experience.",
    summary:
      "A unified experience depends on sound engineering behind the interface. Supreme Domotics works as the design and integration partner, coordinating supported technologies without claiming to manufacture the systems themselves.",
    cardDescription:
      "Engineering and integration that brings supported home technologies into a clear, maintainable control experience.",
    image: "/images/design-integration.webp",
    imageAlt: "Technology plans coordinated with the design of a contemporary home",
    metaTitle: "Smart Home System Integration in Mumbai | Supreme Domotics",
    metaDescription:
      "Supreme Domotics engineers supported KNX, DALI, Casambi, AV and security integrations into coherent, maintainable home control systems in Mumbai.",
    capabilities: [
      {
        title: "Protocol and gateway integration",
        description:
          "KNX, DALI, Casambi, Zigbee and Matter may be integrated where supported by the selected products, gateways and project requirements.",
      },
      {
        title: "Cross-system coordination",
        description:
          "Lighting, AV, entertainment, security and access systems are brought together through a clearly defined control and integration architecture.",
      },
      {
        title: "A clear user experience",
        description:
          "Unified interfaces are designed around meaningful actions, with two-way communication and state feedback included where the connected equipment supports it.",
      },
      {
        title: "Commissioning and maintainability",
        description:
          "System diagnostics, commissioning and troubleshooting help make the installation understandable and supportable beyond the initial handover.",
      },
    ],
    technologyIntro:
      "Interoperability is established system by system. We verify supported functions, interfaces and gateways, then document how the components communicate and what feedback is available.",
    technologies: ["KNX and DALI", "Casambi", "Zigbee and Matter where supported", "AV and security interfaces"],
    architectureCopy:
      "Good integration begins with an agreed architecture: clear system boundaries, communication paths, control responsibilities and equipment locations. We collaborate with project teams and technology manufacturers as the engineering and integration partner.",
    workCopy:
      "We document the system intent and interfaces, validate equipment compatibility, then coordinate programming and integration. Testing, diagnostics and commissioning confirm expected behaviour before a maintainable handover.",
    related: ["smart-lighting-control", "home-automation", "networking-infrastructure"],
  },
  {
    slug: "outdoor-automation",
    title: "Outdoor & Estate Automation",
    shortTitle: "Outdoor & Estate Automation",
    eyebrow: "Beyond the threshold",
    headline: "Intelligence beyond the walls.",
    summary:
      "The experience of a home continues outdoors. We plan connected systems across gardens, terraces, pools and estate grounds, with particular attention to the scale and varied conditions of villas, large residences and hospitality environments.",
    cardDescription:
      "Connected lighting, gates, pools, audio and security across gardens, villas and estate environments.",
    image: "/images/outdoor-lighting.webp",
    imageAlt: "Landscape lighting illuminating a contemporary garden and pathway",
    metaTitle: "Outdoor & Estate Automation in Mumbai | Supreme Domotics",
    metaDescription:
      "Plan landscape lighting, gates, irrigation, pool systems, outdoor audio and estate connectivity with Supreme Domotics in Mumbai and beyond.",
    capabilities: [
      {
        title: "Landscape and pathway lighting",
        description:
          "Outdoor lighting is planned to support wayfinding, landscape character and the transition between indoor and outdoor spaces.",
      },
      {
        title: "Estate systems and arrival",
        description:
          "Automated gates, irrigation and pool systems can be integrated where the selected equipment and project requirements support it.",
      },
      {
        title: "Outdoor entertainment and connectivity",
        description:
          "Outdoor audio and network coverage help extend entertainment and connected control to terraces, gardens and other planned areas.",
      },
      {
        title: "Perimeter and integrated control",
        description:
          "Perimeter security and selected outdoor systems can be coordinated with the wider home control environment for a more connected property.",
      },
    ],
    technologyIntro:
      "Outdoor integration depends on site conditions, equipment and system interfaces. We coordinate the required connectivity and controls with the landscape, electrical and other project plans.",
    technologies: ["Landscape lighting", "Gate and access systems", "Irrigation and pool interfaces", "Outdoor audio and network"],
    architectureCopy:
      "Outdoor systems need to respect the landscape plan, planting, pathways, drainage and the realities of weather and maintenance. We coordinate with architects, landscape designers and services teams to create a joined-up indoor–outdoor plan.",
    workCopy:
      "We understand how the outdoor spaces are used, map the systems and coverage required, and coordinate the design with the site plan. Installation and integration are followed by testing, commissioning and a practical handover.",
    related: ["smart-lighting-control", "home-automation", "security-access-control"],
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug)
}
