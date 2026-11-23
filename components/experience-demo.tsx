"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Film, Moon, RotateCcw, Shield, Sun, Thermometer, Tv, Lightbulb, PanelTop } from "lucide-react"

type SceneId = "morning" | "evening" | "cinema" | "away"
type SceneState = {
  main: number
  ambient: number
  accent: number
  kelvin: number
  curtains: number
  setpoint: number
  security: "Disarmed" | "Armed" | "Away mode"
  entertainment: "Off" | "Music" | "Cinema"
}

type Scene = {
  id: SceneId
  name: string
  description: string
  icon: typeof Sun
  state: SceneState
}

const SCENES: Scene[] = [
  { id: "morning", name: "Morning", description: "Start the day with natural light and a refreshing atmosphere.", icon: Sun, state: { main: 82, ambient: 34, accent: 20, kelvin: 5000, curtains: 100, setpoint: 22, security: "Disarmed", entertainment: "Off" } },
  { id: "evening", name: "Evening", description: "Transition into a warm, relaxed atmosphere.", icon: Moon, state: { main: 44, ambient: 70, accent: 46, kelvin: 2700, curtains: 15, setpoint: 21, security: "Disarmed", entertainment: "Music" } },
  { id: "cinema", name: "Cinema", description: "Transform your living space into a private cinema.", icon: Film, state: { main: 8, ambient: 16, accent: 28, kelvin: 2700, curtains: 0, setpoint: 20, security: "Disarmed", entertainment: "Cinema" } },
  { id: "away", name: "Away", description: "Your home intelligently prepares when you leave.", icon: Shield, state: { main: 0, ambient: 0, accent: 0, kelvin: 4000, curtains: 35, setpoint: 19, security: "Away mode", entertainment: "Off" } },
]

const INITIAL_STATE = SCENES[0].state

function averageLighting(state: SceneState) {
  return Math.round((state.main + state.ambient + state.accent) / 3)
}

function RangeControl({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "%",
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm text-white/75">{label}</label>
        <output htmlFor={id} className="min-w-12 text-right text-sm tabular-nums text-white">{value}{suffix}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#d8c6a5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c6a5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b1b19]"
      />
    </div>
  )
}

function StatusItem({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#d8c6a5]" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</p>
        <p className="mt-1 truncate text-sm text-white">{value}</p>
      </div>
    </div>
  )
}

export function ExperienceDemo() {
  const [sceneId, setSceneId] = useState<SceneId>("morning")
  const [state, setState] = useState<SceneState>({ ...INITIAL_STATE })
  const [isCustom, setIsCustom] = useState(false)
  const scene = SCENES.find((item) => item.id === sceneId) ?? SCENES[0]

  const update = (changes: Partial<SceneState>) => {
    setState((current) => ({ ...current, ...changes }))
    setIsCustom(true)
  }

  const lightLevel = averageLighting(state)
  const kelvinLabel = state.kelvin < 3200 ? "Warm white" : state.kelvin < 4500 ? "Soft neutral" : "Daylight white"
  const roomStyle = useMemo(() => {
    const brightness = 0.38 + (state.main / 100) * 0.62 + (state.ambient / 100) * 0.1
    const warmth = Math.max(0, Math.min(1, (4300 - state.kelvin) / 2100))
    return {
      filter: `brightness(${brightness}) saturate(${0.72 + state.accent / 260})`,
      background: `radial-gradient(ellipse at 50% 45%, rgba(255, 176, 90, ${Math.min(0.36, state.ambient / 260 + warmth * 0.09)}) 0%, transparent 68%), radial-gradient(ellipse at 72% 75%, rgba(255, 205, 135, ${state.accent / 440}) 0%, transparent 42%), linear-gradient(180deg, rgba(255, 193, 119, ${warmth * 0.18}) 0%, rgba(255, 164, 76, ${warmth * 0.1}) 100%)`,
    }
  }, [state.accent, state.ambient, state.kelvin, state.main])

  const applyScene = (nextScene: Scene) => {
    setSceneId(nextScene.id)
    setState({ ...nextScene.state })
    setIsCustom(false)
  }

  const reset = () => applyScene(SCENES[0])

  const updateMaster = (value: number) => update({ main: value, ambient: value, accent: value })
  const curtainLabel = state.curtains >= 85 ? "Open" : state.curtains <= 15 ? "Closed" : `${state.curtains}% open`

  return (
    <section id="experience" className="bg-[#1b1b19] py-20 text-white md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-white/55">Experience Intelligent Living</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            One Home. Different Moods. Effortlessly Connected.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Experience how lighting, climate, curtains and entertainment work together through intelligently designed scenes.
          </p>
        </header>

        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Choose a moment</p>
              <p className="mt-1 text-sm text-white/70">One tap brings the room into rhythm.</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[11px] tracking-wide text-white/60">
              <span className="size-1.5 rounded-full bg-[#d8c6a5]" aria-hidden="true" />
              Website simulation · No hardware connected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3" role="group" aria-label="Choose a home scene">
            {SCENES.map((item) => {
              const Icon = item.icon
              const selected = !isCustom && sceneId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => applyScene(item)}
                  aria-pressed={selected}
                  className={`flex min-h-14 items-center justify-center gap-2.5 rounded-full border px-4 py-3 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c6a5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1b19] sm:justify-start sm:px-5 ${selected ? "border-[#d8c6a5] bg-[#d8c6a5] text-[#1b1b19]" : "border-white/15 bg-white/[0.035] text-white/80 hover:border-white/35 hover:bg-white/[0.08]"}`}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>

          <p className="mt-4 min-h-6 text-sm text-white/60" aria-live="polite">
            {isCustom ? "Customised scene · " : ""}{scene.description}
          </p>

          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl bg-[#242320] shadow-2xl sm:aspect-[16/9] lg:aspect-[2/1]">
            <div className="absolute inset-0 transition-[filter] duration-1000 ease-in-out motion-reduce:transition-none" style={roomStyle}>
              <Image
                src="/images/living-room-morning.webp"
                alt="A contemporary residence living room with floor-to-ceiling windows, cove lighting and a view over the city"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1152px"
                className="object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none" style={{ background: roomStyle.background }} />
            <div aria-hidden="true" className="absolute inset-0 bg-[#11100e] transition-opacity duration-700 ease-in-out motion-reduce:transition-none" style={{ opacity: (100 - state.main) / 180 }} />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-10 w-1/2 origin-left border-r border-white/10 bg-[repeating-linear-gradient(90deg,#c9b99f_0px,#b9a889_12px,#d5c6ad_24px,#b9a889_34px,#c9b99f_48px)] shadow-[inset_-18px_0_24px_-18px_rgba(0,0,0,0.75)] transition-transform duration-1000 ease-in-out motion-reduce:transition-none"
              style={{ transform: `translateX(${-state.curtains}%)` }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 z-10 w-1/2 origin-right border-l border-white/10 bg-[repeating-linear-gradient(90deg,#c9b99f_0px,#b9a889_12px,#d5c6ad_24px,#b9a889_34px,#c9b99f_48px)] shadow-[inset_18px_0_24px_-18px_rgba(0,0,0,0.75)] transition-transform duration-1000 ease-in-out motion-reduce:transition-none"
              style={{ transform: `translateX(${state.curtains}%)` }}
            />
            <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-6">
              <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                {isCustom ? "Customised scene" : `${scene.name} scene`}
              </div>
              <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] tracking-wide text-white/80 backdrop-blur-sm">
                Simulation only
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-20 sm:p-6 sm:pt-24">
              <div className="max-w-lg">
                <p className="font-[family-name:var(--font-playfair)] text-2xl text-white sm:text-3xl">{scene.name}</p>
                <p className="mt-1 text-xs text-white/75 sm:text-sm">{state.entertainment === "Cinema" ? "Cinema experience ready" : state.entertainment === "Music" ? "Music atmosphere ready" : scene.description}</p>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs text-white/85 backdrop-blur-sm sm:flex">
                <Lightbulb aria-hidden="true" className="size-3.5 text-[#e5c99c]" /> {lightLevel}% light
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-4 sm:p-5">
            <StatusItem icon={Lightbulb} label="Lighting" value={`${lightLevel}% · ${state.kelvin}K`} />
            <StatusItem icon={PanelTop} label="Curtains" value={curtainLabel} />
            <StatusItem icon={Thermometer} label="Climate setpoint" value={`${state.setpoint}°C target`} />
            <StatusItem icon={Tv} label="Entertainment" value={state.entertainment} />
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.035]">
            <details className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d8c6a5] sm:px-6 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-sm font-medium text-white">Adjust the details</span>
                  <span className="mt-1 block text-xs text-white/50">Personalise light, curtains and climate</span>
                </span>
                <span aria-hidden="true" className="text-xl text-white/55 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="grid gap-x-10 gap-y-9 border-t border-white/10 px-5 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/50">Lighting</h3>
                  <RangeControl id="master-light" label="Master level" value={lightLevel} min={0} max={100} onChange={updateMaster} />
                  <RangeControl id="main-light" label="Main lighting" value={state.main} min={0} max={100} onChange={(main) => update({ main })} />
                  <RangeControl id="ambient-light" label="Ambient lighting" value={state.ambient} min={0} max={100} onChange={(ambient) => update({ ambient })} />
                  <RangeControl id="accent-light" label="Accent lighting" value={state.accent} min={0} max={100} onChange={(accent) => update({ accent })} />
                  <RangeControl id="colour-temperature" label={`Colour temperature · ${kelvinLabel}`} value={state.kelvin} min={2200} max={6500} step={100} suffix="K" onChange={(kelvin) => update({ kelvin })} />
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-white/50">Curtains</h3>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => update({ curtains: 100 })} aria-pressed={state.curtains === 100} className={`min-h-11 flex-1 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c6a5] ${state.curtains === 100 ? "border-[#d8c6a5] bg-[#d8c6a5] text-[#1b1b19]" : "border-white/15 text-white/75 hover:bg-white/10"}`}>Open</button>
                      <button type="button" onClick={() => update({ curtains: 0 })} aria-pressed={state.curtains === 0} className={`min-h-11 flex-1 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c6a5] ${state.curtains === 0 ? "border-[#d8c6a5] bg-[#d8c6a5] text-[#1b1b19]" : "border-white/15 text-white/75 hover:bg-white/10"}`}>Close</button>
                    </div>
                    <RangeControl id="curtains" label="Curtain position" value={state.curtains} min={0} max={100} onChange={(curtains) => update({ curtains })} />
                  </div>
                  <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xs uppercase tracking-[0.2em] text-white/50">Climate</h3>
                      <span className="text-xs text-white/55">Room now · 22°C</span>
                    </div>
                    <RangeControl id="climate-setpoint" label="Target temperature" value={state.setpoint} min={18} max={30} suffix="°C" onChange={(setpoint) => update({ setpoint })} />
                  </div>
                </div>

                <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/50">Home status</h3>
                  <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/10 p-4">
                    <StatusItem icon={Shield} label="Security · simulation" value={state.security} />
                    <StatusItem icon={Tv} label="Entertainment · simulation" value={state.entertainment} />
                  </div>
                  <p className="text-xs leading-relaxed text-white/45">These scene changes are a website demonstration only. They do not connect to a residence, gateway, lighting network or security system.</p>
                  <button type="button" onClick={reset} className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/75 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c6a5]">
                    <RotateCcw aria-hidden="true" className="size-3.5" /> Reset to Morning
                  </button>
                </div>
              </div>
            </details>
          </div>

          <div className="mt-14 border-t border-white/10 pt-10 text-center sm:mt-16 sm:pt-12">
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-white sm:text-3xl">Behind every effortless experience is intelligent engineering.</p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
              From KNX and Casambi lighting to climate, security and entertainment, Supreme Domotics brings multiple technologies together into one thoughtfully integrated environment.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#services" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d8c6a5] px-6 text-sm font-medium text-[#1b1b19] transition-colors hover:bg-[#e7d8bc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1b19]">Explore Our Integrated Solutions</a>
              <a href="#showroom" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8c6a5]">Experience It At Our Showroom</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
