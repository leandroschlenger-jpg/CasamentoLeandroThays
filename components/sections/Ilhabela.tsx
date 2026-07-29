"use client";

import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { InfoCard } from "./InfoCard";
import { FloatingEmoji } from "./FloatingEmoji";
import { ilhabelaPhotos, ilhabelaStartIndex } from "@/lib/photos";
import { useLightbox } from "@/components/lightbox-provider";

export function Ilhabela() {
  const { openAt } = useLightbox();

  return (
    <section
      id="ilhabela"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-ocean/3 py-26"
    >
      <FloatingEmoji emoji="🌊" style={{ top: "15%", right: "8%" }} />
      <FloatingEmoji emoji="🐠" size={100} style={{ top: "50%", left: "5%" }} delay={3} />
      <FloatingEmoji emoji="🪨" size={90} style={{ top: "75%", right: "10%" }} delay={1.5} />
      <FloatingEmoji emoji="💨" style={{ top: "30%", left: "15%" }} delay={2} />

      <div className="mx-auto max-w-[1000px] px-6.5 text-center">
        <Reveal>
          <SectionHeader eyebrow="nosso lugar" title="Ilhabela" />
        </Reveal>

        <Reveal>
          <p className="mx-auto max-w-[680px] text-xl text-ink-soft">
            Ilhabela é onde nossas histórias começam. Como velejadores,
            encontramos aqui liberdade, beleza e magia. <span>↗</span>
          </p>
        </Reveal>

        <div className="mt-10.5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ilhabelaPhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.05}>
              <figure
                onClick={() => openAt(ilhabelaStartIndex + i)}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-400 hover:-translate-y-2 hover:shadow-xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-10.5 grid grid-cols-1 gap-5.5 sm:grid-cols-3">
          <Reveal>
            <InfoCard icon="⛵" title="Velejadores" description="Nossas aventuras começam aqui, no coração do mar." />
          </Reveal>
          <Reveal delay={0.05}>
            <InfoCard icon="🏖️" title="Praias Selvagens" description="Cenários naturais intocados que roubam nosso coração." />
          </Reveal>
          <Reveal delay={0.1}>
            <InfoCard icon="🌅" title="Anoiteceres" description="Cada pôr do sol aqui é um momento para celebrar." />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
