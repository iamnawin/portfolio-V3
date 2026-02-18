"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCursor, CursorTheme } from "@/context/CursorContext";

export default function CursorThemeSetter() {
  const pathname = usePathname();
  const { setTheme } = useCursor();

  useEffect(() => {
    if (pathname?.startsWith("/professional")) {
      setTheme("professional");
    } else if (pathname?.startsWith("/creator")) {
      setTheme("creator");
    } else {
      setTheme("landing");
    }
  }, [pathname, setTheme]);

  return null;
}
