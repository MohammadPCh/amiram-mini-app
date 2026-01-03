"use client";

import { Level } from "@/lib/api/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const mapEnToFa = (enLevelName: string) => {
  switch (enLevelName) {
    case "boronzi":
      return "برنزی";
    case "noghrei":
      return "نقره‌ای";
    case "Talai":
      return "طلایی";
    default:
      return enLevelName;
  }
};

const mapIdToColor = (id: number) => {
  switch (id) {
    case 1:
      return "text-yellow-800";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};

const mapIdToImage = (id: number) => {
  switch (id) {
    case 1:
      return `/images/levels/3.png`;
    case 2:
      return `/images/levels/2.png`;
    case 3:
      return `/images/levels/1.png`;
    default:
      return `/images/levels/3.png`;
  }
};

const LevelCard = ({ level, loaded }: { level?: Level; loaded?: boolean }) => {
  if (!loaded) {
    <div className="mx-2.5 rounded-b-2xl border-2 border-primary border-t-0 flex items-center glass animate-pulse">
      {/* Image skeleton */}
      <div className="w-12 h-12 bg-neutral-700 rounded-full" />

      {/* Level text skeleton */}
      <div className="flex gap-1 items-center justify-end text-sm ml-2">
        <div className="w-10 h-4 bg-neutral-700 rounded" /> {/* "سطح:" */}
        <div className="w-16 h-4 bg-neutral-600 rounded" /> {/* Level name */}
      </div>

      {/* SVG placeholder */}
      <div className="w-[117px] h-5 bg-neutral-700 rounded ml-2" />

      {/* Coefficient and rewards skeleton */}
      <div className="flex gap-1 items-center justify-end text-xs ml-2">
        <div className="w-8 h-3 bg-neutral-700 rounded" /> {/* "ضریب:" */}
        <div className="w-10 h-6 bg-neutral-600 rounded font-extrabold text-2xl" />{" "}
        {/* coefficient */}
        <div className="w-12 h-3 bg-neutral-700 rounded" /> {/* "جوایز" */}
      </div>
    </div>;
  }

  if (!level) return null;

  return (
    <div className="mx-2.5 rounded-b-2xl border-2 border-primary border-t-0 flex items-center glass px-4">
      <Image
        src={mapIdToImage(level.id)}
        alt={`Level ${level.name}`}
        width={48}
        height={48}
      />
      <div className="flex gap-1 items-center justify-end text-sm">
        <span className="text-neutral-content">سطح:</span>
        <span className={clsx(mapIdToColor(level.id), "font-bold text-lg")}>
          {mapEnToFa(level.name)}
        </span>
      </div>
      <svg
        className="flex-1 mx-2" // <-- this makes it grow
        height="20"
        viewBox="0 0 117 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.64645 9.64645C7.45119 9.84171 7.45119 10.1583 7.64645 10.3536L10.8284 13.5355C11.0237 13.7308 11.3403 13.7308 11.5355 13.5355C11.7308 13.3403 11.7308 13.0237 11.5355 12.8284L8.70711 10L11.5355 7.17157C11.7308 6.97631 11.7308 6.65973 11.5355 6.46447C11.3403 6.2692 11.0237 6.2692 10.8284 6.46447L7.64645 9.64645ZM109 10V9.5L8 9.5V10V10.5L109 10.5V10Z"
          fill="white"
        />
      </svg>
      <div className="flex gap-1 items-center justify-end text-xs">
        <span className="text-neutral-content">ضریب:</span>
        <span
          className={`font-extrabold text-lg ${mapIdToColor(
            level.coefficient
          )}`}
        >
          {level.coefficient}X
        </span>
        <span className="text-neutral-content">جوایز</span>
      </div>
      {/* <div className="flex items-center justify-between gap-2"> */}
      {/* <div className="flex items-center gap-3"> */}
      {/* <div className="w-10 h-10 flex items-center justify-center"> */}
      {/* <img src={icon} alt={title} className="w-9 h-9" /> */}
      {/* </div> */}
      {/* <div className="text-right"> */}
      {/* <div className={`text-sm font-bold ${colorClass}`}>سطح: {title}</div> */}
      {/* <div className="text-xs text-gray-300">ضریب: <span className={`font-extrabold ${colorClass}`}>{multiplier}</span> ← جوایز</div> */}
      {/* </div> */}
      {/* </div> */}
      {/* <button aria-label={`info ${id}`} className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-200">i</button> */}
      {/* </div> */}
      {/* <div className={`absolute left-2 top-2 h-[calc(100%-1rem)] w-1 ${colorClass.replace('text-', 'bg-') || ''}`} /> */}
    </div>
  );
};

export default LevelCard;
