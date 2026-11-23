'use client'

import { motion, useInView } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const CASAMBI_PROJECT_URL = 'https://casambi.com/projects/mewar-kothi-residence/'

const PROJECT_IMAGES = [
  { src: '/images/project-exterior.png', alt: 'Mewar Kothi Residence exterior, Indore', width: 4160, height: 2774 },
  { src: '/images/project-living.png', alt: 'Double-height living room with floor-to-ceiling glazing', width: 3416, height: 5120 },
  { src: '/images/project-lighting.png', alt: 'Arched wall recess with concealed lighting and pendant fitting', width: 1868, height: 4000 },
  { src: '/images/project-theatre.png', alt: 'Dedicated home theatre with acoustic wall panels', width: 5120, height: 3416 },
  { src: '/images/project-pool.png', alt: 'Residence exterior beside the swimming pool', width: 5120, height: 3416 },
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
  'Casambi-enabled lighting control connecting luminaires throughout the residence',
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
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const closeLightbox = useCallback(() => setActiveImage(null), [])
  const showPrevious = useCallback(() => {
    setActiveImage((current) => current === null ? null : (current - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length)
  }, [])
  const showNext = useCallback(() => {
    setActiveImage((current) => current === null ? null : (current + 1) % PROJECT_IMAGES.length)
  }, [])

  useEffect(() => {
    if (activeImage === null) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeImage, closeLightbox, showNext, showPrevious])

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
          <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/40 to-background/10 md:from-background/75 md:via-background/35 md:to-transparent z-10" />
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
        <section className="py-16 lg:py-20 border-t border-foreground/10">
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
        <section className="py-16 lg:py-20 border-t border-foreground/10">
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
        <section className="py-16 lg:py-20 bg-foreground/5">
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
        <section className="py-16 lg:py-20 border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              {...sectionMotion}
              className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-10 text-foreground"
            >
              Project Gallery
            </motion.h2>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
              {PROJECT_IMAGES.map((img, idx) => (
                <motion.button
                  key={img.src}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`Open image ${idx + 1}: ${img.alt}`}
                  className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-lg bg-foreground/[0.03] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Beyond Lighting */}
        <section className="py-16 lg:py-20 border-t border-foreground/10">
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
        <section className="py-16 lg:py-20 bg-foreground/5">
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
        <section className="py-16 lg:py-20 border-t border-foreground/10">
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
        <section className="py-16 lg:py-20 border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              {...sectionMotion}
              className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-10 text-foreground"
            >
              Integrated Technologies
            </motion.h2>
            <div className="grid items-stretch sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TECHNOLOGIES.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="h-full rounded-lg border border-foreground/10 p-5 transition-colors hover:border-foreground/20"
                >
                  <h3 className="font-medium text-foreground mb-3">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-20 bg-foreground/5 border-t border-foreground/10">
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
        {activeImage !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project gallery image viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <button type="button" onClick={closeLightbox} aria-label="Close image viewer" className="absolute right-4 top-4 z-10 rounded-full border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Close <span aria-hidden="true">×</span>
            </button>
            <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious() }} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 p-3 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-8">
              <span aria-hidden="true">←</span>
            </button>
            <figure className="flex h-full w-full flex-col items-center justify-center gap-3" onClick={(event) => event.stopPropagation()}>
              <Image
                src={PROJECT_IMAGES[activeImage].src}
                alt={PROJECT_IMAGES[activeImage].alt}
                width={PROJECT_IMAGES[activeImage].width}
                height={PROJECT_IMAGES[activeImage].height}
                sizes="100vw"
                className="max-h-[calc(100vh-7rem)] w-auto max-w-[calc(100vw-5rem)] object-contain"
                priority
              />
              <figcaption className="text-center text-sm text-white/80">{PROJECT_IMAGES[activeImage].alt} · {activeImage + 1} of {PROJECT_IMAGES.length}</figcaption>
            </figure>
            <button type="button" onClick={(event) => { event.stopPropagation(); showNext() }} aria-label="Next image" className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 p-3 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
