"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { LiquidGlass } from "@vepando/liquid-glass-react";

export default function GlassCard({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <LiquidGlass radius={24} className={`glass-card-surface ${className}`}>
      <div {...props} className="glass-card">{children}</div>
    </LiquidGlass>
  );
}
