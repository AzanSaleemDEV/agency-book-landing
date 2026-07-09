"use client";

import { useInView } from "react-intersection-observer";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";

// ─── trust items ──────────────────────────────────────────────────────────────
const TRUST = [
  { emoji: "🔒", label: "Secure Checkout"          },
  { emoji: "📦", label: "Ships Worldwide"           },
  { emoji: "⚡", label: "Instant E-book Delivery"  },
  { emoji: "⭐", label: "Rated 5 Stars"             },
];

// ─── component ────────────────────────────────────────────────────────────────
export function CtaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── shared fade-up ── */
        @keyframes ct-fade-up {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── book entrance ── */
        @keyframes ct-from-left {
          from { opacity: 0; transform: translateX(-54px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ct-from-right {
          from { opacity: 0; transform: translateX(54px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── continuous float (maintains per-element rotation via --rot) ── */
        @keyframes ct-float {
          0%, 100% { transform: translateY(0px)   rotate(var(--rot, 0deg)); }
          50%       { transform: translateY(-11px) rotate(var(--rot, 0deg)); }
        }
        .ct-book-inner {
          animation: ct-float 4s ease-in-out infinite;
          display: inline-block;
        }

        /* Entrance wrappers (opacity:0 until inView) */
        .ct-book-left  { opacity: 0; }
        .ct-book-right { opacity: 0; }
        .ct-book-left.ct-in {
          animation: ct-from-left  0.78s ease-out 0.05s both;
        }
        .ct-book-right.ct-in {
          animation: ct-from-right 0.78s ease-out 0.22s both;
        }

        /* ── headline ── */
        .ct-headline { opacity: 0; }
        .ct-headline.ct-in {
          animation: ct-fade-up 0.7s ease-out 0.18s both;
        }

        /* ── subtext ── */
        .ct-subtext { opacity: 0; }
        .ct-subtext.ct-in {
          animation: ct-fade-up 0.65s ease-out 0.42s both;
        }

        /* ── buttons row ── */
        .ct-btns { opacity: 0; }
        .ct-btns.ct-in {
          animation: ct-fade-up 0.65s ease-out 0.58s both;
        }

        /* ── subtle scale pulse on primary button wrapper (1.0→1.02→1.0 every 3s) ── */
        @keyframes ct-scale-pulse {
          0%,  10%, 100% { transform: scale(1); }
          5%              { transform: scale(1.02); }
        }
        .ct-pulse-wrap {
          display: inline-block;
          animation: ct-scale-pulse 3s ease-in-out 2.2s infinite;
        }
        .ct-pulse-wrap:hover {
          animation-play-state: paused;
        }

        /* Gold primary CTA */
        .ct-btn-gold {
          display:         block;
          border-radius:   14px;
          padding:         18px 36px;
          font-size:       16px;
          font-weight:     900;
          letter-spacing:  0.04em;
          color:           ${NAVY};
          background:      ${GOLD};
          box-shadow:      0 8px 28px rgba(201,168,76,0.32);
          text-decoration: none;
          white-space:     nowrap;
          transition:      transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
        }
        .ct-btn-gold:hover {
          transform:  translateY(-3px);
          box-shadow: 0 16px 40px rgba(201,168,76,0.5);
          opacity:    0.94;
        }

        /* White outline secondary CTA */
        .ct-btn-outline {
          display:         inline-block;
          border-radius:   14px;
          border:          2px solid rgba(255,255,255,0.6);
          padding:         16px 32px;
          font-size:       15px;
          font-weight:     800;
          letter-spacing:  0.03em;
          color:           #ffffff;
          background:      transparent;
          text-decoration: none;
          white-space:     nowrap;
          transition:      border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .ct-btn-outline:hover {
          border-color: rgba(255,255,255,0.95);
          background:   rgba(255,255,255,0.06);
          transform:    translateY(-3px);
        }

        /* ── trust row ── */
        .ct-trust { opacity: 0; }
        .ct-trust.ct-in {
          animation: ct-fade-up 0.55s ease-out 0.75s both;
        }

        /* ── copyright ── */
        .ct-copy { opacity: 0; }
        .ct-copy.ct-in {
          animation: ct-fade-up 0.5s ease-out 0.9s both;
        }

        /* ── eyebrow ── */
        .ct-eyebrow { opacity: 0; }
        .ct-eyebrow.ct-in {
          animation: ct-fade-up 0.5s ease-out 0s both;
        }
      `}</style>

      <section
        id="final-cta"
        ref={ref}
        style={{ backgroundColor: NAVY }}
        className="relative overflow-hidden py-[140px]"
        aria-label="Get the book"
      >
        {/* ── Gold radial glow — static warm presence behind headline ── */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            top:        "-60px",
            left:       "50%",
            transform:  "translateX(-50%)",
            width:      "900px",
            height:     "700px",
            background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)",
            pointerEvents: "none",
            zIndex:     0,
          }}
        />

        {/* ── Faint dot texture (matches BookHero density, very low opacity) ── */}
        <div
          aria-hidden="true"
          style={{
            position:        "absolute",
            inset:           0,
            backgroundImage: "radial-gradient(rgba(201,168,76,0.06) 1px, transparent 1px)",
            backgroundSize:  "28px 28px",
            pointerEvents:   "none",
            zIndex:          0,
          }}
        />

        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Eyebrow */}
          <p
            className={`ct-eyebrow ${inView ? "ct-in" : ""} mb-10 text-center text-[11px] font-black tracking-[0.3em] uppercase`}
            style={{ color: GOLD }}
          >
            One Decision.
          </p>

          {/* ── Book images — float in from opposite sides ─────────── */}
          <div className="mb-10 flex items-end justify-center gap-10 sm:gap-16">

            {/* Hardcopy — slides from left, tilts inward (+3deg so top leans right) */}
            <div
              className={`ct-book-left ${inView ? "ct-in" : ""}`}
            >
              <div
                className="ct-book-inner"
                style={{ "--rot": "3deg" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/book.png"
                  alt="7-Figure Agency Mindset A-Z — Hardcopy"
                  width={200}
                  height={260}
                  className="h-[190px] w-auto rounded-xl sm:h-[220px]"
                  style={{
                    boxShadow: "0 32px 64px rgba(0,0,0,0.65), 0 0 48px rgba(201,168,76,0.08)",
                  }}
                />
                <p
                  className="mt-3 text-center text-[11px] font-semibold tracking-wide"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Hardcopy
                </p>
              </div>
            </div>

            {/* E-book — slides from right, tilts inward (-3deg so top leans left) */}
            <div
              className={`ct-book-right ${inView ? "ct-in" : ""}`}
            >
              <div
                className="ct-book-inner"
                style={{ "--rot": "-3deg", animationDelay: "0.8s" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/book.png"
                  alt="7-Figure Agency Mindset A-Z — E-book"
                  width={200}
                  height={260}
                  className="h-[190px] w-auto rounded-xl sm:h-[220px]"
                  style={{
                    boxShadow: "0 32px 64px rgba(0,0,0,0.65), 0 0 48px rgba(201,168,76,0.08)",
                  }}
                />
                <p
                  className="mt-3 text-center text-[11px] font-semibold tracking-wide"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  E-book
                </p>
              </div>
            </div>
          </div>

          {/* ── Headline ─────────────────────────────────────────────── */}
          <h2
            className={`ct-headline ${inView ? "ct-in" : ""} mx-auto mb-7 max-w-3xl text-center text-[44px] font-bold leading-[1.05] tracking-tight text-white sm:text-[60px] lg:text-[80px]`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Stop Building Your Agency on Instinct.{" "}
            <span style={{ color: GOLD }}>Start Building It on Design.</span>
          </h2>

          {/* ── Subtext ──────────────────────────────────────────────── */}
          <p
            className={`ct-subtext ${inView ? "ct-in" : ""} mx-auto mb-12 max-w-2xl text-center text-[18px] leading-relaxed`}
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            Hamid spent a decade and millions in real agency revenue building what&rsquo;s in this book.
            Every system was tested on real clients, in real markets, with real money on the line.
            You&rsquo;re getting the distilled result for $9.99 — and there&rsquo;s no version of that trade that doesn&rsquo;t make sense.
          </p>

          {/* ── CTA Buttons ──────────────────────────────────────────── */}
          <div
            className={`ct-btns ${inView ? "ct-in" : ""} flex flex-col items-center justify-center gap-4 sm:flex-row`}
          >
            {/* Primary — gold, pulsing wrapper */}
            <div className="ct-pulse-wrap">
              <a
                href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-btn-gold"
              >
                Get the E-book — $9.99
              </a>
            </div>

            {/* Secondary — white outline */}
            <a
              href="https://hamidthepro.com/?add-to-cart=6261&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-btn-outline"
            >
              Order Hardcopy
            </a>
          </div>

          {/* ── Trust row ────────────────────────────────────────────── */}
          <div
            className={`ct-trust ${inView ? "ct-in" : ""} mt-10 flex flex-wrap items-center justify-center gap-x-0 gap-y-2`}
          >
            {TRUST.map(({ emoji, label }, i) => (
              <span key={label} className="flex items-center">
                {/* Item */}
                <span
                  className="flex items-center gap-1.5 px-3 text-[13px] font-medium"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <span aria-hidden="true">{emoji}</span>
                  <span>{label}</span>
                </span>
                {/* Pipe separator — not after last item */}
                {i < TRUST.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-[13px]"
                    style={{ color: "rgba(255,255,255,0.18)" }}
                  >
                    |
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* ── Thin rule ────────────────────────────────────────────── */}
          <div
            className="mx-auto mt-12 h-px max-w-xs"
            style={{ background: "rgba(255,255,255,0.08)" }}
            aria-hidden="true"
          />

          {/* ── Copyright ────────────────────────────────────────────── */}
          <p
            className={`ct-copy ${inView ? "ct-in" : ""} mt-6 text-center text-[12px]`}
            style={{ color: "rgba(255,255,255,0.24)" }}
          >
            &copy; 2026 Hamid The Pro — 7 Figure Agency. All rights reserved.
          </p>

        </div>
      </section>
    </>
  );
}
