"use client"

import Image from "next/image"
import { Film, Lightbulb, Moon, Sun, Thermometer, Tv } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

type Mode = "morning" | "evening" | "cinema" | "away"

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
  spotlights: number
}

type Scene = {
  id: Mode
  label: string
  icon: typeof Sun
  desc: string
  lighting: number
  kelvin: number
  curtains: string
  climate: number
  entertainment: "Off" | "On"
  visual: LightState
}

const BASE_IMAGE = "/images/living-room-morning.webp"

const SCENES: Record<Mode, Scene> = {
  morning: {
    id: "morning",
    label: "Morning",
    icon: Sun,
    desc: "Natural daylight, a refreshing atmosphere and a comfortable start to the day.",
    lighting: 45,
    kelvin: 5000,
    curtains: "Open",
    climate: 22,
    entertainment: "Off",
    visual: { warm: 0, skyMask: 0, ambient: 0.12, dim: 0, vignette: 0, brightness: 1, contrast: 1, saturate: 1, hueRotate: 0, spotlights: 0.45 },
  },
  evening: {
    id: "evening",
    label: "Evening",
    icon: Moon,
    desc: "Warm ambient light settles in as the day winds down.",
    lighting: 42,
    kelvin: 2700,
    curtains: "Partially open",
    climate: 21,
    entertainment: "Off",
    visual: { warm: 0.24, skyMask: 0.12, ambient: 0.42, dim: 0.12, vignette: 0.08, brightness: 0.96, contrast: 1.03, saturate: 0.96, hueRotate: -2, spotlights: 0.5 },
  },
  cinema: {
    id: "cinema",
    label: "Cinema",
    icon: Film,
    desc: "A quieter lighting scene for an evening on the big screen.",
    lighting: 14,
    kelvin: 2700,
    curtains: "Closed",
    climate: 20,
    entertainment: "On",
    visual: { warm: 0.2, skyMask: 0.38, ambient: 0.2, dim: 0.24, vignette: 0.18, brightness: 0.86, contrast: 1.08, saturate: 0.94, hueRotate: -2, spotlights: 0.28 },
  },
  away: {
    id: "away",
    label: "Away",
    icon: Sun,
    desc: "Non-essential lighting and entertainment switch off while the home saves energy.",
    lighting: 0,
    kelvin: 4000,
    curtains: "35% open",
    climate: 19,
    entertainment: "Off",
    visual: { warm: 0, skyMask: 0.08, ambient: 0.02, dim: 0.16, vignette: 0.02, brightness: 0.96, contrast: 1, saturate: 0.9, hueRotate: 0, spotlights: 0.12 },
  },
}

const BUTTONS = Object.values(SCENES)

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

const filterString = (s: LightState) =>
  `brightness(${s.brightness}) contrast(${s.contrast}) saturate(${s.saturate}) hue-rotate(${s.hueRotate}deg)`

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
  const [kelvin, setKelvin] = useState(SCENES.morning.kelvin)
  const kelvinRef = useRef(SCENES.morning.kelvin)
  const [lightProgress, setLightProgress] = useState(SCENES.morning.lighting)
  const lightProgressRef = useRef(SCENES.morning.lighting)

  const stageRef = useRef<HTMLDivElement>(null)
  const warmRef = useRef<HTMLDivElement>(null)
  const skyMaskRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<any>(null)

  useEffect(() => {
    const initial = SCENES.morning.visual
    gsap.set(warmRef.current, { opacity: initial.warm })
    gsap.set(skyMaskRef.current, { opacity: initial.skyMask })
    gsap.set(ambientRef.current, { opacity: initial.ambient })
    gsap.set(dimRef.current, { opacity: initial.dim })
    gsap.set(vignetteRef.current, { opacity: initial.vignette })
    gsap.set(stageRef.current, { filter: filterString(initial) })

    return () => tlRef.current?.kill()
  }, [])

  const runTransition = (target: Mode) => {
    if (prevMode.current === target) return

    tlRef.current?.kill()
    setIsAnimating(true)

    const scene = SCENES[target]
    const visual = scene.visual
    const duration = 2.4
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut", duration },
      onComplete: () => setIsAnimating(false),
    })

    const lights = { value: lightProgressRef.current }
    const temperature = { value: kelvinRef.current }

    timeline
      .to(warmRef.current, { opacity: visual.warm }, 0)
      .to(skyMaskRef.current, { opacity: visual.skyMask }, 0)
      .to(ambientRef.current, { opacity: visual.ambient }, 0)
      .to(dimRef.current, { opacity: visual.dim }, 0)
      .to(vignetteRef.current, { opacity: visual.vignette }, 0)
      .to(stageRef.current, { filter: filterString(visual) }, 0)
      .to(lights, {
        value: scene.lighting,
        onUpdate: () => {
          const value = Math.round(lights.value)
          lightProgressRef.current = value
          setLightProgress(value)
        },
      }, 0)
      .to(temperature, {
        value: scene.kelvin,
        onUpdate: () => {
          const value = Math.round(temperature.value / 50) * 50
          kelvinRef.current = value
          setKelvin(value)
        },
      }, 0)

    tlRef.current = timeline
    prevMode.current = target
  }

  const handleSelect = (next: Mode) => {
    if (next === mode) return
    setMode(next)
    runTransition(next)
  }

  const currentButton = SCENES[mode]

  const lightRGB = kelvinToRGB(kelvin)
  const warmBg = buildWarmOverlay(lightRGB.r, lightRGB.g, lightRGB.b)
  const ambientBg = buildAmbient(lightRGB.r, lightRGB.g, lightRGB.b)
  const spotlightsBg = buildSpotlights(lightRGB.r, lightRGB.g, lightRGB.b)
  const spotlightOpacity = currentButton.visual.spotlights

  const kelvinLabel = (() => {
    if (kelvin <= 3000) return "Warm white"
    if (kelvin <= 3800) return "Soft warm"
    if (kelvin <= 5000) return "Neutral white"
    if (kelvin <= 5800) return "Cool white"
    return "Daylight"
  })()

  const status = {
    lighting: lightProgress === 0 ? "Off" : `${lightProgress}%`,
    curtains: currentButton.curtains,
    av: currentButton.entertainment,
    hvac: `${currentButton.climate}°C target`,
  }

  const modeBadgeLabel = `${currentButton.label.toUpperCase()} SCENE ACTIVE`

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

            <div ref={warmRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: warmBg, mixBlendMode: "overlay", opacity: 0, willChange: "opacity", transition: "background 180ms ease-out" }} />
            <div ref={skyMaskRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: SKY_MASK, opacity: 0, willChange: "opacity" }} />
            <div ref={ambientRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: ambientBg, mixBlendMode: "screen", opacity: 0, willChange: "opacity", transition: "background 180ms ease-out" }} />
            <div ref={dimRef} aria-hidden className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: 0, willChange: "opacity" }} />
            <div ref={vignetteRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: VIGNETTE, opacity: 0, willChange: "opacity" }} />

            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: spotlightsBg, mixBlendMode: "overlay", opacity: spotlightOpacity, transition: "background 180ms ease-out, opacity 600ms ease-out", zIndex: 19 }} />


            <div className="absolute bottom-24 right-6 pointer-events-none z-30" key={`badge-${mode}`}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 animate-in fade-in slide-in-from-bottom-1 duration-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d8c6a5] animate-pulse" />
                <span className="text-[10px] tracking-[0.18em] font-medium text-white/90">{modeBadgeLabel}</span>
              </div>
            </div>

            <div className="hidden md:block absolute top-6 right-6 pointer-events-none z-30 w-[260px]">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2 ml-1">System Status</p>
              <div className="rounded-2xl bg-black/65 backdrop-blur-md border border-white/10 p-4 space-y-3">
                <StatusRow icon="lighting" label="Living Lights" value={status.lighting} />
                <StatusRow icon="curtains" label="Curtains" value={status.curtains} />
                <StatusRow icon="av" label="AV" value={status.av} />
                <StatusRow icon="hvac" label="Climate target" value={status.hvac} />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none z-30">
              <div key={mode} className="bg-black/55 backdrop-blur-md rounded-lg px-5 py-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-base font-medium text-white">{currentButton.label} Mode</p>
                <p className="text-sm text-white/70 mt-1">{currentButton.desc}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-8" role="group" aria-label="Choose a home scene">
            {BUTTONS.map((b) => {
              const Icon = b.icon
              const active = mode === b.id
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={active}
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

          <p className="mt-3 text-center text-xs text-background/40">Website simulation · No hardware connected</p>

          <div className="mt-10 max-w-md mx-auto">
            <div className="rounded-2xl bg-background/5 border border-background/10 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.18em] text-background/70">
                  Light Colour Temperature
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
                aria-label="Light colour temperature in Kelvin (read-only)"
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
