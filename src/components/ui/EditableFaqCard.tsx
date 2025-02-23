"use client";
import { useState, useEffect } from "react";

interface EditableFaqItemProps {
  title: string;
  content: string[];
  onChange: (newProps: { title: string; content: string[] }) => void;
  className?: string;
}

export const EditableFaqCard: React.FC<EditableFaqItemProps> = ({ 
  title, 
  content,
  onChange,
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    console.log("EditableFaqCard received props:", { title, content });
  }, [title, content]);

  useEffect(() => {
    setEditedTitle(title);
    setEditedContent(content);
  }, [title, content]);

  const handleSave = () => {
    console.log("Saving FAQ card with:", { 
      title: editedTitle, 
      content: editedContent 
    });

    onChange({
      title: editedTitle,
      content: editedContent.filter(line => line.trim() !== '')
    });
    setIsEditing(false);
  };

  const handleContentChange = (idx: number, newValue: string) => {
    const newContent = [...editedContent];
    newContent[idx] = newValue;
    setEditedContent(newContent);
    
    console.log("Content changed:", newContent);
  };

  if (isEditing) {
    return (
      <article className="bg-white rounded-xl overflow-hidden mb-4 last:mb-0 transition-all duration-200 border border-gray-100">
        <div className="p-6">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Question title"
          />
          <div className="space-y-2">
            {editedContent.map((line, idx) => (
              <div key={idx} className="flex gap-2">
                <textarea
                  value={line}
                  onChange={(e) => handleContentChange(idx, e.target.value)}
                  onBlur={() => {
                    setEditedContent(editedContent.filter(line => line.trim() !== ''));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newContent = editedContent.filter((_, i) => i !== idx);
                    setEditedContent(newContent);
                    console.log("Removed line, new content:", newContent);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const newContent = [...editedContent, ""];
              setEditedContent(newContent);
              console.log("Added new line, new content:", newContent);
            }}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            + Add paragraph
          </button>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setEditedTitle(title);
                setEditedContent(content);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </article>
    );
  }

  // ... rest of the original FaqCard render logic ...
  return (
    <article className="bg-white rounded-xl overflow-hidden mb-4 last:mb-0 transition-all duration-200 border border-gray-100">
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex-1 px-8 py-6 text-left flex justify-between items-center transition-all duration-200 ${
            isOpen
              ? "bg-gradient-to-r from-blue-50 to-white"
              : "bg-white hover:bg-gray-50"
          }`}
          aria-expanded={isOpen}
        >
          <h2
            className={`text-lg font-semibold transition-colors duration-200 ${
              isOpen ? "text-blue-600" : "text-gray-800"
            }`}
          >
            {title}
          </h2>
          <span
            className={`ml-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
              isOpen ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-45" : ""
              }`}
            >
              <path
                d="M6 0V12M0 6H12"
                stroke="currentColor"
                strokeWidth="2"
                className={isOpen ? "text-blue-600" : "text-gray-600"}
              />
            </svg>
          </span>
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-6 text-gray-400 hover:text-blue-600"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 py-6 bg-gradient-to-r from-blue-50/30 to-white">
          {content.map((line, idx) => {
            if (line.startsWith("-")) {
              return (
                <div
                  key={idx}
                  className="flex items-start space-x-3 mb-3 last:mb-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                  <p
                    className="text-gray-600 leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{
                      __html: line
                        .substring(2)
                        .replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong class='text-gray-800 font-medium'>$1</strong>"
                        ),
                    }}
                  />
                </div>
              );
            }
            return (
              <p
                key={idx}
                className="text-gray-600 mb-4 last:mb-0 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: line.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong class='text-gray-800 font-medium'>$1</strong>"
                  ),
                }}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
};