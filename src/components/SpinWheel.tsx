"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";

type WheelSegment = {
  label: string;
  color?: string;
  payload?: unknown;
};

type SpinWheelProps = {
  segments: WheelSegment[];
  size?: number;
  durationMs?: number;
  disabled?: boolean;
  getTargetIndex?: () => number | Promise<number>;
  onSpinEnd?: (index: number, segment: WheelSegment) => void;
};

function buildConicGradient(segments: WheelSegment[]): string {
  if (segments.length === 0) return "transparent";
  const slice = 100 / segments.length;
  const pieces: string[] = [];
  for (let i = 0; i < segments.length; i += 1) {
    const start = i * slice;
    const end = (i + 1) * slice;
    const color = segments[i].color || (i % 2 === 0 ? "#1C2737" : "#FFFFFF");
    pieces.push(`${color} ${start}% ${end}%`);
  }
  // Align zero degrees to 12 o'clock
  return `conic-gradient(from -90deg, ${pieces.join(", ")})`;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  size = 280,
  durationMs = 4500,
  disabled,
  getTargetIndex,
  onSpinEnd,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  const segmentAngle = useMemo(() => (segments.length > 0 ? 360 / segments.length : 0), [segments.length]);
  const background = useMemo(() => buildConicGradient(segments), [segments]);

  const handleSpin = useCallback(async () => {
    if (isSpinning || disabled || segments.length === 0) return;
    setIsSpinning(true);

    let targetIndex: number;
    if (getTargetIndex) {
      targetIndex = await Promise.resolve(getTargetIndex());
    } else {
      targetIndex = Math.floor(Math.random() * segments.length);
    }
    // Clamp index just in case
    if (!Number.isFinite(targetIndex)) targetIndex = 0;
    targetIndex = Math.abs(Math.trunc(targetIndex)) % segments.length;

    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const targetCenter = targetIndex * segmentAngle + segmentAngle / 2;
    const currentRotationMod = ((rotation % 360) + 360) % 360;
    const absoluteTarget = spins * 360 + (360 - targetCenter);
    const delta = absoluteTarget - currentRotationMod;
    const nextRotation = rotation + delta;

    // Apply rotation with transition
    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${durationMs}ms cubic-bezier(0.17, 0.99, 0.34, 1)`;
      // Force reflow to ensure transition applies when spinning repeatedly
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      wheelRef.current.offsetHeight;
    }
    setRotation(nextRotation);

    window.setTimeout(() => {
      setIsSpinning(false);
      onSpinEnd?.(targetIndex, segments[targetIndex]);
    }, durationMs + 30);
  }, [isSpinning, disabled, segments, getTargetIndex, segmentAngle, rotation, durationMs, onSpinEnd]);

  const labelNodes = useMemo(() => {
    const radius = size * 0.36;
    return segments.map((seg, i) => {
      const angle = i * segmentAngle + segmentAngle / 2;
      return (
        <div
          key={`${seg.label}-${i}`}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`,
            transformOrigin: "center",
            pointerEvents: "none",
            color: i % 2 === 0 ? "#F8F8F8" : "#1C2737",
            fontWeight: 800,
            fontFamily: "var(--font-kalame), sans-serif",
            textAlign: "center",
            whiteSpace: "nowrap",
            fontSize: Math.max(12, Math.floor(size * 0.06)),
            filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.25))",
          }}
        >
          {seg.label}
        </div>
      );
    });
  }, [segments, segmentAngle, size]);

  return (
    <div
      style={{
        width: size,
        height: size + 24,
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Pointer */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          zIndex: 3,
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: "18px solid #F5CF31",
          filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))",
        }}
      />

      {/* Wheel clickable area */}
      <button
        type="button"
        onClick={handleSpin}
        disabled={disabled || isSpinning || segments.length === 0}
        style={{
          all: "unset",
          cursor: disabled || isSpinning ? "not-allowed" : "pointer",
          position: "absolute",
          left: 0,
          right: 0,
          top: 12,
          bottom: 12,
          display: "grid",
          placeItems: "center",
        }}
        aria-label="Spin the wheel"
      >
        <div
          ref={wheelRef}
          style={{
            width: size,
            height: size,
            borderRadius: "9999px",
            background,
            transform: `rotate(${rotation}deg)`,
            boxShadow: "inset 0 0 0 10px #F5CF31, 0 8px 18px rgba(0,0,0,0.35)",
            position: "relative",
          }}
        >
          {labelNodes}
          {/* Hub */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: Math.floor(size * 0.18),
              height: Math.floor(size * 0.18),
              borderRadius: "9999px",
              background: "#F5CF31",
              boxShadow: "0 6px 10px rgba(0,0,0,0.25)",
            }}
          />
        </div>
      </button>
    </div>
  );
};

export default SpinWheel;


