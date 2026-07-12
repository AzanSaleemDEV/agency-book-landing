"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#000025";

const FAQS = [
  {
    q: "Is this for beginners or experienced agency owners?",
    a: "Both. The A-to-Z framework starts from the foundation, so if you're new, you'll build correctly from day one. If you're already running an agency, you'll identify exactly which systems are missing or broken and fix them fast. Most readers say the first 3 chapters alone were worth 10x the price.",
  },
  {
    q: "I've read other agency books. How is this different?",
    a: "Most agency books are written by marketers. This one is written by an operator who built a multi-seven-figure agency. The difference is specificity: you get actual systems, actual scripts, and actual frameworks, not motivational advice wrapped in case studies.",
  },
  {
    q: "What's the difference between the e-book and hardcopy?",
    a: "The content is identical. The e-book is instant: you get a download link the moment you order, accessible on any device. The hardcopy ships worldwide and takes 5 to 10 business days depending on your location. For $9.99 you can grab both formats from the checkout page.",
  },
  {
    q: "What if I'm just starting out and don't have clients yet?",
    a: "Perfect timing. The Start section of the book covers exactly how to land your first clients using positioning and outreach systems Hamid built from scratch. You'll skip the guessing phase that costs most agency owners 12 to 18 months of wasted momentum.",
  },
  {
    q: "How quickly will I see results after reading?",
    a: "Readers report implementing their first system changes within 48 hours. The book is structured for action: each chapter ends with a clear implementation checklist. Some use it as a weekend intensive; others work through one chapter per week. Either way, you'll know exactly what to fix first.",
  },
  {
    q: "Is $9.99 really the final price?",
    a: "For now, yes. This is a limited-time launch price. Hamid intends to raise it to the standard retail price once the launch window closes. The countdown timer on this page reflects the current pricing window and once it expires, the price adjusts automatically.",
  },
];

export function FaqSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes fq-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fq-hd { opacity: 0; }
        .fq-hd.fq-in { animation: fq-fade-up 0.6s ease-out both; }
        .fq-hd1.fq-in { animation-delay: 0.05s; }
        .fq-hd2.fq-in { animation-delay: 0.18s; }

        /* FAQ item */
        .fq-item {
          border-bottom: 1px solid rgba(0,0,37,0.09);
          opacity: 0;
        }
        .fq-item.fq-in {
          animation: fq-fade-up 0.5s ease-out both;
        }
        .fq-item:first-of-type {
          border-top: 1px solid rgba(0,0,37,0.09);
        }

        /* Question button */
        .fq-q-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 0;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          font-size: clamp(0.95rem, 1vw + 0.5rem, 1.0625rem);
          font-weight: 700;
          color: ${NAVY};
          line-height: 1.4;
          transition: color 0.2s;
        }
        .fq-q-btn:hover { color: ${GOLD}; }
        .fq-q-btn.fq-open { color: ${GOLD}; }

        /* Chevron */
        .fq-chevron {
          flex-shrink: 0;
          color: ${GOLD};
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .fq-chevron.fq-rotated { transform: rotate(180deg); }

        /* Answer panel */
        .fq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.38s cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease;
          opacity: 0;
        }
        .fq-answer.fq-open {
          max-height: 400px;
          opacity: 1;
        }
        .fq-answer-inner {
          padding-bottom: 20px;
          font-size: clamp(0.9rem, 0.6vw + 0.7rem, 1rem);
          line-height: 1.75;
          color: rgba(0,0,37,0.58);
        }
      `}</style>

      <section
        ref={ref}
        className="f-section overflow-hidden bg-white"
        aria-label="Frequently asked questions"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12 text-center">
            <p
              className={`fq-hd fq-hd1 ${inView ? "fq-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}
            >
              Got Questions?
            </p>
            <h2
              className={`fq-hd fq-hd2 ${inView ? "fq-in" : ""} f-h2 font-bold tracking-tight`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ items */}
          <div>
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`fq-item ${inView ? "fq-in" : ""}`}
                  style={{ animationDelay: `${0.08 * i + 0.25}s` }}
                >
                  <button
                    className={`fq-q-btn ${isOpen ? "fq-open" : ""}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`fq-chevron h-5 w-5 ${isOpen ? "fq-rotated" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`fq-answer ${isOpen ? "fq-open" : ""}`}
                    aria-hidden={!isOpen}
                  >
                    <p className="fq-answer-inner">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <p className="mb-6 text-[16px]" style={{ color: "rgba(0,0,37,0.48)" }}>
              Still on the fence? Your entire investment is just{" "}
              <span style={{ color: GOLD, fontWeight: 700 }}>$9.99</span>.
              That&rsquo;s less than a coffee. The risk is zero.
            </p>
            <a
              href="https://hamidthepro.com/?add-to-cart=9853&quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: GOLD,
                color: NAVY,
                fontWeight: 900,
                fontSize: "15px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: "12px",
                padding: "16px 36px",
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(201,168,76,0.35)",
                transition: "transform 0.2s ease, opacity 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.92";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              Get My Copy — $9.99
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
