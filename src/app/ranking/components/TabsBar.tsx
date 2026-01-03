import { leaderBoardTabs } from "../constants";
import TabItem from "./TabItem";

interface Props {
  selectedTab: string;
  onChange: (key: string) => void;
}

export default function TabsBar({ selectedTab, onChange }: Props) {
  return (
    <div className="w-full flex items-center pt-2 px-4 bg-base-300 rounded-b-2xl">
      {leaderBoardTabs.map((tab) => (
        <TabItem
          key={tab.key}
          id={tab.key}
          title={tab.title}
          selected={selectedTab === tab.key}
          onSelect={onChange}
        />
      ))}
    </div>
  );
}
