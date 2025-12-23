"use client";

import React, { useState } from "react";
import { leaderBoardPeople, leaderBoardTabs } from "./constants";
import TabItem from "./components/TabItem";
import LeaderBoardItem from "./components/LeaderBoardItem";

export default function RankingPage() {
  const [selectedTab, setSelectedTab] = useState<string>(
    leaderBoardTabs[0].key
  );
  return (
    <div className="mx-4 py-2.5 px-4">
      <div className="p-2 flex-col gap-2 items-center border-2 border-base-300 rounded-2xl bg-base-100">
        <h1 className="w-full text-2xl font-bold font-kalame text-center pb-4 border-b border-primary">
          جدول جوایز
        </h1>
        <div className="w-full flex items-center pt-2 px-4 bg-base-300 rounded-b-2xl">
          {leaderBoardTabs.map((tab) => (
            <TabItem
              key={tab.key}
              id={tab.key}
              title={tab.title}
              selected={selectedTab === tab.key}
              onSelect={(tabKey) => {
                setSelectedTab(tabKey);
              }}
            />
          ))}
        </div>
        <div className="w-full flex flex-col items-center pt-4 pb-2 px-4 gap-2">
          {leaderBoardPeople.map((person, ind) => (
            <LeaderBoardItem
              key={ind}
              ind={ind}
              amount={person.amount}
              currencyColor={person.currencyColor}
              currencyName={person.currencyName}
              currencyImage={person.currencyImage}
              title={person.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
