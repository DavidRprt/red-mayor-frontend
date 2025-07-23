import React from "react"
import { MessageCircle } from "lucide-react"

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "5493418191010" 
  const message = "¡Hola! Me gustaría hacer una consulta." 
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 z-20 animate-bounce"
    >
      <MessageCircle className="w-6 h-6 text-white drop-shadow-sm" />
    </a>
  )
}

export default WhatsAppButton
