import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy | Supreme Domotics",
  description: "Privacy policy for Supreme Domotics home automation services.",
}

export default function PrivacyPolicy() {
  return (
    <main className="relative">
      <Header />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
            <p>
              Supreme Domotics (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website and services. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our services and the choices you have associated with that data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our services to you.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> While using our services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&quot;Personal Data&quot;). This may include, but is not limited to:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Use of Data</h2>
            <p>Supreme Domotics uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To allow you to participate in interactive features of our services when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
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
