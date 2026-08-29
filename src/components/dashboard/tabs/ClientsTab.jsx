
import React, { useState } from "react";
import { EmptyState, Toast } from "../DashboardHelpers";

export default function ClientsTab({
  clientsList = [],
  projectsList = [],
  toggleBlockClient,
}) {
  const [toast, setToast] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const handleToggleBlock = async (event, client) => {
    event.preventDefault();
    event.stopPropagation();

    if (!client) return;

    const clientId = client.id ?? client._id;
    const clientName =
      client.fullName || client.name || "غير محدد";

    if (!clientId) return;

    const willUnblock = Boolean(client.isBlocked);
    setProcessingId(String(clientId));

    try {
      await toggleBlockClient(clientId);

      setToast({
        message: willUnblock
          ? `تم إلغاء حظر الزبون ${clientName}`
          : `تم حظر الزبون ${clientName}`,
        type: "success",
      });
    } catch (error) {
      setToast({
        message: error?.message || "حدث خطأ",
        type: "danger",
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div
      className="space-y-6 relative text-right"
      dir="rtl"
    >
    

      <div className="flex justify-between items-center pb-2">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-users text-[#263174]"></i>

            قائمة الزبائن
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            إدارة حسابات الزبائن وصلاحيات الوصول للمنصة
          </p>
        </div>

        <span className="bg-slate-100 text-slate-700 text-xs font-black px-3 py-1.5 rounded-xl">
          إجمالي الزبائن: {clientsList.length}
        </span>
      </div>

   

      {clientsList.length === 0 ? (
        <EmptyState
          msg="لا يوجد زبائن مسجلون حالياً"
          icon="fa-solid fa-user-slash"
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold">
                <tr>
                  <th className="p-4">الزبون</th>

                  <th className="p-4">
                    البريد الإلكتروني
                  </th>

                  <th className="p-4 text-center">
                    عدد الطلبات
                  </th>

                  <th className="p-4 text-center">
                    حالة الحساب
                  </th>

                  <th className="p-4 text-center">
                    الإجراءات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {clientsList.map((client) => {
                  const clientId =
                    client.id ?? client._id;

                  const isBlocked =
                    Boolean(client.isBlocked);

                  const clientName =
                    client.fullName ||
                    client.name ||
                    "زبون غير محدد";

                  const clientProjectsCount =
                    projectsList.filter(
                      (project) =>
                        project.clientEmail ===
                          client.email ||
                        project.clientName ===
                          clientName
                    ).length;

                  const isProcessing =
                    processingId ===
                    String(clientId);

                  return (
                    <tr
                      key={clientId}
                      className={`transition-colors ${
                        isBlocked
                          ? "bg-slate-50/80 grayscale-[20%]"
                          : "hover:bg-slate-50/50"
                      }`}
                    >

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isBlocked
                                ? "bg-slate-200 text-slate-500"
                                : "bg-[#263174]/10 text-[#263174]"
                            }`}
                          >
                            {clientName.charAt(0)}
                          </div>

                          <div>
                            <p
                              className={`font-extrabold text-xs ${
                                isBlocked
                                  ? "text-slate-500 line-through"
                                  : "text-slate-800"
                              }`}
                            >
                              {clientName}
                            </p>
                          </div>
                        </div>
                      </td>

                  

                      <td className="p-4 text-slate-400 font-mono text-xs dir-ltr text-right">
                        {client.email}
                      </td>

                     

                      <td className="p-4 text-center">
                        <span className="inline-block bg-slate-100 text-slate-800 font-black px-2.5 py-1 rounded-lg text-[11px]">
                          {clientProjectsCount} طلبات
                        </span>
                      </td>


                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black ${
                            isBlocked
                              ? "bg-rose-100 text-rose-700 border border-rose-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          }`}
                        >
                          {isBlocked
                            ? "حساب معطل"
                            : "نشط"}
                        </span>
                      </td>


                      <td className="p-4 text-center">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={(event) =>
                            handleToggleBlock(
                              event,
                              client
                            )
                          }
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-xs ${
                            isProcessing
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          } ${
                            isBlocked
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200"
                          }`}
                        >
                          <i
                            className={`fa-solid ${
                              isProcessing
                                ? "fa-spinner fa-spin"
                                : isBlocked
                                ? "fa-user-check"
                                : "fa-user-slash"
                            }`}
                          ></i>

                          {isProcessing
                            ? "جاري التحديث..."
                            : isBlocked
                            ? "إلغاء الحظر وتفعيل الحساب"
                            : "حظر التعامل وتعليق الحساب"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}


      <Toast
        message={toast?.message}
        type={toast?.type || "success"}
        duration={1800}
        onClose={() => setToast(null)}
      />
    </div>
  );
}