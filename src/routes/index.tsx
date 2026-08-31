import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroPolaroid from "@/assets/hero-polaroid.jpg";
import memoryCoffee from "@/assets/memory-coffee.jpg";
import memoryRoadtrip from "@/assets/memory-roadtrip.jpg";
import memoryIcecream from "@/assets/memory-icecream.jpg";
import memoryDance from "@/assets/memory-dance.jpg";
import memoryPicnic from "@/assets/memory-picnic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Boyfriend's Day — Your Surprise Awaits" },
      {
        name: "description",
        content:
          "A five-chapter Boyfriend's Day surprise: a wish, our song, a love letter, a little game, and a picture wall with one last secret.",
      },
      { property: "og:title", content: "Happy Boyfriend's Day — Your Surprise Awaits" },
      {
        property: "og:description",
        content:
          "Press begin: our song, a handwritten letter, a heart-matching game, and a wall of us — ending in one last surprise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const wall = [
  { src: heroPolaroid, alt: "The two of us laughing on a summer street", cap: "my favorite grin" },
  { src: memoryCoffee, alt: "Two coffees on a rainy cafe table", cap: "first coffee, 2021" },
  { src: memoryRoadtrip, alt: "An open road seen from the car at dusk", cap: "600 miles, one playlist" },
  { src: memoryIcecream, alt: "Two ice cream cones held up on a sunny street", cap: "you stole mine" },
  { src: memoryDance, alt: "Two silhouettes dancing under fairy lights", cap: "kitchen slow dance" },
  { src: memoryPicnic, alt: "A picnic blanket with flowers and a guitar", cap: "the park, all afternoon" },
];

const chapters = ["wish", "music", "letter", "game", "wall"] as const;

function Index() {
  const [step, setStep] = useState(0);
  const go = (n: number) => {
    setStep(n);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper font-body text-ink">
      <div className="riso-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <Hearts />

      {step > 0 && (
        <nav className="relative mx-auto flex max-w-4xl items-center justify-center gap-2 px-6 pt-8">
          {chapters.map((c, i) => (
            <button
              key={c}
              onClick={() => go(i)}
              aria-label={`Go to ${c}`}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-riso" : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </nav>
      )}

      <div className="relative" key={step}>
        {step === 0 && <Wish onNext={() => go(1)} />}
        {step === 1 && <Music onNext={() => go(2)} />}
        {step === 2 && <Letter onNext={() => go(3)} />}
        {step === 3 && <Game onNext={() => go(4)} />}
        {step === 4 && <Wall />}
      </div>
    </main>
  );
}

const FLOATERS = [
  { c: "right-16 top-24 text-3xl text-riso2/50", d: "0s", g: "\u2665" },
  { c: "left-10 top-[320px] text-2xl text-riso/40", d: "1.6s", g: "\u2665" },
  { c: "right-24 top-[560px] text-base text-sage/40", d: "3s", g: "\u2661" },
  { c: "left-1/4 top-[140px] text-xl text-riso/25", d: "2.3s", g: "\u2661" },
  { c: "right-1/3 top-[820px] text-2xl text-riso2/40", d: "4.1s", g: "\u2665" },
  { c: "left-16 top-[700px] text-lg text-sage/30", d: "0.8s", g: "\u273F" },
];

function Hearts() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {FLOATERS.map((f) => (
        <span key={f.c} className={`floaty absolute ${f.c}`} style={{ animationDelay: f.d }}>
          {f.g}
        </span>
      ))}
    </div>
  );
}

function Confetti({ count = 36 }: { count?: number }) {
  const bits = useRef(
    Array.from({ length: count }, (_, i) => ({
      i,
      left: Math.random() * 100,
      delay: Math.random() * 1.8,
      dur: 3 + Math.random() * 2.5,
      size: 10 + Math.random() * 18,
      g: ["\u2665", "\u2661", "\u273F", "\u2726"][i % 4] as string,
      tone: ["text-riso", "text-riso2", "text-sage", "text-ink/50"][i % 4] as string,
    })),
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bits.current.map((b) => (
        <span
          key={b.i}
          className={`confetti absolute top-0 ${b.tone}`}
          style={{
            left: `${b.left}%`,
            fontSize: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        >
          {b.g}
        </span>
      ))}
    </div>
  );
}

function NextButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-[min(1vw,12px)] bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.5)] active:translate-y-0"
    >
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-paper/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </button>
  );
}

function Wish({ onNext }: { onNext: () => void }) {
  return (
    <section className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 pb-24 pt-16 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="rise mb-5 text-xs uppercase tracking-[0.35em] text-sage">
          OCTOBER 3 &middot; BOYFRIEND&rsquo;S DAY
        </p>
        <h1
          className="rise text-balance font-display text-[3.25rem] font-medium leading-[0.95] lg:text-[4.5rem]"
          style={{ animationDelay: "0.1s" }}
        >
          Happy Boyfriend&rsquo;s Day,{" "}
          <span className="inline-block italic text-riso">my love</span>
          <span className="beat ml-1 inline-block text-riso2">&#9829;</span>
        </h1>
        <p
          className="rise mt-6 max-w-[42ch] text-pretty text-base text-ink/75"
          style={{ animationDelay: "0.22s" }}
        >
          I made you something &mdash; five little chapters, one for each way you
          make my days softer.
        </p>
        <div
          className="rise mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.34s" }}
        >
          <NextButton onClick={onNext} label="Let's begin your surprise" />
          <span className="sway font-hand text-lg text-ink/60">press it, go on</span>
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="pop relative" style={{ animationDelay: "0.3s" }}>
          <div
            className="absolute -inset-3 rotate-[4deg] rounded-[min(1vw,16px)] bg-riso2/30"
            aria-hidden="true"
          />
          <div className="sway relative rounded-[min(1vw,14px)] bg-paper2 p-3 pb-10 ring-1 ring-black/5">
            <img
              src={heroPolaroid}
              alt="The two of us laughing on a summer street"
              width={1024}
              height={1024}
              className="aspect-square w-full rounded-[min(1vw,12px)] object-cover"
            />
            <p className="mt-3 text-center font-hand text-xl text-ink/70">
              you, grinning like an idiot. my favorite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Music({ onNext }: { onNext: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      setFailed(true);
    }
  };

  return (
    <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-14 text-center">
      <p className="rise text-xs uppercase tracking-[0.35em] text-sage">CHAPTER ONE</p>
      <h2 className="rise mt-4 text-balance font-display text-4xl font-medium" style={{ animationDelay: "0.1s" }}>
        Our song
      </h2>
      <p
        className="rise mx-auto mt-4 max-w-[40ch] text-pretty text-ink/75"
        style={{ animationDelay: "0.2s" }}
      >
        Put it on, let it run underneath the rest of this. It&rsquo;s the one that always sounds
        like you.
      </p>

      <div
        className="pop mx-auto mt-10 max-w-sm rotate-[-1deg] rounded-[min(1vw,16px)] bg-paper2 p-8 ring-1 ring-black/5"
        style={{ animationDelay: "0.28s" }}
      >
        <div
          className={`relative mx-auto grid size-32 place-items-center rounded-full bg-ink/90 transition-shadow duration-500 ${
            playing ? "spin-slow shadow-[0_0_0_10px_rgba(0,0,0,0.05)]" : ""
          }`}
        >
          <div className="grid size-10 place-items-center rounded-full bg-paper">
            <div className="size-3 rounded-full bg-riso" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className={`mt-6 flex h-8 items-end justify-center gap-1.5 transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-25"
          }`}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full bg-riso ${playing ? "eq-bar" : ""}`}
              style={{ height: "100%", animationDelay: `${i * 0.11}s` }}
            />
          ))}
        </div>

        <button
          onClick={toggle}
          className="wiggle mt-6 w-full rounded-[min(1vw,12px)] bg-riso px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
        >
          {playing ? "Pause our song" : "Play our song"}
        </button>
        <p className="mt-3 font-hand text-lg text-ink/60">
          {failed ? "add your mp3 to public/music/our-song.mp3" : "volume up, please"}
        </p>
        <audio
          ref={audioRef}
          src="/music/our-song.mp3"
          loop
          preload="none"
          onError={() => setFailed(true)}
        />
      </div>

      <div className="mt-10">
        <NextButton onClick={onNext} label="Next: read your letter" />
      </div>
    </section>
  );
}

const LETTER: string[] = [
  "I don\u2019t say it enough: thank you for the ordinary Tuesday nights, the bad jokes, and the way you make a room feel safer just by walking into it.",
  "You are the person I want to tell everything to first \u2014 the good news, the silly news, the 3am nothing-news. Loving you has never once felt like work.",
  "So happy Boyfriend\u2019s Day. Today is just an excuse; I\u2019d have said all of this anyway.",
];

function Letter({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-14">
      <p className="rise text-center text-xs uppercase tracking-[0.35em] text-sage">CHAPTER TWO</p>
      <h2
        className="rise mt-4 text-center text-balance font-display text-4xl font-medium"
        style={{ animationDelay: "0.1s" }}
      >
        A love letter
      </h2>

      {!open ? (
        <div className="mt-10 text-center">
          <button
            onClick={() => setOpen(true)}
            className="pop mx-auto block w-full max-w-md rotate-[-1deg] rounded-[min(1vw,16px)] bg-paper2 p-12 ring-1 ring-black/5 transition-all duration-500 hover:rotate-0 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.45)]"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="beat block text-5xl text-riso">&#9825;</span>
            <span className="mt-4 block font-hand text-2xl text-ink/70">open me</span>
          </button>
        </div>
      ) : (
        <div className="pop relative mt-10 rotate-[-0.5deg] rounded-[min(1vw,16px)] bg-paper2 p-8 ring-1 ring-black/5 sm:p-12">
          <span className="rise absolute -top-3 left-10 rotate-[-4deg] font-hand text-2xl text-riso">
            to my favorite person,
          </span>
          <div className="space-y-5 text-pretty font-display text-xl leading-[1.5] sm:text-2xl">
            {LETTER.map((line, i) => (
              <p key={i} className="rise" style={{ animationDelay: `${0.25 + i * 0.35}s` }}>
                {line}
              </p>
            ))}
          </div>
          <p
            className="rise mt-8 text-right font-hand text-2xl text-riso"
            style={{ animationDelay: `${0.25 + LETTER.length * 0.35}s` }}
          >
            always, me
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        <NextButton onClick={onNext} label="Next: play a little game" />
      </div>
    </section>
  );
}

const ICONS = ["\u2661", "\u2600", "\u266A", "\u2615", "\u2708", "\u273F"];

type Card = { id: number; icon: string; flipped: boolean; matched: boolean };

function buildDeck(): Card[] {
  const pairs = [...ICONS, ...ICONS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j] as string, pairs[i] as string];
  }
  return pairs.map((icon, id) => ({ id, icon, flipped: false, matched: false }));
}

function Game({ onNext }: { onNext: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [picks, setPicks] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => setCards(buildDeck()), []);

  const won = cards.length > 0 && cards.every((c) => c.matched);

  const flip = (id: number) => {
    if (picks.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    const nextPicks = [...picks, id];
    setCards(next);
    setPicks(nextPicks);

    if (nextPicks.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextPicks.map((p) => next.find((c) => c.id === p)!) as [Card, Card];
      const match = a.icon === b.icon;
      setTimeout(() => {
        setCards((cur) =>
          cur.map((c) =>
            nextPicks.includes(c.id) ? { ...c, matched: match, flipped: match } : c,
          ),
        );
        setPicks([]);
      }, 700);
    }
  };

  return (
    <section className="relative mx-auto max-w-2xl px-6 pb-24 pt-14 text-center">
      {won && <Confetti />}
      <p className="rise text-xs uppercase tracking-[0.35em] text-sage">CHAPTER THREE</p>
      <h2
        className="rise mt-4 text-balance font-display text-4xl font-medium"
        style={{ animationDelay: "0.1s" }}
      >
        Match our little things
      </h2>
      <p
        className="rise mx-auto mt-4 max-w-[40ch] text-pretty text-ink/75"
        style={{ animationDelay: "0.2s" }}
      >
        Six pairs, all of them us. Find them all to unlock the picture wall.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c, i) => {
          const face = c.flipped || c.matched;
          return (
            <button
              key={c.id}
              onClick={() => flip(c.id)}
              aria-label={face ? `Card ${c.icon}` : "Hidden card"}
              className={`flip-scene pop aspect-square rounded-[min(1vw,14px)] text-2xl transition-transform duration-300 sm:text-3xl ${
                face ? "" : "hover:-translate-y-1"
              } ${c.matched ? "beat" : ""}`}
              style={{ animationDelay: c.matched ? "0s" : `${i * 0.035}s` }}
            >
              <div className={`flip-inner ${face ? "is-flipped" : ""}`}>
                <span className="flip-face bg-ink/85 text-transparent ring-1 ring-black/5">
                  {"\u2661"}
                </span>
                <span
                  className={`flip-face flip-back ring-1 ring-black/5 ${
                    c.matched ? "bg-riso2/40 text-riso" : "bg-paper2 text-ink"
                  }`}
                >
                  {c.icon}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className={`mt-5 font-hand text-lg text-ink/60 ${won ? "pop text-riso" : ""}`}>
        {won ? `all found in ${moves} moves \u2014 of course you did` : `moves: ${moves}`}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            setCards(buildDeck());
            setPicks([]);
            setMoves(0);
          }}
          className="rounded-[min(1vw,12px)] border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-all hover:-translate-y-0.5 hover:border-ink/30"
        >
          Shuffle again
        </button>
        {won && <NextButton onClick={onNext} label="Next: the picture wall" />}
      </div>
    </section>
  );
}

function Wall() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-14">
      {revealed && <Confetti count={60} />}
      <div className="text-center">
        <p className="rise text-xs uppercase tracking-[0.35em] text-sage">CHAPTER FOUR</p>
        <h2
          className="rise mt-4 text-balance font-display text-4xl font-medium"
          style={{ animationDelay: "0.1s" }}
        >
          Our picture wall
        </h2>
        <p
          className="rise mx-auto mt-4 max-w-[42ch] text-pretty text-ink/75"
          style={{ animationDelay: "0.2s" }}
        >
          Every one of these started as an ordinary day. Then you were in it.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wall.map((p, i) => (
          <figure
            key={p.cap}
            className={`pop group rounded-[min(1vw,14px)] bg-paper2 p-3 pb-8 ring-1 ring-black/5 transition-all duration-500 hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_24px_44px_-28px_rgba(0,0,0,0.55)] ${
              i % 2 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"
            }`}
            style={{ animationDelay: `${0.25 + i * 0.09}s` }}
          >
            <div className="overflow-hidden rounded-[min(1vw,10px)]">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={768}
                height={768}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <figcaption className="mt-3 text-center font-hand text-xl text-ink/70">
              {p.cap}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-16 text-center">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="beat rounded-[min(1vw,12px)] bg-riso px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-1"
          >
            One last surprise &#9829;
          </button>
        ) : (
          <div className="pop mx-auto max-w-xl rotate-[-0.5deg] rounded-[min(1vw,16px)] bg-paper2 p-10 ring-1 ring-black/5">
            <p className="font-hand text-3xl text-riso">the last surprise</p>
            <p className="mt-4 text-pretty font-display text-2xl leading-[1.4]">
              Saturday. 7pm. Wear the shirt I like. There&rsquo;s a table booked, a playlist ready,
              and a whole night that&rsquo;s just ours.
            </p>
            <p className="mt-6 text-sm text-ink/60">
              Happy Boyfriend&rsquo;s Day. I love you, endlessly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
