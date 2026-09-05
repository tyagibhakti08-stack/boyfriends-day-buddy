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
  const { has } = useEggs();
  const [justFound, setJustFound] = useState(false);
  const found = has(id);

  return (
    <button
      type="button"
      aria-label="hidden thing"
      title={found ? "found" : ""}
      onClick={() => {
        findEgg(id);
        setJustFound(true);
      }}
      className={`select-none align-middle text-sm leading-none transition-all duration-500 ${
        found
          ? "scale-110 text-accent opacity-100 drop-shadow-[0_0_10px_hsl(var(--glow)/0.8)]"
          : "text-accent/15 opacity-40 hover:scale-125 hover:text-accent hover:opacity-100"
      } ${className}`}
    >
      {found ? "🔑" : hint}
      {justFound && (
        <span className="pop ml-2 text-[0.6rem] uppercase tracking-[0.3em] text-accent">
          key found
        </span>
      )}
    </button>
  );
}
