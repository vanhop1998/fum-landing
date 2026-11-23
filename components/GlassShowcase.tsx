"use client";

import GlassButton from "@/components/glass/GlassButton";
import GlassCard from "@/components/glass/GlassCard";
import GlassContainer from "@/components/glass/GlassContainer";
import GlassPanel from "@/components/glass/GlassPanel";
import GlassTabs from "@/components/glass/GlassTabs";
import { useState } from "react";
import GlassModal from "@/components/glass/GlassModal";

export default function GlassShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="ui-lab">
      <header className="ui-lab__header">
        <a href="/" className="ui-lab__back">← FUM</a>
        <p>FUM · DESIGN SYSTEM</p>
        <h1>Liquid Glass Lab</h1>
        <span>Kiểm tra vật liệu, tương phản và các trạng thái tương tác.</span>
      </header>

      <GlassContainer className="ui-lab__content">
        <div className="ui-lab__backdrop">
          <div className="ui-lab__glow" />
          <GlassPanel className="ui-lab__panel">
            <span className="ui-lab__eyebrow">FPTU DA NANG MEDIA CLUB</span>
            <h2>Clarity with depth.</h2>
            <p>Lớp kính được sử dụng có chọn lọc cho điều hướng và điều khiển; nội dung vẫn nằm trên bề mặt rõ nét.</p>
            <div className="ui-lab__actions">
              <GlassButton tone="primary" onClick={() => setModalOpen(true)}>Mở modal</GlassButton>
              <GlassButton onClick={() => window.location.assign("/")}>Về landing page</GlassButton>
            </div>
          </GlassPanel>
          <GlassCard className="ui-lab__card">
            <strong>10 YEARS</strong>
            <span>13.09.2017 — 13.09.2027</span>
          </GlassCard>
        </div>

        <section className="ui-lab__section">
          <h2>Interactive states</h2>
          <GlassTabs tabs={[{ id: "regular", label: "Regular" }, { id: "clear", label: "Clear" }, { id: "tinted", label: "Tinted" }]} />
          <p>Kiểm tra focus bằng bàn phím, trạng thái hover/press và khả năng đọc trên nền sáng/tối.</p>
        </section>
      </GlassContainer>

      <GlassModal open={modalOpen} title="FUM Liquid Glass" onClose={() => setModalOpen(false)}>
        <p>Modal sử dụng native dialog để giữ hành vi focus và bàn phím của trình duyệt.</p>
        <GlassButton tone="primary" onClick={() => setModalOpen(false)}>Đóng</GlassButton>
      </GlassModal>
    </main>
  );
}
