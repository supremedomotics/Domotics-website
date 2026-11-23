"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Volume2, Eye, EyeOff } from "lucide-react"

const features = [
  {
    icon: EyeOff,
    title: "Invisible Speakers",
    description: "Architectural speakers that disappear into walls and ceilings, delivering pristine sound without visual intrusion.",
  },
  {
    icon: Eye,
    title: "Designer Speakers",
    description: "Statement pieces from premium brands that complement your interior as functional art.",
  },
  {
    icon: Volume2,
    title: "Cinema Rooms",
    description: "Immersive private theatres with calibrated acoustics and professional-grade equipment.",
  },
]

export function AudioVisual() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="audio-visual" className="py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/home-theatre.webp"
                  alt="Luxury home cinema room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
                <Image
                  src="/images/designer-speakers.webp"
                  alt="Premium designer speakers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Audio & Visual
            </p>

            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-foreground">
              Sound that moves you. Visuals that captivate.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              From invisible speakers that deliver immaculate sound to bespoke cinema
              rooms designed for the ultimate viewing experience — we create audio-visual
              environments that transcend expectation.
            </p>

            <div className="space-y-6 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
