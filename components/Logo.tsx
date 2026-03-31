"use client";

import Image from "next/image";

type LogoVariant = "default" | "light" | "icon-only";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  if (variant === "icon-only") {
    return (
      <span className={className}>
        <Image
          src="/logo.png"
          alt="WedScout"
          width={40}
          height={40}
          className="object-contain"
        />
      </span>
    );
  }

  if (variant === "light") {
    return (
      <div className={`flex items-center ${className}`}>
        <Image
          src="/logo-light.png"
          alt="WedScout"
          width={120}
          height={60}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="WedScout"
        width={100}
        height={36}
        className="object-contain"
        priority
      />
    </div>
  );
}
