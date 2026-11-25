"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const navLinks = [
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Services", href: "/services" },
  { label: "Experience", href: "/#experience" },
  { label: "Showroom", href: "/#showroom" },
  { label: "Audio Visual", href: "/services/home-theatre-av" },
  { label: "Security", href: "/services/security-access-control" },
  { label: "Contact", href: "/#contact-form" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-tight text-foreground">
              Supreme Domotics
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Design-first home automation for luxury residences.
              Technology designed to be seen, experienced, and lived with.
            </p>

            {/* KNX Partner Logo */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Certified Partner
              </p>
              <Image
                src="/images/Partner.webp"
                alt="KNX Partner"
                width={120}
                height={60}
                className="h-12 w-auto object-contain rounded-sm"
              />
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium text-foreground">Location & Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground/80 mb-1">Address</p>
                <p className="leading-relaxed">
                  608, 6th Floor, 72 Corp<br />
                  Saki Vihar Road, Sakinaka Junction<br />
                  Andheri East, Mumbai – 400072
                </p>
              </div>
              <a
                href="mailto:info@supremedomotics.in"
                className="block hover:text-foreground transition-colors"
              >
                info@supremedomotics.in
              </a>
              <a
                href="https://www.supremedomotics.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-foreground transition-colors"
              >
                www.supremedomotics.in
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Supreme Domotics. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
