import "./globals.css";
import "./sidebar.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Privasim v3.5 Alpha",
  description:
    "Draw flowchart, sequence diagram, class diagram, user journey, gantt, C4C diagram with nature language.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans text-slate-900 antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <SiteHeader />
        <div className="flex flex-1">
        <aside className="w-12 bg-white-50 rounded ml-1" style={{ height: '220px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', position: 'fixed', top: '15%', left: '0' }}>
  <div className="px-2 py-4">
  <div className="flex flex-col items-center justify-center">
  <img src="/icons/home.svg" alt="home" className="text-gray-500 w-5 h-5 mb-3.5" />
  <img src="/icons/apps.svg" alt="apps" className="text-gray-500 w-5 h-5 mb-3.5" />
  <img src="/icons/chart-histogram.svg" alt="chart" className="text-gray-500 w-5 h-5 mb-3.5" />
  <img src="/icons/bookmark.svg" alt="bookmark" className="text-gray-500 w-5 h-5 mb-3.5" />
  <img src="/icons/gears.svg" alt="gears" className="text-gray-500 w-6 h-6 mb-3.5" />
</div>
  </div>
</aside>

          <main className="flex-1">{children}</main>
        </div>
        <Analytics />
        <footer className="p-5 text-center text-gray-500" style={{ paddingTop: "10rem" }}>
  <div className="text-sm text-center mt-4 h-full flex flex-col justify-between">
    <div>
      <a href="https://privasim.com/privacy-policy/" className="text-gray-700 hover:text-gray-900">Privacy Policy</a>
      {" | "}
      <a href="https://www.privasim.com/contact-us" className="text-gray-700 hover:text-gray-900">Contact Us</a>
    </div>
    <div className="text-sm text-center mt-4 mb-4">
      <span className="text-gray-700">© 2023 Privasim. All rights reserved. </span>
    </div>
  </div>
</footer>

      </body>
    </html>
  );
}