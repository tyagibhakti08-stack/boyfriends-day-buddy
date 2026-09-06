import { useEffect, useState } from "react";

export const EGG_IDS = ["landing", "vault", "wall"] as const;
export type EggId = (typeof EGG_IDS)[number];

const KEY = "archive:eggs";
const REVEAL_KEY = "archive:eggs-revealed";
const EVENT = "archive:eggs-changed";

function readRevealed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(REVEAL_KEY) === "1";
  } catch {
    return false;
  }
}

export function revealEggs() {
  if (typeof window === "undefined") return;
  if (readRevealed()) return;
  window.localStorage.setItem(REVEAL_KEY, "1");
  window.dispatchEvent(new CustomEvent(EVENT));
}

function read(): EggId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return EGG_IDS.filter((id) => parsed.includes(id));
  } catch {
    return [];
  }
}

export function findEgg(id: EggId) {
  if (typeof window === "undefined") return;
  const next = Array.from(new Set([...read(), id]));
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function resetEggs() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.localStorage.removeItem(REVEAL_KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useEggs() {
  const [found, setFound] = useState<EggId[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const sync = () => {
      setFound(read());
      setRevealed(readRevealed());
    };
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return {
    found,
    revealed,
    total: EGG_IDS.length,
    has: (id: EggId) => found.includes(id),
    allFound: found.length === EGG_IDS.length,
  };
}
