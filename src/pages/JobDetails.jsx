import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../Context/AppContext";
import { getCategories } from "../api/index";

import WorkerHeroHeader from "../components/JobDetails/WorkerHeroHeader";
import WorkerStatsRow from "../components/JobDetails/WorkerStatsRow";
import JobDescriptionSection from "../components/JobDetails/JobDescriptionSection";
import WorkerLocation from "../components/JobDetails/WorkerLocation";
import ContactEngSection from "../components/JobDetails/ContactEngSection";
import WorkerPortfolio from "../components/JobDetails/WorkerPortfolio";
import WorkerReviews from "../components/JobDetails/WorkerReviews";
import Reveal from "../components/Reveal";
import OrderModal from "../components/JobDetails/OrderModal";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    user,
    jobsList = [],
    projectsList = [],
    reviewsList = {},
    fetchReviews,
    addReview,
    addProject,
    loading,
    getReviewStats,
  } = useApp();

  const [categories, setCategories] = useState([]);
  const [showContact, setShowContact] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  useEffect(() => {
    const cooldownKey = `last_order_time_${id}`;
    const lastOrderTime = localStorage.getItem(cooldownKey);

    if (lastOrderTime) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(lastOrderTime, 10)) / 1000);
      const remaining = 300 - elapsedSeconds;
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        localStorage.removeItem(cooldownKey);
      }
    }
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(`last_order_time_${id}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, id]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const job = jobsList.find((j) => String(j.id) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (job?.id && fetchReviews) {
      fetchReviews(job.id).catch(() => {});
    }
  }, [job?.id]);

  if (loading) {
    return (
      <div dir="rtl" className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f8f9fb] text-center px-5">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-[#263174] mb-5"></i>
        <p className="text-base text-slate-500 font-medium">جاري تحميل تفاصيل الخدمة...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div dir="rtl" className="min-h-[70vh] flex items-center justify-center bg-[#f8f9fb] px-5">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#263174]/10 text-[#263174] flex items-center justify-center text-2xl mb-5">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 className="text-2xl font-black text-[#080d28] mb-3">الخدمة المطلوبة غير موجودة</h2>
          <p className="text-sm text-slate-500 leading-7 mb-7 font-medium">عذراً، لم نتمكن من العثور على الفني المطلوب.</p>
          <Link to="/jobs" className="inline-flex items-center justify-center gap-2 bg-[#263174] hover:bg-[#1b2353] text-white font-bold px-6 py-3 rounded-xl shadow-md">
            <i className="fa-solid fa-arrow-right"></i> العودة لدليل الخدمات
          </Link>
        </div>
      </div>
    );
  }

  const workerReviews = reviewsList[job.id] || [];
  const { count: displayReviewsCount, rating: displayRating } =
    typeof getReviewStats === "function"
      ? getReviewStats(job.id, job)
      : { count: workerReviews.length, rating: job.rating || 0 };

  const handleContactClick = () => {
    if (!user) {
      alert("يجب تسجيل الدخول أولاً للتواصل مع الفني ومعاينة بياناته.");
      navigate("/login");
      return;
    }
    setShowContact(true);
  };

  const handleConfirmEngagement = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (timeLeft > 0) {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      alert(`لقد قمت بتقديم طلب مؤخراً. يرجى الانتظار ${mins}:${secs < 10 ? "0" : ""}${secs} قبل تقديم طلب جديد.`);
      return;
    }

    setIsOrderModalOpen(true);
  };

  const handleFinalSubmitOrder = async ({ workerChoice, orderType, orderNote }) => {
    const isSelf = workerChoice === "self";
    const selectedWorkerName = job.workerName || job.title || "فني محدد";
    const assignedWorkerName = isSelf ? selectedWorkerName : "بانتظار التعيين";
    const typeText = orderType === "inspection" ? "طلب معاينة" : "صيانة جديدة";

    const detailText = orderNote
      ? `[${typeText}] - ${orderNote}`
      : `[${typeText}] - ${isSelf ? `طلب مباشر للفني ${selectedWorkerName}` : `طلب موجه عبر المنصة`}`;

    await addProject({
      clientName: user.name,
      clientPhone: user.phone || "",
      title: job.title || `طلب خدمة ${job.category}`,
      category: job.category,
      details: detailText,
      budget: job.price,
      estimatedDays: 1,
      assignedWorker: assignedWorkerName,
      workerChoice: workerChoice,
      orderType: orderType,
      workerId: isSelf ? job.id : null,
      status: "جاري التنفيذ",
    });

    localStorage.setItem(`last_order_time_${id}`, Date.now().toString());
    setTimeLeft(300);
  };

  const completedProjectsCount = (job.completedJobs || 0) + projectsList.filter(
    (p) => p.assignedWorker === job.workerName && (Number(p.statusStep) >= 5 || p.status === "منجزة")
  ).length;

  const stats = [
    { icon: "fa-solid fa-circle-check", value: completedProjectsCount, label: "مشروع مكتمل", bg: "bg-green-500/10", color: "text-green-600" },
    { icon: "fa-solid fa-comments", value: displayReviewsCount, label: "تقييم موثق", bg: "bg-blue-500/10", color: "text-blue-600" },
    { icon: "fa-solid fa-clock-rotate-left", value: job.delaysCount || job.delays || 0, label: "تأخير في العمل", bg: (job.delaysCount || job.delays) > 0 ? "bg-red-500/10" : "bg-green-500/10", color: (job.delaysCount || job.delays) > 0 ? "text-red-600" : "text-green-600" },
  ];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fb] text-[#080d28] px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-28 lg:pb-8">
      <main className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link to="/jobs" className="group inline-flex items-center gap-2.5 bg-white border border-slate-200 text-[#263174] font-bold text-sm px-5 py-3 rounded-xl shadow-sm">
              <i className="fa-solid fa-arrow-right"></i> العودة إلى دليل الخدمات
            </Link>
            {isAdmin && (
              <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1.5 rounded-xl font-bold text-xs">
                <i className="fa-solid fa-user-shield"></i> وضع المعاينة الإدارية
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-7">
            <WorkerHeroHeader
              job={job}
              displayRating={displayRating}
              displayReviewsCount={displayReviewsCount}
              categories={categories}
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">
          <div className="lg:col-span-2 space-y-7">
            <Reveal delay={120}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <JobDescriptionSection description={job.description} priceNote={job.priceNote} />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <WorkerLocation
                  residence={job.residence || job.detailedAddress || job.governorate}
                  serviceAreas={
                    job.serviceAreas || [
                      job.residence || job.detailedAddress || job.governorate,
                      "المناطق المجاورة",
                    ]
                  }
                />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="bg-[#ffffff] rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
                <WorkerPortfolio images={job.portfolioImages} />
              </div>
            </Reveal>
            <Reveal delay={210}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
                <WorkerReviews workerId={job.id} reviews={workerReviews} user={user} addReview={addReview} />
              </div>
            </Reveal>
          </div>

          <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-6 space-y-6">
            <Reveal delay={130}>
              <ContactEngSection
                showContact={showContact}
                handleContactClick={handleContactClick}
                phone={job.phone}
                handleConfirmEngagement={handleConfirmEngagement}
                timeLeft={timeLeft}
                formatTime={formatTime}
              />
            </Reveal>
            <Reveal delay={170}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-2">
                <WorkerStatsRow stats={stats} />
              </div>
            </Reveal>
          </aside>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <ContactEngSection
          showContact={showContact}
          handleContactClick={handleContactClick}
          phone={job.phone}
          handleConfirmEngagement={handleConfirmEngagement}
          timeLeft={timeLeft}
          formatTime={formatTime}
        />
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleFinalSubmitOrder}
        job={job}
      />
    </div>
  );
}