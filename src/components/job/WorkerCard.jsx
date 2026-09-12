import { Link } from "react-router-dom";
import { useApp } from "../../Context/AppContext";
import HighlightedText from "../search/HighlightedText";
import { normalizeArabicText } from "../search/useInstantSearch";
import localData from "../../data/jobs.json";

export default function WorkerCard({ worker, highlightTerm = "" }) {
  const app = useApp();

  const categories = localData.categories || [];

  const catData = categories.find(
    (c) => c.key === worker.category || c.name === worker.category,
  ) || {
    icon: "fa-solid fa-toolbox",
    color: "#263174",
  };

  const { count, rating } =
    typeof app.getReviewStats === "function"
      ? app.getReviewStats(worker.id, worker)
      : {
          count: worker.reviewsCount || 0,
          rating: worker.rating || 0,
        };

  const normalizedTerm = highlightTerm
    ? normalizeArabicText(highlightTerm)
    : "";

  const residenceText = worker.residence;
  const addressText = worker.detailedAddress;
  const governorateText = worker.governorate;

  let locationText = residenceText || addressText || governorateText;

  if (normalizedTerm) {
    if (
      residenceText &&
      normalizeArabicText(residenceText).includes(normalizedTerm)
    ) {
      locationText = residenceText;
    } else if (
      addressText &&
      normalizeArabicText(addressText).includes(normalizedTerm)
    ) {
      locationText = addressText;
    } else if (
      governorateText &&
      normalizeArabicText(governorateText).includes(normalizedTerm)
    ) {
      locationText = governorateText;
    }
  }

  return (
    <article
      className="
        group
        relative
        w-full
        bg-white
        rounded-3xl
        p-[2px]
        transition-all
        duration-300
        hover:-translate-y-1.5
        font-tajawal
        shadow-sm
        hover:shadow-xl
        hover:shadow-slate-300/40
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0
          rounded-3xl
          border
          border-slate-300
          pointer-events-none
          transition-opacity
          duration-300
          group-hover:opacity-0
        "
      />

      <div
        className="
          absolute
          -inset-[150%]
          rounded-3xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
          group-hover:animate-[spin_4s_linear_infinite]
        "
        style={{
          background: `
            conic-gradient(
              from 0deg,
              transparent 0%,
              ${catData.color} 25%,
              #ffffff 50%,
              ${catData.color} 75%,
              transparent 100%
            )
          `,
        }}
      />

      <div
        className="
          relative
          z-10
          w-full
          h-full
          bg-white
          rounded-[22px]
          overflow-hidden
          flex
          flex-col
          justify-between
          p-5
          sm:p-6
        "
      >
        <div
          className="
            h-20
            w-full
            absolute
            top-0
            left-0
            pointer-events-none
          "
          style={{
            background: `
              radial-gradient(
                circle at 0% 0%,
                ${catData.color}10 0%,
                ${catData.color}07 25%,
                ${catData.color}03 50%,
                transparent 75%
              )
            `,
          }}
        />

        <div>
          <div
            className="
              flex
              items-start
              justify-between
              gap-3
              relative
              z-10
            "
          >
            <div className="relative">
              {worker.workerAvatar ? (
                <img
                  src={worker.workerAvatar}
                  alt={worker.workerName}
                  className="
                    w-16
                    h-16
                    sm:w-18
                    sm:h-18
                    rounded-2xl
                    object-cover
                    border-2
                    border-white
                    shadow-md
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              ) : (
                <div
                  className="
                    w-16
                    h-16
                    sm:w-18
                    sm:h-18
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-2xl
                    border-2
                    border-white
                    shadow-md
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    background: `${catData.color}0d`,
                    color: catData.color,
                  }}
                >
                  <i className="fa-solid fa-helmet-safety" />
                </div>
              )}

              {count > 0 && (
                <div
                  className="
                    absolute
                    -bottom-2
                    -right-1
                    bg-white/95
                    backdrop-blur-md
                    px-2
                    py-0.5
                    rounded-full
                    border
                    border-slate-100
                    shadow-xs
                    flex
                    items-center
                    gap-1
                    text-[11px]
                    font-black
                  "
                >
                  <i className="fa-solid fa-star text-[#ffb53e]" />

                  <span className="text-slate-800">{rating}</span>
                </div>
              )}
            </div>

            <div
              className="
                text-left
                bg-slate-50/90
                backdrop-blur-sm
                px-3.5
                py-2
                rounded-2xl
                border
                border-slate-100/80
              "
            >
              <span
                className="
                  text-[10px]
                  text-slate-400
                  font-bold
                  block
                  text-center
                "
              >
                السعر المبدئي
              </span>

              <strong
                className="
                  block
                  text-lg
                  sm:text-xl
                  font-black
                  text-[#263174]
                  tracking-tight
                  text-center
                "
              >
                {worker.price || 0}$
              </strong>
            </div>
          </div>

          <div className="mt-4 relative z-10">
            <h3
              className="
                font-black
                text-[#080d28]
                text-base
                sm:text-lg
                truncate
                leading-snug
              "
            >
              {highlightTerm ? (
                <HighlightedText
                  text={worker.workerName}
                  highlight={highlightTerm}
                />
              ) : (
                worker.workerName
              )}
            </h3>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  px-3
                  py-1
                  rounded-xl
                  text-xs
                  font-bold
                  transition-all
                  duration-300
                "
                style={{
                  color: catData.color,
                  background: `${catData.color}0d`,
                  border: `1px solid ${catData.color}15`,
                }}
              >
                <i className={catData.icon} />

                {worker.category}
              </span>

              {locationText && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    text-xs
                    text-slate-400
                    font-medium
                    truncate
                  "
                >
                  <i
                    className="
                      fa-solid
                      fa-location-dot
                      text-slate-300
                    "
                  />

                  {highlightTerm ? (
                    <HighlightedText
                      text={locationText}
                      highlight={highlightTerm}
                    />
                  ) : (
                    locationText
                  )}
                </span>
              )}
            </div>
          </div>

          <p
            className="
              text-xs
              sm:text-sm
              text-slate-600
              font-medium
              leading-relaxed
              mt-3.5
              line-clamp-2
              min-h-[40px]
              relative
              z-10
            "
          >
            {highlightTerm ? (
              <HighlightedText
                text={worker.title || ""}
                highlight={highlightTerm}
              />
            ) : (
              worker.title
            )}
          </p>
        </div>

        <div
          className="
            mt-5
            pt-4
            border-t
            border-slate-100
            flex
            items-center
            justify-between
            gap-3
            relative
            z-10
          "
        >
          <div className="text-xs font-bold text-slate-400">
            {count > 0 ? (
              <span>({count} تقييم)</span>
            ) : (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold"
                style={{
                  color: catData.color,
                  backgroundColor: `${catData.color}0d`,
                  border: `1px solid ${catData.color}25`,
                }}
              >
                فني جديد
              </span>
            )}
          </div>

          <Link
            to={`/jobs/${worker.id}`}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-[#263174]
              hover:bg-[#1b2353]
              text-white
              text-xs
              sm:text-sm
              font-bold
              transition-all
              duration-200
              active:scale-95
              shadow-md
              hover:shadow-lg
            "
          >
            <span>التفاصيل</span>
          </Link>
        </div>
      </div>
    </article>
  );
}