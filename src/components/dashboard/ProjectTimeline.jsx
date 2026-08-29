import React from "react";

const STEPS = [
  {
    label: "خرج من المركز",
    icon: "fa-building",
  },
  {
    label: "على الطريق",
    icon: "fa-road",
  },
  {
    label: "وصل إلى المنزل",
    icon: "fa-house",
  },
  {
    label: "بدأ العمل",
    icon: "fa-screwdriver-wrench",
  },
  {
    label: "تم الإنجاز",
    icon: "fa-circle-check",
  },
];

export default function ProjectTimeline({
  project,
  onAdvance,
  disabled = false,
}) {
  const rawStep = Number(project?.statusStep);

  const currentStep = Number.isFinite(rawStep) ? rawStep : 0;

  const isCompleted = currentStep >= 5 || project?.status === "منجزة";

  const hasWorker =
    project?.assignedWorker && project.assignedWorker !== "بانتظار التعيين";

  const start = project?.startedAt ? new Date(project.startedAt) : null;

  const estimatedDays = Number(project?.estimatedDays) || 1;

  const estEnd = start
    ? new Date(start.getTime() + estimatedDays * 86400000)
    : null;

  const daysLeft = estEnd
    ? Math.max(0, Math.ceil((estEnd.getTime() - Date.now()) / 86400000))
    : null;

  const getNextLabel = () => {
    if (currentStep === 1) {
      return "تأكيد الوصول للطريق";
    }

    if (currentStep === 2) {
      return "تأكيد الوصول للمنزل";
    }

    if (currentStep === 3) {
      return "تأكيد بدء العمل";
    }

    if (currentStep === 4) {
      return "تأكيد إنجاز العمل";
    }

    return "تم الإنجاز";
  };

  const handleStepClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!hasWorker || disabled || isCompleted || !onAdvance) {
      return;
    }

    try {
      await onAdvance(project.id);
    } catch (error) {
      console.error("تعذر تحديث المرحلة:", error?.message);
    }
  };

  return (
    <div className="space-y-4 text-right font-[var(--font-tajawal)]" dir="rtl">
      {!hasWorker && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-center gap-2">
          <i className="fa-solid fa-clock text-xs shrink-0"></i>
          <span>يجب تعيين الفني أولاً قبل بدء مراحل التنفيذ.</span>
        </div>
      )}

      {/* شريط المراحل التفاعلي */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
        <div className="flex items-start justify-between min-w-[320px] sm:min-w-full gap-1">
          {STEPS.map((item, index) => {
            const itemStep = index + 1;
            const stepDone = isCompleted || itemStep < currentStep;
            const stepActive = itemStep === currentStep && !isCompleted;

            return (
              <React.Fragment key={itemStep}>
                <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shrink-0 ${
                      stepDone
                        ? "bg-green-500 border-green-500 text-white"
                        : stepActive
                        ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-sm"
                        : "bg-white border-slate-300 text-slate-400"
                    }`}
                  >
                    {stepDone ? (
                      <i className="fa-solid fa-check text-[10px] sm:text-xs"></i>
                    ) : (
                      <i className={`fa-solid ${item.icon} text-[10px] sm:text-xs`}></i>
                    )}
                  </div>

                  <span
                    className={`text-[10px] sm:text-xs text-center leading-tight ${
                      stepActive
                        ? "text-[var(--primary)] font-bold"
                        : stepDone
                        ? "text-green-600 font-bold"
                        : "text-slate-400 font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mt-3.5 sm:mt-4 ${
                      itemStep < currentStep ? "bg-green-400" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* تفاصيل التاريخ والأزرار */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm pt-1">
        <div>
          {estEnd && (
            <span className="flex items-center gap-1.5 text-slate-600 text-xs sm:text-sm">
              <i className="fa-regular fa-calendar text-slate-400 text-xs sm:text-sm"></i>
              <span>التسليم:</span>
              <b className="text-slate-800">
                {estEnd.toLocaleDateString("ar-EG")}
              </b>
              {daysLeft !== null && (
                <span
                  className={`mr-1 font-bold text-xs ${
                    daysLeft === 0 ? "text-red-500" : "text-[var(--primary)]"
                  }`}
                >
                  ({daysLeft === 0 ? "اليوم" : `باقي ${daysLeft} أيام`})
                </span>
              )}
            </span>
          )}
        </div>

        <div>
          {hasWorker &&
            !disabled &&
            !isCompleted &&
            currentStep >= 1 &&
            currentStep < 5 && (
              <button
                type="button"
                onClick={handleStepClick}
                className="text-xs sm:text-sm bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary-border)] px-3 py-1.5 rounded-lg hover:bg-[var(--primary)] hover:text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-xs"></i>
                <span>{getNextLabel()}</span>
              </button>
            )}

          {isCompleted && (
            <span className="text-green-700 font-bold text-xs sm:text-sm bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-xs"></i>
              <span>تم إنجاز العمل بنجاح</span>
            </span>
          )}

          {!hasWorker && !isCompleted && (
            <span className="text-xs sm:text-sm text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-clock text-xs"></i>
              <span>بانتظار تعيين الفني</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}