'use client';

import { useDevMode } from "../context/DevModeContext";

export default function DevModeToggle() {
  const { devMode, setDevMode } = useDevMode();
  return (
    <button
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 10000,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "8px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
      onClick={() => setDevMode(!devMode)}
    >
      Dev Mode: {devMode ? "true" : "false"}
    </button>
  );
} 