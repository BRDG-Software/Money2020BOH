import { cn } from "@/app/lib/utils";
import React from "react";

const MainSwithes = ({
  screenStatus,
  setScreenStatus,
  experience,
  setExperience,
}: {
  screenStatus: boolean;
  setScreenStatus: (status: boolean) => void;
  experience: string;
  setExperience: (experience: string) => void;
}) => {
  return (
    <div className="flex flex-col justify-between items-center gap-y-[25px]">
      {/* screen status */}
      {/* <div className="flex justify-between items-center w-full mt-3">
        <h1 className=" text-black 1400:text-[36px] text-[28px] font-extrabold uppercase 1550:leading-9 leading-8 tracking-[1px]">
          SCREEN STATUS
        </h1>
        <div className="relative">
          <div className="1550:w-[246px] 1200:w-[200px] w-[160px] 1550:h-[69px] h-[59px] bg-white rounded-2xl flex items-center justify-center">
            <button
              onClick={() => setScreenStatus(!screenStatus)}
              className={cn(
                "relative 1550:w-[240px] 1200:w-[194px] w-[154px] 1550:h-[62px] h-[52px] rounded-2xl flex items-center border-4 border-[#EDE1D8] cursor-pointer",
                screenStatus ? "bg-[#7AC943]" : "bg-[#C1272D]"
              )}
            >
              <div
                className={cn(
                  "1550:w-[118px] 1200:w-[90px] w-[70px] h-full bg-white rounded-xl flex items-center justify-center",
                  screenStatus ? "switch-thumb-on" : "switch-thumb-off"
                )}
                style={{
                  transition:
                    "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <span className="font-normal text-[32px] tracking-[1px] text-black">
                  {screenStatus ? "ON" : "OFF"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div> */}
      {/* EXPERIENCE SELECTION */}
      <div className="flex justify-between items-center w-full mt-10">
        <h1 className="text-black 1400:text-[36px] text-[28px] font-bold uppercase 1550:leading-9 leading-8 tracking-[1px]">
          EXPERIENCE <br /> SELECTION
        </h1>
        <div className="relative">
          <div className="1550:w-[246px] 1200:w-[200px] w-[160px] 1550:h-[69px] h-[59px] bg-white rounded-2xl flex items-center justify-center">
            <button
              onClick={() =>
                setExperience(
                  experience === "SUGARFINA" ? "OTHER" : "SUGARFINA"
                )
              }
              className="relative 1550:w-[240px] 1200:w-[194px] w-[154px] 1550:h-[62px] h-[52px] bg-[#E26E00] rounded-2xl flex items-center border-4 border-[#EDE1D8] cursor-pointer"
            >
              {/* White thumb */}
              <div
                className={cn(
                  "1550:w-[118px] 1200:w-[90px] w-[70px] h-full bg-white rounded-xl flex items-center justify-center",
                  experience === "SUGARFINA"
                    ? "switch-thumb-on"
                    : "switch-thumb-off"
                )}
                style={{
                  transition:
                    "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <span className="font-normal 1550:text-[20px] text-[16px] tracking-[0px] text-black">
                  {experience === "SUGARFINA" ? "SUGARFINA" : "JUICE"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSwithes;
