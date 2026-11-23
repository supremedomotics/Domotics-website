"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PROJECT_IMAGES = [
  {
    src: "/images/project-exterior.png",
    alt: "Exterior of Mewar Kothi Residence in Indore",
    title: "Exterior Architecture",
  },
  {
    src: "/images/project-living.png",
    alt: "Double-height living room with floor-to-ceiling glazing and pendant lighting",
    title: "Living Space",
  },
  {
    src: "/images/project-lighting.png",
    alt: "Arched wall recess with concealed lighting and pendant fitting",
    title: "Lighting Integration",
  },
  {
    src: "/images/project-theatre.png",
    alt: "Dedicated home theatre with projection screen and seating",
    title: "Entertainment Hub",
  },
  {
    src: "/images/project-pool.png",
    alt: "Swimming pool beside the landscaped residence",
    title: "Outdoor Living",
  },
]

const TECHNOLOGIES = [
  "Casambi Smart Lighting",
  "Ajax Security",
  "Grandstream Networking",
  "Grandstream IP Telephony",
  "Dedicated Home Theatre",
  "Pool Audio",
  "Soundbar Integration",
  "Boundary Electric Fencing",
  "Multi-Room Audio",
  "CCTV Surveillance",
  "Video Door Phone",
]

const HIGHLIGHTS = [
  {
    title: "Lighting Automation",
    description: "Scene-based wireless lighting control powered by Casambi.",
  },
  {
    title: "Advanced Security",
    description: "Ajax intrusion detection and perimeter protection with intelligent monitoring.",
  },
  {
    title: "Entertainment Experience",
    description: "Dedicated home theatre, soundbar integration, and outdoor pool audio.",
  },
  {
    title: "Connected Infrastructure",
    description: "Enterprise-grade networking and IP communication systems.",
  },
]

export function FeaturedProject() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? PROJECT_IMAGES.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === PROJECT_IMAGES.length - 1 ? 0 : prev + 1))
  }

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 lg:mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4">
            Featured Project
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight text-foreground mb-6">
            Mewar Kothi Residence, Indore
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            An exceptional residential integration bringing architectural lighting, intelligent automation, security, networking and entertainment together into one seamless living experience.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Featuring 110 Casambi nodes, the residence combines wireless lighting control, customised scenes, Human Centric Lighting and motorised curtains, alongside a wider ecosystem of integrated home technologies.
          </p>
          <div className="mt-10 border-l border-foreground/20 pl-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-2">
              Casambi Global Project Portfolio
            </p>
            <p className="text-foreground/80 mb-3">
              Featured on Casambi&apos;s official global project portfolio. Casambi Commission Partner — Supreme Domotics.
            </p>
            <a
              href="https://casambi.com/projects/mewar-kothi-residence/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
            >
              View project on Casambi <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="h-px bg-foreground/10 mt-8" />
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-20 lg:mb-32"
        >
          {/* Desktop Masonry View */}
          <div className="hidden lg:grid grid-cols-3 gap-6 auto-rows-[300px]">
            {PROJECT_IMAGES.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  idx === 0 ? "col-span-2 row-span-2" : idx === 3 ? "col-span-2" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={idx === 0 || idx === 3 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, calc(100vw - 3rem)"}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{image.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Gallery with Swipe Navigation */}
          <div className="lg:hidden">
            <div className="relative mb-6">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={PROJECT_IMAGES[activeImageIndex].src}
                  alt={PROJECT_IMAGES[activeImageIndex].alt}
                  fill
                  sizes="calc(100vw - 3rem)"
                  className="object-cover"
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Image Counter and Dots */}
            <div className="flex items-center justify-between px-4">
              <div className="flex gap-1">
                {PROJECT_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeImageIndex ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {activeImageIndex + 1} / {PROJECT_IMAGES.length}
              </p>
            </div>

            {/* Image Title */}
            <p className="mt-4 text-center text-sm font-medium text-foreground">
              {PROJECT_IMAGES[activeImageIndex].title}
            </p>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 lg:mb-32"
        >
          <h3 className="text-xl font-medium text-foreground mb-8">Integrated Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {TECHNOLOGIES.map((tech, idx) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                className="px-4 py-2 rounded-full border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 text-foreground text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20 lg:mb-32"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {HIGHLIGHTS.map((highlight, idx) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                className="group p-8 rounded-2xl border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300"
              >
                <h4 className="text-lg font-medium text-foreground mb-3 group-hover:text-foreground/90 transition-colors">
                  {highlight.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20 lg:mb-32 max-w-3xl"
        >
          <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground mb-6">
            Technology Designed Around Architecture
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every technology decision within this residence was carefully integrated to complement the architecture and lifestyle of the homeowners. From intelligent lighting scenes and immersive entertainment spaces to enterprise-grade connectivity and advanced security, every system works together seamlessly while remaining visually unobtrusive.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20 lg:mb-32 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "17,000+", label: "sq ft Area Covered" },
            { number: "11+", label: "Integrated Technologies" },
            { number: "100%", label: "Customized Solution" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
              className="text-center"
            >
              <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground mb-2">
                {stat.number}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-foreground/10 pt-16 lg:pt-24"
        >
          <div className="max-w-2xl">
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-foreground mb-4">
              Experience Technology Designed To Be Lived With
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Visit our experience center and discover how intelligent technology can seamlessly integrate into your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/case-study/luxury-residence-indore"
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:bg-foreground/90"
              >
                Explore Case Study
              </a>
              <a
                href="#showroom"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-foreground/5"
              >
                Book Showroom Visit
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
