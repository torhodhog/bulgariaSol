import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuroraBackgroundDemo } from "@/components/aurora-background-demo";
import { NavbarDemo } from "@/components/navbar-demo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} relative min-h-screen`}>
        {/* <AuroraBackgroundDemo className="fixed top-0 left-0 w-full h-full -z-10" /> */}
        <NavbarDemo />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-16">
          <main className="w-full flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}