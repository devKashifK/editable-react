"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EditableIcon } from "./editable-icon";
import EditableDescription from "./EditableDescription";
import { LinkPage } from "./link-page";

interface EditableHoverCardProps {
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  cta?: string | React.ReactNode;
  color?: string;
  className?: string;
  iconColor?: string;
  onChange?: (newProps: Partial<EditableHoverCardProps>) => void;
}

export default function EditableHoverCard({
  icon,
  title,
  description,
  cta,
  color = "bg-background",
  className,
  iconColor,
  onChange,
  ...props
}: EditableHoverCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [addLink, setAddLink] = useState(false);

  const handleEdit = (field: string, value: string) => {
    if (onChange) {
      onChange({ [field]: value });
    }
  };

  const handleContentEdit = (
    ref: React.RefObject<HTMLElement>,
    field: string
  ) => {
    if (ref.current) {
      handleEdit(field, ref.current.innerText);
    }
  };

  const handleDescriptionEdit = (value: string) => {
    handleEdit("description", value);
  };

  return (
    <div className={cn(
      "group relative overflow-hidden",
      "rounded-[2rem] p-8 md:p-10",
      "bg-gradient-to-b from-white/80 to-white/30",
      "dark:from-gray-950/80 dark:to-gray-950/30",
      "backdrop-blur-xl backdrop-saturate-150",
      "border border-white/20 dark:border-gray-800/20",
      className
    )}>

      <LinkPage onClick={props.onClick} addLink={addLink} setAddLink={setAddLink} onChange={onChange} />
      {/* Ambient Light Effect */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-br from-transparent via-current to-transparent",
        color
      )} />


     
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)]" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-8">
        {/* Icon Picker */}
        <EditableIcon
          icon={icon}
          iconColor={iconColor}
          onIconChange={(newIcon) => handleEdit("icon", newIcon)}
        />

        {/* Text Content */}
        <div className="space-y-3">
          <h3
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={() => handleContentEdit(titleRef, "title")}
            className={cn(
              "text-2xl font-bold tracking-tight outline-none",
              "empty:before:content-[attr(data-placeholder)]",
              "empty:before:text-gray-400",
              "text-gray-900 dark:text-gray-100"
            )}
            data-placeholder="Enter title"
          >
            {title}
          </h3>

          {/* <p
            ref={descriptionRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={() => handleContentEdit(descriptionRef, "description")}
            className={cn(
              "text-base leading-relaxed outline-none whitespace-pre-wrap",
              "empty:before:content-[attr(data-placeholder)]",
              "empty:before:text-gray-400",
              "text-gray-500 dark:text-gray-400"
            )}
            data-placeholder="Enter description"
          >
            {description}
          </p> */}
          <EditableDescription description={description} onChange={handleDescriptionEdit} />
        </div>

        {/* CTA Section */}
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
          <div
            ref={ctaRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={() => handleContentEdit(ctaRef, "cta")}
            className={cn(
              "outline-none",
              "empty:before:content-[attr(data-placeholder)]",
              "empty:before:text-gray-400"
            )}
            data-placeholder="Enter CTA text"
          >
            {cta}
          </div>
          <Icon icon="lucide:arrow-right" className="h-5 w-5" />
        </div>
      </div>

      {/* Border Gradient */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "rounded-[2rem] p-0.5",
        "bg-gradient-to-br from-white/5 to-white/30",
        "dark:from-white/5 dark:to-white/10"
      )} />
    </div>
  );
}
