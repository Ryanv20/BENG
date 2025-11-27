"use client";
import { useState } from "react";

export default function MinimalForm() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    skills: "",
    projects: "", // optional
  });
  const [generatedPdfPath, setGeneratedPdfPath] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      template: "minimal",
      data: {
        ...formData,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        projects: formData.projects ? formData.projects.split(",").map(p => p.trim()) : [],
      },
    };

    try {
      const res = await fetch("http://localhost:8080/template/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.pdf) setGeneratedPdfPath(data.pdf);
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  const inputClass = "bg-black text-white border border-white rounded p-2 focus:outline-none";

  return (
    <div className="max-w-xl mx-auto p-6 bg-black rounded-lg shadow-md mt-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Minimal Portfolio</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass} required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} required />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short Bio" className={inputClass} required />
        <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" className={inputClass} />
        <textarea name="projects" value={formData.projects} onChange={handleChange} placeholder="Projects (comma separated, optional)" className={inputClass} />
        <button type="submit" className="bg-white text-black py-2 rounded hover:bg-gray-200 transition">
          Generate PDF
        </button>
      </form>

      {generatedPdfPath && (
        <div className="mt-4">
          <a href={`http://localhost:8080/${generatedPdfPath}`} target="_blank" className="text-white underline">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
