"use client";

import { FormEvent, useState } from "react";

type WatermarkFormProps = {
  onSubmit: (url: string) => void;
  disabled?: boolean;
  defaultValue?: string;
};

export function WatermarkForm({ onSubmit, disabled = false, defaultValue = "" }: WatermarkFormProps) {
  const [url, setUrl] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = url.trim();

    if (!trimmed) {
      setError("Please enter a video URL.");
      return;
    }

    if (!/^https?:\/\//i.test(trimmed)) {
      setError("Enter a valid URL starting with http or https.");
      return;
    }

    setError(null);
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 4 }}>
        <span style={{ fontWeight: 500 }}>Video URL</span>
        <input
          type="url"
          name="video-url"
          placeholder="https://example.com/video.mp4"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
            if (error) {
              setError(null);
            }
          }}
          disabled={disabled}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: 8,
            border: "1px solid #cbd5f5",
            fontSize: "1rem",
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "url-error" : undefined}
          required
        />
      </label>
      {error ? (
        <p id="url-error" style={{ color: "#dc2626", fontSize: "0.875rem" }}>
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "#cbd5f5" : "#4f46e5",
          color: disabled ? "#1f2937" : "#ffffff",
          border: "none",
          borderRadius: 8,
          padding: "0.75rem 1rem",
          fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 0.2s ease",
        }}
      >
        Remove watermark
      </button>
    </form>
  );
}
