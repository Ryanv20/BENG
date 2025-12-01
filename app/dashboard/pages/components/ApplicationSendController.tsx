"use client";

import { useState } from "react";

export default function ApplicationSendController({ onDispatch }: { onDispatch?: () => void }) {
  const [messagesPerMinute, setMessagesPerMinute] = useState(20);
  const [delayRandomizer, setDelayRandomizer] = useState(true);
  const [autoRetry, setAutoRetry] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleStartSending = () => {
    if (isSending) return;
    setIsSending(true);
    onDispatch?.();
    // Here backend dispatch logic / worker would start
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-md mx-auto space-y-4">
      <button
        onClick={handleStartSending}
        disabled={isSending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md disabled:opacity-50"
      >
        {isSending ? "Sending..." : "Start Sending"}
      </button>

      <div className="flex items-center justify-between">
        <label>Messages per minute:</label>
        <input
          type="number"
          value={messagesPerMinute}
          onChange={(e) => setMessagesPerMinute(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1"
        />
      </div>

      <div className="flex items-center justify-between">
        <label>Delay Randomizer:</label>
        <input
          type="checkbox"
          checked={delayRandomizer}
          onChange={() => setDelayRandomizer(!delayRandomizer)}
        />
      </div>

      <div className="flex items-center justify-between">
        <label>Auto-Retry Failed:</label>
        <input
          type="checkbox"
          checked={autoRetry}
          onChange={() => setAutoRetry(!autoRetry)}
        />
      </div>

      <div className="text-sm text-gray-600">
        Total: 0 | Sent: 0 | Failed: 0
      </div>
    </div>
  );
}
