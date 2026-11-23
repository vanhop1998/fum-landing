"use client";

import { useState } from "react";
import { LiquidGlass } from "@vepando/liquid-glass-react";

const links = [
  ["Về FUM", "#ve-fum"],
  ["Thành tích", "#thanh-tich"],
  ["Sự kiện", "#su-kien"],
  ["Đội ngũ", "#doi-ngu"],
  ["Nhiệm kỳ 2027", "#nk2027"],
  ["Hợp tác", "#hop-tac"]
] as const;

export default function GlassNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-nav-wrap" data-lg-role="dock">
      <LiquidGlass
        radius={24}
        interactive
        style={{
          display: "block",
          width: "min(1200px, calc(100vw - 32px))",
          margin: "0 auto",
          padding: "8px 12px"
        }}
      >
        <nav className="glass-nav" aria-label="Điều hướng chính">
          <a className="glass-brand" href="#top" aria-label="FUM – Trang chủ">
            <img src="/assets/logo_white.png" alt="FUM" width="84" height="32" />
            <span>CLB Truyền thông FUM</span>
          </a>

          <button
            className="glass-menu-toggle"
            type="button"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="fum-primary-links"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>

          <div id="fum-primary-links" className={`glass-links ${open ? "is-open" : ""}`}>
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a className="glass-join" href="#tham-gia" onClick={() => setOpen(false)}>
              Tham gia FUM
            </a>
          </div>
        </nav>
      </LiquidGlass>
    </div>
  );
}
