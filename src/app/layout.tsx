import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import Header from './Header';
import Footer from './Footer'

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneLesson",
  description: "Anonymous, searchable lessons from real interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} min-h-full flex flex-col`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
         <Footer />
        <Analytics />
      </body>
    </html>
  );
}
