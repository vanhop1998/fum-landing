"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function GlassModal({
  open,
  title,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className="glass-modal" aria-labelledby="glass-modal-title" onClose={onClose}>
      <div className="glass-modal__inner">
        <div className="glass-modal__heading">
          <h2 id="glass-modal-title">{title}</h2>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Đóng hộp thoại">×</button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
