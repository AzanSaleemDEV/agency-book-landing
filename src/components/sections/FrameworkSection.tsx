"use client";

import { useInView } from "react-intersection-observer";
import { Rocket, Handshake, TrendingUp, type LucideIcon } from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";

// ─── data ─────────────────────────────────────────────────────────────────────
const steps: {
  num: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
}[] = [
  {
    num: "01",
    icon: Rocket,
    title: "Build the Right Foundation",
    body: "Nail your niche, build a brand positioning that commands premium rates, land your first high-value clients, and set up the operational backbone that holds up when you get busy.",
    tag: "Chapters 1–9",
  },
  {
    num: "02",
    icon: Handshake,
    title: "Sell Without Pitching",
    body: "Learn to sell without desperation. Package your services so the price becomes secondary. Build a closing system that converts high-ticket prospects — without chasing, discounting, or begging.",
    tag: "Chapters 10–16",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Own the Business. Stop Running the Job.",
    body: "Hire and retain the right team, automate your delivery, multiply your revenue streams, and install the leadership infrastructure that lets your agency grow past you.",
    tag: "Chapters 17–28",
  },
];

// ─── component ────────────────────────────────────────────────────────────────
export function FrameworkSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: stepsRef, inView: stepsIn } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── header ── */
        @keyframes fw-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fw-head-item { opacity: 0; }
        .fw-head-item.fw-in {
          animation: fw-fade-up 0.6s ease-out both;
        }
        .fw-hd1.fw-in { animation-delay: 0.05s; }
        .fw-hd2.fw-in { animation-delay: 0.20s; }
        .fw-hd3.fw-in { animation-delay: 0.35s; }

        /* ── dashed connecting line — draws L→R on scroll ── */
        .fw-line-track {
          position: absolute;
          /* sits at the vertical center of the step-number text (approx 56px from top of card) */
          top: 56px;
          left: 18%;
          right: 18%;
          height: 2px;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .fw-line-fill {
          height: 100%;
          width: 0;
          background-image: repeating-linear-gradient(
            to right,
            ${GOLD}   0px,  ${GOLD}   14px,
            transparent 14px, transparent 22px
          );
          filter: drop-shadow(0 0 4px rgba(201,168,76,0.55));
          transition: width 1.1s ease-out 0.5s;
        }
        .fw-line-fill.fw-in {
          width: 100%;
        }

        /* ── step cards — stagger up ── */
        .fw-card {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity     0.55s ease-out,
            transform   0.55s ease-out,
            border-top-color 0.2s ease,
            box-shadow  0.25s ease;
          border-top: 3px solid transparent;
          border-radius: 16px;
          padding: 2rem;
          background: #ffffff;
          position: relative;
          z-index: 10;
        }
        .fw-card.fw-in {
          opacity: 1;
          transform: translateY(0);
        }
        /* stagger delays */
        .fw-card:nth-child(1) { transition-delay: 0.1s, 0.1s, 0s, 0s; }
        .fw-card:nth-child(2) { transition-delay: 0.25s, 0.25s, 0s, 0s; }
        .fw-card:nth-child(3) { transition-delay: 0.40s, 0.40s, 0s, 0s; }

        /* hover: lift + gold top border */
        .fw-card:hover {
          border-top-color: ${GOLD};
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,37,0.09), 0 4px 12px rgba(0,0,37,0.05);
        }
        /* keep hover transform when already animated in */
        .fw-card.fw-in:hover {
          transform: translateY(-6px);
        }

        /* ── CTA ── */
        .fw-cta { opacity: 0; }
        .fw-cta.fw-in {
          animation: fw-fade-up 0.55s ease-out 0.7s both;
        }
      `}</style>

      <section
        className="bg-white f-section"
        aria-label="Core framework"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto max-w-2xl text-center">

            <p
              className={`fw-head-item fw-hd1 mb-4 text-[11px] font-black tracking-[0.22em] uppercase ${headIn ? "fw-in" : ""}`}
              style={{ color: GOLD }}
            >
              The Core Framework
            </p>

            <h2
              className={`fw-head-item fw-hd2 mb-5 f-h2 font-bold tracking-tight ${headIn ? "fw-in" : ""}`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              Start. Sale. Scale.
            </h2>

            <p
              className={`fw-head-item fw-hd3 text-[17px] leading-relaxed ${headIn ? "fw-in" : ""}`}
              style={{ color: "#6B6B80" }}
            >
              Three phases. Most agency owners never make it cleanly through all three — because nobody showed them what each one actually requires. This book does.
            </p>
          </div>

          {/* ── Steps grid + connecting line ────────────────────────── */}
          <div ref={stepsRef} className="relative mt-16">

            {/* Dashed line — desktop only */}
            <div className="fw-line-track hidden lg:block" aria-hidden="true">
              <div className={`fw-line-fill ${stepsIn ? "fw-in" : ""}`} />
            </div>

            {/* Three columns */}
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map(({ num, icon: Icon, title, body, tag }) => (
                <div
                  key={num}
                  className={`fw-card ${stepsIn ? "fw-in" : ""}`}
                >
                  {/* Step number */}
                  <p
                    className="mb-5 leading-none text-[64px] font-bold"
                    style={{ color: GOLD, fontFamily: "var(--font-playfair)" }}
                    aria-hidden="true"
                  >
                    {num}
                  </p>

                  {/* Icon */}
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${NAVY}0d` }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: NAVY }}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 text-[20px] font-bold leading-snug"
                    style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
                  >
                    {title}
                  </h3>

                  {/* Body */}
                  <p
                    className="mb-6 text-[15px] leading-relaxed"
                    style={{ color: "#6B6B80" }}
                  >
                    {body}
                  </p>

                  {/* Part tag */}
                  <p
                    className="text-[12px] font-black tracking-[0.14em] uppercase"
                    style={{ color: GOLD }}
                  >
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <div
            className={`fw-cta ${stepsIn ? "fw-in" : ""} mt-14 flex justify-center`}
          >
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-9 py-4 text-[15px] font-black tracking-wide shadow-md transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD, color: NAVY }}
            >
              Get the Full Blueprint — $9.99
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
