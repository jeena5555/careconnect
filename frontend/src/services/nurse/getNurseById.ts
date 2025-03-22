import { apiClient } from "../apiClient";

export const getNurseById = async (id: number) => {
  return apiClient(`/nurse/${id}`, { method: "GET" });
};
