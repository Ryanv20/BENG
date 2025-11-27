"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ryan from "../../../images/ryan.jpg";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* PROFILE HERO BANNER */}
      <div className="w-full flex gap-12 items-center py-14 px-16">
        <Image
          src={ryan}
          alt="Profile"
          width={320}
          height={320}
          className="rounded-full object-cover"
          priority
        />

        <div className="flex flex-col gap-7">
          <div>
            <h1 className="text-5xl font-semibold">Ryan Offiong</h1>
            <p className="text-xl opacity-60 mt-1">Software Developer</p>
          </div>

          <div className="flex gap-6">
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

            <button
              onClick={() => router.push("/application")}
              className="px-6 py-3 rounded-lg font-medium border border-white transition transform hover:scale-105 hover:opacity-80"
            >
              View Application Page
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}
