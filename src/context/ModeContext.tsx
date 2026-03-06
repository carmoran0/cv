import React, { createContext, useContext, useState, ReactNode } from "react";
import { Mode } from "../types";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType>({
  mode: "recruiter",
  toggleMode: () => {},
});

export const ModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>("recruiter");
  const toggleMode = () => setMode((prev) => (prev === "recruiter" ? "technical" : "recruiter"));
  return <ModeContext.Provider value={{ mode, toggleMode }}>{children}</ModeContext.Provider>;
};

export const useMode = () => useContext(ModeContext);
