"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTop(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-48 h-[3px]">
        <div
          className="h-full bg-gradient-to-r from-sage to-sage-deep transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className={`fixed bottom-8 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-sage-deep text-white shadow-md transition-all hover:-translate-y-1 hover:bg-ocean ${
          showTop ? "flex opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
