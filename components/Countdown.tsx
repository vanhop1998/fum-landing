"use client";

import { useEffect } from "react";

export default function Countdown() {
  useEffect(() => {
    const target = new Date("2027-09-13T00:00:00+07:00").getTime();
    const pad = (value: number) => String(value).padStart(2, "0");

    const update = () => {
      const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const values: Record<string, string> = {
        daysLeft: String(Math.floor(remaining / 86400)),
        hLeft: pad(Math.floor((remaining % 86400) / 3600)),
        mLeft: pad(Math.floor((remaining % 3600) / 60)),
        sLeft: pad(remaining % 60)
      };

      for (const [id, value] of Object.entries(values)) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
      }
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}
