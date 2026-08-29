import { useState, useRef, useEffect } from "react";

export default function FilterDropdown({
  icon,
  value,
  options = [],
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full
          h-12
          px-4
          rounded-2xl
          border
          bg-white
          text-right
          flex
          items-center
          justify-between
          transition-all
          ${
            isOpen
              ? "border-[#263174] ring-2 ring-[#263174]/10"
              : "border-slate-200 hover:border-slate-300"
          }
        `}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {icon && <i className={`${icon} text-[#263174] text-sm shrink-0`} />}
          <span className="text-sm font-bold text-[#080d28] truncate">
            {selectedOption?.label || value}
          </span>
        </div>

        <i
          className={`fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-[#263174]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute
            top-[calc(100%+6px)]
            right-0
            left-0
            z-[100]
            bg-white
            border
            border-slate-100
            rounded-2xl
            shadow-xl
            p-1.5
            max-h-40
            overflow-y-auto
            space-y-1
          "
        >
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
                  px-3.5
                  py-2.5
                  rounded-xl
                  text-xs
                  sm:text-sm
                  font-bold
                  text-right
                  flex
                  items-center
                  justify-between
                  transition
                  ${
                    isSelected
                      ? "bg-blue-50 text-[#263174]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#080d28]"
                  }
                `}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <i className="fa-solid fa-check text-[#263174] text-xs" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
