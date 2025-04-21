"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import MenuList from "./MenuList"
import MenuListMobile from "./MenuListMobile"
import AuthButtons from "./AuthButtons"
import { useState } from "react"
import UserCartButtons from "./UserCartButtons"

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)

  const closeNavbar = () => setNavbarOpen(false)

  return (
    <nav className="mx-auto sticky left-0 right-0 top-0 z-30 bg-background dark text-foreground py-2 sm:py-0 md:h-80px]">
      <div className="flex px-4 py-2 md:py-4 md:px-6 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/red-mayor-logo-white.svg"
            alt="Logo"
            width={220}
            height={110}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <MenuList />
        </div>

        {/* Auth Buttons */}
        <div className="hidden sm:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex gap-2 flex-row">
          <UserCartButtons />
          {!navbarOpen ? (
            <Button
              onClick={() => setNavbarOpen(true)}
              variant="outline"
              size="icon"
              aria-label="Abrir menú"
            >
              <Bars3Icon className="h-[1.2rem] w-[1.2rem] dark:text-white" />
            </Button>
          ) : (
            <Button
              onClick={() => setNavbarOpen(false)}
              variant="outline"
              size="icon"
              aria-label="Cerrar menú"
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
        <MenuListMobile closeNavbar={closeNavbar} />
      </div>
    </nav>
  )
}

export default Navbar

