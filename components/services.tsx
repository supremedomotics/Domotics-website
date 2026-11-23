"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Home, Shield, Tv, Wifi, Settings } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "Smart Lighting",
    description: "KNX & Casambi solutions for intelligent illumination",
  },
  {
    icon: Home,
    title: "Home Automation",
    description: "Centralized control for your entire living space",
  },
  {
    icon: Shield,
    title: "Security Systems",
    description: "Ajax sensors, surveillance & access control",
  },
  {
    icon: Tv,
    title: "Home Theatre & AV",
    description: "Immersive cinema and multi-room audio experiences",
  },
  {
    icon: Wifi,
    title: "Networking & WiFi",
    description: "Enterprise-grade connectivity throughout your home",
  },
  {
    icon: Settings,
    title: "Integration & Control",
    description: "Unified interfaces bringing everything together",
  },
]

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium tracking-tight text-foreground"
          >
            Our Services
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative bg-foreground text-background rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="mb-6">
                <service.icon className="h-8 w-8 text-background/80 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium mb-3">
                {service.title}
              </h3>
              <p className="text-background/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
