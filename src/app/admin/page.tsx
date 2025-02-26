"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import db from "@/components/db/db";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: pageConfig } = useQuery({
    queryKey: ["pageConfig"],
    queryFn: async () => {
      return await db.from("pages").select("*");
    },
  });



  // Group pages by category
  const pagesByCategory =
    pageConfig?.data?.reduce((acc, page) => {
      const category = page.category || "uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(page);
      return acc;
    }, {} as Record<string, any[]>) || {};

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-2">
            Content Management
          </h1>
          <p className="text-gray-600">
            Manage and organize your website content
          </p>
        </div>
        <Link
          href="/admin/template/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:plus" />
          Create New Template
        </Link>
      </div>

      {/* Content Section */}
      <div className="space-y-8">
        {Object.entries(pagesByCategory).map(([category, pages]) => (
          <div
            key={category}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 capitalize flex items-center gap-2">
                <Icon
                  icon="mdi:folder-outline"
                  className="w-6 h-6 text-blue-500"
                />
                {category.replace(/-/g, " ")}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({pages.length} pages)
                </span>
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <Link
                    key={page.id}
                    href={`/admin/${page.name}`}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Icon
                        icon="mdi:file-document-outline"
                        className="w-5 h-5 text-blue-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {page.name.replace(/-/g, " ")}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        Last updated:{" "}
                        {new Date(page.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Icon
                      icon="mdi:chevron-right"
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
