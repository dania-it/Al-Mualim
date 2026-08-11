import api from './client';

export const getCategories = () => api.get('/categories').then(r => r.data);
export const getSiteMeta = () => api.get('/site').then(r => r.data);

export const getWorkers = (params) => api.get('/workers', { params }).then(r => r.data);
export const getWorkerById = (id) => api.get(`/workers/${id}`).then(r => r.data);
export const registerWorker = (body) => api.post('/workers', body).then(r => r.data);
export const loginWorkerAPI = (email, password) => api.post('/workers/login', { email, password }).then(r => r.data);
export const updateWorkerStatus = (id, status) => api.patch(`/workers/${id}/status`, { status }).then(r => r.data);
export const markWorkerDelay = (id) => api.patch(`/workers/${id}/delay`).then(r => r.data);
export const updateWorkerProfile = (id, body) => api.patch(`/workers/${id}/profile`, body).then(r => r.data);

export const getClients = () => api.get('/clients').then(r => r.data);
export const registerClient = (body) => api.post('/clients', body).then(r => r.data);
export const loginClientAPI = (email, password) => api.post('/clients/login', { email, password }).then(r => r.data);
export const updateClientProfile = (id, body) => api.patch(`/clients/${id}/profile`, body).then(r => r.data);

export const loginAdmin = (email, password) => api.post('/admin/login', { email, password }).then(r => r.data);

export const getProjects = (params) => api.get('/projects', { params }).then(r => r.data);
export const createProject = (body) => api.post('/projects', body).then(r => r.data);
export const assignWorker = (id, workerName) => api.patch(`/projects/${id}/assign`, { workerName }).then(r => r.data);
export const advanceProject = (id) => api.patch(`/projects/${id}/advance`).then(r => r.data);

export const getWarnings = () => api.get('/warnings').then(r => r.data);
export const sendWarning = (workerName, message) => api.post('/warnings', { workerName, message }).then(r => r.data);
