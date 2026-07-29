"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { allPhotos } from "@/lib/photos";

interface LightboxContextValue {
  openAt: (index: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);

  const openAt = (i: number) => setIndex(i);
  const photo = index !== null ? allPhotos[index] : null;

  return (
    <LightboxContext.Provider value={{ openAt }}>
      {children}
      <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] bg-transparent ring-0 p-0 shadow-none">
          <DialogTitle className="sr-only">{photo?.alt ?? "Foto"}</DialogTitle>
          {photo && (
            <div className="relative mx-auto max-h-[85vh] w-full max-w-4xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1600}
                height={1600}
                className="h-auto max-h-[85vh] w-full rounded-xl object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </LightboxContext.Provider>
  );
}
