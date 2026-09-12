import FormField from "./FormField";
import FormSelect from "./FormSelect";

export default function SharedFields({
  register,
  control,
  errors,
  governorates,
  showIdNumber = true,
}) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        label="الاسم الثلاثي"
        icon="fa-solid fa-user"
        error={errors.fullName?.message}
        required
      >
        <input
          {...register("fullName")}
          type="text"
          placeholder="أحمد محمد السلامة"
          className={`input-field ${errors.fullName ? "border-red-300 bg-red-50/30" : ""}`}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField
          label="رقم الهاتف"
          icon="fa-solid fa-phone"
          error={errors.phone?.message}
          required
        >
          <input
            {...register("phone")}
            type="text"
            inputMode="tel"
            maxLength={10}
            placeholder="0912345678"
            className={`input-field ${errors.phone ? "border-red-300 bg-red-50/30" : ""}`}
            dir="ltr"
          />
        </FormField>

        {showIdNumber && (
          <FormField
            label="رقم الهوية السورية"
            icon="fa-solid fa-id-card"
            error={errors.idNumber?.message}
            required
          >
            <input
              {...register("idNumber")}
              type="text"
              inputMode="numeric"
              maxLength={11}
              placeholder="01012345678"
              className={`input-field ${errors.idNumber ? "border-red-300 bg-red-50/30" : ""}`}
              dir="ltr"
            />
          </FormField>
        )}
      </div>

      <FormField
        label="مكان الإقامة (المحافظة)"
        icon="fa-solid fa-map-location-dot"
        error={errors.governorate?.message}
        required
      >
        <FormSelect
          name="governorate"
          control={control}
          options={governorates}
          placeholder="اختر المحافظة"
          error={errors.governorate}
        />
      </FormField>

      <FormField
        label="تفاصيل العنوان"
        icon="fa-solid fa-location-dot"
        error={errors.detailedAddress?.message}
        required
      >
        <textarea
          {...register("detailedAddress")}
          rows={3}
          placeholder="المنطقة، اسم الشارع، رقم البناء أو أقرب معلم..."
          className={`input-field resize-none py-2.5 ${
            errors.detailedAddress ? "border-red-300 bg-red-50/30" : ""
          }`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-copilot="off"
        />
      </FormField>
    </div>
  );
}
