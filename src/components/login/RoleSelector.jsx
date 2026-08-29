const roles = [
  { key: "client", icon: "fa-solid fa-user", label: "زبون" },
  { key: "worker", icon: "fa-solid fa-screwdriver-wrench", label: "فني" },
];

export default function RoleSelector({ role, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold" dir="rtl">
      {roles.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onChange(item.key)}
          className={`py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
            role === item.key
              ? "bg-white text-[#263174] shadow-sm font-black"
              : "text-slate-500 hover:bg-white/60"
          }`}
        >
          <i className={`${item.icon} ${role === item.key ? "text-[#263174]" : ""}`}></i>
          {item.label}
        </button>
      ))}
    </div>
  );
}