"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg"
            >
              <Icon icon="mdi:home" className="w-5 h-5" />
              Home
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg"
            >
              <Icon icon="mdi:view-dashboard" className="w-5 h-5" />
              Content
            </Link>
            <Link
              href="/admin/media"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Icon icon="mdi:image" className="w-5 h-5" />
              Media
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
