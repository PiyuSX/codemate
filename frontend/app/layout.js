import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Slide from "@/components/Slide";
import ClearSavedFiles from "@/components/ClearSavedFiles";
import StoreHydration from "@/components/StoreHydration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeMate",
  description: "Find your coding mate now",
};



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Slide />
        <ClearSavedFiles />
        <StoreHydration >
        {children}
        </StoreHydration>
      </body>
    </html>
  );
}


