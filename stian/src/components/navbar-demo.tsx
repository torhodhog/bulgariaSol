"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      {/* <p className="text-foreground dark:text-primary">
        The Navbar will show on top of the page
      </p> */}
    </div>
  );
}

function Navbar({ className }: Readonly<{ className?: string }>) {
  const [active, setActive] = useState<string | null>(null);

  // Ensure state is only set on the client
  useEffect(() => {
    setActive(null);
  }, []);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 bg-card text-card-foreground", className)}
    >
      <Menu setActive={setActive} key={active}>
        <MenuItem setActive={setActive} active={active} item="Meny">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Hjem</HoveredLink>
            <HoveredLink href="/">Kontakt</HoveredLink>
            <HoveredLink href="/">Informasjon</HoveredLink>
            <HoveredLink href="/">Kalender</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Opplev">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Værvarsel"
              href="https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/2-10126191/Bulgaria/Burgas/Obshtina%20Neseb%C5%ADr/Magic%20Dreams"
              src="/assets/Bilde4.jpg"
              description="Se hvordan været er i BulgariaSol"
            />
            <ProductItem
              title="Opplevelser"
              href="https://tailwindmasterkit.com"
              src="/assets/Bilde14.jpg"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Panorama Dreams"
              href="https://gomoonbeam.com"
              src="/assets/Bilde5.jpg"
              description="Leilighet på bakkeplan."
            />
            <ProductItem
              title="Magic Dreams"
              href="https://userogue.com"
              src="/assets/Bilde6.jpg"
              description="Leilighet i 5.etasje."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Kalender">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}