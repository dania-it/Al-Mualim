// src/components/job/SearchFilter.jsx

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FilterDropdown from './FilterDropdown';

const RATING_OPTIONS = [
  { value: 'all', label: 'كل التقييمات' },
  { value: '4.9', label: '4.9 نجوم فأعلى' },
  { value: '4.5', label: '4.5 نجوم فأعلى' },
  { value: '4', label: '4 نجوم فأعلى' },
  { value: '3', label: '3 نجوم فأعلى' },
];

const PRICE_OPTIONS = [
  { value: 'all', label: 'كل الأسعار' },
  { value: 'under20', label: 'أقل من 20$' },
  { value: '20-50', label: '20$ - 50$' },
  { value: 'over50', label: 'أكثر من 50$' },
];

const LOCATION_OPTIONS = [
  { value: 'all', label: 'كل المناطق' },
  { value: 'دمشق', label: 'دمشق' },
  { value: 'ريف دمشق', label: 'ريف دمشق' },
  { value: 'حمص', label: 'حمص' },
  { value: 'حلب', label: 'حلب' },
  { value: 'اللاذقية', label: 'اللاذقية' },
  { value: 'طرطوس', label: 'طرطوس' },
  { value: 'حماة', label: 'حماة' },
  { value: 'إدلب', label: 'إدلب' },
  { value: 'درعا', label: 'درعا' },
  { value: 'السويداء', label: 'السويداء' },
  { value: 'دير الزور', label: 'دير الزور' },
  { value: 'الرقة', label: 'الرقة' },
  { value: 'الحسكة', label: 'الحسكة' },
];

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory = 'الكل',
  setSelectedCategory,
  categories = [],
  selectedRating = 'all',
  setSelectedRating,
  selectedPrice = 'all',
  setSelectedPrice,
  selectedLocation = 'all',
  setSelectedLocation,
  filteredCount = 0,
}) {
  const [showFilters, setShowFilters] = useState(false);

  // القيم المؤقتة داخل المودال
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempRating, setTempRating] = useState(selectedRating);
  const [tempPrice, setTempPrice] = useState(selectedPrice);
  const [tempLocation, setTempLocation] = useState(selectedLocation);

  // عند فتح المودال نحدث القيم لتطابق المحفوظ حالياً
  useEffect(() => {
    if (showFilters) {
      setTempCategory(selectedCategory || 'الكل');
      setTempRating(selectedRating || 'all');
      setTempPrice(selectedPrice || 'all');
      setTempLocation(selectedLocation || 'all');
    }
  }, [
    showFilters,
    selectedCategory,
    selectedRating,
    selectedPrice,
    selectedLocation,
  ]);

  // منع السكرول الرئيسي للبدن أثناء فتح المودال
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFilters]);

  const categoryOptions = [
    { value: 'الكل', label: 'جميع التخصصات' },
    ...categories
      .filter((cat) => (cat.key ?? cat) !== 'الكل')
      .map((cat) => ({
        value: cat.key ?? cat,
        label: cat.key ?? cat,
      })),
  ];

  const hasAppliedFilters =
    selectedCategory !== 'الكل' ||
    selectedRating !== 'all' ||
    selectedPrice !== 'all' ||
    selectedLocation !== 'all';

  // =====================================================
  // تطبيق الفلاتر بدون إغلاق المودال
  // =====================================================
  const applyFilters = () => {
    if (setSelectedCategory) setSelectedCategory(tempCategory);
    if (setSelectedRating) setSelectedRating(tempRating);
    if (setSelectedPrice) setSelectedPrice(tempPrice);
    if (setSelectedLocation) setSelectedLocation(tempLocation);
  };

  // =====================================================
  // مسح جميع الفلاتر
  // =====================================================
  const clearFilters = () => {
    // إعادة تعيين الحالات الخارجية
    if (setSelectedCategory) setSelectedCategory('الكل');
    if (setSelectedRating) setSelectedRating('all');
    if (setSelectedPrice) setSelectedPrice('all');
    if (setSelectedLocation) setSelectedLocation('all');

    // إعادة تعيين الحالات الداخلية للمودال
    setTempCategory('الكل');
    setTempRating('all');
    setTempPrice('all');
    setTempLocation('all');
  };

  const closeModal = () => {
    setShowFilters(false);
  };

  const modalContent = showFilters ? (
    <div
      className="
        fixed
        inset-0
        top-0
        left-0
        right-0
        bottom-0
        w-full
        h-full
        z-[9999999]
        bg-[#080d28]/80
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-3
        sm:p-6
      "
      style={{ zIndex: 9999999 }}
      onClick={closeModal}
    >
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[460px]
          max-h-[85vh]
          sm:max-h-[90vh]
          bg-white
          rounded-[28px]
          shadow-[0_25px_80px_rgba(0,0,0,0.6)]
          flex
          flex-col
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        {/* HEADER */}
        <div
          className="
            shrink-0
            bg-gradient-to-br
            from-[#263174]
            via-[#34469a]
            to-[#5267c2]
            px-6
            py-5
            text-white
            rounded-t-[28px]
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <i className="fa-solid fa-sliders text-white text-xl" />
              </div>

              <div>
                <h2 className="font-black text-lg sm:text-xl leading-tight">
                  فلترة الخدمات
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
                  اختر الخيارات المناسبة لك
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="
                w-10
                h-10
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                hover:bg-white/20
                transition
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-6
            py-6
            space-y-5
            rounded-b-[28px]
          "
        >
          {/* التخصص */}
          <div>
            <label className="flex items-center gap-2 text-sm font-black text-[#080d28] mb-2.5">
              <i className="fa-solid fa-toolbox text-[#263174] text-base" />
              التخصص
            </label>
            <FilterDropdown
              icon="fa-solid fa-toolbox"
              value={tempCategory}
              options={categoryOptions}
              onChange={setTempCategory}
            />
          </div>

          {/* المكان */}
          <div>
            <label className="flex items-center gap-2 text-sm font-black text-[#080d28] mb-2.5">
              <i className="fa-solid fa-location-dot text-[#263174] text-base" />
              المكان
            </label>
            <FilterDropdown
              icon="fa-solid fa-location-dot"
              value={tempLocation}
              options={LOCATION_OPTIONS}
              onChange={setTempLocation}
            />
          </div>

          {/* التقييم */}
          <div>
            <label className="flex items-center gap-2 text-sm font-black text-[#080d28] mb-2.5">
              <i className="fa-solid fa-star text-[#263174] text-base" />
              التقييم
            </label>
            <FilterDropdown
              icon="fa-solid fa-star"
              value={tempRating}
              options={RATING_OPTIONS}
              onChange={setTempRating}
            />
          </div>

          {/* السعر */}
          <div>
            <label className="flex items-center gap-2 text-sm font-black text-[#080d28] mb-2.5">
              <i className="fa-solid fa-sack-dollar text-[#263174] text-base" />
              السعر
            </label>
            <FilterDropdown
              icon="fa-solid fa-sack-dollar"
              value={tempPrice}
              options={PRICE_OPTIONS}
              onChange={setTempPrice}
            />
          </div>

          {/* الأزرار */}
          <div className="pt-2 flex gap-3 shrink-0">
            <button
              type="button"
              onClick={clearFilters}
              className="
                flex-1
                h-12
                rounded-xl
                bg-white
                border-2
                border-[#9a6a16]
                text-[#7a5310]
                font-black
                text-sm
                hover:bg-[#fff8e8]
                transition
                flex
                items-center
                justify-center
              "
            >
              <i className="fa-solid fa-rotate-left ml-2" />
              مسح الفلاتر
            </button>

            <button
              type="button"
              onClick={applyFilters}
              className="
                flex-1
                h-12
                rounded-xl
                bg-[#263174]
                text-white
                font-black
                text-sm
                hover:bg-[#1d2860]
                transition
                flex
                items-center
                justify-center
              "
            >
              <i className="fa-solid fa-check ml-2" />
              تطبيق الفلاتر
            </button>
          </div>

          <div className="pt-1 text-center text-xs font-semibold text-slate-400">
            {filteredCount > 0
              ? `${filteredCount} خدمة متاحة`
              : 'اختر الفلاتر المناسبة لك'}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        className="
          w-full
          max-w-4xl
          mx-auto
          bg-white
          rounded-full
          border
          border-slate-200
          shadow-sm
          p-1.5
          flex
          items-center
          gap-1.5
          transition-all
          focus-within:border-[#263174]
        "
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0 px-3 sm:px-4">
          <i className="fa-solid fa-magnifying-glass text-[#263174] text-sm shrink-0" />
          <input
            type="text"
            value={searchTerm}
            placeholder="ابحث عن خدمة، اسم الفني، تخصص أو مكان..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-0 bg-transparent outline-none text-xs sm:text-sm text-[#080d28] placeholder:text-slate-400 py-2.5"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-[#263174] hover:bg-slate-100 transition shrink-0"
            >
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className="shrink-0 flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition bg-[#263174] text-white hover:bg-[#1f285c]"
        >
          <i className="fa-solid fa-sliders text-sm" />
          <span className="hidden sm:inline">الفلاتر</span>
          {hasAppliedFilters && (
            <span className="block w-2.5 h-2.5 rounded-full bg-[#ffb53e] shrink-0" />
          )}
        </button>
      </div>

      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}