const GOLD = "#C9A84C";
const NAVY = "#000025";
const WHITE = "#FFFFFF";

const bullets = [
  "Read by agency owners across 12+ countries â€” from solo operators to 20-person teams",
  "Covers the full agency lifecycle: foundation, client acquisition, scaling, and long-term legacy",
  "Available in E-book (instant) and Hardcopy â€” both for $9.99",
];

export function BookHero() {
  return (
    <>
      {/* â”€â”€ scoped styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <style>{`
        /* Dot-matrix background drift */
        @keyframes bh-grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 32px 32px; }
        }

        /* Stagger fade-up for left column items */
        @keyframes bh-fade-up {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Fade-in from right for book column */
        @keyframes bh-fade-right {
          from { opacity: 0; transform: translateX(36px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Floating book */
        @keyframes bh-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-12px) rotate(-1deg); }
        }

        .bh-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(
            circle,
            rgba(201, 168, 76, 0.055) 1px,
            transparent 1px
          );
          background-size: 32px 32px;
          animation: bh-grid-drift 20s linear infinite;
        }

        /* Stagger helpers â€” opacity:0 + fill-mode:both keeps them hidden until anim starts */
        .bh-item {
          opacity: 0;
          animation-name: bh-fade-up;
          animation-duration: 0.65s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
        .bh-d1  { animation-delay: 0.10s; }
        .bh-d2  { animation-delay: 0.30s; }
        .bh-d3  { animation-delay: 0.50s; }
        .bh-d4  { animation-delay: 0.70s; }
        .bh-d5  { animation-delay: 0.90s; }
        .bh-d6  { animation-delay: 1.10s; }

        .bh-book-col {
          opacity: 0;
          animation: bh-fade-right 0.7s ease-out 0.5s both;
        }

        .bh-float {
          animation: bh-float 4s ease-in-out infinite;
          display: inline-block;
        }

        /* Underline CTA hover for outline button */
        .bh-btn-outline {
          position: relative;
          transition: background-color 0.2s ease;
        }
        .bh-btn-outline:hover {
          background-color: rgba(255,255,255,0.08);
        }
      `}</style>

      {/* â”€â”€ section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        style={{ backgroundColor: NAVY }}
        className="relative overflow-hidden py-[120px]"
        aria-label="Hero"
      >
        {/* Animated dot-matrix background */}
        <div className="bh-grid" aria-hidden="true" />

        {/* Radial vignette â€” softens edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,37,0.6) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* â”€â”€ LEFT COLUMN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="flex flex-col gap-7">

              {/* Badge */}
              <div className="bh-item bh-d1">
                <span
                  style={{ backgroundColor: GOLD, color: NAVY }}
                  className="inline-block rounded-full px-4 py-1.5 text-[11px] font-black tracking-[0.2em] uppercase"
                >
                  The Agency Owner's Operating Manual
                </span>
              </div>

              {/* H1 */}
              <h1
                className="bh-item bh-d2 text-[38px] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[72px]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                You Don't Have an Agency Problem. You Have a Systems Problem.
              </h1>

              {/* Subheadline */}
              <p
                className="bh-item bh-d3 leading-relaxed"
                style={{ color: "#A8A8C0", fontSize: "20px" }}
              >
                The A-to-Z playbook for digital marketing agency owners who are
                done improvising â€” and ready to build, sell, and scale with a
                real operating framework behind them.
              </p>

              {/* Bullets */}
              <ul className="bh-item bh-d4 flex flex-col gap-3">
                {bullets.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[14px] leading-snug"
                    style={{ color: WHITE }}
                  >
                    {/* Gold dot */}
                    <span
                      className="mt-[5px] h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: GOLD }}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="bh-item bh-d5 flex flex-wrap items-center gap-4">
                <a
                  href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: GOLD, color: NAVY }}
                  className="rounded-xl px-7 py-3.5 text-[15px] font-black tracking-wide shadow-lg transition-opacity hover:opacity-90"
                >
                  Get Your Copy â€” $9.99
                </a>

                <a
                  href="https://hamidthepro.com/?add-to-cart=6261&quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bh-btn-outline rounded-xl border-2 px-7 py-3.5 text-[15px] font-bold"
                  style={{ borderColor: WHITE, color: WHITE }}
                >
                  Order Hardcopy
                </a>
              </div>

              {/* Trust line */}
              <p
                className="bh-item bh-d6 text-[13px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                ðŸ”’ Secure Checkout&nbsp;&nbsp;Â·&nbsp;&nbsp;
                ðŸ“¦ Ships Worldwide&nbsp;&nbsp;Â·&nbsp;&nbsp;
                âš¡ Instant E-book Access
              </p>
            </div>

            {/* â”€â”€ RIGHT COLUMN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="bh-book-col flex justify-center lg:justify-end">
              <div className="relative inline-block">

                {/* Gold radial glow behind book */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 scale-[1.18] blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(201,168,76,0.28) 0%, transparent 68%)",
                  }}
                />

                {/* Floating wrapper */}
                <div className="bh-float">
                  {/* Book cover */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/book.png"
                    alt="7-Figure Agency Mindset A-Z â€” book cover"
                    width={420}
                    height={560}
                    className="relative z-10 w-[260px] rounded-lg sm:w-[320px] lg:w-[400px]"
                    style={{
                      boxShadow:
                        "0 48px 80px rgba(0,0,0,0.55), 0 0 64px rgba(201,168,76,0.12)",
                    }}
                  />

                  {/* Overlay badge â€” bottom-right of book */}
                  <div
                    className="absolute -bottom-3 -right-4 z-20 rounded-full px-4 py-2 text-[11px] font-black shadow-xl"
                    style={{
                      backgroundColor: NAVY,
                      color: GOLD,
                      border: `1.5px solid rgba(201,168,76,0.45)`,
                    }}
                  >
                    E-book + Hardcopy
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}


