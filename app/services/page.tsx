import type { Metadata } from "next"
import { ServicesOverview } from "@/components/services-overview"
import { SITE_URL } from "@/lib/services"

const title = "Integrated Home Technology Services | Supreme Domotics"
const description =
  "Explore design-led smart lighting, home automation, home theatre, security, networking, system integration and outdoor automation by Supreme Domotics."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/services`,
    type: "website",
    images: [{ url: `${SITE_URL}/images/hero-villa.webp`, alt: "Contemporary residence at dusk" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/images/hero-villa.webp`] },
}

export default function ServicesPage() {
  return <ServicesOverview />
}
