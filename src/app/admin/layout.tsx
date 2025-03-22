"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex">
      {/* Sidebar */}
      <div className="w-16 hover:w-72 transition-all duration-300 ease-in-out bg-white shadow-xl h-screen sticky top-0 group border-r border-gray-100">
        <div className="p-4 overflow-hidden">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="min-w-[32px] h-8 flex items-center justify-center bg-blue-600 rounded-lg">
              <Icon icon="mdi:view-dashboard" className="w-5 h-5 text-white" />
            </div>
            <h2 className="ml-3 text-xl font-bold text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
              Dashboard
            </h2>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { href: "/", icon: "mdi:home", label: "Home" },
              { href: "/admin", icon: "mdi:view-dashboard", label: "Content" },
              { href: "/admin/media", icon: "mdi:image", label: "Media" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-2 py-2 rounded-lg transition-colors duration-200
                  ${pathname === item.href 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <div className="min-w-[32px] flex items-center justify-center">
                  <Icon 
                    icon={item.icon} 
                    className={`w-5 h-5 transition-transform duration-200 ${pathname === item.href ? "scale-110" : ""}`} 
                  />
                </div>
                <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium whitespace-nowrap">
                  {item.label}
                </span>
                {pathname === item.href && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
