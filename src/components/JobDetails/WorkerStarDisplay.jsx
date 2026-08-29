import React from "react";

export default function WorkerStarDisplay({ value = 0, showNum = false }) {
  const safeValue = Number(value) || 0;

  const fullStars = Math.floor(safeValue);
  const hasHalfStar = safeValue - fullStars >= 0.5;

  return (
    <div
      className="inline-flex items-center gap-1"
      title={`التقييم: ${safeValue.toFixed(1)} من 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <i
              key={i}
              className="fa-solid fa-star text-[#ffb53e] text-base"
            ></i>
          );
        }

        if (i === fullStars && hasHalfStar) {
          return (
            <i
              key={i}
              className="fa-solid fa-star-half-stroke text-[#ffb53e] text-base"
            ></i>
          );
        }

        return (
          <i
            key={i}
            className="fa-regular fa-star text-[var(--text-muted)] opacity-40 text-base"
          ></i>
        );
      })}

      {showNum && (
        <span className="text-base font-black text-[#263174] mr-1">
          {safeValue.toFixed(1)}
        </span>
      )}
    </div>
  );
}
