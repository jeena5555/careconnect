import { apiClient } from "../apiClient";

export const getAccounts = async () => {
  return apiClient("/account", { method: "GET" });
};
