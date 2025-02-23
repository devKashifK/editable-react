"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./moving-border";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20  overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={item.name}
            className="w-[450px] relative group/card"
          >
            <div className="relative h-full p-10 overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-sm border border-white/20 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover/card:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] group-hover/card:border-white/30">
              <div className="relative z-10">
                <div className="flex flex-col gap-6">
                  <div className="relative">
                    <div className="absolute -top-2 -left-3 text-7xl leading-none text-background/10 font-serif">
                      "
                    </div>
                    <p className="relative text-base text-gray-700/90 leading-relaxed tracking-wide font-medium pl-4">
                      {item.quote}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-6 border-t border-black/5">
                    <div className="font-semibold text-base text-gray-800">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-background/[0.07] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-background/10 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-background/10 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function MovingBorderDemo() {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Borders are cool
      </Button>
    </div>
  );
}
