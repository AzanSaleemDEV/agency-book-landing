"use client";

import { useInView } from "react-intersection-observer";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000D30";

// ─── data ─────────────────────────────────────────────────────────────────────
const pillars: { label: string; chapters: { num: number; title: string }[] }[] = [
  {
    label: "AGENCY ALCHEMY: FOUNDATION",
    chapters: [
      { num: 1,  title: "Knowing Yourself Before You Scale" },
      { num: 2,  title: "How to Choose the Right Market" },
      { num: 3,  title: "Defining Your Agency Niche" },
      { num: 4,  title: "The Top 10% Success Formula" },
      { num: 5,  title: "Brand Identity and Positioning" },
      { num: 6,  title: "Building Trust That Attracts Premium Clients" },
    ],
  },
  {
    label: "BUILDING EFFECTIVE SYSTEMS",
    chapters: [
      { num: 7,  title: "Hierarchy, Roles, and Team Structure" },
      { num: 8,  title: "Systems, Processes, and SOPs" },
      { num: 9,  title: "Reward, Accountability, and Culture" },
      { num: 10, title: "Sales Funnels for Service Businesses" },
      { num: 11, title: "Pricing Transparency and Rate Strategy" },
      { num: 12, title: "Reviews, Reputation, and Social Proof" },
      { num: 13, title: "Portfolio Strategy" },
    ],
  },
  {
    label: "QUANTUM SCALING",
    chapters: [
      { num: 14, title: "SEO as an Agency Growth Channel" },
      { num: 15, title: "Mastering Agency Sales" },
      { num: 16, title: "Lead Generation: Outbound, Referral, Paid" },
      { num: 17, title: "Client Retention Systems" },
      { num: 18, title: "Operational Efficiency at Scale" },
      { num: 19, title: "Automating Without Losing Quality" },
    ],
  },
  {
    label: "LEADERSHIP & LEGACY",
    chapters: [
      { num: 20, title: "Ethics and Long-Term Reputation" },
      { num: 21, title: "The Right Leadership Mindset" },
      { num: 22, title: "Innovation vs. Stagnation" },
      { num: 23, title: "Focus as a Competitive Advantage" },
      { num: 24, title: "Making Your Clients Win, Too" },
      { num: 25, title: "Bigger Cause, Bigger Goals" },
      { num: 26, title: "Systems for Scaling Revenue" },
      { num: 27, title: "Legal Protection" },
      { num: 28, title: "Planning the Next 10 Years" },
    ],
  },
];

// ─── component ────────────────────────────────────────────────────────────────
export function BookContents() {
  const { ref: headRef,    inView: headIn    } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: pillarsRef, inView: pillarsIn } = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── header ── */
        @keyframes bc-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bc-head-item { opacity: 0; }
        .bc-head-item.bc-in {
          animation: bc-fade-up 0.6s ease-out both;
        }
        .bc-hd1.bc-in { animation-delay: 0.05s; }
        .bc-hd2.bc-in { animation-delay: 0.18s; }
        .bc-hd3.bc-in { animation-delay: 0.30s; }

        /* ── pillar card fade-up ── */
        .bc-pillar {
          opacity: 0;
          transform: translateY(24px);
        }
        .bc-pillar.bc-in {
          animation: bc-fade-up 0.6s ease-out var(--pd, 0s) both;
        }

        /* ── chapter line slide-from-left ── */
        @keyframes bc-ch-in {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .bc-chapter {
          opacity: 0;
        }
        .bc-chapter.bc-in {
          animation: bc-ch-in 0.38s ease-out var(--cd, 0s) both;
        }

        /* ── book float (replicates bh-float from BookHero) ── */
        @keyframes bc-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-12px) rotate(-1deg); }
        }
        .bc-float {
          animation: bc-float 4s ease-in-out infinite;
          display: inline-block;
        }

        /* ── right panel fade ── */
        .bc-book-panel { opacity: 0; }
        .bc-book-panel.bc-in {
          animation: bc-fade-up 0.65s ease-out 0.4s both;
        }

        /* ── pillar card hover ── */
        .bc-pillar-card {
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 16px;
          padding: 1.5rem;
          background: rgba(255,255,255,0.035);
          transition: border-color 0.22s ease, background 0.22s ease;
        }
        .bc-pillar-card:hover {
          border-color: rgba(201,168,76,0.3);
          background: rgba(255,255,255,0.055);
        }

        /* ── gold separator line inside pillar ── */
        .bc-pillar-rule {
          height: 1px;
          margin: 0.75rem 0 1rem;
          background: linear-gradient(to right, ${GOLD}, transparent);
          opacity: 0.45;
        }
      `}</style>

      <section
        style={{ backgroundColor: NAVY }}
        className="f-section overflow-hidden"
        aria-label="Book contents"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">
            <p
              className={`bc-head-item bc-hd1 ${headIn ? "bc-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}
            >
              What's Inside
            </p>

            <h2
              className={`bc-head-item bc-hd2 ${headIn ? "bc-in" : ""} mb-5 text-[38px] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              30 Chapters. Zero Filler.
            </h2>

            <p
              className={`bc-head-item bc-hd3 ${headIn ? "bc-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Every chapter is a lever. Pull the right ones in the right order and your agency
              changes shape.
            </p>
          </div>

          {/* ── Main: pillars grid + sticky book ────────────────────── */}
          <div
            ref={pillarsRef}
            className="lg:grid lg:grid-cols-[1fr_260px] lg:items-start lg:gap-14"
          >

            {/* LEFT: 2 × 2 pillars grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {pillars.map(({ label, chapters }, pi) => (
                <div
                  key={label}
                  className={`bc-pillar ${pillarsIn ? "bc-in" : ""}`}
                  style={{ "--pd": `${pi * 0.2}s` } as React.CSSProperties}
                >
                  <div className="bc-pillar-card">

                    {/* Pillar label */}
                    <p
                      className="text-[10px] font-black tracking-[0.2em] uppercase"
                      style={{ color: GOLD }}
                    >
                      {label}
                    </p>

                    {/* Gold gradient rule */}
                    <div className="bc-pillar-rule" aria-hidden="true" />

                    {/* Chapter list */}
                    <ol className="space-y-2.5">
                      {chapters.map(({ num, title }, ci) => (
                        <li
                          key={num}
                          className={`bc-chapter ${pillarsIn ? "bc-in" : ""} flex items-baseline gap-2.5`}
                          style={{
                            "--cd": `${pi * 0.2 + ci * 0.03}s`,
                          } as React.CSSProperties}
                        >
                          {/* Gold chapter number */}
                          <span
                            className="w-6 shrink-0 text-right text-[12px] font-black tabular-nums"
                            style={{ color: GOLD }}
                          >
                            {num}.
                          </span>
                          {/* White chapter title */}
                          <span
                            className="text-[13px] leading-snug"
                            style={{ color: "rgba(255,255,255,0.82)" }}
                          >
                            {title}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: sticky floating book + CTA */}
            <div
              className={`bc-book-panel ${pillarsIn ? "bc-in" : ""} mt-10 flex flex-col items-center text-center lg:sticky lg:top-24 lg:mt-0`}
            >
              {/* Gold glow behind book */}
              <div className="relative inline-block">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 scale-[1.2] blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(201,168,76,0.22) 0%, transparent 70%)",
                  }}
                />

                {/* Floating book image */}
                <div className="bc-float">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/book.png"
                    alt="7-Figure Agency Mindset A-Z — Hardcopy book"
                    width={320}
                    height={420}
                    className="w-[200px] rounded-xl sm:w-[240px] lg:w-[220px]"
                    style={{
                      boxShadow:
                        "0 40px 72px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.1)",
                    }}
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                className="mt-8 rounded-xl px-7 py-3.5 text-[15px] font-black tracking-wide transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: GOLD,
                  color:           NAVY,
                  boxShadow:       "0 8px 24px rgba(201,168,76,0.28)",
                }}
              >
                Start Reading — $9.99
              </button>

              {/* Availability note */}
              <p
                className="mt-3 max-w-[200px] text-[12px] leading-snug"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Available in E-book (instant) and Hardcopy (shipped worldwide)
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
