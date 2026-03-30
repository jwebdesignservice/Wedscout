"use client";

/** Arc of small circular dots. #2B895A at 8% opacity. Top-right corner decoration. */
export default function CategoriesDecor() {
  // Generate dots arranged in an arc (quarter-circle) from top to right
  const dots: { cx: number; cy: number; r: number }[] = [];
  const centreX = 180;
  const centreY = -20;

  for (let ring = 0; ring < 5; ring++) {
    const radius = 48 + ring * 24;
    const dotCount = 4 + ring * 2;
    for (let i = 0; i <= dotCount; i++) {
      // Arc from 180deg (left) to 270deg (down) = quarter-circle pointing into top-right corner
      const angle = (180 + (90 * i) / dotCount) * (Math.PI / 180);
      const cx = centreX + radius * Math.cos(angle);
      const cy = centreY + radius * Math.sin(angle);
      dots.push({ cx, cy, r: ring === 0 ? 2.5 : ring === 1 ? 2.5 : 2 });
    }
  }

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none select-none"
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="#2B895A"
          fillOpacity="0.08"
        />
      ))}
    </svg>
  );
}
