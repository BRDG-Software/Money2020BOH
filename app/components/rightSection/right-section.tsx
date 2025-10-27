"use client";
import { cn } from "@/app/lib/utils";
import React, { useState, useMemo } from "react";
import MainSwithes from "./main-switches";
import SwitchSkeleton from "./switch-skeleton";
import {
  useGetAllItemsQuery,
  useUpdateItemsMutation,
} from "@/redux/slices/itemsSlice";
import { dismissAllToasts, itemToasts } from "@/app/lib/toast";
import { RightSectionProps } from "@/app/lib/types";

const RightSection = ({ screenStatus, setScreenStatus }: RightSectionProps) => {
  const [experience, setExperience] = useState("JUICE");

  const {
    data: itemsData,
    isLoading,
    refetch: refetchItems,
  } = useGetAllItemsQuery();
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemsMutation();
  
  // Filter and separate items by type
  const { sweetItems, juiceItems, giftItems } = useMemo(() => {
    if (!itemsData?.items) {
      return { sweetItems: [], juiceItems: [], giftItems: [] };
    }

    const sweetItems = itemsData.items.filter(
      (item) => item.item_type === "sweet"
    );
    const juiceItems = itemsData.items.filter(
      (item) => item.item_type === "juice"
    );
    const giftItems = itemsData.items.filter(
      (item) => item.item_type === "gift"
    );
    return { sweetItems, juiceItems, giftItems };
  }, [itemsData]);

  // Initialize switch states based on availability from API data
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});

  // Update switch states when data changes
  React.useEffect(() => {
    const newStates: Record<string, boolean> = {};

    sweetItems.forEach((item) => {
      newStates[`sugarfina-${item.id}`] = item.available;
    });

    juiceItems.forEach((item) => {
      newStates[`juice-${item.id}`] = item.available;
    });

    giftItems.forEach((item) => {
      newStates[`gift-${item.id}`] = item.available;
    });

    setSwitchStates(newStates);
  }, [sweetItems, juiceItems, giftItems]);

  const toggleSwitch = (
    switchId: string,
    itemType: "sweet" | "juice",
    itemId: number
  ) => {
    const newState = !switchStates[switchId];

    // Update local state immediately for better UX
    setSwitchStates((prev) => ({
      ...prev,
      [switchId]: newState,
    }));

    // Call API to update the item
    handleUpdateItem(itemId, newState);
  };

  const handleUpdateItem = async (id: number, available: boolean) => {
    dismissAllToasts();

    try {
      const data = {
        available: available,
      };
      const res = await updateItem({ id, data }).unwrap();

      if (available) {
        itemToasts.available(id);
      } else {
        itemToasts.unavailable(id);
      }
    } catch (error) {
      console.log(error);

      if (available) {
        itemToasts.availableError(id);
      } else {
        itemToasts.unavailableError(id);
      }
    }
  };

  const [sweetItemsReal, setSweetitemsReal] = useState([
      {id:4,
      "name": "Lemon Shortbread"
      },
      {id:6,
      "name": "Peach Bellini"
      },
      {id:5,
      "name": "Dark Chocolate"
      }
    ]
  )
  const [juiceItemsReal, setJuiceItemsReal] = useState([
      {id:1,
      "name": "Daily Greens"
      },
      {id:2,
      "name": "Roots w/ Ginger"
      },
      {id:3,
      "name": "Sweet Citrus"
      }
    ]
  )
  return (
    <div className="w-[37%] h-full border-l-[6px] border-light-black 1550:p-[40px] p-[25px] flex flex-col gap-y-[20px]">
      {/* main switches */}
      <MainSwithes
        screenStatus={screenStatus}
        setScreenStatus={setScreenStatus}
        experience={experience}
        setExperience={setExperience}
      />

      {/* order details */}
      <div className="flex flex-col h-[calc(100%-250px)] overflow-y-scroll scrollbar-hidden ">
        {isLoading ? (
          <div className="flex flex-col gap-y-[20px] pt-20">
            {Array.from({ length: 5 }).map((_, index) => (
              <SwitchSkeleton key={index} />
            ))}
          </div>
        ) : experience === "SUGARFINA" ? (
          <div
            className={cn(
              "flex flex-col gap-y-[20px] pt-10",
              sweetItemsReal.length < 4 && " pt-30"
            )}
          >
            {sweetItemsReal.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <h1 className="text-black 1550:text-[32px] text-[28px] leading-8 ">
                  {item.name}
                </h1>
                <div className="relative">
                  <div className="1550:w-[126px] w-[106px] 1550:h-[65px] h-[55px] bg-white rounded-full flex items-center justify-center">
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                          toggleSwitch(`sugarfina-${item.id}`, "sweet", item.id)
                      }
                      className={`bswitch-button relative 1550:w-[120px] w-[100px] 1550:h-[59px] h-[49px] rounded-full flex items-center border-4 border-[#EDE1D8] p-1 ${
                        switchStates[`sugarfina-${item.id}`]
                          ? "bg-[#7AC943]"
                          : "bg-[#C1272D]"
                      } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {/* White thumb */}
                      <div
                        className={`switch-thumb sliding 1550:w-[46px] w-[37px] 1550:h-[46px] h-[37px] bg-white rounded-full flex items-center justify-center shadow-lg ${
                          switchStates[`sugarfina-${item.id}`]
                            ? "ml-auto scale-100 active"
                            : "ml-0 scale-100"
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-col gap-y-[29px] pt-10",
              juiceItemsReal.length < 4 && " pt-30"
            )}
          >
            {juiceItemsReal.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <h1 className="text-black 1550:text-[32px] text-[28px] leading-8">
                  {item.name}
                </h1>
                <div className="relative">
                  <div className="1550:w-[126px] w-[106px] 1550:h-[65px] h-[55px] bg-white rounded-full flex items-center justify-center">
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        toggleSwitch(`juice-${item.id}`, "juice", item.id)
                      }
                      className={`switch-button relative 1550:w-[120px] w-[100px] 1550:h-[59px] h-[49px] rounded-full flex items-center border-4 border-[#EDE1D8] p-1 ${
                        switchStates[`juice-${item.id}`]
                          ? "bg-[#7AC943]"
                          : "bg-[#C1272D]"
                      } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {/* White thumb */}
                      <div
                        className={`switch-thumb sliding 1550:w-[46px] w-[37px] 1550:h-[46px] h-[37px] bg-white rounded-full flex items-center justify-center shadow-lg ${
                          switchStates[`juice-${item.id}`]
                            ? "ml-auto scale-100 active"
                            : "ml-0 scale-100"
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="
      w-full h-[30vh] absolute top-[550px] flex justify-betwen items-center
      ">
        <h1 className="text-black 1550:text-[32px] text-[28px] leading-8">
                  Gift
                </h1>
              <div className="relative left-[434px]">
                  <div className="1550:w-[126px] w-[106px] 1550:h-[65px] h-[55px] bg-white rounded-full flex items-center justify-center">
                    <button

                      disabled={isUpdating}
                      onClick={() =>
                        toggleSwitch(`gift-7`, "gift", 1)
                      }
                      className={`switch-button relative 1550:w-[120px] w-[100px] 1550:h-[59px] h-[49px] rounded-full flex items-center border-4 border-[#EDE1D8] p-1 ${
                        switchStates[`gift-7`]
                          ? "bg-[#7AC943]"
                          : "bg-[#C1272D]"
                      } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {/* White thumb */}
                      <div
                        className={`switch-thumb sliding 1550:w-[46px] w-[37px] 1550:h-[46px] h-[37px] bg-white rounded-full flex items-center justify-center shadow-lg ${
                          switchStates[`gift-7`]
                            ? "ml-auto scale-100 active"
                            : "ml-0 scale-100"
                        }`}
                      ></div>
                    </button>
                  </div>
              </div>
      </div>
      {/* RESTART EXPERIENCE Button */}
      <div className="flex justify-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-[#616161] 1550:w-[347px] w-[280px] 1550:h-[100px] h-[80px] leading-9 text-white font-medium 1550:text-[36px] text-[30px] tracking-[3px] rounded-[223px] hover:bg-[#525252] transition-colors duration-200"
        >
          RESTART
        </button>
      </div>
    </div>
  );
};

export default RightSection;
