"use client";
import React from "react";

interface EditableTitleWithDoubleBorderProps {
  children: string;
  onChange?: (newText: string) => void;
  editable?: boolean;
}

export default function EditableTitleWithDoubleBorder({
  children,
  onChange,
  editable = true,
}: EditableTitleWithDoubleBorderProps) {
  if (!editable) {
    return (
      <div className="relative w-max">
        <div className="absolute top-0 left-0 w-14 lg:w-20 h-0.5 bg-background rounded-md"></div>
        <div className="absolute top-[12px] transform rotate-90 -left-[12px] w-6 h-0.5 bg-background rounded-md"></div>
        <div className="px-3 py-1.5">
          <h5 className="tracking-widest text-xl">{children || ""}</h5>
        </div>
        <div className="absolute bottom-0 right-0 w-14 lg:w-20 h-0.5 bg-background rounded-md"></div>
        <div className="absolute bottom-[12px] transform rotate-90 -right-[12px] w-6 h-0.5 bg-background rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="relative w-max">
      <div className="absolute top-0 left-0 w-14 lg:w-20 h-0.5 bg-background rounded-md"></div>
      <div className="absolute top-[12px] transform rotate-90 -left-[12px] w-6 h-0.5 bg-background rounded-md"></div>
      <div className="px-3 py-1.5">
        <input
          type="text"
          value={children || ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="tracking-widest text-xl bg-transparent w-full text-center"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-14 lg:w-20 h-0.5 bg-background rounded-md"></div>
      <div className="absolute bottom-[12px] transform rotate-90 -right-[12px] w-6 h-0.5 bg-background rounded-md"></div>
    </div>
  );
}
