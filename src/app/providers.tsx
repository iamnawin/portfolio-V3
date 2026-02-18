"use client";

import React from "react";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/CustomCursor";
import CursorThemeSetter from "@/components/CursorThemeSetter";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <CursorThemeSetter />
      <CustomCursor />
      {children}
    </CursorProvider>
  );
}
