
import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/navbar";
import AppShell from "@/component/appShell";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "The Investigative Analyst",
  description: "News aggregation and automated article analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased bg-investigative-paper font-sans text-investigative-navy`}
      >
        <Navbar />
        <AppShell>

        {children}
        </AppShell>
      </body>
    </html>
  );
}
