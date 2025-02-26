import React, { useState } from "react";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Container from "./container";
import { ImageUploaderAndPicker } from "./image-picker";
import EditableDescription from "./EditableDescription";
import { LinkPage } from "./link-page";

interface EditableCTAWithImageProps {
  title?: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  image?: string;
  flip?: boolean | string;
  className?: string;
  onChange: (newProps: Partial<EditableCTAWithImageProps>) => void;
  onClick?: string;
}

export default function EditableCTAWithImage({
  title,
  subtitle,
  description,
  image,
  flip,
  className,
  onChange,
  ...props
}: EditableCTAWithImageProps) {
  const handleContentEdit = (
    field: "title" | "subtitle" | "description",
    value: string
  ) => {
    onChange({ [field]: value });
  };
  const [addLink, setAddLink] = useState<boolean>(false);

  const handleImageChange = (newImage: string) => {
    onChange({ image: newImage });
  };

  return (
    <Container
      className={cn(
        "relative w-full flex flex-col lg:flex-row gap-10 py-10",
        flip ? "lg:flex-row-reverse" : "",
        className
      )}
    >
      <LinkPage onClick={props.onClick} addLink={addLink} setAddLink={setAddLink} onChange={onChange} />
      <div className="flex-1 relative group">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ImageUploaderAndPicker onChange={handleImageChange} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        {subtitle && (
          <h4
            contentEditable
            suppressContentEditableWarning
            className="text-highlight text-2xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
            onBlur={(e) =>
              handleContentEdit("subtitle", e.currentTarget.textContent || "")
            }
          >
            {subtitle}
          </h4>
        )}

        {title && (
          <h2
            contentEditable
            suppressContentEditableWarning
            className="text-4xl font-bold tracking-tight outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
            onBlur={(e) =>
              handleContentEdit("title", e.currentTarget.textContent || "")
            }
          >
            {title}
          </h2>
        )}

        {description && (
                <EditableDescription description={description} onChange={(value) => handleContentEdit("description", value)} />
        )}
      </div>
    </Container>
  );
}
