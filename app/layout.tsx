import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FileSwift - Fast, Secure & Free Browser-Based File Transfer",
  description: "FileSwift is the best free browser-based file transfer tool. Send and receive large files instantly with no registration, no file size limits, and no server uploads. Secure P2P file sharing using WebRTC and local storage. The perfect alternative to WeTransfer, Snapdrop, and ShareDrop. Transfer files between iPhone, Android, Windows, and Mac directly. Features include drag & drop upload, QR code sharing, temporary file hosting, and encrypted transfer. Share photos, videos, documents, and large executables privately and securely.",
  keywords: "file transfer, free file sharing, browser based file transfer, send large files free, p2p file sharing, no registration file transfer, webrtc file sharing, snapdrop alternative, wetransfer alternative, sharedrop alternative, toffeeshare alternative, wormhole alternative, secure file transfer, encrypted file sharing, instant file share, temporary file hosting, cross platform file transfer, iphone to android file transfer, pc to mobile file transfer, no size limit file sharing, local file transfer, browser to browser transfer, direct file share, fast file transfer, private file sharing, ephemeral file sharing, indexeddb file storage, client side file transfer, drag and drop file upload, online file sender, receive files online, qr code file transfer, ad hoc file sharing, anonymous file sharing, real time file transfer, scan to download files, mobile to pc transfer via qr, qr code document sharing, wireless file transfer, contactless file sharing, scan qr to share files, transfer photos phone to pc, send files via qr code, qr code data transfer, secure qr file sharing, instant qr download",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
