"use client";

import { useEffect, useState } from "react";

interface LocalClockProps {
  city: string;
  timezone: string;
  className?: string;
}

function format(timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    }).format(new Date());
  } catch {
    return "--:--";
  }
}

export function LocalClock({ city, timezone, className }: LocalClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(format(timezone));
    const id = window.setInterval(() => setTime(format(timezone)), 30_000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return (
    <span className={className} suppressHydrationWarning>
      {city} · {time ?? "--:--"} IST
    </span>
  );
}
