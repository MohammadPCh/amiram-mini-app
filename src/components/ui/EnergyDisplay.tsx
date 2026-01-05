interface EnergyDisplayProps {
  energy?: number;
  loading?: boolean;
}

const EnergyDisplay = ({ energy, loading }: EnergyDisplayProps) => {
  if (loading) {
    return (
      <div className="flex gap-1 items-center">
        <div className="w-8 h-5 rounded-md bg-base-200 animate-pulse" />
        <div className="w-4 h-5 rounded-md bg-base-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex gap-1 flex-nowrap items-center">
      <p className="font-kalame text-primary text-xl mt-[2px]">{energy}</p>
      <img src="/images/icons/energy.svg" width={16} height={22} alt="energy" />
    </div>
  );
};

export default EnergyDisplay;
