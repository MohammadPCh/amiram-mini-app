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

  // Rotation offset so that label index 0 aligns to the top pointer when rotation=0
  const zeroAlignOffset = useMemo(() => {
    return segments.length > 0 ? 0 : 0;
  }, [segments.length]);

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
    // Choose a target angle within the slice, not exactly at the center
    const edgePadding = Math.min(12, segmentAngle * 0.25); // avoid stopping too close to borders
    const sliceStart = targetIndex * segmentAngle + edgePadding;
    const sliceEnd = (targetIndex + 1) * segmentAngle - edgePadding;
    const targetAngle = sliceStart + Math.random() * Math.max(0, sliceEnd - sliceStart);

    const currentRotationMod = ((rotation % 360) + 360) % 360;
    const absoluteFinal = spins * 360 + (360 - targetAngle);

    // Add a very small overshoot then bounce back (target ~0–1°)
    const desiredOvershoot = Math.random() / 2; // 0..1 deg
    const maxSafe = Math.max(0.6, edgePadding - 0.5);
    const overshootDeg = Math.min(desiredOvershoot, maxSafe);
    const absoluteOvershoot = absoluteFinal + overshootDeg;

    // Slow, small reverse phase: clamp to 150–220ms
    const durationBack = Math.max(150, Math.min(220, Math.floor(durationMs * 0.03)));
    const durationForward = Math.max(0, durationMs - durationBack);

    const deltaOvershoot = absoluteOvershoot - currentRotationMod;
    const nextRotationOvershoot = rotation + deltaOvershoot;

    // Phase 1: spin forward to overshoot
    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${durationForward}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      // Force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      wheelRef.current.offsetHeight;
    }
    setRotation(nextRotationOvershoot);

    // Phase 2: bounce back to final target
    window.setTimeout(() => {
      if (wheelRef.current) {
        wheelRef.current.style.transition = `transform ${durationBack}ms linear`;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        wheelRef.current.offsetHeight;
      }
      const deltaFinal = absoluteFinal - currentRotationMod;
      const nextRotationFinal = rotation + deltaFinal;
      setRotation(nextRotationFinal);

      window.setTimeout(() => {
        setIsSpinning(false);
        onSpinEnd?.(targetIndex, segments[targetIndex]);
      }, durationBack + 30);
    }, durationForward + 10);
  }, [isSpinning, disabled, segments, getTargetIndex, segmentAngle, rotation, durationMs, onSpinEnd]);

  const labelNodes = useMemo(() => {
    const radius = size * 0.36;
    return segments.map((seg, i) => {
      // Align first label to 45° when n=4, i.e., shift by one slice relative to start at -90°
      const n = Math.max(1, segments.length);
      const sliceIndex = (i + 1) % n;
      const angle = (360 / n) / 2 - 90 + sliceIndex * (360 / n);
      // Pick text color opposite the background for this slice index
      const labelColor = sliceIndex % 2 === 0 ? "#F8F8F8" : "#1C2737";
          return (
            <div
              key={`${seg.label}-${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius/1.4}px)`,
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: "rotate(-90deg)",
                  color: labelColor,
                  fontWeight: 800,
                  fontFamily: "var(--font-kalame), sans-serif",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  fontSize: Math.max(24, Math.floor(size * 0.06)),
                  filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.25))",
                  direction: "ltr",
                }}
              >
                {seg.label}
              </span>
            </div>
          );
    });
  }, [segments, size]);

  return (
    <div
      style={{
        width: size,
        height: size + 24,
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Pointer (rounded triangle via SVG) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          zIndex: 3,
          left: "50%",
          top: 0,
          transform: "translate(-50%, 50%)",
        }}
      >
        {(() => {
          const pointerWidth = 35;
          const pointerHeight = 30;
          const strokeW =4;
          const fill = "#F5CF31";
          return (
            <svg width={pointerWidth} height={pointerHeight} viewBox={`0 0 ${pointerWidth} ${pointerHeight}`}>
              <polygon
                points={`2,2 ${pointerWidth-2},2 ${pointerWidth / 2},${pointerHeight-2}`}
                fill={fill}
                stroke={fill}
                strokeWidth={strokeW}
                strokeLinejoin="round"
              />
            </svg>
          );
        })()}
      </div>

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
            transform: `rotate(${rotation + zeroAlignOffset}deg)`,
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
          >
            <div
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: Math.floor(size * 0.09),
              height: Math.floor(size * 0.09),
              borderRadius: "9999px",
              background: "#F5CF31",
              boxShadow: "0 6px 10px rgba(0,0,0,0.25)",
            }}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default SpinWheel;


