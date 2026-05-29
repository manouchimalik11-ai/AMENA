import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LangWrapper from "@/lib/LangContext";
import UserProvider from "@/lib/UserContext";
import Navbar from "@/components/Navbar";
import UserBar from "@/components/UserBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amena – Lost & Found Tunisia",
  description: "Retrouvez vos objets perdus ou signalez un objet trouvé en Tunisie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LangWrapper>
          <UserProvider>
            <Navbar />
            <UserBar />
            {children}
          </UserProvider>
        </LangWrapper>
      </body>
    </html>
  );
}
