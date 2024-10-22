// app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { UserProvider } from "@/utils/contexts"; // UserProvider import
import UserMenuWrapper from "@/components/Menu/UserMenuWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meal DB fetching",
  description: "Fetch and Cook",
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
        <Header />
        <UserProvider>
          <UserMenuWrapper /> {/* Render UserMenuWrapper within UserProvider */}
          {children} {/* Wrap children with UserProvider */}
        </UserProvider>
      </body>
    </html>
  );
}
