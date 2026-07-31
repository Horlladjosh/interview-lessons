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
  metadataBase: new URL('https://www.onelesson.xyz'),
  title: "OneLesson — Anonymous Interview Lessons",
  description: "A searchable record of real lessons learned from job interviews. No reviews, no salary talk, just what people wish they'd known.",
  openGraph: {
    title: "OneLesson — Anonymous Interview Lessons",
    description: "Real lessons learned from job interviews, one at a time. No reviews, no salary talk.",
    images: ["/og-image.png"],
    url: "https://www.onelesson.xyz",
    siteName: "OneLesson",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneLesson — Anonymous Interview Lessons",
    description: "Real lessons learned from job interviews, one at a time.",
    images: ["/og-image.png"],
  },
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
