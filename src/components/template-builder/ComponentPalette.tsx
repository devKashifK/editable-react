import { AVAILABLE_COMPONENTS } from "@/components/ui/ComponentSelectorDialog";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@iconify/react";

interface ComponentPaletteProps {
  onAddComponent: (component: any) => void;
}

export function ComponentPalette({ onAddComponent }: ComponentPaletteProps) {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {AVAILABLE_COMPONENTS.map((component) => (
            <button
              key={component.type}
              onClick={() => onAddComponent(component)}
              className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              {component.icon && (
                <Icon icon={component.icon} className="w-5 h-5 text-gray-500" />
              )}
              <span className="text-sm">{component.label}</span>
              <span className="ml-auto text-xs text-blue-500">Add</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}