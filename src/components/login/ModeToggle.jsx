export default function ModeToggle({ mode, onChange, options }) {
  return (
    <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
      {options.map((item) => (
        <button
          key={item.mode}
          type="button"
          onClick={() => onChange(item.mode)}
          className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            mode === item.mode
              ? "bg-[#123B66] text-white"
              : "text-[var(--text-muted)] hover:bg-white"
          }`}
        >
          <i className={item.icon}></i>
          {item.label}
        </button>
      ))}
    </div>
  );
}
