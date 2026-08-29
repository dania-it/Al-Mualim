import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function OrderModal({ isOpen, onClose, onSubmit, job }) {
  const [workerChoice, setWorkerChoice] = useState("self");
  const [orderNote, setOrderNote] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (confirming) return;
    setConfirming(true);

    try {
      await onSubmit({ workerChoice, orderNote });
      onClose();
    } catch (err) {
      alert(err.message || "تعذر تسجيل الطلب، حاول مرة أخرى.");
    } finally {
      setConfirming(false);
    }
  };

  const modalContent = (
    <div
      className="
        fixed
        inset-0
        top-0
        left-0
        right-0
        bottom-0
        w-full
        h-full
        z-[9999999]
        bg-[#080d28]/80
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-3
        sm:p-6
      "
      style={{ zIndex: 9999999 }}
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[460px]
          max-h-[85vh]
          sm:max-h-[90vh]
          bg-white
          rounded-[28px]
          shadow-[0_25px_80px_rgba(0,0,0,0.6)]
          flex
          flex-col
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        <div
          className="
            shrink-0
            bg-gradient-to-br
            from-[#263174]
            via-[#34469a]
            to-[#5267c2]
            px-6
            py-5
            text-white
            rounded-t-[28px]
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <i className="fa-solid fa-[#ffb53e] fa-paper-plane text-white text-xl" />
              </div>

              <div>
                <h2 className="font-black text-lg sm:text-xl leading-tight">
                  تأكيد طلب الخدمة
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
                  حدد طريقة تعيين الفني والتفاصيل
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                w-10
                h-10
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                hover:bg-white/20
                transition
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          </div>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            px-6
            py-6
            space-y-5
            rounded-b-[28px]
          "
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-black text-[#080d28] mb-2.5">
              <i className="fa-solid fa-[#263174] fa-user-gear text-base" />
              آلية تعيين الفني
            </label>

            <div className="space-y-3">
              <div
                onClick={() => setWorkerChoice("self")}
                className={`
                  flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all
                  ${
                    workerChoice === "self"
                      ? "border-[#263174] bg-blue-50/50"
                      : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                  }
                `}
              >
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-[#080d28] flex items-center gap-2">
                    <i className="fa-solid fa-user-check text-[#263174]" />
                    تعيين هذا الفني مباشرة ({job?.workerName || job?.title})
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    توجيه الطلب مباشرة للفني الظاهر في الصفحة.
                  </p>
                </div>
                <input
                  type="radio"
                  name="workerChoice"
                  value="self"
                  checked={workerChoice === "self"}
                  onChange={() => setWorkerChoice("self")}
                  className="mt-1 accent-[#263174] w-4 h-4"
                />
              </div>

              <div
                onClick={() => setWorkerChoice("platform")}
                className={`
                  flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all
                  ${
                    workerChoice === "platform"
                      ? "border-[#263174] bg-blue-50/50"
                      : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                  }
                `}
              >
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-[#080d28] flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved text-[#263174]" />
                    اختيار بواسطة إدارة المنصة
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    تقوم المنصة بتوجيه الطلب للفني الأسرع استجابة.
                  </p>
                </div>
                <input
                  type="radio"
                  name="workerChoice"
                  value="platform"
                  checked={workerChoice === "platform"}
                  onChange={() => setWorkerChoice("platform")}
                  className="mt-1 accent-[#263174] w-4 h-4"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-black text-[#080d28] mb-2.5">
              <i className="fa-solid fa-pen-to-square text-[#263174] text-base" />
              ملاحظات أو تفاصيل الطلب (اختياري)
            </label>
            <textarea
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              data-gramm="false"
              placeholder="أدخل التفاصيل المكانية أو الوقت المناسب للتواصل معك..."
              className="
                w-full
                p-3.5
                border
                border-slate-200
                rounded-2xl
                text-xs
                sm:text-sm
                focus:outline-none
                focus:border-[#263174]
                focus:ring-2
                focus:ring-[#263174]/10
                resize-none
                h-20
                bg-slate-50/50
                font-medium
              "
            />
          </div>

          <div className="pt-2 flex gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                h-12
                rounded-xl
                bg-white
                border-2
                border-slate-200
                text-slate-700
                font-black
                text-sm
                hover:bg-slate-50
                transition
                flex
                items-center
                justify-center
              "
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={confirming}
              className="
                flex-1
                h-12
                rounded-xl
                bg-[#263174]
                text-white
                font-black
                text-sm
                hover:bg-[#1d2860]
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {confirming ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" /> جاري الإرسال...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check" /> تأكيد وإرسال
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
