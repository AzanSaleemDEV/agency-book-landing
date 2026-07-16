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
    body:  "Not every niche pays the same. This shows you how to find one where your skills command real rates and clients actually have the budget to pay them.",
  },
  {
    title: "Landing Your First Premium Client",
    body:  "Forget taking whatever comes in. Learn how to go after clients who pay well, respect the process, and stick around.",
  },
  {
    title: "Pricing From Confidence, Not Fear",
    body:  "A clear framework for setting rates based on value. Stop second-guessing your prices and start working with clients who don't push back on every invoice.",
  },
  {
    title: "The 5 Mistakes That Kill New Agencies",
    body:  "Pulled from real agency failures: over-servicing, chasing the wrong clients, skipping contracts, and three others that quietly drain cash flow.",
  },
  {
    title: "Build Your Systems Before You're Overwhelmed",
    body:  "Agencies that grow smoothly build their SOPs, onboarding flows, and delivery processes before they actually need them. Here is what to set up first.",
  },
  {
    title: "Position as the Expert, Not the Option",
    body:  "Commodity agencies fight over price. Expert agencies don't. This chapter covers exactly how to shift the way your market sees you.",
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

        /*
         * Dark glass cards with a ghost page numeral — same editorial
         * family as the Pain section's numeral treatment, but tuned for
         * this section's navy mood instead of bright white boxes.
         */
        .ss-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1.75rem;
          height: 100%;
          overflow: hidden;
          transition:
            transform    0.22s ease,
            border-color 0.22s ease,
            background   0.22s ease;
        }
        .ss-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201,168,76,0.4);
          background: rgba(255,255,255,0.05);
        }
        .ss-card-num {
          position: absolute;
          top: 6px;
          right: 14px;
          font-family: var(--font-playfair);
          font-size: 54px;
          font-weight: 700;
          line-height: 1;
          color: rgba(201,168,76,0.14);
          user-select: none;
          pointer-events: none;
        }

      `}</style>

      <section
        style={{ backgroundColor: BG }}
        className="relative f-section overflow-hidden"
        aria-label="Phase One — Start"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Body: rotated label spans the whole section; header + card
               grid share ONE content column so there's no separate width
               constraint creating an empty gap next to the header ────── */}
          <div ref={bodyRef} className="flex items-stretch gap-8 lg:gap-12">

            {/* LEFT: rotated "START" label — desktop only, spans full height */}
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

            {/* RIGHT: header + card grid, same column width throughout */}
            <div className="flex-1">

              {/* Header */}
              <div
                ref={headRef}
                className={`ss-header ${headIn ? "ss-in" : ""} mb-14 flex flex-col gap-10 lg:flex-row lg:items-start`}
              >
                <div className="max-w-2xl">
                  {/* Badges */}
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span
                      className="rounded-full px-4 py-1.5 text-[11px] font-black tracking-[0.18em] uppercase"
                      style={{ backgroundColor: NAVY, color: GOLD }}
                    >
                      🚀&nbsp; Phase One: Start
                    </span>
                    <span
                      className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                      style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
                    >
                      Chapters 1–9
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
                    The decisions you make at the start of your agency (niche, positioning, pricing, systems) compound for years. Get them right early and everything else gets easier. Get them wrong and you'll be rebuilding forever.
                  </p>
                </div>

                {/* Pull-quote — fills the space beside the header on wide
                    screens with real editorial content instead of a stray
                    numeral or a thin floating stat card */}
                <div
                  className="hidden shrink-0 rounded-2xl px-8 py-8 lg:block lg:w-[380px]"
                  style={{ border: "1px solid rgba(201,168,76,0.18)", background: "rgba(255,255,255,0.03)" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "56px",
                      lineHeight: 0.6,
                      color: GOLD,
                      opacity: 0.85,
                    }}
                  >
                    &ldquo;
                  </span>
                  <p
                    className="text-[18px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.85)", fontStyle: "italic", fontFamily: "var(--font-playfair)" }}
                  >
                    The first 90 days aren&apos;t about working harder. They&apos;re about building the foundation before you&apos;re too busy to fix it.
                  </p>
                </div>
              </div>

              {/* Card grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map(({ title, body }, i) => (
                <div
                  key={title}
                  className={`ss-wrap ${bodyIn ? "ss-in" : ""}`}
                  style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className="ss-card">
                    {/* Ghost page numeral */}
                    <span className="ss-card-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Card title */}
                    <h3
                      className="relative mb-2 text-[15px] font-bold leading-snug"
                      style={{ color: "#FFFFFF" }}
                    >
                      {title}
                    </h3>

                    {/* Card body */}
                    <p
                      className="relative text-[14px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
