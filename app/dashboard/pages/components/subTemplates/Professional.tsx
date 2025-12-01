"use client";
import { useState } from "react";

type Experience = {
  position: string;
  company: string;
  duration: string;
  details: string;
};

export default function ProfessionalForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    experience: [] as Experience[],
  });

  const [generatedPdfPath, setGeneratedPdfPath] = useState<string | null>(null);

  const inputClass = "bg-black text-white border border-white rounded p-2 focus:outline-none";

  // Generic field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Change experience fields
  const handleExperienceChange = (idx: number, field: keyof Experience, value: string) => {
    const newExp = [...formData.experience];
    newExp[idx][field] = value;
    setFormData({ ...formData, experience: newExp });
  };

  // Add empty experience entry
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { position: "", company: "", duration: "", details: "" }],
    });
  };

  // Remove experience entry
  const removeExperience = (idx: number) => {
    const newExp = formData.experience.filter((_, i) => i !== idx);
    setFormData({ ...formData, experience: newExp });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      template: "professional",
      data: {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()),
        // experience is already structured
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
    <div className="max-w-xl mx-auto p-4 bg-black rounded shadow mt-6 text-white max-h-[80vh] overflow-y-auto">
  <h2 className="text-xl font-semibold mb-4">Professional Portfolio</h2>
  <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
    <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass} />
    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} />
    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className={inputClass} />
    <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills, comma separated" className={inputClass} />

    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">Experience</h3>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {formData.experience.map((exp, idx) => (
          <div key={idx} className="flex flex-col gap-1 border p-2 rounded">
            <input
              placeholder="Position"
              value={exp.position}
              onChange={e => handleExperienceChange(idx, "position", e.target.value)}
              className={inputClass}
            />
            <input
              placeholder="Company"
              value={exp.company}
              onChange={e => handleExperienceChange(idx, "company", e.target.value)}
              className={inputClass}
            />
            <input
              placeholder="Duration"
              value={exp.duration}
              onChange={e => handleExperienceChange(idx, "duration", e.target.value)}
              className={inputClass}
            />
            <textarea
              placeholder="Details"
              value={exp.details}
              onChange={e => handleExperienceChange(idx, "details", e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => removeExperience(idx)}
              className="bg-red-600 rounded py-1 mt-1 hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addExperience} className="bg-green-600 rounded py-1 mt-2 hover:bg-green-700">
        Add Experience
      </button>
    </div>

    <button type="submit" className="bg-white text-black rounded py-2 font-medium hover:bg-gray-200 transition mt-4">
      Save
    </button>
  </form>

  {generatedPdfPath && (
    <a href={`http://localhost:8080/${generatedPdfPath}`} target="_blank" className="block mt-3 text-white underline">
      Download PDF
    </a>
  )}
</div>

  );
}
