"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Trash } from "lucide-react";

interface FAQItem {
  id: string | number;
  title: string;
  content: string | string[];
}

interface EditableFAQProps {
  items: FAQItem[];
  className?: string;
  onChange: (items: FAQItem[]) => void;
}

export function EditableFAQ({ items, className, onChange }: EditableFAQProps) {
  const [openId, setOpenId] = useState<string | number | null>(null);
  const [localItems, setLocalItems] = useState<FAQItem[]>(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const toggleItem = (id: string | number) => {
    setOpenId(openId === id ? null : id);
  };

  const parseContent = (content: string | string[]): string[] => {
    if (Array.isArray(content)) return content;
    if (!content) return [];
    try {
      return JSON.parse(content);
    } catch {
      console.log("Parse error for content:", content);
      return [];
    }
  };

  const updateItem = (id: string | number, updates: Partial<FAQItem>) => {
    const newItems = localItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setLocalItems(newItems);
    onChange(newItems);
  };

  const addContentLine = (itemId: string | number) => {
    const item = localItems.find(i => i.id === itemId);
    if (item) {
      const currentContent = parseContent(item.content);
      const newContent = JSON.stringify([...currentContent, "- New line"]);
      updateItem(itemId, { content: newContent });
    }
  };

  const updateContentLine = (itemId: string | number, lineIndex: number, newText: string) => {
    const item = localItems.find(i => i.id === itemId);
    if (item) {
      const currentContent = parseContent(item.content);
      currentContent[lineIndex] = newText;
      console.log("Updating content:", currentContent);
      updateItem(itemId, { content: JSON.stringify(currentContent) });
    }
  };

  const removeContentLine = (itemId: string | number, lineIndex: number) => {
    const item = localItems.find(i => i.id === itemId);
    if (item) {
      const currentContent = parseContent(item.content);
      const newContent = currentContent.filter((_, index) => index !== lineIndex);
      updateItem(itemId, { content: JSON.stringify(newContent) });
    }
  };

  const addNewItem = () => {
    const newId = Date.now();
    const newItems = [...localItems, {
      id: newId,
      title: "New Question",
      content: JSON.stringify(["- New Answer"])
    }];
    setLocalItems(newItems);
    onChange(newItems);
    setOpenId(newId);
  };

  const removeItem = (id: string | number) => {
    const newItems = localItems.filter(item => item.id !== id);
    setLocalItems(newItems);
    onChange(newItems);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {localItems.map((item) => (
        <div
          key={item.id}
          className={cn(
            "rounded-2xl border border-gray-200 dark:border-gray-800",
            "bg-white/50 dark:bg-gray-900/50",
            "backdrop-blur-xl"
          )}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem(item.id, { title: e.target.value })}
              className="flex-1 bg-transparent text-lg font-medium outline-none"
              placeholder="Enter question..."
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleItem(item.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-500 dark:text-gray-400",
                    "transition-transform duration-200",
                    openId === item.id && "rotate-180"
                  )}
                />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openId === item.id ? "max-h-[500px]" : "max-h-0"
            )}
          >
            <div className="space-y-3 px-6 pb-4">
              {parseContent(item.content).map((text, index) => (
                <div key={index} className="flex items-start gap-2">
                  <textarea
                    defaultValue={text}
                    onBlur={(e) => updateContentLine(item.id, index, e.target.value)}
                    className="flex-1 bg-transparent resize-none outline-none min-h-[60px] prose prose-gray dark:prose-invert max-w-none"
                    placeholder="Enter answer..."
                    rows={3}
                  />
                  <button
                    onClick={() => removeContentLine(item.id, index)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addContentLine(item.id)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <Plus className="h-4 w-4" />
                Add line
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={addNewItem}
        className={cn(
          "w-full rounded-2xl border border-dashed",
          "border-gray-200 dark:border-gray-800",
          "p-4 text-gray-500 hover:text-gray-700",
          "transition-colors duration-200"
        )}
      >
        <Plus className="h-5 w-5 mx-auto" />
      </button>
    </div>
  );
} 