"use client";
import { useState } from "react";

export default function CvForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    certifications: "",
    projects: "",
    education: "",
  });

  const [generatedPdfPath, setGeneratedPdfPath] = useState<string | null>(null);

  const inputClass = "bg-black text-white border border-white rounded p-2 focus:outline-none";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      template: "cv",
      data: {
        ...formData,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        certifications: formData.certifications ? formData.certifications.split(",").map(c => c.trim()) : [],
        projects: formData.projects ? formData.projects.split(",").map(p => p.trim()) : [],
        education: formData.education ? formData.education.split(",").map(ed => ed.trim()) : [],
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
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black rounded-lg shadow-md mt-8 text-white max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">CV</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass} />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" className={inputClass} />
        <input name="certifications" value={formData.certifications} onChange={handleChange} placeholder="Certifications (comma separated)" className={inputClass} />
        <textarea name="projects" value={formData.projects} onChange={handleChange} placeholder="Projects (comma separated)" className={inputClass} />
        <textarea name="education" value={formData.education} onChange={handleChange} placeholder="Education (comma separated)" className={inputClass} />
        <button type="submit" className="bg-white text-black py-2 rounded hover:bg-gray-200 transition">
          Generate PDF
        </button>
      </form>

      {generatedPdfPath && (
        <div className="mt-4 sticky bottom-4 bg-black p-2 rounded">
          <a href={`http://localhost:8080/${generatedPdfPath}`} target="_blank" className="text-white underline">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
