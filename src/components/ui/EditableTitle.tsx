"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import EditableDescription from "./EditableDescription";


interface EditableTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  onChange: (newProps: Partial<EditableTitleProps>) => void;
}

export default function EditableTitle({
  title,
  subtitle,
  description,
  className,
  descriptionClassName,
  titleClassName,
  onChange,
}: EditableTitleProps) {

  const handleContentEdit = (
    field: "title" | "subtitle" | "description",
    value: string
  ) => {
    onChange({ [field]: value });
  };



  // Update local state when description prop changes


  return (
    <div className="flex w-full px-4 lg:px-0 justify-between">
      <div
        className={cn(
          "flex flex-col w-full gap-1 justify-start items-start lg:justify-center lg:items-center",
          className
        )}
      >
        {subtitle && (
          <h4
            contentEditable
            suppressContentEditableWarning
            className="text-highlight text-left text-2xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
            onBlur={(e) =>
              handleContentEdit("subtitle", e.currentTarget.textContent || "")
            }
          >
            {subtitle}
          </h4>
        )}

        <div className="flex flex-col gap-3 w-full">
          <div
            className={cn(
              "relative flex flex-col justify-start items-start lg:justify-center lg:items-center gap-1 text-2xl text-center md:text-4xl tracking-wider text-black/50"
            )}
          >
            <h2
              contentEditable
              suppressContentEditableWarning
              className={cn(
                "text-center relative lg:text-4xl tracking-wider text-black/50 outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1",
                titleClassName
              )}
              onBlur={(e) =>
                handleContentEdit("title", e.currentTarget.textContent || "")
              }
            >
              {title}
              <span className="block h-0.5 bg-background mt-2 w-full"></span>
            </h2>
          </div>
        </div>

        <span className="block h-0.5 bg-highlight w-max"></span>

        {/* {description && (
          <p
            contentEditable
            suppressContentEditableWarning
            className={cn(
              "text-left lg:text-center text-black/50 w-full lg:w-[70%] outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1",
              descriptionClassName
            )}
            onBlur={(e) =>
              handleContentEdit(
                "description",
                e.currentTarget.textContent || ""
              )
            }
          >
            {typeof description === "string" ? parse(description) : description}
          </p>
        )} */}

{description !== undefined && (
          <div className={cn("w-full lg:w-[70%]", descriptionClassName)}>
          <EditableDescription description={description} onChange={(value) => handleContentEdit("description", value)} />
          </div>
        )}
      </div>
    </div>
  );
}
