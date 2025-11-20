
//this is a data form component 
//DataForm.tsx
"use client";
import { useState } from "react";

export default function DataForm() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    github: "",
    skills: "",
    projects: "",
  });
  const [savedId, setSavedId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Transform comma-separated strings into arrays
    const payload = {
      ...formData,
      skills: formData.skills.split(",").map(s => s.trim()),
      projects: formData.projects.split(",").map(p => p.trim()),
    };

    try {
      const res = await fetch("http://localhost:8080/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setSavedId(data.id); // backend should return saved portfolio ID
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">Create Portfolio</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short Bio" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input name="github" value={formData.github} onChange={handleChange} type="text" placeholder="GitHub Username or URL" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input name="skills" value={formData.skills} onChange={handleChange} type="text" placeholder="Skills (comma separated)" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <textarea name="projects" value={formData.projects} onChange={handleChange} placeholder="Projects (comma separated)" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Save Portfolio Data</button>
      </form>

      {savedId && (
        <div className="mt-4">
          <a href={`http://localhost:8080/pdf/${savedId}`} target="_blank" className="text-blue-600 underline">
            Download your portfolio PDF
          </a>
        </div>
      )}
    </div>
  );
}
