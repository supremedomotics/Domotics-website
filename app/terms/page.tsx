import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service | Supreme Domotics",
  description: "Terms of service for Supreme Domotics home automation services.",
}

export default function TermsOfService() {
  return (
    <main className="relative">
      <Header />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight mb-8">
          Terms of Service
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing and using the Supreme Domotics website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) from Supreme Domotics for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on Supreme Domotics</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Disclaimer</h2>
            <p>
              The materials on Supreme Domotics are provided on an &apos;as is&apos; basis. Supreme Domotics makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Limitations</h2>
            <p>
              In no event shall Supreme Domotics or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Supreme Domotics, even if Supreme Domotics or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Supreme Domotics could include technical, typographical, or photographic errors. Supreme Domotics does not warrant that any of the materials on its website are accurate, complete, or current. Supreme Domotics may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Links</h2>
            <p>
              Supreme Domotics has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Supreme Domotics of the site. Use of any such linked website is at the user&apos;s own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Modifications</h2>
            <p>
              Supreme Domotics may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-medium">Supreme Domotics</p>
              <p>Email: <a href="mailto:info@supremedomotics.in" className="text-primary hover:underline">info@supremedomotics.in</a></p>
              <p>Website: <a href="https://www.supremedomotics.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.supremedomotics.in</a></p>
            </div>
          </section>

          <p className="text-sm text-muted-foreground pt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
