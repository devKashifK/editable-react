"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export default function Container({
  children,
  className,
  effect = "slide-left",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  effect?: string;
} & React.HTMLProps<HTMLDivElement>) {
  if (effect === "fade") {
    return (
      <motion.div
        className={cn(
          "flex flex-col lg:gap-4 gap-2   py-6 w-[94%] lg:w-[90%]  mr-auto ml-auto m mt-2 mb-2",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else if (effect === "slide-left") {
    return (
      <motion.div
        className={cn(
          "flex flex-col lg:gap-4 gap-2 py-6 w-[94%] lg:w-[80%]  mr-auto ml-auto m mt-2 mb-2",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else if (effect === "scale") {
    return (
      <motion.div
        className={cn(
          "flex flex-col lg:gap-4 gap-2 py-6 w-[94%] lg:w-[80%]  mr-auto ml-auto m mt-2 mb-2",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else if (effect === "slide-right") {
    return (
      <motion.div
        className={cn(
          "flex flex-col lg:gap-4 gap-2 py-6 w-[94%] lg:w-[80%]  mr-auto ml-auto m mt-2 mb-2",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else if (effect === "slide-up") {
    return (
      <motion.div
        className={cn(
          "flex flex-col lg:gap-4 gap-2 py-6 w-[94%] lg:w-[80%]  mr-auto ml-auto m mt-2 mb-2",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else if (effect === "slide-down") {
    return (
      <motion.div
        className={cn(
          "flex flex-col lg:gap-4 gap-2 py-6 w-[94%] lg:w-[80%]  mr-auto ml-auto m mt-2 mb-2",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else if (effect === "none") {
    return (
      <div
        className={cn(
          "flex flex-col lg:gap-4 gap-2 py-6 w-[94%] lg:w-[80%]  mr-auto ml-auto m mt-2 mb-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
}
