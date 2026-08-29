import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { useApp } from "../Context/AppContext";
import { getCategories } from "../api/index";

import WorkerCard from "../components/job/WorkerCard";
import SearchFilter from "../components/job/SearchFilter";
import Reveal from "../components/Reveal";
export default function Jobs() {
  const { jobsList } = useApp();
  const [searchParams] = useSearchParams();
  const resultsRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("الكل");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]);

  const filtered = jobsList.filter((job) => {
    if (job.status && job.status !== "approved") return false;

    const matchCat =
      selectedCategory === "الكل" ||
      job.category?.trim().toLowerCase() ===
        selectedCategory.trim().toLowerCase();

    const q = searchTerm.toLowerCase().trim();

    const matchText =
      !q ||
      job.title?.toLowerCase().includes(q) ||
      job.workerName?.toLowerCase().includes(q) ||
      job.category?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q) ||
      job.residence?.toLowerCase().includes(q) ||
      job.detailedAddress?.toLowerCase().includes(q) ||
      job.governorate?.toLowerCase().includes(q);

    const rating = Number(job.rating) || 0;

    const matchRating =
      selectedRating === "all" || rating >= parseFloat(selectedRating);

    const price = Number(job.price) || 0;

    let matchPrice = true;

    if (selectedPrice === "under20") {
      matchPrice = price < 20;
    } else if (selectedPrice === "20-50") {
      matchPrice = price >= 20 && price <= 50;
    } else if (selectedPrice === "over50") {
      matchPrice = price > 50;
    }

    const matchLocation =
      selectedLocation === "all" ||
      job.residence?.trim() === selectedLocation ||
      job.governorate?.trim() === selectedLocation;

    return matchCat && matchText && matchRating && matchPrice && matchLocation;
  });

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "الكل" ||
    selectedRating !== "all" ||
    selectedPrice !== "all" ||
    selectedLocation !== "all";

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setSelectedRating("all");
    setSelectedPrice("all");
    setSelectedLocation("all");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f1f2f2] text-[var(--text-dark)]"
    >
      <Reveal>
        <section className="pt-6 sm:pt-8 px-3 sm:px-5">
          <div
            className="
            relative
            max-w-6xl
            mx-auto
            rounded-[2rem]
            border
            border-blue-200/40
            bg-[var(--primary)]
          "
          >
            <div
              className="
              text-center
              text-white
              px-5
              py-10
              sm:py-14
              pb-16
              sm:pb-20
            "
            >
              <div
                className="
                inline-flex
                items-center
                justify-center
                w-14
                h-14
                rounded-2xl
                bg-white/10
                border
                border-white/20
                mb-4
              "
              >
                <i className="fa-solid fa-screwdriver-wrench text-2xl"></i>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                دليل الخدمات <span className="text-[#ffb53e]">المتاحة</span>
              </h1>

              <p
                className="
                text-sm
                sm:text-base
                text-blue-100
                mt-3
                max-w-xl
                mx-auto
              "
              >
                تصفح جميع الفنيين المعتمدين والمستعدين لتنفيذ طلباتك
              </p>
            </div>

         
            <div
              className="
              absolute
              left-0
              right-0
              -bottom-7
              px-3
              sm:px-6
            "
            >
              <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                filteredCount={filtered.length}
              />
            </div>
          </div>
        </section>
      </Reveal>
      <main
        className="
        max-w-6xl
        mx-auto
        px-3
        sm:px-5
        pt-14
        sm:pt-16
        pb-12
      "
      >
        <div ref={resultsRef} className="scroll-mt-6">
          <Reveal delay={80}>
            <div className="flex justify-start mb-5">
              <span
                className="
                inline-flex
                items-center
                gap-2
                text-xs
                sm:text-sm
                font-bold
                bg-white
                text-[#263174]
                border
                border-blue-100
                px-4
                py-2
                rounded-full
                shadow-sm
              "
              >
                <i className="fa-solid fa-users text-[#263174]"></i>
                {filtered.length} خدمة متاحة
              </span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          {filtered.length > 0 ? (
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
            "
            >
              {filtered.map((job) => (
                <WorkerCard key={job.id} worker={job} categories={categories} highlightTerm={searchTerm} />
              ))}
            </div>
          ) : (
            <div
              className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              text-center
              py-20
              px-5
            "
            >
              <div
                className="
                w-16
                h-16
                mx-auto
                mb-4
                rounded-2xl
                bg-blue-50
                text-[#263174]
                flex
                items-center
                justify-center
              "
              >
                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
              </div>

              <h3 className="font-bold text-slate-700">لا توجد خدمات مطابقة</h3>

              <p className="text-sm text-slate-400 mt-2">
                جرّب تغيير كلمات البحث أو الفلاتر
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="
                    mt-5
                    px-4
                    py-2
                    rounded-xl
                    bg-blue-50
                    text-[#263174]
                    text-sm
                    font-bold
                    hover:bg-blue-100
                    transition
                  "
                >
                  <i className="fa-solid fa-rotate-left ml-1"></i>
                  إعادة تعيين البحث
                </button>
              )}
            </div>
          )}
        </Reveal>
      </main>
    </div>
  );
}
