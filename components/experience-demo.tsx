"use client"

/**
 * ExperienceDemo — Cinematic smart-home scene transition (v2.1)
 *
 * Changes from previous version:
 *   • CCT slider is now READ-ONLY feedback. User cannot drag it. Value is
 *     driven automatically by mode transitions (via tweenKelvinTo).
 */

import Image from "next/image"
import { Film, Lightbulb, Moon, Sun, Thermometer, Tv } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import gsap from "gsap"

type Mode = "morning" | "night" | "cinema"

const BASE_IMAGE = "/images/living-room-morning.webp"

const LIGHTS_STEADY: Record<Mode, number> = {
  morning: 100,
  night: 100,
  cinema: 15,
}

const KELVIN_PER_MODE: Record<Mode, number> = {
  morning: 4000,
  night: 2700,
  cinema: 2700,
}

const BUTTONS: { id: Mode; label: string; icon: typeof Sun; desc: string }[] = [
  { id: "morning", label: "Morning", icon: Sun, desc: "Crisp daylight — curtains open, full exposure, neutral white balance." },
  { id: "night", label: "Night", icon: Moon, desc: "Warm 2700K ambient glow, windows dark, exposure softened." },
  { id: "cinema", label: "Cinema", icon: Film, desc: "Curtains closed, deep contrast, faint ambient light, vignette draws the eye." },
]

type LightState = {
  warm: number
  skyMask: number
  ambient: number
  dim: number
  vignette: number
  brightness: number
  contrast: number
  saturate: number
  hueRotate: number
  curtain: number
}

const STATES: Record<Mode, LightState> = {
  morning: { warm: 0, skyMask: 0, ambient: 0, dim: 0, vignette: 0, brightness: 1.0, contrast: 1.0, saturate: 1.0, hueRotate: 0, curtain: 0 },
  night: { warm: 0.55, skyMask: 0.92, ambient: 0.7, dim: 0.28, vignette: 0.3, brightness: 0.55, contrast: 1.1, saturate: 0.9, hueRotate: -8, curtain: 0.15 },
  cinema: { warm: 0.45, skyMask: 1, ambient: 0.35, dim: 0.5, vignette: 0.75, brightness: 0.42, contrast: 1.22, saturate: 0.82, hueRotate: -6, curtain: 1 },
}

function kelvinToRGB(k: number): { r: number; g: number; b: number } {
  const t = Math.max(0, Math.min(1, (k - 2700) / (6500 - 2700)))
  let r: number, g: number, b: number
  if (t < 0.5) {
    const u = t / 0.5
    r = 255
    g = Math.round(138 + (220 - 138) * u)
    b = Math.round(56 + (180 - 56) * u)
  } else {
    const u = (t - 0.5) / 0.5
    r = Math.round(255 + (200 - 255) * u)
    g = Math.round(220 + (220 - 220) * u)
    b = Math.round(180 + (255 - 180) * u)
  }
  return { r, g, b }
}

const buildWarmOverlay = (r: number, g: number, b: number) =>
  `linear-gradient(180deg, rgba(${r},${g},${b},0.7) 0%, rgba(${r},${Math.round(g * 0.85)},${Math.round(b * 0.78)},0.65) 100%)`

const buildAmbient = (r: number, g: number, b: number) =>
  `radial-gradient(ellipse 70% 35% at 50% 0%, rgba(${r},${g},${b},0.55), rgba(${r},${Math.round(g * 0.85)},${Math.round(b * 0.72)},0.2) 60%, transparent 85%), ` +
  `radial-gradient(ellipse 80% 60% at 50% 55%, rgba(${r},${Math.round(g * 0.95)},${Math.round(b * 0.9)},0.22), transparent 75%)`

const buildSpotlights = (r: number, g: number, b: number) =>
  `radial-gradient(circle 11% at 10% 5%, rgba(${r},${g},${b},0.95), transparent 75%), ` +
  `radial-gradient(circle 11% at 90% 5%, rgba(${r},${g},${b},0.95), transparent 75%), ` +
  `radial-gradient(circle 9% at 25% 17%, rgba(${r},${g},${b},0.85), transparent 75%), ` +
  `radial-gradient(circle 9% at 75% 17%, rgba(${r},${g},${b},0.85), transparent 75%), ` +
  `radial-gradient(ellipse 12% 14% at 22% 58%, rgba(${r},${g},${b},0.95), transparent 70%), ` +
  `radial-gradient(ellipse 12% 14% at 58% 58%, rgba(${r},${g},${b},0.95), transparent 70%)`

const SKY_MASK =
  "linear-gradient(90deg," +
  " rgba(8,10,14,1) 0%, rgba(8,10,14,1) 12%, rgba(8,10,14,0) 18%," +
  " rgba(8,10,14,0) 82%, rgba(8,10,14,1) 88%, rgba(8,10,14,1) 100%)"

const VIGNETTE =
  "radial-gradient(ellipse 85% 75% at center, transparent 42%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.92) 100%)"

const CURTAIN_FABRIC =
  "repeating-linear-gradient(90deg," +
  " #d4c4a8 0px, #c9b896 14px, #b8a47e 22px, #c9b896 30px, #d4c4a8 44px," +
  " #b8a47e 56px, #c9b896 68px, #d4c4a8 82px)"

type StatusIcon = "lighting" | "curtains" | "av" | "hvac"

function StatusRow({ icon, label, value }: { icon: StatusIcon; label: string; value: string }) {
  const Icon = (() => {
    switch (icon) {
      case "lighting": return <Lightbulb className="h-4 w-4 text-white/70" aria-hidden />
      case "av": return <Tv className="h-4 w-4 text-white/70" aria-hidden />
      case "hvac": return <Thermometer className="h-4 w-4 text-white/70" aria-hidden />
      case "curtains":
        return (
          <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 4h18" />
            <path d="M5 4v16c2-1 3-4 3-8s-1-7-3-8" />
            <path d="M19 4v16c-2-1-3-4-3-8s1-7 3-8" />
            <path d="M9 20h6" />
          </svg>
        )
    }
  })()
  return (
    <div className="flex items-center justify-between gap-3 text-white">
      <div className="flex items-center gap-2.5 min-w-0">
        {Icon}
        <span className="text-[13px] text-white/85 truncate">{label}</span>
      </div>
      <span className="text-[13px] font-medium tabular-nums text-white">{value}</span>
    </div>
  )
}

export function ExperienceDemo() {
  const [mode, setMode] = useState<Mode>("morning")
  const [isAnimating, setIsAnimating] = useState(false)
  const prevMode = useRef<Mode>("morning")

  // CCT is read-only feedback — value is auto-driven by mode transitions, never by user input.
  const [kelvin, setKelvin] = useState(KELVIN_PER_MODE.morning)
  const kelvinRef = useRef(KELVIN_PER_MODE.morning)
  useEffect(() => { kelvinRef.current = kelvin }, [kelvin])

  const [lightProgress, setLightProgress] = useState(LIGHTS_STEADY.morning)
  const lightProgressRef = useRef(LIGHTS_STEADY.morning)
  useEffect(() => { lightProgressRef.current = lightProgress }, [lightProgress])

  const stageRef = useRef<HTMLDivElement>(null)
  const warmRef = useRef<HTMLDivElement>(null)
  const skyMaskRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const curtainLRef = useRef<HTMLDivElement>(null)
  const curtainRRef = useRef<HTMLDivElement>(null)
  const nightStage1Ref = useRef<HTMLDivElement>(null)
  const nightStage2Ref = useRef<HTMLDivElement>(null)
  const nightStage3Ref = useRef<HTMLDivElement>(null)
  const nightStage4Ref = useRef<HTMLDivElement>(null)
  const morningStage1Ref = useRef<HTMLDivElement>(null)
  const morningStage2Ref = useRef<HTMLDivElement>(null)
  const morningStage3Ref = useRef<HTMLDivElement>(null)
  const morningCinema1Ref = useRef<HTMLDivElement>(null)
  const morningCinema2Ref = useRef<HTMLDivElement>(null)
  const morningCinema3Ref = useRef<HTMLDivElement>(null)
  const morningCinema4Ref = useRef<HTMLDivElement>(null)
  const nightCinema1Ref = useRef<HTMLDivElement>(null)
  const nightCinema2Ref = useRef<HTMLDivElement>(null)
  const nightCinema3Ref = useRef<HTMLDivElement>(null)
  const nightCinema4Ref = useRef<HTMLDivElement>(null)
  const tlRef = useRef<any>(null)

  const filterString = (s: LightState) =>
    `brightness(${s.brightness}) contrast(${s.contrast}) saturate(${s.saturate}) hue-rotate(${s.hueRotate}deg)`

  useEffect(() => {
    const s = STATES.morning
    gsap.set(warmRef.current, { opacity: s.warm })
    gsap.set(skyMaskRef.current, { opacity: s.skyMask })
    gsap.set(ambientRef.current, { opacity: s.ambient })
    gsap.set(dimRef.current, { opacity: s.dim })
    gsap.set(vignetteRef.current, { opacity: s.vignette })
    gsap.set(curtainLRef.current, { xPercent: -100 })
    gsap.set(curtainRRef.current, { xPercent: 100 })
    gsap.set(nightStage1Ref.current, { opacity: 0 })
    gsap.set(nightStage2Ref.current, { opacity: 0 })
    gsap.set(nightStage3Ref.current, { opacity: 0 })
    gsap.set(nightStage4Ref.current, { opacity: 0 })
    gsap.set(morningStage1Ref.current, { opacity: 0 })
    gsap.set(morningStage2Ref.current, { opacity: 0 })
    gsap.set(morningStage3Ref.current, { opacity: 0 })
    gsap.set(morningCinema1Ref.current, { opacity: 0 })
    gsap.set(morningCinema2Ref.current, { opacity: 0 })
    gsap.set(morningCinema3Ref.current, { opacity: 0 })
    gsap.set(morningCinema4Ref.current, { opacity: 0 })
    gsap.set(nightCinema1Ref.current, { opacity: 0 })
    gsap.set(nightCinema2Ref.current, { opacity: 0 })
    gsap.set(nightCinema3Ref.current, { opacity: 0 })
    gsap.set(nightCinema4Ref.current, { opacity: 0 })
    gsap.set(stageRef.current, { filter: filterString(s) })

    return () => tlRef.current?.kill()
  }, [])

  const curtainL = (c: number) => -100 + c * 100
  const curtainR = (c: number) => 100 - c * 100

  const tweenLightsTo = (tl: any, target: number, duration: number) => {
    const proxy = { v: lightProgressRef.current }
    tl.to(proxy, { v: target, duration, ease: "power2.inOut", onUpdate: () => setLightProgress(Math.round(proxy.v)) }, 0)
  }

  const tweenKelvinTo = (tl: any, target: number, duration: number) => {
    const proxy = { v: kelvinRef.current }
    tl.to(proxy, { v: target, duration, ease: "power2.inOut", onUpdate: () => setKelvin(Math.round(proxy.v / 50) * 50) }, 0)
  }

  const runTransition = useCallback((target: Mode) => {
    const from = prevMode.current
    if (from === target) return

    tlRef.current?.kill()
    setIsAnimating(true)

    const to = STATES[target]
    const D = 2.2
    const ease = "power2.inOut"

    const tl = gsap.timeline({
      defaults: { ease, duration: D },
      onComplete: () => setIsAnimating(false),
    })

    const warmEl = warmRef.current
    const skyEl = skyMaskRef.current
    const ambEl = ambientRef.current
    const dimEl = dimRef.current
    const vigEl = vignetteRef.current
    const stageEl = stageRef.current
    const cLEl = curtainLRef.current
    const cREl = curtainRRef.current
    const finalFilter = filterString(to)

    if (from === "morning" && target === "night") {
      const s1El = nightStage1Ref.current
      const s2El = nightStage2Ref.current
      const s3El = nightStage3Ref.current
      const s4El = nightStage4Ref.current

      tl.set([s1El, s2El, s3El, s4El], { opacity: 0 }, 0)
        .to(s1El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 0)
        .to(s2El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 2.4)
        .to(s3El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 4.8)
        .to(s4El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 7.2)

      tweenLightsTo(tl, LIGHTS_STEADY.night, 10)
      tweenKelvinTo(tl, KELVIN_PER_MODE.night, 10)
    }
    else if (from === "night" && target === "morning") {
      const m1El = morningStage1Ref.current
      const m2El = morningStage2Ref.current
      const m3El = morningStage3Ref.current

      tl.set([m1El, m2El, m3El], { opacity: 0 }, 0)
        .to(m1El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 0)
        .to(m2El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 2.4)
        .to(m3El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 4.8)
        .set([nightStage1Ref.current, nightStage2Ref.current, nightStage3Ref.current, nightStage4Ref.current, m1El, m2El], { opacity: 0 }, 7.8)
        .to(m3El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 7.8)

      tweenLightsTo(tl, LIGHTS_STEADY.morning, 10.8)
      tweenKelvinTo(tl, KELVIN_PER_MODE.morning, 10.8)
    }
    else if (from === "night" && target === "cinema") {
      const c1El = nightCinema1Ref.current
      const c2El = nightCinema2Ref.current
      const c3El = nightCinema3Ref.current
      const c4El = nightCinema4Ref.current

      tl.set([c1El, c2El, c3El, c4El], { opacity: 0 }, 0)
        .to(c1El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 0)
        .to(c2El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 2.4)
        .to(c3El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 4.8)
        .to(c4El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 7.2)

      tweenLightsTo(tl, LIGHTS_STEADY.cinema, 10)
      tweenKelvinTo(tl, KELVIN_PER_MODE.cinema, 10)
    }
    else if (from === "cinema" && target === "night") {
      const c1El = nightCinema1Ref.current
      const c2El = nightCinema2Ref.current
      const c3El = nightCinema3Ref.current
      const c4El = nightCinema4Ref.current

      tl.set(nightStage4Ref.current, { opacity: 1 }, 0)
        .set([c1El, c2El, c3El, c4El], { opacity: 1 }, 0)
        .set([morningCinema1Ref.current, morningCinema2Ref.current, morningCinema3Ref.current, morningCinema4Ref.current], { opacity: 0 }, 0)
        .to(c4El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 0)
        .to(c3El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 2.4)
        .to(c2El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 4.8)
        .to(c1El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 7.2)
        .set([morningStage1Ref.current, morningStage2Ref.current, morningStage3Ref.current], { opacity: 0 }, 7.2)

      tweenLightsTo(tl, LIGHTS_STEADY.night, 10)
      tweenKelvinTo(tl, KELVIN_PER_MODE.night, 10)
    }
    else if (from === "morning" && target === "cinema") {
      const c1El = morningCinema1Ref.current
      const c2El = morningCinema2Ref.current
      const c3El = morningCinema3Ref.current
      const c4El = morningCinema4Ref.current

      tl.set([c1El, c2El, c3El, c4El], { opacity: 0 }, 0)
        .to(c1El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 0)
        .to(c2El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 2.4)
        .to(c3El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 4.8)
        .to(c4El, { opacity: 1, duration: 3, ease: "power2.inOut" }, 7.2)

      tweenLightsTo(tl, LIGHTS_STEADY.cinema, 10)
      tweenKelvinTo(tl, KELVIN_PER_MODE.cinema, 10)
    }
    else if (from === "cinema" && target === "morning") {
      const c1El = morningCinema1Ref.current
      const c2El = morningCinema2Ref.current
      const c3El = morningCinema3Ref.current
      const c4El = morningCinema4Ref.current

      tl.set([c1El, c2El, c3El, c4El], { opacity: 1 }, 0)
        .set([nightCinema1Ref.current, nightCinema2Ref.current, nightCinema3Ref.current, nightCinema4Ref.current], { opacity: 0 }, 0)
        .set([morningStage1Ref.current, morningStage2Ref.current, morningStage3Ref.current], { opacity: 0 }, 0)
        .to(c4El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 0)
        .to(c3El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 2.4)
        .to(c2El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 4.8)
        .to(c1El, { opacity: 0, duration: 3, ease: "power2.inOut" }, 7.2)
        .set([nightStage1Ref.current, nightStage2Ref.current, nightStage3Ref.current, nightStage4Ref.current], { opacity: 0 }, 7.2)

      tweenLightsTo(tl, LIGHTS_STEADY.morning, 10)
      tweenKelvinTo(tl, KELVIN_PER_MODE.morning, 10)
    }

    tlRef.current = tl
    prevMode.current = target
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = (next: Mode) => {
    if (next === mode) return
    setMode(next)
    runTransition(next)
  }

  const currentButton = BUTTONS.find((b) => b.id === mode)!

  const lightRGB = kelvinToRGB(kelvin)
  const warmBg = buildWarmOverlay(lightRGB.r, lightRGB.g, lightRGB.b)
  const ambientBg = buildAmbient(lightRGB.r, lightRGB.g, lightRGB.b)
  const spotlightsBg = buildSpotlights(lightRGB.r, lightRGB.g, lightRGB.b)

  const spotlightOpacity = mode === "morning" ? 0.55 : mode === "night" ? 0.75 : 0.5

  const kelvinLabel = (() => {
    if (kelvin <= 3000) return "Warm"
    if (kelvin <= 3800) return "Soft Warm"
    if (kelvin <= 5000) return "Neutral"
    if (kelvin <= 5800) return "Cool White"
    return "Daylight"
  })()

  const lightsValue = lightProgress === 0 ? "Off" : `${lightProgress}%`

  const status = {
    lighting: lightsValue,
    curtains: mode === "morning" ? "Open" : mode === "night" ? "Partial" : "Closed",
    av: mode === "cinema" ? "ON" : mode === "night" ? "Standby" : "Off",
    hvac: "20°C",
  }

  const modeBadgeLabel = `${currentButton.label.toUpperCase()} MODE ACTIVE`

  return (
    <section id="experience" className="py-32 lg:py-40 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4">Interactive Experience</p>
          <h2 className="font-(family-name:--font-playfair) text-4xl md:text-5xl font-medium tracking-tight">Transform Your Space</h2>
          <p className="mt-6 text-xl text-background/70 max-w-2xl mx-auto">Experience how lighting transforms a space — not just functionally, but emotionally.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div ref={stageRef} className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 isolate" style={{ filter: "brightness(1) contrast(1) saturate(1) hue-rotate(0deg)", willChange: "filter" }}>
            <div className="absolute inset-0" style={{ willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src={BASE_IMAGE} alt="Luxury living room" fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>

            <div ref={nightStage1Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src="/images/night-1.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={nightStage2Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src="/images/night-2.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={nightStage3Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src="/images/night-3.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={nightStage4Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src="/images/night-4.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>

            <div ref={morningStage1Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src="/images/morning-1.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={morningStage2Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src="/images/morning-2.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={morningStage3Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)" }}>
              <Image src="/images/morning-3.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>

            <div ref={warmRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: warmBg, mixBlendMode: "overlay", opacity: 0, willChange: "opacity", transition: "background 180ms ease-out" }} />
            <div ref={skyMaskRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: SKY_MASK, opacity: 0, willChange: "opacity" }} />
            <div ref={ambientRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: ambientBg, mixBlendMode: "screen", opacity: 0, willChange: "opacity", transition: "background 180ms ease-out" }} />
            <div ref={dimRef} aria-hidden className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: 0, willChange: "opacity" }} />
            <div ref={vignetteRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: VIGNETTE, opacity: 0, willChange: "opacity" }} />

            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: spotlightsBg, mixBlendMode: "overlay", opacity: spotlightOpacity, transition: "background 180ms ease-out, opacity 600ms ease-out", zIndex: 19 }} />

            <div ref={curtainLRef} aria-hidden className="absolute top-0 bottom-0 left-0 pointer-events-none" style={{ width: "52%", background: CURTAIN_FABRIC, boxShadow: "inset -40px 0 60px -20px rgba(0,0,0,0.6), inset -2px 0 0 0 rgba(255,240,210,0.3), 4px 0 12px rgba(0,0,0,0.4)", transform: "translateX(-100%)", willChange: "transform", zIndex: 20 }} />
            <div ref={curtainRRef} aria-hidden className="absolute top-0 bottom-0 right-0 pointer-events-none" style={{ width: "52%", background: CURTAIN_FABRIC, boxShadow: "inset 40px 0 60px -20px rgba(0,0,0,0.6), inset 2px 0 0 0 rgba(255,240,210,0.3), -4px 0 12px rgba(0,0,0,0.4)", transform: "translateX(100%)", willChange: "transform", zIndex: 20 }} />

            <div ref={morningCinema1Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/morning-cinema-1.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={morningCinema2Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/morning-cinema-2.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={morningCinema3Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/morning-cinema-3.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={morningCinema4Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/morning-cinema-4.webp" alt="Living room in cinema mode" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={nightCinema1Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/night-cinema-1.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={nightCinema2Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/night-cinema-2.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={nightCinema3Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/night-cinema-3.webp" alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>
            <div ref={nightCinema4Ref} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity", transform: "translateZ(0)", zIndex: 25 }}>
              <Image src="/images/night-cinema-4.webp" alt="Living room in cinema mode" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
            </div>

            <div className="absolute bottom-24 right-6 pointer-events-none z-30" key={`badge-${mode}`}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 animate-in fade-in slide-in-from-bottom-1 duration-500">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] tracking-[0.18em] font-medium text-white/90">{modeBadgeLabel}</span>
              </div>
            </div>

            <div className="hidden md:block absolute top-6 right-6 pointer-events-none z-30 w-[260px]">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2 ml-1">System Status</p>
              <div className="rounded-2xl bg-black/65 backdrop-blur-md border border-white/10 p-4 space-y-3">
                <StatusRow icon="lighting" label="Living Lights" value={status.lighting} />
                <StatusRow icon="curtains" label="Curtains" value={status.curtains} />
                <StatusRow icon="av" label="AV" value={status.av} />
                <StatusRow icon="hvac" label="HVAC" value={status.hvac} />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none z-30">
              <div key={mode} className="bg-black/55 backdrop-blur-md rounded-lg px-5 py-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-base font-medium text-white">{currentButton.label} Mode</p>
                <p className="text-sm text-white/70 mt-1">{currentButton.desc}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-8" role="tablist" aria-label="Lighting mode">
            {BUTTONS.map((b) => {
              const Icon = b.icon
              const active = mode === b.id
              return (
                <button
                  key={b.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelect(b.id)}
                  className={[
                    "flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-background/60",
                    active ? "bg-background text-foreground shadow-lg scale-105" : "bg-background/10 text-background/80 hover:bg-background/20",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="font-medium">{b.label}</span>
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-center text-xs text-background/40 tabular-nums" aria-live="polite">
            {isAnimating ? "transitioning…" : `${currentButton.label.toLowerCase()} — steady`}
          </p>

          {/* ═══════════ Ambient Temperature — READ-ONLY feedback display ═══════════ */}
          <div className="mt-10 max-w-md mx-auto">
            <div className="rounded-2xl bg-background/5 border border-background/10 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.18em] text-background/70">
                  Ambient Temperature
                </span>
                <span className="text-sm tabular-nums text-background">
                  {kelvinLabel} <span className="text-background/60">{kelvin}K</span>
                </span>
              </div>
              {/* Read-only feedback display.
                  Uses pointer-events-none + readOnly + aria-readonly to fully
                  disable user interaction while keeping the slider's thumb
                  position as a visual indicator. opacity-100 on disabled keeps
                  the colors crisp (browsers normally fade disabled inputs). */}
              <input
                id="kelvin-slider"
                type="range"
                min={2700}
                max={6500}
                step={50}
                value={kelvin}
                readOnly
                tabIndex={-1}
                aria-label="Ambient temperature in Kelvin (read-only)"
                aria-readonly="true"
                onChange={() => { /* read-only: ignore any value change */ }}
                className="w-full h-2 rounded-full appearance-none cursor-default pointer-events-none opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, #ff8a3d 0%, #ffe0b8 47%, #f5f5f5 53%, #cfe3ff 75%, #6aa8ff 100%)",
                }}
              />
              <div className="flex justify-between text-[10px] mt-2 tabular-nums">
                <span className="text-amber-300/90">2700K</span>
                <span className="text-background/50">4600K</span>
                <span className="text-sky-300/90">6500K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
