"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-09-06T17:05:00").getTime();

function getTimeLeft() {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
];

const ZERO_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function Countdown() {
  // Starts at zero (matching the server-rendered markup) and syncs to the
  // real value on mount, since Date.now() would otherwise mismatch between
  // server render and client hydration.
  const [time, setTime] = useState(ZERO_TIME);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-nowrap justify-center gap-3 sm:gap-7">
      {units.map((unit) => (
        <div key={unit.key} className="min-w-[56px] sm:min-w-[84px]">
          <div className="text-3xl leading-none font-semibold text-sage-deep sm:text-5xl">
            {time[unit.key]}
          </div>
          <div className="mt-1.5 font-jost text-[9px] tracking-[0.14em] text-ink-soft uppercase sm:text-[11px] sm:tracking-[0.2em]">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
