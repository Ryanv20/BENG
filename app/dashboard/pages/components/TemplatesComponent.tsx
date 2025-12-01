"use client";

import { useState } from "react";
import ProfessionalForm from "./subTemplates/Professional";
import CvForm from "./subTemplates/Cv";
// import IntroductionLetterForm from "./subTemplates/IntroductionLetter";
// import CreativeForm from "./subTemplates/Creative";
import MinimalForm from "./subTemplates/Minimal";

const templates = [
  { id: "professional", label: "Professional", img: "/templates/professional.png" },
  { id: "cv", label: "CV", img: "/templates/cv.png" },
  // { id: "intro", label: "Introduction Letter", img: "/templates/intro.png" },
  // { id: "creative", label: "Creative", img: "/templates/creative.png" },
  { id: "minimal", label: "Minimal", img: "/templates/minimal.png" },
];

type TemplatesComponentProps = {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
};

export default function TemplatesComponent({ selectedTemplate, setSelectedTemplate }: TemplatesComponentProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleTemplateClick = (id: string) => {
    setSelectedTemplate(id);
    setModalOpen(true);
  };

  const renderForm = () => {
    switch (selectedTemplate) {
      case "professional":
        return <ProfessionalForm />;
      case "cv":
        return <CvForm />;
      // case "intro":
      //   return <IntroductionLetterForm />;
      // case "creative":
      //   return <CreativeForm />;
      case "minimal":
        return <MinimalForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 relative text-white">
      <h2 className="text-2xl font-bold mb-6">Create Your Document from these templates</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
        {templates.map(t => (
          <div
            key={t.id}
            onClick={() => handleTemplateClick(t.id)}
            className={`border rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 ${
              selectedTemplate === t.id ? "ring-2 ring-white" : ""
            }`}
            style={{ height: "165px" }}
          >
            <img
              src={t.img}
              alt={t.label}
              className="w-full h-[110px] object-cover"
            />
            <div className="p-1 text-center text-sm font-medium">{t.label}</div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
          <div className="w-full max-w-3xl mx-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
}
