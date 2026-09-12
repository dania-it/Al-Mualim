import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../Context/AppContext";

export default function Sidebar({
  nav = [],
  navIcons = {},
  active,
  setActive,
  pendingCount = 0,
  pendingProjectsCount = 0,
}) {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const getBadgeConfig = (item) => {
    if (item === "طلبات الفنيين" && pendingCount > 0) {
      return {
        count: pendingCount,
        style: "bg-amber-400 text-slate-900",
      };
    }

    if (item === "المشاريع" && pendingProjectsCount > 0) {
      return {
        count: pendingProjectsCount,
        style: "bg-[var(--accent-gold)] text-[var(--text-dark)]",
      };
    }

    return null;
  };

  const handleNavClick = (item) => {
    setActive(item);
    setIsOpen(false);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const role = user?.role;

    logout();

    if (role === "admin") {
      navigate("/login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-[var(--primary)] text-white px-4 py-3 sticky top-0 z-30 shadow-md font-[var(--font-tajawal)]">
        <div className="flex items-center gap-2 font-black text-base">
          <i className="fa-solid fa-screwdriver-wrench"></i>
          <span>المنصة</span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors text-lg focus:outline-none"
          aria-label="القائمة"
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 right-0 z-50
          w-64 h-screen shrink-0
          bg-[var(--primary)]
          flex flex-col
          py-6 px-4 gap-1
          overflow-y-auto
          font-[var(--font-tajawal)]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        <div className="hidden md:flex items-center gap-2 text-white font-black text-lg sm:text-xl mb-8 px-2 tracking-wide">
          <i className="fa-solid fa-screwdriver-wrench text-base sm:text-lg"></i>
          <span>المنصة</span>
        </div>

        <div className="flex-1 space-y-1">
          {Array.isArray(nav) &&
            nav.map((item) => {
              const badge = getBadgeConfig(item);
              const icon =
                typeof navIcons?.[item] === "string" ? navIcons[item] : "";

              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`
                    flex items-center justify-between
                    px-3.5 py-2.5 rounded-xl
                    text-xs sm:text-sm font-semibold
                    transition-all w-full text-right relative cursor-pointer
                    ${
                      active === item
                        ? "bg-white text-[var(--primary)] shadow font-extrabold"
                        : "text-white/80 hover:bg-white/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    {icon && <i className={`${icon} w-4 text-center text-xs sm:text-sm`}></i>}
                    <span>{item}</span>
                  </div>

                  {badge && (
                    <span
                      className={`
                        text-xs font-bold
                        px-2 py-0.5 rounded-full shadow-sm
                        ${badge.style}
                      `}
                    >
                      {badge.count}
                    </span>
                  )}
                </button>
              );
            })}
        </div>

        <div className="mt-auto pt-5 border-t border-white/20">
          <div className="flex items-center gap-2.5 px-2 mb-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {user?.name?.charAt(0) || "؟"}
            </div>

            <div className="min-w-0">
              <p className="text-white text-xs sm:text-sm font-bold truncate">
                {user?.name || "مدير المنصة"}
              </p>

              <p className="text-white/60 text-xs truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="w-full text-xs sm:text-sm text-white/90 hover:text-white py-2 px-3 mb-1 rounded-lg hover:bg-white/10 transition-all text-right flex items-center gap-2"
          >
            <i className="fa-solid fa-globe text-xs sm:text-sm"></i>
            <span>تصفح الموقع</span>
          </Link>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="w-full text-xs sm:text-sm text-red-300 hover:text-red-200 py-2 px-3 rounded-lg hover:bg-white/10 transition-all text-right flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-right-from-bracket text-xs sm:text-sm"></i>
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}