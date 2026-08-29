import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import WorkerCard from "../job/WorkerCard";
import Reveal from "../Reveal";

export default function TopWorkersSection({
  topWorkers = [],
  categories = [],
}) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  if (!topWorkers || topWorkers.length === 0) return null;

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const card = container.querySelector(".top-worker-slide");

    if (!card) return;

    const cardWidth = card.offsetWidth + 24;

    container.scrollBy({
      left: direction === "next" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 bg-[var(--bg-main)] overflow-hidden font-tajawal"
      dir="rtl"
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal delay={100}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-dark)] leading-tight tracking-tight">
              أفضل الفنيين <span className="text-[#263174]">تقييماً</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              نخبة من الفنيين المعتمدين الذين حازوا على ثقة العملاء بأعلى
              التقييمات وجودة التنفيذ
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {topWorkers.length > 3 && (
            <button
              type="button"
              onClick={() => scroll("prev")}
              aria-label="الفنيون السابقون"
              className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 text-[#263174] flex items-center justify-center text-base shadow-xl hover:bg-[#263174] hover:text-white transition-all active:scale-90 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          )}

          <div
            ref={sliderRef}
            className="
              flex
              gap-6
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              py-4
              px-1
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {topWorkers.map((worker, i) => (
              <div
                key={worker.id || worker._id}
                className="
                  top-worker-slide
                  snap-center
                  shrink-0
                  w-[88%]
                  sm:w-[calc(50%-12px)]
                  lg:w-[calc(33.333%-16px)]
                "
              >
                <Reveal delay={200 + i * 120}>
                  <WorkerCard worker={worker} categories={categories} />
                </Reveal>
              </div>
            ))}
          </div>

          {topWorkers.length > 3 && (
            <button
              type="button"
              onClick={() => scroll("next")}
              aria-label="الفنيون التاليون"
              className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 text-[#263174] flex items-center justify-center text-base shadow-xl hover:bg-[#263174] hover:text-white transition-all active:scale-90 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
          )}
        </div>
        <Reveal delay={300}>
          <div className="mt-14 sm:mt-16 bg-gradient-to-r from-[#263174] to-[#12183a] rounded-3xl p-8 sm:p-10 shadow-xl text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 text-center sm:text-right max-w-xl">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                لم تجد الفني المناسب لمشروعك بعد؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 leading-relaxed">
                تصفح مئات الفنيين المتخصصين في مختلف المجالات مع إمكانية تصفية
                النتائج والاطلاع على المراجعات والأسعار بسهولة.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="relative z-10 shrink-0 inline-flex items-center gap-3 bg-[var(--accent-gold)] hover:brightness-105 text-[var(--text-dark)] font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              استكشف جميع الفنيين المتاحين
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
