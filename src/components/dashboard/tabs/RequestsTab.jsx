import { useState } from "react";
import { useApp } from "../../../Context/AppContext";
import ProjectCard from "../ProjectCard";
import { Field, EmptyState } from "../DashboardHelpers";

const CATEGORIES = ["كهرباء", "طيان", "دهان", "صيانة", "نجارة", "بلاط"];

export function MyRequestsTab({ projectsList = [], user }) {
  const myProjects = projectsList.filter((project) => {
    if (!user) return false;
    if (project.clientEmail && user.email) {
      return project.clientEmail === user.email;
    }
    return project.clientName === user.name;
  });

  return (
    <div className="space-y-4 font-[var(--font-tajawal)]" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-bold text-slate-800 flex items-center">
          <i className="fa-solid fa-folder-open ml-2 text-[var(--primary)] text-xs sm:text-sm"></i>
          طلباتي
        </h2>
        <span className="text-[11px] sm:text-xs font-bold text-slate-400">
          {myProjects.length} طلب
        </span>
      </div>

      {myProjects.length === 0 ? (
        <EmptyState msg="لا توجد طلبات بعد" />
      ) : (
        myProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
}

export function NewRequestTab({ user, addProject, onSubmitted }) {
  const { jobsList = [], getBusyProject } = useApp();

  const [form, setForm] = useState({
    title: "",
    category: "كهرباء",
    details: "",
    budget: "",
    days: "2",
    workerChoice: "platform",
    selectedWorker: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const matchedWorkers = jobsList.filter((worker) => {
    const isApproved = worker.status === "approved" || worker.status === "busy";
    const sameCategory = worker.category === form.category;
    const isBusy = getBusyProject ? getBusyProject(worker.workerName) : false;

    return isApproved && sameCategory && !isBusy;
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (category) => {
    setForm((prev) => ({ ...prev, category, selectedWorker: "" }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return alert("يجب تسجيل الدخول أولاً.");
    if (!form.title.trim()) return alert("يرجى كتابة عنوان الطلب.");
    if (!form.details.trim()) return alert("يرجى كتابة تفاصيل الطلب.");
    if (!form.budget || Number(form.budget) <= 0)
      return alert("يرجى إدخال ميزانية صحيحة.");
    if (form.workerChoice === "self" && !form.selectedWorker)
      return alert("يجب اختيار فني قبل إرسال الطلب.");

    const selectedWorker = matchedWorkers.find(
      (w) => w.workerName === form.selectedWorker,
    );
    setSubmitting(true);

    try {
      const projectData = {
        clientName: user.name || user.fullName || "",
        clientEmail: user.email || "",
        clientPhone: user.phone || "",
        title: form.title.trim(),
        category: form.category,
        details: form.details.trim(),
        budget: Number(form.budget),
        estimatedDays: Number(form.days) || 1,
        workerChoice: form.workerChoice,
        statusStep: form.workerChoice === "self" ? 1 : 0,
        assignedWorker: selectedWorker
          ? selectedWorker.workerName
          : "بانتظار التعيين",
      };

      await addProject(projectData);
      setForm({
        title: "",
        category: "كهرباء",
        details: "",
        budget: "",
        days: "2",
        workerChoice: "platform",
        selectedWorker: "",
      });
      if (onSubmitted) onSubmitted();
    } catch (error) {
      alert(error?.message || "تعذر إرسال الطلب.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 font-[var(--font-tajawal)]" dir="rtl">
      <div>
        <h2 className="text-lg sm:text-xl font-black text-slate-800">طلب خدمة جديدة</h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
          أرسل تفاصيل الخدمة وسيتم التعامل مع الطلب حسب آلية التعيين التي
          تختارها.
        </p>
      </div>

      <form
        onSubmit={handleAddProject}
        className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5"
      >
        <Field label="عنوان الطلب">
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="مثال: إصلاح عطل كهربائي"
            className="w-full border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[var(--primary)] transition-colors"
          />
        </Field>

        <Field label="التخصص">
          <select
            value={form.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Field>

        <Field label="تفاصيل الطلب">
          <textarea
            value={form.details}
            onChange={(e) => updateField("details", e.target.value)}
            placeholder="اشرح المشكلة أو الخدمة المطلوبة بالتفصيل..."
            rows={4}
            className="w-full border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[var(--primary)] transition-colors resize-none"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="الميزانية بالدولار">
            <input
              type="number"
              min="1"
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              placeholder="0"
              className="w-full border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[var(--primary)] transition-colors"
            />
          </Field>

          <Field label="المدة المتوقعة بالأيام">
            <input
              type="number"
              min="1"
              value={form.days}
              onChange={(e) => updateField("days", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[var(--primary)] transition-colors"
            />
          </Field>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2.5">
            من سيختار الفني؟
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateField("workerChoice", "platform")}
              className={`text-right p-3.5 sm:p-4 rounded-xl border-2 transition cursor-pointer ${
                form.workerChoice === "platform"
                  ? "border-[var(--primary)] bg-[var(--primary-soft)]"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-building text-[var(--primary)] text-xs sm:text-sm"></i>
                <span className="font-bold text-xs sm:text-sm">المنصة تختار الفني</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                سيتم إرسال الطلب بانتظار تعيين فني من إدارة المنصة.
              </p>
            </button>

            <button
              type="button"
              onClick={() => updateField("workerChoice", "self")}
              className={`text-right p-3.5 sm:p-4 rounded-xl border-2 transition cursor-pointer ${
                form.workerChoice === "self"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-user-check text-emerald-600 text-xs sm:text-sm"></i>
                <span className="font-bold text-xs sm:text-sm">أنا أختار الفني</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                اختر فني متاح من نفس التخصص ليبدأ الطلب معه.
              </p>
            </button>
          </div>
        </div>

        {form.workerChoice === "self" && (
          <Field label="اختر الفني">
            {matchedWorkers.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 sm:p-4 text-xs text-amber-800 font-bold flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation text-amber-600 shrink-0"></i>
                لا يوجد حالياً فني متاح بهذا التخصص.
              </div>
            ) : (
              <select
                value={form.selectedWorker}
                onChange={(e) => updateField("selectedWorker", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
              >
                <option value="">اختر الفني...</option>
                {matchedWorkers.map((w) => (
                  <option key={w.id} value={w.workerName}>
                    {w.workerName}
                  </option>
                ))}
              </select>
            )}
          </Field>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 sm:py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
        >
          {submitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin ml-2"></i>جارٍ إرسال
              الطلب...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane ml-2"></i>إرسال الطلب
            </>
          )}
        </button>
      </form>
    </div>
  );
}