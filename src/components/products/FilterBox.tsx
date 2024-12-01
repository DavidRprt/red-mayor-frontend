"use client"

import * as React from "react"
import { Check, ChevronsDown, ChevronsUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const filters = [
  {
    value: "cheapest",
    label: "Más barato",
  },
  {
    value: "most_expensive",
    label: "Más caro",
  },
  {
    value: "newest",
    label: "Más reciente",
  },
  {
    value: "oldest",
    label: "Más antiguo",
  },
]

const FilterBox = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? filters.find((filter) => filter.value === value)?.label
            : "Filtrar por"}
          {open ? (
            <ChevronsUp className="opacity-50" />
          ) : (
            <ChevronsDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No se encontraron opciones.</CommandEmpty>
            <CommandGroup>
              {filters.map((filter) => (
                <CommandItem
                  key={filter.value}
                  value={filter.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {filter.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === filter.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FilterBox
