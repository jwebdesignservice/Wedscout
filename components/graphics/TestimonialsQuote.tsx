"use client";

/** Giant decorative quotation mark. White/4 opacity, absolute top-right. */
export default function TestimonialsQuote() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -top-8 right-0 w-[320px] h-[320px] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Opening double-quote rendered as a path — Cormorant Garamond italic style */}
      <text
        x="10"
        y="280"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontWeight="300"
        fontSize="320"
        fill="rgba(255,255,255,0.04)"
      >
        &ldquo;
      </text>
    </svg>
  );
}
