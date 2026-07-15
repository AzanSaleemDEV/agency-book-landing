"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

const GOLD = "#C9A84C";
const NAVY = "#000025";
const BG   = "#F8F7F4";

const VIDEO_ID = "9VfNlehxdbw";
const VIDEO_TITLE =
  "A Million Dollar Digital Marketing Agency's Financial Management Breakdown Unlocked | Hamid Mahmood";
const THUMB = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export function AuthorVideoSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <style>{`
        @keyframes av-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .av-item { opacity: 0; }
        .av-item.av-in { animation: av-up 0.6s ease-out both; }
        .av-d1.av-in { animation-delay: 0.05s; }
        .av-d2.av-in { animation-delay: 0.18s; }
        .av-d3.av-in { animation-delay: 0.30s; }

        .av-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 0 0 1px rgba(201,168,76,0.3), 0 2px 16px rgba(0,0,37,0.08), 0 12px 32px rgba(0,0,37,0.1);
        }
        .av-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.75);
        }
        .av-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .av-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: ${GOLD};
          box-shadow: 0 8px 32px rgba(201,168,76,0.5);
          border: none;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .av-play-btn:hover {
          transform: translate(-50%, -50%) scale(1.08);
          box-shadow: 0 12px 40px rgba(201,168,76,0.65);
        }
        .av-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
        }
      `}</style>

      <section
        ref={ref}
        style={{ backgroundColor: BG }}
        className="f-section overflow-hidden"
        aria-label="Video from the author"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p
              className={`av-item av-d1 ${inView ? "av-in" : ""} mb-4 text-[11px] font-black tracking-[0.22em] uppercase`}
              style={{ color: GOLD }}
            >
              Straight From Hamid
            </p>
            <h2
              className={`av-item av-d2 ${inView ? "av-in" : ""} mb-5 f-h2 font-bold tracking-tight`}
              style={{ color: NAVY, fontFamily: "var(--font-playfair)" }}
            >
              Watch the Financial Playbook Behind a 7-Figure Agency
            </h2>
            <p
              className={`av-item av-d3 ${inView ? "av-in" : ""} text-[17px] leading-relaxed`}
              style={{ color: "#6B6B80" }}
            >
              A short breakdown from Hamid himself on how the numbers actually work behind a seven-figure agency. Same operator, same systems, straight from the book.
            </p>
          </div>

          {/* Video */}
          <div className={`av-item av-d3 ${inView ? "av-in" : ""}`}>
            <div className="av-frame">
              {playing ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
                  title={VIDEO_TITLE}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play video: ${VIDEO_TITLE}`}
                  className="block h-full w-full cursor-pointer border-0 p-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={THUMB} alt="" aria-hidden="true" />
                  <span className="av-play-btn" aria-hidden="true">
                    <Play className="ml-1 h-7 w-7" style={{ color: NAVY }} fill={NAVY} />
                  </span>
                  <span className="av-caption">
                    <span className="block text-left text-[13px] font-semibold text-white sm:text-[14px]">
                      {VIDEO_TITLE}
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
