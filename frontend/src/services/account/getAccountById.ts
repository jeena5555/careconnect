import { apiClient } from "../apiClient";

export const getAccountById = async (id: number) => {
  return apiClient(`/account/${id}`, { method: "GET" });
};
