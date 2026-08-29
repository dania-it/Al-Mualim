import React from "react";

export default function FeatureCard({
  icon,
  title,
  desc,
  className = "",
  iconBgClass = "bg-[var(--primary-soft)]",
  iconColorClass = "text-[var(--primary)]",
  titleColorClass = "text-[var(--primary)]", 
  descColorClass = "text-[var(--text-muted)]",
  number,
}) {
  return (
    <div
      className={`
        group
        relative
        h-full
        bg-[var(--card-bg)]
        border
        border-[var(--border-color)]
        rounded-3xl
        p-5
        sm:p-6
        flex
        flex-row
        items-center
        text-right
        gap-4
        sm:gap-5
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        font-tajawal
        ${className}
      `}
    >
      {/* رقم الخطوة (إن وجد) */}
      {number && (
        <span
          className="
            absolute
            top-3
            left-3
            w-7
            h-7
            rounded-full
            flex
            items-center
            justify-center
            text-xs
            font-black
            shadow-sm
            border-2
            border-white
            z-10
            bg-[var(--primary)]
            text-white
          "
        >
          {number}
        </span>
      )}

      {/* مربع الأيقونة المدوّر على اليمين */}
      <div
        className={`
          relative
          z-10
          w-14
          h-14
          sm:w-16
          sm:h-16
          rounded-2xl
          flex
          items-center
          justify-center
          text-2xl
          sm:text-3xl
          shrink-0
          transition-transform
          duration-300
          group-hover:scale-105
          ${iconBgClass}
          ${iconColorClass}
        `}
      >
        <i className={icon}></i>
      </div>

      {/* النصوص على اليسار بجانب الأيقونة */}
      <div className="relative z-10 flex-1 min-w-0">
        <h3
          className={`
            text-base
            sm:text-lg
            font-black
            leading-snug
            mb-1.5
            truncate
            ${titleColorClass}
          `}
        >
          {title}
        </h3>

        <p
          className={`
            text-xs
            sm:text-sm
            leading-relaxed
            font-medium
            ${descColorClass}
          `}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}