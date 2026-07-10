"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const GOLD  = "#C9A84C";
const NAVY  = "#000025";
const RED   = "#D93025";

const TOTAL = 30 * 24 * 60 * 60;
function pad(n: number) { return String(n).padStart(2, "0"); }

export function UrgencySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const [secs, setSecs] = useState(TOTAL);
  useEffect(() => {
    const id = setInterval(() => {
      setSecs(s => (s <= 1 ? TOTAL : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const days  = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins  = Math.floor((secs % 3600) / 60);
  const sec   = secs % 60;

  return (
    <>
      <style>{`
        @keyframes ug-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ug-item { opacity: 0; }
        .ug-item.ug-in { animation: ug-fade-up 0.6s ease-out both; }
        .ug-d1.ug-in { animation-delay: 0.05s; }
        .ug-d2.ug-in { animation-delay: 0.18s; }
        .ug-d3.ug-in { animation-delay: 0.30s; }
        .ug-d4.ug-in { animation-delay: 0.44s; }
        .ug-d5.ug-in { animation-delay: 0.56s; }
        .ug-d6.ug-in { animation-delay: 0.68s; }

        /* Dashed gold border around card */
        .ug-card {
          border: 2px dashed rgba(201,168,76,0.55);
          border-radius: 20px;
          padding: 40px 32px;
          background: rgba(201,168,76,0.04);
          position: relative;
        }

        /* Yellow scarcity strip */
        .ug-strip {
          background: #FFF176;
          border-radius: 8px;
          padding: 14px 20px;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          line-height: 1.5;
        }

        /* Big CTA button */
        @keyframes ug-pulse-btn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.5); }
          50%       { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
        }
        .ug-btn {
          display:         block;
          width:           100%;
          max-width:       480px;
          margin:          0 auto;
          border-radius:   14px;
          padding:         20px 32px;
          font-size:       18px;
          font-weight:     900;
          letter-spacing:  0.04em;
          text-transform:  uppercase;
          color:           ${NAVY};
          background:      ${GOLD};
          text-align:      center;
          text-decoration: none;
          box-shadow:      0 8px 28px rgba(201,168,76,0.45);
          animation:       ug-pulse-btn 2.4s ease-in-out infinite;
          transition:      transform 0.2s ease, opacity 0.2s ease;
        }
        .ug-btn:hover {
          transform: translateY(-3px) scale(1.01);
          opacity: 0.93;
        }

        /* Timer boxes */
        .ug-tbox {
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          background:      ${RED};
          border-radius:   8px;
          padding:         8px 14px 6px;
          min-width:       56px;
        }
        .ug-tnum {
          font-size:   26px;
          font-weight: 900;
          color:       #ffffff;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ug-tlbl {
          font-size:      9px;
          font-weight:    700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color:          rgba(255,255,255,0.75);
          margin-top:     3px;
        }
        .ug-tsep {
          font-size:   22px;
          font-weight: 900;
          color:       ${RED};
          margin:      0 4px;
          padding-bottom: 12px;
          align-self:  center;
        }

        /* Payment icons row */
        .ug-pay-pill {
          display:        inline-flex;
          align-items:    center;
          gap:            6px;
          background:     rgba(255,255,255,0.08);
          border:         1px solid rgba(255,255,255,0.14);
          border-radius:  8px;
          padding:        6px 14px;
          font-size:      12px;
          font-weight:    700;
          color:          rgba(255,255,255,0.65);
          white-space:    nowrap;
        }
      `}</style>

      <section
        ref={ref}
        style={{ backgroundColor: NAVY }}
        className="f-section"
        aria-label="Limited time offer"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

          {/* 🔥 Badge */}
          <div className={`ug-item ug-d1 ${inView ? "ug-in" : ""} mb-6 text-center`}>
            <span
              className="inline-block rounded-full px-5 py-2 text-[12px] font-black tracking-[0.2em] uppercase"
              style={{ backgroundColor: RED, color: "#fff" }}
            >
              🔥 Limited-Time Offer 🔥
            </span>
          </div>

          {/* Card */}
          <div className={`ug-item ug-d2 ${inView ? "ug-in" : ""} ug-card`}>

            {/* Headline */}
            <h2
              className="mb-2 text-center f-h2 font-black tracking-tight text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Build &amp; Scale Your 7-Figure Agency
            </h2>
            <p
              className="mb-8 text-center f-sub font-semibold"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Using Proven Strategies &amp; Systems That Work
            </p>

            {/* Yellow scarcity strip */}
            <div className={`ug-item ug-d3 ${inView ? "ug-in" : ""} ug-strip mb-8`}>
              &ldquo;7-Figure Agency Mindset A-Z&rdquo; at its lowest price ever — may expire once you leave this page!
            </div>

            {/* Price */}
            <div className={`ug-item ug-d4 ${inView ? "ug-in" : ""} mb-8 text-center`}>
              <p className="text-[18px] font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>
                <s style={{ color: "rgba(255,255,255,0.35)" }}>Usually $99</s>
                &nbsp;—&nbsp;
                <span style={{ color: GOLD, fontWeight: 900, fontSize: "22px" }}>$9.99</span>
                &nbsp;
                <span className="text-[14px] font-bold" style={{ color: "rgba(255,255,255,0.55)" }}>(One-Time Payment!)</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className={`ug-item ug-d5 ${inView ? "ug-in" : ""} mb-6`}>
              <a
                href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
                target="_blank"
                rel="noopener noreferrer"
                className="ug-btn"
              >
                Claim Your Copy — $9.99
              </a>
            </div>

            {/* Payment methods */}
            <div className={`ug-item ug-d5 ${inView ? "ug-in" : ""} mb-8 flex flex-wrap items-center justify-center gap-2`}>
              {["💳 Visa", "💳 Mastercard", "💳 Amex", "🅿️ PayPal", "🔒 Stripe"].map(p => (
                <span key={p} className="ug-pay-pill">{p}</span>
              ))}
            </div>

            {/* Divider */}
            <div className="mb-6 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

            {/* Mini countdown */}
            <div className={`ug-item ug-d6 ${inView ? "ug-in" : ""}`}>
              <p
                className="mb-4 text-center text-[13px] font-black uppercase tracking-[0.18em]"
                style={{ color: RED }}
              >
                ⏰ Hurry Up! The Price Shoots Up Every Hour
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="ug-tbox">
                  <span className="ug-tnum">{pad(days)}</span>
                  <span className="ug-tlbl">Days</span>
                </div>
                <span className="ug-tsep">:</span>
                <div className="ug-tbox">
                  <span className="ug-tnum">{pad(hours)}</span>
                  <span className="ug-tlbl">Hours</span>
                </div>
                <span className="ug-tsep">:</span>
                <div className="ug-tbox">
                  <span className="ug-tnum">{pad(mins)}</span>
                  <span className="ug-tlbl">Mins</span>
                </div>
                <span className="ug-tsep">:</span>
                <div className="ug-tbox">
                  <span className="ug-tnum">{pad(sec)}</span>
                  <span className="ug-tlbl">Secs</span>
                </div>
              </div>
            </div>

          </div>

          {/* Guarantee note */}
          <p
            className={`ug-item ug-d6 ${inView ? "ug-in" : ""} mt-6 text-center text-[13px] leading-relaxed`}
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            🔒 Secure checkout · Instant e-book delivery · Ships worldwide
          </p>

        </div>
      </section>
    </>
  );
}
