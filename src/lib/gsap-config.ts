"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Performance optimizations
  ScrollTrigger.config({
    limitCallbacks: true,
  });
}

export { gsap, ScrollTrigger };
