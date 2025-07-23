import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ButtonProps {
  href?: string
  label: string
  isOutline?: boolean
  bgColor?: string
  textColor?: string
  hoverColor?: string
  borderColor?: string
  w?: string
  className?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  href,
  label,
  isOutline = false,
  bgColor = "bg-white",
  textColor = "text-black",
  borderColor = "border-white",
  hoverColor = "hover:bg-gray-900",
  w="w-52",
  className = "",
  onClick,
}) => {
  const baseStyles = `rounded-lg font-semibold px-6 py-3 max-sm:w-full ${w} shadow-lg transition-all duration-300 flex items-center justify-center hover:shadow-xl transform hover:scale-105`

  const solidStyles = `${bgColor} ${textColor} ${hoverColor} hover:text-white font-medium`
  const outlineStyles = `border-2 ${borderColor} text-white hover:bg-white hover:text-black font-medium`

  const buttonClass = cn(
    baseStyles,
    isOutline ? outlineStyles : solidStyles,
    className
  )

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {label}
      </Link>
    )
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
