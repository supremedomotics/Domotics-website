"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Camera, Fingerprint, Radio, Bell } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Discreet CCTV Integration",
    description: "Premium dome cameras subtly integrated into your architecture",
  },
  {
    icon: Fingerprint,
    title: "Smart Entry & Access Control",
    description: "Biometric and keyless entry systems for seamless security",
  },
  {
    icon: Radio,
    title: "Wireless & Wired Sensors",
    description: "Comprehensive protection with Ajax and premium sensor networks",
  },
  {
    icon: Bell,
    title: "Real-time Monitoring",
    description: "Instant alerts and remote access from anywhere in the world",
  },
]

export function Security() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="security" className="py-32 lg:py-40 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Security
            </p>

            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground text-balance">
              Protection you feel. Design you can trust.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Security systems should protect without imposing. Our solutions integrate
              thoughtfully into your space, providing comprehensive protection while
              maintaining the aesthetic integrity of your home.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-background" />
                  </div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/security-camera.webp"
                alt="Premium security camera integrated into ceiling"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-foreground/10 rounded-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
