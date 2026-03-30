"use client";

type LogoVariant = "default" | "light" | "icon-only";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

function LogoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.14)}
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Ring */}
      <circle cx="14" cy="12" r="7.5" stroke="#2B895A" strokeWidth="2.2" fill="none" />
      <circle cx="14" cy="12" r="3" fill="#2B895A" />
      {/* Pin stem */}
      <path d="M14 19.5 L14 28" stroke="#2B895A" strokeWidth="2.2" strokeLinecap="round" />
      {/* Pin base arc */}
      <path
        d="M10.5 27 Q14 31 17.5 27"
        stroke="#2B895A"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-[#1A1A1A]";

  if (variant === "icon-only") {
    return (
      <span className={className}>
        <LogoIcon size={32} />
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon size={26} />
      <span className={`text-[22px] leading-none tracking-tight ${textColor}`}>
        <span className="font-heading italic font-light">Wed</span>
        <span className="font-body font-semibold">Scout</span>
      </span>
    </div>
  );
}
