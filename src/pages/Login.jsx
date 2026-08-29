import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useApp } from "../Context/AppContext";
import {
  GOVERNORATES,
  WORKER_CATEGORIES,
  getLoginSchema,
} from "../components/login/loginSchemas";

import RoleSelector from "../components/login/RoleSelector";
import ModeToggle from "../components/login/ModeToggle";
import FormField from "../components/login/FormField";
import ClientFields from "../components/login/ClientFields";
import WorkerFields from "../components/login/WorkerFields";
import PendingScreen from "../components/login/PendingScreen";

export default function Login() {
  const navigate = useNavigate();
  const { loginWorker, loginClient, addWorker, addClient } = useApp();

  const [role, setRole] = useState("client");
  const [clientMode, setClientMode] = useState("login");
  const [workerMode, setWorkerMode] = useState("login");
  const [error, setError] = useState("");
  const [submittedPending, setSubmittedPending] = useState(false);
  const [idPreview, setIdPreview] = useState(null);
  const [portfolioPreviews, setPortfolioPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getLoginSchema(role, clientMode, workerMode)),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      idNumber: "",
      phone: "",
      governorate: "",
      detailedAddress: "",
      category: "",
    },
  });

  const resetFormState = () => {
    setError("");
    setIdPreview(null);
    setPortfolioPreviews([]);
    reset();
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setSubmittedPending(false);
    resetFormState();
  };

  const handleModeChange = (setter) => (mode) => {
    setter(mode);
    resetFormState();
  };

  const handleIdChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setIdPreview(URL.createObjectURL(file));
  };

  const handlePortfolioChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setPortfolioPreviews(urls);
    }
  };

  const onSubmit = async (data) => {
    setError("");

    if (role === "worker" && workerMode === "login") {
      const result = await loginWorker(data.email, data.password);
      if (result.success) navigate("/dashboard");
      else setError(result.reason);
      return;
    }

    if (role === "worker" && workerMode === "register") {
      try {
        await addWorker(data);
        setSubmittedPending(true);
      } catch (err) {
        setError(err.message);
      }
      return;
    }

    if (clientMode === "login") {
      const result = await loginClient(data.email, data.password);
      if (result.success) navigate("/");
      else setError(result.reason);
      return;
    }

    try {
      await addClient(data);
      const loginResult = await loginClient(data.email, data.password);
      if (loginResult.success) navigate("/");
      else setError(loginResult.reason);
    } catch (err) {
      setError(err.message);
    }
  };

  if (submittedPending) {
    return (
      <PendingScreen
        onGoToLogin={() => {
          setRole("worker");
          setWorkerMode("login");
          setSubmittedPending(false);
          resetFormState();
        }}
      />
    );
  }

  const submitLabel =
    role === "worker"
      ? workerMode === "login"
        ? "دخول لحساب الفني"
        : "تقديم طلب انضمام كـ فني"
      : clientMode === "login"
      ? "تسجيل الدخول"
      : "إنشاء حساب زبون جديد";

  return (
    <div
      className="max-w-xl mx-auto my-8 p-6 sm:p-9 bg-white border border-[var(--border-color)] rounded-[2rem] shadow-sm flex flex-col gap-6"
      dir="rtl"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-[#263174]/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#263174] text-2xl border border-[#263174]/15">
          <i className="fa-solid fa-user-shield"></i>
        </div>
        <h2 className="text-2xl font-black text-[#080d28]">أهلاً بك في المنصة</h2>
        <p className="text-xs font-bold text-slate-400 mt-1">
          حدد نوع الحساب وطريقة الدخول للبدء
        </p>
      </div>

      <RoleSelector role={role} onChange={handleRoleChange} />

      {role === "client" && (
        <ModeToggle
          mode={clientMode}
          onChange={handleModeChange(setClientMode)}
          options={[
            { mode: "login", icon: "fa-solid fa-right-to-bracket", label: "تسجيل الدخول" },
            { mode: "register", icon: "fa-solid fa-user-plus", label: "حساب جديد" },
          ]}
        />
      )}

      {role === "worker" && (
        <ModeToggle
          mode={workerMode}
          onChange={handleModeChange(setWorkerMode)}
          options={[
            { mode: "login", icon: "fa-solid fa-right-to-bracket", label: "تسجيل الدخول" },
            { mode: "register", icon: "fa-solid fa-user-plus", label: "طلب انضمام جديد" },
          ]}
        />
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-xs border border-red-100 flex items-center gap-2.5 font-bold">
          <i className="fa-solid fa-circle-exclamation text-base"></i>
          <span>{error}</span>
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
            placeholder="example@domain.com"
            className={`input-field w-full text-base sm:text-sm ${
              errors.email ? "border-red-300 bg-red-50/30" : ""
            }`}
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
            className={`input-field w-full text-base sm:text-sm tracking-widest placeholder:tracking-normal ${
              errors.password ? "border-red-300 bg-red-50/30" : ""
            }`}
            dir="ltr"
            autoComplete="new-password"
          />
        </FormField>

        {role === "client" && clientMode === "register" && (
          <ClientFields
            register={register}
            control={control}
            errors={errors}
            governorates={GOVERNORATES}
          />
        )}

        {role === "worker" && workerMode === "register" && (
          <WorkerFields
            register={register}
            control={control}
            errors={errors}
            idPreview={idPreview}
            portfolioPreviews={portfolioPreviews}
            onIdChange={handleIdChange}
            onPortfolioChange={handlePortfolioChange}
            governorates={GOVERNORATES}
            categories={WORKER_CATEGORIES}
          />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3.5 bg-[#263174] hover:bg-[#1b2353] text-white font-bold rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "جاري التنفيذ..." : submitLabel}
        </button>
      </form>
    </div>
  );
}