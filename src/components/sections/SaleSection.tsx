"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { MessageCircle, Package, TrendingUp, type LucideIcon } from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";

// ─── data ─────────────────────────────────────────────────────────────────────
const rows: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon:  MessageCircle,
    title: "The Sales Conversation, Rebuilt",
    body:  "A structured framework that removes the awkwardness, handles the real objections (budget, timing, trust), and moves qualified prospects to a decision — without pressure tactics that destroy long-term reputation.",
  },
  {
    icon:  Package,
    title: "Packaging Services Clients Can't Refuse",
    body:  "How to structure your offer so the value is self-evident — and the price becomes the easiest part of the conversation. Includes the exact proposal format used to close five-figure agency contracts.",
  },
  {
    icon:  TrendingUp,
    title: "Raising Your Rates Without Losing Anyone",
    body:  "The repositioning and communication sequence for increasing prices with existing clients — while actually strengthening the relationship. Most agency owners never attempt this. The ones who do rarely go back.",
  },
];

const QUOTE =
  "Most agency owners think they have a sales problem. They don't. They have a positioning problem that shows up at the sales table.";

const stats: { num: number; unit: string; label: string }[] = [
  { num: 3, unit: "Chapters",        label: "Dedicated to Sales Frameworks"     },
  { num: 5, unit: "Closing Scripts", label: "Ready to Use"                       },
  { num: 1, unit: "System",          label: "That Works Without Cold Chasing"   },
];

// ─── stat item ────────────────────────────────────────────────────────────────
function StatItem({
  num, unit, label, trigger,
}: {
  num: number; unit: string; label: string; trigger: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <p
        className={`sa-stat-num text-5xl font-black tabular-nums sm:text-6xl ${done ? "sa-stat-pulsed" : ""}`}
        style={{ color: GOLD }}
      >
        {trigger
          ? <CountUp start={0} end={num} duration={1.8} useEasing onEnd={() => setDone(true)} />
          : "0"
        }
      </p>
      <p className="text-[13px] font-black uppercase tracking-wide" style={{ color: NAVY }}>
        {unit}
      </p>
      <p className="max-w-[160px] text-[13px] leading-snug" style={{ color: "#6B6B80" }}>
        {label}
      </p>
    </div>
  );
}

// ─── component ────────────────────────────────────────────────────────────────
export function SaleSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: leftRef,  inView: leftIn  } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { ref: rightRef, inView: rightIn } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { ref: statsRef, inView: statsIn } = useInView({ triggerOnce: true, threshold: 0.3  });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── header ── */
        @keyframes sa-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sa-header { opacity: 0; }
        .sa-header.sa-in {
          animation: sa-fade-up 0.6s ease-out both;
        }

        /* ── left rows — slide from left with per-row delay ── */
        @keyframes sa-slide-left {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .sa-row { opacity: 0; }
        .sa-row.sa-in {
          animation: sa-slide-left 0.6s ease-out var(--d, 0s) both;
        }

        /* ── right column — fade from right ── */
        @keyframes sa-slide-right {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .sa-right { opacity: 0; }
        .sa-right.sa-in {
          animation: sa-slide-right 0.65s ease-out 0.2s both;
        }

        /* ── pull-quote marks animate first ── */
        @keyframes sa-qmark-in {
          from { opacity: 0; transform: scale(0.55) translateY(-10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .sa-qmark { opacity: 0; }
        .sa-qmark.sa-in {
          animation: sa-qmark-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .sa-qmark-open.sa-in  { animation-delay: 0.35s; }
        .sa-qmark-close.sa-in { animation-delay: 0.85s; }

        /* ── quote text fades in after marks ── */
        @keyframes sa-qtext-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sa-qtext { opacity: 0; }
        .sa-qtext.sa-in {
          animation: sa-qtext-in 0.6s ease-out 0.6s both;
        }

        /* ── ebook image ── */
        .sa-book { opacity: 0; }
        .sa-book.sa-in {
          animation: sa-fade-up 0.6s ease-out 0.9s both;
        }

        /* ── stats row ── */
        .sa-stats { opacity: 0; }
        .sa-stats.sa-in {
          animation: sa-fade-up 0.55s ease-out 0.1s both;
        }

        /* ── stat number pulse on completion ── */
        @keyframes sa-pulse-once {
          0%  { transform: scale(1);    }
          40% { transform: scale(1.14); }
          70% { transform: scale(0.97); }
          100%{ transform: scale(1);    }
        }
        .sa-stat-num { display: block; transform-origin: center; }
        .sa-stat-pulsed { animation: sa-pulse-once 0.4s ease-out; }

        /* ── stat divider lines ── */
        .sa-stat-divider {
          width: 1px;
          background: rgba(0,0,37,0.1);
        }
      `}</style>

      <section className="bg-white f-section overflow-hidden" aria-label="Phase Two — Sale">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div
            ref={headRef}
            className={`sa-header ${headIn ? "sa-in" : ""} mx-auto mb-16 max-w-2xl text-center`}
          >
            {/* Badge pill */}
            <div className="mb-6">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[11px] font-black tracking-[0.18em] uppercase"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                💰&nbsp; Phase Two: Sale
              </span>
            </div>

            <h2
              className="mb-5 f-h2 font-bold tracking-tight"
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              The Difference Between a £3K Client and a £30K Client Is Rarely the Work.
            </h2>

            <p className="text-[17px] leading-relaxed" style={{ color: "#6B6B80" }}>
              It's the offer, the positioning, and the sales conversation. This section of the book rebuilds all three — so your agency starts winning the clients it actually deserves.
            </p>
          </div>

          {/* ── Two-column body ─────────────────────────────────────── */}
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* LEFT: feature rows */}
            <div ref={leftRef} className="flex flex-col gap-10">
              {rows.map(({ icon: Icon, title, body }, i) => (
                <div
                  key={title}
                  className={`sa-row ${leftIn ? "sa-in" : ""} flex gap-5`}
                  style={{ "--d": `${0.1 + i * 0.15}s` } as React.CSSProperties}
                >
                  {/* Icon circle */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className="mb-2 text-[18px] font-bold leading-snug"
                      style={{ color: NAVY }}
                    >
                      {title}
                    </h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: "#6B6B80" }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: pull quote + ebook image */}
            <div ref={rightRef} className={`sa-right ${rightIn ? "sa-in" : ""}`}>

              {/* Pull quote card */}
              <div
                className="mb-8 rounded-2xl p-8"
                style={{ backgroundColor: "#F8F7F4", border: `1px solid rgba(201,168,76,0.2)` }}
              >
                {/* Opening quote mark */}
                <span
                  className={`sa-qmark sa-qmark-open ${rightIn ? "sa-in" : ""} block leading-none`}
                  aria-hidden="true"
                  style={{
                    color:      GOLD,
                    fontSize:   "80px",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    lineHeight: 0.8,
                    marginBottom: "12px",
                  }}
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <p
                  className={`sa-qtext ${rightIn ? "sa-in" : ""} text-[22px] font-bold italic leading-[1.35]`}
                  style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
                >
                  {QUOTE}
                </p>

                {/* Closing quote mark */}
                <span
                  className={`sa-qmark sa-qmark-close ${rightIn ? "sa-in" : ""} block text-right leading-none`}
                  aria-hidden="true"
                  style={{
                    color:      GOLD,
                    fontSize:   "80px",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    lineHeight: 0.8,
                    marginTop:  "8px",
                  }}
                >
                  &rdquo;
                </span>
              </div>

              {/* Ebook image */}
              <div className={`sa-book ${rightIn ? "sa-in" : ""} flex flex-col items-center gap-3`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/book.png"
                  alt="7-Figure Agency Mindset A-Z — E-book"
                  width={340}
                  height={220}
                  className="w-full max-w-[320px] rounded-xl object-cover"
                  style={{
                    boxShadow: "0 20px 48px rgba(0,0,37,0.12), 0 4px 12px rgba(0,0,37,0.06)",
                  }}
                />
                <p
                  className="text-[13px] font-semibold"
                  style={{ color: NAVY }}
                >
                  Available as E-book or Hardcopy
                </p>
              </div>
            </div>
          </div>

          {/* ── Stats row ────────────────────────────────────────────── */}
          <div ref={statsRef}>
            <div
              className="my-16 h-px"
              style={{ background: "rgba(0,0,37,0.08)" }}
              aria-hidden="true"
            />

            <div className={`sa-stats ${statsIn ? "sa-in" : ""} flex items-start justify-center gap-0`}>
              {stats.map(({ num, unit, label }, i) => (
                <div key={unit} className="flex items-stretch">
                  <StatItem num={num} unit={unit} label={label} trigger={statsIn} />
                  {i < stats.length - 1 && (
                    <div
                      className="sa-stat-divider mx-8 my-2 self-stretch"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
