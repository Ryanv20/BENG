// "use client";
// import { useState } from "react";
// import Sidebar from "./components/sidebar";
// import Browse from "./pages/Browse";
// import Cart from "./pages/cart";
// import Chatpage from "./pages/chatpage";
// import Profile from "./pages/profile";
// import Stock from "./pages/stock";
// import Default from "./pages/Default";

// type PageType = "Browse" | "Cart" | "AI analytics" | "Profile" | "Stock" | "Default";

// export default function Dashboard() {
//   const [activePage, setActivePage] = useState<PageType>("Default");

//   const renderPage = (): JSX.Element => {
//     switch (activePage) {
//       case "Browse":
//         return <Browse />;
//       case "Cart":
//         return <Cart />;
//       case "AI analytics":
//         return <Chatpage />;
//       case "Profile":
//         return <Profile />;
//       case "Stock":
//         return <Stock />;
//       default:
//         return <Default />;
//     }
//   };

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       <Sidebar onNavigate={setActivePage} />
//       <main className="flex-1 overflow-y-auto text-white">
//         {renderPage()}
//       </main>
//     </div>
//   );
// }

// // bu3-frontend/app/_layoutsMain/dashboard/components/Sidebar.tsx
// "use client";
// import { useState } from "react";
// import { FaCrown, FaShoppingCart, FaUser, FaChartLine, FaHome, FaBoxOpen } from "react-icons/fa"; // Icons example
// import { IconType } from "react-icons";

// interface SidebarProps {
//   onNavigate: (page: string) => void;
//   activePage?: string;
// }

// interface SidebarItem {
//   name: string;
//   icon: IconType;
//   description: string;
// }

// export default function Sidebar({ onNavigate, activePage }: SidebarProps) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [messages, setMessages] = useState([
//     "Welcome back!",
//     "New update available",
//     "Check your analytics",
//   ]);

//   const items: SidebarItem[] = [
//     { name: "Browse", icon: FaHome, description: "Explore products" },
//     { name: "Cart", icon: FaShoppingCart, description: "Your orders" },
//     { name: "AI analytics", icon: FaChartLine, description: "Insights" },
//     { name: "Profile", icon: FaUser, description: "Your account" },
//     { name: "Stock", icon: FaBoxOpen, description: "Inventory overview" },
//     { name: "Merchant", icon: FaCrown, description: "Premium access" },
//   ];

//   const isActive = (name: string) => name === activePage;

//   return (
//     <aside
//       className={`${
//         collapsed ? "w-20" : "w-64"
//       } bg-[#171717] text-white flex flex-col h-screen transition-all duration-300 font-inter`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-700">
//         <div className="flex flex-col">
//           <div className="flex items-center space-x-2">
//             <FaCrown className="text-white" />
//             {!collapsed && <h2 className="text-lg font-bold">buTrade</h2>}
//           </div>
//           {!collapsed && <span className="text-sm text-white/80">Dashboard</span>}
//         </div>
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-gray-300 hover:text-white"
//         >
//           {collapsed ? "→" : "←"}
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto">
//         <ul className="space-y-2 p-2">
//           {items.map((item) => (
//             <li
//               key={item.name}
//               onClick={() => onNavigate(item.name)}
//               className={`flex items-center p-2 rounded-[15px] cursor-pointer transition-colors duration-200
//                 ${isActive(item.name) ? "bg-[#3D38F5]" : "hover:bg-[#3D38F5]"}`}
//             >
//               <item.icon className="mr-3" />
//               {!collapsed && (
//                 <div className="flex flex-col">
//                   <span className="font-bold text-white">{item.name}</span>
//                   <span className="text-sm text-white/80">{item.description}</span>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Footer Messages */}
//       <div className="p-4 mt-auto">
//         <div className="bg-gray-900 rounded-lg p-3 text-white text-sm h-24 overflow-y-auto">
//           {messages.map((msg, idx) => (
//             <div key={idx} className="mb-1">
//               {msg}
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }


// app/dashboard/sidebar.tsx
"use client";

type SidebarProps = {
  setActivePage: (page: string) => void;
};

export default function Sidebar({ setActivePage }: SidebarProps) {
  return (
    <nav className="w-64 bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="flex flex-col gap-3">
        <li>
          <button onClick={() => setActivePage("projects")}>Projects</button>
        </li>
        <li>
          <button onClick={() => setActivePage("templates")}>Templates</button>
        </li>
        <li>
          <button onClick={() => setActivePage("profile")}>Profile</button>
        </li>
        <li>
          <button onClick={() => setActivePage("deploy")}>Deploy</button>
        </li>
        <li>
          <button onClick={() => setActivePage("export")}>Export</button>
        </li>
        <li>
          <button onClick={() => setActivePage("preview")}>Preview</button>
        </li>
      </ul>
    </nav>
  );
}




// // app/dashboard/Dashboard.tsx
// "use client";

// import { useState } from "react";
// import Sidebar from "./sidebar";
// import ProjectsPage from "./pages/_projects_page";
// import TemplatesPage from "./pages/_templates_page";
// import ProfilePage from "./pages/_profile_page";
// import PreviewPage from "./pages/_preview_page";

// export default function Dashboard() {
//   const [activePage, setActivePage] = useState("projects");

//   const renderPage = () => {
//     switch (activePage) {
//       case "projects":
//         return <ProjectsPage />;
//       case "templates":
//         return <TemplatesPage />;
//       case "profile":
//         return <ProfilePage />;
//       case "preview":
//         return <PreviewPage />;
//       default:
//         return <ProjectsPage />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar setActivePage={setActivePage} />
//       <div className="flex-1 p-6">{renderPage()}</div>
//     </div>
//   );
// }

// let the overflow for the sidebar be fixed and the one for the rndered context allow croll down and stuff