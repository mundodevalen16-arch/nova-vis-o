import { useEffect } from "react";

const REDIRECT_URL = "https://www.google.com";

export function useDevToolsProtection() {
  useEffect(() => {
    // Block right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      window.location.href = REDIRECT_URL;
    };

    // Block keyboard shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U") ||
        (e.metaKey && e.altKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.metaKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
        window.location.href = REDIRECT_URL;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
