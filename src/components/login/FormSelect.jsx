import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

export default function FormSelect({
  name,
  control,
  options,
  placeholder = "اختر...",
  error,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`input-field bg-white w-full flex items-center justify-between text-right ${
              error ? "border-red-300" : ""
            }`}
          >
            <span
              className={
                field.value ? "text-[var(--text-dark)]" : "text-slate-400"
              }
            >
              {field.value || placeholder}
            </span>

            <i
              className={`fa-solid fa-chevron-down text-[#123B66] text-xs transition-transform ${
                open ? "rotate-180" : ""
              }`}
            ></i>
          </button>

          {open && (
            <div className="absolute z-30 mt-1.5 w-full bg-white border border-[var(--border-color)] rounded-xl p-1.5 max-h-56 overflow-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    field.onChange(option);
                    setOpen(false);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                    field.value === option
                      ? "bg-[#123B66]/10 text-[#123B66] font-bold"
                      : "text-[var(--text-muted)] hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
}
