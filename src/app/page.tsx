"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { Code } from "@/components/mycode";

export default function Home() {
  return (
    <div className="content-center">
      <WavyBackground children={<Code />} containerClassName="overflow-hidden" />
    </div>
  );
}
