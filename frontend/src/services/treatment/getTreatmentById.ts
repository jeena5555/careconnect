import { apiClient } from "../apiClient";

export const getTreatmentById = async (id: number) => {
  return apiClient(`/treatment/${id}`, { method: "GET" });
};
