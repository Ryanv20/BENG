// app/dashboard/pages/_preview_page.tsx
"use client";

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-start items-center p-8">
      <h1 className="text-2xl font-bold mb-6">deploy</h1>
      <div className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-md p-6">
        <p className="text-gray-700">
          This is where your portfolio preview will appear. Currently displaying placeholder content.
        </p>
        <div className="mt-4 border border-gray-200 h-64 flex justify-center items-center text-gray-400">
          Portfolio Preview Placeholder
        </div>
      </div>
    </div>
  );
}
