import type { HTMLAttributes, ReactNode } from "react";

export default function GlassContainer({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div {...props} className={`glass-container ${className}`}>{children}</div>;
}
