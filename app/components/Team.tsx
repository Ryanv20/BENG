"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type TeamMember = {
  name: string;
  matric: string;
  role: string;
  song: { title: string; url: string };
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Ryan Offiong",
    matric: "22/0251",
    role: "Project Manager",
    song: { title: "Sungba Remix (feat. Burna Boy)", url: "https://open.spotify.com/track/04caQq1IeChrnBnvch1FQf" },
    image: "/images/ryan.jpg",
  },
  { name: "Chibu", matric: "22/0252", role: "Frontend", song: { title: "Ye", url: "https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P" }, image: "/images/member2.jpeg" },
  { name: "Member 3", matric: "22/0253", role: "Backend", song: { title: "Infinity", url: "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" }, image: "/images/member3.jpg" },
  { name: "Member 4", matric: "22/0254", role: "UI/UX", song: { title: "Essence", url: "https://open.spotify.com/track/1AhDOtG9vPSOmsWgNW0BEY" }, image: "/images/member4.jpg" },
  { name: "Member 5", matric: "22/0255", role: "DevOps", song: { title: "Mood", url: "https://open.spotify.com/track/3AtDnECI5YL4J6qoqwRr6Z" }, image: "/images/member5.jpg" },
  { name: "Member 6", matric: "22/0256", role: "Full Stack", song: { title: "Dumebi", url: "https://open.spotify.com/track/1xQ6trAsedVPCdbtDAmk0c" }, image: "/images/member6.jpg" },
  { name: "Member 7", matric: "22/0257", role: "QA", song: { title: "Joro", url: "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" }, image: "/images/member7.jpg" },
  { name: "Member 8", matric: "22/0258", role: "Product", song: { title: "FEM", url: "https://open.spotify.com/track/2xLMifQCjDGFmkHkpNLD9h" }, image: "/images/member8.jpg" },
  { name: "Member 9", matric: "22/0259", role: "Research", song: { title: "Loading", url: "https://open.spotify.com/track/6ktkjJd6vX76Fyz1QJ0hFl" }, image: "/images/member9.jpg" },
];

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-black">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
        Our Team
      </h2>

      {/* Top featured */}
      <div className="flex justify-center mb-12">
        <TeamCard
          member={teamMembers[0]}
          isHovered={hoveredIndex === 0}
          index={0}
          onHover={setHoveredIndex}
          onLeave={() => setHoveredIndex(null)}
          wide
        />
      </div>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {teamMembers.slice(1).map((member, idx) => (
          <TeamCard
            key={idx + 1}
            member={member}
            isHovered={hoveredIndex === idx + 1}
            index={idx + 1}
            onHover={setHoveredIndex}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

function TeamCard({
  member,
  isHovered,
  index,
  onHover,
  onLeave,
  wide = false,
}: {
  member: TeamMember;
  isHovered: boolean;
  index: number;
  onHover: (i: number) => void;
  onLeave: () => void;
  wide?: boolean;
}) {
  return (
    <motion.div
      className={`flex flex-col items-start cursor-pointer transform transition-transform duration-300 ${
        isHovered ? "scale-105" : ""
      } ${wide ? "w-96" : "w-72"}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Image Box */}
      <div className="h-48 w-full bg-gray-800 rounded-xl overflow-hidden mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Info Box */}
      <div className="bg-black border border-white rounded-xl p-4 shadow-lg flex flex-col items-start w-full">
        <h3 className="font-bold text-lg text-white">{member.name}</h3>
        <p className="text-white/80 text-sm">{member.matric}</p>
        <p className="text-white/80 mb-2">{member.role}</p>

        {/* Song link shown on hover */}
        {isHovered && (
          <a
            href={member.song.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            🎵 {member.song.title}
          </a>
        )}
      </div>
    </motion.div>
  );
}
