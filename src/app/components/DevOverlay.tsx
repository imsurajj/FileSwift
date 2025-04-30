'use client';

import { useDevMode } from "../context/DevModeContext";
import { useEffect } from "react";

export default function DevOverlay() {
  const { devMode } = useDevMode();

  useEffect(() => {
    if (devMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [devMode]);

  if (!devMode) return null;

  // Responsive check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        inset: 0,
        minHeight: "100vh",
        minWidth: "100vw",
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        background: '#111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      {/* Centered text only, no spotlight */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
        {/* Animated decorative elements */}
        <span
          style={{
            position: 'absolute',
            top: isMobile ? 40 : 80,
            left: isMobile ? 30 : 120,
            fontSize: isMobile ? 24 : 40,
            opacity: 0.15,
            animation: 'float1 4s ease-in-out infinite',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          ★
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: isMobile ? 60 : 120,
            right: isMobile ? 40 : 140,
            fontSize: isMobile ? 20 : 36,
            opacity: 0.12,
            animation: 'float2 5s ease-in-out infinite',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          ★
        </span>
        <span
          style={{
            position: 'absolute',
            top: isMobile ? 100 : 180,
            right: isMobile ? 30 : 100,
            fontSize: isMobile ? 18 : 32,
            opacity: 0.18,
            animation: 'float3 6s ease-in-out infinite',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          ✦
        </span>
        {/* Main text */}
        <span
          style={{
            fontSize: isMobile ? 32 : 64,
            fontWeight: 900,
            letterSpacing: 2,
            textAlign: 'center',
            color: '#fff',
            lineHeight: 1.1,
            userSelect: 'none',
          }}
        >
          COMING SOON
        </span>
        <span
          style={{
            fontSize: isMobile ? 16 : 28,
            fontWeight: 500,
            letterSpacing: 1,
            textAlign: 'center',
            color: '#fff',
            marginTop: isMobile ? 8 : 16,
            lineHeight: 1.2,
            userSelect: 'none',
          }}
        >
          Working On Updates
        </span>
      </div>
      {/* Keyframes for floating animation */}
      <style>{`
        @keyframes float1 {
          0% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0); }
        }
        @keyframes float2 {
          0% { transform: translateY(0); }
          50% { transform: translateY(14px); }
          100% { transform: translateY(0); }
        }
        @keyframes float3 {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 