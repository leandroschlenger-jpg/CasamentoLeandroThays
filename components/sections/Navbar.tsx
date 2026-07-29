"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#historia", label: "História" },
  { href: "#maes", label: "Nossas Mães" },
  { href: "#galeria", label: "Galeria" },
  { href: "#programacao", label: "Programação" },
  { href: "#ilhabela", label: "Ilhabela" },
  { href: "#maritacas", label: "Casa" },
  { href: "#presentes", label: "Presentes" },
];

function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      let current = active;
      for (const section of sections) {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function NavLinks({
  active,
  onNavigate,
  className,
  linkClassName,
}: {
  active: string;
  onNavigate?: () => void;
  className?: string;
  linkClassName?: (isActive: boolean) => string;
}) {
  return (
    <div className={className}>
      {links.map((link) => {
        const isActive = active === link.href.slice(1);
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={linkClassName?.(isActive)}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const active = useActiveSection();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 hidden justify-center gap-8 py-4.5 font-jost text-[12.5px] tracking-[0.18em] uppercase transition-all duration-400 lg:flex ${
          scrolled ? "bg-cream/95 shadow-sm backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <NavLinks
          active={active}
          linkClassName={(isActive) =>
            `relative rounded px-3 py-2 whitespace-nowrap text-ink transition-all ${
              isActive ? "text-sage-deep opacity-100" : "opacity-70 hover:opacity-100 hover:text-sage-deep"
            }`
          }
        />
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="fixed top-4.5 right-5 z-51 flex h-11 w-11 items-center justify-center rounded-lg bg-cream/95 shadow-sm lg:hidden">
          <Menu className="h-6 w-6 text-ink" />
          <span className="sr-only">Abrir menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="bg-cream/98 w-full max-w-none">
          <SheetTitle className="sr-only">Navegação</SheetTitle>
          <NavLinks
            active={active}
            onNavigate={() => setOpen(false)}
            className="mt-20 flex flex-col px-6"
            linkClassName={(isActive) =>
              `w-full border-b border-line py-4 text-left text-lg normal-case tracking-normal font-sans ${
                isActive ? "text-sage-deep" : "text-ink"
              }`
            }
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
