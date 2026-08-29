import api from "./client";


export const getCategories = () =>
  api.get("/categories").then((r) => r.data);

export const getSiteMeta = () =>
  api.get("/site").then((r) => r.data);


export const getWorkers = (params) =>
  api
    .get("/workers", { params })
    .then((r) => r.data);

export const getWorkerById = (id) => {
  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    return Promise.reject(
      new Error(
        "معرف الفني غير موجود"
      )
    );
  }

  return api
    .get(`/workers/${id}`)
    .then((r) => r.data);
};

export const registerWorker = (body) =>
  api
    .post("/workers", body)
    .then((r) => r.data);

export const loginWorkerAPI = (
  email,
  password
) =>
  api
    .post("/workers/login", {
      email,
      password,
    })
    .then((r) => r.data);

export const updateWorkerStatus = (
  id,
  status
) =>
  api
    .patch(`/workers/${id}/status`, {
      status,
    })
    .then((r) => r.data);

export const markWorkerDelay = (id) => {
  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    return Promise.reject(
      new Error(
        "معرف الفني غير موجود"
      )
    );
  }

  return api
    .patch(`/workers/${id}/delay`)
    .then((r) => r.data);
};

export const updateWorkerProfile = (
  id,
  body
) =>
  api
    .patch(
      `/workers/${id}/profile`,
      body
    )
    .then((r) => r.data);


export const getClients = () =>
  api.get("/clients").then((r) => r.data);

export const registerClient = (body) =>
  api.post("/clients", body).then((r) => r.data);

export const loginClientAPI = (email, password) =>
  api
    .post("/clients/login", {
      email,
      password,
    })
    .then((r) => r.data);

export const updateClientProfile = (id, body) =>
  api
    .patch(`/clients/${id}/profile`, body)
    .then((r) => r.data);

export const toggleBlockClientAPI = (id) =>
  api
    .patch(`/clients/${id}/block`)
    .then((r) => r.data);

export const deleteClientAPI = (id) =>
  api
    .delete(`/clients/${id}`)
    .then((r) => r.data);

export const loginAdmin = (email, password) =>
  api
    .post("/admin/login", {
      email,
      password,
    })
    .then((r) => r.data);


export const getProjects = (params) =>
  api.get("/projects", { params }).then((r) => r.data);

export const createProject = (body) =>
  api.post("/projects", body).then((r) => r.data);

export const assignWorker = (id, workerName) =>
  api
    .patch(`/projects/${id}/assign`, {
      workerName,
    })
    .then((r) => r.data);

export const advanceProject = (id) =>
  api
    .patch(`/projects/${id}/advance`)
    .then((r) => r.data);

export const cancelProject = (id, reason) =>
  api
    .patch(`/projects/${id}/cancel`, {
      reason,
    })
    .then((r) => r.data);



export const getReviews = (
  workerId
) =>
  api
    .get(`/reviews/${workerId}`)
    .then((r) => r.data);

export const postReview = (
  workerId,
  body
) =>
  api
    .post(`/reviews/${workerId}`, body)
    .then((r) => r.data);