// app/dashboard/pages/_templates_page.tsx
"use client";
import TemplatesComponent from "./components/TemplatesComponent";
import WebTemplatesComponents from "./components/WebTemplatesComponents";
import { useState } from "react";

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("professional");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mt-6 w-full max-w-5xl">
      <TemplatesComponent
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      /></div>
      <div className="mt-6 w-full max-w-5xl">
        <WebTemplatesComponents />
      </div>
    </div>
  );
}
