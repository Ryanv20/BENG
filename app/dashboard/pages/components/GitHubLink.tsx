"use client";
import { useRouter } from "next/navigation";

export default function GitHubLink() {
  const router = useRouter();
  return (
    <section className="bg-zinc-800/40 rounded-lg p-10 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold mb-4">GitHub Repository</h2>
      <p className="text-lg opacity-80">
        Explore the Portify codebase, contribute, or fork your own copy.
      </p>
      <button
        onClick={() => router.push("https://github.com/Ryanv20")}
        className="mt-3 px-6 py-3 rounded-lg font-medium border border-white transition transform hover:scale-105 hover:opacity-80 w-max"
      >
        Visit GitHub
      </button>
    </section>
  );
}
