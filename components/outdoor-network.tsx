"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { ArrowRight, Trees, Wifi, Zap } from "lucide-react"

export function OutdoorNetwork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 lg:py-40 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/outdoor-lighting.webp"
                alt="Luxury outdoor landscape lighting"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 border border-background/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-background/60">
              Outdoor & Infrastructure
            </p>

            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              Beyond the walls. Throughout the grounds.
            </h2>

            <p className="text-xl text-background/70 leading-relaxed">
              Your property deserves the same attention outdoors as within. From
              sophisticated landscape lighting to robust network infrastructure,
              we ensure every corner of your estate performs flawlessly.
            </p>

            <div className="space-y-6 pt-4">
              {[
                {
                  icon: Trees,
                  title: "Landscape Lighting",
                  description: "Architectural outdoor illumination that transforms gardens and pathways after dark",
                },
                {
                  icon: Zap,
                  title: "Outdoor Automation",
                  description: "Extend control to gates, irrigation, pool systems, and outdoor entertainment",
                },
                {
                  icon: Wifi,
                  title: "Network Backbone",
                  description: "Enterprise-grade WiFi coverage throughout your entire property",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-background mb-1">{item.title}</h3>
                    <p className="text-background/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/services/outdoor-automation"
              onClick={() => track("outdoor_service_click", { source: "homepage_outdoor_section" })}
              className="inline-flex items-center gap-2 border-b border-background/35 pb-2 text-sm font-medium text-background transition-colors hover:border-background hover:text-white"
            >
              Explore Outdoor & Estate Automation <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
