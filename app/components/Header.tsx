"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeaderSection() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Fixed top title */}
      <h1 className="fixed top-6 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold text-white z-20">
        Platform Name
      </h1>

      {/* Main content */}
      <div className="container mx-auto h-screen flex items-center px-6">
        <motion.div
          className="max-w-lg"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
            Welcome to Our Platform
          </h2>

          <p className="text-white/80 mb-10 text-lg md:text-xl">
            A clean, bold starting point. Login or create an account to begin your journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/login"
              className="border border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white/10 transition duration-300"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="border border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white/10 transition duration-300"
            >
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
