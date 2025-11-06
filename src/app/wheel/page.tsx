import React from "react";
import Image from "next/image";

const WheelPage = () => {
  return (
    <div className="rounded-2xl border-2 border-base-300 px-4 py-6 h-full">
      <div className="text-center font-kalame font-black">
        <div className="text-5xl">گردونه رو</div>
        <div className="text-8xl text-primary -mt-4">بچرخون</div>
      </div>
      <div className="mt-12">
        <div className="flex bg-primary rounded-t-xl py-4 text-center justify-center items-center gap-4">
          <div className="text-base font-bold text-primary-content">بچرخون</div>
          <div className="flex bg-black pr-2 rounded-lg items-center justify-center">
            <span className="text-primary">۱-</span>
            <Image
              src="/images/sparkle.png"
              alt="spark"
              width={32}
              height={32}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex items-center justify-center">
                <span className="text-sm text-primary">۵</span>
                <Image src="/images/sparkle.png" alt="spark" width={32} height={32} />
            </div>
            <div>
                <span className="font-bold">باقی مانده است</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WheelPage;
