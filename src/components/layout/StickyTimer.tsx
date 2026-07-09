"use client";

import { useState, useEffect } from "react";

// â”€â”€â”€ constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const GOLD  = "#C9A84C";
const NAVY  = "#000025";
const TOTAL = 30 * 24 * 60 * 60; // 30 days in seconds â€” resets on zero

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// â”€â”€â”€ component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

  // Last 24 hrs â€” digits shift to red
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

        /* â”€â”€ digit box â”€â”€ */
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

        /* â”€â”€ CTA â”€â”€ */
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

        /* â”€â”€ blinking "Hurry Up!" â”€â”€ */
        @keyframes st-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .st-hurry { animation: st-blink 1.3s ease-in-out infinite; }
      `}</style>

      {/* â”€â”€ Full-width sticky bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className={`st-bar ${visible ? "st-on" : ""}`}
        role="banner"
        aria-label="Limited time offer"
      >
        {/* No max-width â€” content fills full strip with only side padding */}
        <div className="flex h-[64px] w-full items-center justify-between gap-4 px-4 sm:px-8">

          {/* Left â€” blinking label */}
          <div className="st-hurry hidden shrink-0 items-center gap-2 sm:flex">
            <span style={{ fontSize: "16px" }} aria-hidden="true">âš¡</span>
            <span
              className="text-[12px] font-black tracking-[0.14em] uppercase"
              style={{ color: GOLD }}
            >
              Hurry Up!
            </span>
          </div>

          {/* Centre â€” message */}
          <p className="flex-1 text-center text-[13px] font-bold leading-tight text-white sm:text-[14px]">
            <span className="sm:hidden">âš¡ </span>
            Grab your copy â€” price resets when the timer hits zero
          </p>

          {/* Right â€” 4-unit timer + CTA */}
          <div className="flex shrink-0 items-center gap-3">

            {/* Timer: DAYS Â· HOURS Â· MINS Â· SECS */}
            <div
              className="flex items-center gap-1"
              aria-live="polite"
              aria-label={`${days} days ${hours} hours ${mins} minutes ${sec} seconds remaining`}
            >
              {/* DAYS */}
              <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
                <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(days)}</span>
                <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Days</span>
              </div>

              <span className="st-sep" aria-hidden="true">:</span>

              {/* HOURS */}
              <div className={`st-box ${isUrgent ? "st-urgent" : ""} ${pulse ? "st-pulse" : ""}`}>
                <span className={`st-num ${isUrgent ? "st-urgent" : ""}`}>{pad(hours)}</span>
                <span className={`st-lbl ${isUrgent ? "st-urgent" : ""}`}>Hours</span>
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

            {/* CTA button */}
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="st-cta hidden sm:inline-block"
            >
              Get the Book â€” $9.99&nbsp;â†’
            </a>
          </div>

        </div>
      </div>

      {/* Spacer â€” same height as bar */}
      <div className="h-[64px]" aria-hidden="true" />
    </>
  );
}


