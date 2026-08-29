import React from "react";

export default function WorkerStatsRow({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 p-2">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="
            group
            p-5
            rounded-2xl
            bg-[var(--bg-main)]
            border border-[var(--border-color)]
            flex items-center gap-4
            transition-all duration-300
            hover:-translate-x-1
            hover:shadow-md
          "
        >
          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-[#263174]/10
              text-[#263174]
              flex items-center justify-center
              text-2xl
              shrink-0
              transition-transform duration-300
              group-hover:scale-110
              group-hover:rotate-3
            "
          >
            <i className={stat.icon}></i>
          </div>

          <div>
            <span
              className="
                block
                text-2xl
                sm:text-3xl
                font-black
                text-[#263174]
                leading-none
              "
            >
              {stat.value}
            </span>

            <span
              className="
                block
                text-sm
                sm:text-base
                font-bold
                text-slate-500
                mt-1.5
              "
            >
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
