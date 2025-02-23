"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface EditableTitleWithBottomBorderProps {
  children: string;
  borderClass?: string;
  titleClass?: string;
  onChange?: (newText: string) => void;
  editable?: boolean;
}

export default function EditableTitleWithBottomBorder({
  children,
  borderClass,
  titleClass,
  onChange,
  editable = true,
}: EditableTitleWithBottomBorderProps) {
  if (!editable) {
    return (
      <div className="relative flex flex-col justify-start items-start gap-1">
        <h2
          className={cn(
            "text-2xl md:text-4xl tracking-wider text-black/50",
            titleClass
          )}
        >
          {children}
          <span
            className={cn("block h-0.5 bg-background mt-2", borderClass)}
          ></span>
        </h2>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-start items-start gap-1">
      <div
        className={cn(
          "text-2xl md:text-4xl tracking-wider text-black/50",
          titleClass
        )}
      >
        <input
          type="text"
          value={children || ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="bg-transparent w-full"
        />
        <span
          className={cn("block h-0.5 bg-background mt-2", borderClass)}
        ></span>
      </div>
    </div>
  );
}
