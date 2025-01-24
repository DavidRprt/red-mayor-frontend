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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-50"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  )
}

export default WhatsAppButton
