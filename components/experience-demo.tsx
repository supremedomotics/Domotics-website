"use client"

import Image from "next/image"
import { Film, Lightbulb, Moon, Sun, Thermometer, Tv } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

type Mode = "morning" | "evening" | "movie" | "away"

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
}

type Scene = {
  id: Mode
  label: string
  icon: typeof Sun
  desc: string
  lighting: number
  kelvin: number
  curtains: number
  climate: number
  entertainment: "Off" | "Music" | "Movie"
  visual: LightState
}

const BASE_IMAGE = "/images/living-room-morning.webp"

const SCENES: Record<Mode, Scene> = {
  morning: {
    id: "morning",
    label: "Morning",
    icon: Sun,
    desc: "Start the day with natural light and a refreshing atmosphere.",
    lighting: 45,
    kelvin: 5000,
    curtains: 100,
    climate: 22,
    entertainment: "Off",
    visual: { warm: 0, skyMask: 0, ambient: 0.12, dim: 0, vignette: 0, brightness: 1, contrast: 1, saturate: 1, hueRotate: 0 },
  },
  evening: {
    id: "evening",
    label: "Evening",
    icon: Moon,
    desc: "Transition into a warm, relaxed atmosphere.",
    lighting: 53,
    kelvin: 2700,
    curtains: 55,
    climate: 21,
    entertainment: "Music",
    visual: { warm: 0.28, skyMask: 0.12, ambient: 0.42, dim: 0.08, vignette: 0.05, brightness: 0.98, contrast: 1.03, saturate: 0.98, hueRotate: -1 },
  },
  movie: {
    id: "movie",
    label: "Movie",
    icon: Film,
    desc: "Settle in for a film with closed curtains and low, warm lighting.",
    lighting: 17,
    kelvin: 2700,
    curtains: 0,
    climate: 20,
    entertainment: "Movie",
    visual: { warm: 0.2, skyMask: 0.75, ambient: 0.2, dim: 0.18, vignette: 0.14, brightness: 0.92, contrast: 1.06, saturate: 0.95, hueRotate: -2 },
  },
  away: {
    id: "away",
    label: "Away",
    icon: Sun,
    desc: "Non-essential lighting and entertainment switch off while the home saves energy.",
    lighting: 0,
    kelvin: 4000,
    curtains: 35,
    climate: 19,
    entertainment: "Off",
    visual: { warm: 0, skyMask: 0, ambient: 0, dim: 0, vignette: 0, brightness: 1, contrast: 1, saturate: 1, hueRotate: 0 },
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
  `radial-gradient(ellipse 10% 15% at 25% 5.5%, rgba(${r},${g},${b},0.72), transparent 100%), ` +
  `radial-gradient(ellipse 10% 15% at 67% 5.5%, rgba(${r},${g},${b},0.72), transparent 100%), ` +
  `radial-gradient(ellipse 15% 24% at 20% 59%, rgba(${r},${g},${b},0.64), transparent 100%), ` +
  `radial-gradient(ellipse 15% 24% at 69% 59%, rgba(${r},${g},${b},0.64), transparent 100%), ` +
  `radial-gradient(ellipse 48% 14% at 50% 0%, rgba(${r},${g},${b},0.24), transparent 100%)`

const LIGHTS_OFF =
  "radial-gradient(ellipse 1.2% 1.8% at 25% 5.5%, rgba(24,21,18,0.48) 0%, rgba(24,21,18,0.2) 48%, transparent 100%), " +
  "radial-gradient(ellipse 1.2% 1.8% at 67% 5.5%, rgba(24,21,18,0.48) 0%, rgba(24,21,18,0.2) 48%, transparent 100%), " +
  "radial-gradient(ellipse 6% 9% at 20% 59%, rgba(24,21,18,0.3) 0%, transparent 100%), " +
  "radial-gradient(ellipse 6% 9% at 69% 59%, rgba(24,21,18,0.3) 0%, transparent 100%), " +
  "radial-gradient(ellipse 78% 8% at 50% 12%, rgba(24,21,18,0.82) 0%, rgba(24,21,18,0.42) 52%, transparent 100%)"

const SKY_MASK =
  "linear-gradient(90deg," +
  " rgba(8,10,14,1) 0%, rgba(8,10,14,1) 12%, rgba(8,10,14,0) 18%," +
  " rgba(8,10,14,0) 82%, rgba(8,10,14,1) 88%, rgba(8,10,14,1) 100%)"

const VIGNETTE =
  "radial-gradient(ellipse 85% 75% at center, transparent 42%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.92) 100%)"

const filterString = (s: LightState) =>
  `brightness(${s.brightness}) contrast(${s.contrast}) saturate(${s.saturate}) hue-rotate(${s.hueRotate}deg)`

const curtainOffset = (position: number, side: "left" | "right") =>
  (100 - position) * (side === "left" ? -0.09 : 0.11)

const curtainScale = (position: number) => 1 + ((100 - position) / 100) * 1.2

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

function SceneRangeControl({
  id,
  label,
  value,
  min,
  max,
  suffix = "%",
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-xs text-background/70">{label}</label>
        <output htmlFor={id} className="text-xs tabular-nums text-background">{value}{suffix}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#d8c6a5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
      />
    </div>
  )
}

export function ExperienceDemo() {
  const [mode, setMode] = useState<Mode>("morning")
  const [isAnimating, setIsAnimating] = useState(false)
  const prevMode = useRef<Mode>("morning")
  const [isCustom, setIsCustom] = useState(false)
  const [kelvin, setKelvin] = useState(SCENES.morning.kelvin)
  const kelvinRef = useRef(SCENES.morning.kelvin)
  const [lightProgress, setLightProgress] = useState(SCENES.morning.lighting)
  const lightProgressRef = useRef(SCENES.morning.lighting)
  const [curtainOpen, setCurtainOpen] = useState(SCENES.morning.curtains)
  const curtainOpenRef = useRef(SCENES.morning.curtains)
  const [climateTarget, setClimateTarget] = useState(SCENES.morning.climate)
  const climateTargetRef = useRef(SCENES.morning.climate)

  const stageRef = useRef<HTMLDivElement>(null)
  const warmRef = useRef<HTMLDivElement>(null)
  const skyMaskRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const curtainLRef = useRef<HTMLDivElement>(null)
  const curtainRRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<any>(null)
  useEffect(() => {
    const initial = SCENES.morning.visual
    gsap.set(warmRef.current, { opacity: initial.warm })
    gsap.set(skyMaskRef.current, { opacity: initial.skyMask })
    gsap.set(ambientRef.current, { opacity: initial.ambient })
    gsap.set(dimRef.current, { opacity: initial.dim })
    gsap.set(vignetteRef.current, { opacity: initial.vignette })
    gsap.set(curtainLRef.current, { xPercent: curtainOffset(SCENES.morning.curtains, "left"), scaleX: curtainScale(SCENES.morning.curtains), transformOrigin: "19% center" })
    gsap.set(curtainRRef.current, { xPercent: curtainOffset(SCENES.morning.curtains, "right"), scaleX: curtainScale(SCENES.morning.curtains), transformOrigin: "78% center" })
    gsap.set(stageRef.current, { filter: filterString(initial) })

    return () => {
      tlRef.current?.kill()
      gsap.killTweensOf([curtainLRef.current, curtainRRef.current])
    }
  }, [])

  const runTransition = (target: Mode, force = false) => {
    if (prevMode.current === target && !force) return

    tlRef.current?.kill()
    gsap.killTweensOf([curtainLRef.current, curtainRRef.current])
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
    const curtains = { value: curtainOpenRef.current }
    const climate = { value: climateTargetRef.current }

    timeline
      .to(warmRef.current, { opacity: visual.warm }, 0)
      .to(skyMaskRef.current, { opacity: visual.skyMask }, 0)
      .to(ambientRef.current, { opacity: visual.ambient }, 0)
      .to(dimRef.current, { opacity: visual.dim }, 0)
      .to(vignetteRef.current, { opacity: visual.vignette }, 0)
      .to(stageRef.current, { filter: filterString(visual) }, 0)
      .to(curtainLRef.current, { xPercent: curtainOffset(scene.curtains, "left"), scaleX: curtainScale(scene.curtains) }, 0)
      .to(curtainRRef.current, { xPercent: curtainOffset(scene.curtains, "right"), scaleX: curtainScale(scene.curtains) }, 0)
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
      .to(curtains, {
        value: scene.curtains,
        onUpdate: () => {
          const value = Math.round(curtains.value)
          curtainOpenRef.current = value
          setCurtainOpen(value)
        },
      }, 0)
      .to(climate, {
        value: scene.climate,
        onUpdate: () => {
          const value = Math.round(climate.value)
          climateTargetRef.current = value
          setClimateTarget(value)
        },
      }, 0)

    tlRef.current = timeline
    prevMode.current = target
  }

  const handleSelect = (next: Mode) => {
    const scene = SCENES[next]
    const isCurrentScene = next === mode
    if (
      isCurrentScene &&
      !isCustom &&
      lightProgressRef.current === scene.lighting &&
      kelvinRef.current === scene.kelvin &&
      curtainOpenRef.current === scene.curtains &&
      climateTargetRef.current === scene.climate
    ) return

    setMode(next)
    setIsCustom(false)
    runTransition(next, isCurrentScene)
  }

  const interruptTransition = () => {
    tlRef.current?.kill()
    gsap.killTweensOf([curtainLRef.current, curtainRRef.current])
    setIsAnimating(false)
  }

  const handleManualLight = (value: number) => {
    interruptTransition()
    setIsCustom(true)
    lightProgressRef.current = value
    setLightProgress(value)
  }

  const handleManualKelvin = (value: number) => {
    interruptTransition()
    setIsCustom(true)
    kelvinRef.current = value
    setKelvin(value)
  }

  const handleManualCurtains = (value: number) => {
    interruptTransition()
    setIsCustom(true)
    curtainOpenRef.current = value
    setCurtainOpen(value)
    gsap.to(curtainLRef.current, { xPercent: curtainOffset(value, "left"), scaleX: curtainScale(value), duration: 0.45, ease: "power2.inOut", overwrite: "auto" })
    gsap.to(curtainRRef.current, { xPercent: curtainOffset(value, "right"), scaleX: curtainScale(value), duration: 0.45, ease: "power2.inOut", overwrite: "auto" })
  }

  const handleManualClimate = (value: number) => {
    interruptTransition()
    setIsCustom(true)
    climateTargetRef.current = value
    setClimateTarget(value)
  }

  const currentScene = SCENES[mode]

  const lightRGB = kelvinToRGB(kelvin)
  const warmBg = buildWarmOverlay(lightRGB.r, lightRGB.g, lightRGB.b)
  const ambientBg = buildAmbient(lightRGB.r, lightRGB.g, lightRGB.b)
  const spotlightsBg = buildSpotlights(lightRGB.r, lightRGB.g, lightRGB.b)
  const spotlightOpacity = lightProgress / 100

  const kelvinLabel = (() => {
    if (kelvin <= 3000) return "Warm white"
    if (kelvin <= 3800) return "Soft warm"
    if (kelvin <= 5000) return "Neutral white"
    if (kelvin <= 5800) return "Cool white"
    return "Daylight"
  })()

  const status = {
    lighting: lightProgress === 0 ? "Off" : `${lightProgress}%`,
    curtains: curtainOpen === 0 ? "Closed · 0%" : curtainOpen === 100 ? "Open · 100%" : `${curtainOpen}% open`,
    av: currentScene.entertainment,
    hvac: `${climateTarget}°C target`,
  }

  const modeBadgeLabel = isCustom ? "CUSTOM SCENE ACTIVE" : `${currentScene.label.toUpperCase()} SCENE ACTIVE`

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

            <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
              <div ref={curtainLRef} className="absolute inset-0 will-change-transform" style={{ clipPath: "inset(14% 81% 26% 14%)", maskImage: "linear-gradient(180deg, transparent 14%, black 19%, black 67%, transparent 74%)", WebkitMaskImage: "linear-gradient(180deg, transparent 14%, black 19%, black 67%, transparent 74%)" }}>
                <Image src={BASE_IMAGE} alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
              </div>
              <div ref={curtainRRef} className="absolute inset-0 will-change-transform" style={{ clipPath: "inset(14% 17% 26% 78%)", maskImage: "linear-gradient(180deg, transparent 14%, black 19%, black 67%, transparent 74%)", WebkitMaskImage: "linear-gradient(180deg, transparent 14%, black 19%, black 67%, transparent 74%)" }}>
                <Image src={BASE_IMAGE} alt="" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover select-none" draggable={false} />
              </div>
            </div>

            <div ref={warmRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: warmBg, mixBlendMode: "overlay", opacity: 0, willChange: "opacity", transition: "background 180ms ease-out" }} />
            <div ref={skyMaskRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: SKY_MASK, opacity: 0, willChange: "opacity" }} />
            <div ref={ambientRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: ambientBg, mixBlendMode: "screen", opacity: 0, willChange: "opacity", transition: "background 180ms ease-out" }} />
            <div ref={dimRef} aria-hidden className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: 0, willChange: "opacity" }} />
            <div ref={vignetteRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: VIGNETTE, opacity: 0, willChange: "opacity" }} />
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: LIGHTS_OFF, mixBlendMode: "multiply", opacity: 1 - spotlightOpacity, transition: "opacity 120ms linear", willChange: "opacity", zIndex: 18 }} />
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: spotlightsBg, mixBlendMode: "screen", opacity: spotlightOpacity, transition: "background 180ms ease-out, opacity 120ms linear", willChange: "opacity", zIndex: 19 }} />


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
              <div key={`${mode}-${isCustom}`} className="bg-black/55 backdrop-blur-md rounded-lg px-5 py-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-base font-medium text-white">{isCustom ? "Custom Scene" : `${currentScene.label} Mode`}</p>
                <p className="text-sm text-white/70 mt-1">{isCustom ? "Manual settings are active for this room." : currentScene.desc}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-8" role="group" aria-label="Choose a home scene">
            {BUTTONS.map((b) => {
              const Icon = b.icon
              const active = !isCustom && mode === b.id
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
            {isAnimating ? "transitioning…" : isCustom ? "custom scene — steady" : `${currentScene.label.toLowerCase()} — steady`}
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
              <input
                id="kelvin-slider"
                type="range"
                min={2700}
                max={6500}
                step={50}
                value={kelvin}
                aria-label="Light colour temperature in Kelvin"
                onChange={(event) => handleManualKelvin(Number(event.currentTarget.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60"
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

          <div className="mt-4 max-w-md mx-auto">
            <details className="group rounded-2xl bg-background/5 border border-background/10 backdrop-blur-md">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-background/60 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-sm font-medium text-background">Manual controls</span>
                  <span className="mt-1 block text-xs text-background/50">Adjust lighting, curtains and climate</span>
                </span>
                <span aria-hidden="true" className="text-xl text-background/55 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="space-y-5 border-t border-background/10 px-5 py-5">
                <SceneRangeControl id="manual-lighting" label="Lighting brightness" value={lightProgress} min={0} max={100} onChange={handleManualLight} />
                <SceneRangeControl id="manual-curtains" label="Curtain position · open" value={curtainOpen} min={0} max={100} onChange={handleManualCurtains} />
                <SceneRangeControl id="manual-climate" label="Climate target" value={climateTarget} min={18} max={30} suffix="°C" onChange={handleManualClimate} />
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}
