"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeViewProps {
  title: string;
  description?: string;
  isLast?: boolean;
}

export default function TreeView({
  title,
  description,
  isLast = false,
}: TreeViewProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    if (description) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="flex items-start gap-2 relative ">
      <div className="flex flex-col items-center">
        <div className="bg-background w-2 h-2 rounded-full mt-2 relative" />
        {!isLast && (
          <div className="h-full w-[1px] bg-background/40 mt-1 absolute top-4" />
        )}
      </div>
      <div className="flex-1">
        <div
          className={cn(
            "flex items-center gap-2 cursor-pointer",
            description && "hover:text-primary transition-colors"
          )}
          onClick={toggleExpand}
        >
          {description ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-background" />
            ) : (
              <ChevronRight className="h-4 w-4 text-background" />
            )
          ) : (
            <div className="w-4" /> // Placeholder for alignment
          )}
          <span className="font-medium">{title}</span>
        </div>
        {isExpanded && description && (
          <p className="mt-2 ml-6 text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
