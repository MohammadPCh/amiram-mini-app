import { ClaimBox } from "@/components/ClaimBox";
import RewardsBox from "@/components/RewardsBox";

const RewardsPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ClaimBox />
      <RewardsBox />
    </div>
  );
};

export default RewardsPage;
