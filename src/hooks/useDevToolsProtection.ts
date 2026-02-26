import { useEffect } from "react";

const REDIRECT_URL = "https://www.google.com";

export function useDevToolsProtection() {
  useEffect(() => {
    // 1. Block right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      window.location.href = REDIRECT_URL;
    };

    // 2. Block keyboard shortcuts
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

    // 3. DevTools open detection via size difference
    const checkDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        window.location.href = REDIRECT_URL;
      }
    };

    const devToolsInterval = setInterval(checkDevTools, 1000);

    // 4. Debugger trap detection
    const debuggerCheck = setInterval(() => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      if (performance.now() - start > 100) {
        window.location.href = REDIRECT_URL;
      }
    }, 4000);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(devToolsInterval);
      clearInterval(debuggerCheck);
    };
  }, []);
}
