"use client";

import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { InfoCard } from "./InfoCard";
import { FloatingEmoji } from "./FloatingEmoji";
import { maritacasPhotos, maritacasStartIndex } from "@/lib/photos";
import { useLightbox } from "@/components/lightbox-provider";

export function CasaMaritacas() {
  const { openAt } = useLightbox();

  return (
    <section id="maritacas" className="relative overflow-hidden py-26">
      <FloatingEmoji emoji="🌊" style={{ top: "10%", left: "8%" }} delay={0.5} />
      <FloatingEmoji emoji="🏠" size={110} style={{ top: "45%", right: "5%" }} delay={2.5} />
      <FloatingEmoji emoji="🌴" size={95} style={{ top: "70%", left: "10%" }} delay={1} />
      <FloatingEmoji emoji="💨" style={{ top: "25%", right: "15%" }} delay={3} />

      <div className="mx-auto max-w-[1000px] px-6.5 text-center">
        <Reveal>
          <SectionHeader eyebrow="nossa base" title="Casa Maritacas" />
        </Reveal>

        <Reveal>
          <p className="mx-auto max-w-[680px] text-xl text-ink-soft">
            Na zona sul de Ilhabela, à beira-mar em Borrifos. Nosso refúgio
            para celebrar juntos. <span>↗</span>
          </p>
        </Reveal>

        <Reveal>
          <div className="my-10.5 rounded-xl border-l-4 border-sage-deep bg-sage-deep/8 px-6 py-7">
            <p className="mb-3 font-jost text-sm font-medium tracking-[0.05em] text-sage-deep uppercase">
              ✨ Hospedagem Incluída
            </p>
            <p className="text-lg leading-relaxed text-ink">
              Todos os convidados serão hospedados na Casa Maritacas, com
              custos totalmente por nossa conta.
              <br />
              <br />
              <strong>Check-in:</strong> 04 de setembro (sexta-feira)
              <br />
              <strong>Check-out:</strong> 08 de setembro (terça-feira)
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-7 text-xl text-ink-soft">
            Conheça nosso refúgio à beira-mar em Borrifos! 🌊
          </p>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-10.5 grid max-w-[800px] grid-cols-1 gap-4 sm:grid-cols-3">
            {maritacasPhotos.map((photo, i) => (
              <figure
                key={photo.src}
                onClick={() => openAt(maritacasStartIndex + i)}
                className="relative h-[280px] cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-400 hover:-translate-y-2 hover:shadow-xl sm:aspect-square sm:h-auto"
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
            ))}
          </div>
        </Reveal>

        <div className="mt-10.5 grid grid-cols-1 gap-5.5 sm:grid-cols-3">
          <Reveal>
            <InfoCard icon="🏡" title="Condomínio Privado" description="Casa exclusiva em condomínio na zona sul de Ilhabela." />
          </Reveal>
          <Reveal delay={0.05}>
            <InfoCard icon="🌊" title="Beira-Mar" description="Localizada em Borrifos, com acesso à costa e vistas deslumbrantes." />
          </Reveal>
          <Reveal delay={0.1}>
            <InfoCard icon="👥" title="Espaço Acolhedor" description="Confortável para todos os convidados durante o fim de semana." />
          </Reveal>
        </div>

        <div className="mt-10.5 text-center">
          <p className="mb-4 font-jost text-sm tracking-[0.05em] text-ink-soft">
            Localização
          </p>
          <p className="mb-3 text-[15px]">
            <a
              href="https://maps.google.com/?q=-23.920406,-45.452049"
              target="_blank"
              rel="noreferrer"
              className="border-b border-sage font-medium text-sage-deep no-underline"
            >
              🗺️ Avenida Mário Covas Júnior 16790, Borrifos
            </a>
          </p>
          <p className="font-jost text-[13px] text-ink-soft">
            Referência: próximo ao Restaurante Almirante
          </p>
        </div>

      </div>
    </section>
  );
}
