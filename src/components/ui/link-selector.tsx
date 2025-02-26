import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import db from "../db/db";

interface Page {
  name: string;
  category: string;
}

interface LinkSelectorProps {
  onSelect: (value: string) => void;
  className?: string;
}

export function LinkSelector({ onSelect, className }: LinkSelectorProps) {
  const { data, isLoading } = useQuery<{ data: Page[] | null }>({
    queryKey: ["pages"],
    queryFn: async () => {
      const response = await db.from("pages").select("name, category");
      return response;
    },
  });

  const groupedPages = React.useMemo(() => {
    const pages = data?.data || [];
    return pages.reduce((acc: Record<string, Page[]>, page) => {
      const category = page.category || 'uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(page);
      return acc;
    }, {});
  }, [data]);

  if (isLoading) {
    return <Select disabled>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Loading..." />
      </SelectTrigger>
    </Select>;
  }

  return (
    <Select onValueChange={(value) => {
      const selected =  data?.data?.find(page => page.name === value)
      if(selected?.category === "self") {
        onSelect(`/${selected?.name}`)
      } else {
        onSelect(`/${selected?.category}/${selected?.name}`)
      }
    }}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder="Select a page..." />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(groupedPages).map(([category, pages]) => (
          <SelectGroup key={category}>
            <SelectLabel 
              className="font-bold text-sm text-muted-foreground border-b pb-1 mb-1"
            >
              {category.toUpperCase()}
            </SelectLabel>
            {pages.map((page) => (
              <SelectItem 
                key={page.name} 
                value={page.name}
                className="text-sm"
              >
                {page.name.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}