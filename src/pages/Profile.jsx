import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../Context/AppContext';
import Button from '../components/Button';

const STATUS_LABELS = {
  1: { label: 'بانتظار التعيين', color: '#f59e0b' },
  2: { label: 'بدء التنفيذ',     color: '#263174' },
  3: { label: 'قيد التنفيذ',      color: '#263174' },
  4: { label: 'مكتمل',           color: '#22c55e' },
};

export default function Profile() {
  const { 
    user, 
    projectsList = [], 
    reviewsList = {}, 
    warningsList = [], 
    updateProfile, 
    onAdvanceProject 
  } = useApp();

  const [phone, setPhone]     = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.detailedAddress || '');
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  if (!user) {
    return (
      <div className="max-w-[560px] my-8 sm:my-12 mx-auto px-4">
        <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_4px_12px_rgba(8,13,40,0.05)] p-6 sm:p-8 flex flex-col gap-4 text-center items-center">
          <p className="text-[#6a89ba] text-sm">يجب تسجيل الدخول لعرض ملفك الشخصي.</p>
          <Link to="/login"><Button>تسجيل الدخول</Button></Link>
        </div>
      </div>
    );
  }

  const isWorker = user.role === 'worker';
  const isClient = user.role === 'client';

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile({ phone, detailedAddress: address });
      setSaved(true);
    } catch (err) {
      alert(err.message || 'تعذر حفظ التعديلات');
    } finally {
      setSaving(false);
    }
  };

  const myRequests = isClient ? projectsList.filter((p) => (p.clientId ? p.clientId === user.id : p.clientName === user.name)) : [];
  const myJobs      = isWorker ? projectsList.filter((p) => (p.workerId ? p.workerId === user.id : p.assignedWorker === user.name)) : [];
  const myReviews   = isWorker ? (reviewsList[user.id] || []) : [];
  const myWarnings  = isWorker ? warningsList.filter((w) => (w.workerId ? w.workerId === user.id : w.workerName === user.name)) : [];

  return (
    <div className="max-w-[560px] my-6 sm:my-12 mx-auto px-4 space-y-5" dir="rtl">
      <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_4px_12px_rgba(8,13,40,0.05)] p-5 sm:p-7 flex flex-col gap-6">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full bg-[#263174] text-white font-extrabold text-xl sm:text-[22px] flex items-center justify-center shrink-0">
            {user.name ? user.name.charAt(0) : 'م'}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold text-base sm:text-[17px] text-[#080d28] truncate">
              {user.name || 'مستخدم مسجل'}
            </h2>
            <p className="text-[#6a89ba] text-xs mt-0.5 truncate">{user.email || 'user@domain.com'}</p>
            <span className="inline-block mt-1.5 text-[10px] font-bold bg-[#263174]/[0.08] text-[#263174] px-2.5 py-0.5 rounded-full">
              {user.role === 'admin' ? 'مدير المنصة' : isWorker ? 'فني معتمد' : 'عميل / زبون'}
            </span>
          </div>
        </div>

        {(isWorker || isClient) && (
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#6a89ba] mb-1.5">رقم الهاتف</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0599123456"
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-[#263174] focus:ring-2 focus:ring-[#263174]/10 transition-all text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#6a89ba] mb-1.5">تفاصيل العنوان</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="الحي / الشارع / أقرب معلم"
                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:border-[#263174] focus:ring-2 focus:ring-[#263174]/10 transition-all text-slate-800"
              />
            </div>
          </div>
        )}

        <Button className="w-full cursor-pointer" onClick={handleSave} disabled={saving}>
          {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ التعديلات'}
        </Button>
      </div>

      {isClient && (
        <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_4px_12px_rgba(8,13,40,0.05)] p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#080d28] mb-3.5">
            <i className="fa-solid fa-clock-rotate-left text-[#263174]"></i> طلباتي ({myRequests.length})
          </h3>
          {myRequests.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-5">لم تطلب لحد الآن من المنصة</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {myRequests.map((p) => {
                const st = STATUS_LABELS[p.statusStep] || STATUS_LABELS[1];
                return (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:px-3.5 rounded-xl bg-[#f1f2f2] border border-slate-200">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#080d28] leading-snug">{p.title}</p>
                      <p className="text-[11px] text-[#6a89ba] mt-0.5 leading-relaxed">
                        الفني: <b className="font-bold text-[#080d28]">{p.assignedWorker || 'لم يحدد بعد'}</b> · {p.category} · {p.createdAt}
                      </p>
                    </div>
                    <span
                      className="self-start sm:self-auto text-[10px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={{ color: st.color, background: st.color + '18' }}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {isWorker && (
        <>
          <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_4px_12px_rgba(8,13,40,0.05)] p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#080d28] mb-3.5">
              <i className="fa-solid fa-screwdriver-wrench text-[#263174]"></i> شغلاتي ({myJobs.length})
            </h3>
            {myJobs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-5">لسا ما اشتغلت عند أي زبون عبر المنصة.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {myJobs.map((p) => {
                  const st = STATUS_LABELS[p.statusStep] || STATUS_LABELS[1];
                  return (
                    <div key={p.id} className="flex flex-col gap-3 p-3.5 rounded-xl bg-[#f1f2f2] border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#080d28] leading-snug">{p.title}</p>
                          <p className="text-[11px] text-[#6a89ba] mt-0.5 leading-relaxed">
                            الزبون: <b className="font-bold text-[#080d28]">{p.clientName}</b> · {p.category} · {p.createdAt}
                          </p>
                        </div>
                        <span
                          className="self-start sm:self-auto text-[10px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap"
                          style={{ color: st.color, background: st.color + '18' }}
                        >
                          {st.label}
                        </span>
                      </div>

                      {p.statusStep < 4 && onAdvanceProject && (
                        <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onAdvanceProject(p.id)}
                            className="bg-[#263174] hover:bg-[#1e265c] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="fa-solid fa-circle-check text-xs"></i>
                            {p.statusStep === 2 ? 'تعديل الحالة إلى: قيد التنفيذ' : 'تأكيد إكمال العمل'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_4px_12px_rgba(8,13,40,0.05)] p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#080d28] mb-3.5">
              <i className="fa-solid fa-star text-[#263174]"></i> تقييمات الزبائن عليّ ({myReviews.length})
            </h3>
            {myReviews.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-5">ما في تقييمات عليك لهلق.</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {myReviews.map((r) => (
                  <div key={r.id} className="p-3 sm:px-3.5 rounded-xl bg-[#f1f2f2] border border-slate-200">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#080d28]">
                      <b className="font-bold">{r.clientName}</b>
                      <span className="text-[#ffb53e] text-[10px] flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i key={i} className={`fa-star ${i < r.stars ? 'fa-solid' : 'fa-regular'}`}></i>
                        ))}
                      </span>
                      <span className="text-[11px] text-[#6a89ba] mr-auto sm:mr-0">{r.date}</span>
                    </div>
                    {r.comment && <p className="text-xs text-[#6a89ba] mt-1.5 leading-relaxed">{r.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_4px_12px_rgba(8,13,40,0.05)] p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#080d28] mb-3.5">
              <i className="fa-solid fa-triangle-exclamation text-red-500"></i> ملاحظات المنصة ({myWarnings.length})
            </h3>
            {myWarnings.length === 0 ? (
              <p className="text-xs text-green-700 flex items-center justify-center gap-1.5 py-5 font-medium">
                <i className="fa-solid fa-circle-check"></i> سجلّك نظيف، ما في أي ملاحظات عليك.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {myWarnings.map((w) => (
                  <div key={w.id} className="p-3 sm:px-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                    <p className="leading-relaxed">{w.message}</p>
                    <span className="block text-[11px] text-red-500 opacity-70 mt-1">{w.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}