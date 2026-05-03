"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "9999px",
          background: "rgba(15, 23, 42, 0.96)",
          color: "#ffffff",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.22)",
          padding: "14px 18px",
        },
        success: {
          style: {
            background: "rgba(12, 75, 61, 0.96)",
          },
        },
        error: {
          style: {
            background: "rgba(127, 29, 29, 0.96)",
          },
        },
      }}
    />
  );
}