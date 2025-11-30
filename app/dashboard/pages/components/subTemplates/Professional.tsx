"use client";
import { useState } from "react";

export default function ProfessionalForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    experience: "",
  });
  const [generatedPdfPath, setGeneratedPdfPath] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      template: "professional",
      data: {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()),
        experience: formData.experience.split(",").map(x => x.trim()),
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

  const inputClass = "bg-black text-white border border-white rounded p-2 focus:outline-none";

  return (
    <div className="max-w-xl mx-auto p-4 bg-black rounded shadow mt-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Professional Portfolio</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass} />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className={inputClass} />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills, comma separated" className={inputClass} />
        <textarea name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience, comma separated" className={inputClass} />
        <button type="submit" className="bg-white text-black rounded py-2 font-medium hover:bg-gray-200 transition">Save</button>
      </form>
      {generatedPdfPath && (
        <a href={`http://localhost:8080/${generatedPdfPath}`} target="_blank" className="block mt-3 text-white underline">
          Download PDF
        </a>
      )}
    </div>
  );
}
