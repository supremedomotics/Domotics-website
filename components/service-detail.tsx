import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { getServiceBySlug, SERVICES, SITE_URL, type Service } from "@/lib/services"

const process = [
  { number: "01", title: "Understand", description: "Listen to the brief, property and the people who will use the system." },
  { number: "02", title: "Design", description: "Coordinate the technology with the architecture and project team." },
  { number: "03", title: "Integrate", description: "Install, programme and connect the agreed systems." },
  { number: "04", title: "Commission", description: "Test, hand over and support the experience beyond installation." },
]

function Breadcrumbs({ service }: { service: Service }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/services/${service.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="absolute left-6 top-28 z-10 text-sm text-white/70 lg:left-8 lg:top-32">
        <Link href="/" className="transition-colors hover:text-white">Home</Link>
        <span aria-hidden="true" className="px-3">/</span>
        <Link href="/services" className="transition-colors hover:text-white">Services</Link>
        <span aria-hidden="true" className="px-3">/</span>
        <span aria-current="page" className="text-white">{service.shortTitle}</span>
      </nav>
    </>
  )
}

function ProjectReference() {
  return (
    <section className="bg-cream/60 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-stone">Project in focus</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium leading-tight text-foreground md:text-4xl">Mewar Kothi Residence, Indore</h2>
          <Link href="/case-study/luxury-residence-indore" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground">
            Explore the project <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-foreground/80">
            At Mewar Kothi Residence, Supreme Domotics delivered the lighting installation as a Casambi Commission Partner. The project includes 110 Casambi nodes and is featured in Casambi’s Global Project Portfolio.
          </p>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Casambi is the lighting-control system used for this project; it does not control every technology in the property. The wider home systems are delivered and integrated separately by Supreme Domotics.
          </p>
        </div>
      </div>
    </section>
  )
}

function RelatedServices({ service }: { service: Service }) {
  const related = service.related.map((slug) => getServiceBySlug(slug)).filter((item): item is Service => Boolean(item))

  return (
    <section className="bg-background px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone">Connected by design</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-medium text-foreground md:text-4xl">Related services</h2>
          </div>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-stone">
            All services <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`} className="group border-t border-foreground/15 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone">
              <span className="text-xs uppercase tracking-[0.18em] text-stone">{item.eyebrow}</span>
              <span className="mt-3 flex items-start justify-between gap-4 font-[family-name:var(--font-playfair)] text-xl font-medium text-foreground">
                {item.title}<ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <main>
      <Header solidBackground />
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-foreground text-background md:min-h-[82svh]">
        <Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/25" />
        <Breadcrumbs service={service} />
        <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-48 lg:px-8 lg:pb-20">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/70">{service.eyebrow}</p>
          <h1 className="max-w-5xl font-[family-name:var(--font-playfair)] text-5xl font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">{service.headline}</h1>
          <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">{service.summary}</p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-stone">What we deliver</p>
            <h2 className="max-w-md font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight text-foreground md:text-5xl">A considered solution for the way you live.</h2>
          </div>
          <div className="grid gap-x-10 sm:grid-cols-2">
            {service.capabilities.map((capability, index) => (
              <article key={capability.title} className="border-t border-foreground/15 py-6">
                <span className="text-xs tracking-[0.18em] text-stone">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-medium text-foreground">{capability.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-background lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-background/55">Technology & integration</p>
            <h2 className="max-w-md font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight md:text-5xl">Engineered to work as intended.</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-background/75">{service.technologyIntro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.technologies.map((technology) => (
                <li key={technology} className="flex items-start gap-3 border-t border-background/20 py-4 text-sm text-background/85">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-stone" />
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1fr] md:items-center lg:gap-24">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-stone">Designed around architecture</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight text-foreground md:text-5xl">Technology belongs in the design conversation.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{service.architectureCopy}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream/60 px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.3em] text-stone">How we work</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight text-foreground md:text-5xl">From the first brief to a confident handover.</h2>
            </div>
            <p className="max-w-xl leading-relaxed text-muted-foreground">{service.workCopy}</p>
          </div>
          <ol className="mt-12 grid border-t border-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((stage) => (
              <li key={stage.number} className="border-b border-foreground/15 py-6 pr-5 sm:border-b-0 sm:border-r sm:py-7 sm:pl-5 first:pl-0 last:border-r-0">
                <span className="text-xs tracking-[0.2em] text-stone">{stage.number}</span>
                <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-xl font-medium text-foreground">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {service.projectReference && <ProjectReference />}
      <RelatedServices service={service} />

      <section className="bg-foreground px-6 py-20 text-background lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-background/55">A considered next step</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-medium leading-tight md:text-5xl">Let’s talk about your project.</h2>
            <p className="mt-5 leading-relaxed text-background/70">Start with a conversation about the property, the brief and the experience you would like to create.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact-form" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground transition-transform duration-300 hover:scale-[1.02]">
              Discuss Your Project <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="/#showroom" className="inline-flex min-h-12 items-center justify-center rounded-full border border-background/40 px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10">
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
