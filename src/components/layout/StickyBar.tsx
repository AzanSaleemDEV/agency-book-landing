"use client";

import { useState, useEffect, useRef } from "react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";

// ─── component ────────────────────────────────────────────────────────────────
export function StickyBar() {
  const [visible,   setVisible]   = useState(false);
  const [barHeight, setBarHeight] = useState(64);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Keep the spacer in sync with the bar's real height (it changes
  // between the stacked mobile layout and the single-row desktop one).
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setBarHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      `}</style>

      {/* ── Full-width sticky bar ───────────────────────────────────── */}
      <div
        ref={barRef}
        className={`st-bar ${visible ? "st-on" : ""}`}
        role="banner"
        aria-label="Site header"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2.5 px-4 py-3 text-center sm:px-8 lg:h-[64px] lg:flex-row lg:justify-between lg:gap-0 lg:py-0 lg:text-left">

          {/* ── Book title + author credibility ─────────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 lg:flex-nowrap lg:justify-start">
            <span className="flex items-center gap-1.5">
              <span style={{ fontSize: "15px" }} aria-hidden="true">🏆</span>
              <span
                className="text-[11px] font-black tracking-[0.1em] uppercase sm:text-[12px]"
                style={{ color: GOLD }}
              >
                7-Figure Agency Mindset A-Z
              </span>
            </span>
            <span className="text-[12px] font-medium text-white/70 sm:text-[13px]">
              By Hamid Mahmood, Globally Recognized CEO
            </span>
          </div>

          {/* ── CTA ──────────────────────────────────────────────────── */}
          <a
            href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
            target="_blank"
            rel="noopener noreferrer"
            className="st-cta"
          >
            <span className="sm:hidden">Get it $9.99</span>
            <span className="hidden sm:inline">Get the Book for $9.99&nbsp;→</span>
          </a>

        </div>
      </div>

      {/* Spacer — tracks the bar's real (responsive) height */}
      <div style={{ height: barHeight }} aria-hidden="true" />
    </>
  );
}
