// app/dashboard/pages/_projects_page.tsx
"use client";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-start items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="w-full max-w-2xl border border-gray-300 rounded-lg shadow-md p-6">
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Portify – Automated portfolio generator</li>
          <li>Evon – Developer community platform</li>
          <li>Horg – Interactive storytelling website</li>
          <li>Roki – Messaging platform</li>
        </ul>
      </div>
    </div>
  );
}
