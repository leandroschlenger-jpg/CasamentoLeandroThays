"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface RecadoNovo {
  nome: string;
  mensagem: string;
}

export function RecadoDialog({
  onConfirm,
}: {
  onConfirm: (recado: RecadoNovo) => void;
}) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  const podeEnviar = mensagem.trim().length > 2;

  const reset = () => {
    setNome("");
    setMensagem("");
  };

  const confirm = () => {
    if (!podeEnviar) return;
    onConfirm({ nome: nome.trim(), mensagem: mensagem.trim() });
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger className="inline-flex items-center gap-2 rounded-full border-2 border-sage-deep bg-white px-6 py-3 font-jost text-[14px] font-medium tracking-[0.05em] text-sage-deep transition-all duration-200 hover:-translate-y-0.5 hover:bg-sage-deep hover:text-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:outline-none">
        <Plus className="h-4 w-4" aria-hidden="true" />
        Deixar seu recado
      </DialogTrigger>

      <DialogContent className="max-h-[88vh] overflow-y-auto bg-cream sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-script text-3xl text-sage-deep">
            Deixe seu recado
          </DialogTitle>
          <DialogDescription className="text-ink-soft">
            Sem precisar contribuir — escreva o que quiser para os noivos e seu
            recado entra no mural.
          </DialogDescription>
        </DialogHeader>

        <label className="block text-left">
          <span className="mb-2 block font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
            Seu nome (opcional)
          </span>
          <input
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como você quer aparecer no mural"
            maxLength={40}
            className="w-full rounded-lg border-2 border-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-sage"
          />
        </label>

        <label className="block text-left">
          <span className="mb-2 block font-jost text-[11px] tracking-[0.08em] text-ink-soft uppercase">
            Seu recado
          </span>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Uma frase, um desejo, uma lembrança..."
            rows={4}
            maxLength={240}
            className="w-full resize-none rounded-lg border-2 border-line bg-white px-3 py-2.5 text-[15px] leading-relaxed text-ink outline-none transition-colors focus:border-sage"
          />
          <span className="mt-1 flex justify-between font-jost text-[11px] text-ink-soft">
            <span>
              {mensagem.trim().length > 0 && !podeEnviar
                ? "Escreva pelo menos algumas letras."
                : " "}
            </span>
            <span>{mensagem.length}/240</span>
          </span>
        </label>

        <button
          type="button"
          onClick={confirm}
          disabled={!podeEnviar}
          className="rounded-lg bg-sage-deep px-6 py-3.5 font-jost text-[15px] font-medium tracking-[0.05em] text-white transition-all duration-200 hover:bg-ocean focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft"
        >
          Publicar no mural
        </button>
      </DialogContent>
    </Dialog>
  );
}
