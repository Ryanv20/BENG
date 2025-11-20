"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend");
    }
    router.push("/dashboard");
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4">
      {/* Decorative overlay: blurred "pencil sketch" */}
      <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/pencil-bg.png')] before:bg-cover before:opacity-10 before:blur-sm pointer-events-none" />

      {/* Floating translucent shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-700/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>

      {/* Login Card */}
      <motion.div
        className="relative flex flex-col md:flex-row w-full max-w-4xl bg-black/70 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Illustration / info section */}
        <div className="hidden md:flex w-1/2 justify-center items-center bg-black/40 backdrop-blur-sm p-8">
          <div className="text-center">
            <div className="w-64 h-64 border-2 border-white/20 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-md bg-white/5">
              <span className="text-white/30 text-sm">Illustration</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-white/70">
              Login to manage your portfolio and projects with style.
            </p>
          </div>
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-white mb-4 text-center md:text-left">
            Login
          </h1>
          <p className="text-white/70 mb-8 text-center md:text-left">
            Enter your credentials to access your dashboard
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
           <input
  type="email"
  placeholder="Email"
  className="bg-white/5 border border-white/20 text-white placeholder-white/50 p-3 rounded-xl backdrop-blur-sm focus:outline-none transition"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<input
  type="password"
  placeholder="Password"
  className="bg-white/5 border border-white/20 text-white placeholder-white/50 p-3 rounded-xl backdrop-blur-sm focus:outline-none transition"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

            <button
              type="submit"
              className="bg-cyan-600/80 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-cyan-500/90 transition backdrop-blur-sm"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center md:text-left text-white/50 text-sm">
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="text-cyan-400 hover:underline"
            >
              Register
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
