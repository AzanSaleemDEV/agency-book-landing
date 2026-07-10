"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FunnelX, BadgeDollarSign, RefreshCcw, type LucideIcon } from "lucide-react";

// ─── constants ───────────────────────────────────────────────────────────────
const GOLD  = "#C9A84C";
const NAVY  = "#000025";
const BG    = "#F8F7F4";

const STATEMENT =
  "The agencies that break seven figures aren't run by harder workers. They're run by better architects.";

// ─── card data ───────────────────────────────────────────────────────────────
const cards: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FunnelX,
    title: "Revenue That Vanishes Between Projects",
    body: "You land a strong month, then spend the next one scrambling to replace it. Without a repeatable client acquisition system, you're not running an agency — you're chasing one.",
  },
  {
    icon: BadgeDollarSign,
    title: "Premium Work. Budget-Level Rates.",
    body: "You're delivering results other agencies charge five figures for. But until your positioning matches your ability, you'll keep losing deals to cheaper competitors who look more 'established'.",
  },
  {
    icon: RefreshCcw,
    title: "You're the CEO, Delivery Team, and Sales Dept",
    body: "Every client escalation, every proposal, every fire routes through one person: you. That's not an agency — that's a very stressful freelance job with extra overhead.",
  },
];

// ─── typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, triggered: boolean, speed = 32) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!triggered) return;
    indexRef.current = 0;
    setDisplayed("");

    const id = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [triggered, text, speed]);

  return displayed;
}

// ─── component ───────────────────────────────────────────────────────────────
export function PainSection() {
  // scroll triggers
  const { ref: headRef,  inView: headInView  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: cardsRef, inView: cardsInView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { ref: stmtRef,  inView: stmtInView  } = useInView({ triggerOnce: true, threshold: 0.6 });

  const typed = useTypewriter(STATEMENT, stmtInView, 32);

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* Header stagger */
        @keyframes ps-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ps-head-item {
          opacity: 0;
        }
        .ps-head-item.ps-visible {
          animation: ps-fade-up 0.65s ease-out both;
        }
        .ps-head-d1.ps-visible { animation-delay: 0.05s; }
        .ps-head-d2.ps-visible { animation-delay: 0.20s; }
        .ps-head-d3.ps-visible { animation-delay: 0.35s; }

        /* Card stagger */
        .ps-card {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s ease-out, transform 0.55s ease-out;
          position: relative;
          background: #fff;
          border-left: 3px solid ${GOLD};
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 16px rgba(0,0,37,0.06), 0 1px 4px rgba(0,0,37,0.04);
          overflow: hidden;
        }
        .ps-card.ps-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ps-card:nth-child(1) { transition-delay: 0s; }
        .ps-card:nth-child(2) { transition-delay: 0.12s; }
        .ps-card:nth-child(3) { transition-delay: 0.24s; }

        /* Gold border shimmer on hover */
        .ps-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            ${GOLD} 0%,
            #fff8dd 45%,
            ${GOLD} 55%,
            ${GOLD} 100%
          );
          background-size: 100% 300%;
          background-position: 0 100%;
          transition: background-position 0.55s ease;
        }
        .ps-card:hover::before {
          background-position: 0 -100%;
        }

        /* Divider line reveal */
        @keyframes ps-line-in {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .ps-divider {
          height: 1px;
          background: ${GOLD};
          transform-origin: left center;
          transform: scaleX(0);
          transition: none;
        }
        .ps-divider.ps-visible {
          animation: ps-line-in 0.6s ease-out 0.1s both;
        }

        /* Cursor blink */
        @keyframes ps-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .ps-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: ${GOLD};
          vertical-align: text-bottom;
          margin-left: 2px;
          animation: ps-blink 0.85s step-end infinite;
        }
      `}</style>

      <section
        style={{ backgroundColor: BG }}
        className="overflow-hidden pb-0 pt-24 sm:pt-28"
        aria-label="Pain points"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto max-w-2xl text-center">

            {/* Eyebrow */}
            <p
              className={`ps-head-item ps-head-d1 text-[11px] font-black tracking-[0.22em] uppercase mb-4 ${headInView ? "ps-visible" : ""}`}
              style={{ color: GOLD }}
            >
              Stop Us If This Sounds Familiar
            </p>

            {/* Headline */}
            <h2
              className={`ps-head-item ps-head-d2 f-h2 font-bold tracking-tight mb-5 ${headInView ? "ps-visible" : ""}`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              Every Agency Stalls for the Same Three Reasons.
            </h2>

            {/* Subheadline */}
            <p
              className={`ps-head-item ps-head-d3 text-[17px] leading-relaxed ${headInView ? "ps-visible" : ""}`}
              style={{ color: "#6B6B80" }}
            >
              It's rarely talent. It's rarely effort. It's almost always the wrong systems, the wrong pricing, and positioning that pulls in the wrong clients.
            </p>
          </div>

          {/* ── Cards ──────────────────────────────────────────────────── */}
          <div
            ref={cardsRef}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className={`ps-card ${cardsInView ? "ps-visible" : ""}`}
              >
                {/* Gold icon circle */}
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${GOLD}22` }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: GOLD }}
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-[18px] font-bold leading-snug"
                  style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
                >
                  {title}
                </h3>

                {/* Body */}
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: "#6B6B80" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* ── Divider + Statement ────────────────────────────────────── */}
          <div ref={stmtRef} className="mt-20">
            {/* Divider line */}
            <div
              className={`ps-divider mb-10 ${stmtInView ? "ps-visible" : ""}`}
              aria-hidden="true"
            />

            {/* Typewriter statement */}
            <p
              className="text-center text-[22px] font-bold leading-snug sm:text-3xl"
              style={{ color: NAVY, fontFamily: "var(--font-playfair)", minHeight: "2.5em" }}
              aria-label={STATEMENT}
            >
              {typed}
              {typed.length < STATEMENT.length && (
                <span className="ps-cursor" aria-hidden="true" />
              )}
            </p>
          </div>

        </div>

        {/* ── Diagonal bridge into AuthorSection (navy) ─────────── */}
        <div className="mt-20 w-full overflow-hidden leading-[0]" aria-hidden="true">
          <svg
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
          >
            <polygon points="0,56 1440,0 1440,56" fill={NAVY} />
          </svg>
        </div>

      </section>
    </>
  );
}
