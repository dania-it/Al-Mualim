import { useState, useRef, useEffect } from 'react';

export default function DashboardSelect({
  icon,
  placeholder,
  value,
  options = [],
  onChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', close);

    return () => {
      document.removeEventListener('mousedown', close);
    };
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative w-full font-[var(--font-tajawal)]" ref={ref} dir="rtl">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={`
          w-full
          px-3 sm:px-3.5 py-2 sm:py-2.5
          rounded-xl
          border
          bg-white
          text-right
          flex items-center justify-between
          gap-2
          transition-colors
          text-xs sm:text-sm
          font-medium
          outline-none
          ${
            disabled
              ? 'opacity-50 cursor-not-allowed bg-slate-50'
              : 'cursor-pointer'
          }
          ${
            isOpen
              ? 'border-[var(--primary)] ring-2 ring-[var(--primary-soft)]'
              : 'border-slate-200 hover:border-slate-300'
          }
        `}
      >
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          {icon && (
            <i
              className={`
                ${icon}
                text-[var(--primary)]
                text-xs sm:text-sm
                shrink-0
              `}
            />
          )}

          <span
            className={`
              truncate
              ${
                selected
                  ? 'text-slate-800 font-bold'
                  : 'text-slate-400 font-normal'
              }
            `}
          >
            {selected?.label || placeholder || 'اختر...'}
          </span>
        </div>

        <i
          className={`
            fa-solid fa-chevron-down
            text-slate-400
            text-[10px] sm:text-xs
            shrink-0
            transition-transform
            duration-200
            ${isOpen ? 'rotate-180 text-[var(--primary)]' : ''}
          `}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute
            top-[calc(100%+4px)]
            right-0
            w-full
            min-w-[180px] sm:min-w-[200px]
            z-30
            bg-white
            border
            border-slate-200
            rounded-xl
            shadow-xl
            overflow-hidden
          "
        >
          <div className="max-h-48 overflow-y-auto p-1 space-y-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full
                    px-3 py-2
                    rounded-lg
                    text-xs sm:text-sm
                    text-right
                    flex items-center justify-between
                    gap-2
                    transition-colors
                    cursor-pointer
                    ${
                      isSelected
                        ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[var(--primary)]'
                    }
                  `}
                >
                  <span className="truncate">{option.label}</span>

                  {isSelected && (
                    <i className="fa-solid fa-check text-[var(--primary)] text-xs shrink-0" />
                  )}
                </button>
              );
            })}

            {options.length === 0 && (
              <p className="text-center text-xs sm:text-sm text-slate-400 py-3">
                لا يوجد خيارات
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}