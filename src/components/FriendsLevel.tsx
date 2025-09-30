import Image from 'next/image';
import React from 'react'

const friendsLevel = [
  {
    color: '#96B1E1',
    title: 'تازه وارد',
    multiplier: 1,
    icon: '/images/friendslevels/1.png'
  },
  {
    color: '#FDB732',
    title: 'درخشان',
    multiplier: 2,
    icon: '/images/friendslevels/2.png'
  },
  {
    color: '#EB6BF2',
    title: 'خفن',
    multiplier: 3,
    icon: '/images/friendslevels/3.png'
  },
]


export const FriendsLevel = () => {
  const points = 3600;
  const level = 2;
  const levelData = friendsLevel[level];
  return (
    <div 
      className={`flex flex-col gap-2 justify-center items-center text-center border-2 border-b-0 rounded-t-2xl mx-8`}
      style={{ borderColor: levelData.color }}
    >
      <div key={levelData.title} className='flex flex-col gap-2 pb-2'>
        <Image src={levelData.icon} alt={levelData.title} width={72} height={72} className='mx-auto'/>
        <div style={{ color: levelData.color }}>
          <span className='font-kalame font-black text-5xl'>{points}</span>
          &nbsp;
          <span>امتیاز</span>
        </div>
        <div className='text-sm'>
          <span>سطح تیم من:</span>
          &nbsp;
          <span style={{ color: levelData.color }}>{levelData.title}</span>
        </div>
        <div className='text-xs'>
          <span>ضریب:</span>
          &nbsp;
          <span style={{ color: levelData.color }} className='text-2xl font-kalame font-bold'>{levelData.multiplier}X</span>
          &nbsp;
          <span>جوایز دعوت</span>
        </div>
      </div>
    </div>
  )
}
