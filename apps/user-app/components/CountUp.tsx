"use client";

import { useEffect, useState } from "react";

type CountUpProps = {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function CountUp({ target, duration = 1500, prefix = "", suffix = "", className }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); 
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        setCount(target);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className={className}>
      
      {(count).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
    </span>
  );
}
