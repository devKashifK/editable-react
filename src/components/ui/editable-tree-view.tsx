"use client";

import React, { useState, useRef } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableTreeViewProps {
  title: string;
  description?: string;
  isLast?: boolean;
  onChange: (props: { title?: string; description?: string }) => void;
}

export default function EditableTreeView({
  title,
  description,
  isLast = false,
  onChange,
}: EditableTreeViewProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const titleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const toggleExpand = () => {
    if (description) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleContentEdit = (
    ref: React.RefObject<HTMLElement>,
    field: "title" | "description"
  ) => {
    if (ref.current) {
      onChange({ [field]: ref.current.innerText });
    }
  };

  return (
    <div className="flex items-start gap-2 relative">
      <div className="flex flex-col items-center">
        <div className="bg-background w-2 h-2 rounded-full mt-2 relative" />
        {!isLast && (
          <div className="h-full w-[1px] bg-background/40 mt-1 absolute top-4" />
        )}
      </div>
      <div className="flex-1">
        <div
          className={cn(
            "flex items-center gap-2",
            description && "hover:text-primary transition-colors"
          )}
        >
          <div onClick={toggleExpand} className="cursor-pointer">
            {description ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4 text-background" />
              ) : (
                <ChevronRight className="h-4 w-4 text-background" />
              )
            ) : (
              <div className="w-4" /> // Placeholder for alignment
            )}
          </div>
          <span
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={() => handleContentEdit(titleRef, "title")}
            className="font-medium outline-none"
          >
            {title}
          </span>
        </div>
        {isExpanded && (
          <p
            ref={descriptionRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={() => handleContentEdit(descriptionRef, "description")}
            className="mt-2 ml-6 text-muted-foreground outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
            data-placeholder="Enter description..."
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
} 