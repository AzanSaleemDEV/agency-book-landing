"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#000025";
const BG   = "#000D30";

const reviews = [
  { src: "/review1.png", alt: "Facebook review by Umair Amjad" },
  { src: "/review2.png", alt: "Facebook review — reader 2" },
  { src: "/review3.png", alt: "Facebook review — reader 3" },
  { src: "/review4.png", alt: "Facebook review by Muhammad Sufyan Imtiaz" },
  { src: "/review5.png", alt: "Facebook review — reader 5" },
  { src: "/review6.png", alt: "Facebook review — reader 6" },
  { src: "/review7.png", alt: "Facebook review — reader 7" },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  src, alt, onClose, onPrev, onNext,
}: {
  src: string; alt: string;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="ts-lb-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close */}
      <button className="ts-lb-close" onClick={onClose} aria-label="Close">
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      <button
        className="ts-lb-arrow ts-lb-prev"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Image */}
      <div className="ts-lb-img-wrap" onClick={e => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="ts-lb-img" />
      </div>

      {/* Next */}
      <button
        className="ts-lb-arrow ts-lb-next"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { ref: headRef, inView: headIn } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [current,  setCurrent]  = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const total = reviews.length;
  const prev  = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next  = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  const lbPrev = useCallback(() => setLightbox(i => i === null ? null : (i - 1 + total) % total), [total]);
  const lbNext = useCallback(() => setLightbox(i => i === null ? null : (i + 1) % total), [total]);

  // Auto-advance
  useEffect(() => {
    if (lightbox !== null) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, lightbox]);

  // 3 visible cards (wrap-around)
  const indices = [
    (current)              % total,
    (current + 1)          % total,
    (current + 2)          % total,
  ];

  return (
    <>
      <style>{`
        /* header */
        @keyframes ts-up {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .ts-hd { opacity: 0; }
        .ts-hd.ts-in { animation: ts-up 0.6s ease-out both; }
        .ts-hd1.ts-in { animation-delay:.05s; }
        .ts-hd2.ts-in { animation-delay:.18s; }
        .ts-hd3.ts-in { animation-delay:.30s; }

        /* card wrapper */
        .ts-card-wrap {
          position:  relative;
          cursor:    pointer;
          border-radius: 16px;
          overflow:  hidden;
          border:    2px solid rgba(255,255,255,0.08);
          background: #ffffff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
          flex: 1;
          min-width: 0;
        }
        .ts-card-wrap:hover {
          transform:    translateY(-6px) scale(1.015);
          box-shadow:   0 24px 56px rgba(0,0,0,0.55), 0 0 0 2px ${GOLD};
          border-color: ${GOLD};
        }

        /* screenshot image fills card */
        .ts-screenshot {
          width:      100%;
          height:     100%;
          object-fit: cover;
          object-position: top;
          display:    block;
          min-height: 260px;
          max-height: 340px;
        }

        /* zoom icon overlay on hover */
        .ts-zoom-overlay {
          position:        absolute;
          inset:           0;
          background:      rgba(0,0,37,0.0);
          display:         flex;
          align-items:     center;
          justify-content: center;
          transition:      background .22s ease;
        }
        .ts-card-wrap:hover .ts-zoom-overlay {
          background: rgba(0,0,37,0.45);
        }
        .ts-zoom-icon {
          opacity:    0;
          transform:  scale(0.7);
          transition: opacity .22s ease, transform .22s ease;
          background: ${GOLD};
          color:      ${NAVY};
          border-radius: 50%;
          width:  48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ts-card-wrap:hover .ts-zoom-icon {
          opacity:   1;
          transform: scale(1);
        }

        /* Facebook badge on each card */
        .ts-fb-badge {
          position:        absolute;
          top:             10px;
          right:           10px;
          background:      #1877F2;
          color:           #fff;
          font-size:       10px;
          font-weight:     800;
          letter-spacing:  0.08em;
          border-radius:   6px;
          padding:         3px 8px;
          opacity:         0.9;
        }

        /* Nav arrows */
        .ts-arrow {
          display:         flex;
          align-items:     center;
          justify-content: center;
          width:           48px;
          height:          48px;
          border-radius:   50%;
          border:          2px solid rgba(201,168,76,0.45);
          background:      rgba(201,168,76,0.06);
          color:           ${GOLD};
          cursor:          pointer;
          flex-shrink:     0;
          transition:      background .2s, border-color .2s, transform .2s;
        }
        .ts-arrow:hover {
          background:   rgba(201,168,76,0.2);
          border-color: ${GOLD};
          transform:    scale(1.1);
        }

        /* Dots */
        .ts-dot {
          width:         9px;
          height:        9px;
          border-radius: 50%;
          background:    rgba(255,255,255,0.2);
          cursor:        pointer;
          transition:    background .3s, transform .3s;
          border:        none;
        }
        .ts-dot.ts-active {
          background: ${GOLD};
          transform:  scale(1.35);
        }

        /* ── Lightbox ── */
        .ts-lb-overlay {
          position:        fixed;
          inset:           0;
          z-index:         1000;
          background:      rgba(0,0,0,0.92);
          backdrop-filter: blur(10px);
          display:         flex;
          align-items:     center;
          justify-content: center;
          padding:         16px;
          animation:       ts-lb-in .2s ease-out;
        }
        @keyframes ts-lb-in {
          from { opacity:0; }
          to   { opacity:1; }
        }

        .ts-lb-img-wrap {
          max-width:     700px;
          width:         100%;
          animation:     ts-lb-pop .28s cubic-bezier(.22,1,.36,1);
        }
        @keyframes ts-lb-pop {
          from { opacity:0; transform:scale(.88); }
          to   { opacity:1; transform:scale(1);   }
        }
        .ts-lb-img {
          width:         100%;
          border-radius: 16px;
          box-shadow:    0 32px 80px rgba(0,0,0,0.7);
          display:       block;
        }

        /* Lightbox close button */
        .ts-lb-close {
          position:        fixed;
          top:             16px;
          right:           16px;
          width:           40px;
          height:          40px;
          border-radius:   50%;
          background:      rgba(255,255,255,0.1);
          border:          1px solid rgba(255,255,255,0.2);
          color:           #fff;
          display:         flex;
          align-items:     center;
          justify-content: center;
          cursor:          pointer;
          transition:      background .2s;
          z-index:         1001;
        }
        .ts-lb-close:hover { background: rgba(255,255,255,0.22); }

        /* Lightbox side arrows */
        .ts-lb-arrow {
          position:        fixed;
          top:             50%;
          transform:       translateY(-50%);
          width:           48px;
          height:          48px;
          border-radius:   50%;
          background:      rgba(255,255,255,0.1);
          border:          2px solid rgba(255,255,255,0.2);
          color:           #fff;
          display:         flex;
          align-items:     center;
          justify-content: center;
          cursor:          pointer;
          transition:      background .2s;
          z-index:         1001;
        }
        .ts-lb-arrow:hover { background: rgba(255,255,255,0.22); }
        .ts-lb-prev { left:  12px; }
        .ts-lb-next { right: 12px; }
      `}</style>

      <section
        style={{ backgroundColor: BG }}
        className="overflow-hidden f-section"
        aria-label="Reader reviews"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div ref={headRef} className="mx-auto mb-14 max-w-2xl text-center">
            <p className={`ts-hd ts-hd1 ${headIn ? "ts-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}>
              What Readers Are Saying
            </p>
            <h2 className={`ts-hd ts-hd2 ${headIn ? "ts-in" : ""} mb-5 f-h2 font-bold tracking-tight text-white`}
              style={{ fontFamily: "var(--font-playfair)" }}>
              Real Reviews. Real Results.
            </h2>
            <p className={`ts-hd ts-hd3 ${headIn ? "ts-in" : ""} text-[16px] leading-relaxed`}
              style={{ color: "rgba(255,255,255,0.5)" }}>
              Agency owners across 12+ countries sharing their experience.
              <br className="hidden sm:block" />
              Click any review to read it in full.
            </p>
          </div>

          {/* Carousel row */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Left arrow */}
            <button className="ts-arrow shrink-0" onClick={prev} aria-label="Previous review">
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Cards */}
            <div className="flex flex-1 gap-3 sm:gap-5 overflow-hidden">
              {/* Mobile: 1 card | md: 3 cards */}
              {indices.map((idx, pos) => (
                <div
                  key={`${idx}-${pos}`}
                  className={`ts-card-wrap ${pos > 0 ? "hidden md:block" : ""}`}
                  onClick={() => setLightbox(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && setLightbox(idx)}
                  aria-label={reviews[idx].alt}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={reviews[idx].src}
                    alt={reviews[idx].alt}
                    className="ts-screenshot"
                  />
                  {/* Facebook badge */}
                  <div className="ts-fb-badge">📘 Facebook</div>
                  {/* Zoom overlay */}
                  <div className="ts-zoom-overlay">
                    <div className="ts-zoom-icon">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button className="ts-arrow shrink-0" onClick={next} aria-label="Next review">
              <ChevronRight className="h-5 w-5" />
            </button>

          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`ts-dot ${i === current ? "ts-active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Trust stats */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { n: "500+", l: "Copies Sold"     },
              { n: "12+",  l: "Countries"        },
              { n: "4.9★", l: "Average Rating"   },
              { n: "7",    l: "Verified Reviews" },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="text-[24px] font-black" style={{ color: GOLD }}>{n}</span>
                <span className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.35)" }}>{l}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          src={reviews[lightbox].src}
          alt={reviews[lightbox].alt}
          onClose={() => setLightbox(null)}
          onPrev={lbPrev}
          onNext={lbNext}
        />
      )}
    </>
  );
}
