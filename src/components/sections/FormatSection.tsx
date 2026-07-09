"use client";

import { useInView } from "react-intersection-observer";
import { CheckCircle2 } from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#000025";

// ─── data ─────────────────────────────────────────────────────────────────────
const formats = [
  {
    id:       "hardcopy",
    label:    "Hardcopy",
    image:    "/book.png",
    imageAlt: "7-Figure Agency Mindset A-Z — Hardcopy edition",
    price:    "$9.99",
    benefits: [
      "Physical copy — read anywhere, no screen required",
      "Annotate, highlight, and revisit chapters easily",
      "Ships worldwide",
      "Ideal for deep reference reading",
    ],
    ctaLabel:    "Order Hardcopy",
    ctaHref:     "https://hamidthepro.com/?add-to-cart=6261&quantity=1",
    featured:    false,
  },
  {
    id:       "ebook",
    label:    "E-book",
    image:    "/book.png",
    imageAlt: "7-Figure Agency Mindset A-Z — E-book edition",
    price:    "$9.99",
    benefits: [
      "Instant access — start reading in under 60 seconds",
      "Read on any device: phone, tablet, laptop",
      "Available on Amazon Kindle",
      "Searchable and portable",
    ],
    ctaLabel: "Get the E-book",
    ctaHref:  "https://hamidthepro.com/?add-to-cart=9853&quantity=1",
    featured: true,
  },
];

// ─── component ────────────────────────────────────────────────────────────────
export function FormatSection() {
  const { ref: headRef,  inView: headIn  } = useInView({ triggerOnce: true, threshold: 0.25 });
  const { ref: cardsRef, inView: cardsIn } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────── */}
      <style>{`
        /* ── header ── */
        @keyframes fs-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fs-head-item { opacity: 0; }
        .fs-head-item.fs-in {
          animation: fs-fade-up 0.6s ease-out both;
        }
        .fs-hd1.fs-in { animation-delay: 0.05s; }
        .fs-hd2.fs-in { animation-delay: 0.18s; }
        .fs-hd3.fs-in { animation-delay: 0.30s; }

        /* ── card slide-in from opposite sides ── */
        @keyframes fs-slide-left {
          from { opacity: 0; transform: translateX(-44px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fs-slide-right {
          from { opacity: 0; transform: translateX(44px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .fs-col-left  { opacity: 0; }
        .fs-col-right { opacity: 0; }

        .fs-col-left.fs-in {
          animation: fs-slide-left 0.7s ease-out both;
        }
        .fs-col-right.fs-in {
          animation: fs-slide-right 0.7s ease-out 0.15s both;
        }

        /* ── e-book gradient border shimmer (3s loop) ── */
        @keyframes fs-border-shimmer {
          0%   { background-position:   0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position:   0% 50%; }
        }
        .fs-ebook-border {
          padding:          2px;
          border-radius:    20px;
          background:       linear-gradient(
            90deg,
            ${GOLD}  0%,
            #FFF3B0 30%,
            #E8C060 50%,
            #FFF3B0 70%,
            ${GOLD} 100%
          );
          background-size:  300% 100%;
          animation:        fs-border-shimmer 3s ease-in-out infinite;
        }

        /* ── shared card styles ── */
        .fs-card {
          border-radius:    18px;
          background:       #ffffff;
          padding:          2rem;
          height:           100%;
          display:          flex;
          flex-direction:   column;
          box-shadow:       0 2px 20px rgba(0,0,37,0.07), 0 1px 4px rgba(0,0,37,0.04);
        }
        .fs-card-plain {
          border-radius:    20px;
          background:       #ffffff;
          padding:          2rem;
          height:           100%;
          display:          flex;
          flex-direction:   column;
          box-shadow:       0 2px 20px rgba(0,0,37,0.07), 0 1px 4px rgba(0,0,37,0.04);
          border:           1.5px solid rgba(0,0,37,0.08);
        }

        /* ── CTA button transitions ── */
        .fs-btn {
          transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fs-btn:hover {
          opacity:    0.9;
          transform:  translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }

        /* ── benefit checkmark colour ── */
        .fs-check { color: ${GOLD}; }
      `}</style>

      <section className="bg-white py-24 sm:py-28" aria-label="Choose your format">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">
            <p
              className={`fs-head-item fs-hd1 ${headIn ? "fs-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}
            >
              Choose Your Format
            </p>

            <h2
              className={`fs-head-item fs-hd2 ${headIn ? "fs-in" : ""} mb-5 text-[36px] font-bold leading-[1.08] tracking-tight sm:text-5xl`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              One Book. Two Formats. Zero Excuses.
            </h2>

            <p
              className={`fs-head-item fs-hd3 ${headIn ? "fs-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "#6B6B80" }}
            >
              Same 30 chapters. Full content in both. Whether you read at your desk or on the go — the only decision left is which format you prefer.
            </p>
          </div>

          {/* ── Two format cards ────────────────────────────────────── */}
          {/* pt-8 on both columns reserves space for the e-book badge */}
          <div ref={cardsRef} className="grid gap-8 pt-8 sm:grid-cols-2">

            {formats.map(({ id, label, image, imageAlt, price, benefits, ctaLabel, ctaHref, featured }) => {
              const col = id === "hardcopy" ? "fs-col-left" : "fs-col-right";

              return (
                <div
                  key={id}
                  className={`${col} ${cardsIn ? "fs-in" : ""} relative`}
                >
                  {/* "Most Popular" badge — e-book only */}
                  {featured && (
                    <div
                      className="absolute -top-8 left-0 right-0 flex justify-center"
                      aria-label="Most Popular"
                    >
                      <span
                        className="rounded-full px-5 py-1.5 text-[11px] font-black tracking-[0.18em] uppercase shadow-md"
                        style={{ backgroundColor: GOLD, color: NAVY }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Gradient shimmer border wraps ONLY the e-book card */}
                  {featured ? (
                    <div className="fs-ebook-border h-full">
                      <CardInner
                        image={image}
                        imageAlt={imageAlt}
                        label={label}
                        price={price}
                        benefits={benefits}
                        ctaLabel={ctaLabel}
                        ctaHref={ctaHref}
                        featured={featured}
                        cardClass="fs-card"
                      />
                    </div>
                  ) : (
                    <CardInner
                      image={image}
                      imageAlt={imageAlt}
                      label={label}
                      price={price}
                      benefits={benefits}
                      ctaLabel={ctaLabel}
                      ctaHref={ctaHref}
                      featured={featured}
                      cardClass="fs-card-plain"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Disclaimer ──────────────────────────────────────────── */}
          <p
            className="mt-8 text-center text-[13px] leading-relaxed"
            style={{ color: "#9898A8" }}
          >
            Both formats include the complete 30-chapter book. No chapters locked or split
            between editions.
          </p>

        </div>
      </section>
    </>
  );
}

// ─── card inner (extracted to avoid duplicating JSX) ─────────────────────────
function CardInner({
  image, imageAlt, label, price, benefits, ctaLabel, ctaHref, featured, cardClass,
}: {
  image: string; imageAlt: string; label: string; price: string;
  benefits: string[]; ctaLabel: string; ctaHref: string;
  featured: boolean; cardClass: string;
}) {
  const GOLD = "#C9A84C";
  const NAVY = "#000025";

  return (
    <div className={cardClass}>
      {/* Book image — hardcopy gets a warm shadow + slight tilt, ebook gets a gold glow */}
      <div className="mb-6 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          width={220}
          height={280}
          className="h-[200px] w-auto rounded-xl object-cover"
          style={featured ? {
            boxShadow: "0 16px 48px rgba(201,168,76,0.28), 0 4px 16px rgba(201,168,76,0.12)",
            transform: "rotate(-1deg) scale(1.03)",
          } : {
            boxShadow: "0 16px 40px rgba(0,0,37,0.2), 0 4px 10px rgba(0,0,37,0.1)",
            transform: "rotate(1.5deg)",
            filter: "brightness(0.96) saturate(0.9)",
          }}
        />
      </div>

      {/* Format name */}
      <h3
        className="mb-1 text-[26px] font-bold"
        style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
      >
        {label}
      </h3>

      {/* Price */}
      <p
        className="mb-5 text-[28px] font-black"
        style={{ color: GOLD }}
      >
        {price}
      </p>

      {/* Benefits list */}
      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <CheckCircle2
              className="fs-check mt-0.5 h-4 w-4 shrink-0"
              strokeWidth={2}
            />
            <span className="text-[14px] leading-snug" style={{ color: "#4A4A5C" }}>
              {b}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fs-btn block rounded-xl py-3.5 text-center text-[15px] font-black tracking-wide"
        style={
          featured
            ? { backgroundColor: GOLD, color: NAVY }
            : { backgroundColor: NAVY, color: "#ffffff" }
        }
      >
        {ctaLabel}
      </a>
    </div>
  );
}
