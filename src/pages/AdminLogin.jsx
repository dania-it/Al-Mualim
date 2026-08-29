import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useApp } from "../Context/AppContext";
import FormField from "../components/login/FormField";


const HAS_ARABIC_REGEX = /[\u0600-\u06FF]/;

const adminEmailSchema = z.string().superRefine((val, ctx) => {
  if (!val || val.trim() === "") return;

  if (HAS_ARABIC_REGEX.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "الرجاء الكتابة باللغة الإنكليزية",
    });
    return;
  }

  if (!z.string().email().safeParse(val).success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "يرجى إدخال بريد إلكتروني صحيح (example@domain.com)",
    });
  }
}).refine((val) => val && val.trim().length > 0, {
  message: "البريد الإلكتروني مطلوب",
});

const adminPasswordSchema = z.string().superRefine((val, ctx) => {
  if (!val || val.trim() === "") return;

  if (val.length < 6) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    });
  }
}).refine((val) => val && val.trim().length > 0, {
  message: "كلمة المرور مطلوبة",
});

const adminSchema = z.object({
  email: adminEmailSchema,
  password: adminPasswordSchema,
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdminFn } = useApp();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setError("");

    const result = await loginAdminFn(data.email, data.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.reason);
    }
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center px-4 py-12 bg-slate-50"
    >
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_25px_70px_rgba(15,23,42,0.12)] p-7 sm:p-9 animate-[fadeInUp_0.5s_ease-out]">
        
        <div className="text-center mb-7">
          <div className="w-16 h-16 rounded-2xl bg-[#080d28] text-[#ffb53e] flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
            <i className="fa-solid fa-crown" />
          </div>
          <h1 className="text-2xl font-black text-[#080d28]">لوحة الإدارة</h1>
          <p className="text-sm text-slate-400 mt-2">تسجيل الدخول إلى حساب المسؤول</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-xs flex items-center gap-2 font-bold">
            <i className="fa-solid fa-circle-exclamation" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" autoComplete="off">
          <FormField
            label="البريد الإلكتروني"
            icon="fa-solid fa-envelope"
            error={errors.email?.message}
            required
          >
            <input
              {...register("email")}
              type="email"
              placeholder="admin@domain.com"
              className={`input-field ${errors.email ? "border-red-300 bg-red-50/30" : ""}`}
              dir="ltr"
              autoComplete="off"
            />
          </FormField>

          <FormField
            label="كلمة المرور"
            icon="fa-solid fa-lock"
            error={errors.password?.message}
            required
          >
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`input-field ${errors.password ? "border-red-300 bg-red-50/30" : ""}`}
              dir="ltr"
              autoComplete="current-password"
            />
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 rounded-xl bg-[#080d28] text-white font-black flex items-center justify-center gap-2 hover:bg-[#151c45] hover:-translate-y-0.5 transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket" />
                دخول إلى لوحة الإدارة
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}