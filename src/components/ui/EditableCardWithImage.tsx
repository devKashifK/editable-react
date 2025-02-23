import React from "react";
import { cn } from "@/lib/utils";
import { ImageUploaderAndPicker } from "./image-picker";

interface EditableCardWithImageProps {
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  onChange: (newProps: Partial<EditableCardWithImageProps>) => void;
}

export default function EditableCardWithImage({
  title,
  description,
  image,
  className,
  onChange,
}: EditableCardWithImageProps) {
  const handleContentEdit = (field: "title" | "description", value: string) => {
    onChange({ [field]: value });
  };

  const handleImageChange = (newImage: string) => {
    onChange({ image: newImage });
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg",
        className
      )}
    >
      <div className="relative h-48 w-full overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ImageUploaderAndPicker onChange={handleImageChange} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div
            contentEditable
            suppressContentEditableWarning
            className="text-xl font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
            onBlur={(e) =>
              handleContentEdit("title", e.currentTarget.textContent || "")
            }
          >
            {title}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            className="mt-3 text-base text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
            onBlur={(e) =>
              handleContentEdit(
                "description",
                e.currentTarget.textContent || ""
              )
            }
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
