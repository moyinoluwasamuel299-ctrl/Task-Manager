"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

const FOCUSABLE = 'button, input, textarea, a[href], [tabindex]:not([tabindex="-1"])';

export default function Modal({ title, onClose, children }) {
  const titleId = useId();
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Remember what had focus before the dialog opened (runs during the first render).
  const [previouslyFocused] = useState(() => document.activeElement);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const items = panelRef.current.querySelectorAll(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [previouslyFocused]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-end bg-ink/50 p-4 backdrop-blur-sm sm:place-items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md animate-pop rounded-3xl bg-white p-6 shadow-2xl shadow-ink/25 motion-reduce:animate-none sm:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 rounded-lg p-1.5 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}