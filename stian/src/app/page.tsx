'use client'

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { LayoutGridDemo } from "@/components/Layout-Grid-Demo";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollFactor = Math.min(scrollY / windowHeight, 1);
      setScrollPosition(scrollFactor);

      // Sett sticky når scrollY er større enn høyden på hero-seksjonen
      if (scrollY > windowHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoStyle = isSticky
    ? {}
    : {
        top: `${50 - 38 * scrollPosition}%`,
        left: `${50 - 38 * scrollPosition}%`,
        transform: `translate(-${50 - 38 * scrollPosition}%, -${
          50 - 38 * scrollPosition
        }%) scale(${1 - 0.8 * scrollPosition})`,
      };

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen h-auto">
        <div className="relative w-full h-screen">
          <video
            src="/assets/hero-video.mp4"
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
          ></video>
          <div
            className={`logo ${isSticky ? "sticky-logo text-black" : "text-white"}`}
            style={logoStyle}
          >
            <div className="flex items-center">
              <span className="text-8xl font-bold">BULGARIA S</span>
              <div className="relative mx-4 spin-image" style={{ width: '64px', height: '64px' }}>
                <Image
                  src="/assets/sol.png"
                  alt="Sol"
                  layout="fill"
                  className="animate-spin-slow"
                />
              </div>
              <span className="text-8xl font-bold">L</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <LayoutGridDemo />
        </div>
      </main>
      <section>
        {/* Innhold under her */}
      </section>
    </>
  );
}