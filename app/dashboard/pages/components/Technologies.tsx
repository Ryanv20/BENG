"use client";

export default function Technologies() {
  return (
    <section className="bg-zinc-800/40 rounded-lg p-10">
      <h2 className="text-3xl font-semibold mb-4">Technologies We Use</h2>
      <ul className="list-disc list-inside text-lg opacity-80 space-y-2">
        <li>React / Next.js (Frontend)</li>
        <li>Node.js / Express (Backend)</li>
        <li>MongoDB / PostgreSQL (Database)</li>
        <li>Tailwind CSS (Styling)</li>
        <li>Vite / Webpack (Build tools)</li>
        <li>GitHub for Version Control</li>
      </ul>
    </section>
  );
}
