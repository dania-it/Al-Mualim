import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function WorkerPortfolio({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];

  useEffect(() => {
    if (selectedIndex === null) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev === 0 ? validImages.length - 1 : prev - 1,
        );
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev === validImages.length - 1 ? 0 : prev + 1,
        );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, validImages.length]);

  if (validImages.length === 0) {
    return (
      <div className="text-center py-10 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)]">
        <i className="fa-regular fa-images text-4xl text-[var(--primary)] mb-3 block"></i>
        <p className="text-lg font-black text-[var(--text-muted)]">
          لا توجد صور معرض أعمال مضافة حالياً
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-[#263174]">
          <span className="w-12 h-12 rounded-2xl bg-[#263174]/10 text-[#263174] flex items-center justify-center text-xl shrink-0 border border-[#263174]/20">
            <i className="fa-solid fa-images text-[#263174]"></i>
          </span>
          معرض الأعمال السابقة
        </h2>
        <span className="text-sm font-bold text-[var(--text-muted)] flex items-center gap-2">
          <i className="fa-solid fa-expand text-[#263174]"></i> اضغط لتكبير
          الصورة
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {validImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="group relative rounded-2xl overflow-hidden border border-[var(--border-color)] aspect-square bg-[var(--bg-main)] cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={img}
              alt={`عمل ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-white text-[#263174] flex items-center justify-center text-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all shadow-lg">
                <i className="fa-solid fa-expand text-[#263174]"></i>
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 w-screen h-screen top-0 left-0"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 left-6 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white text-2xl flex items-center justify-center transition-transform hover:scale-110"
            >
              <i className="fa-solid fa-xmark text-white"></i>
            </button>

            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-full bg-white/10 text-white text-base font-black backdrop-blur-md">
              {selectedIndex + 1} / {validImages.length}
            </div>

            {validImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev === 0 ? validImages.length - 1 : prev - 1,
                  );
                }}
                className="absolute right-4 sm:right-8 z-30 w-14 h-14 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-2xl transition-all hover:scale-110"
              >
                <i className="fa-solid fa-chevron-right text-white"></i>
              </button>
            )}

            <div
              className="relative w-full h-full max-w-[85vw] max-h-[82vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={validImages[selectedIndex]}
                alt="صورة العرض"
                className="w-full h-full object-contain rounded-2xl shadow-2xl select-none"
              />
            </div>

            {validImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev === validImages.length - 1 ? 0 : prev + 1,
                  );
                }}
                className="absolute left-4 sm:left-8 z-30 w-14 h-14 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-2xl transition-all hover:scale-110"
              >
                <i className="fa-solid fa-chevron-left text-white"></i>
              </button>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
