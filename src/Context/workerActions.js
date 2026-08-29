// src/Context/workerActions.js

import {
  updateWorkerStatus,
  markWorkerDelay,
} from "../api/index";

// =======================================================
// Approve Worker
// =======================================================

export const approveWorker = async (
  id,
  setJobsList
) => {
  try {
    await updateWorkerStatus(
      id,
      "approved"
    );
  } catch (error) {
    console.log(
      "API approve fallback:",
      error
    );
  }

  setJobsList((prev) =>
    prev.map((worker) =>
      String(worker.id) ===
      String(id)
        ? {
            ...worker,
            status: "approved",
          }
        : worker
    )
  );
};

// =======================================================
// Reject Worker
// =======================================================

export const rejectWorker = async (
  id,
  setJobsList
) => {
  try {
    await updateWorkerStatus(
      id,
      "rejected"
    );
  } catch (error) {
    console.log(
      "API reject fallback:",
      error
    );
  }

  setJobsList((prev) =>
    prev.filter(
      (worker) =>
        String(worker.id) !==
        String(id)
    )
  );
};

// =======================================================
// Change Worker Status
// =======================================================

export const changeWorkerStatus = async (
  id,
  status,
  setJobsList
) => {
  const data =
    await updateWorkerStatus(
      id,
      status
    );

  if (status === "removed") {
    setJobsList((prev) =>
      prev.filter(
        (worker) =>
          String(worker.id) !==
          String(id)
      )
    );
  } else {
    setJobsList((prev) =>
      prev.map((worker) =>
        String(worker.id) ===
        String(id)
          ? data.worker
          : worker
      )
    );
  }

  return data;
};

// =======================================================
// Remove Worker
// =======================================================

export const removeWorker = async (
  id,
  setJobsList
) => {
  try {
    await updateWorkerStatus(
      id,
      "removed"
    );
  } catch (error) {
    console.log(
      "API remove fallback:",
      error
    );
  }

  setJobsList((prev) =>
    prev.filter(
      (worker) =>
        String(worker.id) !==
        String(id)
    )
  );
};

// =======================================================
// Delay Worker
// =======================================================

export const markDelay = async (
  id,
  setJobsList
) => {
  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    console.error(
      "MARK DELAY: worker id is missing"
    );

    return null;
  }

  try {
    const data =
      await markWorkerDelay(id);

    console.log(
      "========== WORKER DELAY =========="
    );

    console.log(
      "worker id:",
      id
    );

    console.log(
      "delay response:",
      data
    );

    const returnedWorker =
      data?.worker;

    // ---------------------------------------------------
    // إذا السيرفر قرر إزالة الفني
    // ---------------------------------------------------

    if (
      data &&
      data.autoRemoved
    ) {
      setJobsList((prev) =>
        prev.filter(
          (worker) =>
            String(worker.id) !==
            String(id)
        )
      );

      return data;
    }

    // ---------------------------------------------------
    // تحديث الفني بعد التأخير
    // ---------------------------------------------------

    setJobsList((prev) =>
      prev.map((worker) => {
        if (
          String(worker.id) !==
          String(id)
        ) {
          return worker;
        }

        // السيرفر أعاد الفني
        if (returnedWorker) {
          return {
            ...worker,
            ...returnedWorker,
          };
        }

        // السيرفر لم يعد worker
        const currentDelays =
          Number(
            worker.delaysCount ??
              worker.delays ??
              0
          );

        const newDelays =
          currentDelays + 1;

        return {
          ...worker,
          delays: newDelays,
          delaysCount: newDelays,
        };
      })
    );

    return data;
  } catch (error) {
    console.error(
      "API mark delay error:",
      error
    );

    // ---------------------------------------------------
    // Fallback
    // ---------------------------------------------------

    setJobsList((prev) =>
      prev
        .map((worker) => {
          if (
            String(worker.id) !==
            String(id)
          ) {
            return worker;
          }

          const currentDelays =
            Number(
              worker.delaysCount ??
                worker.delays ??
                0
            );

          const newDelays =
            currentDelays + 1;

          return {
            ...worker,
            delays: newDelays,
            delaysCount: newDelays,
          };
        })
        .filter((worker) => {
          const delays =
            Number(
              worker.delaysCount ??
                worker.delays ??
                0
            );

          return delays < 3;
        })
    );

    return null;
  }
};