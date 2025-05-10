"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-background flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">

      </div>
    </main>
  );
}