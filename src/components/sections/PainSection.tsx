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
    body: "You land a strong month, then spend the next one scrambling to replace it. Without a repeatable system for bringing in clients, you're just chasing work.",
  },
  {
    icon: BadgeDollarSign,
    title: "Premium Work. Budget-Level Rates.",
    body: "You're delivering results other agencies charge five figures for. But until your positioning matches your ability, you'll keep losing to cheaper competitors who just look more put-together.",
  },
  {
    icon: RefreshCcw,
    title: "You're the CEO, Delivery Team, and Sales Dept",
    body: "Every escalation, every proposal, every fire goes through one person: you. That's not an agency. That's a stressful freelance job with more overhead.",
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

        /*
         * Editorial "page" cards — deliberately not the rounded-card
         * plus colored-left-border plus icon-circle recipe (that combo
         * is one of the most overused AI-template card patterns there
         * is). Instead: sharp corners, a large ghost page numeral, and
         * a thin underline that draws in on hover.
         */
        .ps-card {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s ease-out, transform 0.55s ease-out;
          position: relative;
          background: #fff;
          border-radius: 3px;
          padding: 2.25rem 2rem 2rem;
          box-shadow: 0 1px 2px rgba(0,0,37,0.05), 0 1px 12px rgba(0,0,37,0.05);
          overflow: hidden;
        }
        .ps-card.ps-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ps-card:nth-child(1) { transition-delay: 0s;    }
        .ps-card:nth-child(2) { transition-delay: 0.12s; margin-top: 20px; }
        .ps-card:nth-child(3) { transition-delay: 0.24s; }

        /* Ghost page numeral — ties to "reasons 01/02/03" without a literal card grid clone */
        .ps-card-num {
          position: absolute;
          top: 10px;
          right: 18px;
          font-family: var(--font-playfair);
          font-size: 68px;
          font-weight: 700;
          line-height: 1;
          color: rgba(0,0,37,0.045);
          user-select: none;
          pointer-events: none;
        }

        /* Underline draws in on hover instead of a border-shimmer */
        .ps-card-rule {
          position: relative;
          display: inline-block;
          height: 2px;
          width: 28px;
          background: ${GOLD};
          margin-bottom: 14px;
          transition: width 0.3s ease;
        }
        .ps-card:hover .ps-card-rule {
          width: 52px;
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
            {cards.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className={`ps-card ${cardsInView ? "ps-visible" : ""}`}
              >
                {/* Ghost page numeral */}
                <span className="ps-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Small inline icon — no circle background */}
                <Icon
                  className="relative mb-4 block h-6 w-6"
                  style={{ color: GOLD }}
                  strokeWidth={1.5}
                />

                {/* Underline */}
                <span className="ps-card-rule" aria-hidden="true" />

                {/* Title */}
                <h3
                  className="relative mb-3 text-[18px] font-bold leading-snug"
                  style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
                >
                  {title}
                </h3>

                {/* Body */}
                <p
                  className="relative text-[15px] leading-relaxed"
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
