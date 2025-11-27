"use client";
import { useEffect, useState } from "react";
export default function Music() {

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-2xl font-semibold">Spotify Connection Test</h2>
      <p className="mt-2 text-gray-300">Token missing. Cannot connect to Spotify.</p>
    </section>
  );

}
