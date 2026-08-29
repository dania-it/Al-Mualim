export default function FileDropzone({
  multiple = false,
  error,
  preview,
  hint,
  icon,
  inputRef,
  onChange,
}) {
  const hasPreview = multiple ? preview?.length > 0 : !!preview;

  return (
    <label
      className={`flex flex-col items-center gap-2 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors ${
        error
          ? "border-red-300 bg-red-50"
          : hasPreview
            ? "border-[#123B66] bg-[#123B66]/5"
            : "border-slate-300 hover:border-[#123B66] hover:bg-slate-50"
      }`}
    >
      {hasPreview ? (
        multiple ? (
          <>
            <div className="grid grid-cols-3 gap-1 w-full">
              {preview.slice(0, 6).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-full h-16 object-cover rounded-lg"
                />
              ))}
            </div>

            <p className="text-xs text-[#123B66] font-bold">
              <i className="fa-solid fa-circle-check"></i> {preview.length} صورة
            </p>
          </>
        ) : (
          <img
            src={preview}
            alt="معاينة"
            className="w-full h-32 object-cover rounded-lg"
          />
        )
      ) : (
        <>
          <i className={`${icon} text-3xl text-[#123B66]/60`}></i>
          <span className="text-xs text-[var(--text-muted)] text-center">
            {hint}
          </span>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
}
