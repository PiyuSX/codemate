"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { showSlide } from "@/store/useSlideStorage";

export default function CallLeaveWatcher() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // First render — don't consider it a "leave"
    if (previousPathname.current === pathname) {
      return;
    }

    // User was on the call page and moved somewhere else
    if (previousPathname.current === "/test" && pathname !== "/test") {
      showSlide("Leaving the page | Ending the call");

      console.log("LEFT CALL PAGE");
    }

    previousPathname.current = pathname;
  }, [pathname]);

  return null;
}