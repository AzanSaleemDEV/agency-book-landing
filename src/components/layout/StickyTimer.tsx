"use client";

import { useState, useEffect } from "react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD  = "#C9A84C";
const NAVY  = "#000025";
const TOTAL = 15 * 60 * 60; // 15 hours in seconds

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ─── component ────────────────────────────────────────────────────────────────
export function StickyTimer() {
  const [secs,    setSecs]    = useState(TOTAL);
  const [visible, setVisible] = useState(false);
  const [pulse,   setPulse]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(s => {
        if (s <= 1) {
          setPulse(true);
          setTimeout(() => setPulse(false), 700);
          return TOTAL;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const days  = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins  = Math.floor((secs % 3600) / 60);
  const sec   = secs % 60;

  // Last 24 hrs — digits shift to red
  const isUrgent = days === 0;

  return (
    <>
      <style>{`
        .st-bar {
          position:      fixed;
          inset-x:       0;
          top:           0;
          z-index:       300;
          width:         100%;
          background:    ${NAVY};
          border-bottom: 1.5px solid rgba(201,168,76,0.25);
          box-shadow:    0 4px 28px rgba(0,0,0,0.5);
          transform:     translateY(-110%);
          transition:    transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .st-bar.st-on { transform: translateY(0); }

        /* ── digit box ── */
        .st-box {
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          background:      rgba(201,168,76,0.1);
          border:          1px solid rgba(201,168,76,0.3);
          border-radius:   6px;
          padding:         3px 10px 2px;
          min-width:       46px;
          transition:      background 0.3s ease, border-color 0.3s ease;
        }
        .st-box.st-urgent { background: rgba(220,50,50,0.15); border-color: rgba(220,50,50,0.45); }
        .st-box.st-pulse  { background: rgba(220,50,50,0.32); }

        .st-num {
          font-size:            21px;
          font-weight:          900;
          line-height:          1;
          font-variant-numeric: tabular-nums;
          letter-spacing:       0.02em;
          color:                ${GOLD};
          transition:           color 0.3s ease;
        }
        .st-num.st-urgent { color: #FF6060; }

        .st-lbl {
          font-size:      8px;
          font-weight:    700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color:          rgba(201,168,76,0.52);
          margin-top:     2px;
        }
        .st-lbl.st-urgent { color: rgba(255,96,96,0.6); }

        .st-sep {
          font-size:    20px;
          font-weight:  900;
          color:        rgba(201,168,76,0.4);
          margin:       0 2px;
          padding-bottom: 10px;
          align-self:   center;
        }

        /* ── CTA ── */
        .st-cta {
          display:         inline-block;
          background:      ${GOLD};
          color:           ${NAVY};
          border-radius:   8px;
          padding:         9px 22px;
          font-size:       13px;
          font-weight:     900;
          letter-spacing:  0.04em;
          white-space:     nowrap;
          text-decoration: none;
          flex-shrink:     0;
          box-shadow:      0 4px 16px rgba(201,168,76,0.32);
          transition:      opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .st-cta:hover {
          opacity:    0.88;
          transform:  translateY(-1px);
          box-shadow: 0 8px 22px rgba(201,168,76,0.48);
        }

        /* ── blinking "Hurry Up!" ── */
        @keyframes st-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .st-hurry { animation: st-blink 1.3s ease-in-out infinite; }
      `}</style>

      {/* ── Full-width sticky bar ───────────────────────────────────── */}
      <div
        className={`st-bar ${visible ? "st-on" : ""}`}
        role="banner"
        aria-label="Limited time offer"
      >
        <div className="flex h-[64px] w-full items-center px-4 sm:px-8"
          style={{ gap: "0" }}>

          {/* ── MOBILE layout: ⚡ | spacer | MINS:SECS | Buy button ── */}

          {/* Left bolt — mobile only */}
          <span
            className="st-hurry mr-2 text-[18px] sm:hidden"
            aria-hidden="true"
          >⚡</span>

          {/* Desktop "Hurry Up!" label */}
          <div className="st-hurry hidden shrink-0 items-center gap-2 sm:flex">
            <span style={{ fontSize: "16px" }} aria-hidden="true">⚡</span>
            <span
              className="text-[12px] font-black tracking-[0.14em] uppercase"
              style={{ color: GOLD }}
            >
              Hurry Up!
            </span>
          </div>

          {/* Centre text — desktop only, never wraps */}
          <p className="hidden flex-1 overflow-hidden truncate whitespace-nowrap text-center text-[13px] font-bold text-white sm:block">
            Hurry — price resets at zero!
          </p>

          {/* Mobile spacer pushes timer + button to right */}
          <div className="flex-1 sm:hidden" />

          {/* Timer */}
          <div
            className="flex shrink-0 items-center gap-1"
            aria-live="polite"
            aria-label={`${days} days ${hours} hours ${mins} minutes ${sec} seconds remaining`}
          >
            {/* HOURS — always visible */}
            <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
              <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(hours)}</span>
              <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Hrs</span>
            </div>
            <span className="st-sep" aria-hidden="true">:</span>

            {/* MINS */}
            <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
              <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(mins)}</span>
              <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Mins</span>
            </div>
            <span className="st-sep" aria-hidden="true">:</span>
            {/* SECS */}
            <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
              <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(sec)}</span>
              <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Secs</span>
            </div>
          </div>

          {/* CTA — short on mobile, full text on desktop */}
          <a
            href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
            target="_blank"
            rel="noopener noreferrer"
            className="st-cta ml-3"
          >
            <span className="sm:hidden">Get it $9.99</span>
            <span className="hidden sm:inline">Get the Book — $9.99&nbsp;→</span>
          </a>

        </div>
      </div>

      {/* Spacer — same height as bar */}
      <div className="h-[64px]" aria-hidden="true" />
    </>
  );
}
