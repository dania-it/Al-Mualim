import { useState } from "react";
import { z } from "zod";
import FormField from "./FormField";

const PLATFORM_EMAIL = "info@khadamati.com";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "الاسم مطلوب.")
    .min(3, "الاسم قصير جداً.")
    .regex(/^[\u0600-\u06FF\s]+$/, "الاسم يجب أن يُكتب باللغة العربية فقط."),

  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب.")
    .refine((val) => !/[\u0600-\u06FF]/.test(val), {
      message: "البريد يجب أن يُكتب بالإنكليزية.",
    })
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "صيغة البريد غير صحيحة.",
    }),

  message: z
    .string()
    .trim()
    .min(1, "الرسالة مطلوبة.")
    .min(10, "الرسالة قصيرة جداً."),
});

const FIELD_HINTS = {
  name: "يرجى كتابة اسمك الثلاثي باللغة العربية فقط بدون أرقام أو رمـوز.",
  email: "يرجى إدخال عنوان بريد إلكتروني صحيح ومكتوب باللغة الإنكليزية مثل: name@example.com",
  message: "يرجى شرح طلبك أو استفسارك بالتفصيل في 10 أحرف على الأقل.",
};

const EMPTY_FORM = { name: "", email: "", message: "" };
const EMPTY_ERRORS = { name: "", email: "", message: "" };

function getFieldError(field, value) {
  const shape = contactSchema.shape[field];
  if (!shape) return "";
  const result = shape.safeParse(value);
  if (result.success) return "";
  return result.error.issues[0]?.message || "";
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: getFieldError(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const newErrors = { ...EMPTY_ERRORS };
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field && !newErrors[field]) newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    const subject = encodeURIComponent(`رسالة تواصل جديدة من: ${form.name}`);
    const bodyContent = `اسم المرسل: ${form.name}\nالبريد الإلكتروني: ${form.email}\n\nنص الرسالة:\n${form.message}`;
    const body = encodeURIComponent(bodyContent);

    window.location.href = `mailto:${PLATFORM_EMAIL}?subject=${subject}&body=${body}`;

    setAwaitingConfirmation(true);
  };

  const handleConfirmSent = () => {
    setAwaitingConfirmation(false);
    setSent(true);
  };

  const handleCancelSent = () => {
    setAwaitingConfirmation(false);
  };

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setAwaitingConfirmation(false);
  };

  if (sent) {
    return (
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 md:p-12 min-h-[500px] flex flex-col items-center justify-center text-center gap-5 shadow-md" dir="rtl">
        <div className="w-20 h-20 rounded-full bg-[var(--accent-gold)]/20 border-2 border-[var(--accent-gold)] text-[var(--primary)] flex items-center justify-center text-4xl shadow-inner">
          <i className="fa-solid fa-circle-check"></i>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[var(--primary)]">
          تم إرسال رسالتك بنجاح
        </h2>

        <p className="text-base md:text-lg font-medium text-[var(--text-muted)] max-w-md">
          شكراً لتواصلك معنا، تم استلام رسالتك عبر البريد الإلكتروني للمنصة وسنتواصل معك في أسرع وقت.
        </p>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            handleClear();
          }}
          className="mt-4 inline-flex items-center gap-2 text-base font-black text-[#263174] bg-[#263174]/10 hover:bg-[#263174] hover:text-white px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <i className="fa-solid fa-paper-plane"></i>
          <span>إرسال رسالة جديدة</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-7 md:p-10 shadow-sm flex flex-col gap-6"
      dir="rtl"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-[#263174] mb-2">
          أرسل لنا رسالة
        </h2>
        <p className="text-base md:text-lg font-medium text-[var(--text-muted)]">
          املأ النموذج التالي وسنتواصل معك.
        </p>
      </div>
      {awaitingConfirmation && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-amber-800 font-bold text-base">
            <i className="fa-solid fa-envelope-circle-check text-xl text-amber-600"></i>
            <span>هل قمت بإرسال الرسالة عبر تطبيق البريد؟</span>
          </div>

          <p className="text-xs md:text-sm text-amber-900 font-medium leading-relaxed">
            تم فتح تطبيق البريد الإلكتروني الخاص بك ببيانات الرسالة. يرجى الضغط على زر "إرسال" داخل تطبيق البريد، ثم تأكيد العملية هنا.
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            <button
              type="button"
              onClick={handleConfirmSent}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
            >
              نعم، تم الإرسال
            </button>

            <button
              type="button"
              onClick={handleCancelSent}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
            >
              تراجع / لم أرسل بعد
            </button>
          </div>
        </div>
      )}

      <FormField
        label="الاسم الكامل"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        hint={FIELD_HINTS.name}
        placeholder="مثال: أحمد محمد السالم"
        dir="rtl"
      />

      <FormField
        label="البريد الإلكتروني"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        hint={FIELD_HINTS.email}
        placeholder="example@email.com"
        dir="ltr"
      />

      <FormField
        label="رسالتك"
        name="message"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        hint={FIELD_HINTS.message}
        placeholder="اكتب رسالتك هنا..."
        textarea
        rows={6}
      />

      <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
        <button
          type="button"
          onClick={handleClear}
          className="w-full sm:w-auto sm:min-w-[170px] h-[54px] flex items-center justify-center gap-2.5 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-700 font-black text-base cursor-pointer hover:bg-slate-200 hover:border-slate-300 hover:text-slate-900 active:scale-[0.98] transition-all duration-200"
        >
          <i className="fa-solid fa-rotate-left text-lg"></i>
          <span>مسح الحقول</span>
        </button>

        <button
          type="submit"
          className="w-full sm:flex-1 h-[54px] flex items-center justify-center gap-2.5 rounded-xl bg-[var(--primary)] text-[var(--card-bg)] font-black text-base cursor-pointer shadow-md hover:bg-[var(--primary)] hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-200"
        >
          <i className="fa-solid fa-paper-plane text-lg"></i>
          <span>إرسال الرسالة</span>
        </button>
      </div>
    </form>
  );
}