"use client";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentPalette } from "@/components/template-builder/ComponentPalette";
import { TemplatePreview } from "@/components/template-builder/TemplatePreview";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import db from "@/components/db/db";
import { useRouter } from "next/navigation";

export default function NewTemplate() {
  const router = useRouter();
  const [components, setComponents] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddComponent = (component: any) => {
    setComponents([...components, { ...component, id: crypto.randomUUID() }]);
  };

  const handleSaveTemplate = async () => {
    if (!templateName) {
      toast.error("Please enter a template name");
      return;
    }

    try {
      setSaving(true);
      const { error } = await db.from("pages").insert({
        name: templateName.toLowerCase().replace(/\s+/g, "-"),
        category: "templates",
        content: components.map(({ id, ...rest }) => rest),
      });

      if (error) throw error;

      toast.success("Template saved successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Template</h1>
            <p className="text-gray-600">Build your template by dragging components</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter template name"
              className="px-4 py-2 border rounded-lg"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <Button 
              onClick={handleSaveTemplate} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? "Saving..." : "Save Template"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <ComponentPalette onAddComponent={handleAddComponent} />
          </div>
          <div className="col-span-9">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={components}
                strategy={verticalListSortingStrategy}
              >
                <TemplatePreview 
                  components={components}
                  onRemoveComponent={(id) => {
                    setComponents(components.filter(c => c.id !== id));
                  }}
                  onUpdateComponent={(id, props) => {
                    setComponents(components.map(c => 
                      c.id === id ? { ...c, props: { ...c.props, ...props } } : c
                    ));
                  }}
                />
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
} 