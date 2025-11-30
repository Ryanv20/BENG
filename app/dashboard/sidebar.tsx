// app/dashboard/sidebar.tsx
"use client";

import { useState } from "react";

type SidebarProps = {
  setActivePage: (page: string) => void;
  activePage: string;
};

const menuItems = [
  { label: "Projects", page: "projects", icon: "📁" },
  { label: "Templates", page: "templates", icon: "📝" },
  { label: "Profile", page: "profile", icon: "👤" },
  { label: "Deploy", page: "deploy", icon: "🚀" },
  { label: "Export", page: "export", icon: "💾" },
  { label: "Preview", page: "preview", icon: "👀" },
];

export default function Sidebar({ setActivePage, activePage }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`h-screen bg-black/80 backdrop-blur-md shadow-lg flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-6">
        {!collapsed && <h2 className="text-2xl font-bold text-white/90">Dashboard</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white text-xl hover:text-white/80 transition"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <ul className="flex flex-col gap-2 flex-1 px-2">
        {menuItems.map((item) => {
          const isActive = activePage === item.page;
          return (
            <li key={item.page} className="relative group">
              <button
                onClick={() => setActivePage(item.page)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-300
                ${isActive ? "bg-white/20 text-white shadow-inner" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
              >
                <span className={`text-lg ${isActive ? "text-cyan-400" : ""}`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>

              {collapsed && isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r-full"></span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="p-6 text-sm text-white/50">
        {!collapsed && "© 2025 YourCompany"}
      </div>
    </nav>
  );
}
