"use client";

import Image from 'next/image';
import React, { useMemo } from 'react'
import { useTeamLevel, useTeamLevels } from '@/hooks/be';

const levelVisuals: Record<number, { color: string; icon: string }> = {
  1: { color: '#96B1E1', icon: '/images/friendslevels/1.png' },
  2: { color: '#FDB732', icon: '/images/friendslevels/2.png' },
  3: { color: '#EB6BF2', icon: '/images/friendslevels/3.png' },
}


export const FriendsLevel = () => {
  const { data: teamLevel, isLoading: teamLoading } = useTeamLevel();
  const { data: levelsData } = useTeamLevels();

  const currentLevelId = teamLevel?.level?.id ?? 1;
  const visuals = levelVisuals[currentLevelId] ?? levelVisuals[1];
  const title = teamLevel?.level?.name ?? '—';
  const multiplier = teamLevel?.level?.coefficient ?? 1;
  const points = teamLevel?.total_score ?? 0;
  const scoreNeeded = teamLevel?.score_needed ?? null;

  const nextLevel = useMemo(() => {
    const all = levelsData?.levels ?? [];
    const sorted = [...all].sort((a, b) => a.min_score - b.min_score);
    const idx = sorted.findIndex((l) => l.id === currentLevelId);
    return idx >= 0 ? sorted[idx + 1] : null;
  }, [levelsData?.levels, currentLevelId]);

  return (
    <div 
      className={`flex flex-col gap-2 justify-center items-center text-center border-2 border-b-0 rounded-t-2xl mx-8`}
      style={{ borderColor: visuals.color }}
    >
      {/* <div key={levelData.title} className='flex flex-col gap-2 pb-2'> */}
        <Image src={visuals.icon} alt={title} width={72} height={72} className='mx-auto'/>
        <div style={{ color: visuals.color }}>
          <span className='font-kalame font-black text-5xl'>{teamLoading ? '—' : points}</span>
          &nbsp;
          <span>امتیاز</span>
        </div>
        <div className='text-sm'>
          <span>سطح تیم من:</span>
          &nbsp;
          <span style={{ color: visuals.color }}>{title}</span>
        </div>
        <div className='w-full h-1 rounded-full flex items-center justify-center py-2 px-4'>
          <div className='w-1 h-1 bg-gray-200 rounded-full'></div>
          <div className='w-full h-[1px] bg-gray-200 rounded-full'></div>
          <div className='w-1 h-1 bg-gray-200 rounded-full'></div>
        </div>
        <div className='text-xs'>
          <span>ضریب:</span>
          &nbsp;
          <span style={{ color: visuals.color }} className='text-2xl font-kalame font-bold'>{multiplier}X</span>
          &nbsp;
          <span>جوایز دعوت</span>
        </div>
        {scoreNeeded !== null && nextLevel && (
          <div className="text-xs opacity-80 pb-2">
            {scoreNeeded > 0 ? (
              <span>
                {scoreNeeded.toLocaleString('fa-IR')} امتیاز تا سطح بعدی ({nextLevel.name})
              </span>
            ) : (
              <span>شما در بالاترین سطح هستید.</span>
            )}
          </div>
        )}
      {/* </div> */}
    </div>
  )
}
