"use client";

import { motion } from "framer-motion";

export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 480 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[480px]"
        aria-hidden="true"
      >
        {/* Soft radial glow behind illustration */}
        <circle cx="240" cy="260" r="195" fill="#2B895A" fillOpacity="0.07" />
        <circle cx="240" cy="260" r="145" fill="#2B895A" fillOpacity="0.04" />

        {/* Background arc lines — low opacity #2B895A/6 */}
        <path
          d="M 80 440 Q 240 20 400 440"
          stroke="#2B895A"
          strokeOpacity="0.06"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 110 440 Q 240 60 370 440"
          stroke="#2B895A"
          strokeOpacity="0.06"
          strokeWidth="1"
          fill="none"
        />

        {/* === Whole illustration floats === */}
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Arch left pillar */}
          <rect x="128" y="188" width="28" height="224" rx="14" fill="#F7E9D4" />
          {/* Arch right pillar */}
          <rect x="324" y="188" width="28" height="224" rx="14" fill="#F7E9D4" />

          {/* Arch top — thick stroke arc */}
          <path
            d="M 128 202 Q 240 58 352 202"
            stroke="#F7E9D4"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
          />

          {/* Inner arch highlight */}
          <path
            d="M 138 202 Q 240 76 342 202"
            stroke="#FFF4E2"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeOpacity="0.5"
          />

          {/* ===  Floral accents at arch apex === */}
          {/* Centre bloom */}
          <circle cx="240" cy="68" r="7" fill="#2B895A" fillOpacity="0.85" />
          <circle cx="240" cy="54" r="5" fill="#2B895A" fillOpacity="0.65" />
          <circle cx="240" cy="82" r="5" fill="#2B895A" fillOpacity="0.65" />
          <circle cx="227" cy="61" r="5" fill="#2B895A" fillOpacity="0.65" />
          <circle cx="253" cy="61" r="5" fill="#2B895A" fillOpacity="0.65" />
          <circle cx="227" cy="75" r="5" fill="#2B895A" fillOpacity="0.65" />
          <circle cx="253" cy="75" r="5" fill="#2B895A" fillOpacity="0.65" />

          {/* Left floral cluster */}
          <circle cx="165" cy="148" r="5" fill="#2B895A" fillOpacity="0.55" />
          <circle cx="156" cy="158" r="4" fill="#2B895A" fillOpacity="0.4" />
          <circle cx="175" cy="158" r="4" fill="#2B895A" fillOpacity="0.4" />
          <circle cx="165" cy="168" r="3.5" fill="#2B895A" fillOpacity="0.3" />

          {/* Right floral cluster */}
          <circle cx="315" cy="148" r="5" fill="#2B895A" fillOpacity="0.55" />
          <circle cx="305" cy="158" r="4" fill="#2B895A" fillOpacity="0.4" />
          <circle cx="325" cy="158" r="4" fill="#2B895A" fillOpacity="0.4" />
          <circle cx="315" cy="168" r="3.5" fill="#2B895A" fillOpacity="0.3" />

          {/* Vine lines */}
          <path
            d="M 240 75 Q 195 110 165 148"
            stroke="#2B895A"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 4"
          />
          <path
            d="M 240 75 Q 285 110 315 148"
            stroke="#2B895A"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 4"
          />

          {/* ===  Two abstract silhouettes === */}
          {/* Left figure (slight dress shape) */}
          <ellipse cx="188" cy="326" rx="12" ry="14" fill="#1A1A1A" fillOpacity="0.12" />
          <path
            d="M 176 340 Q 170 380 162 412 L 214 412 Q 206 380 200 340 Z"
            fill="#1A1A1A"
            fillOpacity="0.10"
          />

          {/* Right figure */}
          <ellipse cx="292" cy="326" rx="12" ry="14" fill="#1A1A1A" fillOpacity="0.12" />
          <path
            d="M 280 340 Q 274 376 270 412 L 314 412 Q 310 376 304 340 Z"
            fill="#1A1A1A"
            fillOpacity="0.10"
          />

          {/* Ground line */}
          <line
            x1="128"
            y1="412"
            x2="352"
            y2="412"
            stroke="#1A1A1A"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />

          {/* ===  Floating diamonds (rotating) === */}
          {/* Diamond 1 — top left */}
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ originX: "95px", originY: "118px" }}
          >
            <rect
              x="87"
              y="110"
              width="16"
              height="16"
              rx="2"
              transform="rotate(45 95 118)"
              fill="#2B895A"
              fillOpacity="0.18"
            />
          </motion.g>

          {/* Diamond 2 — top right */}
          <motion.g
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ originX: "385px", originY: "105px" }}
          >
            <rect
              x="377"
              y="97"
              width="16"
              height="16"
              rx="2"
              transform="rotate(45 385 105)"
              fill="#F7E9D4"
              fillOpacity="0.8"
              stroke="#2B895A"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          </motion.g>

          {/* Diamond 3 — right mid */}
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            style={{ originX: "418px", originY: "262px" }}
          >
            <rect
              x="411"
              y="255"
              width="14"
              height="14"
              rx="1.5"
              transform="rotate(45 418 262)"
              fill="#2B895A"
              fillOpacity="0.12"
            />
          </motion.g>

          {/* Diamond 4 — bottom left */}
          <motion.g
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            style={{ originX: "70px", originY: "340px" }}
          >
            <rect
              x="63"
              y="333"
              width="14"
              height="14"
              rx="1.5"
              transform="rotate(45 70 340)"
              fill="#F7E9D4"
              fillOpacity="0.9"
              stroke="#2B895A"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          </motion.g>

          {/* Diamond 5 — small, near arch */}
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            style={{ originX: "108px", originY: "170px" }}
          >
            <rect
              x="103"
              y="165"
              width="10"
              height="10"
              rx="1"
              transform="rotate(45 108 170)"
              fill="#2B895A"
              fillOpacity="0.22"
            />
          </motion.g>

          {/* Diamond 6 — right side near arch */}
          <motion.g
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ originX: "372px", originY: "170px" }}
          >
            <rect
              x="367"
              y="165"
              width="10"
              height="10"
              rx="1"
              transform="rotate(45 372 170)"
              fill="#2B895A"
              fillOpacity="0.22"
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
