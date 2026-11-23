"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LiquidGlass } from "@vepando/liquid-glass-react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "primary" | "secondary";
};

export default function GlassButton({ children, tone = "secondary", className = "", ...props }: Props) {
  return (
    <LiquidGlass radius={999} interactive className="glass-button-surface">
      <button {...props} className={`glass-button glass-button--${tone} ${className}`}>
        {children}
      </button>
    </LiquidGlass>
  );
}
