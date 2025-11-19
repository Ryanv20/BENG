// app/dashboard/pages/_templates_page.tsx
"use client";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-start items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Templates</h1>
      <div className="w-full max-w-2xl border border-gray-300 rounded-lg shadow-md p-6">
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Clean – Minimal and modern template</li>
          <li>Creative – Colorful and interactive layout</li>
          <li>Professional – Corporate style template</li>
          <li>Portfolio Classic – Standard developer portfolio</li>
        </ul>
      </div>
    </div>
  );
}
