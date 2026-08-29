import { createContext, useContext, useState, useEffect } from "react";
import { getWorkers, getClients, getProjects } from "../api/index";
import localData from "../data/jobs.json";
import { loginWorker, loginClient, loginAdminFn, addWorker, addClient, updateProfile } from "./authActions";
import { approveWorker, rejectWorker, changeWorkerStatus, removeWorker, markDelay } from "./workerActions";
import { toggleBlockClient } from "./clientActions";
import { addProject, assignWorkerToProject, advanceProjectStep, cancelProjectFn } from "./projectActions";
import { addReview, fetchReviews, getReviewStats } from "./reviewActions";

const AppContext = createContext();
const USER_STORAGE_KEY = "platform_user";

function indexReviewsByWorker(reviews = []) {
  return reviews.reduce((acc, review) => {
    if (!acc[review.workerId]) acc[review.workerId] = [];
    acc[review.workerId].push(review);
    return acc;
  }, {});
}

export function AppProvider({ children }) {
  const [user, setUserState] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [jobsList, setJobsList] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [reviewsList, setReviewsList] = useState({});

  const setUser = (u) => {
    setUserState(u);
    try {
      if (u) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(USER_STORAGE_KEY);
    } catch {}
  };

  const logout = () => setUser(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const [workers, clients, projects] = await Promise.all([getWorkers(), getClients(), getProjects()]);
        if (!mounted) return;

        setJobsList(Array.isArray(workers) ? workers : []);
        setClientsList(Array.isArray(clients) ? clients : []);
        setProjectsList(Array.isArray(projects) ? projects : []);
        setReviewsList(indexReviewsByWorker(localData.reviews || []));
      } catch (error) {
        console.error("APP CONTEXT LOAD ERROR:", error);
        if (!mounted) return;
        setJobsList(Array.isArray(localData) ? localData : localData.workers || []);
        setReviewsList(indexReviewsByWorker(localData.reviews || []));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => { mounted = false; };
  }, []);

  const handleLoginWorker = (email, password) => loginWorker(email, password, setUser);
  const handleLoginClient = (email, password) => loginClient(email, password, setUser);
  const handleLoginAdmin = (email, password) => loginAdminFn(email, password, setUser);
  const handleAddWorker = (workerData) => addWorker(workerData, setJobsList);
  const handleAddClient = (clientData) => addClient(clientData, setClientsList);
  const handleUpdateProfile = (body) => updateProfile(user, body, setUser, setJobsList);
  const handleApproveWorker = (id) => approveWorker(id, setJobsList);
  const handleRejectWorker = (id) => rejectWorker(id, setJobsList);
  const handleChangeWorkerStatus = (id, status) => changeWorkerStatus(id, status, setJobsList);
  const handleRemoveWorker = (id) => removeWorker(id, setJobsList);
  const handleMarkDelay = (id) => markDelay(id, setJobsList);
  const handleToggleBlockClient = (id) => toggleBlockClient(id, setClientsList);
  const handleAddProject = (projectData) => addProject(projectData, setProjectsList);
  const handleAssignWorkerToProject = (id, workerName) => assignWorkerToProject(id, workerName, setProjectsList);
  const handleAdvanceProjectStep = (id) => advanceProjectStep(id, setProjectsList);
  const handleCancelProject = (projectId, reason = "") => cancelProjectFn(projectId, reason, setProjectsList);
  const handleFetchReviews = (workerId) => fetchReviews(workerId, reviewsList, setReviewsList);
  const handleAddReview = (workerId, reviewData) => addReview(workerId, reviewData, reviewsList, setReviewsList, setJobsList);
  const handleGetReviewStats = (workerId, fallbackWorker) => getReviewStats(workerId, fallbackWorker, reviewsList);

  return (
    <AppContext.Provider value={{
      user, setUser, logout, loading,
      jobsList, setJobsList, clientsList, setClientsList, projectsList, setProjectsList, reviewsList,
      loginWorker: handleLoginWorker, loginClient: handleLoginClient, loginAdminFn: handleLoginAdmin,
      addWorker: handleAddWorker, approveWorker: handleApproveWorker, rejectWorker: handleRejectWorker,
      changeWorkerStatus: handleChangeWorkerStatus, removeWorker: handleRemoveWorker, markDelay: handleMarkDelay,
      addClient: handleAddClient, toggleBlockClient: handleToggleBlockClient,
      addProject: handleAddProject, assignWorkerToProject: handleAssignWorkerToProject,
      advanceProjectStep: handleAdvanceProjectStep, cancelProjectFn: handleCancelProject,
      addReview: handleAddReview, fetchReviews: handleFetchReviews, getReviewStats: handleGetReviewStats,
      updateProfile: handleUpdateProfile
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);