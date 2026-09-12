import React from "react";
import { getProjectStatusText } from "../DashboardHelpers";

export default function HomeTab({
  role,
  user,
  clientsList = [],
  projectsList = [],
  pendingWorkers = [],
  approvedWorkers = [],
  getBusyProject,
  setActiveTab,
}) {
  const totalClients = clientsList.length;

  const completedProjects = projectsList.filter(
    (project) => Number(project.statusStep) >= 5
  );

  const busyWorkers = approvedWorkers.filter(
    (worker) => getBusyProject && getBusyProject(worker.workerName)
  );

  const recentProjects = projectsList.slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8 font-[var(--font-tajawal)]" dir="rtl">
      <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800">
        مرحباً، {user?.name || (role === "admin" ? "مدير المنصة" : "المستخدم")}{" "}
        👋
      </h2>

      {role === "admin" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">زبائن مسجلين</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                {totalClients}
              </h3>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-[#263174] flex items-center justify-center text-lg sm:text-xl shrink-0">
              <i className="fa-solid fa-users"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">طلبات بانتظار الموافقة</p>
              <h3 className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
                {pendingWorkers.length}
              </h3>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg sm:text-xl shrink-0">
              <i className="fa-solid fa-clock"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">فنيون معتمدون</p>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                {approvedWorkers.length}
              </h3>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg sm:text-xl shrink-0">
              <i className="fa-solid fa-helmet-safety"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">فنيون مشغولون</p>
              <h3 className="text-xl sm:text-2xl font-black text-rose-600 mt-1">
                {busyWorkers.length}
              </h3>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg sm:text-xl shrink-0">
              <i className="fa-solid fa-lock"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500">مشاريع مكتملة</p>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                {completedProjects.length}
              </h3>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg sm:text-xl shrink-0">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>
      )}

    {role === "admin" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                أحدث المشاريع
              </h3>
              {setActiveTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab("المشاريع")}
                  className="text-xs font-bold text-[#263174] hover:underline"
                >
                  عرض الكل
                </button>
              )}
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full text-right text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="p-2.5 sm:p-3 whitespace-nowrap">المشروع</th>
                      <th className="p-2.5 sm:p-3 whitespace-nowrap">الزبون</th>
                      <th className="p-2.5 sm:p-3 whitespace-nowrap">الفني</th>
                      <th className="p-2.5 sm:p-3 whitespace-nowrap">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentProjects.length > 0 ? (
                      recentProjects.map((project) => (
                        <tr key={project.id}>
                          <td className="p-2.5 sm:p-3 font-semibold text-slate-800 whitespace-nowrap">
                            {project.title}
                          </td>
                          <td className="p-2.5 sm:p-3 text-slate-600 whitespace-nowrap">
                            {project.clientName || "غير محدد"}
                          </td>
                          <td className="p-2.5 sm:p-3 text-slate-600 whitespace-nowrap">
                            <span
                              className={
                                !project.assignedWorker ||
                                project.assignedWorker === "بانتظار التعيين"
                                  ? "text-amber-600 font-bold"
                                  : "text-slate-700"
                              }
                            >
                              {project.assignedWorker || "لم يُعيّن"}
                            </span>
                          </td>
                          <td className="p-2.5 sm:p-3 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                                Number(project.statusStep) >= 5
                                  ? "bg-emerald-50 text-emerald-700"
                                  : !project.assignedWorker ||
                                    project.assignedWorker === "بانتظار التعيين"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-blue-50 text-[#263174]"
                              }`}
                            >
                              {getProjectStatusText(project)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-6 text-slate-400 text-xs"
                        >
                          لا توجد مشاريع حالياً
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                طلبات انضمام جديدة
              </h3>
              {setActiveTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab("طلبات الفنيين")}
                  className="text-xs font-bold text-[#263174] hover:underline"
                >
                  مراجعة الكل
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {pendingWorkers.slice(0, 4).map((worker) => (
                <div
                  key={worker.id}
                  className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                      {worker.workerName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {worker.category}
                    </p>
                  </div>
                  {setActiveTab && (
                    <button
                      type="button"
                      onClick={() => setActiveTab("طلبات الفنيين")}
                      className="text-xs font-bold text-[#263174] hover:underline shrink-0 mr-2"
                    >
                      عرض
                    </button>
                  )}
                </div>
              ))}

              {pendingWorkers.length === 0 && (
                <p className="text-xs text-center text-slate-400 py-6">
                  لا توجد طلبات معلقة حالياً
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}