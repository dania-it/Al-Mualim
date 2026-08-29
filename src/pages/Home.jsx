import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../Context/AppContext';
import { getSiteMeta, getCategories, getWorkers } from '../api/index';

import CategoryGrid from '../components/CategoryGrid';
import Reveal from '../components/Reveal';
import UnifiedSearch from '../components/search/UnifiedSearch';
import HeroSlider from '../components/home/HeroSlider';
import TopWorkersSection from '../components/home/TopWorkersSection';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import FaqSection from '../components/home/FaqSection';
import WorkerCard from '../components/job/WorkerCard';

export default function Home() {
  const navigate = useNavigate();
  const { jobsList, projectsList, reviewsList } = useApp();

  const [categories, setCategories] = useState([]);
  const [topWorkers, setTopWorkers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getSiteMeta().catch(() => {});
    getWorkers({ top: 6 }).then(setTopWorkers).catch(() => {});
  }, []);

  const handleCategorySelect = (catKey) => {
    if (catKey === 'الكل') {
      setSelectedCategory(null);
      navigate('/jobs');
      return;
    }

    const nextCategory = selectedCategory === catKey ? null : catKey;
    setSelectedCategory(nextCategory);

    if (nextCategory) {
      setTimeout(() => {
        const section = document.getElementById('quick-category-results');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleClosePreview = () => {
    setSelectedCategory(null);
  };

  const approvedWorkers = jobsList.filter((w) => w.status === 'approved');

  const selectedCatObj = categories.find((c) => c.key === selectedCategory || c.name === selectedCategory);
  const activeColor = selectedCatObj?.color || '#ffb53e';

  const isCategoryMatch = (worker, targetCat) => {
    if (!targetCat) return false;
    const rawCategory = typeof worker.category === 'object' ? worker.category?.name : worker.category;
    const rawJobTitle = worker.jobTitle;

    const normalize = (str) => (str ? String(str).trim().toLowerCase() : '');
    const target = normalize(targetCat);
    const catVal = normalize(rawCategory);
    const jobVal = normalize(rawJobTitle);

    return catVal.includes(target) || target.includes(catVal) || jobVal.includes(target);
  };

  const categoryWorkers = selectedCategory
    ? approvedWorkers.filter((w) => isCategoryMatch(w, selectedCategory))
    : [];

  const previewWorkers = categoryWorkers.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-dark)]" dir="rtl">

      <div className="relative">
        <HeroSlider />
        <div className="relative z-20 -mt-6 sm:-mt-8 px-3 sm:px-4">
          <UnifiedSearch
            searchableData={approvedWorkers}
            categories={categories}
            className="max-w-5xl mx-auto"
          />
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6">
        <Reveal delay={80}>
          <CategoryGrid
            categories={categories}
            jobsList={jobsList}
            activeCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </Reveal>


        {selectedCategory && (
          <div
            id="quick-category-results"
            className="mt-8 p-6 sm:p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-dark)]">
                  فنيين تخصص:{' '}
                  <span style={{ color: activeColor }}>
                    {selectedCategory}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
                  معاينة لأبرز الفنيين المتاحين حالياً
                </p>
              </div>

              <div className="flex items-center gap-3">
                {categoryWorkers.length > 0 && (
                  <button
                    type="button"
                    onClick={() => navigate(`/jobs?category=${encodeURIComponent(selectedCategory)}`)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#263174] hover:bg-[#1b2353] text-white text-xs sm:text-sm font-black transition-all duration-200 active:scale-95 shadow-md cursor-pointer hover:shadow-lg"
                  >
                    <span>عرض الكل ({categoryWorkers.length})</span>
                  
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClosePreview}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-[var(--text-dark)] transition-all cursor-pointer border border-[var(--border-color)] shadow-sm hover:scale-105"
                  title="إغلاق المعاينة"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>
            </div>

            {previewWorkers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {previewWorkers.map((worker) => (
                  <WorkerCard
                    key={worker.id || worker._id}
                    worker={worker}
                    categories={categories}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)]">
                <p className="text-sm text-[var(--text-muted)] font-medium">
                  لا يوجد فنيون مسجلون حالياً في تخصص "{selectedCategory}".
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      <Reveal delay={80}>
        <TopWorkersSection
          topWorkers={topWorkers}
          categories={categories}
          title="أفضل الفنيين تقييماً"
        />
      </Reveal>

    
      <Reveal delay={80}>
        <HowItWorks jobsList={jobsList} projectsList={projectsList} />
      </Reveal>

      <Reveal delay={80}>
        <Testimonials reviewsList={reviewsList} jobsList={jobsList} />
      </Reveal>

      <Reveal delay={80}>
        <section className="bg-[var(--bg-main)] pt-12 sm:pt-20 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FaqSection />
          </div>
        </section>
      </Reveal>

    </div>
  );
}