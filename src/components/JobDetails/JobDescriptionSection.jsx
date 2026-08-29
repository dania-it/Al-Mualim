import React from "react";

export default function JobDescriptionSection({ description, priceNote }) {
  if (!description && !priceNote) return null;

  return (
    <div className="p-6 sm:p-8">
      <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-[#263174] mb-6">
        <span className="w-12 h-12 rounded-2xl bg-[#263174]/10 text-[#263174] flex items-center justify-center text-xl shrink-0 border border-[#263174]/20">
          <i className="fa-solid fa-briefcase"></i>
        </span>
        تفاصيل الخدمة والخبرة
      </h2>

      {description && (
        <div className="bg-[var(--bg-main)] p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] mb-6">
          <p className="text-base sm:text-lg lg:text-xl font-medium text-[var(--text-dark)] leading-8">
            {description}
          </p>
        </div>
      )}

      {priceNote && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#ffb53e]/10 border border-[#ffb53e]/25 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#ffb53e]/15 text-[#ffb53e] flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-circle-info"></i>
          </div>

          <div>
            <span className="block text-base sm:text-lg font-black text-[#263174] mb-1">
              ملاحظة حول السعر والاتفاق
            </span>

            <span className="block text-sm sm:text-base font-semibold text-[var(--text-muted)] leading-7">
              {priceNote}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
