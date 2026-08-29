import { useState } from "react";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  hint,
  placeholder,
  textarea = false,
  rows = 6,
  dir,
}) {
  const [touched, setTouched] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const hasError = Boolean(error) && touched;

  const handleInputChange = (e) => {
    if (error) {
      setErrorCount((prev) => prev + 1);
    } else {
      setErrorCount(0);
    }
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    setTouched(true);
    if (onBlur) onBlur(e);
  };

  const activeErrorMessage = errorCount > 2 && hint ? hint : error;

  const inputStyles = `
    w-full
    bg-[var(--bg-main)]
    border-2
    border-[var(--border-color)]
    focus:border-[#263174]
    hover:border-slate-300
    rounded-xl
    px-4.5
    py-3.5
    text-base
    md:text-lg
    font-medium
    text-[var(--text-dark)]
    outline-none
    transition-all
    duration-200
    placeholder:text-slate-400
    placeholder:font-normal
  `;

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-base md:text-lg font-black text-[#263174] mb-2.5"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          dir={dir}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          data-copilot="off"
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`${inputStyles} resize-y min-h-[160px]`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          dir={dir}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          data-copilot="off"
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={inputStyles}
        />
      )}

      {hasError && (
        <p
          id={`${name}-error`}
          className="mt-2 flex items-center gap-2 text-sm font-bold text-red-500"
        >
          <i className="fa-solid fa-circle-exclamation text-base"></i>
          <span>{activeErrorMessage}</span>
        </p>
      )}
    </div>
  );
}