import { useState } from "react";
import { EmptyState } from "../DashboardHelpers";
import AssignWorkerDropdown from "../AssignWorkerDropdown";
import ProjectTimeline from "../ProjectTimeline";

const FILTER_TABS = [
  { key: "all", label: "الكل" },
  { key: "pending", label: "بانتظار التعيين" },
  { key: "active", label: "جارية" },
  { key: "completed", label: "منجزة" },
];

export default function ProjectsTab({
  projectsList = [],
  approvedWorkers = [],
  getBusyProject,
  onAdvance,
}) {
  const [filter, setFilter] = useState("all");

  // ==========================================================
  // بانتظار الفني
  // ==========================================================
  const isWaitingForWorker = (project) => {
    return (
      !project.assignedWorker || project.assignedWorker === "بانتظار التعيين"
    );
  };

  // ==========================================================
  // مكتمل
  // ==========================================================
  const isCompleted = (project) => {
    return Number(project.statusStep) >= 5 || project.status === "منجزة";
  };

  // ==========================================================
  // جاري
  // ==========================================================
  const isActive = (project) => {
    const step = Number(project.statusStep) || 0;
    return !isWaitingForWorker(project) && step >= 1 && step < 5;
  };

  // ==========================================================
  // الإحصائيات
  // ==========================================================
  const counts = {
    all: projectsList.length,
    pending: projectsList.filter(isWaitingForWorker).length,
    active: projectsList.filter(isActive).length,
    completed: projectsList.filter(isCompleted).length,
  };

  // ==========================================================
  // الفلترة
  // ==========================================================
  const filtered = projectsList.filter((project) => {
    if (filter === "pending") return isWaitingForWorker(project);
    if (filter === "active") return isActive(project);
    if (filter === "completed") return isCompleted(project);
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-5 font-[var(--font-tajawal)]" dir="rtl">
      {/* العنونة العليا */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-dark)] flex items-center gap-2">
            <i className="fa-solid fa-list-check text-[var(--primary)] text-base sm:text-lg"></i>
            إدارة المشاريع
          </h2>

          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5 sm:mt-1">
            متابعة جميع طلبات الزبائن وحالة التنفيذ
          </p>
        </div>

        <span className="text-[11px] sm:text-xs font-bold bg-[var(--primary-soft)] text-[var(--primary)] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[var(--primary-border)]">
          {projectsList.length} مشروع
        </span>
      </div>

      {/* أزرار الفلترة */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {FILTER_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === key
                ? "bg-[var(--primary)] text-white shadow-xs"
                : "bg-white text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--primary)]/40"
            }`}
          >
            <span>{label}</span>

            {counts[key] > 0 && (
              <span
                className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  filter === key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* قائمة الكروت */}
      {filtered.length === 0 ? (
        <EmptyState msg="لا توجد مشاريع" icon="fa-solid fa-list-check" />
      ) : (
        <div className="space-y-3.5 sm:space-y-4">
          {filtered.map((project) => {
            const needsAssignment = isWaitingForWorker(project);
            const done = isCompleted(project);

            return (
              <div
                key={project.id}
                className={`bg-white rounded-2xl border shadow-xs overflow-visible transition-all ${
                  done
                    ? "border-emerald-200"
                    : needsAssignment
                      ? "border-amber-200"
                      : "border-[var(--border-color)]"
                }`}
              >
                <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4">
                  <div className="flex justify-between items-start gap-3 flex-wrap sm:flex-nowrap">
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[var(--text-dark)] text-xs sm:text-sm">
                          {project.title}
                        </h3>

                        {project.category && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary-border)]">
                            {project.category}
                          </span>
                        )}

                        {project.workerChoice === "self" && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <i className="fa-solid fa-user-check text-[9px]"></i>
                            اختيار الزبون
                          </span>
                        )}

                        {done && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <i className="fa-solid fa-circle-check text-[9px]"></i>
                            مكتمل
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 text-[11px] sm:text-xs text-[var(--text-muted)]">
                        <span className="inline-flex items-center gap-1">
                          <i className="fa-solid fa-user text-slate-400 text-[10px] sm:text-xs"></i>
                          <span>الزبون:</span>
                          <b className="text-[var(--text-dark)] font-semibold">
                            {project.clientName}
                          </b>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <i className="fa-solid fa-helmet-safety text-slate-400 text-[10px] sm:text-xs"></i>
                          <span>الفني:</span>
                          <b
                            className={`font-semibold ${
                              needsAssignment
                                ? "text-amber-600"
                                : "text-[var(--primary)]"
                            }`}
                          >
                            {needsAssignment
                              ? "بانتظار التعيين"
                              : project.assignedWorker}
                          </b>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <i className="fa-solid fa-sack-dollar text-slate-400 text-[10px] sm:text-xs"></i>
                          <b className="font-semibold text-slate-700">{project.budget}$</b>
                        </span>
                      </div>
                    </div>

                    {needsAssignment && (
                      <div className="relative z-50 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                        <AssignWorkerDropdown
                          project={project}
                          approvedWorkers={approvedWorkers}
                          getBusyProject={getBusyProject}
                        />
                      </div>
                    )}
                  </div>

                  {needsAssignment &&
                    approvedWorkers.filter(
                      (worker) => worker.category === project.category,
                    ).length === 0 && (
                      <div className="text-[10px] sm:text-[11px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-2 flex items-center gap-1.5">
                        <i className="fa-solid fa-triangle-exclamation shrink-0 text-amber-600 text-xs"></i>
                        <span>
                          لا يوجد فنيون معتمدون بتخصص <b>{project.category}</b>— يمكن تعيين فني بتخصص آخر.
                        </span>
                      </div>
                    )}

                  <ProjectTimeline
                    project={project}
                    onAdvance={!needsAssignment && !done ? onAdvance : null}
                    disabled={needsAssignment}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}