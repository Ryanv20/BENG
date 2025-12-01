"use client";

import React, { useEffect, useRef, useState } from "react";

type PlaceholderKey =
  | "company_name"
  | "receiver_name"
  | "role"
  | "location"
  | "application_date";

const PLACEHOLDERS: { key: PlaceholderKey; label: string }[] = [
  { key: "company_name", label: "{company_name}" },
  { key: "receiver_name", label: "{receiver_name}" },
  { key: "role", label: "{role}" },
  { key: "location", label: "{location}" },
  { key: "application_date", label: "{application_date}" },
];

export default function MessageTemplate() {
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("Hello {receiver_name},\n\nI am excited to apply for the {role} position at {company_name}.");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const saveTimer = useRef<number | null>(null);

  // sample data to populate preview
  const sampleCompany = {
    company_name: "Acme Corp",
    receiver_name: "Jane Doe",
    role: "Frontend Engineer",
    location: "Lagos, NG",
    application_date: new Date().toLocaleDateString(),
  } as Record<string, string>;

  // Auto-save with debounce (1s idle)
  useEffect(() => {
    setCharCount(body.length + subject.length);
    setSaving(true);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    // debounce: save after 1s idle
    saveTimer.current = window.setTimeout(() => {
      // emulate save action
      setLastSavedAt(Date.now());
      setSaving(false);
      saveTimer.current = null;
    }, 1000);

    return () => {
      if (saveTimer.current) {
        window.clearTimeout(saveTimer.current);
        saveTimer.current = null;
      }
    };
  }, [body, subject]);

  // insert placeholder at cursor position inside textarea
  function insertPlaceholder(tag: string) {
    const el = textareaRef.current;
    if (!el) {
      // fallback: append
      setBody((prev) => prev + " " + tag);
      return;
    }
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? start;
    const before = el.value.slice(0, start);
    const after = el.value.slice(end);
    const newVal = before + tag + after;
    setBody(newVal);

    // restore focus and set cursor after inserted tag
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + tag.length;
      el.setSelectionRange(pos, pos);
    });
  }

  // Render preview replacing placeholders with sample data
  function renderPreviewText(template: string) {
    let text = template;
    PLACEHOLDERS.forEach((p) => {
      const regex = new RegExp(`\\{${p.key}\\}`, "g");
      text = text.replace(regex, sampleCompany[p.key] ?? "");
    });
    return text;
  }

  return (
    <section aria-labelledby="message-template-heading" className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 id="message-template-heading" className="text-lg font-semibold">
          Message Template
        </h2>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          {saving ? "Saving..." : lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : "Not saved"}
          <span style={{ marginLeft: 8 }}>{charCount} chars</span>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="subject" style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject (e.g., Application for {role})"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            fontSize: 14,
          }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <label htmlFor="body" style={{ fontSize: 13 }}>
            Body
          </label>
          <div>
            <button
              type="button"
              onClick={() => setIsPreviewOpen((s) => !s)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                background: "white",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {isPreviewOpen ? "Close Preview" : "Preview"}
            </button>
          </div>
        </div>

        <textarea
          ref={textareaRef}
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your message. Use placeholders to personalize at scale."
          rows={10}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            fontSize: 14,
            fontFamily: "inherit",
            whiteSpace: "pre-wrap",
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, marginBottom: 8 }}>Placeholders</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {PLACEHOLDERS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => insertPlaceholder(p.label)}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid #d1d5db",
                background: "white",
                fontSize: 13,
                cursor: "pointer",
              }}
              title={`Insert ${p.label}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Minimal preview area (side panel style) */}
      {isPreviewOpen && (
        <aside
          aria-label="preview"
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#ffffff",
          }}
        >
          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Preview (sample company)</div>
          <div style={{ marginBottom: 8 }}>
            <strong>Subject:</strong>
            <div style={{ marginTop: 6 }}>{renderPreviewText(subject || "Application for {role} at {company_name}")}</div>
          </div>
          <div>
            <strong>Body:</strong>
            <div style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{renderPreviewText(body)}</div>
          </div>
        </aside>
      )}
    </section>
  );
}
