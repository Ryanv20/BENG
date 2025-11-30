"use client";

import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <section className="py-20 px-6 bg-black">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Contact Us
        </h2>

        <p className="text-white/80 mb-8 text-lg md:text-xl">
          Got questions, suggestions, or feedback? Reach out and we'll get back to you as soon as possible.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:info@portify.com"
            className="border border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white/10 transition duration-300"
          >
            Email Us
          </a>

          <a
            href="https://twitter.com/portify"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white/10 transition duration-300"
          >
            Twitter
          </a>
        </div>
      </motion.div>
    </section>
  );
}
