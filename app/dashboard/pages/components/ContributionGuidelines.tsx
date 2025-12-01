"use client";

export default function ContributionGuidelines() {
  return (
    <section className="bg-zinc-800/40 rounded-lg p-10">
      <h2 className="text-3xl font-semibold mb-4">Contribution Guidelines</h2>
      <ul className="list-disc list-inside text-lg opacity-80 space-y-2">
        <li>All contributions must respect FOSS principles and be open-source.</li>
        <li>Fork the repo, make your changes, and submit a pull request.</li>
        <li>Follow the code style and formatting guidelines strictly.</li>
        <li>Ensure all components are accessible and responsive.</li>
        <li>All features must be tested before submitting.</li>
        <li>Respect maintainers and collaborate constructively.</li>
      </ul>
    </section>
  );
}
