// @ts-nocheck
import { cn } from "@/app/lib/utils";
import { useUpdateOrderMutation } from "@/redux/slices/ordersSlice";
import { useState } from "react"
import { dismissAllToasts, orderToasts } from "@/app/lib/toast";
import React from "react";
import { OrderCardProps } from "@/app/lib/types";

const OrderCard = ({
  order,
  containerHeight,
  scrollTop,
  getItemScale,
  refetchOrders,
  isFetchingOrders,
  index,
}: OrderCardProps) => {
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const handleUpdateOrder = async (id: number, status: string) => {
    dismissAllToasts();
    try {
      const data = {
        status: status,
      };
      const res = await updateOrder({ id, data }).unwrap();

      if (status === "completed") {
        orderToasts.ready(id);
      } else {
        orderToasts.cancel(id);
      }

      refetchOrders();
    } catch (error) {
      console.log(error);

      if (status === "completed") {
        orderToasts.readyError(id);
      } else {
        orderToasts.cancelError(id);
      }
    }
  };

  const [sweetItemsReal, setSweetitemsReal] = useState([
      {id:1,
      "name": "Lemon Shortbread"
      },
      {id:2,
      "name": "Peach Bellini"
      },
      {id:3,
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
  const allItemsReal = {
    "peachbellinigummyhearts": "Peach Bellini",
    "darkchocolateseasaltcaramels": "Dark Chocolate",
    "lemonshortbreadcookies":"Lemon Shortbread",
    "dailygreens": "Daily Greens",
    "rootswithginger": "Roots w/ Ginger",
    "sweetcitrus":"Sweet Citrus",
    "giftwithpurchase": "GIFT",

  }
  //console.log(`slugs: ${order.items}`)
  //console.log(`realos: ${JSON.stringify(sweetItemsReal)}`)
  //console.log(`order items ${JSON.stringify(order.items)}`)
  return (
    <div
      key={order.id}
      className={cn(
        "order-item 1500:w-[95%] 1300:w-[97%] w-[99%] 1700:min-h-[140px] min-h-[130px] rounded-[13px] flex justify-between items-center 1700:px-8 1500:px-6 1200:px-4 px-2 1700:py-4 py-3 relative",
        order.status === "pending" ? "bg-white" : "bg-[#BDBABA]",
        getItemScale(index)
      )}
    >
      {/* Left section - Guest Info */}
      <div className="flex flex-col">
        {order.user_profile.firstName &&
        <p
          className={cn(
            " 1400:text-[30px] text-[26px] font-medium text-center leading-8 ",
            order.status === "pending" ? "text-black" : "text-[#00000040]"
          )}
        >
          {/* {order.firstName} */}
          {order.user_profile.firstName}
        </p>
        }
        <p
          className={cn(
            " 1400:text-[30px] text-[26px] font-medium text-center leading-8 ",
            order.status === "pending" ? "text-black" : "text-[#00000040]"
          )}
        >
          {order.kiosk_type}
        </p>
        <p
          className={cn(
            " 1400:text-[30px] text-[26px] font-medium text-center leading-8 ",
            order.status === "pending" ? "text-black" : "text-[#00000040]"
          )}
        >
          #{order.id}
        </p>
      </div>

      {/* Center section - Order Items */}
      <div className="flex-1 flex justify-center">
        <div className="flex flex-col gap-1.5 w-[90%]">
          {order.items.map((item, index) => (
            <h2
              key={index}
              className={cn(
                "text-black 1400:text-[30px] text-[26px] font-medium text-center leading-8",
                order.status === "pending" ? "text-black" : "text-[#00000040]"
              )}
            >
              {allItemsReal[item.slug]}
            </h2>
          ))}
        </div>
      </div>

      {/* Right section - Action Buttons */}
      {order.status === "completed" ? (
        <p className="1700:w-[375px] 1500:w-[238px] w-[250px] text-[#00000040] text-[36px] font-medium text-center leading-8 tracking-[2px] uppercase">
          FULFILLED
        </p>
      ) : order.status === "canceled" ? (
        <p className="1700:w-[375px] 1500:w-[238px] w-[250px] text-[#00000040] text-[36px] font-medium text-center leading-8 tracking-[2px] uppercase">
          CANCELLED
        </p>
      ) : (
        <div className="flex 1700:gap-[22px] 1500:gap-[10px] 1300:gap-[8px] gap-[6px]">
          <button
            disabled={isUpdating || isFetchingOrders}
            onClick={() => handleUpdateOrder(order.id, "completed")}
            className={`1700:w-[177px] 1500:w-[140px] 1300:w-[120px] w-[100px] 1300:h-[79px] h-[65px] text-white font-medium 1700:text-[34px] 1500:text-[30px] text-[22px] rounded-full uppercase 1300:tracking-[3px] tracking-[1px] transition-all duration-200 ${
              isUpdating || isFetchingOrders
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-[#7AC943] hover:bg-[#7CB342] hover:scale-105"
            }`}
          >
            Ready
          </button>
          <button
            disabled={isUpdating || isFetchingOrders}
            onClick={() => handleUpdateOrder(order.id, "canceled")}
            className={`1700:w-[177px] 1500:w-[140px] 1300:w-[120px] w-[100px] 1300:h-[79px] h-[65px] text-white font-medium 1700:text-[34px] 1500:text-[30px] text-[22px] rounded-full uppercase 1300:tracking-[3px] tracking-[1px] transition-all duration-200 ${
              isUpdating || isFetchingOrders
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-[#C1272D] hover:bg-[#C62828] hover:scale-105"
            }`}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
