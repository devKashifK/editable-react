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
  sub_category: string;
}

interface LinkSelectorProps {
  onSelect: (value: string) => void;
  className?: string;
}

export function LinkSelector({ onSelect, className }: LinkSelectorProps) {
  const { data, isLoading } = useQuery<{ data: Page[] | null }>({
    queryKey: ["pages"],
    queryFn: async () => {
      const response = await db.from("pages").select("name, category, sub_category");
      return response;
    },
  });

  const groupedPages = React.useMemo(() => {
    const pages = data?.data || [];
    return pages.reduce((acc: Record<string, Record<string, Page[]>>, page) => {
      const category = page.category || 'uncategorized';
      const subCategory = page.sub_category || 'self';
      
      if (!acc[category]) {
        acc[category] = {};
      }
      
      if (!acc[category][subCategory]) {
        acc[category][subCategory] = [];
      }
      
      acc[category][subCategory].push(page);
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
      const pages = data?.data || [];
      const selected = pages.find(page => page.name === value);
      if (selected?.category === "self") {
        onSelect(`/${selected.name}`);
      } else if (selected?.sub_category === "self") {
        onSelect(`/${selected.category}/${selected.name}`);
      } else {
        onSelect(`/${selected.category}/${selected.sub_category}/${selected.name}`);
      }
    }}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder="Select a page..." />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(groupedPages).map(([category, subCategories]) => (
          <SelectGroup key={category}>
            <SelectLabel 
              className="font-bold text-sm text-muted-foreground border-b pb-1 mb-1"
            >
              {category.toUpperCase()}
            </SelectLabel>
            {Object.entries(subCategories).map(([subCategory, pages]) => (
              <React.Fragment key={`${category}-${subCategory}`}>
                {subCategory !== 'self' && (
                  <SelectLabel 
                    className="text-xs text-muted-foreground pl-2 pt-2"
                  >
                    {subCategory.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </SelectLabel>
                )}
                {pages.map((page) => (
                  <SelectItem 
                    key={page.name} 
                    value={page.name}
                    className={cn(
                      "text-sm",
                      subCategory !== 'self' && "pl-4"
                    )}
                  >
                    {page.name.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </SelectItem>
                ))}
              </React.Fragment>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}