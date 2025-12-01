"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ryan from "../../../images/ryan.jpg";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col">
      {/* PROFILE HERO BANNER */}
     <div className="w-full flex gap-6 items-center py-6 px-8">
  <Image
    src={ryan}
    alt="Profile"
    width={320}
    height={320}
    className="rounded-full object-cover"
    priority
  />

  <div className="flex flex-col gap-4">
    <div>
      <h1 className="text-5xl font-semibold">Ryan Offiong</h1>
      <p className="text-xl opacity-60 mt-0.5">Software Developer</p>
    </div>

    <div className="flex gap-4">
      <button
        onClick={() => router.push("/generate-doc")}
        className="px-6 py-3 rounded-lg font-medium border border-white transition transform hover:scale-105 hover:opacity-80"
      >
        Generate Template Doc
      </button>

      <button
        onClick={() => router.push("/generate-webpage")}
        className="px-6 py-3 rounded-lg font-medium border border-white transition transform hover:scale-105 hover:opacity-80"
      >
        Generate Template Webpage
      </button>
    </div>
  </div>
</div>

    </div>
  );
}
