"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { couplePhotos } from "@/lib/photos";
import { useLightbox } from "@/components/lightbox-provider";

const BLOCK_SIZE = 9;
const blocks = Array.from(
  { length: Math.ceil(couplePhotos.length / BLOCK_SIZE) },
  (_, i) => couplePhotos.slice(i * BLOCK_SIZE, i * BLOCK_SIZE + BLOCK_SIZE)
);

export function Galeria() {
  const [visibleBlocks, setVisibleBlocks] = useState(1);
  const { openAt } = useLightbox();
  const lastBlockRef = useRef<HTMLDivElement | null>(null);

  const isFinalBlock = visibleBlocks >= blocks.length;

  const toggle = () => {
    if (!isFinalBlock) {
      const next = visibleBlocks + 1;
      setVisibleBlocks(next);
      setTimeout(() => {
        lastBlockRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      setVisibleBlocks(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="galeria" className="py-26">
      <div className="mx-auto max-w-[1000px] px-6.5 text-center">
        <Reveal>
          <SectionHeader eyebrow="momentos" title="Nossa Galeria" />
        </Reveal>
        <Reveal>
          <p className="mx-auto max-w-[680px] text-xl text-ink-soft">
            Um pouquinho de nós. Clique para ampliar.
          </p>
        </Reveal>

        {blocks.slice(0, visibleBlocks).map((block, blockIndex) => (
          <div
            key={blockIndex}
            ref={blockIndex === visibleBlocks - 1 ? lastBlockRef : undefined}
            className="mt-13 grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {block.map((photo, i) => {
              const globalIndex = blockIndex * BLOCK_SIZE + i;
              return (
                <figure
                  key={photo.src}
                  onClick={() => openAt(globalIndex)}
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-cream to-cream-2 shadow-md transition-all duration-400 hover:-translate-y-2 hover:shadow-xl"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </figure>
              );
            })}
          </div>
        ))}

        <div className="mt-10.5">
          <button
            onClick={toggle}
            className="min-h-11 rounded-md bg-sage-deep px-9 py-3 font-jost text-[15px] font-medium tracking-[0.05em] text-white transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg"
          >
            {isFinalBlock ? "↑ Voltar ao início ↑" : "↓ Carregar mais fotos ↓"}
          </button>
        </div>
      </div>
    </section>
  );
}
