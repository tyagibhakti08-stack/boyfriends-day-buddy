import { useState } from "react";
import { findEgg, useEggs, type EggId } from "@/lib/eggs";

export default function EasterEgg({
  id,
  className = "",
  hint = "✦",
}: {
  id: EggId;
  className?: string;
  hint?: string;
}) {
  const { has, revealed } = useEggs();
  const [justFound, setJustFound] = useState(false);
  const found = has(id);

  if (!revealed) return null;

  return (
    <button
      type="button"
      aria-label="hidden thing"
      title={found ? "found" : ""}
      onClick={() => {
        findEgg(id);
        setJustFound(true);
      }}
      className={`inline-block select-none align-middle text-xl leading-none transition-all duration-500 ${
        found
          ? "scale-110 opacity-100 drop-shadow-[0_0_12px_hsl(var(--glow)/0.9)]"
          : "animate-pulse opacity-90 drop-shadow-[0_0_10px_hsl(var(--glow)/0.7)] hover:scale-125"
      } ${className}`}
    >
      {found ? "🔑" : "🗝️"}
      {justFound && (
        <span className="pop ml-2 text-[0.6rem] uppercase tracking-[0.3em] text-accent">
          key found
        </span>
      )}
    </button>
  );
}
