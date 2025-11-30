"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-black py-12 px-6">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">Portify</h2>
          <p className="text-white/80 text-sm">
            Build and showcase your portfolio with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
          <Link href="/" className="text-white/80 hover:text-white transition">
            Home
          </Link>
          <Link href="/auth/login" className="text-white/80 hover:text-white transition">
            Login
          </Link>
          <Link href="/auth/register" className="text-white/80 hover:text-white transition">
            Register
          </Link>
          <Link href="/about" className="text-white/80 hover:text-white transition">
            About Us
          </Link>
          <Link href="/contact" className="text-white/80 hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <a href="https://twitter.com/portify" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
            Twitter
          </a>
          <a href="https://github.com/portify" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
            GitHub
          </a>
          <a href="https://linkedin.com/company/portify" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
            LinkedIn
          </a>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        © {new Date().getFullYear()} Portify. All rights reserved.
      </motion.div>
    </footer>
  );
}
