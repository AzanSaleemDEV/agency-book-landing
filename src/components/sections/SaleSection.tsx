"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const GOLD = "#C9A84C";
const NAVY = "#000025";

const PILLARS = [
  {
    num:   "01",
    title: "The Sales Conversation, Rebuilt",
    body:  "A structured approach that takes the awkwardness out of selling. It handles the real objections (budget, timing, trust) and moves the right prospects to a decision without tactics that damage the relationship.",
  },
  {
    num:   "02",
    title: "Packaging Services Clients Can't Refuse",
    body:  "How to structure your offer so the value is obvious and the price stops being the issue. Includes the proposal format Hamid used to close five-figure contracts.",
  },
  {
    num:   "03",
    title: "Raising Your Rates Without Losing Anyone",
    body:  "How to increase your prices with existing clients while keeping the relationship solid. Most agency owners never try this. The ones who do stop going back to lower rates.",
  },
];

const QUOTE = "Most agency owners think they have a sales problem. They don't. They have a positioning problem that shows up at the sales table.";

const STATS = [
  { num: 3, unit: "Chapters",        label: "Dedicated to Sales Frameworks"   },
  { num: 5, unit: "Closing Scripts", label: "Ready to Use From Day One"        },
  { num: 1, unit: "System",          label: "That Works Without Cold Chasing"  },
];

function StatItem({ num, unit, label, trigger }: { num: number; unit: string; label: string; trigger: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <p className={`sa2-num text-5xl font-black tabular-nums sm:text-6xl ${done ? "sa2-pulsed" : ""}`} style={{ color: GOLD }}>
        {trigger ? <CountUp start={0} end={num} duration={1.8} useEasing onEnd={() => setDone(true)} /> : "0"}
      </p>
      <p className="text-[12px] font-black uppercase tracking-widest" style={{ color: NAVY }}>{unit}</p>
      <p className="max-w-[140px] text-[12px] leading-snug" style={{ color: "#707088" }}>{label}</p>
    </div>
  );
}

export function SaleSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: qRef,     inView: qIn     } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { ref: pillRef,  inView: pillIn  } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: statRef,  inView: statIn  } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <>
      <style>{`
        @keyframes sa2-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sa2-left {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .sa2-hd { opacity: 0; }
        .sa2-hd.sa2-in { animation: sa2-up 0.55s ease-out both; }
        .sa2-hd1.sa2-in { animation-delay: .05s; }
        .sa2-hd2.sa2-in { animation-delay: .16s; }
        .sa2-hd3.sa2-in { animation-delay: .26s; }

        /* Quote block */
        .sa2-quote-wrap { opacity: 0; }
        .sa2-quote-wrap.sa2-in { animation: sa2-up 0.65s ease-out 0.1s both; }

        /*
         * Floating pull-quote mark instead of an in-flow glyph — serif
         * quote characters carry a lot of built-in headroom above the
         * visible stroke, which was reading as dead space at the top
         * of the card. Taking it out of flow removes that gap.
         */
        .sa2-qmark {
          position: absolute;
          top: -18px;
          left: 4px;
          font-size: clamp(64px, 9vw, 112px);
          line-height: 0.75;
          color: ${GOLD};
          font-family: Georgia, "Times New Roman", serif;
          opacity: 0.85;
          user-select: none;
          pointer-events: none;
        }

        .sa2-qtext {
          position: relative;
          font-size: clamp(1.25rem, 2.5vw + 0.5rem, 2rem);
          font-weight: 700;
          font-style: italic;
          line-height: 1.4;
          color: ${NAVY};
          font-family: var(--font-playfair);
        }

        /*
         * List panel — deliberately not a card grid. Framework already
         * owns the "giant gold numeral in a white card" motif; reusing it
         * here made the two sections feel identical, so this is a single
         * bordered panel with numbered rows instead.
         */
        .sa2-list {
          border:        1px solid rgba(0,0,37,0.08);
          border-radius: 16px;
          overflow:      hidden;
          background:    #ffffff;
        }

        .sa2-row {
          display:       flex;
          gap:           20px;
          align-items:   flex-start;
          padding:       26px 28px;
          border-bottom: 1px solid rgba(0,0,37,0.07);
          opacity:       0;
          transition:    background-color 0.2s ease;
        }
        .sa2-row:last-child { border-bottom: none; }
        .sa2-row.sa2-in { animation: sa2-up 0.5s ease-out both; }
        .sa2-row:hover { background-color: rgba(201,168,76,0.04); }

        .sa2-row-num {
          display:         flex;
          flex-shrink:     0;
          align-items:     center;
          justify-content: center;
          width:           34px;
          height:          34px;
          margin-top:      2px;
          border-radius:   9px;
          background:      rgba(201,168,76,0.12);
          color:           ${GOLD};
          font-size:       13px;
          font-weight:     900;
          font-variant-numeric: tabular-nums;
        }

        /* Stats */
        .sa2-stats { opacity: 0; }
        .sa2-stats.sa2-in { animation: sa2-up 0.5s ease-out 0.1s both; }

        @keyframes sa2-pulse-once {
          0%  { transform: scale(1);    }
          40% { transform: scale(1.14); }
          70% { transform: scale(0.97); }
          100%{ transform: scale(1);    }
        }
        .sa2-num { display: block; transform-origin: center; }
        .sa2-pulsed { animation: sa2-pulse-once 0.4s ease-out; }
      `}</style>

      <section className="bg-white f-section overflow-hidden" aria-label="Phase Two — Sale">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div ref={headRef} className="mx-auto mb-14 max-w-3xl text-center">
            <div className={`sa2-hd sa2-hd1 ${headIn ? "sa2-in" : ""} mb-6`}>
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[11px] font-black tracking-[0.18em] uppercase"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                💰&nbsp; Phase Two: Sale
              </span>
            </div>
            <h2
              className={`sa2-hd sa2-hd2 ${headIn ? "sa2-in" : ""} mb-5 f-h2 font-bold tracking-tight`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              The Difference Between a $3K Client and a $30K Client Is Rarely the Work.
            </h2>
            <p
              className={`sa2-hd sa2-hd3 ${headIn ? "sa2-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "#6B6B80" }}
            >
              It&rsquo;s the offer, the positioning, and the sales conversation. This section rebuilds all three.
            </p>
          </div>

          {/* ── Pull Quote ── */}
          <div
            ref={qRef}
            className={`sa2-quote-wrap ${qIn ? "sa2-in" : ""} mx-auto mb-16 max-w-4xl`}
          >
            <div
              className="relative rounded-2xl px-10 py-10 sm:px-16 sm:py-12"
              style={{
                background: "linear-gradient(135deg, #FAFAF7 0%, #F5F3ED 100%)",
                border: `1px solid rgba(201,168,76,0.18)`,
                boxShadow: "0 4px 32px rgba(0,0,37,0.05)",
              }}
            >
              {/* Decorative vertical gold bar */}
              <div
                className="absolute left-0 top-8 bottom-8 w-1 rounded-full"
                style={{ background: `linear-gradient(to bottom, ${GOLD}, rgba(201,168,76,0.2))` }}
                aria-hidden="true"
              />

              <span className="sa2-qmark" aria-hidden="true">&ldquo;</span>
              <p className="sa2-qtext mt-6 mb-4 sm:mt-8">{QUOTE}</p>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: GOLD }}>
                — Hamid Mahmood, Chapter 14
              </p>
            </div>
          </div>

          {/* ── Numbered list panel ── */}
          <div ref={pillRef} className="sa2-list mx-auto mb-16 max-w-3xl">
            {PILLARS.map(({ num, title, body }, i) => (
              <div
                key={num}
                className={`sa2-row ${pillIn ? "sa2-in" : ""}`}
                style={{ animationDelay: `${0.05 + i * 0.12}s` }}
              >
                <span className="sa2-row-num" aria-hidden="true">{num}</span>
                <div>
                  <h3
                    className="mb-1.5 text-[16px] font-bold leading-snug"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "#6B6B80" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Stats strip ── */}
          <div ref={statRef}>
            <div className="h-px mb-12" style={{ background: "rgba(0,0,37,0.07)" }} aria-hidden="true" />
            <div className={`sa2-stats ${statIn ? "sa2-in" : ""} flex items-start justify-center gap-0`}>
              {STATS.map(({ num, unit, label }, i) => (
                <div key={unit} className="flex items-stretch">
                  <StatItem num={num} unit={unit} label={label} trigger={statIn} />
                  {i < STATS.length - 1 && (
                    <div className="mx-10 my-2 w-px self-stretch" style={{ background: "rgba(0,0,37,0.08)" }} aria-hidden="true" />
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
