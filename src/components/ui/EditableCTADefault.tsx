import React from "react";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Glass from "@/lib/helpers";
import Container from "./container";
import { ImageUploaderAndPicker } from "./image-picker";
import EditableDescription from "./EditableDescription";

interface EditableCTADefaultProps {
  title?: string;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: string;
  descriptionClassName?: string;
  onChange: (newProps: Partial<EditableCTADefaultProps>) => void;
}

export default function EditableCTADefault({
  title,
  subtitle,
  description,
  image,
  descriptionClassName,
  onChange,
}: EditableCTADefaultProps) {
  const handleContentEdit = (
    field: "title" | "subtitle" | "description",
    value: string
  ) => {
    onChange({ [field]: value });
  };

  const handleImageChange = (newImage: string) => {
    onChange({ image: newImage });
  };

  const handleDescriptionEdit = (value: string) => {
    handleContentEdit("description", value);
  };

  return (
    <Container>
      <Glass
        className="flex-col gap-8 py-20 justify-center items-center bg-cover bg-center relative group"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <ImageUploaderAndPicker onChange={handleImageChange} />
        </div>
        <div className="flex absolute left-0 top-0 w-full h-full bg-black/60"></div>
        <div className="flex flex-col justify-center items-center gap-8 md:gap-3 relative px-8">
          <h4
            contentEditable
            suppressContentEditableWarning
            className="text-4xl tracking-wider text-center text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
            onBlur={(e) =>
              handleContentEdit("title", e.currentTarget.textContent || "")
            }
          >
            {title}
          </h4>

          <div
            contentEditable
            suppressContentEditableWarning
            className="text-lg text-white/90 outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded px-1"
            onBlur={(e) =>
              handleContentEdit("subtitle", e.currentTarget.textContent || "")
            }
          >
            {typeof subtitle === "string" ? subtitle : null}
          </div>

         
          <EditableDescription description={description} onChange={handleDescriptionEdit} />
        </div>
      </Glass>
    </Container>
  );
}
