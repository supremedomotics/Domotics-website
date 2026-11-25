"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { track } from "@vercel/analytics"
import { Lightbulb, Home, Shield, Tv, Wifi, Settings } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "Smart Lighting",
    href: "/services/smart-lighting-control",
    description: "KNX & Casambi solutions for intelligent illumination",
  },
  {
    icon: Home,
    title: "Home Automation",
    href: "/services/home-automation",
    description: "Centralized control for your entire living space",
  },
  {
    icon: Shield,
    title: "Security Systems",
    href: "/services/security-access-control",
    description: "Surveillance, detection & access control",
  },
  {
    icon: Tv,
    title: "Home Theatre & AV",
    href: "/services/home-theatre-av",
    description: "Immersive cinema and multi-room audio experiences",
  },
  {
    icon: Wifi,
    title: "Networking & Wi-Fi",
    href: "/services/networking-infrastructure",
    description: "Reliable connectivity throughout your home",
  },
  {
    icon: Settings,
    title: "Integration & Control",
    href: "/services/system-integration",
    description: "Unified interfaces bringing supported systems together",
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
            <motion.a
              key={service.title}
              href={service.href}
              aria-label={`Explore ${service.title}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onClick={() => track("service_detail_click", { service: service.href })}
              className="group relative rounded-2xl bg-foreground p-8 text-background transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone lg:p-10"
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
