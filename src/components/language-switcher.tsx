
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import Image from "next/image";
import { countries } from "@/lib/countries";

const languages = [
    { code: "USA", name: "English", flag: countries.find(c => c.code === "USA")?.flag },
    { code: "ESP", name: "Español", flag: countries.find(c => c.code === "ESP")?.flag },
    { code: "BRA", name: "Português", flag: countries.find(c => c.code === "BRA")?.flag },
    { code: "FRA", name: "Français", flag: countries.find(c => c.code === "FRA")?.flag },
];


export function LanguageSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          lang.flag && (
            <DropdownMenuItem key={lang.code}>
                <div className="flex items-center gap-2">
                    <Image src={lang.flag} alt={lang.name} width={20} height={15} />
                    <span>{lang.name}</span>
                </div>
            </DropdownMenuItem>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
