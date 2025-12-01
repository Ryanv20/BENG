"use client";
import { useState } from "react";


export default function Attachments() {
  return (
    <div className="p-6 border rounded-md shadow-md bg-white space-y-4">
      <h2 className="text-lg font-semibold">Attachments</h2>

      <div className="flex flex-col space-y-2">
        <label className="font-medium">CV</label>
        <input type="file" className="border p-2 rounded-md" />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium">Cover Letter</label>
        <input type="file" className="border p-2 rounded-md" />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium">Portfolio (optional)</label>
        <input type="url" placeholder="Paste link here" className="border p-2 rounded-md" />
      </div>
    </div>
  );
}
