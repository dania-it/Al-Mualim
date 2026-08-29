
import React, {
  useState,
  useEffect,
} from "react";

export default function WorkersTab({
  approvedWorkers = [],
  getBusyProject = () => null,
  onRemove = () => {},
  onDelay = () => {},
  reviewsList = {},
  projectsList = [],
}) {


  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");


  const [workerToDelete, setWorkerToDelete] =
    useState(null);

  

  const [workerToWarn, setWorkerToWarn] =
    useState(null);



  useEffect(() => {
    if (!workerToWarn) {
      return;
    }

    const selectedId =
      workerToWarn.id ??
      workerToWarn._id;

    const updatedWorker =
      approvedWorkers.find((worker) => {
        const workerId =
          worker.id ??
          worker._id;

        return (
          String(workerId) ===
          String(selectedId)
        );
      });

    if (updatedWorker) {
      setWorkerToWarn(updatedWorker);
    }
  }, [
    approvedWorkers,
    workerToWarn?.id,
    workerToWarn?._id,
  ]);



  const filteredWorkers =
    approvedWorkers.filter((worker) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        worker.workerName
          ?.toLowerCase()
          .includes(search) ||
        worker.profession
          ?.toLowerCase()
          .includes(search) ||
        worker.city
          ?.toLowerCase()
          .includes(search);

      const busyProject =
        getBusyProject(
          worker.workerName
        );

      const isBusy =
        !!busyProject;

      if (
        statusFilter ===
        "available"
      ) {
        return (
          matchesSearch &&
          !isBusy
        );
      }

      if (
        statusFilter ===
        "busy"
      ) {
        return (
          matchesSearch &&
          isBusy
        );
      }

      return matchesSearch;
    });


  const getWorkerPhone = (
    worker
  ) => {
    return (
      worker.phone ??
      worker.phoneNumber ??
      worker.mobile ??
      worker.mobileNumber ??
      worker.telephone ??
      worker.tel ??
      worker.contactNumber ??
      ""
    );
  };


  const getDelaysCount = (
    worker
  ) => {
    return Number(
      worker.delaysCount ??
        worker.delays ??
        worker.delayCount ??
        0
    );
  };


  const handleOpenWarning = (
    worker
  ) => {
    setWorkerToWarn(worker);
  };


  const handleConfirmWarning =
    async () => {
      if (!workerToWarn) {
        return;
      }

      const workerId =
        workerToWarn.id ??
        workerToWarn._id;

      if (
        workerId === undefined ||
        workerId === null ||
        workerId === ""
      ) {
        console.error(
          "لا يوجد ID للفني لتسجيل التحذير"
        );

        setWorkerToWarn(null);

        return;
      }

      try {
        await onDelay(workerId);
      } catch (error) {
        console.error(
          "تعذر تسجيل التحذير:",
          error
        );
      }

      setWorkerToWarn(null);
    };


  const handleConfirmRemove =
    async () => {
      if (!workerToDelete) {
        return;
      }

      const workerId =
        workerToDelete.id ??
        workerToDelete._id;

      try {
        if (
          workerId !== undefined &&
          workerId !== null
        ) {
          await onRemove(workerId);
        } else {
          await onRemove(
            workerToDelete.workerName
          );
        }
      } catch (error) {
        console.error(
          "تعذر إزالة الفني:",
          error
        );
      }

      setWorkerToDelete(null);
    };


    

  return (
    <div className="space-y-6">



      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          justify-between
          gap-4
          bg-white
          p-5
          rounded-2xl
          border
          border-slate-200
          shadow-sm
        "
      >

        <div>
          <h2
            className="
              text-xl
              font-bold
              text-[#080d28]
              flex
              items-center
              gap-2
            "
          >
            <i className="fa-solid fa-helmet-safety text-[#263174]"></i>

            قائمة الفنيين المعتمدين
          </h2>

          <p
            className="
              text-xs
              text-slate-500
              mt-1
            "
          >
            إدارة الفنيين وحالات عملهم وتحذيراتهم
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >


          <div className="relative">

            <i
              className="
                fa-solid
                fa-magnifying-glass
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                text-xs
              "
            ></i>

            <input
              type="text"
              placeholder="بحث باسم الفني، المهنة، المدينة..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="
                pr-9
                pl-4
                py-2
                bg-slate-50
                border
                border-slate-200
                rounded-xl
                text-xs
                focus:outline-none
                focus:border-[#263174]
                w-64
              "
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="
              px-3
              py-2
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              text-xs
              font-semibold
              text-slate-700
              focus:outline-none
              focus:border-[#263174]
            "
          >

            <option value="all">
              جميع الحالات (
              {approvedWorkers.length}
              )
            </option>

            <option value="available">
              متاح فقط
            </option>

            <option value="busy">
              قيد العمل فقط
            </option>

          </select>

        </div>
      </div>



      <div
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table
            className="
              w-full
              text-right
              text-xs
            "
          >

            <thead
              className="
                bg-slate-50
                border-b
                border-slate-200
                text-slate-600
                font-bold
              "
            >

              <tr>

                <th className="p-4">
                  الفني
                </th>

                <th className="p-4">
                  التخصص والمدينة
                </th>

                <th className="p-4">
                  الحالة والعمل الحالي
                </th>

                <th className="p-4 text-center">
                  التقييم
                </th>

                <th className="p-4 text-center">
                  المشاريع المكتملة
                </th>

                <th className="p-4 text-center">
                  التحذيرات
                </th>

                <th className="p-4 text-center">
                  الإجراءات
                </th>

              </tr>

            </thead>

            <tbody
              className="
                divide-y
                divide-slate-100
              "
            >

              {filteredWorkers.length >
              0 ? (

                filteredWorkers.map(
                  (worker) => {

                    const busyProject =
                      getBusyProject(
                        worker.workerName
                      );

                    const isBusy =
                      !!busyProject;

                    const delaysCount =
                      getDelaysCount(
                        worker
                      );


                    const completedProjects =
                      Number(
                        worker.completedJobs ||
                          0
                      ) +
                      projectsList.filter(
                        (p) =>
                          p.assignedWorker ===
                            worker.workerName &&
                          (
                            Number(
                              p.statusStep
                            ) >= 5 ||
                            p.status ===
                              "منجزة"
                          )
                      ).length;

                    const phone =
                      getWorkerPhone(
                        worker
                      );

                    return (
                      <tr
                        key={
                          worker.id ??
                          worker._id ??
                          worker.workerName
                        }
                        className="
                          hover:bg-slate-50/80
                          transition-colors
                        "
                      >


                        <td className="p-4">

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >

                            {worker.avatar ? (

                              <img
                                src={
                                  worker.avatar
                                }
                                alt={
                                  worker.workerName
                                }
                                className="
                                  w-10
                                  h-10
                                  rounded-xl
                                  object-cover
                                  border
                                  border-slate-200
                                "
                              />

                            ) : (

                              <div
                                className="
                                  w-10
                                  h-10
                                  rounded-xl
                                  bg-[#263174]/10
                                  text-[#263174]
                                  flex
                                  items-center
                                  justify-center
                                  font-bold
                                  text-sm
                                "
                              >
                                {
                                  worker.workerName?.[0] ||
                                  "ف"
                                }
                              </div>

                            )}

                            <div>

                              <p
                                className="
                                  font-bold
                                  text-slate-800
                                  text-sm
                                "
                              >
                                {
                                  worker.workerName
                                }
                              </p>

                              <p
                                className="
                                  text-[11px]
                                  text-slate-400
                                "
                              >
                                {
                                  phone ||
                                  "بدون رقم"
                                }
                              </p>

                            </div>

                          </div>

                        </td>



                        <td className="p-4">

                          <p
                            className="
                              font-semibold
                              text-slate-700
                            "
                          >
                            {
                              worker.profession ||
                              worker.category ||
                              "غير محدد"
                            }
                          </p>

                          <p
                            className="
                              text-[11px]
                              text-slate-400
                              flex
                              items-center
                              gap-1
                              mt-0.5
                            "
                          >

                            <i className="fa-solid fa-location-dot text-slate-300"></i>

                            {
                              worker.city ||
                              worker.residence ||
                              "غير محدد"
                            }

                          </p>

                        </td>



                        <td className="p-4">

                          {isBusy ? (

                            <div className="space-y-1">

                              <span
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  px-2.5
                                  py-1
                                  rounded-lg
                                  bg-amber-500/10
                                  text-amber-700
                                  text-[11px]
                                  font-bold
                                  border
                                  border-amber-500/20
                                "
                              >

                                <i className="fa-solid fa-lock text-[10px]"></i>

                                قيد العمل

                              </span>

                              <p
                                className="
                                  text-[11px]
                                  text-slate-500
                                  max-w-[200px]
                                  truncate
                                "
                                title={
                                  busyProject.title
                                }
                              >
                                {
                                  busyProject.title
                                }
                              </p>

                            </div>

                          ) : (

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                px-2.5
                                py-1
                                rounded-lg
                                bg-emerald-500/10
                                text-emerald-700
                                text-[11px]
                                font-bold
                                border
                                border-emerald-500/20
                              "
                            >

                              <i className="fa-solid fa-circle-check text-[10px]"></i>

                              متاح

                            </span>

                          )}

                        </td>

      

                        <td className="p-4 text-center">

                          <div
                            className="
                              inline-flex
                              items-center
                              gap-1
                              bg-amber-50
                              px-2
                              py-1
                              rounded-lg
                              border
                              border-amber-200
                            "
                          >

                            <i className="fa-solid fa-star text-amber-500 text-[11px]"></i>

                            <span
                              className="
                                font-bold
                                text-amber-800
                              "
                            >
                              {
                                worker.rating ||
                                "4.5"
                              }
                            </span>

                          </div>

                        </td>


                        <td
                          className="
                            p-4
                            text-center
                            font-bold
                            text-slate-700
                          "
                        >
                          {
                            completedProjects
                          }
                        </td>


                        <td className="p-4 text-center">

                          <span
                            className={`
                              inline-block
                              font-bold
                              px-2
                              py-0.5
                              rounded-md

                              ${
                                delaysCount >= 2
                                  ? "bg-red-50 text-red-600 border border-red-200"
                                  : delaysCount === 1
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "text-slate-500"
                              }
                            `}
                          >
                            {delaysCount} / 3
                          </span>

                        </td>


                        <td className="p-4 text-center">

                          <div
                            className="
                              flex
                              items-center
                              justify-center
                              gap-2
                            "
                          >

                            <button
                              type="button"
                              onClick={() =>
                                handleOpenWarning(
                                  worker
                                )
                              }
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                bg-amber-50
                                hover:bg-amber-500
                                text-amber-700
                                hover:text-white
                                px-3
                                py-1.5
                                rounded-xl
                                font-bold
                                text-[11px]
                                transition-all
                                duration-200
                                border
                                border-amber-200
                                hover:border-amber-500
                                shadow-sm
                              "
                              title="تسجيل تحذير للفني"
                            >

                              <i className="fa-solid fa-triangle-exclamation"></i>

                              تحذير

                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                setWorkerToDelete(
                                  worker
                                )
                              }
                              className="
                                inline-flex
                                items-center
                                justify-center
                                w-8
                                h-8
                                bg-red-50
                                hover:bg-red-500
                                text-red-600
                                hover:text-white
                                rounded-xl
                                transition-all
                                duration-200
                                border
                                border-red-200
                                hover:border-red-500
                                shadow-sm
                              "
                              title="إزالة الفني من المنصة"
                            >

                              <i className="fa-solid fa-user-xmark text-xs"></i>

                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="
                      text-center
                      py-12
                      text-slate-400
                    "
                  >

                    <i
                      className="
                        fa-solid
                        fa-user-slash
                        text-3xl
                        mb-2
                        block
                      "
                    ></i>

                    لا يوجد فنيون يطابقون شروط البحث

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {workerToWarn && (() => {

        const currentDelays =
          getDelaysCount(
            workerToWarn
          );

        const isFinalWarning =
          currentDelays >= 2;

        return (
          <div
            dir="rtl"
            className="
              fixed
              inset-0
              z-[200]
              flex
              items-center
              justify-center
              bg-slate-900/60
              backdrop-blur-sm
              p-4
            "
          >

            <div
              className="
                bg-white
                w-full
                max-w-md
                rounded-3xl
                p-6
                border
                border-slate-100
                shadow-2xl
                text-center
                space-y-5
              "
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
                  mx-auto
                  shadow-inner

                  ${
                    isFinalWarning
                      ? "bg-red-100 text-red-600"
                      : "bg-amber-100 text-amber-600"
                  }
                `}
              >

                <i className="fa-solid fa-triangle-exclamation"></i>

              </div>

      
              <div>

                <h3
                  className={`
                    text-lg
                    font-bold

                    ${
                      isFinalWarning
                        ? "text-red-700"
                        : "text-slate-900"
                    }
                  `}
                >

                  {isFinalWarning
                    ? "تحذير أخير للفني"
                    : "تأكيد تسجيل التحذير"}

                </h3>

                <p
                  className="
                    text-xs
                    text-slate-500
                    leading-relaxed
                    mt-2
                  "
                >

                  هل أنت متأكد من تسجيل تحذير للفني{" "}

                  <span
                    className="
                      font-bold
                      text-slate-800
                    "
                  >
                    "{workerToWarn.workerName}"
                  </span>

                  ؟

                </p>


                {isFinalWarning ? (

                  <div
                    className="
                      mt-4
                      bg-red-50
                      border
                      border-red-200
                      rounded-2xl
                      p-4
                      text-right
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-bold
                        text-red-700
                        leading-relaxed
                      "
                    >

                      ⚠️ هذا هو التحذير الأخير للفني.

                    </p>

                    <p
                      className="
                        text-[11px]
                        text-red-600
                        leading-relaxed
                        mt-1
                      "
                    >

                      عند تأكيد هذا التحذير سيتم إزالة الفني من المنصة نهائياً، ولن يعود ظاهراً ضمن الفنيين المعتمدين.

                    </p>

                  </div>

                ) : (

                  <div
                    className="
                      mt-4
                      bg-amber-50
                      border
                      border-amber-200
                      rounded-2xl
                      p-3
                      text-right
                    "
                  >

                    <p
                      className="
                        text-[11px]
                        text-amber-700
                        leading-relaxed
                      "
                    >

                      عدد التحذيرات الحالي:{" "}

                      <span className="font-bold">
                        {currentDelays} / 3
                      </span>

                    </p>

                  </div>

                )}

              </div>


              <div
                className="
                  flex
                  items-center
                  gap-3
                  pt-2
                "
              >

                <button
                  type="button"
                  onClick={
                    handleConfirmWarning
                  }
                  className={`
                    flex-1
                    text-white
                    font-bold
                    text-xs
                    py-3
                    rounded-xl
                    transition-all
                    shadow-md

                    ${
                      isFinalWarning
                        ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                        : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
                    }
                  `}
                >

                  {isFinalWarning
                    ? "نعم، تأكيد التحذير والإزالة"
                    : "نعم، تسجيل التحذير"}

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setWorkerToWarn(
                      null
                    )
                  }
                  className="
                    flex-1
                    bg-slate-100
                    hover:bg-slate-200
                    text-slate-700
                    font-bold
                    text-xs
                    py-3
                    rounded-xl
                    transition-all
                  "
                >
                  إلغاء
                </button>

              </div>

            </div>

          </div>
        );
      })()}


      {workerToDelete && (

        <div
          dir="rtl"
          className="
            fixed
            inset-0
            z-[210]
            flex
            items-center
            justify-center
            bg-slate-900/60
            backdrop-blur-sm
            p-4
          "
        >

          <div
            className="
              bg-white
              w-full
              max-w-md
              rounded-3xl
              p-6
              border
              border-slate-100
              shadow-2xl
              text-center
              space-y-5
            "
          >

            <div
              className="
                w-14
                h-14
                bg-red-100
                text-red-600
                rounded-2xl
                flex
                items-center
                justify-center
                text-2xl
                mx-auto
                shadow-inner
              "
            >

              <i className="fa-solid fa-user-xmark"></i>

            </div>


            <div>

              <h3
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                تأكيد إزالة الفني
              </h3>

              <p
                className="
                  text-xs
                  text-slate-500
                  leading-relaxed
                  mt-2
                "
              >

                هل أنت متأكد من إزالة الفني{" "}

                <span
                  className="
                    font-bold
                    text-slate-800
                  "
                >
                  "{workerToDelete.workerName}"
                </span>

                {" "}من المنصة نهائياً؟

                <br />

                لن تتمكن من التراجع عن هذا الإجراء.

              </p>

            </div>
            <div
              className="
                flex
                items-center
                gap-3
                pt-2
              "
            >

              <button
                type="button"
                onClick={
                  handleConfirmRemove
                }
                className="
                  flex-1
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-bold
                  text-xs
                  py-3
                  rounded-xl
                  transition-all
                  shadow-md
                  shadow-red-500/20
                "
              >
                نعم، تأكيد الإزالة
              </button>

              <button
                type="button"
                onClick={() =>
                  setWorkerToDelete(
                    null
                  )
                }
                className="
                  flex-1
                  bg-slate-100
                  hover:bg-slate-200
                  text-slate-700
                  font-bold
                  text-xs
                  py-3
                  rounded-xl
                  transition-all
                "
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}