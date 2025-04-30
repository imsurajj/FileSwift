'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

type DevModeContextType = {
  devMode: boolean;
  setDevMode: (val: boolean) => void;
};

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const useDevMode = () => {
  const ctx = useContext(DevModeContext);
  if (!ctx) throw new Error("useDevMode must be used within DevModeProvider");
  return ctx;
};

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [devMode, setDevMode] = useState(true); // Set to true by default

  return (
    <DevModeContext.Provider value={{ devMode, setDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
}; 