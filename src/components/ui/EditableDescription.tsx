"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { Extension } from "@tiptap/core";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

// Create a custom FontSize extension using TextStyle
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize ? element.style.fontSize : null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ commands }) => {
          if (!fontSize) {
            return commands.unsetMark("textStyle", { fontSize: null });
          }
          return commands.setMark("textStyle", { fontSize });
        },
    };
  },
});

// Mapping dropdown values to CSS font-size values.
const FONT_SIZE_VALUES: Record<string, string> = {
  "text-xs": "0.75rem",
  "text-sm": "0.875rem",
  "text-base": "1rem",
  "text-lg": "1.125rem",
  "text-xl": "1.25rem",
  "text-2xl": "1.5rem",
  "text-3xl": "1.875rem",
};

const FONT_SIZES = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
];

const TEXT_COLORS = [
  { name: "Default", color: "inherit" },
  { name: "Purple", color: "#9333EA" },
  { name: "Red", color: "#DC2626" },
  { name: "Blue", color: "#2563EB" },
  { name: "Green", color: "#16A34A" },
  { name: "Orange", color: "#EA580C" },
  { name: "Yellow", color: "#FACC15" },
  { name: "Pink", color: "#EC4899" },
  { name: "Gray", color: "#6B7280" },
  { name: "Black", color: "#000000" },
  { name: "White", color: "#FFFFFF" },
];

// Custom toolbar component
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col border-b border-gray-200 dark:border-gray-800">
      {/* Primary formatting options */}
      <div className="flex flex-wrap gap-2 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive("bold") &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Bold"
        >
          <Icon icon="lucide:bold" className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive("italic") &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Italic"
        >
          <Icon icon="lucide:italic" className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive("underline") &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Underline"
        >
          <Icon icon="lucide:underline" className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive("strike") &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Strikethrough"
        >
          <Icon icon="lucide:strikethrough" className="w-4 h-4" />
        </button>
        <div className="w-px h-6 my-auto bg-gray-200 dark:bg-gray-800" />
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300"
          )}
          title="Line Break"
        >
          <Icon icon="lucide:corner-down-left" className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              const url = prompt("Enter URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }
          }}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive("link") &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Link"
        >
          <Icon icon="lucide:link" className="w-4 h-4" />
        </button>
        {/* List formatting options */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive("bulletList") &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Bullet List"
        >
          <Icon icon="lucide:list" className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive("orderedList") &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Ordered List"
        >
          <Icon icon="lucide:list-ordered" className="w-4 h-4" />
        </button>
        {/* Text alignment buttons */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive({ textAlign: "left" }) &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Align Left"
        >
          <Icon icon="lucide:align-left" className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive({ textAlign: "center" }) &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Align Center"
        >
          <Icon icon="lucide:align-center" className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "p-2 rounded-lg transition-all",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            editor.isActive({ textAlign: "right" }) &&
              "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          )}
          title="Align Right"
        >
          <Icon icon="lucide:align-right" className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary formatting options */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-900">
        {/* Font size dropdown */}
        <select
          onChange={(e) => {
            const selected = e.target.value;
            if (!selected) {
              editor.chain().focus().setFontSize("").run();
            } else {
              const sizeValue = FONT_SIZE_VALUES[selected];
              editor.chain().focus().setFontSize(sizeValue).run();
            }
          }}
          className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="">Font size</option>
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size.replace("text-", "")}
            </option>
          ))}
        </select>

        {/* Color dropdown */}
        <select
          onChange={(e) => {
            editor.chain().focus().setColor(e.target.value).run();
          }}
          className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="">Text color</option>
          {TEXT_COLORS.map((color) => (
            <option key={color.name} value={color.color}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

interface EditableDescriptionProps {
  description: string;
  // onChange expects the new HTML string.
  onChange: (value: string) => void;
}

export default function EditableDescription({
  description,
  onChange,
}: EditableDescriptionProps) {
  const editor = useEditor({
    extensions: [
      // Disable lists from StarterKit and add them explicitly
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
      FontSize,
    ],
    content: description || "<p></p>",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Update editor content if the external description prop changes
  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description || "<p></p>");
    }
  }, [description, editor]);

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <MenuBar editor={editor} />
      <div className="px-4 pb-4">
        <EditorContent
          editor={editor}
          className={cn(
            "prose dark:prose-invert max-w-none",
            "focus:outline-none",
            "min-h-[100px]"
          )}
        />
      </div>
    </div>
  );
}
