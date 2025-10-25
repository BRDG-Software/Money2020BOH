"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomScrollbar from "../scrollBar/customScrollbar";
import {
  useGetCompletedLatestOrdersQuery,
  useGetLatestOrdersQuery,
} from "@/redux/slices/ordersSlice";
import SkeletonCard from "./skeleton-card";
import OrderCard from "./order-card";
import { Order } from "@/app/lib/types";
import { getItemScale, ScrollState } from "@/app/lib/scrollUtils";

const LeftSection = ({ screenStatus }: { screenStatus: boolean }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [lastOrdersHash, setLastOrdersHash] = useState<string>("");

  const {
    data: latestOrdersData,
    isLoading: isLoadingLatestOrders,
    error: latestOrderError,
    refetch: refetchLatestOrders,
    isFetching: isFetchingLatestOrders,
  } = useGetLatestOrdersQuery(20, {
    pollingInterval: 10000, // Poll every 60 seconds
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });
  const {
    data: completedLatestOrdersData,
    isLoading: isLoadingCompletedLatestOrders,
    error: completedLatestOrderError,
    refetch: refetchCompletedLatestOrders,
    isFetching: isFetchingCompletedLatestOrders,
  } = useGetCompletedLatestOrdersQuery(2, {
    pollingInterval: 10000, // Poll every 60 seconds
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const latestOrders = latestOrdersData?.orders || [];
    const completedOrders = completedLatestOrdersData?.orders || [];

    const combinedOrders = [...latestOrders, ...completedOrders];

    // Remove duplicates ID
    const uniqueOrders = combinedOrders.filter(
      (order, index, self) => index === self.findIndex((o) => o.id === order.id)
    );

    // Sort by created_at
    const sortedOrders = uniqueOrders.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Create a hash of the current orders to detect changes
    const currentOrdersHash = JSON.stringify(
      sortedOrders.map((order) => ({
        id: order.id,
        status: order.status,
        created_at: order.created_at,
        completed_at: order.completed_at,
      }))
    );

    // Only update state if there are actual changes
    if (currentOrdersHash !== lastOrdersHash) {
      setOrdersData(sortedOrders);
      setLastOrdersHash(currentOrdersHash);
      console.log("Orders updated - changes detected");
    } else {
      console.log("Orders unchanged - no re-render needed");
    }
  }, [latestOrdersData, completedLatestOrdersData, lastOrdersHash]);

  const handleScroll = (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ) => {
    setScrollTop(scrollTop);
    setContainerHeight(clientHeight);

    // Mark as scrolling
    setIsScrolling(true);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set timeout to detect when scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const getItemScaleClass = (index: number) => {
    const scrollState: ScrollState = {
      scrollTop,
      containerHeight,
      isScrolling,
    };
    return getItemScale(index, scrollState);
  };

  return (
    <div className="w-[63%] h-full border-r-[6px] border-light-black 1400:px-[30px] px-[14px] 1400:py-[30px] py-[20px]">
      {/* heading */}
      <div className="1700:w-[88.5%] w-[87%] h-[102px] bg-light-black rounded-[13px] flex justify-between items-center">
        {/* guest info and order items */}
        <div className="w-[50%] rounded-[13px] flex gap-[10px] justify-around">
          <h1 className="text-white text-[35px] font-bold uppercase text-center leading-9 tracking-[1px]">
            Guest <br /> Info
          </h1>
          <h1 className="text-white text-[35px] font-bold uppercase text-center leading-9 tracking-[1px]">
            Ordered <br /> Items
          </h1>
        </div>
        {/* order status */}
        <div className="w-[43%] rounded-[13px]">
          <h1 className="text-white text-[35px] font-bold uppercase text-center leading-9 tracking-[1px]">
            Order <br /> Status
          </h1>
        </div>
      </div>

      {/* Scrollable content with custom scrollbar */}
      <div className="w-full h-[calc(100%-120px)] mt-[18px] pr-[25px]">
        {/* {screenStatus ? ( */}
        <CustomScrollbar
          className="flex flex-col 1700:gap-6 gap-4"
          onScroll={handleScroll}
        >
          {isLoadingLatestOrders || isLoadingCompletedLatestOrders ? (
            // Skeleton loading cards
            Array.from({ length: 7 }).map((_, index) => (
              <SkeletonCard key={index} index={index} />
            ))
          ) : latestOrderError || completedLatestOrderError ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-lg text-red-500">Error loading orders</p>
            </div>
          ) : (
            ordersData?.map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                containerHeight={containerHeight}
                scrollTop={scrollTop}
                getItemScale={getItemScaleClass}
                refetchOrders={() => {
                  refetchLatestOrders();
                  refetchCompletedLatestOrders();
                }}
                isFetchingOrders={
                  isFetchingLatestOrders || isFetchingCompletedLatestOrders
                }
                index={index}
              />
            ))
          )}
        </CustomScrollbar>
        {/* ) : (
          <div className="flex justify-center items-center h-full w-[90%] px-20">
            <p
              className="uppercase tracking-[1px] text-lg 1500:text-[38px] text-[26px] font-extrabold text-[#da2026] text-center animate-pulse"
              style={{ textShadow: "0 0 20px rgba(218, 32, 38, 0.3)" }}
            >
              We cant complete your order right now. Please see staff for
              support.
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LeftSection;
