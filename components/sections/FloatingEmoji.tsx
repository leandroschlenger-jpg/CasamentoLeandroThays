import { CSSProperties } from "react";

export function FloatingEmoji({
  emoji,
  style,
  size = 60,
  delay = 0,
}: {
  emoji: string;
  style: CSSProperties;
  size?: number;
  delay?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute opacity-[0.08]"
      style={{
        fontSize: size,
        animation: `drift 20s linear infinite`,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {emoji}
    </div>
  );
}
