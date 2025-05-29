"use client";

import { Hero } from '@/components/Hero';
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-background flex flex-col items-center justify-center">
      <Hero />
      <div className="flex flex-col items-center justify-center gap-4">

      </div>
    </main>
  );
}