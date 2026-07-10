"use client";

import { useInView } from "react-intersection-observer";

const GOLD = "#C9A84C";
const BG   = "#000D30";
const FB   = "#1877F2";
const TP   = "#00B67A"; // Trustpilot green

// ─── Review data extracted from screenshots ────────────────────────────────
const LARGE = [
  {
    name:   "Umair Amjad",
    init:   "U",
    color:  "#1877F2",
    date:   "14 December 2023",
    source: "facebook" as const,
    text:   "Read a couple of chapters from Hamid's Book and it watered the dead seeds of sales in myself and I see the fresh green petals popping out of me again.\n\nThis book is a complete MBA Steroid, all you need to do is to complete your degree and read this book and apply the sales techniques in your life and trust me, you'll get a complete roadmap to grow your agency to 7 figures!\n\nIt's a MUST READ!",
  },
  {
    name:   "Imad Malik",
    init:   "I",
    color:  "#4267B2",
    date:   "14 December 2023",
    source: "facebook" as const,
    text:   '"7-Figure Agency Mindset A-Z" by Hamid Mahmood is a game-changer for aspiring entrepreneurs. With a captivating blend of practical strategies and real-world examples, Mahmood\'s book, organized in an A-Z format, provides a comprehensive guide to building and scaling a successful agency. What elevates it beyond a typical business manual is Hamid\'s focus on cultivating a resilient and success-driven mindset — making it an invaluable resource for anyone serious about entrepreneurial success. The inclusion of relatable success stories adds a motivational touch, making this book a mentor in paperback form — an essential read for those navigating the path to business excellence.',
  },
];

const MEDIUM = [
  {
    name:   "Talha Bin Afzal",
    init:   "T",
    color:  "#E91E63",
    date:   "28 January 2023",
    source: "facebook" as const,
    text:   "I have always found Hamid extremely helpful and kind. He has been a mentor to me and I am truly grateful to him for sharing his knowledge and insights.\n\nAlso, he is inspiration for me when it comes to ethics in business. That's truly something we should focus on and inculcate in our business dealings.\n\nThanks to Hamid for all the help and guidance.",
  },
  {
    name:   "Muhammad Sufyan Imtiaz",
    init:   "M",
    color:  "#009688",
    date:   "13 December 2023",
    source: "facebook" as const,
    text:   'Hamid Mahmood\'s "7-Figure Agency Mindset A-Z" is an exceptional book that serves as a comprehensive guide for anyone aspiring to make their mark in the business world. His A-Z format meticulously covers every aspect of running a lucrative agency. Each chapter is a treasure trove of wisdom, brimming with actionable strategies and real-world examples that demystify complex business concepts. Mahmood\'s expertise shines through in his discussions on topics ranging from creating a robust business model to mastering digital marketing techniques and fostering client relationships.',
  },
  {
    name:   "Junaid Afzal",
    init:   "J",
    color:  "#FF5722",
    date:   "Jan 17, 2025",
    source: "trustpilot" as const,
    title:  "Goldmine strategy to build your Million$ empire",
    text:   "In my almost 7+ years of experience, I can guarantee that Hamid is the guy that can help you to scale your agency from few bucks to million $$$ agency with proven strategies. Read his book and go for 1:1 consultation from Hamid to scale your agency within days.",
  },
];

const SMALL = [
  {
    name:   "Noman Ahmad",
    init:   "N",
    color:  "#4CAF50",
    date:   "Jan 17, 2025",
    source: "trustpilot" as const,
    title:  "Best place to learn",
    text:   "I have learnt a lot from 7-Figure Agency Mindset A-Z by Hamid, gave me right directions to my business strategies. My agency increased revenue as well as good clients. Hamid always forces to professional ethics — biggest oath is never lie.",
  },
  {
    name:   "Amina Zahoor",
    init:   "A",
    color:  "#9C27B0",
    date:   "Jan 21, 2025",
    source: "trustpilot" as const,
    title:  "A Must-Read for Scaling Your Business",
    text:   '"7-Figure Agency Mindset A-Z" by Hamid is a must-read for anyone looking to grow their agency. The book simplifies complex strategies, offering practical advice on mindset, client management, and scaling your business. Highly recommended for anyone serious about reaching the 7-figure mark!',
  },
  {
    name:   "Shopo genie",
    init:   "S",
    color:  "#00BCD4",
    date:   "Jan 21, 2025",
    source: "trustpilot" as const,
    title:  "Roadmap toward a 7-figure agency",
    text:   "So 7 Figure agency mindset A-Z by Hamid Mehmood is definitely a roadmap for those who don't have a mindset on what it takes to build a 7-Figure agency. This book has almost it all — from how to form your company to how to build your offer and sell it to other businesses as an agency owner.",
  },
  {
    name:   "Hasnain Khalid",
    init:   "H",
    color:  "#FF9800",
    date:   "Mar 26, 2025",
    source: "trustpilot" as const,
    title:  "7 Figures agency mindset is a must-read",
    text:   "7 Figures agency mindset is a must-read for anyone looking to scale their agency to seven figures. Hamid Mahmood breaks down the strategies, systems, and mindset shifts needed to achieve sustainable growth. Packed with real-world insights and actionable advice — a game-changer for agency owners ready to take their business to the next level!",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
function Stars({ color = TP }: { color?: string }) {
  return (
    <div className="flex gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={color} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function FbCard({ r }: { r: typeof LARGE[0] }) {
  return (
    <div className="ts-card h-full">
      {/* Facebook header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-black text-white"
          style={{ backgroundColor: r.color }}
          aria-hidden="true"
        >
          {r.init}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="ts-name">{r.name}</span>
            <svg className="ts-verify" viewBox="0 0 20 20" fill={FB} width="14" height="14" aria-label="Verified">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="ts-rec">
            <span style={{ color: "#1877F2", fontWeight: 600 }}>recommends</span>{" "}
            <span style={{ fontWeight: 700 }}>7-Figure Agency Mindset A-Z</span>
          </p>
          <p className="ts-date">{r.date} · 🌐</p>
        </div>
      </div>
      {/* Text */}
      <p className="ts-body">{r.text.split("\n\n").map((para, i) => (
        <span key={i}>{para}{i < r.text.split("\n\n").length - 1 && <><br /><br /></>}</span>
      ))}</p>
      {/* Badge */}
      <div className="mt-4 inline-flex items-center gap-1.5 rounded px-2 py-1"
        style={{ background: "rgba(24,119,242,0.08)", border: "1px solid rgba(24,119,242,0.15)" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill={FB} aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span style={{ fontSize: "10px", fontWeight: 700, color: FB }}>Facebook Review</span>
      </div>
    </div>
  );
}

function TpCard({ r }: { r: typeof MEDIUM[2] }) {
  return (
    <div className="ts-card h-full">
      {/* Stars + Trustpilot badge */}
      <div className="flex items-center justify-between mb-3">
        <Stars />
        <div className="inline-flex items-center gap-1 rounded px-2 py-0.5"
          style={{ background: "rgba(0,182,122,0.08)", border: "1px solid rgba(0,182,122,0.2)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill={TP} aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span style={{ fontSize: "10px", fontWeight: 700, color: TP }}>Trustpilot</span>
        </div>
      </div>
      {/* Title */}
      {"title" in r && r.title && (
        <p className="ts-title mb-2">{r.title}</p>
      )}
      {/* Body */}
      <p className="ts-body">{r.text}</p>
      {/* Footer */}
      <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black text-white"
            style={{ backgroundColor: r.color }}
            aria-hidden="true"
          >
            {r.init}
          </div>
          <div>
            <p className="ts-name text-[12px]">{r.name}</p>
            <p className="ts-date">{r.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <>
      <style>{`
        @keyframes ts-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ts-hd { opacity: 0; }
        .ts-hd.ts-in { animation: ts-up 0.55s ease-out both; }
        .ts-hd1.ts-in { animation-delay: .05s; }
        .ts-hd2.ts-in { animation-delay: .17s; }
        .ts-hd3.ts-in { animation-delay: .28s; }

        .ts-card-wrap { opacity: 0; }
        .ts-card-wrap.ts-in { animation: ts-up 0.5s ease-out both; }

        /* White card */
        .ts-card {
          background:    #ffffff;
          border-radius: 12px;
          padding:       20px;
          border:        1px solid rgba(0,0,0,0.07);
          box-shadow:    0 2px 16px rgba(0,0,0,0.12), 0 0 0 0 transparent;
          transition:    box-shadow .22s ease, transform .22s ease;
        }
        .ts-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 0 0 2px ${GOLD};
          transform:  translateY(-3px);
        }

        .ts-name {
          font-size:   13px;
          font-weight: 700;
          color:       #1C1E21;
          line-height: 1.3;
        }
        .ts-verify { display: inline; vertical-align: middle; }

        .ts-rec {
          font-size:  11px;
          color:      #65676B;
          margin-top: 1px;
        }
        .ts-date {
          font-size:  11px;
          color:      #90949C;
          margin-top: 1px;
        }
        .ts-title {
          font-size:   14px;
          font-weight: 700;
          color:       #1C1E21;
          line-height: 1.35;
        }
        .ts-body {
          font-size:   13px;
          line-height: 1.65;
          color:       #3E4148;
        }

        /* Stats */
        .ts-stat-val {
          font-size:   clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 900;
          color:       ${GOLD};
        }
        .ts-stat-lbl {
          font-size:      10px;
          font-weight:    600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color:          rgba(255,255,255,0.38);
          margin-top:     2px;
        }
      `}</style>

      <section
        ref={ref}
        aria-label="Reader reviews"
        className="overflow-hidden"
        style={{
          backgroundColor: BG,
          paddingTop:    "clamp(2.5rem, 6vw, 5rem)",
          paddingBottom: "clamp(3rem, 7vw, 6rem)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className={`ts-hd ts-hd1 ${inView ? "ts-in" : ""} mb-3 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}>
              What Readers Are Saying
            </p>
            <h2
              className={`ts-hd ts-hd2 ${inView ? "ts-in" : ""} mb-4 f-h2 font-bold tracking-tight text-white`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Real Reviews. Real Results.
            </h2>
            <p className={`ts-hd ts-hd3 ${inView ? "ts-in" : ""} text-[15px] leading-relaxed`}
              style={{ color: "rgba(255,255,255,0.45)" }}>
              Agency owners across 12+ countries — unfiltered and unedited.
            </p>
          </div>

          {/* ── Row 1: 2 large featured cards ─── */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {LARGE.map((r, i) => (
              <div
                key={r.name}
                className={`ts-card-wrap ${inView ? "ts-in" : ""}`}
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                <FbCard r={r} />
              </div>
            ))}
          </div>

          {/* ── Row 2: 3 medium cards ─── */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {MEDIUM.map((r, i) => (
              <div
                key={r.name}
                className={`ts-card-wrap ${inView ? "ts-in" : ""}`}
                style={{ animationDelay: `${0.28 + i * 0.1}s` }}
              >
                {r.source === "facebook"
                  ? <FbCard r={r as typeof LARGE[0]} />
                  : <TpCard r={r as typeof MEDIUM[2]} />
                }
              </div>
            ))}
          </div>

          {/* ── Row 3: 4 compact cards ─── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SMALL.map((r, i) => (
              <div
                key={r.name}
                className={`ts-card-wrap ${inView ? "ts-in" : ""}`}
                style={{ animationDelay: `${0.48 + i * 0.08}s` }}
              >
                <TpCard r={r as typeof MEDIUM[2]} />
              </div>
            ))}
          </div>

          {/* Trust stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { n: "500+", l: "Agency Owners"   },
              { n: "12+",  l: "Countries"        },
              { n: "4.9★", l: "Average Rating"   },
              { n: "9",    l: "Verified Reviews" },
            ].map(({ n, l }) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="ts-stat-val">{n}</span>
                <span className="ts-stat-lbl">{l}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
