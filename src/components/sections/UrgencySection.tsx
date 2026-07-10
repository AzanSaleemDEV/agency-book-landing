"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Flame, Zap } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#000025";

const TOTAL = 30 * 24 * 60 * 60;
function pad(n: number) { return String(n).padStart(2, "0"); }

export function UrgencySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [secs, setSecs] = useState(TOTAL);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => (s <= 1 ? TOTAL : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const days  = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins  = Math.floor((secs % 3600) / 60);
  const sec   = secs % 60;

  return (
    <>
      <style>{`
        /* Section gradient — deep navy with gold undertone */
        .ug-section {
          background: linear-gradient(
            160deg,
            #000D38 0%,
            #00082A 28%,
            #000520 55%,
            ${NAVY} 100%
          );
          position: relative;
          overflow: hidden;
        }

        /* Subtle noise texture overlay */
        .ug-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Radial glow from top-center — gold */
        .ug-glow {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          background: radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.14) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* Stagger animations */
        @keyframes ug-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ug-item { opacity: 0; }
        .ug-item.ug-in { animation: ug-rise 0.55s ease-out both; }
        .ug-d1.ug-in { animation-delay: 0.05s; }
        .ug-d2.ug-in { animation-delay: 0.16s; }
        .ug-d3.ug-in { animation-delay: 0.28s; }
        .ug-d4.ug-in { animation-delay: 0.40s; }
        .ug-d5.ug-in { animation-delay: 0.52s; }
        .ug-d6.ug-in { animation-delay: 0.64s; }

        /* OFFER ENDS badge */
        .ug-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.35);
          border-radius: 100px;
          padding: 8px 20px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${GOLD};
        }

        /* Price display */
        .ug-price-old {
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 600;
          color: rgba(255,255,255,0.3);
          text-decoration: line-through;
          text-decoration-color: rgba(255,255,255,0.3);
        }
        .ug-price-new {
          font-size: clamp(3.5rem, 8vw + 1rem, 7rem);
          font-weight: 900;
          color: ${GOLD};
          line-height: 1;
          letter-spacing: -0.03em;
          text-shadow: 0 0 60px rgba(201,168,76,0.35);
        }
        .ug-price-label {
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Divider line */
        .ug-rule {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent);
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
        }

        /* Timer */
        .ug-timer-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .ug-tbox {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: clamp(56px, 10vw, 76px);
          padding: 12px 10px 8px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 10px;
          backdrop-filter: blur(4px);
        }
        .ug-tnum {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ug-tlbl {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-top: 5px;
        }
        .ug-tsep {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 900;
          color: rgba(201,168,76,0.5);
          padding-bottom: 14px;
          align-self: center;
        }

        /* CTA button — shimmer effect */
        @keyframes ug-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ug-pulse-glow {
          0%, 100% { box-shadow: 0 8px 32px rgba(201,168,76,0.4), 0 0 0 0 rgba(201,168,76,0.3); }
          50%       { box-shadow: 0 16px 48px rgba(201,168,76,0.6), 0 0 0 8px rgba(201,168,76,0); }
        }
        .ug-cta-btn {
          position: relative;
          display: block;
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
          padding: 22px 32px;
          border-radius: 14px;
          font-size: clamp(15px, 2vw, 18px);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-align: center;
          text-decoration: none;
          color: ${NAVY};
          background: linear-gradient(
            105deg,
            ${GOLD} 0%,
            #E8C96A 40%,
            ${GOLD} 50%,
            #B8901C 65%,
            ${GOLD} 100%
          );
          background-size: 200% auto;
          animation: ug-shimmer 3.5s linear infinite, ug-pulse-glow 2.5s ease-in-out infinite;
          transition: transform 0.2s ease, opacity 0.2s ease;
          overflow: hidden;
        }
        .ug-cta-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 60%);
          border-radius: 14px;
          pointer-events: none;
        }
        .ug-cta-btn:hover {
          transform: translateY(-3px) scale(1.01);
          opacity: 0.94;
        }

        /* Payment pills */
        .ug-pay-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 7px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          white-space: nowrap;
        }

        /* Urgency text blink */
        @keyframes ug-blink {
          0%, 80%, 100% { opacity: 1; }
          40%            { opacity: 0.3; }
        }
        .ug-dot-blink {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${GOLD};
          animation: ug-blink 1.8s ease-in-out infinite;
          vertical-align: middle;
          margin-right: 6px;
        }
      `}</style>

      <section
        ref={ref}
        className="ug-section f-section"
        aria-label="Limited time offer"
      >
        {/* Background effects */}
        <div className="ug-noise" aria-hidden="true" />
        <div className="ug-glow"  aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center">

          {/* Badge */}
          <div className={`ug-item ug-d1 ${inView ? "ug-in" : ""} mb-8`}>
            <span className="ug-badge">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              Limited-Time Launch Price
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          {/* Headline */}
          <h2
            className={`ug-item ug-d2 ${inView ? "ug-in" : ""} mb-3 f-h2 font-black tracking-tight text-white`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Get the Complete A-to-Z System
          </h2>
          <p
            className={`ug-item ug-d2 ${inView ? "ug-in" : ""} mb-10 text-[16px] font-medium`}
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            The full framework. One price. Zero recurring fees.
          </p>

          {/* Big price */}
          <div className={`ug-item ug-d3 ${inView ? "ug-in" : ""} mb-10`}>
            <p className="ug-price-old mb-2">Usually $99</p>
            <p className="ug-price-new">$9.99</p>
            <p className="ug-price-label mt-3">One-Time Payment &mdash; Instant Access</p>
          </div>

          <div className="ug-rule mb-10" aria-hidden="true" />

          {/* Countdown */}
          <div className={`ug-item ug-d4 ${inView ? "ug-in" : ""} mb-10`}>
            <p className="mb-5 text-[13px] font-black uppercase tracking-[0.16em]" style={{ color: GOLD }}>
              <span className="ug-dot-blink" aria-hidden="true" />
              Offer expires in
            </p>
            <div className="ug-timer-wrap">
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

          {/* CTA */}
          <div className={`ug-item ug-d5 ${inView ? "ug-in" : ""} mb-5`}>
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="ug-cta-btn"
            >
              <Zap className="mr-2 inline-block h-4 w-4 align-text-bottom" aria-hidden="true" />
              Claim Your Copy — $9.99
              <Zap className="ml-2 inline-block h-4 w-4 align-text-bottom" aria-hidden="true" />
            </a>
          </div>

          {/* Payment methods */}
          <div className={`ug-item ug-d5 ${inView ? "ug-in" : ""} mb-8 flex flex-wrap items-center justify-center gap-2`}>
            {["💳 Visa", "💳 Mastercard", "💳 Amex", "🅿️ PayPal", "🔒 Stripe"].map(p => (
              <span key={p} className="ug-pay-pill">{p}</span>
            ))}
          </div>

          {/* Secure note */}
          <p
            className={`ug-item ug-d6 ${inView ? "ug-in" : ""} text-[12px]`}
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            🔒 256-bit SSL encryption &nbsp;&middot;&nbsp; Instant e-book delivery &nbsp;&middot;&nbsp; Ships worldwide
          </p>

        </div>
      </section>
    </>
  );
}
