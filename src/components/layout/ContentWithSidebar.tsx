"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../auth/AuthContext";

export default function ContentWithSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contentMarginLeft, setContentMarginLeft] = useState<number>(0);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    function compute() {
      try {
        const width = typeof window !== "undefined" ? window.innerWidth : 0;

        // If user is not authenticated, always set margin to 0
        if (!isAuthenticated) {
          setContentMarginLeft(0);
          return;
        }

        if (width >= 1024) {
          // If user has collapsed the sidebar we intentionally set margin to 0
          // so the sidebar overlays the page instead of pushing it to the right.
          const collapsed = localStorage.getItem("sidebar_collapsed") === "1";
          if (collapsed) {
            setContentMarginLeft(0);
          } else {
            // Measure the actual sidebar element so we match its width exactly
            const aside = document.querySelector(
              "aside[data-sidebar='main']"
            ) as HTMLElement | null;
            if (aside) {
              const rect = aside.getBoundingClientRect();
              if (rect.width && rect.width > 0) {
                setContentMarginLeft(Math.round(rect.width));
              } else {
                // fallback to default expanded width
                setContentMarginLeft(256);
              }
            } else {
              setContentMarginLeft(0);
            }
          }
        } else {
          setContentMarginLeft(0);
        }
      } catch (e) {
        setContentMarginLeft(0);
      }
    }

    compute();
    window.addEventListener("resize", compute);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "sidebar_collapsed") compute();
    };
    window.addEventListener("storage", onStorage);
    const onSidebarChange = (e: Event) => {
      compute();
    };
    window.addEventListener("sidebar:change", onSidebarChange as EventListener);

    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(
        "sidebar:change",
        onSidebarChange as EventListener
      );
    };
  }, [isAuthenticated]); // Add isAuthenticated as dependency

  useEffect(() => {
    try {
      console.debug("ContentWithSidebar margin ->", contentMarginLeft);
    } catch (e) {}
  }, [contentMarginLeft]);

  return <div style={{ marginLeft: contentMarginLeft }}>{children}</div>;
}
