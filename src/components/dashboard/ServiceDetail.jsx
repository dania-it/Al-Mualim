import React, { useState } from 'react';

export default function ServiceDetailModal({ worker, onSubmitOrder }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [workerChoice, setWorkerChoice] = useState('self'); 
  const [orderDetails, setOrderDetails] = useState('');

  const handleConfirm = () => {
    onSubmitOrder({
      workerId: worker.id,
      workerName: worker.name,
      workerChoice: workerChoice, 
      details: orderDetails,
    });
    setShowOrderModal(false);
  };

  return (
    <div className="font-[var(--font-tajawal)]" dir="rtl">
      <button
        type="button"
        onClick={() => setShowOrderModal(true)}
        className="w-full py-2.5 sm:py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        <i className="fa-solid fa-check-circle text-xs sm:text-sm"></i>
        <span>تأكيد التعامل مع هذا الفني</span>
      </button>

      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-xl space-y-4 text-right">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 border-b border-slate-100 pb-2.5">
              آلية تعيين الفني للطلب
            </h3>

            <p className="text-xs sm:text-sm text-slate-600">
              حدد كيف ترغب في إدارة هذا الطلب:
            </p>

            <div className="space-y-2.5">
              <label
                onClick={() => setWorkerChoice('self')}
                className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                  workerChoice === 'self'
                    ? 'border-amber-500 bg-amber-50/60'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="ml-2">
                  <div className="font-bold text-xs sm:text-sm text-slate-800">
                    تعيين الفني الحالي مباشرة ({worker.name})
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    يتم إسناد العمل فوراً لهذا الفني دون تغيير.
                  </div>
                </div>
                <input
                  type="radio"
                  name="workerChoice"
                  checked={workerChoice === 'self'}
                  onChange={() => setWorkerChoice('self')}
                  className="accent-amber-500 shrink-0"
                />
              </label>

              <label
                onClick={() => setWorkerChoice('platform')}
                className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                  workerChoice === 'platform'
                    ? 'border-amber-500 bg-amber-50/60'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="ml-2">
                  <div className="font-bold text-xs sm:text-sm text-slate-800">
                    ترك التعيين للمنصة
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    تقوم إدارة المنصة بمراجعة الطلب واختيار الفني الأنسب.
                  </div>
                </div>
                <input
                  type="radio"
                  name="workerChoice"
                  checked={workerChoice === 'platform'}
                  onChange={() => setWorkerChoice('platform')}
                  className="accent-amber-500 shrink-0"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                تفاصيل الطلب (اختياري)
              </label>
              <textarea
                value={orderDetails}
                onChange={(e) => setOrderDetails(e.target.value)}
                placeholder="اكتب ملاحظاتك أو تفاصيل الخدمة المطلوب تنفيذها..."
                className="w-full p-2.5 border rounded-xl text-xs sm:text-sm border-slate-200 focus:outline-none focus:border-amber-500 resize-none h-20 placeholder:text-slate-400"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                إرسال الطلب
              </button>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}