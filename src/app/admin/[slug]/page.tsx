"use client";

import { useState, useEffect } from "react";
import { InPlacePageRenderer, Node } from "@/components/InPlacePageRenderer";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import db from "@/components/db/db";

export default function ExamplePage() {
  const params = useParams();
  const slug = params?.slug as string;

  // 1. Fetch existing JSON from supabase
  const { data, error, isLoading } = useQuery({
    queryKey: [slug],
    queryFn: async () =>
      await db.from("pages").select("json").eq("name", slug).single(),
  });

  // 2. Store config in local state
  const [config, setConfig] = useState<Node[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // 3. Parse the fetched data into config
  useEffect(() => {
    if (data?.data?.json) {
      console.log("Received data:", data.data.json);
      try {
        const parsedConfig =
          typeof data.data.json === "string"
            ? JSON.parse(data.data.json)
            : data.data.json;

        const configArray = Array.isArray(parsedConfig)
          ? parsedConfig
          : [parsedConfig];
        console.log("Parsed config:", configArray);
        setConfig(configArray);
      } catch (e) {
        console.error("Error parsing config:", e);
      }
    }
  }, [data]);

  // Debug log for config changes
  useEffect(() => {
    console.log("Current config state:", config);
  }, [config]);

  // 4. Save updated config to Supabase
  async function handleSave() {
    if (!config) return;

    console.log("Saving config:", config);

    // If your column is text, store as string:
    const updatedConfigString = JSON.stringify(config);

    // If your column is JSON type, you can do:
    // const updatedConfigValue = config;

    const { data: updateData, error: updateError } = await db
      .from("pages")
      .update({
        json: updatedConfigString, // or 'json: config' for a JSON column
      })
      .eq("name", slug)
      .single();

    if (updateError) {
      console.error("Error saving page config:", updateError);
    } else {
      console.log("Page config saved successfully:", updateData);
      setIsEditing(false);
    }
  }

  // 5. Loading / Error states
  if (isLoading) {
    return <p>Loading Page...</p>;
  }
  if (error) {
    return <p>Error loading page config</p>;
  }

  // 6. Render the page with InPlacePageRenderer
  return (
    <div className="min-h-screen relative">
      {/* Edit controls */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        <div className="bg-white rounded-2xl shadow-lg p-2 backdrop-blur-sm bg-opacity-90 border border-gray-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200
              ${
                isEditing
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }
            `}
          >
            <Icon icon={isEditing ? "mdi:close" : "mdi:pencil"} className="w-5 h-5" />
            <span className="font-medium">{isEditing ? "Cancel" : "Edit Page"}</span>
          </button>

          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200"
            >
              <Icon icon="mdi:check" className="w-5 h-5" />
              <span className="font-medium">Save Changes</span>
            </button>
          )}
        </div>
      </div>

    

      <InPlacePageRenderer
        nodes={config}
        editable={isEditing}
        onChange={(updatedNodes) => {
          // Ensure config is always an array
          const nodesArray = Array.isArray(updatedNodes)
            ? updatedNodes
            : [updatedNodes];
          setConfig(nodesArray);
        }}
      />
    </div>
  );
}
