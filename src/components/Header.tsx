// src/components/Header.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Reconnaissance Vocale", href: "/speech" },
    { name: "Tableau de Bord", href: "/dashboard" },
    { name: "Ahmed", href: "/ahmed" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <nav className="flex items-center gap-6 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-foreground/60"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="btn">
              Se connecter
            </Button>
            <Button size="sm" className="btn">
              S&apos;inscrire
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;