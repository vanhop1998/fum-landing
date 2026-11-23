import type { HTMLAttributes, ReactNode } from "react";

export default function GlassPanel({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <section {...props} className={`glass-panel ${className}`}>{children}</section>;
}
