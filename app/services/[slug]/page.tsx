import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ServiceDetail } from "@/components/service-detail"
import { SERVICES, SITE_URL, getServiceBySlug } from "@/lib/services"

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  const canonical = `${SITE_URL}/services/${service.slug}`
  const image = `${SITE_URL}${service.image}`

  return {
    metadataBase: new URL(SITE_URL),
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonical,
      type: "website",
      images: [{ url: image, alt: service.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: service.metaTitle, description: service.metaDescription, images: [image] },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return <ServiceDetail service={service} />
}
