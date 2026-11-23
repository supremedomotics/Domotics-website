import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Philosophy } from "@/components/philosophy"
import { Services } from "@/components/services"
import { DesignIntegration } from "@/components/design-integration"
import { FeaturedProject } from "@/components/featured-project"
import { ExperienceDemo } from "@/components/experience-demo"
import { Showroom } from "@/components/showroom"
import { AudioVisual } from "@/components/audio-visual"
import { Security } from "@/components/security"
import { OutdoorNetwork } from "@/components/outdoor-network"
import { Collaboration } from "@/components/collaboration"
import { FinalCTA } from "@/components/final-cta"
import { ConsultationForm } from "@/components/consultation-form"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Philosophy />
      <Services />
      <DesignIntegration />
      <FeaturedProject />
      <ExperienceDemo />
      <Showroom />
      <AudioVisual />
      <Security />
      <OutdoorNetwork />
      <Collaboration />
      <FinalCTA />
      <ConsultationForm />
      <Footer />
      <WhatsAppCTA />
    </main>
  )
}
