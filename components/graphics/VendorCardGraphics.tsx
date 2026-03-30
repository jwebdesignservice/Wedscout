"use client";

/** Photography — camera outline + light burst, muted green bg */
export function PhotographyGraphic() {
  return (
    <svg
      viewBox="0 0 400 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="400" height="208" fill="#d4e8dd" />

      {/* Light burst rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + 52 * Math.cos(rad);
        const y1 = 104 + 52 * Math.sin(rad);
        const x2 = 200 + 88 * Math.cos(rad);
        const y2 = 104 + 88 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#2B895A"
            strokeOpacity="0.18"
            strokeWidth={i % 2 === 0 ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Camera body */}
      <rect x="148" y="80" width="104" height="76" rx="10" fill="#b8d9c8" stroke="#2B895A" strokeOpacity="0.35" strokeWidth="2.5" />

      {/* Camera top bump (viewfinder notch) */}
      <rect x="168" y="70" width="30" height="14" rx="5" fill="#b8d9c8" stroke="#2B895A" strokeOpacity="0.3" strokeWidth="2" />

      {/* Lens circle */}
      <circle cx="200" cy="118" r="22" fill="#cce5d8" stroke="#2B895A" strokeOpacity="0.4" strokeWidth="2.5" />
      <circle cx="200" cy="118" r="13" fill="#d4e8dd" stroke="#2B895A" strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="200" cy="118" r="5" fill="#2B895A" fillOpacity="0.25" />

      {/* Shutter button */}
      <circle cx="228" cy="88" r="6" fill="#2B895A" fillOpacity="0.22" stroke="#2B895A" strokeOpacity="0.3" strokeWidth="1.5" />

      {/* Flash indicator */}
      <circle cx="165" cy="88" r="4" fill="#2B895A" fillOpacity="0.15" stroke="#2B895A" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Subtle corner accents */}
      <circle cx="48" cy="38" r="18" fill="#2B895A" fillOpacity="0.05" />
      <circle cx="352" cy="170" r="22" fill="#2B895A" fillOpacity="0.05" />
    </svg>
  );
}

/** Florals — stylised bloom, warm tones */
export function FloralsGraphic() {
  return (
    <svg
      viewBox="0 0 400 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="400" height="208" fill="#e8ddd4" />

      {/* Stem */}
      <path
        d="M 200 175 Q 198 145 200 115"
        stroke="#b89880"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.6"
      />

      {/* Leaves */}
      <path d="M 200 150 Q 175 138 168 125 Q 188 130 200 150 Z" fill="#b8c8a8" fillOpacity="0.7" />
      <path d="M 200 145 Q 225 133 232 120 Q 212 125 200 145 Z" fill="#b8c8a8" fillOpacity="0.7" />

      {/* Petals — 6 large petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 200 + 32 * Math.cos(rad);
        const cy = 104 + 32 * Math.sin(rad);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="18"
            ry="28"
            transform={`rotate(${angle + 90} ${cx} ${cy})`}
            fill="#c8a090"
            fillOpacity={i % 2 === 0 ? "0.55" : "0.42"}
          />
        );
      })}

      {/* Inner petals — smaller layer */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 200 + 20 * Math.cos(rad);
        const cy = 104 + 20 * Math.sin(rad);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="11"
            ry="18"
            transform={`rotate(${angle + 90} ${cx} ${cy})`}
            fill="#d8b098"
            fillOpacity="0.6"
          />
        );
      })}

      {/* Centre stamen */}
      <circle cx="200" cy="104" r="14" fill="#c8905c" fillOpacity="0.55" />
      <circle cx="200" cy="104" r="8" fill="#d4a070" fillOpacity="0.7" />
      <circle cx="200" cy="104" r="4" fill="#e8c090" fillOpacity="0.8" />

      {/* Small decorative buds */}
      <circle cx="88" cy="60" r="12" fill="#c8a090" fillOpacity="0.22" />
      <circle cx="312" cy="155" r="10" fill="#c8a090" fillOpacity="0.18" />
    </svg>
  );
}

/** Videography — film reel motif, soft lavender bg */
export function VideographyGraphic() {
  return (
    <svg
      viewBox="0 0 400 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="400" height="208" fill="#ddd4e8" />

      {/* Film reel outer ring */}
      <circle cx="200" cy="104" r="58" fill="#ccc0dc" stroke="#9880b8" strokeOpacity="0.3" strokeWidth="2.5" />

      {/* Sprocket holes around edge */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 200 + 48 * Math.cos(rad);
        const cy = 104 + 48 * Math.sin(rad);
        return (
          <rect
            key={i}
            x={cx - 5}
            y={cy - 5}
            width="10"
            height="10"
            rx="2"
            fill="#ddd4e8"
            stroke="#9880b8"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        );
      })}

      {/* Inner hub ring */}
      <circle cx="200" cy="104" r="32" fill="#d4c8e8" stroke="#9880b8" strokeOpacity="0.25" strokeWidth="2" />

      {/* Hub spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={200 + 18 * Math.cos(rad)}
            y1={104 + 18 * Math.sin(rad)}
            x2={200 + 32 * Math.cos(rad)}
            y2={104 + 32 * Math.sin(rad)}
            stroke="#9880b8"
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}

      {/* Centre hub */}
      <circle cx="200" cy="104" r="12" fill="#9880b8" fillOpacity="0.3" />
      <circle cx="200" cy="104" r="5" fill="#9880b8" fillOpacity="0.5" />

      {/* Clapperboard corner — top left */}
      <rect x="44" y="36" width="72" height="48" rx="6" fill="#ccc0dc" stroke="#9880b8" strokeOpacity="0.3" strokeWidth="2" />
      <rect x="44" y="36" width="72" height="14" rx="6" fill="#9880b8" fillOpacity="0.25" />
      {/* Clapper stripes */}
      {[56, 68, 80, 92].map((x, i) => (
        <line key={i} x1={x} y1="36" x2={x - 10} y2="50" stroke="#9880b8" strokeOpacity="0.3" strokeWidth="2" />
      ))}

      {/* Play triangle */}
      <polygon
        points="192,97 192,111 206,104"
        fill="#9880b8"
        fillOpacity="0.55"
      />

      {/* Corner decorative circles */}
      <circle cx="355" cy="48" r="14" fill="#9880b8" fillOpacity="0.08" />
      <circle cx="350" cy="170" r="10" fill="#9880b8" fillOpacity="0.06" />
    </svg>
  );
}

/** Planning — calendar + ring motif, soft blue-grey bg */
export function PlanningGraphic() {
  return (
    <svg
      viewBox="0 0 400 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="400" height="208" fill="#d4dde8" />

      {/* Calendar body */}
      <rect x="138" y="56" width="124" height="108" rx="10" fill="#c2cedd" stroke="#7890a8" strokeOpacity="0.3" strokeWidth="2" />

      {/* Calendar header */}
      <rect x="138" y="56" width="124" height="30" rx="10" fill="#8899b0" fillOpacity="0.4" />
      <rect x="138" y="70" width="124" height="16" fill="#8899b0" fillOpacity="0.4" />

      {/* Binding rings at top */}
      <rect x="168" y="48" width="10" height="18" rx="5" fill="#7890a8" fillOpacity="0.5" />
      <rect x="222" y="48" width="10" height="18" rx="5" fill="#7890a8" fillOpacity="0.5" />

      {/* Calendar header text simulation */}
      <rect x="158" y="63" width="28" height="6" rx="3" fill="white" fillOpacity="0.5" />
      <rect x="214" y="63" width="28" height="6" rx="3" fill="white" fillOpacity="0.5" />

      {/* Calendar grid — dots for days */}
      {[0, 1, 2, 3, 4, 5, 6].map((col) =>
        [0, 1, 2, 3].map((row) => {
          const isHighlighted = col === 3 && row === 1;
          const isRinged = col === 5 && row === 2;
          return (
            <circle
              key={`${col}-${row}`}
              cx={158 + col * 16}
              cy={102 + row * 16}
              r={isHighlighted ? 7 : 4}
              fill={isHighlighted ? "#8899b0" : "#d4dde8"}
              fillOpacity={isHighlighted ? 0.7 : 0.8}
              stroke={isRinged ? "#7890a8" : "none"}
              strokeWidth={isRinged ? 1.5 : 0}
              strokeOpacity={0.5}
            />
          );
        })
      )}

      {/* Ring / band icon — top right of card */}
      <circle cx="292" cy="78" r="22" stroke="#7890a8" strokeOpacity="0.45" strokeWidth="3" fill="none" />
      <circle cx="292" cy="78" r="13" stroke="#7890a8" strokeOpacity="0.25" strokeWidth="2" fill="none" />
      {/* Diamond on ring */}
      <polygon
        points="292,63 299,70 292,77 285,70"
        fill="#8899b0"
        fillOpacity="0.5"
      />

      {/* Check mark on highlighted day */}
      <path
        d="M 196 100 L 200 105 L 207 97"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />

      {/* Decorative dots */}
      <circle cx="68" cy="52" r="14" fill="#7890a8" fillOpacity="0.08" />
      <circle cx="340" cy="168" r="12" fill="#7890a8" fillOpacity="0.07" />
    </svg>
  );
}
