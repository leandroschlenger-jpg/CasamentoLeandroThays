"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const quickValues = [100, 200, 300, 500, 1000];

export interface Contribuicao {
  valor: number;
  nome: string;
  mensagem: string;
}

function parseValue(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function ContribuirDialog({
  pixKey,
  onConfirm,
}: {
  pixKey: string;
  onConfirm: (contribuicao: Contribuicao) => void;
}) {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [copied, setCopied] = useState(false);

  const value = parseValue(raw);

  const reset = () => {
    setRaw("");
    setNome("");
    setMensagem("");
    setCopied(false);
  };

  const confirm = () => {
    if (value <= 0) return;
    onConfirm({ valor: value, nome: nome.trim(), mensagem: mensagem.trim() });
    setOpen(false);
    reset();
  };

  const copyPix = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger className="inline-flex items-center gap-2 rounded-full bg-sage-deep px-8 py-4 font-jost text-[15px] font-medium tracking-[0.05em] text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-ocean hover:shadow-lg">
        🎁 Vou contribuir
      </DialogTrigger>

      <DialogContent className="max-h-[88vh] overflow-y-auto bg-cream sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-script text-3xl text-sage-deep">
            Quanto você vai enviar?
          </DialogTitle>
          <DialogDescription className="text-ink-soft">
            Informe o valor do seu PIX para avançar o casal no tabuleiro e deixe
            um recado no mural.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {quickValues.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setRaw(String(v))}
              className={`rounded-full border px-4 py-2 font-jost text-[13px] font-medium transition-all ${
                value === v
                  ? "border-sage-deep bg-sage-deep text-white"
                  : "border-line bg-white text-ink hover:border-sage hover:bg-sage-deep/8"
              }`}
            >
              R$ {v.toLocaleString("pt-BR")}
            </button>
          ))}
        </div>

        <label className="block text-left">
          <span className="mb-2 block font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
            Ou digite outro valor
          </span>
          <div className="flex items-center gap-2 rounded-lg border-2 border-line bg-white px-3 focus-within:border-sage">
            <span className="font-jost text-base text-ink-soft">R$</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={value ? value.toLocaleString("pt-BR") : ""}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent py-3 text-lg font-semibold text-ink outline-none"
            />
          </div>
        </label>

        <label className="block text-left">
          <span className="mb-2 block font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
            Seu nome
          </span>
          <input
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como você quer aparecer no mural"
            maxLength={40}
            className="w-full rounded-lg border-2 border-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-sage"
          />
        </label>

        <label className="block text-left">
          <span className="mb-2 block font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
            Recado para os noivos
          </span>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Uma frase, um desejo, uma bênção..."
            rows={3}
            maxLength={240}
            className="w-full resize-none rounded-lg border-2 border-line bg-white px-3 py-2.5 text-[15px] leading-relaxed text-ink outline-none focus:border-sage"
          />
          <span className="mt-1 block text-right font-jost text-[11px] text-ink-soft">
            {mensagem.length}/240
          </span>
        </label>

        <div className="rounded-lg bg-sage-deep/8 p-3 text-left">
          <p className="mb-2 font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
            Chave PIX
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded bg-white px-2 py-2 font-mono text-[11px] text-ink">
              {pixKey}
            </code>
            <button
              type="button"
              onClick={copyPix}
              className="rounded-md bg-sage-deep px-3 py-2 font-jost text-xs font-medium text-white transition-all hover:bg-ocean"
            >
              {copied ? "✓" : "Copiar"}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={confirm}
          disabled={value <= 0}
          className="rounded-lg bg-sage-deep px-6 py-3.5 font-jost text-[15px] font-medium tracking-[0.05em] text-white transition-all hover:bg-ocean disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft"
        >
          {value > 0
            ? `Avançar o casal com R$ ${value.toLocaleString("pt-BR")}`
            : "Escolha um valor"}
        </button>

        <p className="text-center font-jost text-[11px] leading-relaxed text-ink-soft">
          O envio acontece no app do seu banco — aqui você só marca o valor no
          tabuleiro. No mural aparece seu nome e seu recado, nunca o valor. 🤍
        </p>
      </DialogContent>
    </Dialog>
  );
}
