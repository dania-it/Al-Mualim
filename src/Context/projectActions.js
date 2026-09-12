import {
  createProject,
  assignWorker,
  advanceProject,
  cancelProject,
} from "../api/index";

export const addProject = async (
  projectData,
  setProjectsList
) => {
  const data =
    await createProject(
      projectData
    );

  setProjectsList((prev) => [
    data.project,
    ...prev,
  ]);

  return data.project;
};
export const assignWorkerToProject =
  async (
    id,
    workerName,
    setProjectsList
  ) => {
    const data =
      await assignWorker(
        id,
        workerName
      );

    setProjectsList((prev) =>
      prev.map((project) =>
        String(project.id) ===
        String(id)
          ? data.project
          : project
      )
    );

    return data.project;
  };

export const advanceProjectStep =
  async (
    id,
    setProjectsList
  ) => {
    try {
      const data =
        await advanceProject(id);

      setProjectsList((prev) =>
        prev.map((project) =>
          String(project.id) ===
          String(id)
            ? data.project
            : project
        )
      );

      return data.project;
    } catch (error) {
      console.log(
        "Advance project fallback:",
        error
      );

      setProjectsList((prev) =>
        prev.map((project) => {
          if (
            String(project.id) !==
            String(id)
          ) {
            return project;
          }

          const next =
            Math.min(
              Number(
                project.statusStep ||
                  1
              ) + 1,
              5
            );

          return {
            ...project,
            statusStep: next,
          };
        })
      );

      return null;
    }
  };

export const cancelProjectFn =
  async (
    projectId,
    reason = "",
    setProjectsList
  ) => {
    try {
      const data =
        await cancelProject(
          projectId,
          reason
        );

      setProjectsList((prev) =>
        prev.map((project) =>
          String(project.id) ===
          String(projectId)
            ? data.project
            : project
        )
      );

      return data;
    } catch (error) {
      console.log(
        "Cancel project fallback:",
        error
      );

      setProjectsList((prev) =>
        prev.map((project) =>
          String(project.id) ===
          String(projectId)
            ? {
                ...project,
                statusStep: 0,
              }
            : project
        )
      );

      return null;
    }
  };