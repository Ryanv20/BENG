// app/dashboard/pages/_templates_page.tsx
"use client";
import TemplatesComponent from "./components/TemplatesComponent";
import { useState } from "react";

export default function TemplatesPage() {
    const [selectedTemplate, setSelectedTemplate] = useState("professional");

  return (
    <div className="">
    <div className="">add a div here </div>
      <div>
      {/* Your DataForm JSX */}
      <TemplatesComponent
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
      <p>Selected template: {selectedTemplate}</p>
    </div>
    </div>
  );
}

