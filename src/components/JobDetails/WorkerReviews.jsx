import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkerStarDisplay from "./WorkerStarDisplay";

export default function WorkerReviews({ workerId, reviews, user, addReview }) {
  const navigate = useNavigate();

  const [reviewStars, setReviewStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const currentReviews = Array.isArray(reviews) ? reviews : [];

  const { averageRating, starCounts } = useMemo(() => {
    if (currentReviews.length === 0)
      return {
        averageRating: "0.0",
        starCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    currentReviews.forEach((r) => {
      const stars = Math.min(Math.max(Number(r.stars) || 5, 1), 5);
      counts[stars] = (counts[stars] || 0) + 1;
      sum += stars;
    });

    return {
      averageRating: (sum / currentReviews.length).toFixed(1),
      starCounts: counts,
    };
  }, [currentReviews]);

  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return currentReviews;
    return currentReviews.filter(
      (r) => Number(r.stars) === Number(selectedFilter),
    );
  }, [currentReviews, selectedFilter]);

  const alreadyReviewed =
    user?.role === "client" &&
    currentReviews.some((r) => r.clientEmail === user?.email);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user || user.role !== "client") {
      navigate("/login");
      return;
    }
    if (reviewStars === 0 || !reviewText.trim()) return;

    addReview(workerId, {
      id: Date.now(),
      clientName: user.fullName || user.name || "عميل منصة",
      clientEmail: user.email,
      stars: reviewStars,
      comment: reviewText.trim(),
      date: new Date().toLocaleDateString("ar-EG"),
    });

    setReviewSent(true);
    setReviewText("");
    setReviewStars(0);
  };

  return (
    <div className="space-y-6 font-tajawal">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--primary)] flex items-center gap-2.5">
          <span className="text-[var(--accent-gold)]">
            <i className="fa-solid fa-star"></i>
          </span>
          آراء وتقييمات العملاء
        </h2>
        {currentReviews.length > 0 && (
          <span className="px-3.5 py-1 text-sm font-black bg-[var(--primary-soft)] text-[var(--primary)] rounded-full border border-[var(--primary-border)]">
            {currentReviews.length}{" "}
            {currentReviews.length === 1 ? "تقييم" : "تقييمات"}
          </span>
        )}
      </div>

      {/* Summary Section */}
      {currentReviews.length > 0 && (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center md:border-l md:border-[var(--border-color)] md:pl-6">
            <span className="text-5xl font-black text-[var(--primary)] mb-1">
              {averageRating}
            </span>
            <WorkerStarDisplay value={Math.round(Number(averageRating))} />
            <p className="text-xs font-bold text-[var(--text-muted)] mt-2">
              بناءً على {currentReviews.length} تقييم من العملاء
            </p>
          </div>

          <div className="md:col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = starCounts[star] || 0;
              const percentage = currentReviews.length
                ? (count / currentReviews.length) * 100
                : 0;

              return (
                <div
                  key={star}
                  className="flex items-center gap-3 text-xs font-bold group cursor-pointer"
                >
                  <span className="w-12 text-[var(--text-dark)] flex items-center gap-1 shrink-0 group-hover:text-[var(--primary)] transition-colors">
                    {star}{" "}
                    <i className="fa-solid fa-star text-[var(--accent-gold)]"></i>
                  </span>
                  <div className="flex-1 h-2.5 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-color)]">
                    <div
                      className="h-full bg-[var(--accent-gold)] rounded-full transition-all duration-500 group-hover:brightness-110"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-[var(--text-muted)] text-left shrink-0 group-hover:text-[var(--text-dark)] transition-colors">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentReviews.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { key: "all", label: "الكل" },
            { key: "5", label: "5 نجوم" },
            { key: "4", label: "4 نجوم" },
            { key: "3", label: "3 نجوم" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.key
                  ? "bg-[var(--primary)] text-white shadow-md scale-102"
                  : "bg-[var(--bg-main)] text-[var(--text-muted)] hover:bg-[var(--card-bg)] hover:text-[var(--primary)] hover:-translate-y-0.5 hover:shadow-xs border border-[var(--border-color)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {user?.role === "client" && !alreadyReviewed && !reviewSent && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-7 shadow-xs space-y-4 relative overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[var(--primary)]" />
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[var(--primary)]">
              أضف تقييمك للخدمة
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
              شاركتنا تجربتك مع الفني لمساعدة بقية المستخدمين.
            </p>
          </div>

          <div className="bg-[var(--bg-main)] p-3.5 rounded-xl border border-[var(--border-color)] inline-block">
            <span className="block text-xs font-bold text-[var(--text-dark)] mb-1">
              اختر التقييم:
            </span>
            <div className="flex items-center gap-1.5 my-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHoveredStars(n)}
                  onMouseLeave={() => setHoveredStars(0)}
                  onClick={() => setReviewStars(n)}
                  className="text-2xl sm:text-3xl text-[var(--accent-gold)] transition-transform duration-200 hover:scale-125 p-1 focus:outline-none cursor-pointer"
                >
                  <i
                    className={`${
                      (hoveredStars || reviewStars) >= n
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-star`}
                  ></i>
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            data-gramm="false" /* لتعطيل إضافة Grammarly */
            placeholder="اكتب تفاصيل تجربتك هنا..."
            className="w-full p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm sm:text-base text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--card-bg)] transition-all duration-200 resize-none font-medium placeholder-[var(--text-muted)]"
            rows={4}
            required
          />

          <button
            type="submit"
            disabled={reviewStars === 0 || !reviewText.trim()}
            className="w-full sm:w-auto px-7 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-black rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
            نشر التقييم
          </button>
        </form>
      )}

      {reviewSent && (
        <div className="p-4 rounded-xl bg-[var(--primary-soft)] border border-[var(--primary-border)] text-[var(--primary)] font-bold text-sm flex items-center gap-2.5">
          <i className="fa-solid fa-circle-info text-base"></i>
          شكراً لك! تم إضافة تقييمك بنجاح.
        </div>
      )}

      {!user && (
        <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] font-medium text-sm flex items-center justify-center gap-2">
          <i className="fa-solid fa-lock text-[var(--primary)]"></i>
          يرجى{" "}
          <Link
            to="/login"
            className="text-[var(--primary)] font-black hover:underline"
          >
            تسجيل الدخول
          </Link>{" "}
          لكتابة تقييم.
        </div>
      )}

      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[var(--secondary)] transition-all duration-300 relative overflow-hidden group cursor-default"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)] font-black flex items-center justify-center text-lg border border-[var(--primary-border)] shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[var(--primary)] group-hover:text-white">
                    {r.clientName?.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-black text-base text-[var(--text-dark)] leading-snug group-hover:text-[var(--primary)] transition-colors">
                      {r.clientName}
                    </h4>
                    <div className="mt-1">
                      <WorkerStarDisplay value={r.stars} />
                    </div>
                  </div>
                </div>

                <span className="text-xs text-[var(--text-muted)] font-bold bg-[var(--bg-main)] px-3 py-1 rounded-full border border-[var(--border-color)] shrink-0 transition-colors group-hover:border-[var(--primary-border)]">
                  {r.date}
                </span>
              </div>

              {r.comment && (
                <div className="pt-3 border-t border-[var(--border-color)]/60">
                  <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed font-medium">
                    {r.comment}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--bg-main)] text-[var(--primary)] flex items-center justify-center text-2xl mb-3 border border-[var(--border-color)]">
            <i className="fa-regular fa-comment-dots"></i>
          </div>
          <p className="text-base font-bold text-[var(--text-dark)]">
            لا توجد تقييمات مطابقة
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
            جرب اختيار فئة نجوم أخرى أو إضافة تقييم جديد.
          </p>
        </div>
      )}
    </div>
  );
}
