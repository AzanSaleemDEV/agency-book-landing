const GOLD = "#C9A84C";
const NAVY = "#000025";
const WHITE = "#FFFFFF";

const bullets = [
  "The complete 7-Figure Agency Mindset A-Z blueprint for building a profitable digital marketing agency",
  "Covers every stage: niche selection, client acquisition, team building, and scaling systems",
  "Available in E-book (instant) and Hardcopy, both for $9.99",
];

export function BookHero() {
  return (
    <>
      {/* ── scoped styles ───────────────────────────────────────────────── */}
      <style>{`
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

        /* Diagonal color-split panel — echoes the diagonal bridges used
           between other sections, instead of a generic dot-grid */
        .bh-diagonal {
          position: absolute;
          inset: 0;
          left: 32%;
          background: linear-gradient(150deg, #000A3E 0%, #000625 60%, ${NAVY} 100%);
          clip-path: polygon(22% 0, 100% 0, 100% 100%, 0% 100%);
          pointer-events: none;
        }

        /* Subtle film-grain texture — adds a tactile, printed feel */
        .bh-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }

        /* Stagger helpers — opacity:0 + fill-mode:both keeps them hidden until anim starts */
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

      {/* ── section ─────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: NAVY }}
        className="relative overflow-hidden f-section-lg"
        aria-label="Hero"
      >
        {/* Diagonal color-split panel behind the book column */}
        <div className="bh-diagonal hidden lg:block" aria-hidden="true" />

        {/* Film-grain texture */}
        <div className="bh-noise" aria-hidden="true" />

        {/* Radial vignette — softens edges */}
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

            {/* ── LEFT COLUMN ───────────────────────────────────────────── */}
            <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">

              {/* Badge */}
              <div className="bh-item bh-d1 text-center lg:text-left">
                <span
                  style={{ backgroundColor: GOLD, color: NAVY }}
                  className="inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.1em] uppercase sm:text-[11px] sm:tracking-[0.2em]"
                >
                  The Agency Owner&apos;s Operating Manual
                </span>
              </div>

              {/* H1 */}
              <h1
                className="bh-item bh-d2 f-hero font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                You Don&apos;t Have an Agency Problem.
                You Have a{" "}
                <span style={{ color: GOLD }}>Systems Problem.</span>
              </h1>

              {/* Subheadline */}
              <p
                className="bh-item bh-d3 f-sub"
                style={{ color: "#A8A8C0" }}
              >
                7-Figure Agency Mindset A-Z is the playbook for digital marketing agency owners who are
                done improvising and ready to build, sell, and scale with a
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
              <div className="bh-item bh-d5 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <a
                  href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: GOLD, color: NAVY }}
                  className="rounded-xl px-7 py-3.5 text-[15px] font-black tracking-wide shadow-lg transition-opacity hover:opacity-90"
                >
                  Get Your Copy for $9.99
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
                🔒 Secure Checkout&nbsp;&nbsp;·&nbsp;&nbsp;
                📦 Ships Worldwide&nbsp;&nbsp;·&nbsp;&nbsp;
                ⚡ Instant E-book Access
              </p>
            </div>

            {/* ── RIGHT COLUMN ──────────────────────────────────────────── */}
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
                    src="/assets/book.png"
                    alt="7-Figure Agency Mindset A-Z book cover"
                    width={420}
                    height={560}
                    className="relative z-10 w-[230px] rounded-lg sm:w-[280px] lg:w-[350px]"
                    style={{
                      boxShadow:
                        "0 48px 80px rgba(0,0,0,0.55), 0 0 64px rgba(201,168,76,0.12)",
                    }}
                  />

                  {/* Bestseller badge — top-left of book */}
                  <div
                    className="absolute -top-3 -left-4 z-20 rounded-full px-3 py-1.5 text-[10px] font-black shadow-xl"
                    style={{
                      backgroundColor: GOLD,
                      color: NAVY,
                    }}
                  >
                    #1 BESTSELLER
                  </div>

                  {/* Overlay badge — bottom-right of book */}
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
