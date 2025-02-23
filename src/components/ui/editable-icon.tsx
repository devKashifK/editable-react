"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { IconPickerPanel } from "./icon-picker";
import { isStringifiedJSON } from "./hover-card";

interface IconPickerTriggerProps {
  icon?: string | React.ReactNode;
  iconColor?: string;
  isHovered?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  containerClassName?: string;
  onIconChange?: (newIcon: string) => void;
}

export function EditableIcon({
  icon,
  iconColor,
  isHovered,
  size = "md",
  className,
  containerClassName,
  onIconChange,
}: IconPickerTriggerProps) {
  const sizeClasses = {
    sm: {
      container: "h-10 w-10",
      icon: "h-5 w-5",
    },
    md: {
      container: "h-14 w-14",
      icon: "h-7 w-7",
    },
    lg: {
      container: "h-16 w-16",
      icon: "h-8 w-8",
    },
  };

  return (
    <div className="relative inline-flex">
      <div 
        className={cn(
          "absolute -inset-4 rounded-full opacity-20 transition-all duration-700",
          isHovered ? "bg-current" : "scale-0"
        )}
      />
      <div 
        className={cn(
          "relative rounded-2xl",
          "flex items-center justify-center",
          "bg-gradient-to-br from-gray-50 to-gray-100/50",
          "dark:from-gray-800 dark:to-gray-900/50",
          "transition-all duration-700 ease-out",
          "group-hover:shadow-lg",
          isHovered && "scale-110 rotate-3",
          sizeClasses[size].container,
          containerClassName
        )}
      >
        <Popover>
          <PopoverTrigger>
            {typeof icon === "string" ? (
              <div className="cursor-pointer hover:opacity-80">
                <Icon
                  icon={icon ? isStringifiedJSON(icon) ? JSON.parse(icon) : icon : ""}
                  className={cn(
                    "transition-all duration-700",
                    isHovered ? "text-white" : "text-gray-600 dark:text-gray-300",
                    sizeClasses[size].icon,
                    iconColor,
                    className
                  )}
                />
              </div>
            ) : (
              icon
            )}
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <IconPickerPanel onChangeIcon={onIconChange} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
} 