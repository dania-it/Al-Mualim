
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../Context/AppContext';

const LINKS = [
  { to: '/', label: 'الرئيسية' },
  { to: '/jobs', label: 'الخدمات' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useApp(); 

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `relative py-1 text-base font-bold transition-all duration-200 ${
      isActive
        ? 'text-[var(--primary)] after:absolute after:-bottom-1 after:right-0 after:w-full after:h-[3px] after:bg-accent-gold after:rounded-full font-black'
        : 'text-secondary hover:text-primary'
    }`;

  return (
    <nav className="bg-card-bg border-b border-border-color sticky top-0 z-50 font-tajawal shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-6 sm:gap-12">
        
        <Link
          to="/"
          className="flex items-center shrink-0 relative z-10"
        >
          <img 
            src="/img/logo.png" 
            alt="المعلم - Al-Mualim" 
            className="h-20 sm:h-24 md:h-28 w-auto object-contain -my-6 md:-my-8" 
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          {!user && (
            <>
              <Link
                to="/join-as-worker"
                className="inline-flex items-center gap-2 text-sm font-bold bg-card-bg text-primary border-2 border-primary px-4.5 py-2.5 rounded-xl hover:bg-[var(--primary-soft)] transition-all shadow-sm"
              >
                <i className="fa-solid fa-helmet-safety text-primary text-base"></i>
                <span>انضم إلينا</span>
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center text-sm font-bold bg-primary text-white px-5.5 py-2.5 rounded-xl hover:bg-primary-hover transition-all shadow-sm"
              >
                <span>تسجيل الدخول</span>
              </Link>
            </>
          )}

          {user && (
            <>
              {user.role === 'admin' ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 text-sm font-bold bg-primary text-white px-4.5 py-2.5 rounded-xl hover:bg-primary-hover transition-all shadow-sm"
                >
                  <i className="fa-solid fa-gauge-high"></i>
                  <span>لوحة التحكم</span>
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="inline-flex items-center text-sm font-bold bg-primary text-white px-4.5 py-2.5 rounded-xl hover:bg-primary-hover transition-all"
                >
                  الملف الشخصي
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-sm font-bold bg-bg-main text-primary px-4.5 py-2.5 rounded-xl hover:bg-border-color transition-all cursor-pointer"
              >
                <i className="fa-solid fa-right-from-bracket text-primary"></i>
                <span>تسجيل الخروج</span>
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="القائمة الرئيسية"
          className="md:hidden w-11 h-11 rounded-xl bg-bg-main flex items-center justify-center text-primary text-xl shrink-0 active:scale-95 transition-all"
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border-color bg-card-bg ${
          menuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-6 flex flex-col gap-2 text-base font-bold text-secondary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 px-4 rounded-xl transition-all ${
                  isActive
                    ? 'text-primary bg-[var(--primary-soft)] font-black'
                    : 'text-secondary hover:bg-bg-main hover:text-text-dark'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border-color">
            {!user && (
              <>
                <Link
                  to="/join-as-worker"
                  onClick={() => setMenuOpen(false)}
                  className="w-full justify-center inline-flex items-center gap-2 text-sm font-bold bg-card-bg text-primary border-2 border-primary py-3 rounded-xl"
                >
                  <i className="fa-solid fa-helmet-safety text-primary"></i>
                  <span>انضم إلينا</span>
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full justify-center inline-flex items-center text-sm font-bold bg-primary text-white py-3 rounded-xl"
                >
                  <span>تسجيل الدخول</span>
                </Link>
              </>
            )}

            {user && (
              <>
                {user.role === 'admin' ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="w-full justify-center inline-flex items-center gap-2 text-sm font-bold bg-primary text-white py-3 rounded-xl"
                  >
                    <i className="fa-solid fa-gauge-high"></i>
                    <span>لوحة التحكم</span>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="w-full justify-center inline-flex items-center text-sm font-bold bg-primary text-white py-3 rounded-xl"
                  >
                    الملف الشخصي
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full justify-center inline-flex items-center gap-2 text-sm font-bold bg-bg-main text-primary py-3 rounded-xl"
                >
                  <i className="fa-solid fa-right-from-bracket text-primary"></i>
                  <span>تسجيل الخروج</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}