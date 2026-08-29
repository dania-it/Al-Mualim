// src/Context/clientActions.js

import {
  toggleBlockClientAPI,
} from "../api/index";

// =======================================================
// Block / Unblock Client
// =======================================================

export const toggleBlockClient = async (
  id,
  setClientsList
) => {
  if (
    id === undefined ||
    id === null ||
    id === ""
  ) {
    throw new Error(
      "معرف الزبون غير موجود"
    );
  }

  try {
    const data =
      await toggleBlockClientAPI(id);

    const newBlockedState =
      data?.client?.isBlocked;

    setClientsList((prev) =>
      prev.map((client) => {
        const clientId =
          client.id ??
          client._id;

        if (
          String(clientId) !==
          String(id)
        ) {
          return client;
        }

        return {
          ...client,

          isBlocked:
            typeof newBlockedState ===
            "boolean"
              ? newBlockedState
              : !client.isBlocked,
        };
      })
    );

    return data;
  } catch (error) {
    console.error(
      "TOGGLE CLIENT BLOCK ERROR:",
      error
    );

    throw error;
  }
};