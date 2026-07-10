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
    body:  "The recruitment, vetting, and onboarding process for building a team that extends your output — not one that creates another management job you didn't sign up for.",
  },
  {
    icon:  Zap,
    title: "Automating the Work That Drains You",
    body:  "Identify the repetitive, low-leverage tasks eating your team's hours and replace them with documented systems and smart automation — so your people focus on client results.",
  },
  {
    icon:  Coins,
    title: "Adding Revenue Without Adding Clients",
    body:  "The strategies for building upsell pathways, retainer structures, and recurring revenue streams that grow your income from the client base you already have.",
  },
  {
    icon:  Star,
    title: "Client Retention as a Growth Strategy",
    body:  "Keeping a client is ten times cheaper than finding a new one. This section shows you the exact satisfaction and communication systems that eliminate churn and generate referrals on autopilot.",
  },
  {
    icon:  ListChecks,
    title: "Building SOPs That Don't Live in Your Head",
    body:  "If it only works when you're watching — it's not a system. Learn how to document, delegate, and quality-control your delivery so output stays consistent as the team grows.",
  },
  {
    icon:  Target,
    title: "Growing Past Seven Figures Without Breaking",
    body:  "The leadership mindset shifts, OKR frameworks, and decision-making structures that let you operate as a CEO — not the person who has to fix everything that goes wrong.",
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
         * Two-layer card approach:
         *   .sc-wrap  → entrance (opacity + translateY with stagger delay)
         *   .sc-card  → hover (no delay, instant response)
         */
        .sc-wrap {
          opacity: 0;
          transform: translateY(28px);
        }
        .sc-wrap.sc-in {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity   0.55s ease-out var(--d, 0s),
            transform 0.55s ease-out var(--d, 0s);
        }

        .sc-card {
          background:    ${CARD};
          border-top:    3px solid ${GOLD};
          border-radius: 14px;
          padding:       1.75rem;
          height:        100%;
          transition:
            transform        0.22s ease,
            box-shadow       0.22s ease,
            border-top-color 0.22s ease;
        }
        .sc-card:hover {
          transform:       translateY(-5px);
          border-top-color: #E0C060;
          box-shadow:
            0 24px 52px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(201,168,76,0.18);
        }

        /* ── icon circle glow on hover ── */
        .sc-icon-wrap {
          transition: background-color 0.22s ease;
        }
        .sc-card:hover .sc-icon-wrap {
          background-color: rgba(201,168,76,0.22);
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
              At £10K/month, hustle built the business. Past £50K, only systems grow it. This section is the operator's manual for crossing that line — with your margins, your team, and your sanity intact.
            </p>
          </div>

          {/* ── 2 × 3 card grid ─────────────────────────────────────── */}
          <div
            ref={cardsRef}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className={`sc-wrap ${cardsIn ? "sc-in" : ""}`}
                style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="sc-card">
                  {/* Icon */}
                  <div
                    className="sc-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(201,168,76,0.14)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: GOLD }}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2.5 text-[17px] font-bold leading-snug"
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
