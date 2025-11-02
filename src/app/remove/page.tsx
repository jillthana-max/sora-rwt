"use client";

import { useCallback, useState } from "react";

import { CreditBar } from "@/components/CreditBar";
import { StatusPanel } from "@/components/StatusPanel";
import { WatermarkForm } from "@/components/WatermarkForm";
import { mockRemove } from "@/lib/mockRemove";

type Status = "idle" | "loading" | "success" | "error";

type MockResult = {
  downloadUrl: string;
};

export default function RemovePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | undefined>();
  const [result, setResult] = useState<MockResult | null>(null);

  const handleReset = useCallback(() => {
    setStatus("idle");
    setMessage(undefined);
    setResult(null);
  }, []);

  const handleSubmit = useCallback(async (url: string) => {
    setStatus("loading");
    setMessage(undefined);
    setResult(null);

    try {
      const data = await mockRemove(url);
      setResult(data);
      setMessage("Your video is ready to download.");
      setStatus("success");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "We couldn't remove the watermark. Please try again.";
      setMessage(errorMessage);
      setStatus("error");
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          padding: "2.5rem",
          display: "grid",
          gap: "2rem",
        }}
      >
        <header style={{ display: "grid", gap: 12 }}>
          <p style={{ margin: 0, fontWeight: 600, color: "#6366f1", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Remove watermark
          </p>
          <h1 style={{ margin: 0, fontSize: "2rem", lineHeight: 1.2 }}>Upload once, export clean.</h1>
          <p style={{ margin: 0, color: "#475569" }}>
            Paste a video URL below and we&apos;ll simulate removing its watermark. This mock flow keeps everything client-side.
          </p>
        </header>

        <CreditBar current={120} limit={200} />

        <WatermarkForm onSubmit={handleSubmit} disabled={status === "loading"} />

        <StatusPanel status={status} message={message} downloadUrl={result?.downloadUrl} />

        {(status === "success" || status === "error") && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              justifySelf: "start",
              backgroundColor: "transparent",
              border: "1px solid #cbd5f5",
              color: "#4338ca",
              borderRadius: 8,
              padding: "0.65rem 1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Start over
          </button>
        )}
      </div>
    </main>
  );
}
