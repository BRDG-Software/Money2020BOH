import React from "react";

const SwitchSkeleton = () => {
  return (
    <div className="flex justify-between items-center">
      {/* Item name skeleton */}
      <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>

      {/* Switch skeleton */}
      <div className="relative">
        <div className="1550:w-[126px] w-[106px] 1550:h-[65px] h-[55px] bg-white rounded-full flex items-center justify-center">
          <div className="1550:w-[120px] w-[100px] 1550:h-[59px] h-[49px] bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SwitchSkeleton;
