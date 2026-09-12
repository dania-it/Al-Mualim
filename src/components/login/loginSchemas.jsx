import * as z from "zod";

export const GOVERNORATES = [
  "دمشق",
  "ريف دمشق",
  "حلب",
  "حمص",
  "حماة",
  "اللاذقية",
  "إدلب",
  "الحسكة",
  "دير الزور",
  "الرقة",
  "درعا",
  "السويداء",
  "القنيطرة",
  "طرطوس",
];

export const WORKER_CATEGORIES = [
  "كهرباء",
  "طيان",
  "دهان",
  "صيانة",
  "نجار",
  "بلاط",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const ARABIC_NAME_REGEX = /^[\u0621-\u064A\s]+$/;
const HAS_ARABIC_REGEX = /[\u0600-\u06FF]/;
const PHONE_REGEX = /^09\d{8}$/;
const SYRIAN_ID_REGEX = /^010\d{8}$/;
const COMPLEX_PASSWORD_REGEX = /^(?=.*[\d])(?=.*[@$!%*?&#_\-.]).{5,}$/;

export const emailSchema = z
  .string()
  .min(1, "البريد الإلكتروني مطلوب")
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") return;
    if (HAS_ARABIC_REGEX.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "البريد الإلكتروني يجب أن يُكتب باللغة الإنكليزية فقط، مثل: user@email.com",
      });
      return;
    }
    if (!z.string().email().safeParse(val).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "صيغة البريد غير صحيحة. اكتب البريد بهذا الشكل: user@email.com",
      });
    }
  });

export const loginPasswordSchema = z.string().min(1, "كلمة المرور مطلوبة");

export const registerPasswordSchema = z
  .string()
  .min(1, "كلمة المرور مطلوبة")
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") return;
    if (val.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "كلمة المرور يجب أن تحتوي على 5 أحرف أو أكثر",
      });
      return;
    }
    if (!COMPLEX_PASSWORD_REGEX.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "كلمة المرور يجب أن تحتوي على رقم ورمز خاص مثل @ أو #",
      });
    }
  });

export const fullNameSchema = z
  .string()
  .min(1, "الاسم الثلاثي مطلوب")
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") return;
    if (val.trim().length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "اكتب الاسم الثلاثي كاملاً، مثل: أحمد محمد السلامة",
      });
      return;
    }
    if (!ARABIC_NAME_REGEX.test(val.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "الاسم يجب أن يُكتب باللغة العربية فقط، مثل: أحمد محمد السلامة",
      });
    }
  });

export const phoneSchema = z
  .string()
  .min(1, "رقم الهاتف مطلوب")
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") return;
    if (!PHONE_REGEX.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام، مثل: 0912345678",
      });
    }
  });

export const idNumberSchema = z
  .string()
  .min(1, "رقم الهوية مطلوب")
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") return;
    if (!SYRIAN_ID_REGEX.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "رقم الهوية يجب أن يبدأ بـ 010 ويتكون من 11 رقماً، مثل: 01012345678",
      });
    }
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export const clientRegisterSchema = z.object({
  fullName: fullNameSchema,
  idNumber: idNumberSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: registerPasswordSchema,
  governorate: z.string().min(1, "يرجى اختيار المحافظة"),
  detailedAddress: z
    .string()
    .min(10, "يرجى كتابة تفاصيل العنوان بشكل واضح (10 أحرف على الأقل)"),
});

export const workerRegisterSchema = z.object({
  fullName: fullNameSchema,
  category: z.string().min(1, "يرجى اختيار التخصص"),
  governorate: z.string().min(1, "يرجى اختيار المحافظة"),
  idNumber: idNumberSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: registerPasswordSchema,
  detailedAddress: z
    .string()
    .min(10, "يرجى كتابة العنوان التفصيلي بدقة (10 أحرف على الأقل)"),
  idImage: z.custom(
    (v) =>
      v instanceof FileList &&
      v.length > 0 &&
      ACCEPTED_IMAGE.includes(v[0].type) &&
      v[0].size <= MAX_FILE_SIZE,
    { message: "صورة الهوية مطلوبة: JPG أو PNG أو WEBP، وبحجم أقصى 5MB" },
  ),
  portfolioFiles: z.custom(
    (v) => {
      if (!(v instanceof FileList) || v.length === 0) return true;
      if (v.length > 5) return false;
      return Array.from(v).every(
        (f) => ACCEPTED_IMAGE.includes(f.type) && f.size <= MAX_FILE_SIZE,
      );
    },
    {
      message:
        "يمكنك رفع 5 صور كحد أقصى، JPG أو PNG أو WEBP، وبحجم 5MB لكل صورة",
    },
  ),
});

export function getLoginSchema(role, clientMode, workerMode) {
  const isLoginMode =
    role === "worker" ? workerMode === "login" : clientMode === "login";
  if (isLoginMode) return loginSchema;
  return role === "worker" ? workerRegisterSchema : clientRegisterSchema;
}
