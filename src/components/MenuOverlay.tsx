import React from "react"
import Link from "next/link"

type MenuOverlayProps = {
  navLinks: { name: string; href: string }[]
  closeNavbar: () => void
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ navLinks, closeNavbar }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {navLinks.map((link) => (
        <li
          key={link.name}
          className="regular-16 text-slate-700 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold mt-1"
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default MenuOverlay
