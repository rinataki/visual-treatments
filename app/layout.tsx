import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Treatments",
  description:
    "An open-source library of production-ready interface aesthetics for design engineers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
