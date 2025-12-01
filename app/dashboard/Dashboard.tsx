// app/dashboard/Dashboard.tsx
"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import ApplicationPage from "./pages/_application_page";
import TemplatesPage from "./pages/_templates_page";
import ProfilePage from "./pages/_profile_page";
import DeployPage from "./pages/_deploy_page";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("projects");

  const renderPage = () => {
    switch (activePage) {
      case "application":
        return <ApplicationPage />;
      case "templates":
        return <TemplatesPage />;
      case "profile":
        return <ProfilePage />;
      case "deploy":
        return <DeployPage />;
      default:
        return <ProfilePage />;
    }
  };
//deploy
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 overflow-auto max-h-screen p-6">
        {renderPage()}
      </div>
    </div>
  );
}
