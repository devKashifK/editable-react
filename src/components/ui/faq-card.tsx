"use client";
import { useState } from "react";

interface FaqItem {
  title: string;
  content: string[];
}

export const FaqCard: React.FC<FaqItem> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="bg-white rounded-xl overflow-hidden mb-4 last:mb-0 transition-all duration-200 border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-8 py-6 text-left flex justify-between items-center transition-all duration-200 ${
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
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 py-6 bg-gradient-to-r from-blue-50/30 to-white">
          {content.map((line, idx) => {
            if (line.startsWith("-")) {
              // Handle bullet points
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
            // Handle regular paragraphs
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
