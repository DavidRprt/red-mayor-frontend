"use client"

import Image from "next/image"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Phone,
  Check,
  Facebook,
  Linkedin,
  X,
  Copy,
  MoreHorizontal,
} from "lucide-react"
import { linktrees } from "@/constants/linktrees"

export default function BioPage() {
  const { slug } = useParams()
  const router = useRouter()
  const data = linktrees.find((person) => person.slug === slug)

  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!data) {
    router.push("/")
    return null
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(data.shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-gradient-to-b from-blue-900 to-blue-500 text-white px-4 py-8">
      <button
        onClick={() => setShowShare(true)}
        className="absolute top-4 right-4 text-gray-800 p-2 rounded-full bg-neutral-100 shadow-md hover:bg-neutral-200 transition md:hidden"
        aria-label="Opciones"
      >
        <MoreHorizontal className="w-6 h-6" />
      </button>

      <div className="mt-8">
        <Image
          src={data.avatar}
          alt={`Avatar de ${data.name}`}
          width={120}
          height={120}
          className="rounded-full aspect-square object-cover"
        />
      </div>

      <div className="text-center mb-6 mt-2">
        <h1 className="text-2xl font-bold mb-1">{data.username}</h1>
      </div>

      <div className="w-full max-w-xs space-y-4 mt-6">
        {data.links.map(({ label, href, iconSrc }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center pl-12 pr-5 py-3 bg-white text-black rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 text-base font-medium"
          >
            <div className="absolute left-4 w-5 h-5">
              <Image
                src={iconSrc}
                alt={label}
                fill
                className="object-contain"
                sizes="20px"
              />
            </div>
            <span className="flex-1 text-center">{label}</span>
          </a>
        ))}
      </div>

      <div className="w-full max-w-xs mt-6 text-white text-center text-sm space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/linktree/whatsapp.svg"
            alt="Teléfono"
            width={16}
            height={16}
            className="object-contain"
          />
          <span>{data.phone}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/linktree/email.svg"
            alt="Email"
            width={16}
            height={16}
            className="object-contain"
          />
          <span>{data.email}</span>
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-4 bg-black text-white text-sm px-4 py-2 rounded-full shadow-md animate-fade-in z-50">
          Copiado al portapapeles
        </div>
      )}

      {/* Modal compartir */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white text-black rounded-t-2xl shadow-2xl p-6 z-50 transition-transform duration-300 flex flex-col ${
          showShare ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-row items-center mb-3 px-2">
          <h3 className="text-lg font-semibold flex-1 flex justify-center">
            Compartir
          </h3>
          <button
            onClick={() => {
              setShowShare(false)
            }}
            aria-label="Cerrar"
            className="p-2 rounded-full hover:bg-neutral-100 hover:shadow transition"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-900 w-full rounded-2xl p-4 flex flex-col items-center">
            <Image
              src={data.avatar}
              alt={`Avatar de ${data.name}`}
              width={60}
              height={60}
              className="rounded-full aspect-square object-cover mb-2"
            />
            <p className="font-semibold text-white">{data.username}</p>
          </div>
        </div>

        <div className="flex justify-around text-sm">
          <div className="flex flex-col items-center">
            <button
              onClick={handleCopy}
              className="bg-neutral-200 p-3 rounded-full mb-1 hover:bg-neutral-300 transition"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
            <span className="text-xs">Copiar</span>
          </div>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              data.shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <div className="bg-black p-3 rounded-full mb-1 hover:opacity-80 transition">
              <X className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">X</span>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              data.shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <div className="bg-blue-600 p-3 rounded-full mb-1 hover:opacity-80 transition">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Facebook</span>
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Conocé mi perfil: ${data.shareUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <div className="bg-green-500 p-3 rounded-full mb-1 hover:opacity-80 transition">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">WhatsApp</span>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              data.shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <div className="bg-blue-700 p-3 rounded-full mb-1 hover:opacity-80 transition">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}
