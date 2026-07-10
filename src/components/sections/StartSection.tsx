"use client";

import { useInView } from "react-intersection-observer";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";
const BG   = "#000D30";

// ─── card data ────────────────────────────────────────────────────────────────
const cards = [
  {
    title: "Choosing a Niche That Actually Pays",
    body:  "Not all niches are equal. This section shows you how to select a market where your expertise commands premium rates — and clients have money to spend.",
  },
  {
    title: "Landing Your First Premium Client",
    body:  "Forget the 'take anything you can get' approach. The book shows you how to start with clients who pay well, respect boundaries, and come back.",
  },
  {
    title: "Pricing From Confidence, Not Fear",
    body:  "The framework for setting rates that reflect real value — so you stop apologising for your price and start attracting clients who don't flinch at it.",
  },
  {
    title: "The 5 Mistakes That Kill New Agencies",
    body:  "Documented from real agency failures — including the over-servicing trap, the wrong-client spiral, and the no-contract mistake that destroys cash flow.",
  },
  {
    title: "Build Your Systems Before You're Overwhelmed",
    body:  "The agencies that scale cleanly set up SOPs, onboarding flows, and delivery workflows before they need them. This section shows you what to build first.",
  },
  {
    title: "Position as the Expert, Not the Option",
    body:  "Commodity agencies compete on price. Expert agencies set the price. This chapter shows you exactly how to make that shift in how your market perceives you.",
  },
];

// ─── component ────────────────────────────────────────────────────────────────
export function StartSection() {
  const { ref: headRef, inView: headIn } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: bodyRef, inView: bodyIn } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* Header slides in from left */
        @keyframes ss-slide-left {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .ss-header { opacity: 0; }
        .ss-header.ss-in {
          animation: ss-slide-left 0.65s ease-out both;
        }

        /* Side label fade in */
        @keyframes ss-label-in {
          from { opacity: 0; }
          to   { opacity: 0.3; }
        }
        .ss-label { opacity: 0; }
        .ss-label.ss-in {
          animation: ss-label-in 0.8s ease-out 0.3s both;
        }

        /*
         * Card entrance uses TWO layers:
         *   .ss-wrap  — handles opacity + translateY with stagger delay
         *   .ss-card  — handles hover (no delay conflict)
         */
        .ss-wrap {
          opacity: 0;
          transform: translateY(26px);
        }
        .ss-wrap.ss-in {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity   0.5s ease-out var(--d, 0s),
            transform 0.5s ease-out var(--d, 0s);
        }

        /* Hover target — zero delay so hover is instant */
        .ss-card {
          background: #ffffff;
          border-top: 3px solid ${GOLD};
          border-radius: 12px;
          padding: 1.5rem;
          height: 100%;
          transition:
            transform        0.22s ease,
            box-shadow       0.22s ease,
            border-top-color 0.22s ease;
        }
        .ss-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0,0,37,0.09), 0 3px 8px rgba(0,0,37,0.05);
          border-top-color: #E0C060;
        }

        /* Bottom caption */
        @keyframes ss-caption-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .ss-caption { opacity: 0; }
        .ss-caption.ss-in {
          animation: ss-caption-in 0.5s ease-out 0.9s both;
        }
      `}</style>

      <section
        style={{ backgroundColor: BG }}
        className="f-section overflow-hidden"
        aria-label="Phase One — Start"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div
            ref={headRef}
            className={`ss-header ${headIn ? "ss-in" : ""} mb-14 max-w-2xl`}
          >
            {/* Pill badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <span
                className="rounded-full px-4 py-1.5 text-[11px] font-black tracking-[0.18em] uppercase"
                style={{ backgroundColor: NAVY, color: GOLD }}
              >
                🚀&nbsp; Phase One: Start
              </span>
            </div>

            {/* Headline */}
            <h2
              className="mb-4 f-h2 font-bold tracking-tight"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-playfair)" }}
            >
              Most Agencies Fail in the First 90 Days. Here's Exactly Why.
            </h2>

            {/* Subheadline */}
            <p className="text-[17px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              The decisions you make at the start of your agency — niche, positioning, pricing, systems — compound for years. Get them right early and everything else gets easier. Get them wrong and you'll be rebuilding forever.
            </p>
          </div>

          {/* ── Body: rotated label + card grid ─────────────────────── */}
          <div ref={bodyRef} className="flex items-stretch gap-8 lg:gap-12">

            {/* LEFT: rotated "START" label — desktop only */}
            <div className="hidden lg:flex w-16 shrink-0 items-center justify-center">
              <span
                className={`ss-label ${bodyIn ? "ss-in" : ""} select-none`}
                aria-hidden="true"
                style={{
                  writingMode:   "vertical-lr",
                  transform:     "rotate(180deg)",
                  fontFamily:    "var(--font-playfair)",
                  fontSize:      "clamp(56px, 5vw, 80px)",
                  fontWeight:    900,
                  color:         GOLD,
                  letterSpacing: "0.1em",
                  lineHeight:    1,
                }}
              >
                START
              </span>
            </div>

            {/* RIGHT: 2 × 3 mini-card grid */}
            <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cards.map(({ title, body }, i) => (
                <div
                  key={title}
                  className={`ss-wrap ${bodyIn ? "ss-in" : ""}`}
                  style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className="ss-card">
                    {/* Card title */}
                    <h3
                      className="mb-2 text-[15px] font-bold leading-snug"
                      style={{ color: NAVY }}
                    >
                      {title}
                    </h3>

                    {/* Card body */}
                    <p
                      className="text-[14px] leading-relaxed"
                      style={{ color: "#6B6B80" }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Chapter reference ───────────────────────────────────── */}
          <p
            className={`ss-caption ${bodyIn ? "ss-in" : ""} mt-10 text-center text-[13px] font-medium`}
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            Covered across Chapters 1–9 in the book
          </p>

        </div>
      </section>
    </>
  );
}
