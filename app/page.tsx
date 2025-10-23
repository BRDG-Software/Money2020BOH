"use client";
import Image from "next/image";
import MainPage from "./components/mainPage";
import { useGetAllOrdersQuery } from "@/redux/slices/ordersSlice";

export default function Home() {
  return (
    <div className="font-sans">
      <MainPage />
    </div>
  );
}
