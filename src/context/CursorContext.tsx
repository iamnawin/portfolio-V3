"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CursorTheme = "landing" | "professional" | "creator";
export type CursorState = "default" | "hover" | "project" | "cta" | "text";

interface CursorContextType {
  theme: CursorTheme;
  state: CursorState;
  label: string;
  setTheme: (t: CursorTheme) => void;
  setState: (s: CursorState) => void;
  setLabel: (l: string) => void;
  setCursor: (s: CursorState, l?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  theme: "landing",
  state: "default",
  label: "",
  setTheme: () => {},
  setState: () => {},
  setLabel: () => {},
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<CursorTheme>("landing");
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  const setCursor = useCallback((s: CursorState, l?: string) => {
    setState(s);
    if (l !== undefined) setLabel(l);
  }, []);

  const resetCursor = useCallback(() => {
    setState("default");
    setLabel("");
  }, []);

  return (
    <CursorContext.Provider
      value={{ theme, state, label, setTheme, setState, setLabel, setCursor, resetCursor }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
