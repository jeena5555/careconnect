import { apiClient } from "../apiClient";

export const getPrescriptionById = async (id: number) => {
  return apiClient(`/prescription/${id}`, { method: "GET" });
};
