import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import ClarityInit from "@/components/ClarityInit";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Diego Garcia Realtor",
    description: "Diego Garcia is a realtor in the Chicago area and the surrounding suburbs. Diego assists sellers in maximizing property value, guides investors to profitable opportunities, and helps buyers find their ideal homes across the region.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

            <GoogleAnalytics gaId="G-1FWQWJMV4G" />
            <ClarityInit />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
