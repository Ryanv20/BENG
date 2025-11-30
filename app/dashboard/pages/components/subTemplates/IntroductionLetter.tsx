// components/subComponents/IntroductionLetterForm.tsx
"use client";
import { useState } from "react";

export default function IntroductionLetterForm() {
  const [formData, setFormData] = useState({
    yourName: "",
    recipientName: "",
    position: "",
    company: "",
    body: "",
  });
  const [savedId, setSavedId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setSavedId(data.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">Introduction Letter</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="yourName" value={formData.yourName} onChange={handleChange} type="text" placeholder="Your Name" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input name="recipientName" value={formData.recipientName} onChange={handleChange} type="text" placeholder="Recipient Name" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input name="position" value={formData.position} onChange={handleChange} type="text" placeholder="Position" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input name="company" value={formData.company} onChange={handleChange} type="text" placeholder="Company" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <textarea name="body" value={formData.body} onChange={handleChange} placeholder="Letter Body" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Save</button>
      </form>

      {savedId && (
        <div className="mt-4">
          <a href={`http://localhost:8080/pdf/${savedId}`} target="_blank" className="text-blue-600 underline">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
