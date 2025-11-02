"use client";

type Status = "idle" | "loading" | "success" | "error";

type StatusPanelProps = {
  status: Status;
  message?: string;
  downloadUrl?: string;
};

const statusCopy: Record<Status, { heading: string; description: string }> = {
  idle: {
    heading: "Ready when you are",
    description: "Enter a video URL to start removing the watermark.",
  },
  loading: {
    heading: "Removing watermark…",
    description: "Hang tight! This usually takes a moment.",
  },
  success: {
    heading: "All done!",
    description: "Your video is ready to download.",
  },
  error: {
    heading: "Something went wrong",
    description: "Check the details below and try again.",
  },
};

export function StatusPanel({ status, message, downloadUrl }: StatusPanelProps) {
  const copy = statusCopy[status];
  const description = status === "error" ? copy.description : message ?? copy.description;

  return (
    <section
      aria-live={status === "loading" ? "polite" : "assertive"}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "1.25rem",
        backgroundColor: status === "success" ? "#f0fdf4" : status === "error" ? "#fef2f2" : "#ffffff",
        display: "grid",
        gap: 12,
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "1.125rem" }}>{copy.heading}</h2>
        <p style={{ margin: "0.25rem 0 0", color: "#4a5568" }}>{description}</p>
      </div>
      {status === "success" && downloadUrl ? (
        <a
          href={downloadUrl}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#10b981",
            color: "#ffffff",
            padding: "0.75rem 1rem",
            borderRadius: 8,
            fontWeight: 600,
            width: "fit-content",
            textDecoration: "none",
          }}
        >
          Download video
        </a>
      ) : null}
      {status === "error" && message ? (
        <p style={{ margin: 0, color: "#b91c1c", fontWeight: 500 }}>{message}</p>
      ) : null}
    </section>
  );
}
