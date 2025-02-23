"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface EditableContactFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
  onChange?: (newProps: Partial<EditableContactFormProps>) => void;
  editable?: boolean;
}

export default function EditableContactForm({
  title = "Contact Us",
  subtitle = "Get in touch with us",
  buttonText = "Send Message",
  className,
  onChange,
  editable = true,
}: EditableContactFormProps) {
  if (!editable) {
    return (
      <div className={cn("w-full max-w-md mx-auto", className)}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-sm"
              disabled
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-sm"
              disabled
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-sm min-h-[120px]"
              disabled
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-highlight text-white font-semibold"
            disabled
          >
            {buttonText}
          </button>
        </form>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    if (onChange) {
      onChange({ [field]: value });
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="text-center mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="text-2xl font-bold mb-2 bg-transparent border-none focus:outline-none focus:ring-0 text-center w-full"
          placeholder="Form Title"
        />
        <input
          type="text"
          value={subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          className="text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 text-center w-full"
          placeholder="Form Subtitle"
        />
      </div>
      <form className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-sm"
            disabled
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-sm"
            disabled
          />
        </div>
        <div>
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-sm min-h-[120px]"
            disabled
          />
        </div>
        <input
          type="text"
          value={buttonText}
          onChange={(e) => handleChange("buttonText", e.target.value)}
          className="w-full p-3 rounded-lg bg-highlight text-white font-semibold border-none focus:outline-none focus:ring-0 text-center"
          placeholder="Button Text"
        />
      </form>
    </div>
  );
}
