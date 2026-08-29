import React from "react";

export default function ContactEngSection({
  showContact,
  handleContactClick,
  phone,
  handleConfirmEngagement,
  timeLeft,
  formatTime,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 text-center space-y-5">
      <h3 className="font-black text-[#080d28] text-base border-b border-slate-100 pb-3">
        طلب الخدمة والتواصل
      </h3>

      {!showContact ? (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 font-medium leading-5">
            اضغط على الزر أدناه لمعاينة رقم الفني المباشر وبدء الاتفاق.
          </p>
          <button
            onClick={handleContactClick}
            className="w-full py-3.5 bg-[#263174] hover:bg-[#1b2353] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-phone"></i> إظهار رقم التواصل
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold w-full justify-center">
              <i className="fa-solid fa-circle-check"></i> تم التحقق من حساب
              الفني
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="block text-[11px] text-slate-400 font-bold mb-1">
                رقم الفني المباشر
              </span>
              <a
                href={`tel:${phone}`}
                className="text-lg font-black text-[#263174] dir-ltr inline-block hover:underline"
              >
                {phone || "0599123456"}{" "}
                <i className="fa-solid fa-phone-flip text-sm mr-1"></i>
              </a>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <p className="text-[11px] text-slate-500 font-medium leading-4">
              عند الاتفاق مع الفني، اضغط الزر أدناه لتسجيل الطلب رسمياً وضمان
              حقوقك عبر المنصة.
            </p>

            {timeLeft > 0 ? (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 space-y-1">
                <p className="text-xs font-bold flex items-center justify-center gap-1.5">
                  <i className="fa-solid fa-clock fa-spin"></i> تم إرسال طلبك
                  بنجاح!
                </p>
                <p className="text-[11px] font-medium text-amber-700">
                  يمكنك تقديم طلب جديد بعد:{" "}
                  <span className="font-black dir-ltr inline-block">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>
            ) : (
              <button
                onClick={handleConfirmEngagement}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-[#080d28] font-black rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-circle-check"></i> تأكيد الطلب
                والتعامل مع الفني
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
