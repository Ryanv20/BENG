// TemplatesComponent.tsx
"use client";

import { useState } from "react";

const templates = [
  { id: "professional", label: "Professional", img: "/templates/professional.png" },
  { id: "cv", label: "CV", img: "/templates/cv.png" },
  { id: "intro", label: "Introduction Letter", img: "/templates/intro.png" },
  { id: "creative", label: "Creative", img: "/templates/creative.png" },
  { id: "minimal", label: "Minimal", img: "/templates/minimal.png" },
];

type TemplatesComponentProps = {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
};

export default function TemplatesComponent({ selectedTemplate, setSelectedTemplate }: TemplatesComponentProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map(t => (
          <div
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`border rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 ${
              selectedTemplate === t.id ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <img src={t.img} alt={t.label} className="w-full h-48 object-cover"/>
            <div className="p-2 text-center font-semibold">{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
