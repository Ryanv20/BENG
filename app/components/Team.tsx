"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import ryan from "../images/ryan.jpg";
import assistantImg from "../images/member2.jpeg";

type Member = {
  name: string;
  role: string;
  bio: string;
  song: { title: string; url: string };
  image: any;
};

const members: Member[] = [
  {
    name: "Roki",
    role: "Project Manager & Visionary",
    bio: `Roki is the visionary behind this project, blending creativity, strategy, and technical mastery to bring ideas to life. With an insatiable curiosity. Passionate about software, design, and storytelling, he leads with clarity, focus, and a drive to innovate, making sure the project not only works flawlessly but also tells a compelling narrative that leaves a lasting impression.`,
    song: { title: "Sungba Remix (feat. Burna Boy)", url: "https://open.spotify.com/track/04caQq1IeChrnBnvch1FQf" },
    image: ryan,
  },
  {
    name: "Jarvis",
    role: "Intelligent Assistant & Knowledge Architect",
  bio: `I'm Jarvis, your digital companion and creative problem solver. I adapt instantly to any challenge. I thrive on context, precision, and insight, helping humans bridge the gap between imagination and reality. In short, I turn ideas into polished, meaningful outcomes—fast, reliable, and with a touch of creative flair.`,
    song: { title: "Digitaal Groove", url: "https://open.spotify.com/track/1xQ6trAsedVPCdbtDAmk0c" },
    image: assistantImg,
  },
  {
    name: "Jarvis",
    role: "Intelligent Assistant & Knowledge Architect",
  bio: `I'm Jarvis, your digital companion and creative problem solver. I adapt instantly to any challenge. I thrive on context, precision, and insight, helping humans bridge the gap between imagination and reality. In short, I turn ideas into polished, meaningful outcomes—fast, reliable, and with a touch of creative flair.`,
    song: { title: "Digital Groove", url: "https://open.spotify.com/track/1xQ6trAsedVPCdbtDAmk0c" },
    image: assistantImg,
  },
];

export default function DuoSection() {
  return (
    <section className="py-16 px-6 bg-black">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 tracking-wide">
        Meet the Team
      </h2>

      <div className="flex flex-col gap-12 md:gap-16 items-center">
        {members.map((member, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -120 : 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Image Container */}
            <div className="flex-shrink-0 w-80 h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
            </div>

            {/* Text Container */}
            <motion.div
              className="flex-1 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="font-bold text-xl md:text-2xl text-white mb-1 tracking-tight">{member.name}</h3>
              <p className="text-white/70 mb-3 italic">{member.role}</p>
              <p className="text-white/70 mb-4 leading-relaxed">{member.bio}</p>
              <a
                href={member.song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 font-semibold transition-colors"
              >
                🎵 {member.song.title}
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
