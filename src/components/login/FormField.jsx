export default function FormField({ label, icon, error, required, children }) {
  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] mb-1.5">
        <i className={`${icon} text-blue-900 text-[11px]`}></i>

        {label}

        {required && <span className="text-red-500">*</span>}
      </label>

      {children}

      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
          {error}
        </p>
      )}
    </div>
  );
}
