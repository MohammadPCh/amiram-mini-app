import React from "react";

export default function CompetitionInfo() {
  return (
    <div className="w-full flex justify-center pt-6 px-4">
      <div className="relative max-w-xl w-full rounded-t-3xl border border-primary text-base p-6">
        <div className="py-2 px-4 flex justify-center">
          <span className="text-yellow-400 text-2xl">🟡🟡</span>
        </div>

        <div className="flex flex-col items-center gap-4" dir="rtl">
          {/* Prize text */}
          <div className="flex items-center gap-2">
            <span className="text-sm">جایزه</span>
            <span className="text-primary font-bold text-2xl">1000</span>
            <span className="text-sm">دلاری</span>
          </div>

          {/* Divider line with dots */}
          <div className="w-full flex items-center gap-0">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="flex-1 h-[1px] bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>

          {/* Time remaining */}
          <p className="text-sm text-gray-300">
            فقط{" "}
            <span className="text-yellow-400 font-bold">2 روز و 23 ساعت</span>{" "}
            تا پایان مسابقه
          </p>
        </div>
      </div>
    </div>
  );
}
