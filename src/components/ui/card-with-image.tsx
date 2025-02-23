"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CardWithImage({
  image,
  title,
  description,
  href = "/",
}: {
  title?: string;
  description?: React.ReactNode | string;
  image?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block h-full w-[300px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 border border-gray-200 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-transparent"
      )}
    >
      <div className="relative h-[200px] w-[300px] overflow-hidden bg-gray-100">
        {image && (
          <>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
      </div>

      <div className="relative p-6">
        <div className="space-y-4">
          {title && (
            <h3 className="text-xl font-bold text-gray-800 tracking-tight line-clamp-2 group-hover:text-background transition-colors duration-300">
              {title}
            </h3>
          )}
          
          {description && (
            <div className="text-[15px] leading-relaxed text-gray-600 line-clamp-3">
              {typeof description === "string" ? (
                <p>{description}</p>
              ) : (
                description
              )}
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center text-sm font-medium text-background">
            <span className="relative transition-all duration-300 ease-out group-hover:pr-2">Xem thêm</span>
            <svg
              className="w-5 h-5 ml-2 transition-all duration-300 ease-out group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-background/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
}
