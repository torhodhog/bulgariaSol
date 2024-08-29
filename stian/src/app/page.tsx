import Head from "next/head";
import Image from "next/image";
import { Layout } from "lucide-react";
import { LayoutGridDemo } from "@/components/Layout-Grid-Demo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen h-auto">
        <div className="relative w-full h-screen">
          <video src="/assets/hero-video.mp4" autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover"></video>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-8xl font-bold">BULGARIA S</span>
            <div className="relative w-32 h-32 mx-4">
              <Image src="/assets/sol.png" alt="Sol" layout="fill" className="animate-spin-slow" />
            </div>
            <span className="text-white text-8xl font-bold">L</span>
          </div>
        </div>
        <div className="w-full">
          <LayoutGridDemo />
        </div>
      </main>
      <section>
       
      </section>
    </>
  );
}