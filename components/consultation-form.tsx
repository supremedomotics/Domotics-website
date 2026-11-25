"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { track } from "@vercel/analytics"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"

export function ConsultationForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "ready" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    interest: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSubmitStatus("idle")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    track("contact_form_submit_attempt", { method: "mailto" })

    try {
      const subject = `Consultation Request from ${formData.name}`
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProperty: ${formData.property}\nInterest: ${formData.interest}\n\nMessage:\n${formData.message}`

      window.location.href = `mailto:info@supremedomotics.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      setSubmitStatus("ready")
    } catch (error) {
      console.log("[v0] Form submission error:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-(family-name:--font-playfair) text-4xl md:text-5xl font-medium leading-tight mb-8">
              Schedule Your Free Consultation
            </h2>

            <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
              Our design experts will guide you through creating the perfect smart home solution tailored to your unique lifestyle and needs.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0">
                  <Phone className="h-6 w-6 text-foreground mt-1" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Phone</h3>
                  <a href="tel:+919987796163" className="text-foreground/70 hover:text-foreground transition-colors">
                    +91 99877 96163
                  </a>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <Mail className="h-6 w-6 text-foreground mt-1" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Email</h3>
                  <a href="mailto:info@supremedomotics.in" className="text-foreground/70 hover:text-foreground transition-colors">
                    info@supremedomotics.in
                  </a>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <MapPin className="h-6 w-6 text-foreground mt-1" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Location</h3>
                  <p className="text-foreground/70">
                    608, 6th Floor, 72 Corp<br />
                    Saki Vihar Road, Sakinaka Junction<br />
                    Andheri East, Mumbai – 400072
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-foreground/10">
              <p className="text-sm text-foreground/60 mb-4">Response Time</p>
              <p className="text-foreground font-medium">Within 24 hours</p>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-foreground/5 rounded-2xl p-8 lg:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/60 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/60 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="tel"
                  pattern={String.raw`(?=(?:[^0-9]*[0-9]){7,15}[^0-9]*$)\+?[0-9() .-]+`}
                  title="Enter 7 to 15 digits; spaces, +, hyphens and parentheses are optional."
                  className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/60 transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="property" className="block text-sm font-medium text-foreground mb-2">
                  Property Type
                </label>
                <select
                  id="property"
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:border-foreground/60 transition-colors"
                >
                  <option value="">Select property type</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="commercial">Commercial Space</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Interest */}
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                  Main Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg text-foreground focus:outline-none focus:border-foreground/60 transition-colors"
                >
                  <option value="">Select area of interest</option>
                  <option value="lighting">Lighting Control</option>
                  <option value="security">Security Systems</option>
                  <option value="audiovisual">Audio/Visual</option>
                  <option value="climate">Climate Control</option>
                  <option value="full-integration">Full Home Integration</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-foreground/60 transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Opening email..." : "Schedule Consultation"}
                {!isSubmitting && <ArrowRight className="h-5 w-5" />}
              </button>

              {/* Status Messages */}
              {submitStatus === "ready" && (
                <p role="status" aria-live="polite" className="text-green-700 text-sm text-center">
                  Your email app should open with a prefilled draft if one is configured. Review it and send the email to complete your enquiry; this site does not send it for you.
                </p>
              )}
              {submitStatus === "error" && (
                <p role="alert" className="text-red-600 text-sm text-center">
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}

              <p className="text-xs text-foreground/50 text-center">
                We respect your privacy. Your information is secure with us.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
