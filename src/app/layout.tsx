import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

const ligaSans = localFont({
  src: "./fonts/LigaSans-Bold.woff",
  variable: "--font-liga-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mafia Tycoon",
  description: "Made by huasoroa with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ligaSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
