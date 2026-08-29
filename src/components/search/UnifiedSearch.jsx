import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInstantSearch from "./useInstantSearch";
import WorkerCard from "../job/WorkerCard";

export default function UnifiedSearch({
  searchableData = [],
  placeholder = "ابحث عن فني، تخصص، خدمة، أو مكان...",
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredResults = useInstantSearch({
    searchableData,
    searchTerm,
    maxResults: 6,
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/jobs?q=${encodeURIComponent(query)}`);
  };

  const hasQuery = searchTerm.trim().length > 0;

  return (
    <div className={`w-full ${className}`} dir="rtl">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full max-w-3xl mx-auto flex items-center bg-[#e2e4e8] border border-[var(--primary)] rounded-full p-1.5 sm:p-2 shadow-[0_8px_22px_rgba(8,13,40,0.10)] transition-all duration-200 focus-within:shadow-[0_10px_26px_rgba(38,49,116,0.16)]"
      >
        <button
          type="submit"
          aria-label="بحث"
          className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <i className="fa-solid fa-magnifying-glass text-sm sm:text-base" />
        </button>

        <div className="flex items-center flex-1 min-w-0 gap-2 px-3 sm:px-4">
          <input
            type="text"
            value={searchTerm}
            placeholder={placeholder}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full min-w-0 bg-transparent border-none outline-none text-sm sm:text-base font-medium text-[var(--text-dark)] placeholder:text-[var(--text-muted)] placeholder:font-normal py-2 text-right"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="مسح البحث"
              className="shrink-0 w-7 h-7 rounded-full bg-white/60 text-[var(--text-muted)] hover:bg-white hover:text-red-500 flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          )}
        </div>
      </form>

      {hasQuery && (
        <div className="mt-6 sm:mt-8 animate-[fadeInUp_0.35s_ease-out]">
          {filteredResults.length > 0 ? (
            <>
              <div className="flex items-center justify-between gap-3 mb-4 px-2">
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-dark)] flex items-center gap-2">
                  <i className="fa-solid fa-magnifying-glass text-[var(--accent-gold)]" />
                  نتائج البحث عن:
                  <span className="font-black">"{searchTerm}"</span>
                </h3>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="bg-transparent text-xs sm:text-sm font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] flex items-center gap-1.5 transition-colors"
                >
                  عرض الكل
                  <i className="fa-solid fa-arrow-left text-xs" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredResults.map((worker, index) => (
                  <WorkerCard
                    key={worker.id ?? worker._id ?? index}
                    worker={worker}
                    highlightTerm={searchTerm}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 bg-[var(--card-bg)] border border-dashed border-[var(--border-color)] rounded-2xl text-[var(--text-muted)]">
              <i className="fa-regular fa-face-frown text-4xl opacity-50" />
              <span className="text-sm sm:text-base text-center">
                ما في نتائج تطابق
                <span className="font-bold text-[var(--text-dark)] mx-1">
                  "{searchTerm}"
                </span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
