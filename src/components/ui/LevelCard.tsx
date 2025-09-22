"use client"

import Image from 'next/image'
import React from 'react'

export enum Level {
   Gold = 1,
   Silver = 2,
   Bronze = 3
}

const data = {
  [Level.Gold]: {
    title: 'طلایی',
    multiplier: 3,
    colorClass: 'text-yellow-400',
  },
  [Level.Silver]: {
    title: 'نقره‌ای',
    multiplier: 2,
    colorClass: 'text-gray-400',
  },
  [Level.Bronze]: {
    title: 'برنزی',
    multiplier: 1,
    colorClass: 'text-yellow-800',
  },
}


const LevelCard = ({
  level
}: {
  level: Level
}) => {
  return (
    <div
      className="mx-2.5 rounded-b-2xl border-2 border-primary border-t-0 flex items-center bg-base-100"
    >
      <Image
        src={`/images/levels/${level}.png`}
        alt={`Level ${level}`}
        width={48}
        height={48}
      />
      <div className="flex gap-1 items-center justify-end text-sm">
        <span className="text-neutral-content">سطح:</span>
        <span className={data[level].colorClass}>{data[level].title}</span>
      </div>
      <div className="flex gap-1 items-center justify-end text-xs">
        <span className="text-neutral-content">ضریب:</span>
        <span className={`font-extrabold text-2xl ${data[level].colorClass}`}>{data[level].multiplier}X</span>
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
  )
}



export default LevelCard
