"use client";

import { useState } from "react";
import MinimalWebForm from "../components/subTemplates/HtmlPage";

const webTemplates = [
  { id: "web-minimal", label: "Minimal Web", img: "/webTemplates/minimal.png" },
];

export default function WebTemplatesComponents() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const renderForm = () => {
    switch (selectedTemplate) {
      case "web-minimal":
        return <MinimalWebForm onClose={() => setSelectedTemplate(null)} />;
      default:
        return null;
    }
  };

  return (//max-w-4xl mx-auto mt-8 relative text-white
    <div className="max-w-4xl mx-auto mt-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Choose a Web Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-14">
        {webTemplates.map(t => (
          <div
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`border rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 ${
              selectedTemplate === t.id ? "ring-2 ring-white" : ""
            }`}
            style={{ height: "165px" }}
          >
            <img src={t.img} alt={t.label} className="w-full h-[110px] object-cover" />
            <div className="p-1 text-center text-sm font-medium">{t.label}</div>
          </div>
        ))}
      </div>

      {selectedTemplate && renderForm()}
    </div>
  );
}
