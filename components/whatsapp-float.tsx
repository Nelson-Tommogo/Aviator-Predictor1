"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hi, I'm interested in the Aviator Predictor App. Can you help me?")
    window.open(`https://wa.me/13053897291?text=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppContact}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  )
}
