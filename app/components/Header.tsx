

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeaderSection() {
  return (
    <header className="relative min-h-screen bg-black overflow-hidden flex items-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between h-screen">
        <motion.div
          className="max-w-xl text-center md:text-left z-10"
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -120 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight tracking-tight">
            Welcome to Our Platform
          </h1>
          <p className="text-white mb-10 text-lg md:text-xl leading-relaxed">
            A clean, bold starting point. Login or create an account to begin your journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/auth/login"
              className="border border-white text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-white/10 hover:scale-105 transition-transform duration-300"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="border border-white text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-white/10 hover:scale-105 transition-transform duration-300"
            >
              Register
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-0 flex-1 flex justify-center md:justify-start relative ml-50"
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
         <div className="relative w-72 h-80 md:w-80 md:h-96">
  {/* main central blobs */}
  <div className="absolute inset-0 bg-white rounded-full animate-lava-chaotic"></div>
  <div className="absolute inset-0 bg-white rounded-full animate-lava-chaotic-2 scale-95"></div>

  {/* surrounding mini blobs */}
  <div className="absolute w-20 h-20 bg-white rounded-full animate-mini-lava-1"></div>
  <div className="absolute w-16 h-16 bg-white rounded-full animate-mini-lava-2"></div>
  <div className="absolute w-24 h-24 bg-white rounded-full animate-mini-lava-3"></div>
  <div className="absolute w-14 h-14 bg-white rounded-full animate-mini-lava-4"></div>
  <div className="absolute w-12 h-12 bg-white rounded-full animate-mini-lava-5"></div>
  <div className="absolute w-18 h-18 bg-white rounded-full animate-mini-lava-6"></div>
  <div className="absolute w-10 h-10 bg-white rounded-full animate-mini-lava-7"></div>
  <div className="absolute w-22 h-22 bg-white rounded-full animate-mini-lava-8"></div>
</div>

        </motion.div>
      </div>

      <style jsx>{`
        /* CHAOTIC MAIN BLOBS */
        @keyframes lava-chaotic {
          0% { border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%; transform: translate(0,0) scale(1); }
          20% { border-radius: 70% 30% 60% 40% / 40% 60% 35% 65%; transform: translate(10px,-8px) scale(1.08); }
          40% { border-radius: 35% 65% 45% 55% / 60% 40% 50% 50%; transform: translate(-12px,14px) scale(0.95,1.1); }
          60% { border-radius: 50% 50% 60% 40% / 55% 45% 60% 40%; transform: translate(8px,20px) scale(1.12,0.9); }
          80% { border-radius: 45% 55% 35% 65% / 50% 60% 40% 50%; transform: translate(-8px,-12px) scale(1,1.05); }
          100% { border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%; transform: translate(0,0) scale(1); }
        }

        @keyframes lava-chaotic-2 {
          0% { border-radius: 55% 45% 40% 60% / 60% 50% 50% 40%; transform: translate(0,0) scale(1); }
          20% { border-radius: 60% 40% 55% 45% / 45% 55% 60% 40%; transform: translate(-10px,6px) scale(1.05,1.08); }
          40% { border-radius: 35% 65% 50% 50% / 55% 45% 50% 50%; transform: translate(14px,-14px) scale(0.95,1.1); }
          60% { border-radius: 50% 50% 60% 40% / 50% 40% 55% 55%; transform: translate(-8px,12px) scale(1.1,0.9); }
          80% { border-radius: 45% 55% 40% 60% / 60% 50% 50% 50%; transform: translate(12px,-10px) scale(1.05,1); }
          100% { border-radius: 55% 45% 40% 60% / 60% 50% 50% 40%; transform: translate(0,0) scale(1); }
        }

        .animate-lava-chaotic { animation: lava-chaotic 7s ease-in-out infinite alternate; }
        .animate-lava-chaotic-2 { animation: lava-chaotic-2 6.5s ease-in-out infinite alternate; }

        /* MINI BLOBS ORBITING & STRETCHING */
        @keyframes miniLava {
          0% { transform: translate(0,0) scale(1); }
          20% { transform: translate(40px,-25px) scale(1.2,1.05); }
          40% { transform: translate(-35px,30px) scale(0.9,1.1); }
          60% { transform: translate(28px,35px) scale(1.15,0.95); }
          80% { transform: translate(-20px,-28px) scale(0.95,1.1); }
          100% { transform: translate(0,0) scale(1); }
        }

        .animate-mini-lava-1 { top: -10px; left: -10px; animation: miniLava 5.5s ease-in-out infinite alternate; }
        .animate-mini-lava-2 { bottom: 0; left: 20px; animation: miniLava 6s ease-in-out infinite alternate-reverse; }
        .animate-mini-lava-3 { top: 30%; right: -20px; animation: miniLava 5.8s ease-in-out infinite alternate; }
        .animate-mini-lava-4 { bottom: 25%; right: -15px; animation: miniLava 6.2s ease-in-out infinite alternate-reverse; }
        .animate-mini-lava-5 { top: -5%; right: 25%; animation: miniLava 5.7s ease-in-out infinite alternate; }
        .animate-mini-lava-6 { bottom: -5%; left: 35%; animation: miniLava 6.5s ease-in-out infinite alternate-reverse; }
        .animate-mini-lava-7 { top: 10%; left: 45%; animation: miniLava 5.3s ease-in-out infinite alternate; }
        .animate-mini-lava-8 { bottom: 20%; right: 40%; animation: miniLava 6.1s ease-in-out infinite alternate-reverse; }
      `}</style>
    </header>
  );
}


// AOC for EXam
// powerpoint 1 + note one
// creating tabs
// creating a form
// mid - semester 
//
//
