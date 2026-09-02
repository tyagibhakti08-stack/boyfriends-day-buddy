import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import heroPolaroid from "@/assets/hero-polaroid.jpg";
import memoryCoffee from "@/assets/memory-coffee.jpg";
import memoryRoadtrip from "@/assets/memory-roadtrip.jpg";
import memoryIcecream from "@/assets/memory-icecream.jpg";
import memoryDance from "@/assets/memory-dance.jpg";
import memoryPicnic from "@/assets/memory-picnic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Boyfriend Appreciation Archive" },
      {
        name: "description",
        content:
          "A cinematic Boyfriend's Day surprise: an official report, a memory vault, unlockable badges, a how-well-do-you-know-me game, and a final reveal.",
      },
      { property: "og:title", content: "The Boyfriend Appreciation Archive" },
      {
        property: "og:description",
        content:
          "An interactive Boyfriend's Day experience — report card, memory vault, badges, quiz and a cinematic final reveal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "[NAME]";
const FUNNY_SKILL = "[FUNNY SKILL]";
const FUNNY_WEAKNESS = "[FUNNY WEAKNESS]";

type Memory = {
  src: string;
  alt: string;
  title: string;
  date: string;
  caption: string;
  story: string;
};

const memories: Memory[] = [
  {
    src: heroPolaroid,
    alt: "[PHOTO 1] — the two of us laughing on a summer street",
    title: "[MEMORY]",
    date: "The day it started",
    caption: "You laughed before I finished the joke.",
    story:
      "I remember thinking this is going to be a problem, in the best possible way. I went home and told everyone about you.",
  },
  {
    src: memoryCoffee,
    alt: "[PHOTO 2] — two coffees on a rainy cafe table",
    title: "Rain, two cups",
    date: "A Tuesday, badly planned",
    caption: "We stayed until they stacked the chairs.",
    story:
      "Nothing happened that day. That is exactly why I keep it. Just you, terrible weather, and three hours that felt like twenty minutes.",
  },
  {
    src: memoryRoadtrip,
    alt: "An open road seen from the car at dusk",
    title: "600 miles, one playlist",
    date: "The drive",
    caption: "You sang every word wrong on purpose.",
    story:
      "Somewhere past the second gas station you said you would drive anywhere with me. I have quietly held you to that ever since.",
  },
  {
    src: memoryIcecream,
    alt: "Two ice cream cones held up on a sunny street",
    title: "The theft",
    date: "Peak summer",
    caption: "You ate mine and blamed the heat.",
    story:
      "Still unresolved. Still funny. I would let you do it again tomorrow, and you know that, which is the whole problem.",
  },
  {
    src: memoryDance,
    alt: "Two silhouettes dancing under fairy lights",
    title: "Kitchen slow dance",
    date: "Late, no reason",
    caption: "Dinner burned. Worth it.",
    story:
      "You spun me between the counter and the fridge like it was a ballroom. I think about it more often than I admit.",
  },
  {
    src: memoryPicnic,
    alt: "A picnic blanket with flowers and a guitar",
    title: "The whole afternoon",
    date: "Somewhere green",
    caption: "You fell asleep mid-sentence.",
    story:
      "I sat there and did nothing for an hour and it was the calmest I had felt all year. You do that to a day.",
  },
];

const badges = [
  { icon: "🏆", name: "Professional Teaser", note: "Undefeated. Deeply annoying. Beloved." },
  { icon: "⭐", name: "Certified Good Human", note: "Verified by everyone who has met you." },
  { icon: "🎮", name: "Gaming Partner", note: "Carries me and pretends I helped." },
  { icon: "😂", name: "CEO of Making Me Laugh", note: "Zero days without a stupid voice." },
  { icon: "🛡️", name: "Always Got My Back", note: "No questions. Every single time." },
  { icon: "💯", name: "10/10 Human", note: "Would recommend. Will not share." },
];

type Question = { q: string; options: string[]; answer: number };

const quiz: Question[] = [
  {
    q: "What is the fastest way to ruin my mood?",
    options: ["Being late", "Making me wait for food", "Telling me to calm down", "Loud chewing"],
    answer: 2,
  },
  {
    q: "My comfort order, no thinking:",
    options: ["Fries and a milkshake", "Instant noodles", "Something spicy", "Ice cream at midnight"],
    answer: 3,
  },
  {
    q: "What do I actually want when I say 'I'm fine'?",
    options: ["Space", "A hug and zero questions", "Food", "Advice"],
    answer: 1,
  },
  {
    q: "The thing I secretly love that you do:",
    options: ["Texting first", "Remembering tiny details", "Winning arguments", "Driving fast"],
    answer: 1,
  },
  {
    q: "If we had one free day, I would pick:",
    options: ["Doing absolutely nothing with you", "A big trip", "A party", "Shopping"],
    answer: 0,
  },
];

const compliments = [
  "You make hard days feel handleable. That is not a small thing.",
  "You listen properly. Most people just wait for their turn to speak.",
  "You have never once made me feel like too much.",
  "You are kind when nobody is watching, which is the only kind that counts.",
  "You remember the small stuff I mention once and forget I said.",
  "Being around you is the least tiring thing in my life.",
  "You are the person I want to tell things to first. Always.",
];

function Index() {
  const [started, setStarted] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const replay = () => {
    setStarted(false);
    setRunKey((k) => k + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div key={runKey} className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Particles />
      <MusicToggle />
      {!started ? (
        <Landing onStart={() => setStarted(true)} />
      ) : (
        <main className="relative z-10">
          <Report />
          <Vault />
          <Badges />
          <Game />
          <Wall />
          <Finale onReplay={replay} />
        </main>
      )}
    </div>
  );
}

/* ---------------- shared ---------------- */

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 1 + ((i * 7) % 3),
        delay: (i % 12) * 0.9,
        dur: 12 + ((i * 5) % 14),
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-glow/20 blur-[140px]" />
      <div className="absolute -bottom-52 -right-32 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[150px]" />
      {dots.map((d, i) => (
        <span
          key={i}
          className="drift absolute rounded-full bg-accent/50"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Section({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`mx-auto w-full max-w-6xl px-5 py-24 transition-all duration-1000 sm:px-8 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function GlowButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-accent/40 bg-accent/10 px-7 py-3.5 text-sm font-medium tracking-wide text-foreground shadow-[0_0_40px_-12px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/20 hover:shadow-[0_0_60px_-10px_var(--accent)] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}

const glass =
  "rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)]";

/* ---------------- 0. music ---------------- */

function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      void a.play().then(
        () => setOn(true),
        () => setOn(false),
      );
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <audio ref={audioRef} loop preload="none" src="/music/our-song.mp3" />
      <button
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Turn music off" : "Turn music on"}
        className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs tracking-widest text-muted-foreground backdrop-blur-xl transition hover:text-foreground"
      >
        <span className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[2px] rounded-full bg-accent ${on ? "eq-bar" : ""}`}
              style={{ height: on ? "100%" : "35%", animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
        {on ? "SOUND ON" : "SOUND OFF"}
      </button>
    </div>
  );
}

/* ---------------- 1. landing ---------------- */

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="rise text-[0.7rem] uppercase tracking-[0.45em] text-accent">
        The Boyfriend Appreciation Archive
      </p>
      <h1
        className="rise mt-6 font-display text-4xl leading-[1.05] sm:text-7xl md:text-8xl"
        style={{ animationDelay: "0.15s" }}
      >
        ATTENTION,
        <span className="block bg-gradient-to-r from-accent via-glow to-accent bg-clip-text text-transparent">
          {NAME}
        </span>
      </h1>
      <p
        className="rise mt-6 max-w-xl text-balance text-sm text-muted-foreground sm:text-base"
        style={{ animationDelay: "0.3s" }}
      >
        Your Boyfriend's Day evaluation has officially begun…
      </p>
      <div className="rise mt-12" style={{ animationDelay: "0.45s" }}>
        <GlowButton onClick={onStart}>START THE EXPERIENCE →</GlowButton>
      </div>
      <p className="rise mt-8 text-xs text-muted-foreground/60" style={{ animationDelay: "0.6s" }}>
        Best with sound. Six sections. No skipping.
      </p>
    </section>
  );
}

/* ---------------- 2. report ---------------- */

function Report() {
  const { ref, shown } = useReveal<HTMLElement>();
  const rows = [
    ["Name", NAME],
    ["Position", "Boyfriend"],
    ["Department", "Making Life Better"],
    ["Status", "ACTIVE"],
    ["Special Skill", FUNNY_SKILL],
    ["Biggest Weakness", FUNNY_WEAKNESS],
  ];
  const bars = [
    ["Overall performance", 99.9],
    ["Hug quality", 100],
    ["Reply speed", 74],
    ["Snack sharing", 41],
  ] as const;

  return (
    <section
      ref={ref}
      className={`mx-auto w-full max-w-4xl px-5 py-24 transition-all duration-1000 sm:px-8 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-accent">File 01</p>
      <h2 className="mt-3 font-display text-3xl sm:text-5xl">The Official Boyfriend Report</h2>

      <div className={`${glass} relative mt-10 p-6 sm:p-10`}>
        <div className="stamp pointer-events-none absolute -top-5 right-6 rotate-[14deg] bg-background/80 rounded-md border-2 border-destructive/70 px-4 py-2 font-display text-sm tracking-[0.3em] text-destructive/80 sm:right-8">
          TOP SECRET
        </div>

        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {rows.map(([k, v], i) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-3"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
              <dd className="text-right text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 space-y-5">
          {bars.map(([label, pct], i) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{label}</span>
                <span className="text-accent">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-glow transition-[width] duration-[1600ms] ease-out"
                  style={{ width: shown ? `${pct}%` : "0%", transitionDelay: `${i * 180}ms` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm italic text-muted-foreground">
          Evaluator's note: no notes. Contract renewed indefinitely.
        </p>
      </div>
    </section>
  );
}

/* ---------------- 3. memory vault ---------------- */

function Vault() {
  const [open, setOpen] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([]);

  const openMemory = (i: number) => {
    setOpen(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };

  const another = () => {
    const next = memories.findIndex((_, i) => !seen.includes(i) && i !== open);
    openMemory(next === -1 ? ((open ?? 0) + 1) % memories.length : next);
  };

  return (
    <Section id="vault" eyebrow="File 02" title="The Memory Vault">
      <p className="-mt-6 mb-8 max-w-lg text-sm text-muted-foreground">
        Six sealed files. Tap one to open it.
      </p>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {memories.map((m, i) => (
          <button
            key={i}
            onClick={() => openMemory(i)}
            className={`sway-slow group ${glass} overflow-hidden p-3 text-left transition-all duration-500 hover:-translate-y-2 hover:border-accent/40`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <p className="mt-3 truncate font-display text-sm">{m.title}</p>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              {seen.includes(i) ? "opened" : "sealed"}
            </p>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-5 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <div
            className={`pop ${glass} max-h-[90vh] w-full max-w-lg overflow-y-auto p-5 sm:p-7`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={memories[open]!.src}
              alt={memories[open]!.alt}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.25em] text-accent">
              {memories[open]!.date}
            </p>
            <h3 className="mt-2 font-display text-2xl">{memories[open]!.title}</h3>
            <p className="mt-1 text-sm text-foreground/90">{memories[open]!.caption}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {memories[open]!.story}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GlowButton onClick={another}>Open Another Memory</GlowButton>
              <button
                onClick={() => setOpen(null)}
                className="rounded-full border border-white/12 px-6 py-3.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ---------------- 4. badges ---------------- */

function Badges() {
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const all = unlocked.length === badges.length;

  return (
    <Section id="badges" eyebrow="File 03" title="Achievement Badges">
      <p className="-mt-6 mb-8 max-w-lg text-sm text-muted-foreground">
        Tap each one to unlock it. All six are already earned — this is just paperwork.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {badges.map((b, i) => {
          const isOn = unlocked.includes(i);
          return (
            <button
              key={b.name}
              onClick={() => setUnlocked((u) => (u.includes(i) ? u : [...u, i]))}
              className={`${glass} flex flex-col items-center gap-2 p-6 text-center transition-all duration-500 ${
                isOn
                  ? "pop border-accent/45 shadow-[0_0_50px_-20px_var(--accent)]"
                  : "opacity-45 grayscale hover:opacity-80"
              }`}
            >
              <span className={`text-3xl ${isOn ? "beat" : ""}`}>{b.icon}</span>
              <span className="font-display text-sm leading-snug">{b.name}</span>
              <span
                className={`text-xs leading-snug text-muted-foreground transition-opacity duration-500 ${
                  isOn ? "opacity-100" : "opacity-0"
                }`}
              >
                {b.note}
              </span>
            </button>
          );
        })}
      </div>
      {all && (
        <p className="pop mt-8 text-center text-sm text-accent">
          All badges unlocked. Full collection, first try.
        </p>
      )}
    </Section>
  );
}

/* ---------------- 5. quiz ---------------- */

function Game() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[i]!;
  const correct = picked !== null && picked === q.answer;

  const pick = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= quiz.length) {
      setDone(true);
      return;
    }
    setI(i + 1);
    setPicked(null);
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const verdict =
    score >= 5
      ? "Flawless. Genuinely suspicious. You have been paying attention this whole time."
      : score >= 3
        ? "Solid. You know the important parts and guessed the rest with confidence."
        : "We are going to fix this over dinner. I'll bring flashcards.";

  return (
    <Section id="game" eyebrow="File 04" title="How Well Do You Know Me?">
      <div className={`${glass} p-6 sm:p-10`}>
        {!done ? (
          <div key={i} className="rise">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>
                Question {i + 1} / {quiz.length}
              </span>
              <span className="text-accent">Score {score}</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${((i + (picked !== null ? 1 : 0)) / quiz.length) * 100}%` }}
              />
            </div>

            <h3 className="mt-7 font-display text-xl sm:text-2xl">{q.q}</h3>
            <div className="mt-6 grid gap-3">
              {q.options.map((o, n) => {
                const state =
                  picked === null
                    ? "border-white/10 hover:border-accent/50 hover:bg-white/[0.06]"
                    : n === q.answer
                      ? "border-accent/60 bg-accent/12"
                      : n === picked
                        ? "border-destructive/50 bg-destructive/10"
                        : "border-white/8 opacity-50";
                return (
                  <button
                    key={o}
                    onClick={() => pick(n)}
                    className={`rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-300 ${state}`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="pop mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className={`font-display text-lg ${correct ? "text-accent" : "text-destructive"}`}>
                  {correct ? "OKAYYY, YOU ACTUALLY KNOW ME." : "Bro… we need to talk."}
                </p>
                <GlowButton onClick={next}>
                  {i + 1 >= quiz.length ? "See my verdict →" : "Next question →"}
                </GlowButton>
              </div>
            )}
          </div>
        ) : (
          <div className="pop text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Final score</p>
            <p className="mt-3 font-display text-6xl text-accent">
              {score}/{quiz.length}
            </p>
            <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">{verdict}</p>
            <div className="mt-8 flex justify-center">
              <GlowButton onClick={restart}>Try again ↻</GlowButton>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------------- 6. appreciation wall ---------------- */

function Wall() {
  const [shown, setShown] = useState<string[]>([]);
  const reveal = () => {
    if (shown.length >= compliments.length) return;
    setShown((s) => [...s, compliments[s.length]!]);
  };
  const exhausted = shown.length >= compliments.length;

  return (
    <Section id="wall" eyebrow="File 05" title="Things You Probably Don't Hear Enough">
      <div className="grid gap-4 sm:grid-cols-2">
        {shown.map((c, i) => (
          <p key={i} className={`pop ${glass} p-6 text-sm leading-relaxed text-foreground/90`}>
            {c}
          </p>
        ))}
        {shown.length === 0 && (
          <p className="text-sm text-muted-foreground">Nothing revealed yet. Ask for one.</p>
        )}
      </div>
      <div className="mt-8">
        <GlowButton onClick={reveal}>{exhausted ? "That's all of them" : "Tell Me Something…"}</GlowButton>
      </div>
    </Section>
  );
}

/* ---------------- 7. finale ---------------- */

function Finale({ onReplay }: { onReplay: () => void }) {
  const { ref, shown } = useReveal<HTMLElement>();
  const [revealed, setRevealed] = useState(false);

  const bits = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: (i * 53) % 100,
        delay: (i % 20) * 0.35,
        dur: 5 + ((i * 3) % 6),
        size: 3 + ((i * 5) % 5),
      })),
    [],
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-24 text-center"
    >
      {revealed && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {bits.map((b, i) => (
            <span
              key={i}
              className="confetti absolute top-0 rounded-full bg-accent"
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className={`relative z-10 transition-all duration-1000 ${shown ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-accent">Final file</p>
        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-6xl md:text-7xl">
          Happy Boyfriend's Day,
          <span className="block bg-gradient-to-r from-accent via-glow to-accent bg-clip-text text-transparent">
            {NAME}!
          </span>
        </h2>

        {!revealed ? (
          <div className="mt-12">
            <GlowButton onClick={() => setRevealed(true)}>Open the last thing →</GlowButton>
          </div>
        ) : (
          <div className="pop mt-10">
            <p className={`${glass} mx-auto max-w-xl p-8 font-display text-xl leading-relaxed sm:text-2xl`}>
              Out of everyone in the world, I'm really glad I get to call you my boyfriend.
            </p>
            <div className="mt-10">
              <GlowButton onClick={onReplay}>REPLAY THE WHOLE THING ↻</GlowButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
