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
  hoverColor = "hover:bg-slate-900",
  w="w-52",
  className = "",
  onClick,
}) => {
  const baseStyles = `rounded-md font-semibold px-6 py-3 max-sm:w-full ${w} shadow-md transition-all duration-300 flex items-center justify-center`

  const solidStyles = `${bgColor} ${textColor} ${hoverColor} hover:text-white`
  const outlineStyles = `border ${borderColor} text-white hover:bg-white hover:text-black`

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
