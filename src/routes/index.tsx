import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import ThreeWishes from "@/components/ThreeWishes";



import heroPolaroid from "@/assets/hero-polaroid.jpg";
import sleepAsset from "@/assets/sleep.jpg.asset.json";
import flowerAsset from "@/assets/flower.jpg.asset.json";
import canteenAsset from "@/assets/canteen.jpg.asset.json";
import rainAsset from "@/assets/rain.jpg.asset.json";
import blehAsset from "@/assets/bleh.jpg.asset.json";
import pookieAsset from "@/assets/pookie.jpg.asset.json";
import memoryCoffee from "@/assets/memory-coffee.jpg";
import nithinAsset from "@/assets/nithin.jpg.asset.json";
import boysAsset from "@/assets/boys.jpg.asset.json";
import tomatoAsset from "@/assets/tomato.jpg.asset.json";
import familyAsset from "@/assets/family2.jpg.asset.json";
import sisAsset from "@/assets/sis2.jpg.asset.json";
import memoryRoadtrip from "@/assets/memory-roadtrip.jpg";
import memoryIcecream from "@/assets/memory-icecream.jpg";
import memoryDance from "@/assets/memory-dance.jpg";
import memoryPicnic from "@/assets/memory-picnic.jpg";
import trackA from "@/assets/track-a.m4a.asset.json";
import trackB from "@/assets/track-b.m4a.asset.json";


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
          "An interactive Boyfriend's Day experience — report card, memory vault, badges, would-you-rather and a cinematic final reveal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAME = "Vaibavvv";
const FUNNY_SKILL = "ragebaiting ToT";
const FUNNY_WEAKNESS = "my eyes and lips :P";

const letterPolaroids: { src: string; alt: string; title: string; note: string; contain?: boolean }[] = [
  { src: nithinAsset.url, alt: "ur fav pookie", title: "ur fav pookie ", note: "the guy who literally blushes around u, loves u alot" },
  { src: boysAsset.url, alt: "ur boys", title: "ur boys", note: "they might irritate u sometimes but at the end they will also make u laugh with their stupid jokes" },
  { src: memoryRoadtrip, alt: "[PHOTO 3]", title: "ur gng", note: "who hv always been there with for many years" },
  { src: sisAsset.url, alt: "ur sis", title: "ur sis", note: "might kick u but let me tell u smth...she would never want to lose u and there is love even in her anger", contain: true },
  { src: familyAsset.url, alt: "ur family", title: "ur family", note: "who will be always there to support u and get u out of any trouble", contain: true },
  { src: tomatoAsset.url, alt: "ur tomato", title: "ur tomato", note: "i'll always be there to give u headache bishhh :p " },
];


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
    src: canteenAsset.url,
    alt: "The school canteen where our story began",
    title: "CANTEEN",
    date: "The day it started",
    caption:
      "a small tiny place usually filled with students, never knew this would be the beginning of our story :D.. The girl who prioritized her snacks more than anyone actually skipped her snacks some days to only talk few more mins with her crush and it was WORTH IT!!",
    story:
      '( ig god did smile while looking down saying " finally these idiots met ")',
  },
  {
    src: rainAsset.url,
    alt: "The two of us under one umbrella in the rain",
     title: "Rain, us and the umbrella",
     date: "THE RAINY DAY WE WOULD ALWAYS BE REMINDED OF",
     caption:
       "the day where every droplet saw us nervous together under the umbrella. The tiny lil gap inbetween us, getting nervous whenever we looked at each others face and lets not forget our first hug :D",
     story:
       "( js like tht day if i hv to spend my entire lifetime holding tht umbrella with u beside me, I'll happily do it even if my arms are sore )",
  },
  {
    src: sleepAsset.url,
    alt: "Our late night chat about who should sleep first",
    title: "\"sleep bhakti -_-\"   \"nopee :P\"",
    date: "THOSE LATE NIGHT CONVOS",
    caption: "where none of us were ready to sleep even tho we both were tired. js us talking for hours in the silent night and having a small smile on our faces",
    story:
      "( to actually think of, I've never stayed up late at night just to chat with someone but as they say love makes u do crazy things. chatting with someone till 1 is crazy for me btw ToT)",
  },
  {
    src: blehAsset.url,
    alt: "Our first ever selfie together",
     title: "our first ever selfie together",
     date: "BLEHHHH :P",
     caption:
       "both of us sweating in that climate and me pulling u towards every dog i see ToT... witnessing u lose every game we played that day and having fun the entire time with u.",
     story:
       "( ik after that hangout some things didn't go well, but hey its not your fault in fact its no ones so prettyyyy pleaseee don't hate yourself vaibav and don't be so hard on yourself )",
  },
  {
    src: flowerAsset.url,
    alt: "Flowers tucked into his curly hair",
    title: "my vaibav can never say \"no\" to my ideas ",
    date: "MY FAV MODEL",
    caption: "even tho you were shy to do it as we were in a park, you still did it for me :D i loveeee youuu sooo muchhhh.. You will always be my no.1 fav model...in future i want to take manyyy candid pics of u until my storage begs me to stop.",
    story:
      "(its was our longest hangout yet felt the shortest?)",
  },
  {
    src: pookieAsset.url,
    alt: "My favourite selfie of the two of us at the park",
    title: "my fav pic of us",
    date: "MY POOKIE",
    caption:
      "now ik that my vaibav will always smile like a cute lil pookie whenever taking selfie with me ToT...having my entire trust on you while ur driving and not having to fear about anything with u (except for evangelin's mom) ",
    story:
      "(every hangout is different yet in every hangout one feeling is always the same...my comfort. I've always felt at peace and comfortable with u vaibav)",
  },
];

const badges = [
  { icon: "🏆", name: "Professional ragebaiter", note: "Undefeated. always succeed in rage baiting me . Beloved." },
  { icon: "⭐", name: "Certified Good Human", note: "Verified by everyone who has met you and been with you." },
  { icon: "🎮", name: "my personal senpai", note: "would laugh at me first but eventually teach me" },
  { icon: "😳", name: "CEO of Making Me blush", note: "a single text, flirty line or just a pic of u is enough to make me blush af" },
  { icon: "🛡️", name: "Always Got My Back", note: "whatever the situation, my darling will always be there for me...will scold for my clumsiness but even in that scolding love and care is present.  " },
  { icon: "💯", name: "10/10 Human", note: "The world's best human badge goes to my baby. Would recommend. Will NOT share." },
];

type Rather = { q: string; options: { label: string; reply: string }[] };

const rathers: Rather[] = [
  {
    q: "Would you rather…",
    options: [
      { label: "spend two hrs with me every day", reply: "i get to see my baby every dayy🥹." },
      { label: "spend a whole week with me once a month", reply: "ooo.. looks like we are going on many dates then😝 " },
      { label: "spend a whole day with me once a week", reply: "a whole day? WE ARE EXPLORING EVERY PLACE WHILE RIDING UR SCOOTY!!." },
    ],
  },
  {
    q: "Would you rather…",
    options: [
      { label: "wear matching outfits", reply: "lets show everyone WE ARE A COUPLE!!!." },
      { label: "wear matching accessories", reply: "let me guess..i hv to help u with ur chain every time ryt?😭." },
      { label: "hv matching wallpaper on our phone screen", reply: "then is it gonna be a pic of us kissing or?" },
    ],
  },
  {
    q: "Would you rather…",
    options: [
      { label: "take 100 candid pics of me", reply: "storage full, heart fuller." },
      { label: "let me take 100 candid pics of you", reply: "MY FAV MODEL. no doubt." },
      { label: "one perfect selfie together", reply: "already have it. still my fav pic of us." },
    ],
  },
  {
    q: "Would you rather…",
    options: [
      { label: "hug me for 10 minutes straight", reply: "the first hug under that umbrella says hi." },
      { label: "hold my hand the whole hangout", reply: "shy in the park but you'd still do it :D" },
      { label: "lie on my shoulder in silence", reply: "the calmest thing in my life honestly." },
    ],
  },
  {
    q: "Would you rather…",
    options: [
      { label: "relive our first hangout", reply: "the day i confessed was our first ever hangout btww." },
      { label: "get a brand new memory tomorrow", reply: "so u will forget us?😭." },
      { label: "do absolutely nothing together", reply: "my comfort home. always u vaibav." },
    ],
  },
];

const compliments = [
  "you are the first person tht comes to my minds whenever smth happens in my life..js like how kids share their pain or excitement to their parents or friends, i also feel the same with u",
  "everyone does mistakes but the ones tht reflect on it are diamonds. i found my own diamond in this world",
  "if home was a person, for me it would always be u vaibav. my comfort home, my everything",
  "i want u to achieve all of ur dreams and always be the happiest person",
  "i could stay beside u, lie my head on ur shoulders for hours and still not be bored",
  "even after many months or years, with or without the spark, i will always choose you vaibav.",
  "thank you sooo muchh for being with me during my ups and downs. for handling all of my mood swings without complaining. i loveee youu alotttt vaibavv",
];

function Index() {
  const [tipsSeen, setTipsSeen] = useState(false);
  const [started, setStarted] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const replay = () => {
    setStarted(false);
    setTipsSeen(false);
    setRunKey((k) => k + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div key={runKey} className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Particles />
      {tipsSeen && <MusicToggle />}
      {!tipsSeen ? (
        <ProTips onContinue={() => setTipsSeen(true)} />
      ) : !started ? (
        <Landing onStart={() => setStarted(true)} />
      ) : (
        <main className="relative z-10">
          <Report />
          <RecordPlayer />
          <Vault />
          <Badges />
          <Game />
          <ThroughMyEyes />
          <Wall />
          <Finale onReplay={replay} />
        </main>
      )}
    </div>
  );
}

function ProTips({ onContinue }: { onContinue: () => void }) {
  const tips = [
    {
      icon: "💻",
      title: "open this on a laptop or PC",
      body: "the whole thing is built wide and cinematic — on a phone you'll miss half the magic.",
    },
    {
      icon: "🎧",
      title: "plug in headphones or earphones",
      body: "\n",
    },
    {
      icon: "🕯️",
      title: "give it a few quiet minutes",
      body: "no rush, no skipping. scroll slow, click everything, read every line and feel all the emotions",
    },
  ];

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
      <div className="rise w-full max-w-2xl rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-8 shadow-2xl backdrop-blur-xl sm:p-12">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">VAIBAV...BEFORE YOU BEGIN</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Three tiny pro tips
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          just so this feels exactly the way i wanted it to feel for you.
        </p>

        <ul className="mt-8 space-y-4">
          {tips.map((t, i) => (
            <li
              key={t.title}
              className="pop flex gap-4 rounded-2xl border border-foreground/10 bg-background/30 p-4 sm:p-5"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <span aria-hidden className="text-2xl leading-none">
                {t.icon}
              </span>
              <div>
                <p className="font-display text-lg text-foreground">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={onContinue}
          className="wiggle mt-9 w-full rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-xl transition-transform hover:scale-[1.02] sm:w-auto"
        >
          okay, i'm excitedd!!! →
        </button>
      </div>
    </section>
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
        ATTENTION!!
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
    ["Position", "MY Boyfriend"],
    ["Department", "Making my Life Better :D"],
    ["Status", "ACTIVE"],
    ["Special Skill", FUNNY_SKILL],
    ["Biggest Weakness", FUNNY_WEAKNESS],
  ];
  const bars = [
    ["Overall performance", 100],
    ["Hug quality", 100],
    ["Reply speed", 80],
    ["Snack sharing", 70],
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
              <dd className="text-right text-sm font-medium">
                {v}
              </dd>
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

/* ---------------- 2.5 record player ---------------- */

const tracks: { title: string; note: string; src: string }[] = [
  { title: "Shinunoga-ewa", note: "the one that always plays in my head whenever i think abt u", src: trackA.url },
  { title: "Until i found u", note: "js like this song i'll never fall in love until i find u in every universe vaibav", src: trackB.url },
];


function RecordPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const play = (i: number) => {
    const a = audioRef.current;
    if (!a) return;
    if (i !== current) {
      setCurrent(i);
      a.src = tracks[i]!.src;
    }
    void a.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      play(current);
    }
  };

  const skip = () => play((current + 1) % tracks.length);

  return (
    <Section id="record" eyebrow="File 01.5" title="set the mood?">
      <p className="-mt-6 mb-8 max-w-lg text-sm text-muted-foreground">
        Every archive needs a soundtrack. Spin the record and let the music play in the background.
      </p>

      <div className={`${glass} flex flex-col items-center gap-10 p-8 sm:flex-row sm:items-center sm:p-10`}>
        <audio
          ref={audioRef}
          src={tracks[0]!.src}
          preload="none"
          onEnded={skip}
        />

        <div className="relative shrink-0">
          <div
            className="relative h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,#181820_0%,#0b0b10_38%,#15151c_39%,#0a0a0e_100%)] shadow-[0_30px_70px_-30px_rgba(0,0,0,1)]"
            style={{
              animation: playing ? "spin-slow 4.5s linear infinite" : undefined,
            }}
          >
            {[0.9, 0.76, 0.62].map((r) => (
              <span
                key={r}
                className="absolute rounded-full border border-white/[0.07]"
                style={{
                  inset: `${((1 - r) / 2) * 100}%`,
                }}
              />
            ))}
            <span className="absolute inset-[32%] rounded-full bg-accent/85 shadow-[0_0_40px_-6px_hsl(var(--accent)/0.6)]" />
            <span className="absolute inset-[47%] rounded-full bg-background" />
          </div>
          <div
            className="pointer-events-none absolute -right-4 top-2 h-28 w-1.5 origin-top rounded-full bg-white/25 transition-transform duration-700"
            style={{ transform: `rotate(${playing ? 24 : 6}deg)` }}
          />
        </div>

        <div className="w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Now {playing ? "playing" : "paused"}
          </p>
          <h3 className="mt-2 font-display text-3xl">{tracks[current]!.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{tracks[current]!.note}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <GlowButton onClick={toggle}>{playing ? "Pause ❚❚" : "Play ▶"}</GlowButton>
            <button
              onClick={skip}
              className="rounded-full border border-white/12 px-5 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
            >
              Next track ⏭
            </button>
          </div>

          <div className="mt-7 grid gap-2">
            {tracks.map((t, i) => (
              <button
                key={t.src}
                onClick={() => play(i)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  i === current
                    ? "border-accent/50 bg-accent/10"
                    : "border-white/8 hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <span>{t.title}</span>
                <span className="text-xs text-muted-foreground">
                  {i === current && playing ? "playing" : "play"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
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
  const [done, setDone] = useState(false);

  const q = rathers[i]!;

  const pick = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
  };

  const next = () => {
    if (i + 1 >= rathers.length) {
      setDone(true);
      return;
    }
    setI(i + 1);
    setPicked(null);
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setDone(false);
  };

  return (
    <Section id="game" eyebrow="File 04" title="Would You Rather?">
      <div className={`${glass} p-6 sm:p-10`}>
        {!done ? (
          <div key={i} className="rise">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>
                Round {i + 1} / {rathers.length}
              </span>
              <span className="text-accent">no wrong answers</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${((i + (picked !== null ? 1 : 0)) / rathers.length) * 100}%` }}
              />
            </div>

            <h3 className="mt-7 font-display text-xl sm:text-2xl">{q.q}</h3>
            <div className="mt-6 grid gap-3">
              {q.options.map((o, n) => {
                const state =
                  picked === null
                    ? "border-white/10 hover:border-accent/50 hover:bg-white/[0.06]"
                    : n === picked
                      ? "border-accent/60 bg-accent/12"
                      : "border-white/8 opacity-50";
                return (
                  <button
                    key={o.label}
                    onClick={() => pick(n)}
                    className={`rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-300 ${state}`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="pop mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className="font-display text-lg text-accent">{q.options[picked]!.reply}</p>
                <GlowButton onClick={next}>
                  {i + 1 >= rathers.length ? "See my verdict →" : "Next one →"}
                </GlowButton>
              </div>
            )}
          </div>
        ) : (
          <div className="pop text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Verdict</p>
            <p className="mt-3 font-display text-4xl text-accent sm:text-5xl">whatever you picked, i'd pick you</p>
            <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
              every option had you in it, so honestly i was winning either way.
            </p>
            <div className="mt-8 flex justify-center">
              <GlowButton onClick={restart}>Play again ↻</GlowButton>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------------- 5.5 through my eyes ---------------- */

const eyeLines: { label: string; line: string }[] = [
  {
    label: "when you laugh",
    line: "your whole face gives in to it, and i forget whatever i was worried about.",
  },
  {
    label: "when you're quiet",
    line: "you're not distant, you're thinking. and i love that i can just sit inside that silence with u.",
  },
  {
    label: "when you're driving",
    line: "one hand on the wheel, calm like nothing can go wrong. that's the safest i ever feel.",
  },
  {
    label: "when you talk about ur dreams",
    line: "ur eyes go somewhere far away and i want to follow u there.",
  },
  {
    label: "when you look at me",
    line: "i understand every love song that ever confused me before u.",
  },
  {
    label: "always",
    line: "u are not one of my favourite people, vaibav. u are THE person.",
  },
];

function ThroughMyEyes() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="eyes" eyebrow="File 04.5" title="lets see through my eyes?">
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
        u see yourself one way. this is how u look from where i'm standing — tap each one.
      </p>
      <div className="mt-8 grid gap-3">
        {eyeLines.map((e, i) => {
          const isOpen = open === i;
          return (
            <button
              key={e.label}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`${glass} w-full p-5 text-left transition-all duration-500 ${
                isOpen ? "border-accent/50" : "hover:border-accent/30"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-lg">{e.label}</span>
                <span className={`text-accent transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                  ✦
                </span>
              </div>
              <div
                className="grid overflow-hidden transition-all duration-500"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <p className="min-h-0 text-sm leading-relaxed text-foreground/85">
                  <span className="block pt-3">{e.line}</span>
                </p>
              </div>
            </button>
          );
        })}
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
    <Section id="wall" eyebrow="File 05" title="things u prob don't hear enough">
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
      <div className="mt-8 flex items-center gap-3">
        <GlowButton onClick={reveal}>{exhausted ? "That's some of it out of many" : "Tell Me Something…"}</GlowButton>
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
          <div className="pop mt-10 w-full">
            <p className={`${glass} mx-auto max-w-xl p-8 font-display text-xl leading-relaxed sm:text-2xl`}>
              out of everyone, I'm glad that ur my boyfriend and will always want u as my partner in my every universe. 
            </p>

            <div className={`${glass} mx-auto mt-12 max-w-4xl p-6 text-left sm:p-10`}>
              <p className="text-[0.7rem] uppercase tracking-[0.45em] text-accent">One last letter</p>
              <h3 className="mt-4 font-display text-3xl sm:text-4xl">My dearest {NAME},</h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                in all of my letters that u have read till now i always talk abt how much i love u and how much u mean to me but this time i wanted to do something different. Vaibav not only are u the best boyfriend to me but ur also a great person who is loved by everyone. A great friend to his pookies and other friends, a great son to his parents, a great brother to his sister and last but not the least a great human being. All of us love u alot darling and we care soo muchh for u. Maybe u think that ur pookies don't but trust me, each and every single person around u loves u and u mean a lot to each of us. Maybe they dont show it enough but during ur hard times they will always show up for u. You would hv gotten distant with some of ur friends but that doesn't mean they stopped caring abt u. All of us will always support u no matter wht and we want the best for u 💕
              </p>

              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {letterPolaroids.map((p, i) => (
                  <figure
                    key={i}
                    className="group rounded-2xl bg-foreground/[0.06] p-3 shadow-xl ring-1 ring-foreground/10 transition-transform duration-500 hover:-translate-y-1"
                    style={{ transform: `rotate(${i % 2 === 0 ? -1.6 : 1.6}deg)` }}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      className={`aspect-[4/3] w-full rounded-xl ${p.contain ? "bg-foreground/[0.04] object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.03]`}
                    />
                    <figcaption className="px-2 pb-1 pt-4">
                      <p className="font-display text-lg">{p.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <p className="mt-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Ur parents, ur sis, nithin, ashwin, merien, all of ur frnds, ur teachers will be there for u and ofcc lets not forget ur buritto :D.... when the whole world is against u, I'll be always there with my arms opened widely for u. The times u js want to hug someone , I'll always comfort u while running my fingers thru ur hair. During ur ups and down, I'll be beside u my love ❤️❤️
              </p>
              <p className="mt-6 font-display text-xl text-accent">Always yours, Bhakti</p>
            </div>

            <ThreeWishes />

            <div className="mt-4">
              <GlowButton onClick={onReplay}>REPLAY THE WHOLE THING ↻</GlowButton>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
