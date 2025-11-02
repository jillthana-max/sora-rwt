"use client";

import { useMemo } from "react";

type CreditBarProps = {
  current: number;
  limit: number;
};

export function CreditBar({ current, limit }: CreditBarProps) {
  const percentage = useMemo(() => {
    if (limit <= 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, Math.round((current / limit) * 100)));
  }, [current, limit]);

  const label = `${current}/${limit} credits used`;

  return (
    <section aria-label="Credit usage" style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <strong>Credits</strong>
        <span style={{ fontSize: "0.875rem", color: "#4a5568" }}>{label}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          backgroundColor: "#e2e8f0",
          borderRadius: 9999,
          overflow: "hidden",
          height: 12,
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #6366f1, #38bdf8)",
            height: "100%",
          }}
        />
      </div>
    </section>
  );
}
