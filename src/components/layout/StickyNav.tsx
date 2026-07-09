"use client";

import { useState, useEffect } from "react";

const GOLD = "#C9A84C";
const NAVY = "#000025";

export function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling 420px (past the hero fold)
      setVisible(window.scrollY > 420);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .sn-bar {
          position:      fixed;
          inset-x:       0;
          top:           64px; /* sits directly below StickyTimer */
          z-index:       299;
          background:    rgba(0, 0, 37, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,168,76,0.18);
          transform:     translateY(-110%);
          transition:    transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .sn-bar.sn-on { transform: translateY(0); }

        .sn-inner {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          height:          52px;
          padding:         0 16px;
          max-width:       1280px;
          margin:          0 auto;
        }

        /* Title */
        .sn-title {
          font-size:      13px;
          font-weight:    800;
          letter-spacing: 0.01em;
          color:          #ffffff;
          white-space:    nowrap;
          overflow:       hidden;
          text-overflow:  ellipsis;
          max-width:      55vw;
          line-height:    1.2;
        }
        .sn-title span {
          color:       ${GOLD};
          font-weight: 900;
        }

        /* CTA button */
        .sn-cta {
          display:         inline-flex;
          align-items:     center;
          gap:             6px;
          background:      ${GOLD};
          color:           ${NAVY};
          border-radius:   10px;
          padding:         9px 18px;
          font-size:       13px;
          font-weight:     900;
          letter-spacing:  0.04em;
          white-space:     nowrap;
          text-decoration: none;
          flex-shrink:     0;
          box-shadow:      0 4px 14px rgba(201,168,76,0.35);
          transition:      opacity 0.2s ease, transform 0.2s ease;
        }
        .sn-cta:hover {
          opacity:   0.88;
          transform: translateY(-1px);
        }

        /* Star rating row */
        .sn-stars {
          font-size:   11px;
          color:       rgba(255,255,255,0.45);
          margin-top:  1px;
          letter-spacing: 0.01em;
        }
        .sn-stars b { color: ${GOLD}; }
      `}</style>

      <nav
        className={`sn-bar ${visible ? "sn-on" : ""}`}
        aria-label="Quick navigation"
      >
        <div className="sn-inner">

          {/* Left — book title + micro rating */}
          <div className="flex flex-col">
            <p className="sn-title">
              7-Figure&nbsp;<span>Agency Mindset</span>
            </p>
            <p className="sn-stars">
              <b>★★★★★</b>&nbsp; 5.0 · Agency Owners&apos; #1 Read
            </p>
          </div>

          {/* Right — CTA */}
          <a
            href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
            target="_blank"
            rel="noopener noreferrer"
            className="sn-cta"
          >
            Get it — $9.99
          </a>

        </div>
      </nav>

      {/* No extra spacer — the bar overlays content (same as StickyTimer) */}
    </>
  );
}
