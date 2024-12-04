"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import MenuList from "./MenuList"
import MenuListMobile from "./MenuListMobile"
import ToggleTheme from "./ToogleTheme"

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState<boolean>(false)

  const closeNavbar = () => setNavbarOpen(false)

  return (
    <nav className="mx-auto sticky left-0 right-0 top-0 z-30 bg-background dark text-foreground py-2 sm:py-0">
      <div className="flex px-4 py-2 md:py-4 md:px-6 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo-dark.png"
            alt="Logo"
            width={120}
            height={60}
            style={{ height: "auto", width: "auto" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <MenuList />
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <Button variant="default">Iniciar sesión</Button>
          <Button variant="secondary">Registrarse</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex gap-2">
          {!navbarOpen ? (
            <Button
              onClick={() => setNavbarOpen(true)}
              variant="outline"
              size="icon"
            >
              <Bars3Icon className="h-[1.2rem] w-[1.2rem] dark:text-white" />
            </Button>
          ) : (
            <Button
              onClick={() => setNavbarOpen(false)}
              variant="outline"
              size="icon"
            >
              <XMarkIcon className="h-[1.2rem] w-[1.2rem] dark:text-white" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`absolute left-0 right-0 top-full z-40 bg-background shadow-lg px-4 py-6 transition-all duration-300 ${
          navbarOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-[-20px] invisible"
        }`}
      >
        <MenuListMobile />
      </div>
    </nav>
  )
}

export default Navbar
