'use client'

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { LayoutGridDemo } from "@/components/Layout-Grid-Demo";
import { AnimatedModalDemo } from "@/components/Animated-Modal-Demo";
import { TextGenerateEffect } from "@/components/ui/text-generate.effect";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Halverer farten på videoen
    }
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
      <main className="flex flex-col items-center justify-center min-h-screen h-auto px-4 lg:px-60">
        <div className="video-container mt-24 relative">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/assets/SV.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <TextGenerateEffect
          className="text-center mt-72"
          words="Velkommen til Bulgaria"/>
          <div
            className={`logo ${isSticky ? "sticky-logo text-black" : "text-white"}`}
            style={logoStyle}
          >
            <div className="flex items-center">
              {/* <span className="text-7xl font-bold">BULGARIA S</span>
              <div className="relative mx-4 spin-image" style={{ width: '64px', height: '64px' }}>
                <Image
                  src="/assets/sol.png"
                  alt="Sol"
                  layout="fill"
                  className="animate-spin-slow"
                />
              </div> */}
              {/* <span className="text-7xl font-bold">L</span> */}
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