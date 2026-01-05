import { leaderBoardPeople } from "../constants";
import LeaderBoardItem from "./LeaderBoardItem";

interface Props {
  selectedTab: string;
}

export default function LeaderBoardList(_props: Props) {
  // Filter
  const filteredPeople = leaderBoardPeople;

  return (
    <div className="w-full flex flex-col items-center pt-4 pb-2 px-4 gap-2">
      {filteredPeople.map((person, ind) => (
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
  );
}
