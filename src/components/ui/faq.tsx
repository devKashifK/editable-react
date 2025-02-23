"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string | number;
  title: string;
  content: string | string[]; // Can be string[] or JSON string
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className }: FAQProps) {
  const [openId, setOpenId] = useState<string | number | null>(null);

  const toggleItem = (id: string | number) => {
    setOpenId(openId === id ? null : id);
  };

  const parseContent = (content: string | string[]): string[] => {
    if (Array.isArray(content)) return content;
    try {
      return JSON.parse(content);
    } catch {
      return [content];
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "rounded-2xl border border-gray-200 dark:border-gray-800",
            "bg-white/50 dark:bg-gray-900/50",
            "backdrop-blur-xl"
          )}
        >
          <button
            onClick={() => toggleItem(item.id)}
            className={cn(
              "flex w-full items-center justify-between",
              "px-6 py-4 text-left",
              "transition-all duration-200"
            )}
          >
            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
              {item.title}
            </h3>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-gray-500 dark:text-gray-400",
                "transition-transform duration-200",
                openId === item.id && "rotate-180"
              )}
            />
          </button>
          
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openId === item.id ? "max-h-[500px]" : "max-h-0"
            )}
          >
            <div className="space-y-3 px-6 pb-4">
              {parseContent(item.content).map((text, index) => (
                <div
                  key={index}
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}



// <FAQ items={exampleItems} />
