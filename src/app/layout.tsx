import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebas = Bebas_Neue({ weight: '400', subsets: ["latin"], variable: "--font-bebas" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "DodoFolio",
  description: "Minimalist, asymmetric horizontal scrolling portfolio",
};

import SmoothScroll from "@/components/ui/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${bebas.variable} ${mono.variable} font-sans antialiased bg-black text-white selection:bg-white selection:text-black overflow-x-hidden`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
