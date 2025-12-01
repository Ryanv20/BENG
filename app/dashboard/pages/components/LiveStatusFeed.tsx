"use client";

import { useState, useEffect, useRef } from "react";

interface StatusEntry {
  id: number;
  company: string;
  timestamp: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
}

export default function LiveStatusFeed() {
  const [entries, setEntries] = useState<StatusEntry[]>([]);
  const feedEndRef = useRef<HTMLDivElement | null>(null);

  // Example: Simulate incoming entries
  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry: StatusEntry = {
        id: entries.length + 1,
        company: `Company ${entries.length + 1}`,
        timestamp: new Date().toLocaleTimeString(),
        status: ["SUCCESS", "FAILED", "PENDING"][
          Math.floor(Math.random() * 3)
        ] as StatusEntry["status"],
      };
      setEntries((prev) => [...prev, newEntry]);
    }, 2000);

    return () => clearInterval(interval);
  }, [entries.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const statusColor = (status: StatusEntry["status"]) => {
    switch (status) {
      case "SUCCESS":
        return "text-green-500";
      case "FAILED":
        return "text-red-500";
      case "PENDING":
        return "text-yellow-500";
    }
  };

  return (
    <div className="border rounded p-4 h-64 overflow-y-auto bg-gray-900 text-white">
      <h2 className="font-semibold mb-2">Live Status Feed</h2>
      {/* <div className="space-y-1">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex justify-between items-center border-b border-gray-700 py-1"
          >
            <span className="text-sm">{entry.timestamp}</span>
            <span className="text-sm">{entry.company}</span>
            <span className={`text-sm font-semibold ${statusColor(entry.status)}`}>
              {entry.status === "SUCCESS"
                ? "✅"
                : entry.status === "FAILED"
                ? "❌"
                : "⏳"}{" "}
              {entry.status}
            </span>
          </div>
        ))}
        <div ref={feedEndRef} />
      </div> */}
    </div>
  );
}
