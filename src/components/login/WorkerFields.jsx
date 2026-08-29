import { Controller } from "react-hook-form";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import FileDropzone from "./FileDropzone";
import SharedFields from "./SharedFields";

export default function WorkerFields({
  register,
  control,
  errors,
  idPreview,
  portfolioPreviews,
  onIdChange,
  onPortfolioChange,
  governorates,
  categories,
}) {
  return (
    <div className="flex flex-col gap-4 pt-2 border-t border-slate-100">
      <FormField
        label="التخصص"
        icon="fa-solid fa-toolbox"
        error={errors.category?.message}
        required
      >
        <FormSelect
          name="category"
          control={control}
          options={categories}
          placeholder="اختر التخصص"
          error={errors.category}
        />
      </FormField>

      <SharedFields
        register={register}
        control={control}
        errors={errors}
        governorates={governorates}
        showIdNumber={true}
      />

      <FormField
        label="صورة الهوية / جواز السفر"
        icon="fa-solid fa-id-card"
        error={errors.idImage?.message}
        required
      >
        <Controller
          name="idImage"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <FileDropzone
              error={errors.idImage}
              preview={idPreview}
              icon="fa-solid fa-cloud-arrow-up"
              hint={
                <>
                  اضغط لرفع صورة الهوية أو جواز السفر
                  <br />
                  <span className="text-[10px] text-slate-400">
                    JPG, PNG, WEBP — الحجم الأقصى 5MB
                  </span>
                </>
              }
              inputRef={ref}
              onChange={(e) => {
                onChange(e.target.files);
                if (onIdChange) onIdChange(e);
              }}
            />
          )}
        />
      </FormField>

      <FormField
        label="صور الأعمال السابقة (اختياري)"
        icon="fa-solid fa-images"
        error={errors.portfolioFiles?.message}
      >
        <Controller
          name="portfolioFiles"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <FileDropzone
              multiple
              error={errors.portfolioFiles}
              preview={portfolioPreviews}
              icon="fa-solid fa-images"
              hint={
                <>
                  أضف صور من أعمالك السابقة (حد أقصى 5 صور)
                  <br />
                  <span className="text-[10px] text-slate-400">
                    JPG, PNG, WEBP — الحجم الأقصى 5MB لكل صورة
                  </span>
                </>
              }
              inputRef={ref}
              onChange={(e) => {
                onChange(e.target.files);
                if (onPortfolioChange) onPortfolioChange(e);
              }}
            />
          )}
        />
      </FormField>
    </div>
  );
}
