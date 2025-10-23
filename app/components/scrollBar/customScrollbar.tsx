// components/CustomScrollbar.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
  onScroll?: (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ) => void;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  className = "",
  onScroll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);

  const updateScrollbar = () => {
    const container = scrollContainerRef.current;
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;

    if (!container || !scrollbar || !thumb) return;

    const scrollPercentage =
      container.scrollTop / (container.scrollHeight - container.clientHeight);
    const scrollbarHeight = scrollbar.clientHeight;
    const thumbHeight = 38;
    const maxThumbTop = scrollbarHeight - thumbHeight;
    const newThumbTop = scrollPercentage * maxThumbTop;

    setThumbTop(isNaN(newThumbTop) ? 0 : newThumbTop);

    // Call onScroll callback with scroll information
    if (onScroll) {
      onScroll(
        container.scrollTop,
        container.scrollHeight,
        container.clientHeight
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);
    updateScrollbar();

    return () => {
      container.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartScrollTop(scrollContainerRef.current?.scrollTop || 0);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current || !scrollbarRef.current)
      return;

    const deltaY = e.clientY - startY;
    const scrollbarHeight = scrollbarRef.current.clientHeight;
    const container = scrollContainerRef.current;
    const contentHeight = container.scrollHeight - container.clientHeight;
    const scrollAmount = (deltaY / scrollbarHeight) * contentHeight;

    container.scrollTop = startScrollTop + scrollAmount;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (
      !scrollContainerRef.current ||
      !scrollbarRef.current ||
      e.target !== scrollbarRef.current
    )
      return;

    const rect = scrollbarRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const scrollbarHeight = scrollbarRef.current.clientHeight;
    const scrollPercentage = clickY / scrollbarHeight;
    const container = scrollContainerRef.current;

    container.scrollTop =
      scrollPercentage * (container.scrollHeight - container.clientHeight);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, startY, startScrollTop]);

  return (
    <div className="relative w-full h-full">
      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        className={`w-full h-full overflow-y-scroll pr-13 ${className}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>

      {/* Custom scrollbar */}
      <div
        ref={scrollbarRef}
        className="absolute right-0 top-0 1400:w-[36px] 1200:w-[30px] w-[25px] h-full bg-[#d97420] rounded-[25px] cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Scrollbar thumb */}
        <div
          ref={thumbRef}
          className="absolute w-[38px] top-1 1200:left-[-22px] left-[-17px] cursor-grab active:cursor-grabbing"
          style={{ top: `${thumbTop}px` }}
          onMouseDown={handleMouseDown}
        >
          {/* White document icon box */}
          <div className="1400:w-[80px] 1200:w-[70px] w-[60px] 1400:h-[70px] 1200:h-[60px] h-[50px] bg-white border-[2.5px] border-[#221812] rounded-[12px] flex flex-col items-center justify-center 1200:gap-[8px] gap-[5px]">
            <div className="1200:w-[40px] w-[30px] h-[2.5px] bg-[#221812] rounded-sm"></div>
            <div className="1200:w-[40px] w-[30px] h-[2.5px] bg-[#221812] rounded-sm"></div>
            <div className="1200:w-[40px] w-[30px] h-[2.5px] bg-[#221812] rounded-sm"></div>
            <div className="1200:w-[40px] w-[30px] h-[2.5px] bg-[#221812] rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomScrollbar;
