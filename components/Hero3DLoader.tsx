"use client";

import dynamic from "next/dynamic";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => null
});

export default function Hero3DLoader() {
  return <Hero3DScene />;
}
