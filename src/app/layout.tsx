import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Footer from './components/Footer';
import AuthContext from "./context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FileSwift - Instant & Private File Sharing",
  description: "Share files instantly with anyone, anywhere. No sign-up required. Files are automatically deleted after download for your privacy.",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthContext>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Analytics />
        </AuthContext>
      </body>
    </html>
  );
}
