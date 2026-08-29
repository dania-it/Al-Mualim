import React, { useEffect, useState } from "react";
import { useApp } from "../Context/AppContext";

import Sidebar from "../components/dashboard/Sidebar";
import HomeTab from "../components/dashboard/tabs/HomeTab";
import ClientsTab from "../components/dashboard/tabs/ClientsTab";
import PendingWorkersTab from "../components/dashboard/tabs/PendingWorkersTab";
import WorkersTab from "../components/dashboard/tabs/WorkersTab";
import ProjectsTab from "../components/dashboard/tabs/ProjectsTab";

import {
  MyRequestsTab,
  NewRequestTab,
} from "../components/dashboard/tabs/RequestsTab";

export default function Dashboard() {
  const {
    user,
    clientsList = [],
    projectsList = [],
    jobsList = [],
    reviewsList = {},

    approveWorker,
    rejectWorker,
    removeWorker,
    markDelay,

    addProject,
    assignWorkerToProject,
    advanceProjectStep,

    toggleBlockClient,
    logout,
  } = useApp();

  const role = user?.role || "client";

  const pendingWorkers = jobsList.filter(
    (worker) => worker.status === "pending"
  );

  const approvedWorkers = jobsList.filter(
    (worker) => worker.status === "approved" || worker.status === "busy"
  );

  const getBusyProject = (workerName) => {
    if (!workerName) return null;

    return projectsList.find(
      (project) =>
        project.assignedWorker === workerName &&
        Number(project.statusStep || 0) < 5
    );
  };

  const handleAdvanceStep = async (projectId) => {
    if (typeof advanceProjectStep !== "function") return;

    try {
      await advanceProjectStep(projectId);
    } catch (error) {
      console.error("تعذر تحديث مرحلة المشروع:", error);
    }
  };

  const [activeTab, setActiveTab] = useState(() => {
    return (
      sessionStorage.getItem("dashboardActiveTab") || "الرئيسية"
    );
  });

  useEffect(() => {
    sessionStorage.setItem("dashboardActiveTab", activeTab);
  }, [activeTab]);

  const adminNav = [
    "الرئيسية",
    "الزبائن",
    "طلبات الفنيين",
    "الفنيون",
    "المشاريع",
  ];

  const navIcons = {
    الرئيسية: "fa-solid fa-house",
    الزبائن: "fa-solid fa-users",
    "طلبات الفنيين": "fa-solid fa-clock",
    الفنيون: "fa-solid fa-helmet-safety",
    المشاريع: "fa-solid fa-list-check",
  };

  const nav =
    role === "admin"
      ? adminNav
      : role === "worker"
      ? ["الرئيسية", "شغلاتي"]
      : ["الرئيسية", "طلباتي", "طلب جديد"];

  const handleLogout = () => {
    if (typeof logout === "function") {
      logout();
    }
  };

  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        min-h-[100dvh]
        bg-[var(--bg-main)]
        font-[var(--font-tajawal)]
        text-right
      "
      dir="rtl"
    >
      <Sidebar
        nav={nav}
        navIcons={navIcons}
        active={activeTab}
        setActive={setActiveTab}
        user={user}
        onLogout={handleLogout}
        pendingCount={pendingWorkers.length}
        pendingProjectsCount={
          projectsList.filter(
            (project) => project.assignedWorker === "بانتظار التعيين"
          ).length
        }
      />

      <main
        className="
          flex-1
          p-4
          sm:p-6
          md:p-8
          overflow-y-auto
          min-w-0
          pb-24
          md:pb-8
        "
      >
        {activeTab === "الرئيسية" && (
          <HomeTab
            role={role}
            user={user}
            clientsList={clientsList}
            projectsList={projectsList}
            pendingWorkers={pendingWorkers}
            approvedWorkers={approvedWorkers}
            getBusyProject={getBusyProject}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "الزبائن" && (
          <ClientsTab
            clientsList={clientsList}
            projectsList={projectsList}
            toggleBlockClient={toggleBlockClient}
          />
        )}

        {activeTab === "طلبات الفنيين" && (
          <PendingWorkersTab
            pendingWorkers={pendingWorkers}
            onApprove={approveWorker}
            onReject={rejectWorker}
          />
        )}

        {activeTab === "الفنيون" && (
          <WorkersTab
            approvedWorkers={approvedWorkers}
            getBusyProject={getBusyProject}
            onRemove={removeWorker}
            onDelay={markDelay}
            reviewsList={reviewsList}
            projectsList={projectsList}
          />
        )}

        {activeTab === "المشاريع" && (
          <ProjectsTab
            projectsList={projectsList}
            approvedWorkers={approvedWorkers}
            getBusyProject={getBusyProject}
            onAdvance={handleAdvanceStep}
            assignWorkerToProject={assignWorkerToProject}
          />
        )}

        {activeTab === "طلباتي" && (
          <MyRequestsTab projectsList={projectsList} user={user} />
        )}

        {activeTab === "طلب جديد" && (
          <NewRequestTab
            user={user}
            addProject={addProject}
            onSubmitted={() => setActiveTab("طلباتي")}
          />
        )}
      </main>
    </div>
  );
}