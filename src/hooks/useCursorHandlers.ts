"use client";
import { useCallback } from "react";
import { useCursor, CursorState } from "@/context/CursorContext";

/**
 * Returns onMouseEnter / onMouseLeave handlers for any element.
 * 
 * Usage:
 *   const handlers = useCursorHandlers("hover");
 *   <a {...handlers}>Link</a>
 * 
 *   const handlers = useCursorHandlers("project", "View Case Study");
 *   <div {...handlers}>Project Card</div>
 */
export function useCursorHandlers(state: CursorState, label?: string) {
  const { setCursor, resetCursor } = useCursor();

  const onMouseEnter = useCallback(() => {
    setCursor(state, label || "");
  }, [setCursor, state, label]);

  const onMouseLeave = useCallback(() => {
    resetCursor();
  }, [resetCursor]);

  return { onMouseEnter, onMouseLeave };
}

/**
 * Auto-detect cursor events for interactive elements.
 * Drop this component inside any section to auto-wire cursor states 
 * to all <a>, <button> elements inside it.
 */
export function useCursorAutoDetect() {
  const { setCursor, resetCursor } = useCursor();

  const onMouseOver = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button']");

      if (interactive) {
        const cursorType =
          (interactive.getAttribute("data-cursor") as CursorState) || "hover";
        const cursorLabel =
          interactive.getAttribute("data-cursor-label") || "";
        setCursor(cursorType, cursorLabel);
      }
    },
    [setCursor]
  );

  const onMouseOut = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button']");
      if (interactive) {
        resetCursor();
      }
    },
    [resetCursor]
  );

  return { onMouseOver, onMouseOut };
}
