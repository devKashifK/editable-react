"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useState } from "react";

const PRESET_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-indigo-500",
];

export default function HoverCard({
  icon,
  title,
  description,
  cta,
  color,
  className,
  link = "#",
  iconColor,
}: {
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  cta?: string | React.ReactNode;
  color?: string;
  className?: string;
  link?: string;
  iconColor?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [randomColor] = useState(() => 
    color || PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]
  );
  
  return (
    <Link
      href={link}
      className={cn(
        "group relative overflow-hidden border",
        "rounded-[2rem] p-8 md:p-10",
        "bg-gradient-to-b from-white/80 to-white/30",
        "dark:from-gray-950/80 dark:to-gray-950/30",
        "backdrop-blur-xl backdrop-saturate-150",
        " dark:border-gray-800/20",
        "transform transition-all duration-400 ease-out",
        "hover:scale-[1.02] hover:-translate-y-1",
        "hover:shadow-[0_20px_80px_-15px_rgba(0,0,0,0.3)]",
        "dark:hover:shadow-[0_20px_80px_-15px_rgba(0,0,0,0.6)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Light Effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-700",
          "bg-gradient-to-br from-transparent via-current to-transparent",
          isHovered && "opacity-100",
          randomColor
        )}
      />

      {/* Mesh Gradient Background */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-all duration-700",
          "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]",
          "dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)]",
          isHovered && "opacity-100 scale-110"
        )}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-8">
        {/* Icon Container */}
        <div className="relative inline-flex">
          <div 
            className={cn(
              "absolute -inset-4 rounded-full opacity-20 transition-all duration-700",
              isHovered ? randomColor : "scale-0"
            )}
          />
          <div 
            className={cn(
              "relative h-14 w-14 rounded-2xl",
              "flex items-center justify-center",
              "bg-gradient-to-br from-gray-50 to-gray-100/50",
              "dark:from-gray-800 dark:to-gray-900/50",
              "transition-all duration-700 ease-out",
              "group-hover:shadow-lg",
              isHovered && "scale-110 rotate-3"
            )}
          >
            <Icon
              icon={isStringifiedJSON(icon) ? JSON.parse(icon) : icon}
              className={cn(
                "h-7 w-7 transition-all duration-700",
                isHovered ? "text-white scale-110" : "text-gray-600 dark:text-gray-300",
                iconColor
              )}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h3 
            className={cn(
              "text-2xl font-bold tracking-tight",
              "bg-clip-text transition-all duration-700",
              isHovered && "text-transparent bg-gradient-to-r from-white to-white/80"
            )}
          >
            {title}
          </h3>
         
          <div dangerouslySetInnerHTML={{ __html: description }} className={cn(
                "text-base leading-relaxed",
                "transition-colors duration-700",
                isHovered ? "text-white/90" : "text-gray-500 dark:text-gray-400"
              )} />
        </div>

        {/* CTA Section */}
        {cta && (
          <div 
            className={cn(
              "flex items-center gap-3",
              "text-sm font-semibold",
              "transition-colors duration-700",
              isHovered ? "text-white" : "text-gray-600 dark:text-gray-300"
            )}
          >
            {cta}
            <Icon 
              icon="lucide:arrow-right" 
              className={cn(
                "h-5 w-5 transition-all duration-700",
                isHovered && "translate-x-1"
              )}
            />
          </div>
        )}
      </div>

      {/* Shine Effect */}
      <div 
        className={cn(
          "absolute inset-0 z-0",
          "pointer-events-none opacity-0 transition-all duration-700",
          "bg-gradient-to-tr from-transparent via-white/10 to-transparent",
          "rotate-45",
          isHovered && "opacity-100 translate-x-full"
        )}
      />

      {/* Border Gradient */}
      <div 
        className={cn(
          "absolute inset-0 -z-10",
          "rounded-[2rem] p-0.5",
          "bg-gradient-to-br from-white/5 to-white/30",
          "dark:from-white/5 dark:to-white/10",
          "transition-opacity duration-700",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </Link>
  );
}


export function isStringifiedJSON(val: any) {
  if (typeof val !== 'string') return false;
  try {
    JSON.parse(val);
    return true;
  } catch (e) {
    return false;
  }
}

