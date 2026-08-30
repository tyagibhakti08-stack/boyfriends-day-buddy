import { createFileRoute } from "@tanstack/react-router";

import heroPolaroid from "@/assets/hero-polaroid.jpg";
import memoryCoffee from "@/assets/memory-coffee.jpg";
import memoryRoadtrip from "@/assets/memory-roadtrip.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Boyfriend's Day, Marco — A Little Museum" },
      {
        name: "description",
        content:
          "A handmade keepsake for Boyfriend's Day: polaroids, reasons I love you, a timeline of us, and one very long letter.",
      },
      { property: "og:title", content: "Happy Boyfriend's Day, Marco" },
      {
        property: "og:description",
        content:
          "A scrapbook of polaroids, reasons, memories and a letter — made by hand for Boyfriend's Day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const reasons = [
  {
    n: "01",
    title: "How you make pasta from scratch",
    body: "Flour everywhere, radio off-key, and a kitchen that finally feels like ours.",
    tilt: "rotate-[-1.5deg]",
  },
  {
    n: "02",
    title: "You talk to strangers\u2019 dogs",
    body: "With real names and real affection. Somewhere in there is my hero.",
    tilt: "rotate-[1.5deg]",
  },
  {
    n: "03",
    title: "3am texts that are just \u201cyou up?\u201d",
    body: "Always. And then the little stories you couldn\u2019t sleep without telling me.",
    tilt: "rotate-[-1deg]",
  },
];

function Index() {
  return (
    <div className="min-h-screen overflow-hidden bg-paper font-body text-ink">
      <div className="relative">
        <div className="riso-dots absolute inset-0" aria-hidden="true" />
        <div
          className="floaty pointer-events-none absolute right-16 top-24 select-none text-3xl text-riso2/50"
          aria-hidden="true"
        >
          &#9829;
        </div>
        <div
          className="floaty pointer-events-none absolute left-10 top-[340px] select-none text-2xl text-riso/40"
          style={{ animationDelay: "1.6s" }}
          aria-hidden="true"
        >
          &#9829;
        </div>
        <div
          className="floaty pointer-events-none absolute right-24 top-[540px] select-none text-base text-sage/40"
          style={{ animationDelay: "3s" }}
          aria-hidden="true"
        >
          &#9825;
        </div>

        <header className="relative mx-auto flex max-w-5xl items-center justify-between px-6 pt-12">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-riso font-hand text-lg text-paper">
              v
            </span>
            <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-ink/70">
              FOR MY PRINCE CHARMING
            </span>
          </div>
          <span className="rotate-[-3deg] font-hand text-lg text-riso">a keepsake, not a card</span>
        </header>

        <section className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 pb-14 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-5 font-body text-xs uppercase tracking-[0.35em] text-sage">
              OCTOBER 3 &middot; BOYFRIEND&rsquo;S DAY
            </p>
            <h1
              className="text-balance font-display text-[3.25rem] font-medium leading-[0.95] text-ink lg:text-[4.5rem]"
              style={{ maxWidth: "15ch" }}
            >
              my love, Vaibav. <span className="italic text-riso">I made you</span> a little museum.
            </h1>
            <p className="mt-6 max-w-[42ch] text-pretty font-body text-base text-ink/75">
              Tucked into a shoebox of polaroids, half a zine, and one very long letter. Scroll slow
              &mdash; it&rsquo;s all for you.
            </p>
            <div className="mt-8 inline-flex items-center gap-3">
              <a
                href="#letter"
                className="rounded-[min(1vw,12px)] bg-ink px-4 py-2 text-sm font-medium text-paper"
              >
                Open the box
              </a>
              <span className="rotate-[2deg] font-hand text-lg text-ink/60">
                pssst, it&rsquo;s below
              </span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -inset-3 rotate-[4deg] rounded-[min(1vw,16px)] bg-riso2/30"
                aria-hidden="true"
              />
              <div className="relative rotate-[-2deg] rounded-[min(1vw,14px)] bg-paper2 p-3 pb-10 ring-1 ring-black/5">
                <img
                  src={heroPolaroid}
                  alt="The two of us laughing on a summer street"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full rounded-[min(1vw,12px)] object-cover outline-1 -outline-offset-1 outline-black/5"
                />
                <p className="mt-3 text-center font-hand text-xl text-ink/70">
                  you, grinning like an idiot. my favorite.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-balance font-display text-3xl font-medium">Reasons I love you</h2>
            <span className="rotate-[2deg] font-hand text-lg text-riso">okay, a lot of them</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.n}
                className={`rounded-[min(1vw,14px)] bg-paper2 p-5 ring-1 ring-black/5 transition-transform duration-300 hover:rotate-0 ${r.tilt}`}
              >
                <span className="font-hand text-2xl text-riso">{r.n}</span>
                <h3 className="mt-1 text-balance font-display text-lg font-medium">{r.title}</h3>
                <p className="mt-2 text-pretty font-body text-sm text-ink/70">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-balance font-display text-3xl font-medium">The timeline</h2>
            <span className="rotate-[-2deg] font-hand text-lg text-sage">
              a few of the ones I keep
            </span>
          </div>
          <div className="space-y-10">
            <div className="grid items-start gap-6 sm:grid-cols-[160px_1fr]">
              <div className="rotate-[-2deg] rounded-[min(1vw,12px)] bg-paper2 p-2 pb-6 ring-1 ring-black/5">
                <img
                  src={memoryCoffee}
                  alt="Two coffees on a rainy cafe table"
                  loading="lazy"
                  width={512}
                  height={512}
                  className="aspect-square w-full rounded-[min(1vw,10px)] object-cover outline-1 -outline-offset-1 outline-black/5"
                />
              </div>
              <div className="pt-2">
                <span className="font-body text-xs uppercase tracking-[0.3em] text-riso">
                  2021 &middot; first coffee
                </span>
                <p className="mt-3 text-balance font-display text-xl font-medium">
                  The one I was too nervous to order a second.
                </p>
                <p className="mt-2 max-w-[42ch] text-pretty font-body text-sm text-ink/70">
                  You spilled half of yours and laughed so hard the barista joined in. I knew then.
                </p>
              </div>
            </div>
            <div className="grid items-start gap-6 sm:grid-cols-[1fr_160px]">
              <div className="order-2 pt-2 sm:order-1">
                <span className="font-body text-xs uppercase tracking-[0.3em] text-riso">
                  2022 &middot; first road trip
                </span>
                <p className="mt-3 text-balance font-display text-xl font-medium">
                  Six hundred miles, one playlist, zero regrets.
                </p>
                <p className="mt-2 max-w-[42ch] text-pretty font-body text-sm text-ink/70">
                  You fell asleep at mile 400 with the window down. I took the photo from the
                  passenger seat.
                </p>
              </div>
              <div className="order-1 rotate-[2deg] rounded-[min(1vw,12px)] bg-paper2 p-2 pb-6 ring-1 ring-black/5 sm:order-2">
                <img
                  src={memoryRoadtrip}
                  alt="An open road seen from the car at dusk"
                  loading="lazy"
                  width={512}
                  height={512}
                  className="aspect-square w-full rounded-[min(1vw,10px)] object-cover outline-1 -outline-offset-1 outline-black/5"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="letter" className="relative mx-auto max-w-3xl px-6 pb-24">
          <div className="relative rotate-[-0.5deg] rounded-[min(1vw,16px)] bg-paper2 p-8 ring-1 ring-black/5 sm:p-12">
            <span className="absolute -top-3 left-10 rotate-[-4deg] font-hand text-2xl text-riso">
              to my favorite person,
            </span>
            <p className="text-pretty font-display text-2xl leading-[1.35] text-ink sm:text-[1.75rem]">
              I don&rsquo;t say it enough: thank you for the ordinary Tuesday nights, the bad jokes,
              the way you hold the door in your head even when you&rsquo;re not there. You&rsquo;re
              my favorite part of every single day, and I&rsquo;m saving this one just in case I
              forget some. &mdash; always, me
            </p>
          </div>
          <div className="mt-12 text-center">
            <span className="inline-block rotate-[-1deg] font-hand text-3xl text-ink">
              Happy Boyfriend&rsquo;s Day, Marco.
            </span>
            <p className="mt-4 font-body text-sm text-ink/60">
              Made by hand, for you. Keep it in the shoebox.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
