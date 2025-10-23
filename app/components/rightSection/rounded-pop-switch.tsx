"use client";
import React, { useState } from "react";

interface RoundedPopSwitchProps {
  toggleSwitch: (itemId: string) => void;
  itemId: string | number;
  switchStates: Record<string, boolean>;
}

const RoundedPopSwitch = ({
  toggleSwitch,
  itemId,
  switchStates,
}: RoundedPopSwitchProps) => {
  return (
    <div className="relative">
      <div className="1550:w-[126px] w-[106px] 1550:h-[65px] h-[55px] bg-white rounded-full flex items-center justify-center">
        <button
          onClick={() => toggleSwitch(`sugarfina-${itemId}`)}
          className="switch-button relative 1550:w-[120px] w-[100px] 1550:h-[59px] h-[49px] bg-[#7AC943] rounded-full flex items-center border-4 border-[#EDE1D8] p-1"
        >
          {/* White thumb */}
          <div
            className={`switch-thumb sliding 1550:w-[48px] w-[40px] 1550:h-[48px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg ${
              switchStates[`sugarfina-${itemId}`]
                ? "ml-auto scale-100 active"
                : "ml-0 scale-100"
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default RoundedPopSwitch;
