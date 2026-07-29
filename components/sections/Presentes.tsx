"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { FloatingEmoji } from "./FloatingEmoji";
import { PresentesTabuleiro } from "./PresentesTabuleiro";
import { ContribuirDialog, type Contribuicao } from "./ContribuirDialog";
import { RecadoDialog, type RecadoNovo } from "./RecadoDialog";
import { destinos as destinations } from "@/lib/destinos";
import { destinoPhotoIndex } from "@/lib/photos";
import { useLightbox } from "@/components/lightbox-provider";

interface Recado {
  nome: string;
  mensagem: string;
}

const recadosIniciais: Recado[] = [
  { nome: "", mensagem: "Amamos muito vocês, espero que aproveitem." },
  {
    nome: "",
    mensagem:
      "Que essa viagem seja só a primeira de muitas. Vocês merecem o mundo!",
  },
  {
    nome: "",
    mensagem:
      "Um brinde à vida que vocês estão construindo juntos. Aproveitem cada minuto!",
  },
];

const PIX_KEY = "d2ca07c6-689b-46fa-b46c-9738f5c6990f";
const QR_CODE_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020126580014br.gov.bcb.pix0136d2ca07c6-689b-46fa-b46c-9738f5c6990f5204000053039865802BR5913LEANDRO PAG6009SAO PAULO62410503***6304D1D4";

function computeBoardState(currentAmount: number) {
  let reachedIndex = -1;

  for (let i = 0; i < destinations.length; i++) {
    if (currentAmount >= destinations[i].value) {
      reachedIndex = i;
    } else {
      break;
    }
  }

  const allReached = reachedIndex === destinations.length - 1;
  const nextDestination = allReached
    ? destinations[reachedIndex]
    : destinations[reachedIndex + 1];
  const falta = allReached
    ? 0
    : Math.max(0, nextDestination.value - currentAmount);

  const trechoInicio = reachedIndex >= 0 ? destinations[reachedIndex].value : 0;
  const trechoTotal = nextDestination.value - trechoInicio;
  const trechoProgresso = allReached
    ? 1
    : Math.min(1, Math.max(0, (currentAmount - trechoInicio) / trechoTotal));

  return { reachedIndex, nextDestination, falta, allReached, trechoProgresso };
}

export function Presentes() {
  const { openAt } = useLightbox();
  const [currentAmount, setCurrentAmount] = useState(1500);
  const [lastDonation, setLastDonation] = useState<number | null>(null);
  const [recados, setRecados] = useState<Recado[]>(recadosIniciais);
  const [copied, setCopied] = useState(false);

  const registrarContribuicao = ({ valor, nome, mensagem }: Contribuicao) => {
    setLastDonation(valor);
    setCurrentAmount((a) => a + valor);
    if (mensagem) {
      setRecados((atuais) => [{ nome, mensagem }, ...atuais]);
    }
  };

  const adicionarRecado = ({ nome, mensagem }: RecadoNovo) => {
    setRecados((atuais) => [{ nome, mensagem }, ...atuais]);
  };

  const abrirFotoDestino = (destIndex: number) => {
    const photoIndex = destinoPhotoIndex[destIndex];
    if (photoIndex !== null && photoIndex !== undefined) openAt(photoIndex);
  };

  useEffect(() => {
    const w = window as unknown as { addDonation?: (amount: number) => void };
    w.addDonation = (amount: number) => {
      setLastDonation(amount);
      setCurrentAmount((a) => a + amount);
    };
    return () => {
      delete w.addDonation;
    };
  }, []);

  const { reachedIndex, nextDestination, falta, allReached, trechoProgresso } =
    computeBoardState(currentAmount);

  const copyPix = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="presentes"
      className="relative overflow-hidden bg-gradient-to-b from-ocean/3 to-cream-2 py-26"
    >
      <FloatingEmoji emoji="🌊" style={{ top: "20%", right: "8%" }} />
      <FloatingEmoji emoji="💎" size={100} style={{ top: "50%", left: "5%" }} delay={2} />
      <FloatingEmoji emoji="✨" size={90} style={{ top: "70%", right: "12%" }} delay={1.5} />
      <FloatingEmoji emoji="💨" style={{ top: "35%", left: "12%" }} delay={2.5} />

      <div className="mx-auto max-w-[1000px] px-6.5 text-center">
        <Reveal>
          <SectionHeader eyebrow="lua de mel" title="Presentes" />
        </Reveal>

        <Reveal>
          <p className="mx-auto max-w-[680px] text-xl text-ink-soft">
            Sua presença já é o melhor presente, mas se deseja nos ajudar com a
            lua de mel...
          </p>
        </Reveal>

        <Reveal>
          <div className="mx-auto my-10.5 max-w-[600px] rounded-xl border-2 border-dashed border-sage-soft bg-sage-deep/6 px-6.5 py-8">
            <p className="mb-4 font-script text-3xl text-sage-deep">
              ✈️ Viagens & Aventuras ✈️
            </p>
            <p className="text-base leading-relaxed text-ink">
              Nosso sonho é explorar o mundo juntos — das praias caribenhas
              aos picos dos Andes, passando por castelos europeus e templos
              asiáticos.
              <br />
              <br />
              <strong>Cada presente nos leva para mais perto de um novo destino!</strong>{" "}
              🌍
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="my-16 px-4">
            <div className="relative mb-5 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(90,74,46,0.18)] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-12 after:bg-gradient-to-l after:from-[#E4C68C]/80 after:to-transparent sm:after:hidden">
              <div className="overflow-x-auto">
                <PresentesTabuleiro
                  destinations={destinations}
                  currentAmount={currentAmount}
                  onDestinoClick={abrirFotoDestino}
                />
              </div>
            </div>

            <p className="mb-3 font-jost text-[12px] tracking-[0.05em] text-ink-soft sm:hidden">
              ← deslize para ver o tabuleiro inteiro →
            </p>
            <p className="mb-2 font-jost text-[12px] tracking-[0.05em] text-ink-soft">
              🔍 clique na casa de um destino para ver a foto grande
            </p>
            <p className="mb-8 font-jost text-[10px] tracking-[0.03em] text-ink-soft/70">
              Fotos dos destinos:{" "}
              <a
                href="/destinos/CREDITOS.txt"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Wikimedia Commons (CC BY / CC BY-SA)
              </a>
            </p>

            <div className="mb-4">
              <ContribuirDialog
                pixKey={PIX_KEY}
                onConfirm={registrarContribuicao}
              />
            </div>

            {lastDonation !== null && (
              <p className="mb-10 font-jost text-[13px] font-medium tracking-[0.03em] text-sage-deep">
                ✓ R$ {lastDonation.toLocaleString("pt-BR")} registrados no
                tabuleiro. Obrigado! 🤍
              </p>
            )}

            <div className="mx-auto mb-12 max-w-[620px] rounded-2xl bg-white px-8 py-9 shadow-md">
              {allReached ? (
                <>
                  <p className="mb-3 font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
                    Todos os destinos conquistados
                  </p>
                  <div className="mb-2 font-script text-[clamp(38px,6vw,58px)] leading-none text-sage-deep">
                    R$ {currentAmount.toLocaleString("pt-BR")} 🎉
                  </div>
                  <p className="text-[15px] text-ink-soft">
                    Vocês levaram o casal até a Jamaica. Obrigado! 🤍
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4 font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
                    Faltam para o próximo destino
                  </p>
                  <div className="font-script text-[clamp(48px,9vw,80px)] leading-none text-sage-deep">
                    R$ {falta.toLocaleString("pt-BR")}
                  </div>
                  <p className="mt-4 text-xl text-ink">
                    para <span className="text-2xl">{nextDestination.icon}</span>{" "}
                    <strong className="font-semibold text-sage-deep">
                      {nextDestination.name}
                    </strong>
                  </p>

                  <div className="mt-7 h-3 overflow-hidden rounded-full bg-cream-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sage to-sage-deep transition-[width] duration-700 ease-out"
                      style={{ width: `${Math.round(trechoProgresso * 100)}%` }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between font-jost text-[12px] text-ink-soft">
                    <span>
                      {Math.round(trechoProgresso * 100)}% do trecho
                    </span>
                    <span>
                      Total arrecadado: R$ {currentAmount.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {destinations.map((dest, idx) => {
                const reached = idx <= reachedIndex;
                const isNext = idx === reachedIndex + 1;
                const opacity = reached ? 1 : isNext ? 0.8 : Math.max(0.5, 1 - (idx - reachedIndex - 1) * 0.15);
                return (
                  <div
                    key={dest.name}
                    className={`relative rounded-xl px-4.5 py-4.5 text-center transition-all duration-300 ${
                      reached
                        ? "border-2 border-sage-deep bg-white"
                        : "border-2 border-dashed border-[#845EF7]/60 bg-[#845EF7]/6"
                    }`}
                    style={{ opacity }}
                  >
                    {reached && <div className="absolute top-2 right-2 text-lg">✓</div>}
                    <div className="mb-2 text-[42px]">{dest.icon}</div>
                    <div className={`mb-1 text-xs font-semibold ${reached ? "text-sage-deep" : "text-ink-soft"}`}>
                      {dest.name}
                    </div>
                    <div className={`text-[11px] font-semibold ${reached ? "text-sage-deep" : "text-ink-soft"}`}>
                      R$ {dest.value.toLocaleString("pt-BR")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-3 font-jost text-[13px] tracking-[0.05em] text-ink-soft uppercase">
            PIX - Lua de Mel
          </p>
          <div className="mx-auto flex max-w-[400px] gap-2">
            <input
              type="text"
              readOnly
              value={PIX_KEY}
              className="flex-1 rounded-md border-2 border-line px-3 py-2.5 font-mono text-xs"
            />
            <button
              onClick={copyPix}
              className="rounded-md bg-sage-deep px-5 py-2.5 font-medium text-white transition-all hover:bg-ocean"
            >
              {copied ? "✓ Copiado!" : "Copiar"}
            </button>
          </div>

          <div className="mt-10.5">
            <p className="mb-4 font-jost text-sm tracking-[0.05em] text-ink-soft">OU escaneie:</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={QR_CODE_URL}
              alt="QR Code PIX"
              className="mx-auto block h-auto w-full max-w-[300px] rounded-xl shadow-sm"
            />
          </div>
        </Reveal>

        <div id="mural" className="mt-20 scroll-mt-24">
          <Reveal>
            <p className="font-jost text-xs tracking-[0.32em] text-sage-deep uppercase">
              recados dos convidados
            </p>
            <h3 className="mt-1.5 font-script text-[clamp(34px,5vw,50px)] leading-none text-sage-deep">
              Mural
            </h3>
            <div className="mx-auto mt-5.5 h-0.5 w-13.5 bg-sage" />
            <p className="mt-5 font-jost text-[13px] text-ink-soft">
              {recados.length}{" "}
              {recados.length === 1 ? "recado" : "recados"} no mural — qualquer
              pessoa pode escrever, com ou sem contribuição.
            </p>
            <div className="mt-6 mb-10 flex justify-center">
              <RecadoDialog onConfirm={adicionarRecado} />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {recados.map((recado, i) => (
              <Reveal key={`${recado.nome}-${i}`} delay={Math.min(i * 0.05, 0.25)}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-white px-6 py-6 shadow-[0_2px_10px_rgba(90,74,46,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(90,74,46,0.13)]">
                  <blockquote className="relative pl-7 text-[15px] leading-relaxed text-ink">
                    <span
                      aria-hidden="true"
                      className="absolute top-[-6px] left-0 font-script text-4xl leading-none text-sage"
                    >
                      “
                    </span>
                    {recado.mensagem}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-jost text-[12px] tracking-[0.08em] text-sage-deep uppercase">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-deep/12 font-sans text-[13px] font-semibold normal-case tracking-normal text-sage-deep"
                    >
                      {recado.nome ? recado.nome.trim().charAt(0).toUpperCase() : "♥"}
                    </span>
                    {recado.nome || "com carinho"}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
