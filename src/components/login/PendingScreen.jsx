import { Link } from "react-router-dom";

export default function PendingScreen({ onGoToLogin }) {
  return (
    <div
      dir="rtl"
      className="max-w-xl mx-auto my-12 p-8 bg-white border border-[var(--border-color)] rounded-[1.75rem] shadow-sm text-center flex flex-col items-center gap-4 animate-fade-in"
    >
      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-2xl">
        <i className="fa-regular fa-clock"></i>
      </div>

      <h2 className="text-xl font-extrabold text-[var(--text-dark)]">
        تم إرسال طلب الانضمام بنجاح!
      </h2>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
        طلبك قيد المراجعة من قبل الإدارة. بعد الموافقة يمكنك تسجيل الدخول عبر
        تبويب{" "}
        <span className="font-bold text-[#263174]">فني ← تسجيل الدخول</span>{" "}
        بنفس البريد وكلمة المرور.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
        <Link
          to="/"
          replace
          className="flex-1 py-3 px-4 rounded-xl font-bold bg-[#263174] text-white hover:bg-[#1b2353] transition-colors text-center no-underline text-sm flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-house"></i>
          <span>تصفح المنصة</span>
        </Link>

        <button
          type="button"
          onClick={onGoToLogin}
          className="flex-1 py-3 px-4 rounded-xl font-bold bg-slate-50 text-[var(--text-dark)] border border-[var(--border-color)] hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-right-to-bracket"></i>
          <span>الذهاب لصفحة الدخول</span>
        </button>
      </div>
    </div>
  );
}
