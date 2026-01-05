"use client";

import React, { useState } from "react";
import { leaderBoardTabs } from "./constants";
import CompetitionInfo from "./components/CompetitionInfo";
import TabsBar from "./components/TabsBar";
import LeaderBoardList from "./components/LeaderBoardList";
import LeaderBoardCard from "./components/LeaderBoardCard";

export default function RankingPage() {
  const [selectedTab, setSelectedTab] = useState<string>(
    leaderBoardTabs[0].key
  );

  return (
    <div className="w-full py-2.5 flex flex-col items-center">
      <CompetitionInfo />
      <LeaderBoardCard title="جدول جوایز">
        <TabsBar selectedTab={selectedTab} onChange={setSelectedTab} />
        <LeaderBoardList selectedTab={selectedTab} />
      </LeaderBoardCard>
    </div>
  );
}
