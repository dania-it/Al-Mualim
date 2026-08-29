

import { useRef } from "react";
import Reveal from "../Reveal";

export default function Testimonials({ reviewsList = [], jobsList = [] }) {
  const sliderRef = useRef(null);

  const fallbackReviews = [
    {
      id: 1,
      userName: "أحمد الجابي",
      workerName: "أحمد العلي (كهرباء)",
      userAvatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      comment:
        "تواصلت مع الفني عبر المنصة، وصل بالوقت المحدد وأنجز العمل بأعلى جودة وبسعر عادل جداً.",
    },
    {
      id: 2,
      userName: "سارة النابلسي",
      workerName: "سامر القاسم (دهان)",
      userAvatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment:
        "أكثر ما أعجبني هو المتابعة والاحترافية، التقييم الموثق ساعدني أختار الفني المناسب بثقة كبيرة.",
    },
    {
      id: 3,
      userName: "محمد الكردي",
      workerName: "بلال المنصور (بلاط)",
      userAvatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      comment:
        "خدمة ممتازة وسريعة، التطبيق سهل الاستخدام وسأقوم باعتماده في جميع الأعمال المنزلية القادمة.",
    },
  ];

  const hasRealData = Array.isArray(reviewsList) && reviewsList.length > 0;
  const displayReviews = hasRealData ? reviewsList : fallbackReviews;

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.querySelector(".testimonial-slide");
    const scrollAmount = card ? card.offsetWidth + 24 : container.clientWidth;

    container.scrollBy({
      left: direction === "next" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const getWorkerInfoName = (rev) => {
    if (rev.workerName) return rev.workerName;
    if (rev.serviceName) return rev.serviceName;

    if (jobsList && jobsList.length > 0 && (rev.workerId || rev.jobId)) {
      const found = jobsList.find(
        (w) => w.id === (rev.workerId || rev.jobId) || w._id === (rev.workerId || rev.jobId)
      );
      if (found) return found.workerName;
    }

    return "خدمة معتمدة";
  };

  return (
    <section
      className="py-16 sm:py-24 bg-[#263174] text-white font-tajawal text-base relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#ffb53e]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
     
        <Reveal delay={100}>
<div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
      تجارب <span className="text-[#ffb53e]">عملاؤنا الحقيقيين</span>
    </h2>
    <p className="text-xs sm:text-base text-slate-200 mt-2.5 font-medium">
      آراء وانطباعات حقيقية مسجلة من العملاء عبر المنصة
    </p>
  </div>
        </Reveal>

    
        <div className="relative">
          {displayReviews.length > 3 && (
            <>
              <button
                type="button"
                onClick={() => scroll("prev")}
                className="hidden sm:flex absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 items-center justify-center text-white text-base transition-all active:scale-90 cursor-pointer shadow-lg"
                aria-label="السابق"
              >
                <i className="fa-solid fa-chevron-right" />
              </button>

              <button
                type="button"
                onClick={() => scroll("next")}
                className="hidden sm:flex absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 items-center justify-center text-white text-base transition-all active:scale-90 cursor-pointer shadow-lg"
                aria-label="التالي"
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
            </>
          )}

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {displayReviews.map((rev, index) => {
              const name = rev.userName || rev.name || rev.clientName || "عميل موثق";
              const commentText =
                rev.comment || rev.text || rev.reviewText || rev.review || "تجربة ممتازة وخدمة موثوقة.";
              const ratingValue = Number(rev.rating) || 5;
              const avatarUrl = rev.userAvatar || rev.avatar || rev.userImg;
              const workerName = getWorkerInfoName(rev);

              return (
                <div
                  key={rev.id || rev._id || index}
                  className="testimonial-slide snap-center shrink-0 w-[90%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <Reveal delay={200 + index * 120}>
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl border border-white flex flex-col justify-between h-full relative overflow-hidden group hover:bg-white/[0.16] hover:-translate-y-1 transition-all duration-300">
                      
                      <div>
                      
                        <div className="flex items-center justify-start mb-4">
                          <div className="flex gap-1 text-[#ffb53e] text-xs sm:text-sm">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={
                                  i < Math.floor(ratingValue)
                                    ? "fa-solid fa-star"
                                    : "fa-regular fa-star text-white/30"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm leading-relaxed text-slate-100 font-medium line-clamp-4 min-h-[60px]">
                          "{commentText}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-white/20 relative z-10 mt-6">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-[#ffb53e] shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-[#ffb53e]/20 border-2 border-[#ffb53e] flex items-center justify-center font-black text-sm text-[#ffb53e] shrink-0">
                            {name.charAt(0)}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                            {name}
                          </h3>

                          <p className="text-[11px] text-slate-300 truncate mt-0.5 font-medium">
                            {workerName ? `تقييم لـ: ${workerName}` : "عميل عبر المنصة"}
                          </p>
                        </div>
                      </div>

                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}