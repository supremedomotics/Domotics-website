import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { SERVICES, SITE_URL } from "@/lib/services"

const process = [
  {
    number: "01",
    title: "Consultation & understanding",
    description: "We listen to the brief, understand the property and learn how the people who live there want it to feel and function.",
  },
  {
    number: "02",
    title: "System design & planning",
    description: "We develop the technology approach and coordinate it with architecture, interiors, electrical planning and other project teams.",
  },
  {
    number: "03",
    title: "Installation & integration",
    description: "The agreed systems are installed, programmed and integrated with close attention to communication, control and site coordination.",
  },
  {
    number: "04",
    title: "Commissioning & handover",
    description: "We test the experience, commission the systems, guide the homeowner through operation and remain available for ongoing support.",
  },
]

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
  ],
}

export function ServicesOverview() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header solidBackground />
      <section className="bg-background px-6 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span aria-hidden="true" className="px-3">/</span>
            <span aria-current="page" className="text-foreground">Services</span>
          </nav>
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-stone">Considered technology, made personal</p>
              <h1 className="max-w-4xl font-[family-name:var(--font-playfair)] text-5xl font-medium leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Technology, thoughtfully integrated.
              </h1>
            </div>
            <p className="max-w-xl pb-1 text-lg leading-relaxed text-muted-foreground lg:text-xl">
              From intelligent lighting and whole-home automation to immersive entertainment, security and connected infrastructure, we design technology around the way people live and the architecture they inhabit.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Our services" className="bg-background px-6 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute left-4 top-4 bg-background/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-start justify-between gap-5 pt-5">
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-foreground transition-colors group-hover:text-stone lg:text-[1.7rem]">
                    {service.title}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{service.cardDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
                    Explore service <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream/60 px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-stone">A considered partnership</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight text-foreground md:text-5xl">Our Approach</h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed text-foreground/80">
              Supreme Domotics coordinates technology with architecture, interiors, electrical planning and the homeowner’s lifestyle. The aim is not to add complexity to a home, but to make each considered system feel as though it belongs.
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              We work alongside architects, interior designers, consultants and contractors from early planning through commissioning. This lets decisions about control, infrastructure, equipment and interfaces be made in context, with the spaces and the people who use them always in view.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-24 text-background lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-background/55">Designed to work together</p>
            <h2 className="max-w-md font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight md:text-5xl">One Integrated Environment</h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed text-background/80">
              Lighting, shading, climate, entertainment, security and connectivity can become part of one carefully engineered control experience.
            </p>
            <p className="mt-6 leading-relaxed text-background/60">
              We define how systems communicate, which functions are supported and how people will interact with them. The result is not a promise that every device works with every other device; it is a coordinated architecture shaped around the equipment and requirements of each project.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-stone">From first conversation to everyday use</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-medium text-foreground md:text-5xl">From Design to Commissioning</h2>
            </div>
            <p className="max-w-lg leading-relaxed text-muted-foreground md:justify-self-end">
              A thoughtful process keeps the design intent, technical decisions and on-site delivery connected at every stage.
            </p>
          </div>
          <ol className="grid border-t border-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((stage) => (
              <li key={stage.number} className="border-b border-foreground/15 py-7 pr-6 sm:min-h-56 sm:border-b-0 sm:border-r sm:py-8 sm:pl-6 first:pl-0 last:border-r-0">
                <p className="mb-8 text-xs tracking-[0.2em] text-stone">{stage.number}</p>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-foreground">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream/60 px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-9 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone">The next step</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight text-foreground md:text-5xl">Let’s begin with a conversation.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Tell us about your residence, your plans and the experience you want technology to support.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link href="/#contact-form" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.02]">
              Discuss Your Project <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/#showroom" className="inline-flex min-h-12 items-center justify-center rounded-full border border-foreground/25 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background">
              Visit Our Experience Centre
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppCTA />
    </main>
  )
}
