"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function DesignIntegration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 lg:py-40 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Design Integration
            </p>

            <h2 className="font-(family-name:--font-playfair) text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground text-balance">
              We don&apos;t just hide technology. We design how it lives in your space.
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Every element is considered — from seamless architectural integration
                with flush finishes, to intentional placements where technology becomes
                a design feature.
              </p>
              <p>
                Our approach honors both the invisible infrastructure that powers your
                home and the visible interfaces that enhance your daily rituals.
              </p>
            </div>

            <ul className="space-y-4 pt-4">
              {[
                "Seamless architectural integration",
                "Flush-mounted finishes",
                "Intentional design placements",
                "Technology as feature elements",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  <span className="text-foreground font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/design-integration.webp"
                alt="Seamlessly integrated smart home control panel"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-foreground/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-foreground/5 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
