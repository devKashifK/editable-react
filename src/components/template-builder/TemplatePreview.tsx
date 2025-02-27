import { InPlacePageRenderer } from "@/components/InPlacePageRenderer";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";

interface ComponentPreviewProps {
  component: any;
  onRemove: () => void;
  onUpdate: (props: any) => void;
}

function ComponentPreview({ component, onRemove, onUpdate }: ComponentPreviewProps) {
  return (
    <div className="relative group">
      <div className="relative border rounded-lg mb-4 bg-white shadow-sm">
        {/* Remove button */}
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 bg-red-600 text-white rounded hover:bg-red-500"
            onClick={onRemove}
          >
            <Icon icon="mdi:trash" className="w-4 h-4" />
          </button>
        </div>
        {/* Component content */}
        <div className="p-4">
          <InPlacePageRenderer
            nodes={component}
            editable={true}
            onChange={(updatedNode) => {
              onUpdate((updatedNode as any).props);
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface TemplatePreviewProps {
  components: any[];
  onRemoveComponent: (id: string) => void;
  onUpdateComponent: (id: string, props: any) => void;
}

export function TemplatePreview({
  components,
  onRemoveComponent,
  onUpdateComponent,
}: TemplatePreviewProps) {
  if (components.length === 0) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <Icon icon="mdi:stack" className="w-12 h-12 mx-auto mb-4" />
        <p>Click on components to add them to your template</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {components.map((component) => (
        <ComponentPreview
          key={component.id}
          component={component}
          onRemove={() => onRemoveComponent(component.id)}
          onUpdate={(props) => onUpdateComponent(component.id, props)}
        />
      ))}
    </div>
  );
}
