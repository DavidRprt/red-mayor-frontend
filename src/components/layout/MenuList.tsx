import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { menuConfig } from "@/constants"
import { LOCAL_BRANDS } from "@/constants/brands"

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Sección de Categorías */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {menuConfig.categories.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-6">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Red X Mayor
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      La mejor opción en compras mayoristas. Productos de
                      calidad con precios competitivos para potenciar tu
                      negocio.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {menuConfig.categories.items.map((item) => (
                <ListItem key={item.href} href={item.href} title={item.title}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Sección de Marcas */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {menuConfig.brands.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col p-2 w-[300px] items-start justify-center">
              {LOCAL_BRANDS.map((brand) => (
                <ListItem
                  key={brand.slug}
                  href={`/productos/marca/${brand.slug}`}
                  title={brand.nombreMarca}
                  className="w-[280px]"
                >
                  Ver productos de {brand.nombreMarca}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Otros enlaces */}
        {menuConfig.otherLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"

export default MenuList
