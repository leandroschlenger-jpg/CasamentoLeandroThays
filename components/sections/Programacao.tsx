import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

interface TimelineItem {
  day: string;
  time: string;
  label: string;
  highlight?: boolean;
}

const items: TimelineItem[] = [
  { day: "Sexta, 04 de set", time: "manhã", label: "👰🤵 Noivos na Ilha" },
  { day: "Sexta, 04 de set", time: "", label: "🚗 Check-in Convidados" },
  { day: "Sábado, 05 de set", time: "19h30", label: "🍽️ Jantar com Convidados" },
  { day: "Domingo, 06 de set", time: "17h05", label: "⛪ Cerimônia", highlight: true },
  { day: "Domingo, 06 de set", time: "18h30", label: "🥂 Brinde" },
  { day: "Domingo, 06 de set", time: "20h00", label: "🍽️ Jantar Especial" },
  { day: "Domingo, 06 de set", time: "22h+", label: "🎵 Música & Dança" },
  { day: "Segunda, 07 de set", time: "o dia todo", label: "⛵ Passeios & Exploração" },
  { day: "Terça, 08 de set", time: "12h00", label: "👋 Check-out" },
];

export function Programacao() {
  return (
    <section id="programacao" className="py-26">
      <div className="mx-auto max-w-[1000px] px-6.5 text-center">
        <Reveal>
          <SectionHeader eyebrow="agenda do fim de semana" title="Programação" />
        </Reveal>

        <div className="relative mx-auto mt-11.5 max-w-[560px]">
          <div className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-line" />

          {items.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
              <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-5 py-4.5">
                <div className="text-right">
                  <span
                    className={`font-jost text-[13px] tracking-[0.12em] ${
                      item.highlight ? "text-sage-deep" : "text-sage-deep"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
                <div
                  className={`h-3.5 w-3.5 rounded-full border-2 ${
                    item.highlight
                      ? "border-sage-deep bg-sage-deep"
                      : "border-sage bg-cream"
                  }`}
                />
                <div
                  className={`text-left text-xl ${
                    item.highlight ? "font-semibold text-sage-deep" : "text-ink"
                  }`}
                >
                  <small
                    className={`mb-1 block font-jost text-xs font-medium tracking-[0.04em] uppercase ${
                      item.highlight ? "text-sage-deep" : "text-ink-soft"
                    }`}
                  >
                    {item.day}
                  </small>
                  {item.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
