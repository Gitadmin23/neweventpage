import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";  
import { Toaster } from "@/components/ui/toaster";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const APP_NAME = "Chasescroll";
const APP_DEFAULT_TITLE = "We build memories";
const APP_TITLE_TEMPLATE = "%s - Chasescroll App";
const APP_DESCRIPTION = "Creating Unforgetable Memories";


export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Discover. Connect. Elevate Your Events as new wording',
  manifest: '/manifest.json',
  applicationName: 'Chasescroll'
} 

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: raleway.style.fontFamily }} >
        <Providers> 
          {children}  
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
