import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "WedScout — Find Your Perfect Wedding Vendors",
  description:
    "WedScout helps couples discover curated wedding vendors in Texas. Browse photographers, florists, planners and more — all matched to your budget and vision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${poppins.variable} font-body bg-[#FFF4E2] text-[#1A1A1A] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
