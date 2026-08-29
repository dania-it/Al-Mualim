import React from "react";

export default function WorkerLocation({ residence, serviceAreas }) {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-[var(--primary)]">
        <span className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-xl shrink-0 border border-[var(--primary)]/20">
          <i className="fa-solid fa-location-dot text-[var(--primary)]"></i>
        </span>
        تفاصيل السكن ونطاق العمل
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {residence && (
          <div className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--primary)] flex items-center justify-center text-2xl shrink-0">
              <i className="fa-solid fa-house-user text-[var(--primary)]"></i>
            </div>
            <div>
              <span className="block text-xs font-bold text-[var(--text-muted)] mb-1">
                مكان الإقامة الرئيسي
              </span>
              <span className="block text-lg font-black text-[var(--text-dark)]">
                {residence}
              </span>
            </div>
          </div>
        )}

        <div className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--primary)] flex items-center justify-center text-2xl shrink-0">
            <i className="fa-solid fa-map-location-dot text-[var(--primary)]"></i>
          </div>
          <div>
            <span className="block text-xs font-bold text-[var(--text-muted)] mb-1">
              نطاق التغطية والمناطق المتاحة
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {Array.isArray(serviceAreas) && serviceAreas.length > 0 ? (
                serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-base font-black text-[var(--text-dark)]"
                  >
                    {area}
                    {idx < serviceAreas.length - 1 ? "، " : ""}
                  </span>
                ))
              ) : (
                <span className="text-base font-black text-[var(--text-dark)]">
                  المناطق المجاورة
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
