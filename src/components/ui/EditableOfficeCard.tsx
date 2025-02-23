"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface EditableOfficeCardProps {
  title?: string;
  address?: string;
  phone?: string;
  email?: string;
  className?: string;
  onChange?: (newProps: Partial<EditableOfficeCardProps>) => void;
  editable?: boolean;
}

export default function EditableOfficeCard({
  title = "",
  address = "",
  phone = "",
  email = "",
  className,
  onChange,
  editable = true,
}: EditableOfficeCardProps) {
  if (!editable) {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-lg",
          className
        )}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{address}</p>
        <p className="text-gray-400">{phone}</p>
        <p className="text-gray-400">{email}</p>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    if (onChange) {
      onChange({ [field]: value });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-lg",
        className
      )}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
        placeholder="Office Name"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => handleChange("address", e.target.value)}
        className="text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
        placeholder="Address"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        className="text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
        placeholder="Phone Number"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
        placeholder="Email"
      />
    </div>
  );
}
