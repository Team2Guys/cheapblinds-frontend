import React from "react";
import { Open_Sans, Rubik } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import PathnameWrapper from "@components/PathnameWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

const currency = localFont({
  src: [
    {
      path: "../../public/assets/fonts/currency-symbol-v2.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-currency",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${openSans.variable} ${rubik.variable} ${currency.variable} antialiased`}>
        <PathnameWrapper>
          <ToastContainer autoClose={2500} />
          <Analytics />
          <SpeedInsights />
          {children}
        </PathnameWrapper>
      </body>
    </html>
  );
}
