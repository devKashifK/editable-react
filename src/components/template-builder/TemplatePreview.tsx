import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { InPlacePageRenderer } from "@/components/InPlacePageRenderer";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";

interface SortableComponentProps {
  component: any;
  onRemove: () => void;
  onUpdate: (props: any) => void;
}

function SortableComponent({ component, onRemove, onUpdate }: SortableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2"
      >
        <button
          className="p-1 bg-gray-800 text-white rounded hover:bg-gray-700"
          {...attributes}
          {...listeners}
        >
          <Icon icon="mdi:drag" className="w-4 h-4" />
        </button>
        <button
          className="p-1 bg-red-600 text-white rounded hover:bg-red-500"
          onClick={onRemove}
        >
          <Icon icon="mdi:trash" className="w-4 h-4" />
        </button>
      </div>
      <div className="border rounded-lg p-4 mb-4 bg-white">
        <InPlacePageRenderer
          nodes={component}
          editable={true}
          onChange={(updatedNode) => {
            onUpdate((updatedNode as any).props);
          }}
        />
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
        <Icon icon="mdi:drag-variant" className="w-12 h-12 mx-auto mb-4" />
        <p>Drag components here to build your template</p>
      </Card>
    );
  }

  return (
    <div>
      {components.map((component) => (
        <SortableComponent
          key={component.id}
          component={component}
          onRemove={() => onRemoveComponent(component.id)}
          onUpdate={(props) => onUpdateComponent(component.id, props)}
        />
      ))}
    </div>
  );
} 