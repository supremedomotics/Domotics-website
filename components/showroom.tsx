"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Lightbulb, Hand, Users, Tv } from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "Live Lighting Scenes",
    description: "Experience KNX and Casambi lighting shift through morning, evening, and cinema moods in a real space.",
  },
  {
    icon: Tv,
    title: "Custom Home Theatre with Dolby Atmos",
    description: "Step into a fully calibrated cinema room and hear immersive Dolby Atmos surround sound the way it's meant to be experienced.",
  },
  {
    icon: Hand,
    title: "Hands-On Control",
    description: "Touch the same panels, interfaces, and automation you'll have at home. No guesswork, no surprises.",
  },
  {
    icon: Users,
    title: "Talk to the People Behind It",
    description: "Meet our design team, ask the hard questions, and see why we're a certified KNX partner.",
  },
]

export function Showroom() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="showroom" className="py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            Experience It In Person
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6"
          >
            See it. Feel it. Live with it — before it&apos;s yours.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            The scenes you just explored aren't renders. They're real, and they're waiting for you at our Mumbai showroom. Walk through morning light, dim into cinema mode, feel a room respond to a single touch. Because the best way to understand technology designed to be lived with is to live with it, even for an afternoon.
          </motion.p>
        </div>

        {/* Showroom Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative aspect-video w-full">
            <Image
              src="/images/showroom.webp"
              alt="Supreme Domotics Mumbai showroom"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 5) }}
              className="group relative bg-foreground text-background rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="mb-6">
                <feature.icon className="h-8 w-8 text-background/80 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium mb-3">
                {feature.title}
              </h3>
              <p className="text-background/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Address and Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Address Block */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium mb-6">
              Visit Our Showroom
            </h3>
            <div className="bg-foreground/5 rounded-xl p-8 space-y-4">
              <p className="text-foreground font-medium leading-relaxed">
                Supreme Domotics<br />
                608, 6th Floor, 72 Corp<br />
                Saki Vihar Road, Sakinaka Junction<br />
                Andheri East, Mumbai – 400072
              </p>
              <p className="text-sm text-foreground/60 pt-4 border-t border-foreground/10">
                By appointment, so we can give you our full attention.
              </p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Supreme Domotics showroom location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0674978396796!2d72.8875192!3d19.1046946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x22f7d5e415d14ddd%3A0x78bfa6b22f9254c0!2sSupreme%20Domotics!5e0!3m2!1sen!2sin!4v1782126907232!5m2!1sen!2sin"
            />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-all duration-300 hover:bg-foreground/90 hover:scale-105"
          >
            Book a Showroom Visit
          </a>
        </motion.div>
      </div>
    </section>
  )
}
