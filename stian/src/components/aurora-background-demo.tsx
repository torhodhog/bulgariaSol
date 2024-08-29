"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";

interface AuroraBackgroundDemoProps {
  className?: string;
  children?: React.ReactNode; // Legg til children som prop her
}

export function AuroraBackgroundDemo({ className, children }: AuroraBackgroundDemoProps) {
  return (
    <AuroraBackground className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 min-h-screen h-full"
      >
        {children} {/* Bruk children her */}
      </motion.div>
    </AuroraBackground>
  );
}