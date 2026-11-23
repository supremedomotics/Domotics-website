"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function Collaboration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              For Architects & Designers
            </p>

            <h2 className="font-(family-name:--font-playfair) text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground text-balance">
              Designed with architecture, not after.
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We partner with architects and interior designers from the earliest
                project phases. Our involvement ensures technology requirements are
                considered alongside structural and aesthetic decisions.
              </p>
              <p>
                This collaborative approach results in seamless integration that
                honors your design vision while delivering exceptional functionality.
              </p>
            </div>

            <ul className="space-y-4 pt-4">
              {[
                "Early-stage design consultation",
                "Coordinated planning with design teams",
                "Custom solutions for unique spaces",
                "Ongoing support through project completion",
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

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              href="#contact-form"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-all duration-300 hover:bg-foreground/90 hover:scale-105"
            >
              Partner With Us
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/architecture-plans.webp"
                alt="Architect working on home design plans"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-foreground/5 rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-foreground/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
