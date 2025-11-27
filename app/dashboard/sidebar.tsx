"use client";

import { useState } from "react";

type SidebarProps = {
  setActivePage: (page: string) => void;
  activePage: string;
};

const menuItems = [
  { label: "Portfolio", page: "projects", icon: "" },
  { label: "Templates", page: "templates", icon: "" },
  { label: "Apply", page: "export", icon: "" },
  { label: "Deploy", page: "deploy", icon: "👑" },
];

const bottomItems = [
  { label: "Settings", page: "preview", icon: "" },
  { label: "Profile", page: "profile", icon: "" },
];

export default function Sidebar({ setActivePage, activePage }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`h-screen bg-black/80 backdrop-blur-md shadow-lg flex flex-col transition-all duration-300 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      <div className="flex items-center justify-between p-6 gap-2">
        {!collapsed && <h2 className="text-2xl font-bold text-white/90">Portify</h2>}
        {!collapsed && <div className="w-6 h-6"></div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white text-xl hover:text-white/80 transition"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <ul className="flex flex-col gap-3 px-2">
        {menuItems.map((item) => {
          const isActive = activePage === item.page;
          return (
            <li key={item.page} className="relative group">
              <button
                onClick={() => setActivePage(item.page)}
                className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl transition-all duration-300
                ${isActive ? "bg-white/20 text-white shadow-inner" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
              >
                {item.icon && (
                  <span className={`text-lg ${isActive ? "text-cyan-400" : ""}`}>
                    {item.icon}
                  </span>
                )}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>

              {collapsed && isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r-full"></span>
              )}
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col gap-2 px-2 mt-auto mb-10">
        {bottomItems.map((item) => {
          const isActive = activePage === item.page;
          return (
            <li key={item.page} className="relative group">
              <button
                onClick={() => setActivePage(item.page)}
                className={`flex items-center gap-3 w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-semibold
                ${isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
