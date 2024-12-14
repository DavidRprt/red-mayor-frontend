"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AuthButtons from "./AuthButtons";

const MenuListMobile = () => {
  const router = useRouter();

  const navItems = [
    { href: "/categoria/energizer", title: "Energizer" },
    { href: "/categoria/contigo", title: "Contigo" },
    { href: "/categoria/sharpie", title: "Sharpie" },
    { href: "/mas-vendido", title: "Más Vendido" },
    { href: "/sobre-nosotros", title: "Sobre Nosotros" },
  ];

  return (
    <div className="w-full flex flex-col gap-4 bg-background text-foreground p-4">
      {/* Links de navegación */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          {item.title}
        </Link>
      ))}

      {/* Separator */}
      <div className="border-t border-border my-4 w-full"></div>

      {/* Botones de sesión */}
      <div className="flex flex-col gap-4">
        <AuthButtons />
      </div>
    </div>
  );
};

export default MenuListMobile;