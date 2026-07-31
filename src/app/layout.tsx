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
  title: "OneLesson — Anonymous lessons from real interviews",
  description: "A searchable record of what people actually learned from interviewing, one honest lesson at a time. No reviews, no salary talk, no complaints, just the specific thing they'd tell someone before walking in.",
  openGraph: {
    title: "OneLesson — Anonymous lessons from real interviews",
    description: "A searchable record of what people actually learned from interviewing, one honest lesson at a time. No reviews, no salary talk, no complaints.",
    images: ["/og-image.png"],
    url: "https://www.onelesson.xyz",
    siteName: "OneLesson",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneLesson — Anonymous lessons from real interviews",
    description: "A searchable record of what people actually learned from interviewing, one honest lesson at a time. No reviews, no salary talk.",
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
