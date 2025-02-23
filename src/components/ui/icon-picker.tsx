"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useVirtualizer } from "@tanstack/react-virtual";

/* Example UI components from your codebase: */
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   1. useDebounce - Hook to delay search input
--------------------------------------------------------------------------- */
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/* ---------------------------------------------------------------------------
   2. Search Input
--------------------------------------------------------------------------- */
export function Search({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (val: string) => void;
}) {
  return (
    <div className="relative flex w-full flex-row bg-gray-500 rounded-sm">
      <Icon
        icon="material-symbols:search"
        className="absolute left-2 top-2 text-white"
      />
      <Input
        placeholder="Search icons"
        className="h-7 text-white placeholder:text-white border-none pl-8 shadow-none focus-visible:border-none"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   3. IconProvidersSelect - listing icon sets (collections.json)
   We'll use "mdi" as the default prefix so we don't 404.
--------------------------------------------------------------------------- */
export function IconProvidersSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [collections, setCollections] = useState<
    { prefix: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch("https://api.iconify.design/collections.json");
        if (!res.ok) throw new Error("Failed to fetch collections");
        const data = await res.json();

        // Convert to an array of { prefix, name }
        const list = Object.entries(data).map(
          ([prefix, details]: [string, any]) => ({
            prefix,
            name: details.name,
          })
        );
        setCollections(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  if (loading) {
    return <Skeleton className="h-7 w-full" />;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-7 bg-card bg-background rounded-sm focus:ring-offset-0">
        <SelectValue placeholder="Select icon set" />
      </SelectTrigger>
      <SelectContent className="z-[30002] max-h-36">
        {collections.map((collection) => (
          <SelectItem key={collection.prefix} value={collection.prefix}>
            {collection.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* ---------------------------------------------------------------------------
   4. IconPicker - fetch icons for prefix or do a search
--------------------------------------------------------------------------- */
export function IconPicker({
  prefix,
  onChangeIcon,
  searchQuery,
}: {
  prefix: string;
  onChangeIcon: (icon: string) => void;
  searchQuery: string;
}) {
  const [icons, setIcons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        let result: string[];
        if (searchQuery) {
          result = await fetchIconsBySearch(searchQuery);
        } else {
          // Generate a sample set of icons for the selected prefix
          result = generateSampleIcons(prefix);
        }
        if (!isCancelled) {
          setIcons(result);
        }
      } catch (error) {
        console.error("Error fetching icons:", error);
        // Fallback to sample icons on error
        if (!isCancelled) {
          setIcons(generateSampleIcons(prefix));
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [prefix, searchQuery]);

  if (loading) {
    return <IconPickerSkeleton />;
  }

  return <IconGrid icons={icons} onChangeIcon={onChangeIcon} />;
}

// Generate sample icons for a prefix
function generateSampleIcons(prefix: string): string[] {
  const commonIcons = [
    "home",
    "search",
    "settings",
    "user",
    "mail",
    "phone",
    "calendar",
    "document",
    "folder",
    "image",
    "video",
    "music",
    "download",
    "upload",
    "share",
    "heart",
    "star",
    "bookmark",
    "trash",
    "edit",
    "plus",
    "minus",
    "check",
    "close",
    "menu",
    "arrow-left",
    "arrow-right",
    "arrow-up",
    "arrow-down",
  ];

  return commonIcons.map((name) => `${prefix}:${name}`);
}

async function fetchIconsBySearch(searchTerm: string) {
  if (!searchTerm) return [];
  try {
    const url = `https://api.iconify.design/search?query=${encodeURIComponent(
      searchTerm
    )}&limit=100`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Search failed");
    }
    const data = await res.json();
    return data.icons || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

/* ---------------------------------------------------------------------------
   5. IconGrid - Virtualized grid of icons
--------------------------------------------------------------------------- */
function IconGrid({
  icons,
  onChangeIcon,
}: {
  icons: string[];
  onChangeIcon: (icon: string) => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(icons.length / 7),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="w-full h-32 overflow-auto pretty-scroll">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            className="grid grid-cols-7 gap-1"
          >
            {icons
              .slice(virtualRow.index * 7, (virtualRow.index + 1) * 7)
              .map((icon, index) => (
                <button
                  key={index}
                  onClick={() => onChangeIcon(JSON.stringify(icon))}
                  className="flex items-center justify-center p-1 hover:bg-accent rounded-md"
                >
                  <Icon icon={icon} className="w-4 h-4" />
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   6. IconPickerSkeleton - loading skeleton
--------------------------------------------------------------------------- */
export function IconPickerSkeleton() {
  return (
    <div className="grid grid-cols-7 gap-1 h-32">
      {Array.from({ length: 35 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-8" />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   7. IconPickerPanel - ties it all together with state
--------------------------------------------------------------------------- */
export function IconPickerPanel({
  onChangeIcon,
}: {
  onChangeIcon: (icon: string) => void;
}) {
  // "mdi" is valid => won't 404
  const [prefix, setPrefix] = useState("mdi");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* Search input */}
      <Search value={searchTerm} onValueChange={setSearchTerm} />

      {/* Icon set selection */}
      <IconProvidersSelect value={prefix} onChange={setPrefix} />

      {/* Show icons from prefix or search */}
      <IconPicker
        prefix={prefix}
        onChangeIcon={onChangeIcon}
        searchQuery={debouncedSearch}
      />
    </div>
  );
}
