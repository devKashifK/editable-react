import { cn } from "@/lib/utils";
import React from "react";
import parse from "html-react-parser";

export default function Title({
  title,
  subtitle,
  description,
  className,
  descriptionClassName,
  titleClassName,
  subtitleClassName,
}: {
  title?: string | React.ReactNode;
  subtitle?: string;
  description?: string | React.ReactNode;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {

  console.log(subtitleClassName,descriptionClassName, "Check subtitleClassName");
  return (
    <div className={cn(
      "relative flex flex-col w-full items-center ",
      className
    )}>
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Subtitle */}
        {subtitle && (
          <span className={cn(
              "inline-flex items-center px-4 py-1.5 rounded-full bg-background/5 text-background text-sm font-medium tracking-wide mb-6",
            subtitleClassName
          )}>
            {subtitle}
          </span>
        )}

        {/* Title */}
        <div className={cn("text-center mb-6 text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-[1.15]" ,titleClassName)}>
          {typeof title === "string" ? (
            <h2>
              {title}
            </h2>
          ) : (
            title
          )}
        </div>

        {/* Description */}
        {description && (
          <div className={cn(
            "max-w-4xl mx-auto text-center",
            descriptionClassName
          )}>
            <div className="text-base md:text-lg text-gray-600 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        )}
      </div>

      {/* Subtle Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-background/[0.03] rounded-full blur-3xl" />
      </div>
    </div>
  );
}
