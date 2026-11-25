"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Services", href: "/services" },
  { label: "Experience", href: "/#experience" },
  { label: "Showroom", href: "/#showroom" },
  { label: "Audio Visual", href: "/services/home-theatre-av" },
  { label: "Security", href: "/services/security-access-control" },
  { label: "Contact", href: "/#contact-form" },
]

export function Header({ solidBackground = false }: { solidBackground?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={solidBackground ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || solidBackground
            ? "bg-background/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="font-(family-name:--font-playfair) text-xl font-semibold tracking-tight text-foreground">
                Supreme Domotics
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <a
                href="/#contact-form"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/90 hover:scale-105"
              >
                Discuss Your Project
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-(family-name:--font-playfair) text-xl font-semibold tracking-tight text-foreground">
                  Supreme Domotics
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col items-center justify-center flex-1 gap-8">
                {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-2xl font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.label}
                    </motion.a>
                ))}
                <motion.a
                  href="/#contact-form"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-lg font-medium text-background"
                >
                  Discuss Your Project
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
