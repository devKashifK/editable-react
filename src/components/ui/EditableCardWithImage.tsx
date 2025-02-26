import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageUploaderAndPicker } from "./image-picker";
import { useMediaByExactTitle } from "./use-media";
import { LinkSelector } from "./link-selector";
import { Button } from "./button";
import { LinkPage } from "./link-page";

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
  ...props
}: EditableCardWithImageProps) {
  const handleContentEdit = (field: "title" | "description", value: string) => {
    onChange({ [field]: value });
  };

  const [addLink, setAddLink] = useState<boolean>(false);

  const handleImageChange = (newImage: string) => {
    onChange({ image: newImage });
  };

  
  

  const backgroundImage = useMediaByExactTitle(image);


  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg",
        className
      )}
    > 

    <LinkPage onClick={props.onClick} addLink={addLink} setAddLink={setAddLink} onChange={onChange} />
    
      <div className="relative h-48 w-full overflow-hidden group">
          <ImageUploaderAndPicker onChange={handleImageChange} />
          {image && (
          <>
            <img
              src={backgroundImage?.data}
              alt={title}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
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


