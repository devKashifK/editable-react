"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { EditableIcon } from "./editable-icon";
import EditableDescription from "./EditableDescription";

interface FeatureEditorProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  onUpdate: (data: { title: string; description: string; icon: string }) => void;
}

export const FeatureEditor = ({
  title,
  description,
  icon: initialIcon,
  index,
  onUpdate,
}: FeatureEditorProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleEdit = (field: string, value: string) => {
    onUpdate({
      title: titleRef.current?.innerText || "",
      description: field === "description" ? value : description,
      icon: field === "icon" ? value : initialIcon,
    });
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
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {/* Hover Effects */}
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}

      {/* Icon Section */}
      <div className="relative mb-4 z-10 px-4 md:px-10 text-neutral-600 dark:text-neutral-400">
        <EditableIcon
          icon={JSON.stringify(initialIcon)}
          onIconChange={(newIcon) => handleEdit("icon", JSON.parse(newIcon))}
          className="text-6xl"
        />
      </div>

      {/* Title Section */}
      <div className="text-lg font-bold mb-2 relative z-10 px-4 md:px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-highlight dark:bg-highlight group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <h3
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={() => handleContentEdit(titleRef, "title")}
          className={cn(
            "group-hover/feature:translate-x-2 transition duration-200",
            "text-neutral-800 dark:text-neutral-100 text-left",
            "outline-none",
            "empty:before:content-[attr(data-placeholder)]",
            "empty:before:text-gray-400"
          )}
          data-placeholder="Enter title"
        >
          {title}
        </h3>
      </div>

      {/* Description Section */}
    
      <div className="relative">
          <EditableDescription description={description} onChange={handleDescriptionEdit} />
           
          </div>
    </div>
  );
};

// Usage example:
// <FeatureEditor
//   title="Initial Title"
//   description="Initial Description"
//   icon="mdi:home"
//   index={0}
//   onUpdate={(data) => console.log('Updated:', data)}
// /> 