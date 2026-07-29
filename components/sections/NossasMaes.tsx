import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { FloatingEmoji } from "./FloatingEmoji";

const stanzas = [
  [
    "Há amores que chegam antes da memória",
    "e permanecem depois de tudo.",
  ],
  [
    "Aprendemos o cuidado vendo cuidar,",
    "a coragem vendo insistir,",
    "o amor vendo dar sem pedir nada de volta.",
  ],
  [
    "Elas estarão sempre no coração",
    "e presentes em cada gesto nosso —",
    "na paciência de um, na fé do outro,",
    "na casa que hoje escolhemos construir.",
  ],
];

const closing = ["Que a nossa história honre", "cada minuto de dedicação delas."];

export function NossasMaes() {
  return (
    <section id="maes" className="relative overflow-hidden py-26">
      <FloatingEmoji emoji="🤍" style={{ top: "18%", left: "8%" }} />
      <FloatingEmoji emoji="🌷" size={95} style={{ top: "48%", right: "6%" }} delay={2} />
      <FloatingEmoji emoji="✨" size={85} style={{ top: "72%", left: "10%" }} delay={1.5} />
      <FloatingEmoji emoji="💌" style={{ top: "32%", right: "14%" }} delay={3} />

      <div className="relative mx-auto max-w-[1000px] px-6.5 text-center">
        <Reveal>
          <SectionHeader eyebrow="com amor e gratidão" title="Nossas Mães" />
        </Reveal>

        <Reveal>
          <p className="mx-auto max-w-[680px] text-xl text-ink-soft">
            Nada do que somos hoje começou em nós.
          </p>
        </Reveal>

        <Reveal>
          <div className="mx-auto my-10.5 max-w-[620px] rounded-xl border border-line bg-cream-2/70 px-7 py-11 shadow-sm">
            <div className="mx-auto mb-8 h-0.5 w-9 bg-sage" />

            {stanzas.map((lines, i) => (
              <p
                key={i}
                className="mt-7 text-lg leading-[1.95] text-ink first:mt-0"
              >
                {lines.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}

            <p className="mt-9 font-script text-[clamp(26px,4vw,34px)] leading-[1.4] text-sage-deep">
              {closing.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < closing.length - 1 && <br />}
                </span>
              ))}
            </p>

            <div className="mx-auto mt-9 h-0.5 w-9 bg-sage" />
          </div>
        </Reveal>

        <Reveal>
          <p className="mx-auto max-w-[560px] font-jost text-[15px] leading-relaxed tracking-[0.03em] text-ink-soft">
            Às nossas mães — por cada renúncia silenciosa, cada oração e cada
            colo. Vocês estão em cada passo desta caminhada. 🤍
          </p>
        </Reveal>
      </div>
    </section>
  );
}
