'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const PROJECT_IMAGES = [
  { src: '/images/project-exterior.png', alt: 'Luxury residence exterior' },
  { src: '/images/project-living.png', alt: 'Modern living room' },
  { src: '/images/project-lighting.png', alt: 'Lighting details' },
  { src: '/images/project-theatre.png', alt: 'Home theatre' },
  { src: '/images/project-pool.png', alt: 'Pool area' },
]

const TECHNOLOGIES = [
  { name: 'Casambi', desc: 'Scene-based wireless smart lighting control' },
  { name: 'Ajax', desc: 'Advanced security and intrusion detection' },
  { name: 'Grandstream Networking', desc: 'Enterprise-grade network infrastructure' },
  { name: 'Grandstream IP Telephony', desc: 'Intelligent communication systems' },
  { name: 'Home Theatre', desc: 'Dedicated cinema experience with Dolby Atmos' },
  { name: 'Pool Audio', desc: 'Outdoor entertainment sound system' },
  { name: 'Soundbar Integration', desc: 'Premium audio for all living spaces' },
  { name: 'Electric Fencing', desc: 'Perimeter security and protection' },
  { name: 'Multi-Room Audio', desc: 'Distributed audio throughout the residence' },
  { name: 'CCTV Surveillance', desc: 'Professional security monitoring system' },
  { name: 'Video Door Phone', desc: 'Smart entry and access control' },
]

export default function CaseStudyPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10" />
          <div className="absolute inset-0">
            <Image
              src="/images/project-exterior.png"
              alt="Luxury Residence, Indore exterior"
              fill
              className="object-cover object-center"
              priority
              quality={90}
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
                Luxury Residence, Indore
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
                <div className="space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                      Location
                    </p>
                    <p className="text-lg text-foreground">Indore, Madhya Pradesh, India</p>
                  </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                  Property Type
                </p>
                <p className="text-lg text-foreground">Luxury Residential Villa</p>
              </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2">
                      Scope
                    </p>
                    <ul className="space-y-2">
                      {TECHNOLOGIES.map((tech) => (
                        <li key={tech.name} className="text-foreground/80">
                          • {tech.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/project-living.png"
                  alt="Project interior"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 lg:py-32 bg-foreground/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-16 text-foreground"
            >
              Project Gallery
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECT_IMAGES.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-6 text-foreground">
                  The Challenge
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The homeowners desired a fully integrated smart home experience that would enhance their lifestyle without compromising the architectural integrity of their luxury residence. Every technology needed to be seamlessly integrated—visible only when needed, disappearing into the background of the home&apos;s design.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-24 lg:py-32 bg-foreground/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-6 text-foreground">
                  The Solution
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We designed a comprehensive ecosystem of integrated technologies that work together seamlessly:
                </p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-4">
                    <span className="font-medium text-foreground">Intelligent Lighting:</span>
                    <span>Casambi wireless lighting control with scene-based automation for every room and outdoor area</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-medium text-foreground">Advanced Security:</span>
                    <span>Ajax intrusion detection, smart locks, and perimeter protection with real-time monitoring</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-medium text-foreground">Entertainment:</span>
                    <span>Dedicated home theatre with Dolby Atmos, pool audio system, and soundbar integration</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-medium text-foreground">Infrastructure:</span>
                    <span>Enterprise-grade Grandstream networking and IP telephony for seamless communication</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                  <h3 className="font-medium text-foreground mb-3 group-hover:text-foreground transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-24 lg:py-32 bg-foreground/5 border-t border-foreground/10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium mb-6 text-foreground">
                  The Results
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The residence now delivers a complete luxury living experience where technology enhances every moment without ever calling attention to itself. All systems work in harmony, responding to the homeowners&apos; needs while respecting the architectural vision of their home.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-foreground/10">
                  <div>
                    <p className="text-4xl font-medium text-foreground mb-2">8+</p>
                    <p className="text-muted-foreground">Integrated Technology Systems</p>
                  </div>
                  <div>
                    <p className="text-4xl font-medium text-foreground mb-2">100%</p>
                    <p className="text-muted-foreground">Customized Solution</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 lg:py-32 border-t border-foreground/10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
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
