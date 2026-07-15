"use client";

import { useInView } from "react-intersection-observer";
import {
  Users2, Zap, Coins, Star, ListChecks, Target,
  type LucideIcon,
} from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD  = "#C9A84C";
const NAVY  = "#000D30";
const CARD  = "#001A4D";

// ─── card data ────────────────────────────────────────────────────────────────
const cards: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon:  Users2,
    title: "Hiring People Who Actually Deliver",
    body:  "How to recruit, vet, and onboard people who extend what you can do, not people who just give you another thing to manage.",
  },
  {
    icon:  Zap,
    title: "Automating the Work That Drains You",
    body:  "Find the repetitive tasks eating your team's time and replace them with clean systems and smart tools. Your people should be focused on client work, not admin.",
  },
  {
    icon:  Coins,
    title: "Adding Revenue Without Adding Clients",
    body:  "Upsell pathways, retainer structures, and recurring revenue streams that let you grow income from the clients you already have.",
  },
  {
    icon:  Star,
    title: "Client Retention as a Growth Strategy",
    body:  "Keeping a client costs far less than finding a new one. Learn the communication and delivery systems that cut churn and bring in referrals without asking for them.",
  },
  {
    icon:  ListChecks,
    title: "Building SOPs That Don't Live in Your Head",
    body:  "If it only works when you're in the room, it's not a system. Learn how to document and delegate so quality stays consistent as your team grows.",
  },
  {
    icon:  Target,
    title: "Growing Past Seven Figures Without Breaking",
    body:  "The mindset shifts and operating structures that let you step into a CEO role instead of being the person who fixes everything when it goes wrong.",
  },
];

// ─── component ────────────────────────────────────────────────────────────────
export function ScaleSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: cardsRef, inView: cardsIn } = useInView({ triggerOnce: true, threshold: 0.1  });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── background particle drift ── */
        @keyframes sc-dots-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 36px 36px; }
        }
        .sc-bg-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(
            circle,
            rgba(255,255,255,0.032) 1px,
            transparent 1px
          );
          background-size: 36px 36px;
          animation: sc-dots-drift 14s linear infinite;
        }

        /* ── header stagger ── */
        @keyframes sc-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sc-head-item { opacity: 0; }
        .sc-head-item.sc-in {
          animation: sc-fade-up 0.6s ease-out both;
        }
        .sc-hd1.sc-in { animation-delay: 0.05s; }
        .sc-hd2.sc-in { animation-delay: 0.18s; }
        .sc-hd3.sc-in { animation-delay: 0.30s; }

        /*
         * Vertical checklist/timeline layout — deliberately not a card
         * grid, to break up the run of boxed grids in the sections
         * around it (Start, Framework, Lead).
         */
        .sc-wrap {
          opacity: 0;
          transform: translateY(24px);
        }
        .sc-wrap.sc-in {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity   0.5s ease-out var(--d, 0s),
            transform 0.5s ease-out var(--d, 0s);
        }

        .sc-vline {
          background: linear-gradient(to bottom, rgba(201,168,76,0.35), rgba(201,168,76,0.08));
        }

        .sc-icon-wrap {
          background:    ${CARD};
          border:        2px solid rgba(201,168,76,0.35);
          transition:    border-color 0.22s ease, transform 0.22s ease, background 0.22s ease;
        }
        .sc-item:hover .sc-icon-wrap {
          border-color: ${GOLD};
          background:   rgba(201,168,76,0.14);
          transform:    scale(1.06);
        }

        /* ── CTA ── */
        .sc-cta { opacity: 0; }
        .sc-cta.sc-in {
          animation: sc-fade-up 0.55s ease-out 0.75s both;
        }
      `}</style>

      <section
        style={{ backgroundColor: NAVY }}
        className="relative overflow-hidden f-section"
        aria-label="Phase Three — Scale"
      >
        {/* Animated dot particle background */}
        <div className="sc-bg-dots" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">

            {/* Badge pill */}
            <div className={`sc-head-item sc-hd1 ${headIn ? "sc-in" : ""} mb-6`}>
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[11px] font-black tracking-[0.18em] uppercase"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                📈&nbsp; Phase Three: Scale
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`sc-head-item sc-hd2 ${headIn ? "sc-in" : ""} mb-5 f-h2 font-bold tracking-tight`}
              style={{ color: "#FFFFFF", fontFamily: "var(--font-playfair)" }}
            >
              What Got You Here Will Stall You Here.
            </h2>

            {/* Subheadline */}
            <p
              className={`sc-head-item sc-hd3 ${headIn ? "sc-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              At $10K/month, hustle built the business. Past $50K, only systems grow it. This section is the operator's manual for crossing that line, with your margins, your team, and your sanity intact.
            </p>
          </div>

          {/* ── Vertical checklist ──────────────────────────────────── */}
          <div ref={cardsRef} className="relative mx-auto max-w-3xl">
            <div
              className="sc-vline absolute top-2 bottom-2 hidden w-px sm:block"
              style={{ left: "27px" }}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-10">
              {cards.map(({ icon: Icon, title, body }, i) => (
                <div
                  key={title}
                  className={`sc-wrap ${cardsIn ? "sc-in" : ""} sc-item flex items-start gap-5 sm:gap-6`}
                  style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
                >
                  {/* Icon */}
                  <div
                    className="sc-icon-wrap relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: GOLD }}
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="pt-2">
                    {/* Title */}
                    <h3
                      className="mb-2 text-[17px] font-bold leading-snug"
                      style={{ color: "#FFFFFF" }}
                    >
                      {title}
                    </h3>

                    {/* Body */}
                    <p
                      className="text-[14px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <div
            className={`sc-cta ${cardsIn ? "sc-in" : ""} mt-14 flex justify-center`}
          >
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl px-9 py-4 text-[15px] font-black tracking-wide shadow-lg transition-opacity hover:opacity-90"
              style={{
                backgroundColor: GOLD,
                color:           NAVY,
                boxShadow:       `0 8px 24px rgba(201,168,76,0.3)`,
              }}
            >
              Get the Scale Framework — $9.99
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
