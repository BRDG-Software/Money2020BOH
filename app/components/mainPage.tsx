"use client";
import React, { useState } from "react";
import LeftSection from "./leftSection/left-section";
import RightSection from "./rightSection/right-section";

const MainPage = () => {
  const [screenStatus, setScreenStatus] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen border-[12px] border-t-[34px] border-light-black">
      {/* left section */}
      <LeftSection screenStatus={screenStatus} />

      {/* right section */}
      <RightSection
        screenStatus={screenStatus}
        setScreenStatus={setScreenStatus}
      />
    </div>
  );
};

export default MainPage;
