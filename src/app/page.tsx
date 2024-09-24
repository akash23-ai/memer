"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { HomePage } from "@/components/home";

export default function Home() {
  return (
    <div className="content-center">
      <WavyBackground  containerClassName="overflow-hidden"><HomePage/> </WavyBackground>
    </div>
  );
}
