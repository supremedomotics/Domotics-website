'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const CASAMBI_PROJECT_URL = 'https://casambi.com/projects/mewar-kothi-residence/'

const PROJECT_IMAGES = [
  { src: '/images/project-exterior.png', alt: 'Mewar Kothi Residence exterior, Indore', aspect: 'aspect-[3/2]' },
  { src: '/images/project-living.png', alt: 'Double-height living room with floor-to-ceiling glazing', aspect: 'aspect-[2/3]' },
  { src: '/images/project-lighting.png', alt: 'Arched wall recess with concealed lighting and pendant fitting', aspect: 'aspect-[1868/4000]' },
  { src: '/images/project-theatre.png', alt: 'Dedicated home theatre with acoustic wall panels', aspect: 'aspect-[3/2]' },
  { src: '/images/project-pool.png', alt: 'Residence exterior beside the swimming pool', aspect: 'aspect-[3/2]' },
]

const OVERVIEW = [
  { label: 'Location', value: 'Indore, Madhya Pradesh, India' },
  { label: 'Property Type', value: 'Luxury Residential Villa' },
  { label: 'Architect & Interior Design', value: 'Innerspacegroup' },
  { label: 'Lighting Design', value: 'Innerspacegroup' },
  { label: 'Casambi Commission Partner', value: 'Supreme Domotics' },
  { label: 'Casambi Nodes', value: '110' },
]

const TECHNOLOGIES = [
  { name: 'Casambi Lighting', desc: '110-node wireless lighting control, scenes and Human Centric Lighting' },
  { name: 'Motorised Curtains', desc: 'Goldmedal relays and shutter actuators' },
  { name: 'Automated Gates', desc: 'Merrytek relay control' },
  { name: 'Wireless Keypads', desc: 'Siqitech keypads for everyday scenes and functions' },
  { name: 'Audio Visual & Home Theatre', desc: 'Dedicated home theatre and integrated AV' },
  { name: 'Property Technology', desc: 'Security, surveillance, networking and communication systems' },
]

const LIGHTING_POINTS = [
  '110 Casambi nodes across the residence',
  'Wireless control, with unwired LED drivers connecting lighting throughout the home',
  'Custom scenes that move the home between a quiet evening and a gathering',
  'Human Centric Lighting that adjusts light through the day',
  'Scheduled lighting sequences and dynamic transitions that change gradually',
  'Individual area control, or several spaces changing together with one scene',
]

const BEYOND_LIGHTING_POINTS = [
  'Motorised curtains connected through Goldmedal relays and shutter actuators',
  'Automated gates operated through a Merrytek relay',
  'Siqitech wireless keypads for familiar, easy access to everyday scenes',
  'Scheduled scenes and automated controls that run without constant adjustment',
]

const WIDER_INTEGRATION_POINTS = [
  'Audio visual systems',
  'A dedicated home theatre',
  'Security and surveillance',
  'Networking',
  'Communication systems',
]

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function CaseStudyPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      <Header />
      <main className="bg-background">
        <nav aria-label="Breadcrumb" className="pt-28 mx-auto max-w-7xl px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Mewar Kothi Residence, Indore
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-12 pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10" />
          <div className="absolute inset-0">
            <Image
              src="/images/project-exterior.png"
              alt="Mewar Kothi Residence exterior, Indore"
              fill
              className="object-cover object-center"
              sizes="100vw"
              preload
            />
          </div>
          <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                Featured Project
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-foreground text-balance">
                Mewar Kothi Residence, Indore
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Technology Designed Around Architecture
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-16"
            >
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-8 text-foreground">
                  Project Overview
                </h2>
                <dl className="space-y-6">
                  {OVERVIEW.map((item) => (
                    <div key={item.label}>
                      <dt className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                        {item.label}
                      </dt>
                      <dd className="text-lg text-foreground">{item.value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                      Scope
                    </dt>
                    <dd>
                      <ul className="space-y-2">
                        {TECHNOLOGIES.map((tech) => (
                          <li key={tech.name} className="text-foreground/80">
                            {tech.name}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="relative aspect-[2/3] max-h-[42rem] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/project-living.png"
                  alt="Double-height living room with floor-to-ceiling glazing"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 1: The Residence */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...sectionMotion} className="space-y-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground">
                An Intelligent Residence, Thoughtfully Integrated
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Technology at Mewar Kothi Residence was planned alongside the architecture and interiors by Innerspacegroup, not placed on top of them. The aim was a home where the systems support daily life quietly, so the spaces remain the focus.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Intelligent Lighting */}
        <section className="py-24 lg:py-32 bg-foreground/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...sectionMotion} className="space-y-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground">
                Lighting That Responds to Life
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chandeliers, downlights, wall lights, feature lighting and façade lighting are brought together by a Casambi wireless network of 110 nodes. Each area can be controlled on its own, or several spaces can change together with a single scene.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {LIGHTING_POINTS.map((point) => (
                  <li key={point} className="flex gap-4">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-foreground/40" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.figure {...sectionMotion} className="mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src="/images/project-lighting.png"
                alt="Arched wall recess with concealed lighting and pendant fitting"
                width={1868}
                height={4000}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-auto w-full rounded-2xl object-contain"
              />
            </motion.figure>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              {...sectionMotion}
              className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-16 text-foreground"
            >
              Project Gallery
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECT_IMAGES.map((img, idx) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className={`${img.aspect} relative bg-foreground/[0.03]`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Beyond Lighting */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...sectionMotion} className="space-y-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground">
                More Than Lighting. An Integrated Experience.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Lighting is only part of the picture. Curtains, gates and entry points are connected to the same everyday control, so the home responds as a whole.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {BEYOND_LIGHTING_POINTS.map((point) => (
                  <li key={point} className="flex gap-4">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-foreground/40" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Complete Technology Integration */}
        <section className="py-24 lg:py-32 bg-foreground/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...sectionMotion} className="space-y-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground">
                One Residence. Multiple Technologies. One Experience.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Supreme Domotics brought together the wider technology in the home. Casambi handles the lighting control; the systems below are delivered and integrated by Supreme Domotics and work alongside it.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-foreground/80">
                {WIDER_INTEGRATION_POINTS.map((point) => (
                  <li key={point} className="flex gap-4">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-foreground/40" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Project Recognition */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...sectionMotion} className="space-y-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground">
                Recognised on the Global Stage
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mewar Kothi Residence is featured on Casambi&apos;s official global project portfolio, recognising the lighting installation and the work of its project partners.
              </p>
              <dl className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-foreground/10">
                <div>
                  <dt className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                    Casambi Commission Partner
                  </dt>
                  <dd className="text-lg text-foreground">Supreme Domotics</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                    Casambi Nodes
                  </dt>
                  <dd className="text-lg text-foreground">110</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                    Architecture, Interiors &amp; Lighting Design
                  </dt>
                  <dd className="text-lg text-foreground">Innerspacegroup</dd>
                </div>
              </dl>
              <a
                href={CASAMBI_PROJECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
              >
                Explore Mewar Kothi on Casambi <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              {...sectionMotion}
              className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-16 text-foreground"
            >
              Integrated Technologies
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TECHNOLOGIES.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors group"
                >
                  <h3 className="font-medium text-foreground mb-3">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 lg:py-32 bg-foreground/5 border-t border-foreground/10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...sectionMotion} className="text-center space-y-8">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium mb-4 text-foreground">
                  Ready to Experience Intelligent Living?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Visit our showroom to see how technology designed for architecture can transform your home.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/#showroom"
                  className="px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:bg-foreground/90 inline-flex items-center justify-center"
                >
                  Book Showroom Visit
                </Link>
                <Link
                  href="/#contact-form"
                  className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-medium transition-all duration-300 hover:bg-foreground/5 inline-flex items-center justify-center"
                >
                  Contact Supreme Domotics
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
