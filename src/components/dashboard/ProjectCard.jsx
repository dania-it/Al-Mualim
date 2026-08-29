import React from "react";
import ProjectTimeline from "./ProjectTimeline";

export default function ProjectCard({ project, onAdvance }) {
  if (!project) {
    return null;
  }

  const hasWorker =
    project.assignedWorker &&
    project.assignedWorker !== "بانتظار التعيين";

  const currentStep = Number(project.statusStep) || 0;

  const isCompleted = currentStep >= 5 || project.status === "منجزة";

  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 text-right font-[var(--font-tajawal)] transition-all hover:shadow-md"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {project.category && (
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-md">
                {project.category}
              </span>
            )}

            <h4 className="font-bold text-sm sm:text-base text-[#080d28] truncate">
              {project.title}
            </h4>
          </div>

          <div className="text-xs sm:text-sm text-slate-500 font-medium space-y-1">
            <p className="flex items-center gap-1">
              <i className="fa-solid fa-user text-xs text-slate-400"></i>
              <span>الزبون:</span>
              <strong className="text-slate-700 font-bold">
                {project.clientName || "غير محدد"}
              </strong>
            </p>

            {project.clientPhone && (
              <p className="flex items-center gap-1 dir-ltr text-right justify-end sm:justify-start">
                <i className="fa-solid fa-phone text-xs text-slate-400"></i>
                <span>{project.clientPhone}</span>
              </p>
            )}
          </div>
        </div>

        <div className="text-left shrink-0 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
          <span className="text-xs sm:text-sm font-black text-slate-800">
            ${project.budget || 0}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="text-xs sm:text-sm">
            <span className="text-slate-500">الفني:</span>
            <span
              className={`mr-2 font-bold ${
                hasWorker ? "text-emerald-700" : "text-amber-600"
              }`}
            >
              {hasWorker ? project.assignedWorker : "بانتظار التعيين"}
            </span>
          </div>

          {project.workerChoice === "self" && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <i className="fa-solid fa-user-check text-xs"></i>
              <span>الفني اختاره الزبون</span>
            </span>
          )}
        </div>
      </div>

      {project.details && (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
          <p className="text-xs font-bold text-slate-500 mb-1">
            تفاصيل الطلب
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {project.details}
          </p>
        </div>
      )}

      <div className="pt-2 border-t border-slate-100">
        <ProjectTimeline
          project={project}
          onAdvance={onAdvance}
          disabled={!hasWorker}
        />
      </div>

      {isCompleted && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-2">
          <i className="fa-solid fa-circle-check text-xs sm:text-sm shrink-0"></i>
          <span>هذا المشروع مكتمل ويمكن للزبون تقييم الفني.</span>
        </div>
      )}
    </div>
  );
}