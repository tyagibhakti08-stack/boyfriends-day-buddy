import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitWishes } from "@/lib/wishes.functions";

const glass =
  "rounded-3xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-xl shadow-2xl";

export default function ThreeWishes() {
  const send = useServerFn(submitWishes);
  const [wishes, setWishes] = useState(["", "", ""]);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const setWish = (i: number, v: string) =>
    setWishes((w) => w.map((x, idx) => (idx === i ? v : x)));

  const canSend = wishes.every((w) => w.trim().length > 0) && state !== "sending";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    setState("sending");
    try {
      await send({
        data: {
          wishOne: wishes[0]!.trim(),
          wishTwo: wishes[1]!.trim(),
          wishThree: wishes[2]!.trim(),
          note: note.trim() || undefined,
        },
      });
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <section id="wishes" className="relative mx-auto w-full max-w-3xl px-6 py-24">
      <p className="text-[0.7rem] uppercase tracking-[0.45em] text-accent">Final file</p>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl">Your three wishes</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        anything you want  — big, silly, impossible. write three wishes and lets give it to a genie?
      </p>

      {state === "sent" ? (
        <div className={`${glass} pop mt-10 p-10 text-center`}>
          <p className="text-4xl">🧞‍♂️</p>
          <p className="mt-4 font-display text-2xl">wishes received 💛</p>
          <p className="mt-3 text-sm text-muted-foreground">
            they're on their way to me. consider them noted, baby.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className={`${glass} mt-10 space-y-6 p-6 sm:p-10`}>
          {wishes.map((w, i) => (
            <label key={i} className="block">
              <span className="text-[0.7rem] uppercase tracking-[0.35em] text-accent">
                Wish {i + 1}
              </span>
              <input
                value={w}
                onChange={(e) => setWish(i, e.target.value)}
                maxLength={1000}
                placeholder={
                  i === 0 ? "i wish…" : i === 1 ? "and also…" : "and one more thing…"
                }
                className="mt-2 w-full rounded-xl border border-foreground/15 bg-background/40 px-4 py-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </label>
          ))}

          <label className="block">
            <span className="text-[0.7rem] uppercase tracking-[0.35em] text-accent">
              Anything else (optional)
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="say whatever you want here…"
              className="mt-2 w-full resize-none rounded-xl border border-foreground/15 bg-background/40 px-4 py-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>

          {state === "error" && (
            <p className="text-sm text-destructive">
              something went wrong sending that. try once more?
            </p>
          )}

          <button
            type="submit"
            disabled={!canSend}
            className="w-full rounded-full bg-gradient-to-r from-accent to-glow px-8 py-4 font-display text-lg text-primary-foreground shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state === "sending" ? "sending…" : "SEND MY WISHES →"}
          </button>
        </form>
      )}
    </section>
  );
}
