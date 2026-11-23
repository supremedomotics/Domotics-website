import type { Metadata } from 'next'

const SITE_URL = 'https://www.supremedomotics.in'
const CASE_STUDY_PATH = '/case-study/luxury-residence-indore'
const TITLE = 'Mewar Kothi Residence, Indore | Supreme Domotics'
const DESCRIPTION =
  "Discover Mewar Kothi Residence in Indore, a 110-node Casambi lighting installation by Supreme Domotics, featured on Casambi's global project portfolio."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CASE_STUDY_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CASE_STUDY_PATH,
    type: 'article',
    images: [
      {
        url: '/images/project-exterior.png',
        alt: 'Mewar Kothi Residence exterior, Indore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/project-exterior.png'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Mewar Kothi Residence, Indore',
      item: `${SITE_URL}${CASE_STUDY_PATH}`,
    },
  ],
}

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
