"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Minimal logic: just send username to backend
    try {
      const res = await fetch("http://localhost:8080/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email }) // send email as username
      });

      const data = await res.json();
      alert(data.message); // show backend message
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend");
    }

    // Keep router redirection
    router.push("/dashboard");
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </main>
  );
}
