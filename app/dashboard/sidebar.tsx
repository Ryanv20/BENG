// app/dashboard/sidebar.tsx
"use client";

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
  return (
    <nav className="w-64 h-screen fixed top-0 left-0 bg-gradient-to-b from-gray-50 to-gray-100 shadow-md p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 text-gray-800">Dashboard</h2>
      <ul className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <li key={item.page}>
            <button
              onClick={() => setActivePage(item.page)}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors
                ${
                  activePage === item.page
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-sm text-gray-500">
        © 2025 YourCompany
      </div>
    </nav>
  );
}
