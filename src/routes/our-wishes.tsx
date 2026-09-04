import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { readWishes, type WishEntry } from "@/lib/wishes.functions";

export const Route = createFileRoute("/our-wishes")({
  component: WishesPage,
  head: () => ({
    meta: [
      { title: "Private Wishes | The Boyfriend Appreciation Archive" },
      {
        name: "description",
        content: "A private page holding the three wishes sent through the Boyfriend Appreciation Archive.",
      },
      { property: "og:title", content: "Private Wishes" },
      { property: "og:description", content: "A private page for the wishes sent through the archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const glass =
  "rounded-3xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-xl shadow-2xl";

function WishesPage() {
  const load = useServerFn(readWishes);
  const [passcode, setPasscode] = useState("");
  const [rows, setRows] = useState<WishEntry[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      setRows(await load({ data: { passcode } }));
    } catch {
      setError("wrong code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="riso-dots min-h-screen px-6 py-24">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-display text-4xl sm:text-5xl">His wishes</h1>

        {!rows ? (
          <form onSubmit={onSubmit} className={`${glass} mt-8 space-y-4 p-6 sm:p-8`}>
            <label className="block">
              <span className="text-[0.7rem] uppercase tracking-[0.35em] text-accent">
                Secret code
              </span>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="mt-2 w-full rounded-xl border border-foreground/15 bg-background/40 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </label>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading || !passcode}
              className="rounded-full bg-gradient-to-r from-accent to-glow px-8 py-3 font-display text-lg text-primary-foreground disabled:opacity-50"
            >
              {loading ? "opening…" : "Open"}
            </button>
          </form>
        ) : rows.length === 0 ? (
          <p className="mt-8 text-muted-foreground">nothing yet — he hasn't wished.</p>
        ) : (
          <ul className="mt-8 space-y-6">
            {rows.map((w) => (
              <li key={w.id} className={`${glass} p-6 sm:p-8`}>
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-accent">
                  {new Date(w.created_at).toLocaleString()}
                </p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed">
                  <li>{w.wish_one}</li>
                  <li>{w.wish_two}</li>
                  <li>{w.wish_three}</li>
                </ol>
                {w.note && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.note}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
