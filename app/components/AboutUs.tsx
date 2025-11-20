"use client";

import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: { type: "spring", stiffness: 300, damping: 10 },
  },
};

export default function AboutUsSection() {
  return (
    <section className="relative bg-black py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          About Portify
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <motion.div
            className="md:w-1/2 text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/80 text-lg mb-6">
              Portify is an open-source web application designed to help developers, students, and professionals
              automatically generate beautiful portfolios. By connecting and importing
              project data, users can showcase their work efficiently.
            </p>
            <p className="text-white/80 text-lg mb-6">
              Users can register, customize themes, select from predefined templates, preview their portfolio live.
              Administrators manage templates, moderate submissions, and ensure system reliability.
            </p>
            <p className="text-white/80 text-lg">
              Our goal is to make portfolio creation effortless, modern, and accessible, providing a platform that
              integrates seamlessly.
            </p>
          </motion.div>

          <div className="md:w-1/2 flex flex-col gap-6">
            {[
              { title: "Mission", text: "To empower developers...", color: "border-white" },
              { title: "Vision", text: "To become the go-to platform...", color: "border-white" },
              { title: "Values", text: "Open-source collaboration...", color: "border-white" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`bg-black shadow-lg rounded-lg p-6 border-l-4 ${item.color} cursor-pointer hover:bg-white/5 transition`}
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <h3 className="font-semibold text-xl mb-2 text-white">{item.title}</h3>
                <p className="text-white/80">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
