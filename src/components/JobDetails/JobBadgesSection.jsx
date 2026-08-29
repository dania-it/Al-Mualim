import React from "react";

export default function JobBadgesSection({ badges }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="p-6 sm:p-8">
      <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-[#263174] mb-6">
        <span className="w-12 h-12 rounded-2xl bg-[#263174]/10 text-[#263174] flex items-center justify-center text-xl shrink-0 border border-[#263174]/20">
          <i className="fa-solid fa-award"></i>
        </span>
        الشهادات والتوثيقات المعتمدة
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center text-xl shrink-0 border border-green-500/20">
              <i className="fa-solid fa-circle-check"></i>
            </div>

            <span className="text-base sm:text-lg font-extrabold text-[#263174]">
              {typeof badge === "string" ? badge : badge.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
