"use client";

import { useState } from "react";

export type GlassTab = { id: string; label: string };

export default function GlassTabs({
  tabs,
  initialTab
}: {
  tabs: GlassTab[];
  initialTab?: string;
}) {
  const [active, setActive] = useState(initialTab ?? tabs[0]?.id ?? "");

  return (
    <div className="glass-tabs" role="tablist" aria-label="Chọn nội dung">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          tabIndex={active === tab.id ? 0 : -1}
          className={active === tab.id ? "is-active" : ""}
          onClick={() => setActive(tab.id)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            const index = tabs.findIndex((item) => item.id === active);
            const delta = event.key === "ArrowRight" ? 1 : -1;
            setActive(tabs[(index + delta + tabs.length) % tabs.length].id);
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
