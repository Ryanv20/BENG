// app/dashboard/Dashboard.tsx
"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import ProjectsPage from "./pages/_projects_page";
import TemplatesPage from "./pages/_templates_page";
import ProfilePage from "./pages/_profile_page";
import PreviewPage from "./pages/_preview_page";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("projects");

  const renderPage = () => {
    switch (activePage) {
      case "projects":
        return <ProjectsPage />;
      case "templates":
        return <TemplatesPage />;
      case "profile":
        return <ProfilePage />;
      case "preview":
        return <PreviewPage />;
      default:
        return <ProjectsPage />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 overflow-auto max-h-screen">{renderPage()}</div>
    </div>
  );
}
