
import {
  updateWorkerStatus,
  markWorkerDelay,
} from "../api/index";

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
    setJobsList((prev) =>
      prev.map((worker) => {
        if (
          String(worker.id) !==
          String(id)
        ) {
          return worker;
        }

        if (returnedWorker) {
          return {
            ...worker,
            ...returnedWorker,
          };
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
    );

    return data;
  } catch (error) {
    console.error(
      "API mark delay error:",
      error
    );

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