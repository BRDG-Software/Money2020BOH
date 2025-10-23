import React from "react";

const SkeletonCard = ({ index }: { index: number }) => {
  return (
    <div
      key={index}
      className="order-item 1500:w-[95%] 1300:w-[97%] w-[99%] 1700:min-h-[140px] min-h-[130px] rounded-[13px] flex justify-between items-center 1700:px-8 1500:px-6 1200:px-4 px-2 1700:py-4 py-3 relative bg-white animate-pulse"
    >
      {/* Left section - Guest Info Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Center section - Order Items Skeleton */}
      <div className="flex-1 flex justify-center">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Right section - Action Buttons Skeleton */}
      <div className="flex 1700:gap-[22px] 1500:gap-[10px] 1300:gap-[8px] gap-[6px]">
        <div className="1700:w-[177px] 1500:w-[140px] 1300:w-[120px] w-[100px] 1300:h-[79px] h-[65px] bg-gray-300 rounded-full animate-pulse"></div>
        <div className="1700:w-[177px] 1500:w-[140px] 1300:w-[120px] w-[100px] 1300:h-[79px] h-[65px] bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
