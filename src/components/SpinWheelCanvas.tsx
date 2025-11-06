"use client";

import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver"; // Adjust path as needed
import { useWheel } from "@/context/WheelContext";

type WheelSegment = {
  label: string;
  color?: string;
  payload?: unknown;
};

type SpinWheelProps = {
  segments: WheelSegment[];
  minSize?: number; // Optional min size to avoid too small
  durationMs?: number;
  disabled?: boolean;
  getTargetIndex?: () => number | Promise<number>;
  onSpinEnd?: (index: number, segment: WheelSegment) => void;
  clipToPartial?: boolean;
  fontSizeScale?: number; // Scale factor for font size (e.g., 0.08 for bigger)
};

function bezierEasing(x1: number, y1: number, x2: number, y2: number) {
  const epsilon = 0.001;
  const getBezierX = (t: number) => 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
  const getBezierDX = (t: number) => 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * x2 + 3 * t * t;
  const getBezierY = (t: number) => 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;

  return function (inputX: number) {
    if (inputX === 0 || inputX === 1) return inputX;
    let t = inputX;
    for (let i = 0; i < 8; i++) {
      const currentX = getBezierX(t);
      const dX = getBezierDX(t);
      if (Math.abs(currentX - inputX) < epsilon || Math.abs(dX) < epsilon) break;
      t -= (currentX - inputX) / dX;
    }
    return getBezierY(t);
  };
}

export const SpinWheelCanvas: React.FC<SpinWheelProps> = ({
  segments,
  minSize = 280,
  durationMs = 4500,
  disabled,
  getTargetIndex,
  onSpinEnd,
  clipToPartial = false,
  fontSizeScale = 0.1, // Default; increase for larger text (e.g., 0.1 ≈96px at size=1000)
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRotation = useRef(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const { registerExecutor, setIsSpinning: setGlobalSpinning } = useWheel();
  const { width: containerWidth } = useResizeObserver(containerRef);
  const size = Math.max(minSize, containerWidth || minSize); // Dynamic size, min to avoid tiny
  const segmentAngle = useMemo(() => (segments.length > 0 ? 360 / segments.length : 0), [segments.length]);
  const zeroAlignOffset = 0;
  const easeForward = bezierEasing(0.22, 1, 0.36, 1);

  const fontFamily = useMemo(() => {
    if (typeof window === 'undefined') return 'sans-serif';
    const target = containerRef.current ?? document.body;
    const value = getComputedStyle(target).getPropertyValue('--font-kalame').trim();
    return value || 'sans-serif';
  }, []);

  console.log('fontFamily', fontFamily)

  const drawWheel = useCallback((rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size * 1.01;
    const radius = size * 0.8;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (clipToPartial) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(size*0.05, 0, size * 0.9, centerY + radius * 0.05);
      ctx.clip();
    }

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation + zeroAlignOffset) * (Math.PI / 180));

    const slice = (2 * Math.PI) / Math.max(1, segments.length);
    for (let i = 0; i < segments.length; i++) {
      const start = i * slice;
      const end = (i + 1) * slice;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.fillStyle = segments[i].color || (i % 2 === 0 ? "#FFFFFF" : "#1C2737");
      ctx.fill();
    }

    const labelRadius = size * 0.36;
    for (let i = 0; i < segments.length; i++) {
      const sliceIndex = (i + 1) % segments.length;
      const angleDeg = segmentAngle / 2 - 90 + sliceIndex * segmentAngle;
      const angle = angleDeg * (Math.PI / 180);
      ctx.save();
      ctx.rotate(angle);
      ctx.translate(0, -labelRadius * 1.3);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = sliceIndex % 2 === 0 ? "#F8F8F8" : "#1C2737";
      ctx.font = `900 ${Math.max(24, Math.floor(size * fontSizeScale))}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.shadowOffsetY = 1;
      ctx.fillText(segments[i].label, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#F5CF31";
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = "#F5CF31";
    ctx.beginPath();
    ctx.arc(0, 0, Math.floor(size * 0.18) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, Math.floor(size * 0.09) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Pointer
    const pointerWidth = 12 * (size / 100); // Scale with size
    const pointerHeight = 12 * (size / 100);
    const strokeW = 4 * (size / 100);
    ctx.save();
    ctx.translate(centerX, centerY - radius * 0.985);
    ctx.fillStyle = "#F5CF31";
    ctx.strokeStyle = "#F5CF31";
    ctx.lineWidth = strokeW;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(-pointerWidth / 2 + 2, 2);
    ctx.lineTo(pointerWidth / 2 - 2, 2);
    ctx.lineTo(0, pointerHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    if (clipToPartial) {
      ctx.restore();
    }
  }, [segments, size, segmentAngle, clipToPartial, fontFamily, fontSizeScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = (size + 24) * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size + 24}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    drawWheel(currentRotation.current);
  }, [size, drawWheel]);

  useEffect(() => {
    if (typeof document === 'undefined' || !(document as any).fonts) return;
    (document as any).fonts.ready.then(() => {
      drawWheel(currentRotation.current);
    });
  }, [drawWheel]);

  const animate = useCallback(
    (target: number, duration: number, easing: (t: number) => number, callback: () => void) => {
      const startTime = performance.now();
      const startRot = currentRotation.current;
      const delta = target - startRot;
      const loop = (time: number) => {
        const t = Math.min(1, (time - startTime) / duration);
        const easedT = easing(t);
        currentRotation.current = startRot + delta * easedT;
        drawWheel(currentRotation.current);
        if (t < 1) {
          requestAnimationFrame(loop);
        } else {
          callback();
        }
      };
      requestAnimationFrame(loop);
    },
    [drawWheel]
  );

  const spinInternal = useCallback(async (overrideTargetIndex?: number) => {
    if (isSpinning || disabled || segments.length === 0) return { index: -1 };
    setIsSpinning(true);

    let targetIndex: number;
    if (typeof overrideTargetIndex === 'number') {
      targetIndex = overrideTargetIndex;
    } else if (getTargetIndex) {
      targetIndex = await Promise.resolve(getTargetIndex());
    } else {
      targetIndex = Math.floor(Math.random() * segments.length);
    }
    targetIndex = Math.abs(Math.trunc(targetIndex)) % segments.length;

    const spins = 5 + Math.floor(Math.random() * 3);
    const edgePadding = Math.min(12, segmentAngle * 0.25);
    const sliceStart = targetIndex * segmentAngle + edgePadding;
    const sliceEnd = (targetIndex + 1) * segmentAngle - edgePadding;
    const targetAngle = sliceStart + Math.random() * (sliceEnd - sliceStart);

    const currentRotationMod = ((currentRotation.current % 360) + 360) % 360;
    const absoluteFinal = spins * 360 + (360 - targetAngle);
    const desiredOvershoot = Math.random() / 2;
    const maxSafe = Math.max(0.6, edgePadding - 0.5);
    const overshootDeg = Math.min(desiredOvershoot, maxSafe);
    const absoluteOvershoot = absoluteFinal + overshootDeg;

    const targetOvershoot = currentRotation.current + (absoluteOvershoot - currentRotationMod);
    const targetFinal = currentRotation.current + (absoluteFinal - currentRotationMod);

    const durationBack = Math.max(150, Math.min(220, Math.floor(durationMs * 0.03)));
    const durationForward = Math.max(0, durationMs - durationBack);

    return await new Promise<{ index: number }>((resolve) => {
      animate(targetOvershoot, durationForward, easeForward, () => {
        animate(targetFinal, durationBack, (t) => t, () => {
          setIsSpinning(false);
          onSpinEnd?.(targetIndex, segments[targetIndex]);
          resolve({ index: targetIndex });
        });
      });
    });
  }, [isSpinning, disabled, segments, getTargetIndex, segmentAngle, durationMs, onSpinEnd, animate]);

  const handleSpin = useCallback(async () => {
    await spinInternal();
  }, [spinInternal]);

  useEffect(() => {
    registerExecutor((opts) => spinInternal(opts?.targetIndex));
    return () => registerExecutor(null);
  }, [registerExecutor, spinInternal]);

  useEffect(() => {
    setGlobalSpinning(isSpinning);
  }, [isSpinning, setGlobalSpinning]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%", // Full parent width
        height: size + 24, // Dynamic height based on computed size
        position: "relative",
        userSelect: "none",
      }}
    >
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
          top: 0,
          bottom: 0,
          display: "grid",
          placeItems: "center",
        }}
        aria-label="Spin the wheel"
      >
        <canvas ref={canvasRef} />
      </button>
    </div>
  );
};

export default SpinWheelCanvas;