import SharedFields from "./SharedFields";

export default function ClientFields({
  register,
  control,
  errors,
  governorates,
}) {
  return (
    <div className="flex flex-col gap-4 pt-2 border-t border-slate-100">
      <SharedFields
        register={register}
        control={control}
        errors={errors}
        governorates={governorates}
        showIdNumber={true}
      />
    </div>
  );
}
