// src/Context/authActions.js

import {
  loginWorkerAPI,
  loginClientAPI,
  loginAdmin,
  registerWorker,
  registerClient,
  updateWorkerProfile,
  updateClientProfile,
} from "../api/index";

// =======================================================
// Login Worker
// =======================================================

export const loginWorker = async (
  email,
  password,
  setUser
) => {
  try {
    const data = await loginWorkerAPI(
      email,
      password
    );

    const worker = {
      ...data.worker,
      role: "worker",
      name: data.worker.workerName,
    };

    setUser(worker);

    return {
      success: true,
      worker,
    };
  } catch (err) {
    return {
      success: false,
      reason: err.message,
    };
  }
};

// =======================================================
// Login Client
// =======================================================

export const loginClient = async (
  email,
  password,
  setUser
) => {
  try {
    const data = await loginClientAPI(
      email,
      password
    );

    const client = {
      ...data.client,
      role: "client",
      name: data.client.fullName,
    };

    setUser(client);

    return {
      success: true,
      client,
    };
  } catch (err) {
    return {
      success: false,
      reason: err.message,
    };
  }
};

// =======================================================
// Login Admin
// =======================================================

export const loginAdminFn = async (
  email,
  password,
  setUser
) => {
  try {
    const data = await loginAdmin(
      email,
      password
    );

    const admin = {
      name: data.name,
      role: data.role || "admin",
      email,
    };

    setUser(admin);

    return {
      success: true,
      admin,
    };
  } catch (err) {
    return {
      success: false,
      reason: err.message,
    };
  }
};

// =======================================================
// Register Worker
// =======================================================

export const addWorker = async (
  workerData,
  setJobsList
) => {
  const data = await registerWorker(
    workerData
  );

  const newWorker = data.worker;

  setJobsList((prev) => [
    newWorker,
    ...prev,
  ]);

  return newWorker;
};

// =======================================================
// Register Client
// =======================================================

export const addClient = async (
  clientData,
  setClientsList
) => {
  const data = await registerClient(
    clientData
  );

  setClientsList((prev) => [
    data.client,
    ...prev,
  ]);

  return data.client;
};

// =======================================================
// Update Profile
// =======================================================

export const updateProfile = async (
  user,
  body,
  setUser,
  setJobsList
) => {
  if (!user) {
    throw new Error(
      "يجب تسجيل الدخول"
    );
  }

  // ---------------------------------------------------
  // Worker
  // ---------------------------------------------------

  if (user.role === "worker") {
    const data =
      await updateWorkerProfile(
        user.id,
        body
      );

    const updatedUser = {
      ...data.worker,
      role: "worker",
      name:
        data.worker.workerName,
    };

    setUser(updatedUser);

    setJobsList((prev) =>
      prev.map((worker) =>
        String(worker.id) ===
        String(user.id)
          ? {
              ...worker,
              ...data.worker,
            }
          : worker
      )
    );

    return data;
  }

  // ---------------------------------------------------
  // Client
  // ---------------------------------------------------

  if (user.role === "client") {
    const data =
      await updateClientProfile(
        user.id,
        body
      );

    const updatedUser = {
      ...data.client,
      role: "client",
      name:
        data.client.fullName,
    };

    setUser(updatedUser);

    return data;
  }

  throw new Error(
    "تعديل الملف الشخصي غير متاح لهذا النوع من الحسابات"
  );
};