import React from "react";
import WorkerStarDisplay from "./WorkerStarDisplay";
import localData from "../../data/jobs.json";

export default function WorkerHeroHeader({
  job,
  displayRating,
  displayReviewsCount,
}) {
  if (!job) return null;

  const categories = localData.categories || [];

  const catData = categories.find(
    (c) => c.key === job.category || c.name === job.category,
  ) || {
    icon: "fa-solid fa-toolbox",
    color: "#263174",
  };

  const catColor = catData.color || "#263174";
  const catIcon = catData.icon || "fa-solid fa-toolbox";

  return (
    <div className="group relative overflow-hidden bg-white p-6 sm:p-8 lg:p-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 0% 0%,
              ${catColor}12 0%,
              ${catColor}0b 20%,
              ${catColor}06 38%,
              ${catColor}03 55%,
              transparent 75%
            )
          `,
        }}
      />

      <div
        className="
          absolute
          -top-32
          -left-32
          w-80
          h-80
          rounded-full
          blur-3xl
          pointer-events-none
          opacity-[0.025]
        "
        style={{
          backgroundColor: catColor,
        }}
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          lg:flex-row
          items-center
          gap-7
          lg:gap-10
        "
      >
        <div className="relative shrink-0">
          {job.workerAvatar ? (
            <img
              src={job.workerAvatar}
              alt={job.workerName}
              className="
                w-32
                h-32
                sm:w-36
                sm:h-36
                lg:w-40
                lg:h-40
                rounded-3xl
                object-cover
                border-2
                border-white
                shadow-md
              "
            />
          ) : (
            <div
              className="
                w-32
                h-32
                sm:w-36
                sm:h-36
                lg:w-40
                lg:h-40
                rounded-3xl
                flex
                items-center
                justify-center
                text-5xl
                border-2
                border-white
                shadow-md
              "
              style={{
                backgroundColor: `${catColor}0d`,
                color: catColor,
              }}
            >
              <i className={catIcon} />
            </div>
          )}

          {job.isVerified && (
            <span
              className="
                absolute
                -bottom-2
                -left-2
                w-9
                h-9
                rounded-full
                bg-green-500
                text-white
                flex
                items-center
                justify-center
                text-sm
                shadow-md
                border-4
                border-white
              "
              title="فني موثق"
            >
              <i className="fa-solid fa-check" />
            </span>
          )}
        </div>

        <div
          className="
            flex-1
            w-full
            text-center
            lg:text-right
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-center
              lg:items-center
              gap-2
              mb-2
            "
          >
            <h1
              className="
                text-3xl
                sm:text-4xl
                font-black
                text-[#080d28]
                leading-tight
              "
            >
              {job.workerName}
            </h1>

            {job.isVerified && (
              <i
                className="
                  fa-solid
                  fa-circle-check
                  text-green-500
                  text-lg
                "
              />
            )}
          </div>

          <p
            className="
              text-lg
              sm:text-xl
              text-slate-500
              mb-5
              font-bold
            "
          >
            {job.title || `فني ${job.category}`}
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              lg:justify-start
              gap-2.5
              mb-5
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold
              "
              style={{
                color: catColor,
                backgroundColor: `${catColor}0d`,
                border: `1px solid ${catColor}18`,
              }}
            >
              <i className={catIcon} />
              {job.category}
            </span>

            {job.residence && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-slate-50
                  text-slate-500
                  border
                  border-slate-100
                  text-sm
                  font-bold
                "
              >
                <i
                  className="
                    fa-solid
                    fa-location-dot
                    text-slate-400
                  "
                />

                {job.residence}
              </span>
            )}
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              lg:justify-start
              gap-3
            "
          >
            {displayReviewsCount > 0 ? (
              <>
                <WorkerStarDisplay value={displayRating} showNum={true} />

                <span
                  className="
                    text-sm
                    text-slate-400
                    font-bold
                  "
                >
                  ({displayReviewsCount} تقييم موثق)
                </span>
              </>
            ) : (
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-400
                  font-medium
                "
              >
                <i
                  className="
                    fa-regular
                    fa-star
                    text-[#ffb53e]
                  "
                />
                فني جديد — بلا تقييمات موثقة بعد
              </span>
            )}
          </div>
        </div>

        <div
          className="
            w-full
            sm:w-auto
            min-w-[190px]
            bg-slate-50/80
            border
            border-slate-100
            rounded-2xl
            px-7
            py-5
            text-center
            shadow-sm
            transition-all
            duration-300
            group-hover:shadow-md
          "
        >
          <span
            className="
              block
              text-xs
              text-slate-400
              font-bold
              mb-1
            "
          >
            السعر التقريبي
          </span>

          <strong
            className="
              block
              text-3xl
              font-black
              text-[#263174]
              tracking-tight
            "
          >
            {job.price || "35"}$
          </strong>

          <span
            className="
              block
              text-xs
              text-slate-400
              mt-2
              font-medium
              leading-5
            "
          >
            السعر قابل للزيادة أو النقصان
            <br />
            حسب طبيعة العمل
          </span>
        </div>
      </div>
    </div>
  );
}
