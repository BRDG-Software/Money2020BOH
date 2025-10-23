"use client";
import React from "react";

// redux
import { store } from "./store";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}