export const SITE_URL = "https://www.supremedomotics.in"

export type ServiceCapability = {
  title: string
  description: string
}

export type ServiceStage = {
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
  supportingImage?: string
  supportingImageAlt?: string
  metaTitle: string
  metaDescription: string
  capabilities: ServiceCapability[]
  technologyIntro: string
  technologies: string[]
  architectureCopy: string
  workCopy: string
  deliveryStages: ServiceStage[]
  deliverables: string[]
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
      "Lighting shapes how a room feels throughout the day. We plan circuits, zones and control around the architecture, selected luminaires and daily routines, bringing practical operation and expressive scenes together.",
    cardDescription:
      "Architectural lighting control, considered scenes and carefully coordinated dimming for the way a home is lived in.",
    image: "/images/smart-lighting-hero.webp",
    imageAlt: "Illustrative luxury residence interior with layered cove lighting, warm wall washes and architectural luminaires",
    metaTitle: "Smart Lighting & Lighting Control in Mumbai | Supreme Domotics",
    metaDescription:
      "Plan residential lighting circuits, KNX, DALI and Casambi control, dimming, scenes and keypads with Supreme Domotics in Mumbai.",
    capabilities: [
      {
        title: "Circuits, zones and load planning",
        description:
          "We translate the lighting intent into workable circuits and room-by-room zones, checking proposed loads against the selected control channels and equipment capacity.",
      },
      {
        title: "Luminaire and dimmer compatibility",
        description:
          "LED drivers, dimmers and control gear are checked together for supported dimming behaviour and project requirements before the control approach is finalised.",
      },
      {
        title: "KNX, DALI and Casambi architecture",
        description:
          "KNX provides a wired bus-based option; DALI supports individually addressed control gear and configurable groups; Casambi provides a wireless approach. The fit depends on the build stage, wiring strategy, luminaires and maintenance brief.",
      },
      {
        title: "Scenes, tunable white and keypads",
        description:
          "Scenes, keypad locations and control points are planned around how each room is entered and used. Tunable white and Human Centric Lighting applications can be considered where the selected luminaires and control system support them.",
      },
    ],
    technologyIntro:
      "Lighting control starts with the actual fixture, driver and circuit—not a protocol label. We review dimming method and load limits, then define KNX switching or dimming, DALI addressing and grouping, or a Casambi wireless layout as appropriate. Wired and wireless strategies can suit different project stages; neither is assumed to be right for every home.",
    technologies: ["KNX wired lighting control", "DALI addressing and groups", "Casambi wireless control", "Scenes and supported tunable white"],
    architectureCopy:
      "We coordinate the lighting control philosophy with lighting designers, interior designers and electrical contractors. Early decisions on circuits, switching locations, keypad heights and luminaire drivers help avoid conflicts with joinery, finishes and the electrical installation.",
    workCopy:
      "The work moves from lighting intent and reflected plans into zone and circuit logic, equipment coordination and keypad placement. During installation we verify wiring and control gear, then address and group DALI devices where applicable, programme scenes, test dimming behaviour and guide the homeowner through the interfaces.",
    deliveryStages: [
      { title: "Read the lighting intent", description: "Review room use, reflected plans, fixture selections and the electrical design with the project team." },
      { title: "Resolve circuits and control", description: "Set zones, loads, dimming methods, system architecture and keypad locations against selected equipment." },
      { title: "Install and programme", description: "Coordinate installation, verify compatible control gear, then configure groups, scenes and interfaces." },
      { title: "Tune and hand over", description: "Check the experience in the finished rooms, refine supported scenes and explain everyday operation." },
    ],
    deliverables: [
      "Lighting control philosophy and system approach",
      "Lighting zone, circuit and control-channel schedules",
      "Keypad and control-point schedule",
      "DALI addressing, group and scene schedules where applicable",
    ],
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
      "A well-automated home feels simple to use because the engineering behind it is considered. We plan how selected systems communicate, how people control them and how the environment responds across rooms and routines.",
    cardDescription:
      "A considered control experience for lighting, shading, climate, entertainment and other supported home systems.",
    image: "/images/hero-villa.webp",
    imageAlt: "A contemporary villa with illuminated living spaces and landscaped grounds at dusk",
    metaTitle: "Whole-Home Automation in Mumbai | Supreme Domotics",
    metaDescription:
      "Supreme Domotics designs whole-home automation for luxury residences in Mumbai, coordinating supported lighting, shading, climate, AV and security systems.",
    capabilities: [
      {
        title: "A coherent system architecture",
        description:
          "We map which systems need to communicate, where control should be centralised and where distributed devices make more sense, based on the property and the selected equipment.",
      },
      {
        title: "Room-wise control across systems",
        description:
          "Lighting, curtains and blinds, climate and HVAC, entertainment and AV, security and access, gates and selected outdoor systems can be coordinated where their interfaces support it.",
      },
      {
        title: "Scenes, schedules and interfaces",
        description:
          "Scenes and scheduled actions are shaped around household routines, then presented through appropriately placed keypads, touch interfaces and mobile control.",
      },
      {
        title: "State feedback and maintainability",
        description:
          "Where equipment provides two-way state feedback, the interface can reflect what a system is doing. Clear boundaries, commissioning records and a considered handover support ongoing serviceability.",
      },
    ],
    technologyIntro:
      "Whole-home automation is more than a mobile application. It is the agreed relationship between systems, control points, operating logic and the feedback available from each device. We verify integrations against the actual products and interfaces, then design a practical experience for the household.",
    technologies: ["Lighting and shading", "Climate and HVAC", "AV, security and access", "Scenes and supported system feedback"],
    architectureCopy:
      "Automation is coordinated with architecture, interiors, electrical and mechanical services. We map room-by-room functions, equipment dependencies and control locations early so that keypads, sensors, motorised treatments and service access fit the finished spaces.",
    workCopy:
      "We agree the rooms and functions in scope, map the system boundaries and user journeys, then coordinate equipment and interfaces with the other project teams. Installation is followed by programming, scene and state checks, commissioning and a handover matched to the homeowner’s everyday use.",
    deliveryStages: [
      { title: "Map the residence", description: "Agree room-by-room requirements, household routines and systems proposed for integration." },
      { title: "Define the architecture", description: "Set control boundaries, interfaces, equipment dependencies and how people will interact with the home." },
      { title: "Coordinate and configure", description: "Align wiring, devices and third-party interfaces, then build the agreed scenes and automations." },
      { title: "Commission the experience", description: "Test supported commands and feedback, explain the interfaces and document the agreed system scope." },
    ],
    deliverables: [
      "System architecture overview and room-wise automation scope",
      "Control-point, interface and equipment schedules",
      "Scene, schedule and automation logic schedules",
      "Commissioning and homeowner handover records",
    ],
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
    imageAlt: "A dedicated residential cinema room with projection, acoustic treatment and arranged seating",
    supportingImage: "/images/designer-speakers.webp",
    supportingImageAlt: "Architectural loudspeakers arranged within a contemporary residential interior",
    metaTitle: "Home Theatre & Audio Visual in Mumbai | Supreme Domotics",
    metaDescription:
      "Design-led home theatre and AV integration in Mumbai, including room planning, Dolby Atmos layouts, projection, multi-room audio and control.",
    capabilities: [
      {
        title: "Room, seating and sightlines",
        description:
          "Room dimensions, seating rows, viewing distance, screen size and sightlines are considered together so the display and seating plan suit the space.",
      },
      {
        title: "Speaker layout and bass planning",
        description:
          "Speaker positions and channel configuration—including Dolby Atmos where specified—are coordinated with ceiling and wall construction. Subwoofer choice and placement are considered with the room and acoustic plan.",
      },
      {
        title: "Acoustics, display and projection",
        description:
          "Projection or display selection is aligned with the screen, throw distance, ambient light and viewing brief. Acoustic treatment is coordinated with the architect and interior designer where it forms part of the project.",
      },
      {
        title: "Equipment, audio zones and control",
        description:
          "Rack access, ventilation, source distribution and connectivity are planned alongside multi-room audio, architectural or invisible speakers, outdoor audio and supported AV control integration.",
      },
    ],
    technologyIntro:
      "Cinema performance depends on the room as much as the equipment. We coordinate the speaker and subwoofer plan, display or projection, sources, rack environment and control against the architecture and the intended use, then confirm each proposed integration with the selected equipment.",
    technologies: ["Dolby Atmos layouts where specified", "Projection and displays", "Multi-room audio", "Architectural and outdoor speakers"],
    architectureCopy:
      "Successful cinema planning brings acoustics, architecture, interiors, seating and equipment selection into the same conversation. Early coordination helps reserve speaker positions, screen sightlines, cable routes, equipment access and any acoustic treatment before finishes are fixed.",
    workCopy:
      "We begin with the room, seating and listening brief, then coordinate a speaker and display plan with the design team. The equipment schedule and rack connectivity inform installation; commissioning then checks source routing, speaker configuration and control, with calibration records included where they are part of the agreed scope.",
    deliveryStages: [
      { title: "Study the room", description: "Review dimensions, construction, seating, viewing needs and the acoustic brief." },
      { title: "Set the AV layout", description: "Coordinate speaker channels, screen or projection, subwoofer position, rack and connectivity." },
      { title: "Install with the build", description: "Align equipment, cable routes, ventilation, access and finishes with site and interior teams." },
      { title: "Configure and calibrate", description: "Test sources, routing, speaker operation and control; document calibration where included in scope." },
    ],
    deliverables: [
      "AV system schematic and equipment schedule",
      "Speaker, channel and subwoofer layout",
      "Display, screen and projection planning",
      "Rack, connectivity and commissioning records as scoped",
    ],
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
    imageAlt: "A discreet dome-style surveillance camera mounted within a contemporary interior",
    metaTitle: "Residential Security & Access Control in Mumbai | Supreme Domotics",
    metaDescription:
      "Plan CCTV coverage, intrusion detection, video door phones, smart entry and gate integration for luxury residences in Mumbai.",
    capabilities: [
      {
        title: "CCTV views and recording",
        description:
          "Camera positions and fields of view are reviewed against entrances, circulation and key areas to identify coverage gaps and avoid unnecessary views. Recording capacity and retention are planned against the system brief.",
      },
      {
        title: "Intrusion detection",
        description:
          "Wired or wireless door and window contacts, motion detection and perimeter devices are selected and positioned for the building layout and how the property is occupied.",
      },
      {
        title: "Entry and perimeter coordination",
        description:
          "Video door phones, smart entry, access control and gate interfaces are considered together, alongside perimeter protection and the movement of residents, visitors and service teams.",
      },
      {
        title: "Privacy and useful alerts",
        description:
          "User permissions, camera viewing areas, notifications and supported automation links are defined with privacy and day-to-day operation in mind. No security system guarantees prevention of intrusion.",
      },
    ],
    technologyIntro:
      "Surveillance, detection and access serve different purposes, so we plan their coverage and operation together rather than treating one camera or sensor as a complete security strategy. Recording, storage, notifications and integrations are confirmed against the selected equipment and project requirements.",
    technologies: ["CCTV and recording", "Wired or wireless detection", "Video door phones and access", "Gate and perimeter interfaces"],
    architectureCopy:
      "Camera views, sensor positions, door hardware, gate control and equipment locations are coordinated with architecture, landscape, electrical and network plans. We also consider cable routes, service access, privacy boundaries and how authorised users will manage access.",
    workCopy:
      "A property review establishes the intended coverage, entry points, users and notification needs. The agreed system plan guides installation and configuration; commissioning checks views, detection zones, recording, access functions and the notifications included in scope before user permissions are handed over.",
    deliveryStages: [
      { title: "Review the property", description: "Map approaches, entry points, occupancy patterns, privacy needs and existing infrastructure." },
      { title: "Plan coverage and access", description: "Coordinate camera fields of view, sensor locations, recording and authorised entry." },
      { title: "Coordinate installation", description: "Align devices, power, cabling, network connections and gate interfaces with site teams." },
      { title: "Test and hand over", description: "Check views, detection, recording, permissions and supported alerts with the users." },
    ],
    deliverables: [
      "Camera location and coverage plan",
      "Sensor and access-control location schedules",
      "Security architecture and recording/storage schedule",
      "Testing and commissioning checklist",
    ],
    related: ["networking-infrastructure", "home-automation", "outdoor-automation"],
  },
  {
    slug: "networking-infrastructure",
    title: "Networking & Digital Infrastructure",
    shortTitle: "Networking & Wi-Fi",
    eyebrow: "The foundation beneath it all",
    headline: "The invisible foundation of a connected home.",
    summary:
      "A dependable network is foundational to connected living. We plan wired backbone, wireless coverage, capacity and equipment environments around the property and the systems that rely on them—without assuming every home needs the same topology.",
    cardDescription:
      "Structured connectivity, thoughtful Wi-Fi coverage and network infrastructure planned for connected homes.",
    image: "/images/networking-infrastructure-hero.webp",
    imageAlt: "Illustrative structured network rack with organized patch panels, switches and neatly routed cabling",
    metaTitle: "Home Networking & Wi-Fi in Mumbai | Supreme Domotics",
    metaDescription:
      "Supreme Domotics plans structured cabling, Wi-Fi coverage, switching, routing and connected-home infrastructure for residences in Mumbai.",
    capabilities: [
      {
        title: "Structured cabling and topology",
        description:
          "We plan the wired backbone, cable routes, terminations, patch panels and network topology around rooms, equipment and likely service paths.",
      },
      {
        title: "Wi-Fi coverage and capacity",
        description:
          "Access-point locations are considered against property size, construction materials, outdoor areas, device density and expected usage—not just floor area.",
      },
      {
        title: "Switching, routing and PoE",
        description:
          "Network equipment and power-over-Ethernet capacity are sized to connected devices and their requirements, including cameras and access points where appropriate.",
      },
      {
        title: "Segmentation and serviceability",
        description:
          "VLANs and separate zones for automation, AV, CCTV or general users may be appropriate depending on scale and operating requirements. Rack layout, UPS, ventilation, internet failover and monitoring are considered where needed.",
      },
    ],
    technologyIntro:
      "The right network design depends on property size, connected-device load and the systems in scope. We consider wired and wireless capacity, switching and routing, PoE, equipment power and ventilation, optional internet failover, monitoring and troubleshooting. Segmentation is applied when it serves a clear operational or security purpose.",
    technologies: ["Structured cabling and patching", "Wi-Fi access-point planning", "Switching, routing and PoE", "Segmentation and monitoring where required"],
    architectureCopy:
      "Network decisions need to happen before walls and ceilings close. We coordinate cable pathways, rack location, patching, power, UPS capacity and ventilation with the architect, electrical contractor and other system teams so infrastructure remains accessible and serviceable.",
    workCopy:
      "We establish property coverage and device requirements, develop the topology and rack approach, then coordinate cabling and equipment with site teams. Configuration is followed by wired and wireless checks, system integration testing, documentation and guidance for monitoring and fault finding.",
    deliveryStages: [
      { title: "Survey coverage and demand", description: "Review plans, construction, connected systems, device counts and internet requirements." },
      { title: "Design the backbone", description: "Set topology, cable routes, rack, switching, access-point locations and any segmentation." },
      { title: "Build and configure", description: "Coordinate terminations, equipment, PoE, power, UPS and ventilation for the agreed design." },
      { title: "Test and document", description: "Check wired links and coverage, resolve issues and record the network for future service." },
    ],
    deliverables: [
      "Network topology diagram and equipment schedule",
      "Structured cabling and patch-panel schedule",
      "Rack layout and access-point placement plan",
      "VLAN/addressing plan and test records where applicable",
    ],
    related: ["home-automation", "home-theatre-av", "security-access-control"],
  },
  {
    slug: "system-integration",
    title: "System Integration & Control",
    shortTitle: "Integration & Control",
    eyebrow: "Engineering a coherent whole",
    headline: "Different technologies. One coherent experience.",
    summary:
      "A unified experience depends on sound engineering behind the interface. Supreme Domotics works as the system design and integration partner, coordinating supported technologies without claiming to manufacture them or promising universal compatibility.",
    cardDescription:
      "Engineering and integration that brings supported home technologies into a clear, maintainable control experience.",
    image: "/images/showroom.webp",
    imageAlt: "A residential technology experience space with several wall-mounted control interfaces",
    supportingImage: "/images/design-integration.webp",
    supportingImageAlt: "A close view of a wall-mounted residential control panel set into a refined interior finish",
    metaTitle: "Smart Home System Integration in Mumbai | Supreme Domotics",
    metaDescription:
      "Supreme Domotics engineers supported KNX, DALI, Casambi, Zigbee, Matter and API integrations into maintainable residential control systems in Mumbai.",
    capabilities: [
      {
        title: "Compatibility before commitment",
        description:
          "We verify the actual product, firmware or interface, gateway and supported functions before defining what can be integrated. Protocol names alone do not establish compatibility.",
      },
      {
        title: "Protocols, gateways and interfaces",
        description:
          "KNX, DALI, Casambi, Zigbee and Matter may be connected where the chosen devices and gateways support the required functions. API or other interface integration is considered when available and suitable.",
      },
      {
        title: "Commands, feedback and point mapping",
        description:
          "We map device points and functions, define command handling and document state feedback where the system exposes it, then shape a unified interface around useful homeowner actions.",
      },
      {
        title: "Commissioning and diagnostics",
        description:
          "Integration testing checks the agreed functions across system boundaries. Diagnostics, troubleshooting and clear documentation help the project team maintain the installation after handover.",
      },
    ],
    technologyIntro:
      "Integration is verified against the exact product, gateway, interface and functions required. We assess KNX, DALI and Casambi systems, and Zigbee, Matter or API connections where supported, then define how commands, status feedback and faults are handled across system boundaries.",
    technologies: ["KNX and DALI", "Casambi", "Zigbee and Matter where supported", "Gateway, API and device interfaces where available"],
    architectureCopy:
      "The integration architecture sets system boundaries, communication paths, gateway locations, control responsibilities and the points that need to be exposed. We coordinate with architects, consultants, electrical teams and technology suppliers as the project’s design and integration partner.",
    workCopy:
      "We begin with an interface and compatibility review, document the proposed architecture and map points to homeowner functions. After equipment coordination and installation, each agreed command and feedback path is tested, faults are investigated and the resulting control and integration records are handed over.",
    deliveryStages: [
      { title: "Inventory the systems", description: "List devices, protocols, gateways, product interfaces and the functions the project needs." },
      { title: "Verify and map", description: "Confirm supported capabilities, define system boundaries and map points to user actions." },
      { title: "Implement the interfaces", description: "Coordinate gateways and connections, configure commands and expose feedback where available." },
      { title: "Test and document", description: "Exercise cross-system scenarios, diagnose exceptions and record the integration for service." },
    ],
    deliverables: [
      "Integration architecture diagram",
      "Device and protocol compatibility matrix",
      "Gateway/interface schedule and system point map",
      "Control philosophy, commissioning and troubleshooting records",
    ],
    related: ["smart-lighting-control", "home-automation", "networking-infrastructure"],
  },
  {
    slug: "outdoor-automation",
    title: "Outdoor & Estate Automation",
    shortTitle: "Outdoor & Estate Automation",
    eyebrow: "Beyond the threshold",
    headline: "Intelligence beyond the walls.",
    summary:
      "The experience of a home continues outdoors. We plan connected systems across gardens, terraces, pools and estate grounds, with particular attention to the scale and varied conditions of villas, large residences and hospitality properties.",
    cardDescription:
      "Connected lighting, gates, pools, audio and security across gardens, villas and estate environments.",
    image: "/images/outdoor-lighting.webp",
    imageAlt: "Landscape lighting illuminating trees, a garden path and a contemporary residence at night",
    metaTitle: "Outdoor & Estate Automation in Mumbai | Supreme Domotics",
    metaDescription:
      "Plan landscape lighting, gate access, irrigation, pool interfaces, outdoor audio and estate connectivity with Supreme Domotics in Mumbai.",
    capabilities: [
      {
        title: "Landscape, pathway and façade lighting",
        description:
          "Outdoor zones are planned for wayfinding, façade emphasis and the character of the landscape, with controls coordinated to indoor scenes where the system supports it.",
      },
      {
        title: "Gates, entry and perimeter",
        description:
          "Gate automation, access control, video entry and perimeter-security interfaces are considered together with arrival routes and how residents, visitors and staff use the site.",
      },
      {
        title: "Irrigation, pools and outdoor AV",
        description:
          "Irrigation and swimming-pool systems can be integrated where the selected equipment exposes suitable control interfaces. Outdoor audio is planned around listening areas and the landscape.",
      },
      {
        title: "Coverage and equipment for outdoor conditions",
        description:
          "Wi-Fi coverage, network connections and equipment locations are planned for terraces and grounds. Weather-resistant equipment and enclosures are specified where the exposure and project requirements call for them.",
      },
    ],
    technologyIntro:
      "Outdoor systems cross landscape, electrical, network and building boundaries. We coordinate lighting zones, gate and access interfaces, pool or irrigation connections, audio and Wi-Fi against the site plan, confirming equipment suitability and integration options for the actual conditions.",
    technologies: ["Landscape and façade lighting", "Gate and access interfaces", "Pool and irrigation integration where supported", "Outdoor audio and Wi-Fi coverage"],
    architectureCopy:
      "Outdoor technology must respect planting, pathways, drainage, sightlines and future maintenance. We work with landscape architects, electrical contractors and site teams to coordinate cable routes, equipment positions and transitions between indoor controls and outdoor systems.",
    workCopy:
      "We map how each outdoor area is used, identify coverage and control needs, then coordinate the technology plan with the site and landscape drawings. Installation and integration are followed by functional testing in the agreed conditions, commissioning and a practical handover for residents and operators.",
    deliveryStages: [
      { title: "Understand the site", description: "Review landscape plans, arrival routes, outdoor rooms and operating requirements." },
      { title: "Zone the environment", description: "Plan lighting, access, audio, network coverage and supported pool or irrigation interfaces." },
      { title: "Coordinate site works", description: "Align equipment, cabling, protection and access with landscape and electrical teams." },
      { title: "Test across boundaries", description: "Verify outdoor controls and supported indoor links, then document operation and maintenance." },
    ],
    deliverables: [
      "Outdoor lighting zones and control schedule",
      "Gate and access-control interface schedule",
      "Outdoor network coverage and equipment plan where scoped",
      "System integration and commissioning documentation",
    ],
    related: ["smart-lighting-control", "home-automation", "security-access-control"],
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug)
}
