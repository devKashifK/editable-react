"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useTransform, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  className,
  imageClassName,
  childrenClassName,
}: {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
  imageClassName?: string;
  childrenClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate relative mouse position
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      className={cn(
        "relative h-96 w-96 rounded-2xl bg-transparent cursor-pointer",
        className
      )}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="relative h-full w-full"
      >
        {/* Glass Background */}
        <motion.div
          className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-900/50 backdrop-blur-sm"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Image */}
        <motion.div
          className={cn(
            "absolute inset-0 h-full w-full rounded-2xl overflow-hidden",
            imageClassName
          )}
        >
          <motion.img
            src={imageUrl}
            alt="Project thumbnail"
            className="h-full w-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className={cn(
            "absolute inset-0 p-8 text-white",
            childrenClassName
          )}
          style={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>

        {/* Shine Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl opacity-0"
          style={{
            background: `radial-gradient(
              400px circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%,
              rgba(255,255,255,0.1),
              transparent 40%
            )`,
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};
