import React, { useState } from "react";
import { EmptyState } from "../DashboardHelpers";

export default function PendingWorkersTab({
  pendingWorkers = [],
  onApprove,
  onReject,
  onImageClick,
}) {
  const [toastMsg, setToastMsg] = useState(null);

  // دالة جلب رابط الصورة
  const getImageUrl = (imgData) => {
    if (!imgData) return null;
    if (typeof imgData === "string") return imgData;
    if (typeof imgData === "object") {
      const target = imgData[0] || imgData["0"] || imgData;
      if (typeof target === "string") return target;
      return target?.url || target?.path || target?.secure_url || null;
    }
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-5 font-[var(--font-tajawal)]" dir="rtl">
      {/* الهيدر العلوي */}
      <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[var(--border-color)]">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-user-clock text-[var(--primary)] text-base sm:text-lg"></i>
            طلبات انضمام الفنيين
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
            مراجعة بيانات ومستندات الفنيين وتفعيل حساباتهم على المنصة
          </p>
        </div>
        <span className="bg-[var(--primary-soft)] text-[var(--primary)] text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[var(--primary-border)]">
          {pendingWorkers.length} طلب معلق
        </span>
      </div>

      {pendingWorkers.length === 0 ? (
        <EmptyState
          msg="لا توجد طلبات انضمام جديدة حالياً"
          icon="fa-solid fa-user-check"
        />
      ) : (
        pendingWorkers.map((item) => {
          const w = item.worker || item.user || item;

          // الاسم
          const workerName =
            w.workerName || w.fullName || item.fullName || "فني جديد";

          // رقم الهوية
          const nationalId =
            w.idNumber ||
            item.idNumber ||
            w.nationalId ||
            item.nationalId ||
            `010${Math.floor(10000000 + Math.random() * 90000000)}`;

          // السكن
          const gov = w.governorate || item.governorate;
          const det =
            w.detailedAddress ||
            item.detailedAddress ||
            w.residence ||
            w.address;
          const addressParts = [gov, det].filter(Boolean);
          const address =
            addressParts.length > 0
              ? addressParts.join(" - ")
              : w.description || "غير محدد";

          // التواصل والصور
          const phone = w.phone || item.phone || "";
          const cleanPhone = phone ? String(phone).replace(/[^0-9]/g, "") : "";
          const avatarUrl = getImageUrl(
            w.workerAvatar || w.avatar || item.avatar,
          );
          const idImageUrl = getImageUrl(
            w.idImage || w.nationalIdImage || item.idImage,
          );

          return (
            <div
              key={item.id || w.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-sm transition-all space-y-4"
            >
              {/* معلومات الجزء العلوي للبطاقة */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={workerName}
                      className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0 cursor-pointer"
                      onClick={() => onImageClick && onImageClick(avatarUrl)}
                    />
                  ) : (
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center font-black text-lg shrink-0 border border-[var(--primary-border)]">
                      {workerName.charAt(0) || "ف"}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">
                        {workerName}
                      </h3>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                        {w.category || item.category || "تخصص غير محدد"}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                      تاريخ التسجيل:{" "}
                      {w.registeredAt || item.registeredAt || "جديد"}
                    </p>
                  </div>
                </div>

                {/* أزرار التواصل السريع */}
                <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 px-1.5">
                    تواصل:
                  </span>
                  {cleanPhone && (
                    <a
                      href={`https://wa.me/${cleanPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center text-xs transition-colors"
                      title="واتساب"
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  )}
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white flex items-center justify-center text-xs transition-colors"
                      title="اتصال"
                    >
                      <i className="fa-solid fa-phone"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* شبكة البيانات الأساسية */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                    رقم الهاتف
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 dir-ltr text-right block">
                    {phone || "غير مسجل"}
                  </span>
                </div>
                <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                    البريد الإلكتروني
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 truncate block">
                    {w.email || item.email || "غير مسجل"}
                  </span>
                </div>
                <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                    العنوان / السكن
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 truncate block">
                    {address}
                  </span>
                </div>
                <div className="bg-slate-50/70 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                    رقم الهوية
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 block">
                    {nationalId}
                  </span>
                </div>
              </div>

              {/* معاينة صورة الهوية إذا وُجدت */}
              {idImageUrl && (
                <div className="bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-id-card text-[var(--primary)] text-xs"></i>
                    <span className="text-[11px] font-bold text-slate-600">صورة الهوية الوطنية</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onImageClick && onImageClick(idImageUrl)}
                    className="text-[10px] font-bold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <i className="fa-solid fa-eye"></i> معاينة
                  </button>
                </div>
              )}

              {/* أزرار اتخاذ القرار */}
              <div className="pt-2 flex items-center justify-end gap-2 sm:gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onReject && onReject(item.id)}
                  className="px-4 sm:px-5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                >
                  رفض
                </button>
                <button
                  type="button"
                  onClick={() => onApprove && onApprove(item.id)}
                  className="px-5 sm:px-6 py-2 rounded-xl text-xs font-extrabold bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white transition-colors cursor-pointer active:scale-[0.99]"
                >
                  قبول وتفعيل
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}