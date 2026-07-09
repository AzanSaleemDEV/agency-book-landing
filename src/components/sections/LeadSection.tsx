"use client";

import { useInView } from "react-intersection-observer";
import { Crosshair, Link2, Search, Megaphone, type LucideIcon } from "lucide-react";

// â”€â”€â”€ constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const GOLD = "#C9A84C";
const NAVY = "#000025";

// â”€â”€â”€ card data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const channels: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon:  Crosshair,
    title: "Outbound Prospecting",
    body:  "Direct outreach systems that connect you with decision-makers â€” without spamming, without automation junk, and without burning your reputation.",
  },
  {
    icon:  Link2,
    title: "Referral Systems",
    body:  "Convert your best clients into a structured referral engine. A system that generates warm introductions consistently â€” not just when you get lucky.",
  },
  {
    icon:  Search,
    title: "SEO as a Growth Channel",
    body:  "How agencies can use their own SEO presence as a 24/7 lead generation asset â€” and why most don't, to their detriment.",
  },
  {
    icon:  Megaphone,
    title: "Paid Advertising",
    body:  "High-ROI paid campaigns built specifically for service businesses â€” not e-commerce templates repurposed and hoped for the best.",
  },
];

// â”€â”€â”€ component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function LeadSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: cardsRef, inView: cardsIn } = useInView({ triggerOnce: true, threshold: 0.1  });
  const { ref: stripRef, inView: stripIn } = useInView({ triggerOnce: true, threshold: 0.35 });

  return (
    <>
      {/* â”€â”€ scoped styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <style>{`
        /* â”€â”€ header â”€â”€ */
        @keyframes ld-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ld-head-item { opacity: 0; }
        .ld-head-item.ld-in {
          animation: ld-fade-up 0.6s ease-out both;
        }
        .ld-hd1.ld-in { animation-delay: 0.05s; }
        .ld-hd2.ld-in { animation-delay: 0.18s; }
        .ld-hd3.ld-in { animation-delay: 0.30s; }

        /*
         * Two-layer card approach (same pattern as prior sections):
         *   .ld-wrap  â†’ entrance with stagger delay
         *   .ld-card  â†’ hover with zero delay
         */
        .ld-wrap {
          opacity: 0;
          transform: translateY(28px);
        }
        .ld-wrap.ld-in {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity   0.55s ease-out var(--d, 0s),
            transform 0.55s ease-out var(--d, 0s);
        }

        .ld-card {
          background:    #ffffff;
          border-radius: 14px;
          border:        1px solid rgba(0,0,37,0.07);
          /* reserve left-border space to prevent layout shift on hover */
          border-left:   4px solid transparent;
          padding:       1.75rem;
          height:        100%;
          transition:
            border-left-color 0.2s ease,
            transform         0.22s ease,
            box-shadow        0.22s ease;
        }
        .ld-card:hover {
          border-left-color: ${GOLD};
          transform:         translateY(-5px);
          box-shadow:        0 18px 40px rgba(0,0,37,0.08), 0 4px 10px rgba(0,0,37,0.04);
        }

        /* Icon circle brightens on hover */
        .ld-icon {
          transition: background-color 0.2s ease;
        }
        .ld-card:hover .ld-icon {
          background-color: rgba(201,168,76,0.22);
        }

        /* â”€â”€ diagonal shape at bottom of white area â”€â”€ */
        .ld-diagonal-bridge {
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        .ld-diagonal-bridge svg {
          display: block;
          width: 100%;
        }

        /* â”€â”€ bottom navy strip slides up â”€â”€ */
        @keyframes ld-strip-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ld-strip { opacity: 0; }
        .ld-strip.ld-in {
          animation: ld-strip-up 0.65s ease-out both;
        }
      `}</style>

      <section
        className="overflow-hidden bg-white pb-0 pt-24 sm:pt-28"
        aria-label="Lead generation channels"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">
            <p
              className={`ld-head-item ld-hd1 ${headIn ? "ld-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}
            >
              Chapter Spotlight
            </p>

            <h2
              className={`ld-head-item ld-hd2 ${headIn ? "ld-in" : ""} mb-5 text-[36px] font-bold leading-[1.08] tracking-tight sm:text-5xl`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              Most Agencies Wait for Referrals. The Ones That Scale Don't Wait for Anything.
            </h2>

            <p
              className={`ld-head-item ld-hd3 ${headIn ? "ld-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "#6B6B80" }}
            >
              No pipeline, no agency. This section breaks down the four client acquisition channels that actually work for service businesses â€” with the exact approach for each one, not theory.
            </p>
          </div>

          {/* â”€â”€ 2 Ã— 2 card grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div
            ref={cardsRef}
            className="grid gap-5 sm:grid-cols-2"
          >
            {channels.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className={`ld-wrap ${cardsIn ? "ld-in" : ""}`}
                style={{ "--d": `${i * 0.12}s` } as React.CSSProperties}
              >
                <div className="ld-card">
                  {/* Gold icon circle */}
                  <div
                    className="ld-icon mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(201,168,76,0.14)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: GOLD }}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2.5 text-[18px] font-bold leading-snug"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </h3>

                  {/* Body */}
                  <p className="text-[15px] leading-relaxed" style={{ color: "#6B6B80" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* â”€â”€ Diagonal bridge + full-width navy strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {/* SVG diagonal separator â€” full viewport width */}
        <div className="ld-diagonal-bridge mt-16" aria-hidden="true">
          <svg
            viewBox="0 0 1440 52"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="0,52 1440,0 1440,52" fill={NAVY} />
          </svg>
        </div>

        {/* Navy strip */}
        <div
          ref={stripRef}
          className={`ld-strip ${stripIn ? "ld-in" : ""}`}
          style={{ backgroundColor: NAVY }}
        >
          <div className="mx-auto max-w-2xl px-4 pb-20 pt-10 text-center sm:px-6 lg:px-8">
            {/* Bold statement */}
            <p
              className="mb-3 text-[26px] font-bold leading-snug sm:text-3xl"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-playfair)" }}
            >
              Bad clients cost more than no clients.
              <br className="hidden sm:block" /> This book shows you how to stop attracting them.
            </p>

            {/* Gold subtext */}
            <p
              className="mb-8 text-[15px] font-medium"
              style={{ color: GOLD }}
            >
              Build a lead engine that brings in the right work â€” consistently, on your terms.
            </p>

            {/* CTA */}
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl px-9 py-4 text-[15px] font-black tracking-wide transition-opacity hover:opacity-90"
              style={{
                backgroundColor: GOLD,
                color:           NAVY,
                boxShadow:       "0 8px 24px rgba(201,168,76,0.25)",
              }}
            >
              Build My Pipeline â€” $9.99
            </a>
          </div>
        </div>

      </section>
    </>
  );
}


