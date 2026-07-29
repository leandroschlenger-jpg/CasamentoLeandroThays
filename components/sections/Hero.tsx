import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <section id="hero">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/pedido.mp4"
        posterSrc="/001.jpg"
        bgImageSrc="/033.jpg"
        title="Leandro & Thays"
        date="06 de Setembro de 2026"
        scrollToExpand="↓ Deslize para conhecer ↓"
        aboveMedia={
          <div className="rounded-2xl border border-white/30 bg-cream/88 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-9 sm:py-5">
            <p className="mb-2 font-jost text-[9px] tracking-[0.22em] text-ink-soft uppercase sm:mb-3 sm:text-[11px] sm:tracking-[0.28em]">
              contagem para o grande dia
            </p>
            <Countdown />
          </div>
        }
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="font-jost text-sm tracking-[0.26em] text-ink-soft uppercase">
            Ilhabela <span className="mx-3 text-sage">◆</span>{" "}
            <b className="font-medium text-ink">17h05</b>{" "}
            <span className="mx-3 text-sage">◆</span> Casa Maritacas
          </p>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
