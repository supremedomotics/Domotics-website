"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useState } from "react"

export function WhatsAppCTA() {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = "919987796163" // Replace with actual WhatsApp number
  const whatsappMessage = "Hi Supreme Domotics! I'd like to book a visit to your showroom."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <motion.div
        animate={isHovered ? { x: -10 } : { x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-full shadow-lg px-5 py-3 hidden sm:block"
      >
        <span className="text-sm font-medium text-gray-800">Chat with us</span>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg cursor-pointer transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.div>
    </motion.a>
  )
}
