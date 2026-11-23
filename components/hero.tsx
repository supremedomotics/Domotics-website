"use client"

import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10" />

      <div className="absolute inset-0">
        <Image
          src="/images/hero-villa.webp"
          alt="Luxury modern villa with smart home automation"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                Design. Technology. Living.
              </p>

              <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-balance text-foreground">
                Technology designed to be lived with
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Where smart automation meets architectural excellence. Effortless
              control of lighting, security, and entertainment — designed for
              those who expect nothing less than extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#philosophy"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-all duration-300 hover:bg-foreground/90 hover:scale-105"
              >
                Explore
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#showroom"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-base font-medium text-foreground transition-all duration-300 hover:bg-foreground/5"
              >
                Visit Our Showroom
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-base font-medium text-foreground transition-all duration-300 hover:bg-foreground/5"
              >
                Start Your Project
              </a>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  )
}
