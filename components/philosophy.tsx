"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Philosophy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="philosophy" className="py-32 lg:py-40 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-background/60 mb-8"
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight text-balance"
          >
            Technology should integrate with architecture — sometimes invisible, sometimes intentionally visible.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-xl text-background/70 max-w-2xl mx-auto leading-relaxed"
          >
            We are a design-first technology company. Every system we create is conceived not as equipment to be hidden, but as an element to be thoughtfully placed within your space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 h-px w-32 bg-background/30 mx-auto"
          />
        </div>
      </div>
    </section>
  )
}
