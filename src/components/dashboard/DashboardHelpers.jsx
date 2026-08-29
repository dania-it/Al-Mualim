import React, { useState, useCallback, useEffect } from "react";

export function useToast(duration = 1800) {
  const [toast, setToast] = useState(null);
  const showToast = useCallback(
    (text, type = "success") => {
      setToast({ text, type });
      setTimeout(() => setToast(null), duration);
    },
    [duration],
  );
  return [toast, showToast];
}

export const getProjectStatusText = (project) => {
  const step = Number(project?.statusStep) || 0;
  if (step >= 5 || project?.status === "منجزة") return "مكتمل";
  if (!project?.assignedWorker || project?.assignedWorker === "بانتظار التعيين")
    return "بانتظار تعيين الفني";
  if (step === 4) return "بدأ العمل";
  if (step === 3) return "وصل إلى المنزل";
  if (step === 2) return "على الطريق";
  if (step === 1) return "خرج من المركز";
  return "قيد المعالجة";
};

export function Toast({ message, type = "success", duration = 1800, onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => {
      if (typeof onClose === "function") onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!message) return null;
  const isDanger = type === "danger";
  const isWarning = type === "warning";

  return (
    <div 
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[130] bg-slate-900/95 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 sm:gap-3 border border-slate-700/80 backdrop-blur-xs max-w-[90vw] sm:max-w-md font-[var(--font-tajawal)]"
      dir="rtl"
    >
      <i
        className={`fa-solid text-xs sm:text-sm shrink-0 ${
          isDanger 
            ? "fa-circle-xmark text-rose-400" 
            : isWarning 
            ? "fa-triangle-exclamation text-amber-400" 
            : "fa-circle-check text-emerald-400"
        }`}
      ></i>
      <span className="truncate">{typeof message === "object" ? message.text : message}</span>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className="space-y-1.5 font-[var(--font-tajawal)]" dir="rtl">
      <label className="block text-xs sm:text-sm font-bold text-slate-700">{label}</label>
      {children}
    </div>
  );
}

export function EmptyState({ msg, icon = "fa-solid fa-inbox" }) {
  return (
    <div className="bg-white border border-dashed border-slate-200 rounded-2xl py-8 sm:py-12 px-4 text-center font-[var(--font-tajawal)]" dir="rtl">
      <i className={`${icon} text-3xl sm:text-4xl text-slate-300 mb-2.5 sm:mb-3 block`}></i>
      <p className="text-xs sm:text-sm text-slate-400 font-medium">{msg}</p>
    </div>
  );
}