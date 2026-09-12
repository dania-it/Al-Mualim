
export default function CategoryGrid({
  categories = [],
  jobsList = [],
  activeCategory = null,
  onSelect,
}) {
  const allCategory = {
    key: "الكل",
    icon: "fa-solid fa-border-all",
    color: "#263174",
  };

  const filteredCategories = categories.filter((c) => c.key && c.key !== "الكل");
  const slides = [allCategory, ...filteredCategories];

  const countFor = (key) => {
    if (key === "الكل") {
      return jobsList.filter((w) => w.status === "approved").length;
    }
    return jobsList.filter((w) => w.status === "approved" && w.category === key).length;
  };

  return (
    <section className="w-full py-8 text-base font-tajawal" dir="rtl">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-dark)] leading-tight">
          دليل التخصصات والخدمات
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] font-medium">
          اختر المجال الذي تحتاجه لمعاينة الفنيين المتاحين فوراً
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {slides.map((cat) => {
          const isActive = activeCategory !== null && activeCategory !== undefined && activeCategory === cat.key;
          const count = countFor(cat.key);

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onSelect && onSelect(cat.key)}
              style={{ "--cat-color": cat.color || "var(--primary)" }}
              className={`
                group
                relative
                flex
                flex-col
                items-center
                justify-center
                gap-3
                p-5
                rounded-2xl
                border-2
                cursor-pointer
                transition-all
                duration-200
                ease-out
                ${
                  isActive
                    ? "bg-white border-[color:var(--cat-color)] shadow-xl -translate-y-1.5"
                    : "bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[color:var(--cat-color)] hover:-translate-y-1 hover:shadow-md"
                }
              `}
            >
              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-2xl
                  transition-all
                  duration-200
                  ${isActive ? "scale-110" : "group-hover:scale-105"}
                `}
                style={{
                  backgroundColor: `${cat.color || "#263174"}18`,
                  color: cat.color || "var(--primary)",
                }}
              >
                <i className={cat.icon} />
              </div>

              <div className="text-center flex flex-col gap-1">
                <span className="text-base font-extrabold text-[var(--text-dark)] leading-snug">
                  {cat.key}
                </span>

                <span className="text-xs sm:text-sm font-bold text-[var(--text-muted)]">
                  {count} متاح
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}