import React from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  text: string;
  onChange: (newValue: string) => void;
  className?: string;
}

export default function EditableText({
  text,
  onChange,
  className,
}: EditableTextProps) {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      className={cn(
        "outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1",
        className
      )}
      onBlur={(e) => onChange(e.currentTarget.textContent || "")}
    >
      {text}
    </div>
  );
}
