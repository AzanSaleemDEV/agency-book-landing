"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";

const BODY = [
  "Hamid Mahmood is an accomplished Digital Consultant, globally recognized CEO (World CEO Rankings – TWCR), and Founder of the top digital agencies HTMLPro, Ecom Development NYC, and Software Pro Digital. With over 1.5 decades of experience, Hamid is a visionary entrepreneur dedicated to empowering global business owners, freelancers, and agency professionals.",
  "As the force behind top ranked agencies, Hamid excels in setting up delivery infrastructures, resulting in a 10X increase in revenue streams and stabilized offshore operations for hundreds of agencies, e-commerce stores, and large corporations.",
];

const STATS = [
  { prefix: "",  value: 8000, suffix: "+",  label: "Projects Delivered"        },
  { prefix: "",  value: 3000, suffix: "+",  label: "Clients Served"            },
  { prefix: "",  value: 200,  suffix: "+",  label: "Team Members"              },
  { prefix: "",  value: 5,    suffix: "",   label: "Clutch Rating"             },
];

// ─── stat item ────────────────────────────────────────────────────────────────
function StatItem({
  prefix, value, suffix, label, trigger,
}: {
  prefix: string; value: number; suffix: string; label: string; trigger: boolean;
}) {
  const [done, setDone] = useState(false);

  return (
    <div className="flex flex-col items-center text-center">
      <p
        className={`as-stat-num text-5xl font-black tabular-nums lg:text-6xl ${done ? "as-stat-pulsed" : ""}`}
        style={{ color: GOLD }}
      >
        {trigger
          ? (
            <CountUp
              start={0}
              end={value}
              prefix={prefix}
              suffix={suffix}
              duration={value >= 1000 ? 2.8 : 2.2}
              decimals={value === 5 ? 1 : 0}
              useEasing
              onEnd={() => setDone(true)}
            />
          )
          : `${prefix}0${suffix}`
        }
      </p>
      <p
        className="mt-2 max-w-[120px] text-[13px] font-medium leading-snug"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export function AuthorSection() {
  const { ref: photoRef,  inView: photoIn  } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: copyRef,   inView: copyIn   } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: statsRef,  inView: statsIn  } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <>
      {/* ── scoped styles ─────────────────────────────────────────────── */}
      <style>{`
        /* Diagonal decorative lines behind author photo */
        .as-photo-deco {
          position: absolute;
          inset: -28px;
          z-index: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(201,168,76,0.07) 0px,
            rgba(201,168,76,0.07) 1px,
            transparent 1px,
            transparent 22px
          );
          pointer-events: none;
        }

        /* Slide in from left */
        @keyframes as-slide-left {
          from { opacity: 0; transform: translateX(-44px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        /* Slide in from right */
        @keyframes as-slide-right {
          from { opacity: 0; transform: translateX(44px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .as-photo-col {
          opacity: 0;
        }
        .as-photo-col.as-in {
          animation: as-slide-left 0.7s ease-out both;
        }

        .as-copy-col {
          opacity: 0;
        }
        .as-copy-col.as-in {
          animation: as-slide-right 0.7s ease-out 0.2s both;
        }

        /* Stats fade up */
        @keyframes as-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .as-stats-row {
          opacity: 0;
        }
        .as-stats-row.as-in {
          animation: as-fade-up 0.6s ease-out both;
        }

        /* One-time pulse on stat completion */
        @keyframes as-pulse-once {
          0%   { transform: scale(1);    }
          40%  { transform: scale(1.13); }
          70%  { transform: scale(0.97); }
          100% { transform: scale(1);    }
        }
        .as-stat-num {
          display: block;
          transform-origin: center;
        }
        .as-stat-pulsed {
          animation: as-pulse-once 0.45s ease-out;
        }

        /* Gold separator dots */
        .as-gold-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${GOLD};
          vertical-align: middle;
          margin: 0 10px;
          opacity: 0.6;
        }
      `}</style>

      <section
        style={{ backgroundColor: NAVY }}
        className="f-section overflow-hidden"
        aria-label="About the author"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Two-column grid ──────────────────────────────────────── */}
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* ── LEFT — Author photo ──────────────────────────────── */}
            <div
              ref={photoRef}
              className={`as-photo-col ${photoIn ? "as-in" : ""} flex justify-center lg:justify-start`}
            >
              <div className="relative inline-block">
                {/* Diagonal lines deco */}
                <div className="as-photo-deco" aria-hidden="true" />

                {/* Gold offset border frame */}
                <div
                  className="absolute -bottom-4 -right-4 z-0 h-full w-full rounded-2xl"
                  style={{ border: `2px solid rgba(201,168,76,0.35)` }}
                  aria-hidden="true"
                />

                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/book2.jpeg"
                  alt="Hamid Mahmood reading 7-Figure Agency Mindset A-Z overlooking New York City"
                  width={480}
                  height={540}
                  className="relative z-10 w-full max-w-[420px] rounded-2xl object-cover object-top"
                  style={{
                    aspectRatio: "4/5",
                    boxShadow: `0 0 0 2px rgba(201,168,76,0.5), 0 32px 64px rgba(0,0,0,0.55), 0 0 80px rgba(201,168,76,0.08)`,
                  }}
                />
              </div>
            </div>

            {/* ── RIGHT — Copy block ───────────────────────────────── */}
            <div
              ref={copyRef}
              className={`as-copy-col ${copyIn ? "as-in" : ""} flex flex-col items-center gap-6 text-center lg:items-start lg:text-left`}
            >
              {/* Label */}
              <p
                className="text-[11px] font-black tracking-[0.22em] uppercase"
                style={{ color: GOLD }}
              >
                About the Author
              </p>

              {/* Name */}
              <h2
                className="f-h2 font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Hamid Mahmood
              </h2>

              {/* Title line */}
              <p
                className="text-[17px] font-semibold leading-snug"
                style={{ color: GOLD }}
              >
                Founder,{" "}
                <a
                  href="https://softwareprodigital.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  Software Pro Digital
                </a>
                {" "}· 7-Figure Agency Builder
              </p>

              {/* Gold rule */}
              <div
                className="h-[1px] w-16"
                style={{ backgroundColor: `rgba(201,168,76,0.4)` }}
                aria-hidden="true"
              />

              {/* Body copy */}
              <div className="flex flex-col gap-4">
                {BODY.map((para, i) => (
                  <p
                    key={i}
                    className="leading-[1.75] text-[17px]"
                    style={{ color: "rgba(255,255,255,0.75)", fontWeight: i === 1 ? 600 : 400 }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ── Stats row ────────────────────────────────────────────── */}
          <div ref={statsRef}>
            {/* Divider */}
            <div
              className="my-16"
              style={{ borderTop: `1px solid rgba(201,168,76,0.18)` }}
              aria-hidden="true"
            />

            <div
              className={`as-stats-row ${statsIn ? "as-in" : ""} grid grid-cols-2 gap-8 gap-y-10 sm:gap-10 lg:grid-cols-4`}
            >
              {STATS.map(({ prefix, value, suffix, label }) => (
                <StatItem
                  key={label}
                  prefix={prefix}
                  value={value}
                  suffix={suffix}
                  label={label}
                  trigger={statsIn}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
