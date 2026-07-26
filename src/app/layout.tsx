import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Abdul Karim Bin Azmi | AI & Data Intelligence",
  description:
    "Portfolio of Abdul Karim Bin Azmi — AI & Data Analyst specializing in quality assurance, risk operations, and business intelligence automation.",
  keywords: [
    "AI",
    "Data Analytics",
    "Quality Assurance",
    "Risk Operations",
    "Business Intelligence",
    "Power BI",
    "Machine Learning",
    "Abdul Karim",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} bg-[#0b0f19] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
