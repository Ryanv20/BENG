"use client";

import { useState } from "react";

export default function MinimalWebForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    bio: "Full-stack developer passionate about building modern web apps.",
    email: "jane.doe@example.com",
    skills: "JavaScript, TypeScript, React, Node.js",
    projects: "Portfolio Website, E-commerce App, Open Source Contributions",
  });

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      template: "web-minimal",
      data: {
        ...formData,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        projects: formData.projects ? formData.projects.split(",").map(p => p.trim()) : [],
      },
    };

    try {
      const res = await fetch("http://localhost:8080/template/web/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const data = await res.json();
        console.error("Backend returned JSON:", data);
        alert(data.error || "Failed to generate template");
      } else {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        // replace any existing URL (single download button)
        if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(url);
      }
    } catch (err) {
      console.error("Error generating Web Template:", err);
      alert("An unexpected error occurred");
    }
  };

  const inputClass = "bg-black text-white border border-white rounded p-2 focus:outline-none placeholder:text-gray-400";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-20 z-50 overflow-auto">
      <div className="w-full max-w-3xl mx-4 p-6 bg-black rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-lg font-bold hover:text-gray-300">
          ✕
        </button>
        <h2 className="text-3xl font-bold mb-6 text-white">Minimal Web Portfolio</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass} required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} required />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short Bio" className={inputClass} required />
          <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" className={inputClass} />
          <textarea name="projects" value={formData.projects} onChange={handleChange} placeholder="Projects (comma separated)" className={inputClass} />
          <button type="submit" className="bg-white text-black py-2 rounded hover:bg-gray-200 transition">
            Generate Web Template
          </button>
        </form>

        {downloadUrl && (
          <div className="mt-4">
            <a href={downloadUrl} download="portfolio.html" className="text-white underline">
              Download Web Template
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
